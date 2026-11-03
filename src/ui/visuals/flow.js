// A workflow drawn as connected blocks. Tap a block to see the data leaving it;
// "Run it" walks a record through step by step.
// spec: { nodes: [node], play?: bool, branch?: index of the branch to play }
// node: { label, kind: 'trigger'|'action'|'ai'|'logic', app?, sub?, data?: {...}, branches?: [{ label, nodes: [node] }] }
import { html } from '../dom.js';
import { kvTable } from './kv.js';

const KIND = { trigger: 'Trigger', action: 'Action', ai: 'AI step', logic: 'Logic' };

export function mountFlow(box, spec) {
  const flat = []; // play order
  const anyData = (list) => list.some((n) => n.data || (n.branches || []).some((b) => anyData(b.nodes)));
  const hasData = anyData(spec.nodes);
  const draw = (nodes, playable) => html`<div class="fl">${nodes.map((n, i) => {
    const id = flat.length;
    if (playable) flat.push(n);
    n.__id = id;
    return html`${i ? html`<div class="fl__wire"></div>` : ''}
      <button type="button" class="fl__node fl__node--${n.kind || 'action'}" data-n="${playable ? id : ''}" ${n.data ? '' : 'data-nodata'}>
        <span class="fl__kind"><i></i>${KIND[n.kind] || n.kind || ''}${n.app ? html` · ${n.app}` : ''}</span>
        <span class="fl__label">${n.label}</span>${n.sub ? html`<span class="fl__sub">${n.sub}</span>` : ''}
      </button>
      ${n.branches ? html`<div class="fl__wire"></div><div class="fl__lanes">${n.branches.map((b, bi) => html`<div class="fl__lane"><span class="fl__lanehead">${b.label}</span>${draw(b.nodes, playable && bi === (spec.branch || 0))}</div>`)}</div>` : ''}`;
  })}</div>`;
  box.innerHTML = String(html`${draw(spec.nodes, true)}
    <div class="fl__panel" ${hasData ? '' : 'hidden'}><p class="muted fl__hint">${spec.play ? 'Press Run it, or tap any block to see the data it passes on.' : 'Tap a block to see the data it passes on.'}</p></div>
    ${spec.play ? html`<div class="vis__ctl"><button type="button" class="btn btn--primary" data-play>Run it</button></div>` : ''}`);

  const panel = box.querySelector('.fl__panel');
  const nodes = [...box.querySelectorAll('.fl__node')];
  let timer = null;
  const select = (n, btn) => {
    nodes.forEach((x) => x.classList.toggle('is-on', x === btn));
    panel.innerHTML = String(n?.data ? html`<span class="kicker">Data leaving “${n.label}”</span>${kvTable(n.data)}` : html`<p class="muted">${n?.note || 'This block passes nothing new on.'}</p>`);
  };
  const byBtn = (btn) => {
    const idx = btn.dataset.n;
    if (idx !== '') return flat[Number(idx)];
    // nodes in non-played lanes: find by label
    const find = (list) => { for (const n of list) { if (n.label === btn.querySelector('.fl__label').textContent) return n; for (const b of n.branches || []) { const r = find(b.nodes); if (r) return r; } } return null; };
    return find(spec.nodes);
  };
  box.addEventListener('click', (e) => {
    const btn = e.target.closest('.fl__node');
    if (btn) { clearInterval(timer); timer = null; select(byBtn(btn), btn); return; }
    if (e.target.closest('[data-play]')) {
      clearInterval(timer);
      let i = 0;
      const tick = () => {
        if (i >= flat.length) { clearInterval(timer); timer = null; return; }
        select(flat[i], box.querySelector(`.fl__node[data-n="${i}"]`));
        box.querySelector(`.fl__node[data-n="${i}"]`)?.classList.add('was-run');
        i++;
      };
      nodes.forEach((x) => x.classList.remove('was-run'));
      tick();
      timer = setInterval(tick, matchMedia('(prefers-reduced-motion: reduce)').matches ? 2200 : 1400);
    }
  });
  return { destroy() { clearInterval(timer); } };
}
