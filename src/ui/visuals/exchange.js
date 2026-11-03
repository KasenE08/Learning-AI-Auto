// Messages between apps, one at a time (requests, responses, events). Step with Next / Back.
// spec: { actors: [name, name, name?], messages: [{ from, to, label, kind?: 'request'|'response'|'event'|'error', body?: object|string, note? }] }
import { html } from '../dom.js';
import { kvTable } from './kv.js';

export function mountExchange(box, spec) {
  let i = 0;
  const n = spec.actors.length;
  const draw = () => {
    const m = spec.messages[i];
    box.innerHTML = String(html`<div class="ex" style="--cols:${n}">
        <div class="ex__actors">${spec.actors.map((a) => html`<span class="ex__actor">${a}</span>`)}</div>
        <div class="ex__lanes">${spec.messages.slice(0, i + 1).map((x, k) => {
          const l = Math.min(x.from, x.to), r = Math.max(x.from, x.to);
          return html`<div class="ex__msg ex__msg--${x.kind || 'request'} ${k === i ? 'is-now' : ''} ${x.from > x.to ? 'is-left' : ''}" style="--l:${l};--r:${r}"><span class="ex__lbl">${k + 1}. ${x.label}</span><span class="ex__arrow"></span></div>`;
        })}</div>
      </div>
      <div class="ex__detail">${m.body ? (typeof m.body === 'string' ? html`<p>${m.body}</p>` : kvTable(m.body)) : ''}${m.note ? html`<p class="muted">${m.note}</p>` : ''}</div>
      <div class="vis__ctl"><button type="button" class="btn btn--ghost" data-b ${i === 0 ? 'disabled' : ''}>Back</button><span class="mono muted">${i + 1} / ${spec.messages.length}</span><button type="button" class="btn btn--primary" data-n ${i === spec.messages.length - 1 ? 'disabled' : ''}>Next</button></div>`);
  };
  draw();
  box.addEventListener('click', (e) => {
    if (e.target.closest('[data-n]') && i < spec.messages.length - 1) { i++; draw(); }
    if (e.target.closest('[data-b]') && i > 0) { i--; draw(); }
  });
}
