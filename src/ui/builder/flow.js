// Draws the workflow as a vertical chain of cards, with router paths as side-by-side lanes.
// Status dots come from the selected test run.
import { html } from '../dom.js';
import { icons } from '../icons.js';
import { BLOCKS, OPS, formatLabel } from '../../sim/blocks.js';
import { stepName, stepProblems, fieldsBefore, condText } from '../../sim/engine.js';
import { shortText } from './tokens.js';

const GROUP_TAG = { trigger: 'Trigger', action: 'Action', logic: 'Logic', ai: 'AI step' };

export function summary(wf, step) {
  const c = step.config || {};
  const f = fieldsBefore(wf, step.id);
  const s = (v) => shortText(v, f);
  switch (step.type) {
    case 'crm.create': case 'crm.upsert': return c.email ? `Email: ${s(c.email)}` : 'Not set up';
    case 'sheet.add': return `${c.sheet} · ${(c.columns || []).filter((x) => x.name).map((x) => x.name).join(', ') || 'no columns'}`;
    case 'email.send': return c.to ? `To ${s(c.to)}` : 'Not set up';
    case 'sms.send': return c.to ? `To ${s(c.to)}` : 'Not set up';
    case 'cal.create': return c.title ? s(c.title) : 'Not set up';
    case 'chat.post': return `${c.channel}${c.message ? ` · ${s(c.message)}` : ''}`;
    case 'delay': return c.wait;
    case 'filter': return c.cond?.left ? condText(wf, c.cond, step.id) : 'No condition yet';
    case 'format': return c.value ? `${s(c.value)} → ${formatLabel(c.op)}` : 'Not set up';
    case 'ai.classify': return c.labels ? `${c.labels}${c.strict ? ' · fixed answers' : ' · free text'}` : 'No categories yet';
    case 'ai.extract': return c.fields ? `${c.fields}${c.strict ? ' · empty if missing' : ''}` : 'Nothing to extract yet';
    case 'ai.draft': return c.instructions ? s(c.instructions) : 'No instructions yet';
    case 'ai.summarize': return c.text ? s(c.text) : 'No text yet';
    default: return '';
  }
}

const dot = (trace, id) => {
  const t = trace?.find((x) => x.id === id);
  if (!t) return trace ? html`<span class="bf__dot is-skip" title="Did not run"></span>` : '';
  return html`<span class="bf__dot is-${t.status}" title="${t.status}"></span>`;
};

const addBtn = (listId, index) => html`<button type="button" class="bf__add" data-add="${listId}" data-at="${index}" aria-label="Add a step here">${icons.plus}</button>`;

export function drawFlow(wf, { sel, trace, onTrigger }) {
  const trig = wf.trigger ? BLOCKS[wf.trigger.type] : null;
  const list = (steps, listId) => html`${addBtn(listId, 0)}${steps.map((st, i) => html`${card(st)}${addBtn(listId, i + 1)}`)}`;
  const card = (st) => {
    const b = BLOCKS[st.type];
    const probs = stepProblems(wf, st);
    const c = html`<button type="button" class="bf__card bf__card--${b.group} ${sel === st.id ? 'is-sel' : ''}" data-sel="${st.id}">
      <span class="bf__kind"><i></i>${GROUP_TAG[b.group]} · ${b.app}${dot(trace, st.id)}</span>
      <span class="bf__label">${stepName(wf, st)}</span>
      <span class="bf__sum">${summary(wf, st)}</span>
      ${probs.length ? html`<span class="bf__warn">${probs.length} to fix</span>` : ''}
      ${st.onError && st.onError !== 'stop' ? html`<span class="bf__onerr">If it fails: ${st.onError === 'alert' ? 'alert team' : 'skip'}</span>` : ''}
    </button>`;
    if (st.type !== 'router') return c;
    const t = trace?.find((x) => x.id === st.id);
    return html`${c}<div class="bf__lanes">${st.branches.map((br) => html`<div class="bf__lane ${t?.branch === br.id ? 'is-taken' : ''}">
      <button type="button" class="bf__lanehead" data-sel="${st.id}"><b>${br.label}</b><span>${br.cond ? condText(wf, br.cond, st.id) : 'everything else'}</span></button>
      ${list(br.steps, `${st.id}/${br.id}`)}
    </div>`)}</div>`;
  };
  return html`<div class="bf">
    <button type="button" class="bf__card bf__card--trigger ${sel === 'trigger' ? 'is-sel' : ''} ${trig ? '' : 'is-empty'}" data-sel="trigger">
      <span class="bf__kind"><i></i>Trigger${trig ? html` · ${trig.app}` : ''}</span>
      <span class="bf__label">${trig ? trig.label : 'Choose what starts this workflow'}</span>
      ${trig ? '' : html`<span class="bf__sum">Tap to pick a trigger</span>`}
    </button>
    ${wf.trigger ? list(wf.steps, 'root') : ''}
    ${wf.trigger ? html`<span class="bf__end">End</span>` : ''}
  </div>`;
}

export { OPS };
