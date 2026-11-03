import { describe, it, expect } from 'vitest';
import { runWorkflow, newWorkflow, makeStep, fieldsBefore, stepProblems, testCond, getList } from '../src/sim/engine.js';
import { challenges, challengeById, grade } from '../src/sim/challenges.js';
import { datasets } from '../src/sim/data.js';
import { BLOCKS, defaultConfig } from '../src/sim/blocks.js';

const add = (wf, type, config = {}, listId = 'root') => {
  const s = makeStep(wf, type);
  Object.assign(s.config, config);
  getList(wf, listId).push(s);
  return s;
};

describe('engine', () => {
  it('does not fire with the wrong trigger', () => {
    const wf = newWorkflow('dental');
    wf.trigger = { type: 'email.new' };
    const r = runWorkflow(wf);
    expect(r.fired).toBe(false);
    expect(r.reason).toMatch(/never fires/);
  });

  it('runs every record and resolves fields', () => {
    const wf = newWorkflow('dental');
    wf.trigger = { type: 'form.new' };
    add(wf, 'chat.post', { channel: '#front-desk', message: 'New: {{trigger.name}}' });
    const r = runWorkflow(wf);
    expect(r.runs).toHaveLength(datasets.dental.events.length);
    expect(r.state.chat[0].message).toBe('New: Dana Reyes');
  });

  it('create duplicates, upsert does not', () => {
    for (const [type, n] of [['crm.create', 5], ['crm.upsert', 4]]) {
      const wf = newWorkflow('dental');
      wf.trigger = { type: 'form.new' };
      add(wf, type, { email: '{{trigger.email}}', name: '{{trigger.name}}' });
      expect(runWorkflow(wf).state.crm).toHaveLength(n);
    }
  });

  it('bad email fails; onError alert posts to #ops-alerts', () => {
    const wf = newWorkflow('dental');
    wf.trigger = { type: 'form.new' };
    const s = add(wf, 'crm.upsert', { email: '{{trigger.email}}' });
    expect(runWorkflow(wf).runs[5].status).toBe('error');
    s.onError = 'alert';
    const r = runWorkflow(wf);
    expect(r.runs[5].status).toBe('handled');
    expect(r.state.chat.some((m) => m.channel === '#ops-alerts')).toBe(true);
  });

  it('free-text AI answers do not match exact router conditions; strict ones do', () => {
    const wf = newWorkflow('dental');
    wf.trigger = { type: 'form.new' };
    const ai = add(wf, 'ai.classify', { text: '{{trigger.reason}}', labels: 'urgent, routine', strict: false });
    const r = add(wf, 'router');
    r.branches = [
      { id: 'p1', label: 'Urgent', cond: { left: `{{${ai.id}.label}}`, op: 'equals', right: 'urgent' }, steps: [] },
      { id: 'p2', label: 'Routine', cond: { left: `{{${ai.id}.label}}`, op: 'equals', right: 'routine' }, steps: [] },
    ];
    expect(runWorkflow(wf).runs.filter((x) => x.status === 'dropped').length).toBeGreaterThan(0);
    ai.config.strict = true;
    expect(runWorkflow(wf).runs.every((x) => x.status === 'ok')).toBe(true);
  });

  it('extract invents missing facts unless told to leave them empty', () => {
    const wf = newWorkflow('plumbing');
    wf.trigger = { type: 'email.new' };
    const ex = add(wf, 'ai.extract', { text: '{{trigger.body}}', fields: 'address, phone', strict: false });
    let run = runWorkflow(wf).runs[1];
    expect(run.trace[0].invented).toContain('phone');
    ex.config.strict = true;
    run = runWorkflow(wf).runs[1];
    expect(run.data[ex.id].phone).toBe('');
  });

  it('fields from one router path are not visible on another', () => {
    const wf = newWorkflow('dental');
    wf.trigger = { type: 'form.new' };
    const r = add(wf, 'router');
    const a = add(wf, 'format', { value: '{{trigger.name}}', op: 'first' }, `${r.id}/${r.branches[0].id}`);
    const b = add(wf, 'chat.post', { message: `{{${a.id}.value}}` }, `${r.id}/${r.branches[1].id}`);
    expect(fieldsBefore(wf, b.id).some((f) => f.step === a.id)).toBe(false);
    expect(stepProblems(wf, b).join()).toMatch(/isn’t available/);
  });

  it('conditions', () => {
    const d = { trigger: { x: ' Urgent ', y: '' } };
    expect(testCond({ left: '{{trigger.x}}', op: 'equals', right: 'urgent' }, d)).toBe(true);
    expect(testCond({ left: '{{trigger.y}}', op: 'empty' }, d)).toBe(true);
    expect(testCond({ left: '{{trigger.x}}', op: 'contains', right: '' }, d)).toBe(false);
  });

  it('every block has a default config', () => {
    for (const t of Object.keys(BLOCKS)) expect(defaultConfig(t, datasets.dental)).toBeTypeOf('object');
  });
});

describe('challenges', () => {
  it('first-flow: reference solution scores 100%, naive one does not', () => {
    const c = challengeById('first-flow');
    const wf = newWorkflow('dental');
    wf.trigger = { type: 'form.new' };
    const crm = add(wf, 'crm.create', { email: '{{trigger.email}}', name: '{{trigger.name}}' });
    add(wf, 'email.send', { to: '{{trigger.email}}', subject: 'We got your request', body: 'Hi {{trigger.name}}, thanks!' }).onError = 'continue';
    const naive = grade(c, wf);
    expect(naive.passed).not.toContain('nodupes');
    crm.type = 'crm.upsert';
    crm.onError = 'continue';
    const g = grade(c, wf);
    expect(g.results.filter((r) => !r.pass).map((r) => r.id)).toEqual([]);
  });

  it('route-urgent: reference solution scores 100%', () => {
    const c = challengeById('route-urgent');
    const wf = newWorkflow('dental');
    wf.trigger = { type: 'form.new' };
    const ai = add(wf, 'ai.classify', { text: '{{trigger.reason}}', labels: 'urgent, routine', strict: true });
    const r = add(wf, 'router');
    r.branches[0].label = 'Urgent';
    r.branches[0].cond = { left: `{{${ai.id}.label}}`, op: 'equals', right: 'urgent' };
    add(wf, 'sms.send', { to: '555-201-0000', body: 'Urgent: {{trigger.name}} ({{trigger.phone}}): {{trigger.reason}}' }, `${r.id}/${r.branches[0].id}`);
    add(wf, 'sheet.add', { sheet: 'Waitlist', columns: [{ name: 'Name', value: '{{trigger.name}}' }, { name: 'Reason', value: '{{trigger.reason}}' }] }, `${r.id}/${r.branches[1].id}`);
    const g = grade(c, wf);
    expect(g.results.filter((x) => !x.pass).map((x) => x.id)).toEqual([]);
  });

  it('an empty workflow scores 0', () => {
    for (const c of challenges) expect(grade(c, newWorkflow(c.dataset)).score).toBe(0);
  });
});
