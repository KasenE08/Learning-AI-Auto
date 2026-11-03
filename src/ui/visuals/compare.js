// A small table. spec: { cols: [...headers], rows: [[label, ...values]], pick?: index of a value column to highlight }
// `cols` may include a header for the label column (cols.length === row length) or skip it (one fewer).
import { html } from '../dom.js';
import { rich } from '../rich.js';

export function mountCompare(box, spec) {
  const full = spec.cols.length === spec.rows[0].length;
  const head = full ? spec.cols[0] : '';
  const vals = full ? spec.cols.slice(1) : spec.cols;
  box.innerHTML = String(html`<div class="cmp-wrap"><table class="cmp">
    <thead><tr><th>${head}</th>${vals.map((c, i) => html`<th class="${spec.pick === i ? 'is-pick' : ''}">${c}</th>`)}</tr></thead>
    <tbody>${spec.rows.map((r) => html`<tr><th scope="row">${rich(r[0])}</th>${r.slice(1).map((c, i) => html`<td data-label="${vals[i] || ''}">${rich(c)}</td>`)}</tr>`)}</tbody>
  </table></div>`);
}
