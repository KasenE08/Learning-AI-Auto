// Settings form for the selected step. Everything is picked, typed as plain text, or inserted as a
// field chip; nothing is code. Calls onChange(rerenderPanel) after each edit.
import { html, el } from '../dom.js';
import { icons } from '../icons.js';
import { BLOCKS, OPS, ON_ERROR, GROUPS, blocksIn } from '../../sim/blocks.js';
import { fieldsBefore, stepName, stepProblems, findStep } from '../../sim/engine.js';
import { datasetById } from '../../sim/data.js';
import { toDisplay, fromDisplay, chip } from './tokens.js';

const fieldOptions = (fields, value) => html`<option value="">Choose a field…</option>${fields.map((f) => html`<option value="${f.ref}" ${f.ref === value ? 'selected' : ''}>${f.source} › ${f.label}</option>`)}`;
const insertSelect = (fields, k) => html`<select class="ins" data-ins="${k}" aria-label="Insert a field"><option value="">+ Insert field</option>${fields.map((f) => html`<option value="${f.ref}">${f.source} › ${f.label}</option>`)}</select>`;
const opOptions = (v) => OPS.map((o) => html`<option value="${o.id}" ${o.id === v ? 'selected' : ''}>${o.label}</option>`);

function condEditor(cond, fields, key) {
  const unary = OPS.find((o) => o.id === cond.op)?.unary;
  return html`<div class="cond" data-cond="${key}">
    <select data-c="left" aria-label="Field">${fieldOptions(fields, cond.left)}</select>
    <select data-c="op" aria-label="Comparison">${opOptions(cond.op)}</select>
    ${unary ? '' : html`<input type="text" data-c="right" value="${toDisplay(cond.right, fields)}" placeholder="value" aria-label="Value">`}
  </div>`;
}

export function triggerPicker(wf, onPick) {
  const ds = datasetById(wf.dataset);
  return el(html`<div class="cfg">
    <span class="kicker">Trigger</span>
    <h3 class="h3">What starts this workflow?</h3>
    <p class="muted">${ds.name}’s test records arrive through: <b>${ds.source}</b>.</p>
    <div class="pick">${blocksIn('trigger').map((b) => html`<button type="button" class="pick__b ${wf.trigger?.type === b.type ? 'is-on' : ''}" data-trig="${b.type}"><b>${b.label}</b><span>${b.desc}</span></button>`)}</div>
  </div>`);
}

export function blockPicker(onPick) {
  const box = el(html`<div class="cfg picker">
    <h3 class="h3">Add a step</h3>
    ${GROUPS.filter((g) => g.id !== 'trigger').map((g) => html`<section><span class="kicker">${g.label} · ${g.hint}</span>
      <div class="pick">${blocksIn(g.id).map((b) => html`<button type="button" class="pick__b pick__b--${g.id}" data-type="${b.type}"><b>${b.label}</b><span>${b.desc}</span></button>`)}</div></section>`)}
  </div>`);
  box.addEventListener('click', (e) => { const b = e.target.closest('[data-type]'); if (b) onPick(b.dataset.type); });
  return box;
}

/**
 * Renders the settings for one step. `api` = { change(full) , remove(), move(delta) }
 * `full` = true when the panel should re-render (structure changed).
 */
