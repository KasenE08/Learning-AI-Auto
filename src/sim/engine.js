// Runs a sandbox workflow against a fake dataset and reports exactly what happened to each record.
// Pure (no DOM). Workflow shape:
//   { v: 1, dataset, trigger: { type } | null, steps: [step] }
//   step   = { id, type, config, onError?: 'stop'|'continue'|'alert', branches?: [branch] }   (branches only on routers)
//   branch = { id, label, cond: { left, op, right } | null (null = "otherwise"), steps: [step] }
// Field references inside config look like "{{trigger.email}}" or "{{s2.label}}".
import { BLOCKS, OPS, outputsOf, defaultConfig } from './blocks.js';
import { datasetById } from './data.js';

export const TOKEN = /\{\{(\w+)\.(\w+)\}\}/g;

export function newWorkflow(datasetId) {
  return { v: 1, dataset: datasetId, trigger: null, steps: [] };
}

const clone = (x) => JSON.parse(JSON.stringify(x));

// ---------------------------------------------------------------- structure helpers

/** Every step with where it lives: { step, list, index, listId, depth }. */
export function allSteps(wf) {
  const out = [];
  const visit = (list, listId, depth) => list.forEach((step, index) => {
    out.push({ step, list, index, listId, depth });
    for (const b of step.branches || []) visit(b.steps, `${step.id}/${b.id}`, depth + 1);
  });
  visit(wf.steps, 'root', 0);
  return out;
}

export const findStep = (wf, id) => allSteps(wf).find((x) => x.step.id === id) || null;

export function getList(wf, listId) {
  if (listId === 'root') return wf.steps;
  const [rid, bid] = listId.split('/');
  return findStep(wf, rid)?.step.branches?.find((b) => b.id === bid)?.steps || null;
}

export function nextId(wf, prefix = 's') {
  const used = new Set(allSteps(wf).flatMap(({ step }) => [step.id, ...(step.branches || []).map((b) => b.id)]));
  let n = 1;
  while (used.has(`${prefix}${n}`)) n++;
  return `${prefix}${n}`;
}

export function makeStep(wf, type) {
  const ds = datasetById(wf.dataset);
  const step = { id: nextId(wf), type, config: defaultConfig(type, ds) };
  if (type === 'router') {
    const a = nextId({ steps: [step] }, 'p');
    step.branches = [
      { id: a, label: 'Path A', cond: { left: '', op: 'equals', right: '' }, steps: [] },
      { id: a === 'p1' ? 'p2' : 'p1', label: 'Otherwise', cond: null, steps: [] },
    ];
  }
  return step;
}

/** Fields a step can use: the trigger's plus every earlier step on its path (including routers above it). */
export function fieldsBefore(wf, stepId) {
  const ds = datasetById(wf.dataset);
  const fields = [];
  if (wf.trigger) {
    const src = BLOCKS[wf.trigger.type]?.app || 'Trigger';
    const triggerFields = wf.trigger.type === ds.trigger ? ds.fields : wf.trigger.type === 'schedule' ? [{ key: 'time', label: 'Time' }] : [];
    for (const f of triggerFields) fields.push({ ref: `{{trigger.${f.key}}}`, label: f.label, source: src, step: 'trigger' });
  }
  const walk = (list) => {
    for (const step of list) {
      if (step.id === stepId) return true;
      if (step.branches) {
        for (const b of step.branches) {
          const mark = fields.length;
          if (walk(b.steps)) return true;
          fields.length = mark; // a sibling path's fields don't exist on the other paths
        }
      }
      const name = stepName(wf, step);
      for (const o of outputsOf(step)) fields.push({ ref: `{{${step.id}.${o.key}}}`, label: o.label, source: name, step: step.id });
    }
    return false;
  };
  walk(wf.steps); // stepId null = every field available at the end of the main line
  return fields;
}

/** "AI: classify (2)" style name, numbered when the same block appears more than once. */
export function stepName(wf, step) {
  const b = BLOCKS[step.type];
  const same = allSteps(wf).filter((x) => x.step.type === step.type);
  const n = same.findIndex((x) => x.step.id === step.id);
  return same.length > 1 ? `${b.label} (${n + 1})` : b.label;
}

/** Config problems a learner can see before running: missing required inputs, fields that don't exist yet. */
export function stepProblems(wf, step) {
  const b = BLOCKS[step.type];
  if (!b) return ['Unknown block'];
  const out = [];
  const have = new Set(fieldsBefore(wf, step.id).map((f) => f.ref));
  const cfg = step.config || {};
  const refsIn = (v) => [...String(v ?? '').matchAll(TOKEN)].map((m) => m[0]);
  for (const i of b.inputs) {
    if (i.showIf && !i.showIf(cfg)) continue;
    const v = cfg[i.key];
    if (i.required && (v == null || String(v).trim() === '')) out.push(`${i.label} is not set`);
    const vals = i.kind === 'cond' ? [v?.left, v?.right] : i.kind === 'columns' ? (v || []).map((c) => c.value) : [v];
    for (const val of vals) for (const r of refsIn(val)) if (!have.has(r)) out.push(`${i.label} uses a field that isn’t available at this point`);
  }
  if (step.type === 'filter' && !cfg.cond?.left) out.push('Pick a field for the condition');
  if (step.type === 'router') {
    for (const br of step.branches || []) {
      if (br.cond && !br.cond.left) out.push(`“${br.label}” has no condition yet`);
      for (const r of [...refsIn(br.cond?.left), ...refsIn(br.cond?.right)]) if (!have.has(r)) out.push(`“${br.label}” uses a field that isn’t available here`);
    }
  }
  return [...new Set(out)];
}

