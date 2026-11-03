// Sandbox build challenges. Each is a client request with objective, rule-based checks that read
// the workflow and the results of running it on the fake data. Score = checks passed / total.
import { allSteps, runWorkflow, newWorkflow } from './engine.js';
import { datasetById } from './data.js';
import { isEmail, digits, labelList } from './blocks.js';

const stepsOf = (wf, type) => allSteps(wf).filter((x) => x.step.type === type).map((x) => x.step);
const firstName = (s) => String(s || '').trim().split(/\s+/)[0].toLowerCase();
const refersTo = (v, stepId) => String(v || '').includes(`{{${stepId}.`);

export const challenges = [
  {
    id: 'first-flow',
    unit: 'found',
    lesson: 'found-01',
    title: 'Save every booking request',
    dataset: 'dental',
    brief: [
      'Bright Smile Dental’s front desk copies each booking-form request into the CRM by hand, then emails the patient back.',
      'Build a workflow that does both automatically: save the patient in the CRM and email them a confirmation that greets them by name.',
      'Watch out: some patients book twice, and people mistype their email.',
    ],
    checks: [
      { id: 'trigger', label: 'Starts when the booking form is submitted', hint: 'The test data comes from the website form. Which trigger fires on a new form entry?',
        test: ({ wf }) => wf.trigger?.type === 'form.new' },
      { id: 'crm', label: 'Saves each patient in the CRM', hint: 'Add a CRM step and map the patient’s email into it.',
        test: ({ wf, result }) => stepsOf(wf, 'crm.create').length + stepsOf(wf, 'crm.upsert').length > 0 && result.state.crm.length > 0 },
      { id: 'nodupes', label: 'One contact per patient (Dana books twice)', hint: 'One CRM block creates a new contact every time. The other looks the person up first.',
        test: ({ result }) => {
          const emails = result.state.crm.map((c) => c.email);
          return emails.length > 0 && new Set(emails).size === emails.length;
        } },
      { id: 'allsaved', label: 'Every patient with a valid email ends up in the CRM', hint: 'Map the Email field from the form into the CRM step’s Email input.',
        test: ({ result, ds }) => {
          const want = new Set(ds.events.map((e) => e.data.email).filter(isEmail).map((e) => e.toLowerCase()));
          const have = new Set(result.state.crm.map((c) => c.email));
          return [...want].every((e) => have.has(e));
        } },
      { id: 'confirm', label: 'Each patient gets a confirmation email at their own address', hint: 'Send the email “To” the Email field from the form, not a fixed address.',
        test: ({ result, ds }) => {
          const valid = ds.events.filter((e) => isEmail(e.data.email));
          const sentTo = result.state.emails.map((m) => m.to);
          return valid.length > 0 && valid.every((e) => sentTo.includes(e.data.email.toLowerCase()));
        } },
      { id: 'byname', label: 'The email greets the patient by name', hint: 'Insert the Name field into the message (or the subject).',
        test: ({ result }) => {
          const r = result.runs.filter((x) => x.trace.some((t) => t.effect?.startsWith('Email sent')));
          return r.length > 0 && r.every((run) => {
            const mail = result.state.emails.find((m) => m.to === String(run.data.trigger.email).toLowerCase());
            return mail && `${mail.subject} ${mail.body}`.toLowerCase().includes(firstName(run.data.trigger.name));
          });
        } },
    ],
  },
  {
    id: 'route-urgent',
    unit: 'patterns',
    lesson: 'patterns-03',
    title: 'Route urgent patients',
    dataset: 'dental',
    brief: [
      'Bright Smile wants urgent requests (pain, bleeding, broken teeth) to reach the front desk within minutes, by text to 555-201-0000.',
      'Everything routine should go onto the “Waitlist” sheet with the patient’s name, reason, and preferred time.',
      'Use an AI step to decide urgent or routine. Nothing may slip through the cracks.',
    ],
    checks: [
      { id: 'trigger', label: 'Starts when the booking form is submitted', hint: 'Which trigger fires on a new form entry?',
        test: ({ wf }) => wf.trigger?.type === 'form.new' },
      { id: 'classify', label: 'An AI step sorts requests into fixed categories', hint: 'Use “AI: classify” with categories like “urgent, routine”, and switch on “Answer with exactly one of these categories”.',
        test: ({ wf }) => stepsOf(wf, 'ai.classify').some((s) => s.config.strict && labelList(s.config.labels).map((l) => l.toLowerCase()).includes('urgent')) },
      { id: 'router', label: 'A router splits on the AI’s answer', hint: 'Add “Split into paths” and set a path’s condition to the AI step’s Category.',
        test: ({ wf }) => {
          const ai = stepsOf(wf, 'ai.classify').map((s) => s.id);
          return stepsOf(wf, 'router').some((r) => r.branches.some((b) => ai.some((id) => refersTo(b.cond?.left, id))));
        } },
      { id: 'urgent', label: 'Every urgent request texts the front desk', hint: 'In the urgent path, send a text to 555-201-0000.',
        test: ({ result, ds }) => {
          const urgent = ds.events.filter((e) => e.ai.urgency === 'urgent').length;
          return result.state.sms.filter((m) => m.to === digits(ds.frontDesk)).length === urgent;
        } },
      { id: 'routine', label: 'Every routine request lands on the Waitlist sheet', hint: 'In the other path, add a spreadsheet row to “Waitlist”.',
        test: ({ result, ds }) => (result.state.sheets.Waitlist || []).length === ds.events.filter((e) => e.ai.urgency === 'routine').length },
      { id: 'useful', label: 'The front-desk text says who it is and why', hint: 'Insert the patient’s Name and Reason for visit into the text.',
        test: ({ result }) => {
          const runs = result.runs.filter((r) => r.trace.some((t) => t.effect?.startsWith('Text sent')));
          return runs.length > 0 && runs.every((r) => {
            const t = r.trace.find((x) => x.effect?.startsWith('Text sent'));
            const body = String(t.input?.body || '').toLowerCase();
            return body.includes(firstName(r.data.trigger.name)) && body.includes(String(r.data.trigger.reason).slice(0, 12).toLowerCase());
          });
        } },
      { id: 'nothinglost', label: 'No request falls through the cracks', hint: 'Look at the results: is any run “Dropped” or “Failed”? Check the router’s conditions match the AI’s exact categories.',
        test: ({ result }) => result.runs.length > 0 && result.runs.every((r) => r.status === 'ok') },
    ],
  },
];

export const challengeById = (id) => challenges.find((c) => c.id === id) || null;
export const challengeUnit = (id) => challengeById(id)?.unit || null;

export function starterWorkflow(c) {
  return c.starter ? JSON.parse(JSON.stringify(c.starter)) : newWorkflow(c.dataset);
}

/** Runs the workflow and every check. Returns { result, results: [{ id, label, pass, hint }], score, passed }. */
export function grade(c, wf) {
  const ds = datasetById(c.dataset);
  const result = runWorkflow(wf, ds);
  const results = c.checks.map((k) => {
    let pass = false;
    try { pass = !!k.test({ wf, result, ds }); } catch { pass = false; }
    return { id: k.id, label: k.label, hint: k.hint, pass };
  });
  const passed = results.filter((r) => r.pass).map((r) => r.id);
  return { result, results, passed, score: passed.length / c.checks.length };
}
