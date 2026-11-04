// Every challenge must be solvable: a reference workflow scores 100%.
import { describe, it, expect } from 'vitest';
import { newWorkflow, makeStep, getList } from '../src/sim/engine.js';
import { challengeById, grade } from '../src/sim/challenges.js';

function wfFor(ds, trigger) {
  const wf = newWorkflow(ds);
  wf.trigger = { type: trigger };
  const add = (type, config = {}, listId = 'root', extra = {}) => {
    const s = makeStep(wf, type);
    Object.assign(s.config, config);
    Object.assign(s, extra);
    getList(wf, listId).push(s);
    return s;
  };
  const router = (branches) => {
    const r = add('router');
    r.branches = branches.map((b, i) => ({ id: `p${i + 1}`, label: b.label, cond: b.cond, steps: [] }));
    return (i) => `${r.id}/p${i + 1}`;
  };
  return { wf, add, router };
}
const failing = (c, wf) => grade(c, wf).results.filter((r) => !r.pass).map((r) => r.id);

const solutions = {
  'lead-alert': () => {
    const { wf, add } = wfFor('fitness', 'webhook');
    add('chat.post', { channel: '#sales', message: 'New lead: {{trigger.full_name}} wants: {{trigger.goal}}. Phone: {{trigger.phone}}' });
    add('sheet.add', { sheet: 'Leads', columns: [{ name: 'Name', value: '{{trigger.full_name}}' }, { name: 'Email', value: '{{trigger.email}}' }, { name: 'Phone', value: '{{trigger.phone}}' }, { name: 'Source', value: '{{trigger.source}}' }] });
    return wf;
  },
  'no-phone-route': () => {
    const { wf, add, router } = wfFor('fitness', 'webhook');
    const p = router([{ label: 'Has phone', cond: { left: '{{trigger.phone}}', op: 'not_empty', right: '' } }, { label: 'Otherwise', cond: null }]);
    add('chat.post', { channel: '#sales', message: 'Call {{trigger.full_name}} at {{trigger.phone}}' }, p(0));
    add('email.send', { to: '{{trigger.email}}', subject: 'Best number?', body: 'Hi, what is the best number to reach you?' }, p(1));
    return wf;
  },
  'triage-inbox': () => {
    const { wf, add, router } = wfFor('plumbing', 'email.new');
    const ai = add('ai.classify', { text: '{{trigger.subject}} {{trigger.body}}', labels: 'emergency, service, quote, billing, spam', strict: true });
    const ex = add('ai.extract', { text: '{{trigger.body}}', fields: 'address, issue, phone', strict: true });
    const L = `{{${ai.id}.label}}`;
    const p = router([
      { label: 'Emergency', cond: { left: L, op: 'equals', right: 'emergency' } },
      { label: 'Service', cond: { left: L, op: 'equals', right: 'service' } },
      { label: 'Quote', cond: { left: L, op: 'equals', right: 'quote' } },
      { label: 'Otherwise', cond: null },
    ]);
    add('sms.send', { to: '555-310-0001', body: `EMERGENCY at {{${ex.id}.address}}: {{${ex.id}.issue}}` }, p(0));
    const row = { sheet: 'Jobs', columns: [{ name: 'Address', value: `{{${ex.id}.address}}` }, { name: 'Issue', value: `{{${ex.id}.issue}}` }, { name: 'Phone', value: `{{${ex.id}.phone}}` }] };
    add('sheet.add', JSON.parse(JSON.stringify(row)), p(1));
    add('sheet.add', JSON.parse(JSON.stringify(row)), p(2));
    return wf;
  },
  'followup-sequence': () => {
    const { wf, add } = wfFor('fitness', 'webhook');
    const f = add('format', { value: '{{trigger.full_name}}', op: 'first' });
    add('email.send', { to: '{{trigger.email}}', subject: 'Welcome to Ironside', body: 'Welcome!' });
    add('delay', { wait: '1 day' });
    add('email.send', { to: '{{trigger.email}}', subject: 'Your free session', body: `Hi {{${f.id}.value}}, ready to book?` });
    return wf;
  },
  'no-duplicates': () => {
    const { wf, add } = wfFor('plumbing', 'email.new');
    const ai = add('ai.classify', { text: '{{trigger.subject}} {{trigger.body}}', labels: 'emergency, service, quote, billing, spam', strict: true });
    add('filter', { cond: { left: `{{${ai.id}.label}}`, op: 'not_equals', right: 'spam' } });
    add('crm.upsert', { email: '{{trigger.from_email}}', name: '{{trigger.from_name}}' });
    return wf;
  },
  'book-and-confirm': () => {
    const { wf, add } = wfFor('dental', 'form.new');
    add('cal.create', { title: 'Hold: {{trigger.name}}', when: '{{trigger.preferred_time}}' });
    add('email.send', { to: '{{trigger.email}}', subject: 'Penciled in', body: 'We penciled you in for {{trigger.preferred_time}}.' });
    return wf;
  },
  'sms-consent': () => {
    const { wf, add, router } = wfFor('dental', 'form.new');
    const p = router([{ label: 'OK to text', cond: { left: '{{trigger.sms_ok}}', op: 'equals', right: 'yes' } }, { label: 'Otherwise', cond: null }]);
    add('sms.send', { to: '{{trigger.phone}}', body: 'Bright Smile: we got your request.' }, p(0), { onError: 'alert' });
    add('email.send', { to: '{{trigger.email}}', subject: 'We got your request', body: 'Thanks, we will be in touch.' }, p(1), { onError: 'alert' });
    return wf;
  },
  'error-alerts': () => {
    const { wf, add } = wfFor('dental', 'form.new');
    add('crm.upsert', { email: '{{trigger.email}}', name: '{{trigger.name}}' }, 'root', { onError: 'alert' });
    add('email.send', { to: '{{trigger.email}}', subject: 'Got it', body: 'Hi {{trigger.name}}' }, 'root', { onError: 'alert' });
    return wf;
  },
  'minimize-data': () => {
    const { wf, add, router } = wfFor('dental', 'form.new');
    const ai = add('ai.classify', { text: '{{trigger.reason}}', labels: 'urgent, routine', strict: true });
    const f = add('format', { value: '{{trigger.name}}', op: 'first' });
    const p = router([{ label: 'Urgent', cond: { left: `{{${ai.id}.label}}`, op: 'equals', right: 'urgent' } }, { label: 'Otherwise', cond: null }]);
    add('chat.post', { channel: '#front-desk', message: `{{${f.id}.value}}: urgent request, see the CRM` }, p(0));
    return wf;
  },
};

