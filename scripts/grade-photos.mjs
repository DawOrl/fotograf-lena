// Jedna gradacja dla całej serii: ciepłe światła, lekko podniesione czernie,
// stonowane nasycenie i drobne ziarno, jak skan negatywu Portra 400.
//
// Źródła (oryginały i surowe kadry) nie są w repo. Domyślnie skrypt czyta je
// z .claude/zrodla/ (orig/ = kadry z pierwszej wersji strony, ai/ = kadry
// wygenerowane do redesignu), a zapisuje WebP do public/gallery/.
//
//   node scripts/grade-photos.mjs [katalog-źródeł]

import path from "node:path";
import sharp from "sharp";

const SRC = process.argv[2] ?? ".claude/zrodla";
const OUT = "public/gallery";

/**
 * aspect: docelowe proporcje kadru (szer./wys.), position: punkt ciężkości przy kadrowaniu.
 * warm/sat/exp: korekta pod konkretne zdjęcie, tak żeby po gradacji seria była równa.
 */
const photos = [
  { src: "orig/hero.jpg", out: "hero", aspect: 4 / 5, long: 2000, warm: 0.6, sat: 0.92 },
  { src: "ai/lena.jpg", out: "lena", aspect: 4 / 5, long: 1600, warm: 0.3, sat: 0.95 },

  { src: "orig/slub-01.jpg", out: "slub-palma", aspect: 4 / 5, warm: 0.8, sat: 0.9, exp: 1.04 },
  { src: "orig/slub-02.jpg", out: "slub-welon", aspect: 4 / 5, warm: 1, sat: 0.84 },
  { src: "orig/slub-05.jpg", out: "slub-tatry", aspect: 3 / 2, warm: 0.9, sat: 0.9, position: "south" },
  { src: "orig/slub-06.jpg", out: "slub-brama", aspect: 4 / 5, warm: 1, sat: 0.8, exp: 0.97 },
  { src: "ai/guziki.jpg", out: "slub-guziki", aspect: 4 / 5, warm: 0.3, sat: 0.95 },
  { src: "ai/taniec.jpg", out: "slub-taniec", aspect: 3 / 2, warm: 0.2, sat: 0.92 },
  { src: "ai/stol-bez-napisow.jpg", out: "slub-sad", aspect: 3 / 2, warm: 0.3, sat: 0.88 },

  { src: "orig/portret-01.jpg", out: "portret-julia", aspect: 4 / 5, warm: 0.5, sat: 0.88 },
  { src: "orig/portret-03.jpg", out: "portret-ewa", aspect: 3 / 2, warm: 0.7, sat: 0.86 },
  { src: "orig/portret-04.jpg", out: "portret-weronika", aspect: 4 / 5, warm: 1, sat: 0.85, exp: 1.04 },
  { src: "ai/dalie.jpg", out: "portret-halina", aspect: 4 / 5, warm: 0.4, sat: 0.8 },

  { src: "orig/rodzina-02.jpg", out: "rodzina-laka", aspect: 3 / 2, warm: 0.8, sat: 0.86 },
  { src: "ai/lozko.jpg", out: "rodzina-niedziela", aspect: 3 / 2, warm: 0.9, sat: 0.9, exp: 0.98 },
  {
    src: "ai/wydmy-2.jpg",
    out: "rodzina-wydmy",
    aspect: 4 / 5,
    warm: 1,
    sat: 0.86,
    // naszywka na plecaku: zamalowana kolorem tkaniny
    retouch: [{ left: 796, top: 1358, width: 58, height: 40 }],
  },
];

async function raw(pipeline) {
  const { data, info } = await pipeline.raw().toBuffer({ resolveWithObject: true });
  return { data, info, img: () => sharp(data, { raw: info }) };
}

async function retouch(file, patches) {
  let img = sharp(file);
  const overlays = [];
  for (const p of patches) {
    // kolor tkaniny tuż nad łatką
    const { channels } = await sharp(file)
      .extract({ left: p.left, top: Math.max(0, p.top - 30), width: p.width, height: 24 })
      .stats();
    const [r, g, b] = channels.map((c) => Math.round(c.mean));
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${p.width + 24}" height="${p.height + 24}">
      <filter id="f"><feGaussianBlur stdDeviation="4"/></filter>
      <rect x="12" y="12" width="${p.width}" height="${p.height}" rx="4" fill="rgb(${r},${g},${b})" filter="url(#f)"/></svg>`;
    overlays.push({ input: Buffer.from(svg), left: p.left - 12, top: p.top - 12 });
  }
  img = img.composite(overlays);
  return img.png().toBuffer();
}

async function grade(p) {
  let input = path.join(SRC, p.src);
  if (p.retouch) input = await retouch(input, p.retouch);

  // 1. kadr i rozmiar
  const meta = await sharp(input).metadata();
  const long = p.long ?? 1600;
  const width = p.aspect >= 1 ? long : Math.round(long * p.aspect);
  // nie powiększamy: największy kadr o tych proporcjach, jaki mieści się w źródle
  const w = Math.min(width, meta.width, Math.round(meta.height * p.aspect));
  let step = await raw(
    sharp(input)
      .rotate()
      .resize({
        width: w,
        height: Math.round(w / p.aspect),
        fit: "cover",
        position: p.position ?? "attention",
      }),
  );

  // 2. barwa: ciepłe światła, chłodny kanał niebieski przygaszony
  const k = p.warm ?? 0.6;
  step = await raw(
    step.img().recomb([
      [1 + 0.045 * k, 0.025 * k, 0],
      [0.012 * k, 1, 0],
      [0, 0.015 * k, 1 - 0.095 * k],
    ]),
  );

  // 3. nasycenie i ekspozycja
  step = await raw(step.img().modulate({ saturation: p.sat ?? 0.88, brightness: p.exp ?? 1 }));

  // 4. krzywa: podniesione, lekko ciepłe czernie i miękko przycięte światła
  step = await raw(step.img().linear([0.91, 0.91, 0.9], [15, 12, 10]));

  // 5. ziarno: monochromatyczny szum, minimalnie rozmyty, w trybie soft-light
  const { width: gw, height: gh } = step.info;
  const grain = await sharp({
    create: {
      width: gw,
      height: gh,
      channels: 3,
      background: { r: 128, g: 128, b: 128 },
      noise: { type: "gaussian", mean: 128, sigma: p.grain ?? 26 },
    },
  })
    .greyscale()
    .blur(0.6)
    .toColourspace("srgb")
    .png()
    .toBuffer();

  const outFile = path.join(OUT, `${p.out}.webp`);
  await step
    .img()
    .composite([{ input: grain, blend: "soft-light" }])
    .webp({ quality: 80, effort: 5, smartSubsample: true })
    .toFile(outFile);
  const out = await sharp(outFile).metadata();
  console.log(`${outFile}  ${out.width}x${out.height}`);
}

for (const p of photos) await grade(p);
