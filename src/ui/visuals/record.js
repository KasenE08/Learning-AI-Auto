// One piece of data shown two ways: as labeled fields (how no-code tools show it) and as JSON
// (how apps send it). Tap a field to find it in the other view.
// spec: { title?, data: {...}, hl?: [keys], start?: 'fields'|'json' }
import { html, raw } from '../dom.js';
import { kvTable, jsonView } from './kv.js';

export function mountRecord(box, spec) {
  let mode = spec.start || 'fields';
  let hl = spec.hl || [];
  const draw = () => {
    box.innerHTML = String(html`<div class="seg" role="tablist">
        <button type="button" role="tab" class="seg__b ${mode === 'fields' ? 'is-on' : ''}" data-m="fields">As fields</button>
        <button type="button" role="tab" class="seg__b ${mode === 'json' ? 'is-on' : ''}" data-m="json">As JSON</button>
      </div>
      ${spec.title ? html`<span class="kicker rec__title">${spec.title}</span>` : ''}
      <div class="rec__view">${mode === 'fields' ? kvTable(spec.data, { hl }) : raw(jsonView(spec.data, { hl }))}</div>
      <p class="muted rec__hint">${mode === 'fields' ? 'Tap a field, then switch to JSON to find it there.' : 'Same data. Keys in quotes are field names; values follow the colon.'}</p>`);
  };
  draw();
  box.addEventListener('click', (e) => {
    const m = e.target.closest('[data-m]');
    if (m) { mode = m.dataset.m; return draw(); }
    const k = e.target.closest('[data-k]');
    if (k) { hl = [k.dataset.k]; draw(); }
  });
}
