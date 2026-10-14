/** Polska odmiana: 1 kadr, 2–4 kadry, 5+ kadrów (z wyjątkiem 12–14). */
export function kadry(n: number) {
  if (n === 1) return "kadr";
  const d = n % 10;
  const t = n % 100;
  return d >= 2 && d <= 4 && (t < 12 || t > 14) ? "kadry" : "kadrów";
}
