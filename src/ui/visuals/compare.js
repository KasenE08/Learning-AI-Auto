// Two options side by side. spec: { cols: [a, b], rows: [[label, a, b]], pick?: 0|1 (highlight a winner) }
import { html } from '../dom.js';
import { rich } from '../rich.js';

export function mountCompare(box, spec) {
  box.innerHTML = String(html`<div class="cmp-wrap"><table class="cmp">
    <thead><tr><th></th>${spec.cols.map((c, i) => html`<th class="${spec.pick === i ? 'is-pick' : ''}">${c}</th>`)}</tr></thead>
    <tbody>${spec.rows.map((r) => html`<tr><th scope="row">${r[0]}</th>${r.slice(1).map((c) => html`<td>${rich(c)}</td>`)}</tr>`)}</tbody>
  </table></div>`);
}
