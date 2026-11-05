// One template: fill the fields (saved on this device), see the document live, copy it.
import { html, el } from '../dom.js';
import { icons } from '../icons.js';
import { pageHead } from '../components/parts.js';
import { copyText } from '../components/copy.js';
import { getSettings, saveSettings } from '../../core/store.js';
import { templateById, roiNumbers } from '../../content/templates.js';
import { fmtVal } from '../visuals/calc.js';

export const tab = 'library';

export function render(view, { id }) {
  const t = templateById(id);
  if (!t) { view.append(el(html`<div class="screen"><p class="muted">No template “${id}”.</p><a class="btn" href="#/library">Library</a></div>`)); return; }
  const values = { ...(getSettings().templates?.[id] || {}) };
  const screen = el(html`<div class="screen tpl">
    <a class="backlink" href="#/library">${icons.back}Library</a>
    ${pageHead('Template', t.title, t.blurb)}
    <div class="tpl__cols">
      <form class="card tpl__form" autocomplete="off">${t.fields.map((f) => html`<label class="cfg__f"><span class="cfg__lbl">${f.label}</span>${f.kind === 'longtext'
        ? html`<textarea rows="3" id="tpl-${id}-${f.key}" data-k="${f.key}" placeholder="${f.placeholder || ''}">${values[f.key] || ''}</textarea>`
        : html`<input type="${f.kind === 'number' ? 'number' : 'text'}" id="tpl-${id}-${f.key}" data-k="${f.key}" value="${values[f.key] || ''}" placeholder="${f.placeholder || ''}" ${f.kind === 'number' ? 'inputmode="decimal"' : ''}>`}</label>`)}
        <div class="btn-row"><button type="button" class="btn btn--ghost btn--sm" data-example>Fill with the example</button><button type="button" class="btn btn--ghost btn--sm" data-clear>Clear</button></div>
      </form>
      <section class="tpl__out">
        ${t.roi ? html`<div class="card tpl__roi" data-roi></div>` : ''}
        <pre class="ob__prompt tpl__doc" data-doc tabindex="0"></pre>
        <div class="btn-row"><button type="button" class="btn btn--primary" data-copy>${icons.copy}<span>Copy</span></button><span class="muted small">Saved on this device as you type.</span></div>
      </section>
    </div>
  </div>`);
  const doc = screen.querySelector('[data-doc]');
  const paint = () => {
    doc.textContent = t.out(values);
    if (t.roi) {
      const r = roiNumbers(values);
      screen.querySelector('[data-roi]').innerHTML = String(html`<div class="calc__res is-big"><span class="calc__lbl">Net monthly benefit</span><b class="mono">${fmtVal(r.net, 'money')}</b></div>
        <div class="calc__res"><span class="calc__lbl">Payback</span><b class="mono">${Number.isFinite(r.payback) ? fmtVal(r.payback, 'months') : '—'}</b></div>
        <div class="calc__res"><span class="calc__lbl">First-year ROI</span><b class="mono">${fmtVal(r.roi, 'pct')}</b></div>`);
    }
  };
  let timer = null;
  const persist = () => { clearTimeout(timer); timer = setTimeout(() => saveSettings({ templates: { ...(getSettings().templates || {}), [id]: { ...values } } }), 300); };
  screen.addEventListener('input', (e) => { const k = e.target.dataset.k; if (!k) return; values[k] = e.target.value; paint(); persist(); });
  screen.querySelector('[data-example]').addEventListener('click', () => {
    for (const f of t.fields) { values[f.key] = f.placeholder || ''; screen.querySelector(`[data-k="${f.key}"]`).value = values[f.key]; }
    paint(); persist();
  });
  screen.querySelector('[data-clear]').addEventListener('click', () => {
    for (const f of t.fields) { values[f.key] = ''; screen.querySelector(`[data-k="${f.key}"]`).value = ''; }
    paint(); persist();
  });
  screen.querySelector('[data-copy]').addEventListener('click', async (e) => {
    const ok = await copyText(doc.textContent, doc);
    e.currentTarget.querySelector('span').textContent = ok ? 'Copied' : 'Selected: copy it manually';
  });
  paint();
  view.append(screen);
  return () => clearTimeout(timer);
}
