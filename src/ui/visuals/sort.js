// Sort it: tap each item into the right column. Wrong picks bounce back with the reason.
// spec: { prompt?, cols: [name, name, …], items: [{ text, col: index, why? }] }
import { html } from '../dom.js';
import { rich } from '../rich.js';
import { shuffledOrder } from '../../core/quiz.js';

export function mountSort(box, spec) {
  const order = shuffledOrder(spec.items.length, spec.items.length * 7 + spec.cols.length);
  const placed = new Map(); // item index → col
  let mistakes = 0;
  let msg = null;
  const draw = () => {
    const left = order.filter((i) => !placed.has(i));
    box.innerHTML = String(html`
      <span class="kicker">Sort it</span>
      ${spec.prompt ? html`<p class="srt__prompt">${rich(spec.prompt)}</p>` : ''}
      <div class="srt__cols" style="--n:${spec.cols.length}">${spec.cols.map((c, ci) => html`<div class="srt__col"><b>${c}</b>${[...placed].filter(([, col]) => col === ci).map(([i]) => html`<span class="srt__chip">${rich(spec.items[i].text)}</span>`)}</div>`)}</div>
      ${left.length ? html`<div class="srt__pool">${left.slice(0, 1).map((i) => html`<div class="srt__item ${msg?.i === i ? 'is-wrong' : ''}" data-noswipe><p>${rich(spec.items[i].text)}</p>
          <div class="srt__btns">${spec.cols.map((c, ci) => html`<button type="button" class="btn btn--sm" data-i="${i}" data-c="${ci}">${c}</button>`)}</div></div>`)}
          <span class="muted small">${left.length} left</span></div>` : html`<p class="fb fb--ok"><b>Sorted.</b> ${mistakes ? `${mistakes} wrong pick${mistakes === 1 ? '' : 's'} along the way.` : 'No mistakes.'}</p>`}
      ${msg ? html`<p class="fb fb--bad"><b>Not that one.</b> ${rich(msg.why)}</p>` : ''}`);
  };
  box.addEventListener('click', (e) => {
    const b = e.target.closest('[data-c]');
    if (!b) return;
    const i = Number(b.dataset.i), c = Number(b.dataset.c);
    const item = spec.items[i];
    if (item.col === c) { placed.set(i, c); msg = null; }
    if (placed.size === spec.items.length) setTimeout(() => box.dispatchEvent(new CustomEvent('vis-done', { bubbles: true })));
    else { mistakes++; msg = { i, why: item.why || `It belongs in “${spec.cols[item.col]}”. Try again.` }; }
    draw();
  });
  draw();
}
