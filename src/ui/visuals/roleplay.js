// A branching practice conversation with a simulated prospect. You pick each reply;
// every pick is scored instantly (best 2, okay 1, weak 0) with a short reason.
// spec: { title?, persona: { name, role }, start: nodeId,
//         nodes: { [id]: { say, choices?: [{ text, score: 0|1|2, why, next }], end?: true } } }
import { html } from '../dom.js';
import { rich } from '../rich.js';

export function rpMaxScore(spec) {
  // Best possible score: walk the best choice from the start.
  let id = spec.start, total = 0, guard = 0;
  while (id && spec.nodes[id] && !spec.nodes[id].end && guard++ < 50) {
    const best = spec.nodes[id].choices.reduce((a, c) => (c.score > a.score ? c : a));
    total += best.score;
    id = best.next;
  }
  return total;
}

export function mountRoleplay(box, spec) {
  let log = [];
  let id = spec.start;
  let score = 0;
  let picks = 0;
  const max = rpMaxScore(spec);

  const draw = () => {
    const node = spec.nodes[id];
    const label = (s) => (s === 2 ? 'Strong' : s === 1 ? 'Okay' : 'Weak');
    box.innerHTML = String(html`
      ${spec.title ? html`<span class="kicker">${spec.title}</span>` : ''}
      <div class="rp__who"><b>${spec.persona.name}</b><span class="muted small">${spec.persona.role}</span></div>
      <div class="rp__log">${log.map((m) => html`<div class="rp__msg rp__msg--${m.who}">${m.who === 'them' ? '' : html`<span class="rp__tag rp__tag--${m.score}">${label(m.score)}</span>`}<p>${rich(m.text)}</p>${m.why ? html`<small>${rich(m.why)}</small>` : ''}</div>`)}
        <div class="rp__msg rp__msg--them is-now"><p>${rich(node.say)}</p></div></div>
      ${node.end ? html`<div class="rp__end"><b class="mono">${score}/${max}</b><span class="muted">${score === max ? 'Best path. That’s how it’s done.' : score >= max * 0.6 ? 'Solid. Replay to find the stronger lines.' : 'Replay it: the feedback on each line shows a better move.'}</span><button type="button" class="btn" data-again>Replay</button></div>`
        : html`<div class="rp__choices"><span class="muted small">Your reply:</span>${node.choices.map((c, i) => html`<button type="button" class="opt" data-c="${i}">${rich(c.text)}</button>`)}</div>`}`);
    const logBox = box.querySelector('.rp__log');
    logBox.scrollTop = logBox.scrollHeight;
  };
  box.addEventListener('click', (e) => {
    if (e.target.closest('[data-again]')) { log = []; id = spec.start; score = 0; picks = 0; return draw(); }
    const b = e.target.closest('[data-c]');
    if (!b) return;
    const node = spec.nodes[id];
    const c = node.choices[Number(b.dataset.c)];
    log.push({ who: 'them', text: node.say }, { who: 'you', text: c.text, score: c.score, why: c.why });
    score += c.score;
    picks++;
    id = c.next;
    draw();
  });
  draw();
}