describe.each(Object.keys(solutions))('challenge %s', (id) => {
  const c = challengeById(id);
  it('exists', () => expect(c).toBeTruthy());
  it('reference solution scores 100%', () => expect(failing(c, solutions[id]())).toEqual([]));
  it('empty workflow scores 0', () => expect(grade(c, newWorkflow(c.dataset)).score).toBe(0));
});

describe('traps', () => {
  it('sms-consent: texting everyone fails consent', () => {
    const { wf, add } = wfFor('dental', 'form.new');
    add('sms.send', { to: '{{trigger.phone}}', body: 'hi' }, 'root', { onError: 'continue' });
    expect(grade(challengeById('sms-consent'), wf).passed).not.toContain('consent');
  });
  it('triage-inbox: careless extraction is caught', () => {
    const wf = solutions['triage-inbox']();
    wf.steps[1].config.strict = false;
    expect(grade(challengeById('triage-inbox'), wf).passed).not.toContain('noinvent');
  });
  it('minimize-data: full name in chat fails', () => {
    const wf = solutions['minimize-data']();
    wf.steps[2].branches[0].steps[0].config.message = '{{trigger.name}} urgent';
    expect(grade(challengeById('minimize-data'), wf).passed).not.toContain('min');
  });
});

describe('capstone', () => {
  const build = () => {
    const { wf, add, router } = wfFor('vet', 'form.new');
    const ai = add('ai.classify', { text: '{{trigger.reason}}', labels: 'urgent, routine, spam', strict: true });
    add('filter', { cond: { left: `{{${ai.id}.label}}`, op: 'not_equals', right: 'spam' } });
    add('crm.upsert', { email: '{{trigger.email}}', name: '{{trigger.owner_name}}', phone: '{{trigger.phone}}' }, 'root', { onError: 'continue' });
    const p = router([{ label: 'Urgent', cond: { left: `{{${ai.id}.label}}`, op: 'equals', right: 'urgent' } }, { label: 'Otherwise', cond: null }]);
    const confirm = (listId) => {
      const r = makeStep(wf, 'router');
      r.branches = [{ id: 'q1', label: 'OK to text', cond: { left: '{{trigger.text_ok}}', op: 'equals', right: 'yes' }, steps: [] }, { id: 'q2', label: 'Otherwise', cond: null, steps: [] }];
      getList(wf, listId).push(r);
      add('sms.send', { to: '{{trigger.phone}}', body: 'Riverbend: we got your request for {{trigger.pet_name}}.' }, `${r.id}/q1`, { onError: 'alert' });
      add('email.send', { to: '{{trigger.email}}', subject: 'Your request for {{trigger.pet_name}}', body: 'Thanks {{trigger.owner_name}}, we got it.' }, `${r.id}/q2`, { onError: 'alert' });
    };
    add('sms.send', { to: '555-423-0000', body: 'URGENT: {{trigger.pet_name}} ({{trigger.species}}): {{trigger.reason}}' }, p(0));
    add('chat.post', { channel: '#front-desk', message: '{{trigger.pet_name}}: urgent, see CRM' }, p(0));
    confirm(p(0));
    add('cal.create', { title: 'Hold: {{trigger.pet_name}}', when: '{{trigger.preferred_time}}' }, p(1));
    confirm(p(1));
    return wf;
  };
  it('reference solution scores 100%', () => expect(failing(challengeById('capstone-build'), build())).toEqual([]));
  it('empty workflow scores 0', () => expect(grade(challengeById('capstone-build'), newWorkflow('vet')).score).toBe(0));
});
