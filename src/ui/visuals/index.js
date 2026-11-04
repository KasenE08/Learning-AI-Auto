// Interactive lesson diagrams. Each visual: mount(container, spec) → { destroy() }.
// Spec fields for every type are documented in docs/CONTENT_GUIDE.md.
import { mountFlow } from './flow.js';
import { mountRecord } from './record.js';
import { mountExchange } from './exchange.js';
import { mountCalc } from './calc.js';
import { mountCompare } from './compare.js';
import { mountRoleplay } from './roleplay.js';
import { mountSort } from './sort.js';

export const VISUALS = { flow: mountFlow, record: mountRecord, exchange: mountExchange, calc: mountCalc, compare: mountCompare, roleplay: mountRoleplay, sort: mountSort };

export function mountVisual(container, spec) {
  const m = VISUALS[spec.type];
  if (!m) { container.textContent = `Unknown visual “${spec.type}”`; return { destroy() {} }; }
  const box = document.createElement('figure');
  box.className = `vis vis--${spec.type}`;
  box.dataset.noswipe = '';
  container.append(box);
  const api = m(box, spec) || {};
  if (spec.caption) {
    const c = document.createElement('figcaption');
    c.className = 'vis__cap';
    c.textContent = spec.caption;
    box.append(c);
  }
  return { destroy() { api.destroy?.(); box.remove(); } };
}
