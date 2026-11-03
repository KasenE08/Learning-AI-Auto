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
  // ---------------- Module 1 ----------------
  {
    id: 'lead-alert',
    unit: 'found',
    lesson: 'found-04',
    title: 'Alert sales about every new lead',
    dataset: 'fitness',
    brief: [
      'Ironside Fitness’s ad signup page sends each new lead to a webhook. Today leads sit for days before anyone calls.',
      'Post every lead in #sales right away with their name, goal, and phone number.',
      'Also add each lead to the “Leads” sheet with the columns Name, Email, Phone, and Source.',
    ],
    checks: [
      { id: 'trigger', label: 'Starts when the signup page sends a lead', hint: 'The test data comes from a webhook. Pick the trigger that receives it.',
        test: ({ wf }) => wf.trigger?.type === 'webhook' },
      { id: 'posts', label: 'Every lead gets a #sales post with their name and goal', hint: 'Post to team chat, channel #sales, and insert the Full name and Goal fields.',
        test: ({ result, ds }) => ds.events.every((e) => result.state.chat.some((m) => m.channel === '#sales' && m.message.toLowerCase().includes(e.data.full_name.toLowerCase()) && m.message.toLowerCase().includes(e.data.goal.slice(0, 15).toLowerCase()))) },
      { id: 'phone', label: 'Posts include the phone number when there is one', hint: 'Insert the Phone field into the message too.',
        test: ({ result, ds }) => ds.events.filter((e) => e.data.phone).every((e) => result.state.chat.some((m) => m.message.includes(e.data.phone))) },
      { id: 'rows', label: 'Every lead is added to the Leads sheet', hint: 'Add a spreadsheet row to “Leads” in the same workflow.',
        test: ({ result, ds }) => (result.state.sheets.Leads || []).length === ds.events.length },
      { id: 'cols', label: 'Each row has the right Name, Email, Phone, and Source', hint: 'Name the four columns and map each one to its field. Watch for mixed-up columns.',
        test: ({ result, ds }) => {
          const rows = (result.state.sheets.Leads || []).map((r) => Object.fromEntries(Object.entries(r).map(([k, v]) => [k.trim().toLowerCase(), v])));
          return rows.length === ds.events.length && ds.events.every((e, i) => rows[i].name === e.data.full_name && rows[i].email === e.data.email && rows[i].phone === e.data.phone && rows[i].source === e.data.source);
        } },
    ],
  },
  {
    id: 'no-phone-route',
    unit: 'found',
    lesson: 'found-09',
    title: 'Route leads with and without a phone',
    dataset: 'fitness',
    brief: [
      'Ironside’s sales rep calls every lead, but some leads leave the phone field blank.',
      'Leads with a phone number: post in #sales “Call [name] at [phone]”.',
      'Leads without one: email them asking for the best number to reach them. Nobody should get both.',
    ],
    checks: [
      { id: 'trigger', label: 'Starts when the signup page sends a lead', hint: 'Which trigger receives data from another app?',
        test: ({ wf }) => wf.trigger?.type === 'webhook' },
      { id: 'branch', label: 'Splits on whether the phone is empty', hint: 'Use “Split into paths” with a condition on Phone: “is empty” or “is not empty”.',
        test: ({ wf }) => stepsOf(wf, 'router').some((r) => r.branches.some((b) => refersTo(b.cond?.left, 'trigger') && b.cond.left.includes('phone') && ['empty', 'not_empty'].includes(b.cond.op))) },
      { id: 'calls', label: 'Each lead with a phone gets a #sales post with that number', hint: 'In the “has a phone” path, post to #sales and insert Phone.',
        test: ({ result, ds }) => ds.events.filter((e) => e.data.phone).every((e) => result.state.chat.some((m) => m.channel === '#sales' && m.message.includes(e.data.phone))) },
      { id: 'emails', label: 'Each lead without a phone gets an email', hint: 'In the other path, send an email to the lead’s Email field.',
        test: ({ result, ds }) => ds.events.filter((e) => !e.data.phone).every((e) => result.state.emails.some((m) => m.to === e.data.email)) },
      { id: 'notboth', label: 'Nobody gets both', hint: 'Each action belongs in one path only.',
        test: ({ result, ds }) => result.state.chat.length + result.state.emails.length > 0 && ds.events.every((e) => {
          const posted = result.state.chat.some((m) => m.message.includes(e.data.full_name));
          const mailed = result.state.emails.some((m) => m.to === e.data.email);
          return !(posted && mailed);
        }) },
    ],
  },
  // ---------------- Module 2 ----------------
  {
    id: 'triage-inbox',
    unit: 'llm',
    lesson: 'llm-05',
    title: 'Triage the plumber’s inbox',
    dataset: 'plumbing',
    brief: [
      'Rivera Plumbing’s jobs inbox mixes emergencies, service calls, quotes, billing questions, and spam.',
      'Sort every email into exactly one of: emergency, service, quote, billing, spam.',
      'Emergencies: text the owner at 555-310-0001 with the address and the problem. Service calls and quotes: add a row to the “Jobs” sheet with the address, issue, and phone. Spam: do nothing.',
      'Never invent an address or phone number that isn’t in the email.',
    ],
    checks: [
      { id: 'trigger', label: 'Starts when an email arrives', hint: 'The test data comes from the shared inbox.',
        test: ({ wf }) => wf.trigger?.type === 'email.new' },
      { id: 'classify', label: 'Sorts into the five fixed categories', hint: 'AI: classify with “emergency, service, quote, billing, spam” and fixed answers switched on.',
        test: ({ wf }) => stepsOf(wf, 'ai.classify').some((s) => s.config.strict && ['emergency', 'service', 'quote', 'billing', 'spam'].every((l) => labelList(s.config.labels).map((x) => x.toLowerCase()).includes(l))) },
      { id: 'noinvent', label: 'Pulls out details without inventing any', hint: 'AI: extract details (address, issue, phone) with “Leave a detail empty if it is not in the text” on.',
        test: ({ wf, result }) => stepsOf(wf, 'ai.extract').length > 0 && result.runs.every((r) => r.trace.every((t) => !t.invented?.length)) },
      { id: 'emergency', label: 'The emergency texts the owner with the address', hint: 'In the emergency path, text 555-310-0001 and insert the extracted address and issue.',
        test: ({ result, ds }) => {
          const texts = result.state.sms.filter((m) => m.to === digits(ds.owner));
          return texts.length === ds.events.filter((e) => e.ai.intent === 'emergency').length && texts.every((m) => m.body.includes('14 Elm St'));
        } },
      { id: 'jobs', label: 'Service calls and quotes land on the Jobs sheet with their address', hint: 'Route service and quote to a spreadsheet row on “Jobs” with the extracted address.',
        test: ({ result, ds }) => {
          const rows = result.state.sheets.Jobs || [];
          const want = ds.events.filter((e) => ['service', 'quote'].includes(e.ai.intent));
          return rows.length === want.length && want.every((e) => rows.some((r) => Object.values(r).includes(e.extract.address)));
        } },
      { id: 'spam', label: 'Spam causes no action at all', hint: 'Spam may go down a path with no steps, or be stopped by a filter.',
        test: ({ result, ds }) => {
          const i = ds.events.findIndex((e) => e.ai.intent === 'spam');
          return result.runs[i] && !result.runs[i].trace.some((t) => t.effect && !t.effect.startsWith('Waited'));
        } },
      { id: 'clean', label: 'No email is dropped or fails', hint: 'Every category needs a path (an empty “Otherwise” path counts).',
        test: ({ result }) => result.runs.length > 0 && result.runs.every((r) => r.status === 'ok' || r.status === 'filtered') },
    ],
  },
  // ---------------- Module 3 ----------------
  {
    id: 'followup-sequence',
    unit: 'patterns',
    lesson: 'patterns-06',
    title: 'Welcome, wait, follow up',
    dataset: 'fitness',
    brief: [
      'Ironside wants every new lead to get a welcome email right away.',
      'One day later, a second email should remind them to book their free session.',
      'The reminder should greet them by first name only (“Hi Jordan”, not “Hi Jordan Bell”).',
    ],
    checks: [
      { id: 'trigger', label: 'Starts when a lead arrives', hint: 'The leads come from a webhook.',
        test: ({ wf }) => wf.trigger?.type === 'webhook' },
      { id: 'two', label: 'Every lead gets exactly two emails', hint: 'Two “Send email” steps, both to the lead’s Email.',
        test: ({ result, ds }) => ds.events.every((e) => result.state.emails.filter((m) => m.to === e.data.email).length === 2) },
      { id: 'wait', label: 'A wait of at least a day sits between them', hint: 'Put a “Wait” step set to 1 day between the two emails.',
        test: ({ wf }) => {
          const types = wf.steps.map((s) => s.type);
          const first = types.indexOf('email.send');
          const second = types.indexOf('email.send', first + 1);
          return first >= 0 && second > first && wf.steps.slice(first + 1, second).some((s) => s.type === 'delay' && ['1 day', '3 days'].includes(s.config.wait));
        } },
      { id: 'first', label: 'The reminder uses the first name only', hint: 'Add “Format a value” → First name only, and insert its result in the reminder.',
        test: ({ result }) => result.runs.length > 0 && result.runs.every((r) => {
          const mails = r.trace.filter((t) => t.effect?.startsWith('Email sent'));
          const body = `${mails[1]?.input.subject || ''} ${mails[1]?.input.body || ''}`.toLowerCase();
          const full = r.data.trigger.full_name.toLowerCase();
          return mails.length === 2 && body.includes(full.split(' ')[0]) && !body.includes(full);
        }) },
    ],
  },
  {
    id: 'no-duplicates',
    unit: 'patterns',
    lesson: 'patterns-07',
    title: 'Sync customers without duplicates',
    dataset: 'plumbing',
    brief: [
      'Rivera wants every real customer who emails the jobs inbox saved in the CRM.',
      'Grace Holt is already in the CRM. Don’t create a second Grace.',
      'Keep spam senders out of the CRM.',
    ],
    checks: [
      { id: 'trigger', label: 'Starts when an email arrives', hint: 'Use the new-email trigger.',
        test: ({ wf }) => wf.trigger?.type === 'email.new' },
      { id: 'saved', label: 'Every real customer is in the CRM', hint: 'Map the sender email and name into a CRM step.',
        test: ({ result, ds }) => ds.events.filter((e) => e.ai.intent !== 'spam').every((e) => result.state.crm.some((c) => c.email === e.data.from_email)) },
      { id: 'nodupe', label: 'Grace Holt appears only once', hint: 'Use “Find or create CRM contact”, which matches on email first.',
        test: ({ result }) => result.state.crm.length > result.startCrm && result.state.crm.filter((c) => c.email === 'grace.holt@example.com').length === 1 && new Set(result.state.crm.map((c) => c.email)).size === result.state.crm.length },
      { id: 'nospam', label: 'Spam senders stay out', hint: 'Classify the email first (fixed categories), then “Only continue if” the category is not spam.',
        test: ({ result, ds }) => result.state.crm.length > result.startCrm && ds.events.filter((e) => e.ai.intent === 'spam').every((e) => !result.state.crm.some((c) => c.email === e.data.from_email)) },
      { id: 'clean', label: 'No run fails', hint: 'Check the Results tab for red runs.',
        test: ({ result }) => result.runs.length > 0 && result.runs.every((r) => r.status === 'ok' || r.status === 'filtered') },
    ],
  },
  // ---------------- Module 4 ----------------
  {
    id: 'book-and-confirm',
    unit: 'integ',
    lesson: 'integ-03',
    title: 'Pencil in every request',
    dataset: 'dental',
    brief: [
      'Bright Smile wants a tentative hold on the calendar for every request, at the time the patient asked for.',
      'Title each hold with the patient’s name so the front desk can scan the day.',
      'Then email the patient that their preferred time is penciled in, quoting the time back to them. One bad email address must not stop the calendar hold.',
    ],
    checks: [
      { id: 'trigger', label: 'Starts when the booking form is submitted', hint: 'Pick the form trigger.',
        test: ({ wf }) => wf.trigger?.type === 'form.new' },
      { id: 'holds', label: 'Every request gets a calendar hold', hint: 'Add “Create calendar event” before the email.',
        test: ({ result, ds }) => result.state.calendar.length === ds.events.length },
      { id: 'title', label: 'Each hold’s title has the patient’s name', hint: 'Insert Name into the event title.',
        test: ({ result, ds }) => ds.events.every((e, i) => result.state.calendar[i]?.title.toLowerCase().includes(e.data.name.toLowerCase().split(' ')[0])) },
      { id: 'when', label: 'Each hold is at the patient’s preferred time', hint: 'Map “When” to the Preferred time field.',
        test: ({ result, ds }) => ds.events.every((e, i) => result.state.calendar[i]?.when === e.data.preferred_time) },
      { id: 'confirm', label: 'Patients with a valid email get the time quoted back', hint: 'Send an email to the patient and insert Preferred time into it.',
        test: ({ result, ds }) => ds.events.filter((e) => isEmail(e.data.email)).every((e) => result.state.emails.some((m) => m.to === e.data.email.toLowerCase() && m.body.includes(e.data.preferred_time))) },
      { id: 'order', label: 'A bad email doesn’t block the hold', hint: 'Create the hold first, then email. The calendar step must run even when the email fails.',
        test: ({ result, ds }) => result.state.calendar.length === ds.events.length && result.runs.every((r) => r.trace.some((t) => t.effect?.startsWith('Calendar'))) },
    ],
  },
  {
    id: 'sms-consent',
    unit: 'integ',
    lesson: 'integ-04',
    title: 'Text only with consent',
    dataset: 'dental',
    brief: [
      'Bright Smile wants to confirm every booking request.',
      'Text the patient only if they ticked “OK to text”. Everyone else gets an email instead.',
      'If a confirmation can’t be sent at all, alert the team in #ops-alerts so a human follows up.',
    ],
    checks: [
      { id: 'trigger', label: 'Starts when the booking form is submitted', hint: 'Pick the form trigger.',
        test: ({ wf }) => wf.trigger?.type === 'form.new' },
      { id: 'consent', label: 'Nobody who said no gets a text', hint: 'Split on “OK to text?”. Only the “yes” path may send a text.',
        test: ({ result, ds }) => result.state.sms.length > 0 && ds.events.filter((e) => e.data.sms_ok !== 'yes' && e.data.phone).every((e) => !result.state.sms.some((m) => m.to === digits(e.data.phone))) },
      { id: 'texts', label: 'Everyone who said yes gets a text', hint: 'Text the patient’s Phone field in the “yes” path.',
        test: ({ result, ds }) => ds.events.filter((e) => e.data.sms_ok === 'yes').every((e) => result.state.sms.some((m) => m.to === digits(e.data.phone))) },
      { id: 'emails', label: 'Everyone else with a valid email gets an email', hint: 'In the other path, email the patient.',
        test: ({ result, ds }) => ds.events.filter((e) => e.data.sms_ok !== 'yes' && isEmail(e.data.email)).every((e) => result.state.emails.some((m) => m.to === e.data.email.toLowerCase())) },
      { id: 'alert', label: 'An undeliverable confirmation alerts #ops-alerts', hint: 'Set the email step’s “If this step fails” to alert the team.',
        test: ({ result, ds }) => ds.events.filter((e) => e.data.sms_ok !== 'yes' && !isEmail(e.data.email)).every((e) => result.state.chat.some((m) => m.channel === '#ops-alerts' && m.message.includes(e.data.name))) },
      { id: 'clean', label: 'No run fails silently', hint: 'A red “Failed” run means nobody was told.',
        test: ({ result }) => result.runs.length > 0 && result.runs.every((r) => r.status !== 'error' && r.status !== 'dropped') },
    ],
  },
  // ---------------- Module 6 ----------------
  {
    id: 'error-alerts',
    unit: 'reliab',
    lesson: 'reliab-03',
    title: 'No silent failures',
    dataset: 'dental',
    brief: [
      'Bright Smile’s booking flow (save to CRM, email a confirmation) has been live for a week. Yesterday a patient’s request vanished and nobody noticed.',
      'Rebuild it so every failure alerts #ops-alerts with which patient failed and why, and the other requests still go through.',
    ],
    checks: [
      { id: 'trigger', label: 'Starts when the booking form is submitted', hint: 'Pick the form trigger.',
        test: ({ wf }) => wf.trigger?.type === 'form.new' },
      { id: 'steps', label: 'Saves to the CRM and emails the patient', hint: 'Use “Find or create CRM contact” and “Send email”.',
        test: ({ wf }) => stepsOf(wf, 'crm.upsert').length + stepsOf(wf, 'crm.create').length > 0 && stepsOf(wf, 'email.send').length > 0 },
      { id: 'alerted', label: 'The failed request alerts #ops-alerts by name', hint: 'Set “If this step fails” to “Stop and alert #ops-alerts” on the steps that can fail.',
        test: ({ result, ds }) => ds.events.filter((e) => !isEmail(e.data.email)).every((e) => result.state.chat.some((m) => m.channel === '#ops-alerts' && m.message.includes(e.data.name))) },
      { id: 'nosilent', label: 'No run fails silently', hint: 'Any red “Failed” run means a step with the default “Stop this run”.',
        test: ({ result }) => result.runs.length > 0 && result.runs.every((r) => r.status !== 'error' && r.status !== 'dropped') },
      { id: 'others', label: 'Every valid request still finishes', hint: 'The valid records should show “Finished”.',
        test: ({ result, ds }) => ds.events.filter((e) => isEmail(e.data.email)).length === result.runs.filter((r) => r.status === 'ok').length },
    ],
  },
  {
    id: 'minimize-data',
    unit: 'reliab',
    lesson: 'reliab-07',
    title: 'Keep health details out of chat',
    dataset: 'dental',
    brief: [
      'The front desk wants a ping in #front-desk for each urgent request.',
      'Every employee can read team chat, so share the minimum: the patient’s first name and “urgent request, see the CRM”.',
      'No last names, phone numbers, emails, or medical details in chat. Routine requests get no ping.',
    ],
    checks: [
      { id: 'trigger', label: 'Starts when the booking form is submitted', hint: 'Pick the form trigger.',
        test: ({ wf }) => wf.trigger?.type === 'form.new' },
      { id: 'urgent', label: 'Every urgent request pings #front-desk', hint: 'Classify urgent/routine with fixed answers, then post only on the urgent path.',
        test: ({ result, ds }) => result.state.chat.filter((m) => m.channel === '#front-desk').length === ds.events.filter((e) => e.ai.urgency === 'urgent').length },
      { id: 'first', label: 'Each ping names the patient by first name', hint: 'Format the name to “First name only” and insert that.',
        test: ({ result }) => result.state.chat.length > 0 && result.runs.filter((r) => r.trace.some((t) => t.effect?.startsWith('Chat #front-desk'))).every((r) => {
          const t = r.trace.find((x) => x.effect?.startsWith('Chat #front-desk'));
          return t.input.message.toLowerCase().includes(r.data.trigger.name.split(' ')[0].toLowerCase());
        }) },
      { id: 'min', label: 'No last name, phone, email, or medical detail', hint: 'Remove every other field from the message.',
        test: ({ result }) => {
          const posts = result.runs.flatMap((r) => r.trace.filter((t) => t.effect?.startsWith('Chat')).map((t) => [r.data.trigger, t.input.message.toLowerCase()]));
          return posts.length > 0 && posts.every(([d, m]) => {
            const last = d.name.split(' ').slice(1).join(' ').toLowerCase();
            return (!last || !m.includes(last)) && !/\d{3}\D?\d{4}/.test(m) && !m.includes('@') && !m.includes(d.reason.slice(0, 12).toLowerCase());
          });
        } },
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
