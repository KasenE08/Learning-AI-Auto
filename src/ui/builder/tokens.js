// Field references are stored as {{step.key}} but always shown to the learner as readable
// chips like [Form › Email]. These helpers convert between the two.
import { TOKEN } from '../../sim/engine.js';

export const chip = (f) => `[${f.source} › ${f.label}]`;

export function toDisplay(value, fields) {
  return String(value ?? '').replace(TOKEN, (m) => {
    const f = fields.find((x) => x.ref === m);
    return f ? chip(f) : '[missing field]';
  });
}

export function fromDisplay(text, fields) {
  let out = String(text ?? '');
  for (const f of fields) out = out.split(chip(f)).join(f.ref);
  return out;
}

/** Short human summary of a value for flow cards: "Hi [Name]" */
export function shortText(value, fields, max = 42) {
  const t = String(value ?? '').replace(TOKEN, (m) => {
    const f = fields.find((x) => x.ref === m);
    return f ? `‹${f.label}›` : '‹?›';
  });
  return t.length > max ? `${t.slice(0, max - 1)}…` : t;
}
