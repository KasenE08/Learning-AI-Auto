// Shared: a record shown as labeled fields (the "no-code" view of data).
import { html } from '../dom.js';

export function kvTable(obj, { hl = [] } = {}) {
  const row = (k, v) => {
    if (Array.isArray(v)) return html`<div class="kv__row ${hl.includes(k) ? 'is-hl' : ''}" data-k="${k}"><dt>${k}</dt><dd><span class="kv__list">${v.map((x, i) => html`<span class="kv__item"><span class="kv__idx">${i + 1}</span>${x && typeof x === 'object' ? kvTable(x) : String(x)}</span>`)}</span></dd></div>`;
    if (v && typeof v === 'object') return html`<div class="kv__row ${hl.includes(k) ? 'is-hl' : ''}" data-k="${k}"><dt>${k}</dt><dd>${kvTable(v)}</dd></div>`;
    return html`<div class="kv__row ${hl.includes(k) ? 'is-hl' : ''}" data-k="${k}"><dt>${k}</dt><dd>${v === '' || v == null ? html`<span class="muted">(empty)</span>` : String(v)}</dd></div>`;
  };
  return html`<dl class="kv">${Object.entries(obj || {}).map(([k, v]) => row(k, v))}</dl>`;
}

/** Pretty JSON with light tinting; keys get data-k for highlighting. */
export function jsonView(obj, { hl = [] } = {}) {
  const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  const pad = (n) => '  '.repeat(n);
  const val = (v, d) => {
    if (Array.isArray(v)) return v.length ? `[\n${v.map((x) => pad(d + 1) + val(x, d + 1)).join(',\n')}\n${pad(d)}]` : '[]';
    if (v && typeof v === 'object') {
      const e = Object.entries(v);
      return e.length ? `{\n${e.map(([k, x]) => `${pad(d + 1)}<span class="j-k${hl.includes(k) ? ' is-hl' : ''}" data-k="${esc(k)}">"${esc(k)}"</span>: ${val(x, d + 1)}`).join(',\n')}\n${pad(d)}}` : '{}';
    }
    if (typeof v === 'number' || typeof v === 'boolean' || v === null) return `<span class="j-n">${String(v)}</span>`;
    return `<span class="j-s">"${esc(v)}"</span>`;
  };
  return `<pre class="json">${val(obj, 0)}</pre>`;
}