export function stepConfig(wf, stepId, api) {
  const found = findStep(wf, stepId);
  if (!found) return el(html`<p class="muted">Select a step.</p>`);
  const { step, list, index } = found;
  const b = BLOCKS[step.type];
  const fields = fieldsBefore(wf, step.id);
  const cfg = step.config;
  const probs = stepProblems(wf, step);
  const input = (i) => {
    if (i.showIf && !i.showIf(cfg)) return '';
    const v = cfg[i.key];
    const lab = html`<span class="cfg__lbl">${i.label}${i.required ? html` <i class="req">required</i>` : ''}</span>`;
    switch (i.kind) {
      case 'field': return html`<label class="cfg__f">${lab}<select data-k="${i.key}">${fieldOptions(fields, v)}</select></label>`;
      case 'text': return html`<div class="cfg__f">${lab}<input type="text" data-k="${i.key}" data-tok value="${toDisplay(v, fields)}">${insertSelect(fields, i.key)}</div>`;
      case 'longtext': return html`<div class="cfg__f">${lab}<textarea rows="3" data-k="${i.key}" data-tok>${toDisplay(v, fields)}</textarea>${insertSelect(fields, i.key)}</div>`;
      case 'labels': return html`<label class="cfg__f">${lab}<input type="text" data-k="${i.key}" value="${v || ''}" placeholder="e.g. urgent, routine"></label>`;
      case 'select': return html`<label class="cfg__f">${lab}<select data-k="${i.key}">${i.options.map((o) => html`<option value="${o}" ${o === v ? 'selected' : ''}>${i.optionLabels?.[o] || o}</option>`)}</select></label>`;
      case 'sheet': {
        const sheets = Object.keys(datasetById(wf.dataset).apps.sheets || {});
        return html`<label class="cfg__f">${lab}<select data-k="${i.key}">${sheets.map((o) => html`<option ${o === v ? 'selected' : ''}>${o}</option>`)}</select></label>`;
      }
      case 'toggle': return html`<label class="cfg__t"><input type="checkbox" data-k="${i.key}" ${v ? 'checked' : ''}><span>${i.label}</span></label>`;
      case 'cond': return html`<div class="cfg__f">${lab}${condEditor(v, fields, i.key)}</div>`;
      case 'columns': return html`<div class="cfg__f">${lab}<div class="cols">${(v || []).map((c, k) => html`<div class="cols__row" data-col="${k}">
          <input type="text" data-cn value="${c.name}" placeholder="Column" aria-label="Column name">
          <input type="text" data-cv data-tok value="${toDisplay(c.value, fields)}" placeholder="Value" aria-label="Value">
          ${insertSelect(fields, `col:${k}`)}
          <button type="button" class="icon-btn" data-delcol="${k}" aria-label="Remove column">${icons.close}</button></div>`)}
        <button type="button" class="btn btn--ghost btn--sm" data-addcol>${icons.plus}Add column</button></div></div>`;
      default: return '';
    }
  };

  const routerEditor = () => html`<div class="cfg__f"><span class="cfg__lbl">Paths (checked top to bottom; first match wins)</span>
    ${step.branches.map((br, k) => html`<div class="path" data-br="${k}">
      <input type="text" class="path__name" data-brname value="${br.label}" aria-label="Path name">
      ${br.cond ? condEditor(br.cond, fields, `br:${k}`) : html`<p class="muted small">Catches everything no path above matched.</p>`}
      ${step.branches.length > 1 ? html`<button type="button" class="btn btn--ghost btn--sm" data-delbr="${k}">${icons.trash}Remove path</button>` : ''}
    </div>`)}
    <div class="btn-row"><button type="button" class="btn btn--ghost btn--sm" data-addbr>${icons.plus}Add path</button>
    ${step.branches.some((x) => !x.cond) ? '' : html`<button type="button" class="btn btn--ghost btn--sm" data-addelse>${icons.plus}Add “Otherwise” path</button>`}</div>
  </div>`;

  const box = el(html`<div class="cfg">
    <span class="kicker">${b.app} · ${b.group === 'ai' ? 'AI step (simulated)' : b.group}</span>
    <h3 class="h3">${stepName(wf, step)}</h3>
    <p class="muted">${b.desc}</p>
    ${probs.length ? html`<ul class="cfg__probs">${probs.map((p) => html`<li>${p}</li>`)}</ul>` : ''}
    ${step.type === 'router' ? routerEditor() : b.inputs.map(input)}
    ${b.run ? html`<label class="cfg__f"><span class="cfg__lbl">If this step fails</span><select data-onerr>${ON_ERROR.map((o) => html`<option value="${o.id}" ${o.id === (step.onError || 'stop') ? 'selected' : ''}>${o.label}</option>`)}</select></label>` : ''}
    ${fields.length ? html`<details class="cfg__avail"><summary>Fields available here (${fields.length})</summary><ul>${fields.map((f) => html`<li>${chip(f)}</li>`)}</ul></details>` : ''}
    <div class="btn-row cfg__actions">
      <button type="button" class="btn btn--ghost btn--sm" data-move="-1" ${index === 0 ? 'disabled' : ''}>${icons.up}Move up</button>
      <button type="button" class="btn btn--ghost btn--sm" data-move="1" ${index === list.length - 1 ? 'disabled' : ''}>${icons.down}Move down</button>
      <button type="button" class="btn btn--danger btn--sm" data-del>${icons.trash}Delete step</button>
    </div>
  </div>`);

  const condOf = (key) => (key.startsWith('br:') ? step.branches[Number(key.slice(3))].cond : cfg[key]);
  const handle = (e, live) => {
    const t = e.target;
    if (t.matches('[data-k]')) {
      const i = b.inputs.find((x) => x.key === t.dataset.k);
      if (i.kind === 'toggle') cfg[i.key] = t.checked;
      else if (t.matches('[data-tok]')) cfg[i.key] = fromDisplay(t.value, fields);
      else cfg[i.key] = t.value;
      return api.change(!live && (i.kind === 'select' || i.kind === 'field' || i.kind === 'toggle'));
    }
    if (t.matches('[data-c]')) {
      const cond = condOf(t.closest('[data-cond]').dataset.cond);
      cond[t.dataset.c] = t.dataset.c === 'right' ? fromDisplay(t.value, fields) : t.value;
      return api.change(!live && t.dataset.c !== 'right');
    }
    if (t.matches('[data-cn], [data-cv]')) {
      const col = cfg.columns[Number(t.closest('[data-col]').dataset.col)];
      if (t.matches('[data-cn]')) col.name = t.value; else col.value = fromDisplay(t.value, fields);
      return api.change(false);
    }
    if (t.matches('[data-brname]')) { step.branches[Number(t.closest('[data-br]').dataset.br)].label = t.value; return api.change(false); }
    if (t.matches('[data-onerr]')) { step.onError = t.value; return api.change(true); }
    if (t.matches('[data-ins]') && !live && t.value) {
      const k = t.dataset.ins;
      const f = fields.find((x) => x.ref === t.value);
      const target = k.startsWith('col:') ? t.closest('[data-col]').querySelector('[data-cv]') : t.parentElement.querySelector(`[data-k="${k}"]`);
      const pos = target.selectionStart ?? target.value.length;
      target.value = `${target.value.slice(0, pos)}${chip(f)}${target.value.slice(pos)}`;
      t.value = '';
      target.dispatchEvent(new Event('input', { bubbles: true }));
      target.focus();
    }
  };
  box.addEventListener('input', (e) => handle(e, true));
  box.addEventListener('change', (e) => handle(e, false));
  box.addEventListener('click', (e) => {
    const t = e.target.closest('button');
    if (!t) return;
    if (t.matches('[data-addcol]')) { cfg.columns.push({ name: '', value: '' }); api.change(true); }
    else if (t.matches('[data-delcol]')) { cfg.columns.splice(Number(t.dataset.delcol), 1); api.change(true); }
    else if (t.matches('[data-addbr]')) {
      const id = `p${Date.now() % 100000}`;
      const at = step.branches.findIndex((x) => !x.cond);
      step.branches.splice(at < 0 ? step.branches.length : at, 0, { id, label: `Path ${String.fromCharCode(65 + step.branches.length)}`, cond: { left: '', op: 'equals', right: '' }, steps: [] });
      api.change(true);
    } else if (t.matches('[data-addelse]')) { step.branches.push({ id: `p${Date.now() % 100000}`, label: 'Otherwise', cond: null, steps: [] }); api.change(true); }
    else if (t.matches('[data-delbr]')) { step.branches.splice(Number(t.dataset.delbr), 1); api.change(true); }
    else if (t.matches('[data-move]')) api.move(Number(t.dataset.move));
    else if (t.matches('[data-del]')) api.remove();
  });
  return box;
}
