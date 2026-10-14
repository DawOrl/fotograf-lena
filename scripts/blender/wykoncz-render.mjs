// Wykończenie renderu z łapaczem cieni pod jasną stronę:
// cień dostaje ciepły brąz zamiast czerni i jest o 1/4 lżejszy, krawędzie kadru
// wygasają do przezroczystości, a pusty margines jest przycinany.
//
//   node scripts/blender/wykoncz-render.mjs .claude/render/klisza.png public/render/klisza.webp

import sharp from "sharp";

const [input, output] = process.argv.slice(2);
const SHADOW = [58, 42, 30]; // ciepły brąz w tonie sepii strony
const FADE = 0.16; // szerokość wygaszania przy krawędziach, ułamek boku

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;
let minX = width, minY = height, maxX = 0, maxY = 0;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * 4;
    let a = data[i + 3];
    if (a < 250) {
      // piksel samego cienia (albo krawędź obiektu): ciepły kolor, lżejsza gęstość
      const t = a / 250;
      data[i] = Math.round(SHADOW[0] * (1 - t) + data[i] * t);
      data[i + 1] = Math.round(SHADOW[1] * (1 - t) + data[i + 1] * t);
      data[i + 2] = Math.round(SHADOW[2] * (1 - t) + data[i + 2] * t);
      // lżejszy cień, a najsłabsza okluzja otoczenia znika całkiem (bez "prostokąta" za obiektem)
      a = 255 * Math.pow((a * (0.75 + 0.25 * t)) / 255, 1.35);
    }
    const ex = Math.min(x / width, (width - 1 - x) / width) / FADE;
    const ey = Math.min(y / height, (height - 1 - y) / height) / FADE;
    const edge = Math.min(1, ex, ey);
    a = Math.round(a * edge * edge * (3 - 2 * edge));
    data[i + 3] = a;
    if (a > 10) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

const pad = 16;
const left = Math.max(0, minX - pad);
const top = Math.max(0, minY - pad);
await sharp(data, { raw: info })
  .extract({
    left,
    top,
    width: Math.min(width, maxX + pad) - left,
    height: Math.min(height, maxY + pad) - top,
  })
  .resize({ width: 1400, withoutEnlargement: true })
  .webp({ quality: 84, alphaQuality: 90, effort: 6 })
  .toFile(output);
console.log("zapisano", output);
