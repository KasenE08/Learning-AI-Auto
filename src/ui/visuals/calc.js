// Sliders in, numbers out. For ROI, pricing, capacity math.
// spec: { inputs: [{ key, label, min, max, step, value, prefix?, unit? }], outputs: [{ label, f: (v) => number, fmt: 'money'|'hours'|'months'|'pct'|'num', big? }] }
import { html } from '../dom.js';

export const fmtVal = (x, fmt) => {
  if (!Number.isFinite(x)) return '—';
  if (fmt === 'money') return `${x < 0 ? '−' : ''}$${Math.abs(Math.round(x)).toLocaleString('en-US')}`;
  if (fmt === 'hours') return `${(Math.round(x * 10) / 10).toLocaleString('en-US')} h`;
  if (fmt === 'months') return `${(Math.round(x * 10) / 10).toLocaleString('en-US')} mo`;
  if (fmt === 'pct') return `${Math.round(x * 100)}%`;
  return (Math.round(x * 100) / 100).toLocaleString('en-US');
};

export function mountCalc(box, spec) {
  const v = Object.fromEntries(spec.inputs.map((i) => [i.key, i.value]));
  box.innerHTML = String(html`<div class="calc">
    <div class="calc__in">${spec.inputs.map((i) => html`<label class="calc__row"><span class="calc__lbl">${i.label}</span><input type="range" min="${i.min}" max="${i.max}" step="${i.step || 1}" value="${i.value}" data-k="${i.key}"><output class="mono" data-o="${i.key}"></output></label>`)}</div>
    <div class="calc__out">${spec.outputs.map((o, k) => html`<div class="calc__res ${o.big ? 'is-big' : ''}"><span class="calc__lbl">${o.label}</span><b class="mono" data-r="${k}"></b></div>`)}</div>
  </div>`);
  const paint = () => {
    for (const i of spec.inputs) box.querySelector(`[data-o="${i.key}"]`).textContent = `${i.prefix || ''}${Number(v[i.key]).toLocaleString('en-US')}${i.unit ? ` ${i.unit}` : ''}`;
    spec.outputs.forEach((o, k) => { box.querySelector(`[data-r="${k}"]`).textContent = fmtVal(o.f(v), o.fmt); });
  };
  box.addEventListener('input', (e) => { const k = e.target.dataset.k; if (k) { v[k] = Number(e.target.value); paint(); } });
  paint();
}