// ---------------------------------------------------------------- running

export const resolve = (tpl, data) => String(tpl ?? '').replace(TOKEN, (_, s, k) => {
  const v = data[s]?.[k];
  return v == null ? '' : String(v);
});

export function testCond(cond, data) {
  if (!cond) return true;
  const l = resolve(cond.left, data).trim();
  const r = resolve(cond.right, data).trim();
  switch (cond.op) {
    case 'equals': return l.toLowerCase() === r.toLowerCase();
    case 'not_equals': return l.toLowerCase() !== r.toLowerCase();
    case 'contains': return r !== '' && l.toLowerCase().includes(r.toLowerCase());
    case 'empty': return l === '';
    case 'not_empty': return l !== '';
    default: return false;
  }
}

export const condText = (wf, cond, stepId) => {
  if (!cond) return 'everything else';
  const f = fieldsBefore(wf, stepId).find((x) => x.ref === cond.left);
  const op = OPS.find((o) => o.id === cond.op);
  return `${f ? f.label : 'field?'} ${op?.label || cond.op}${op?.unary ? '' : ` “${cond.right || ''}”`}`;
};

function resolveConfig(b, cfg, data) {
  const out = {};
  for (const i of b.inputs) {
    const v = cfg[i.key];
    if (i.kind === 'columns') out[i.key] = (v || []).map((c) => ({ name: c.name, value: resolve(c.value, data) }));
    else if (i.kind === 'toggle' || i.kind === 'select' || i.kind === 'sheet' || i.kind === 'labels') out[i.key] = v;
    else if (i.kind === 'cond') out[i.key] = v;
    else out[i.key] = resolve(v, data);
  }
  return out;
}

const eventTitle = (ds, e) => e.data.name || e.data.full_name || e.data.owner_name || e.data.from_name || e.data.subject || 'Record';

/**
 * Runs every test record through the workflow.
 * Returns { fired, reason, runs: [{ index, title, status, trace }], state }
 *   run status: ok | filtered | dropped | error | handled
 *   step status: ok | error | skipped | filtered | routed
 */
export function runWorkflow(wf, dataset = datasetById(wf.dataset)) {
  const state = { crm: clone(dataset.apps.crm || []), sheets: clone(dataset.apps.sheets || {}), emails: [], sms: [], calendar: [], chat: [] };
  const base = { runs: [], state, startCrm: (dataset.apps.crm || []).length };
  if (!wf.trigger) return { ...base, fired: false, reason: 'There is no trigger yet, so nothing starts the workflow.' };
  if (wf.trigger.type !== dataset.trigger) {
    return { ...base, fired: false, reason: `This trigger never fires: ${dataset.name}’s records arrive through “${dataset.source}”, which is a “${BLOCKS[dataset.trigger].label}” trigger.` };
  }

  dataset.events.forEach((event, index) => {
    const data = { trigger: event.data };
    const trace = [];
    const ctx = { event, dataset, state };

    const exec = (list) => {
      for (const step of list) {
        const b = BLOCKS[step.type];
        const name = stepName(wf, step);
        if (step.type === 'filter') {
          const pass = testCond(step.config.cond, data);
          trace.push({ id: step.id, name, status: pass ? 'ok' : 'filtered', message: pass ? 'Condition true: continue' : 'Condition false: run stops here (on purpose)' });
          if (!pass) return 'filtered';
          continue;
        }
        if (step.type === 'router') {
          const br = step.branches.find((x) => testCond(x.cond, data));
          if (!br) { trace.push({ id: step.id, name, status: 'error', message: 'No path matched, so this record was dropped silently.' }); return 'dropped'; }
          trace.push({ id: step.id, name, status: 'routed', message: `Went down “${br.label}”`, branch: br.id });
          return exec(br.steps);
        }
        const cfg = resolveConfig(b, step.config || {}, data);
        let res;
        try { res = b.run(cfg, ctx); } catch (e) { res = { error: `Unexpected failure: ${e.message}` }; }
        if (res.error) {
          const mode = step.onError || 'stop';
          trace.push({ id: step.id, name, status: 'error', input: cfg, message: res.error, onError: mode });
          if (mode === 'continue') { data[step.id] = {}; continue; }
          if (mode === 'alert') {
            state.chat.push({ channel: '#ops-alerts', message: `Workflow failed at “${name}” for ${eventTitle(dataset, event)}: ${res.error}`, alert: true });
            return 'handled';
          }
          return 'error';
        }
        data[step.id] = res.output || {};
        trace.push({ id: step.id, name, status: 'ok', input: cfg, output: res.output, effect: res.effect, notes: res.notes, invented: res.invented });
      }
      return 'ok';
    };

    const status = exec(wf.steps);
    base.runs.push({ index, title: eventTitle(dataset, event), status, trace, data });
  });
  return { ...base, fired: true };
}

export function summarizeRuns(result) {
  const c = { ok: 0, filtered: 0, dropped: 0, error: 0, handled: 0 };
  for (const r of result.runs) c[r.status]++;
  return c;
}

/** Where a step sits for display: its 1-based position in the main line (branches get "3a.1"). */
export const STATUS_LABEL = { ok: 'Finished', filtered: 'Stopped by filter', dropped: 'Dropped (no path)', error: 'Failed', handled: 'Failed, team alerted' };
