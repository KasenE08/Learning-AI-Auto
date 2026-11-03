// Pure quiz grading + helpers. Question types (all scored objectively):
//   mc       { q, options: [..], answer: index, why, wrong?: { [index]: text }, scenario?: text }
//            (a "scenario judgment" is an mc with a `scenario` set-up shown above the question)
//   multi    { q, options: [..], answer: [indexes], why }          select all that apply
//   order    { q, items: [..in correct order..], why }
//   num      { q, answer: number, tol?: number (absolute), unit?, prefix?, hint?, why }

export function parseNumber(text) {
  if (text == null) return NaN;
  const t = String(text).trim().replace(/[,$%\s]/g, '');
  if (!/^-?\d*\.?\d+(e-?\d+)?$/i.test(t)) return NaN;
  return Number(t);
}

export const numTolerance = (q) => q.tol ?? Math.max(Math.abs(q.answer) * 0.01, 1e-9);

export function grade(q, value) {
  switch (q.type) {
    case 'mc': return value === q.answer;
    case 'multi': {
      const want = [...q.answer].sort();
      const got = [...(value || [])].sort();
      return want.length === got.length && want.every((v, i) => v === got[i]);
    }
    case 'order': return Array.isArray(value) && value.length === q.items.length && value.every((v, i) => v === i);
    case 'num': {
      const n = typeof value === 'number' ? value : parseNumber(value);
      return Number.isFinite(n) && Math.abs(n - q.answer) <= numTolerance(q);
    }
    default: throw new Error(`Unknown question type ${q.type}`);
  }
}

/** Deterministic shuffle (so a retake reshuffles but tests are repeatable). */
export function shuffle(arr, seed = Math.random() * 1e9) {
  const a = arr.slice();
  let s = Math.floor(seed) || 1;
  const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Indexes 0..n-1 shuffled, never left in the solved order when n > 1. */
export function shuffledOrder(n, seed) {
  const idx = [...Array(n).keys()];
  if (n < 2) return idx;
  let out = shuffle(idx, seed);
  if (out.every((v, i) => v === i)) out = [...out.slice(1), out[0]];
  return out;
}
