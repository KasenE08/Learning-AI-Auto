// The sandbox's building blocks. Each one is configured visually (pick fields, choose options),
// never by writing code. `run` simulates what the real app would do, against fake data only.
//
// Input kinds:
//   field     pick one field from an earlier step              → stored as "{{step.key}}"
//   text      one line of text with fields mixed in             → "Hi {{trigger.name}}"
//   longtext  several lines, same as text
//   select    one of `options`
//   labels    a comma-separated list ("urgent, routine")
//   toggle    on / off
//   cond      { left: field, op, right: text }
//   columns   [{ name, value }] for spreadsheet rows

export const GROUPS = [
  { id: 'trigger', label: 'Triggers', hint: 'What starts the workflow' },
  { id: 'action', label: 'Actions', hint: 'Do something in an app' },
  { id: 'logic', label: 'Logic', hint: 'Decide, filter, reshape' },
  { id: 'ai', label: 'AI steps', hint: 'Simulated language model' },
];

export const OPS = [
  { id: 'equals', label: 'is exactly' },
  { id: 'not_equals', label: 'is not' },
  { id: 'contains', label: 'contains' },
  { id: 'empty', label: 'is empty', unary: true },
  { id: 'not_empty', label: 'is not empty', unary: true },
];

export const ON_ERROR = [
  { id: 'stop', label: 'Stop this run (default)' },
  { id: 'continue', label: 'Skip this step and keep going' },
  { id: 'alert', label: 'Stop and alert #ops-alerts' },
];

const CHANNELS = ['#front-desk', '#ops-alerts', '#sales'];
const WAITS = ['5 minutes', '1 hour', '1 day', '3 days'];
const FORMATS = [
  { id: 'lower', label: 'lowercase' }, { id: 'upper', label: 'UPPERCASE' }, { id: 'trim', label: 'Trim extra spaces' },
  { id: 'first', label: 'First name only' }, { id: 'digits', label: 'Digits only (phone)' }, { id: 'title', label: 'Capitalize Each Word' },
  { id: 'default', label: 'Use a default if empty' },
];

export const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(String(s || '').trim());
export const digits = (s) => String(s || '').replace(/\D/g, '');
export const isPhone = (s) => digits(s).length >= 10;
const firstName = (s) => String(s || '').trim().split(/\s+/)[0] || '';
const slug = (s) => String(s || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
export const labelList = (s) => String(s || '').split(',').map((x) => x.trim()).filter(Boolean);
const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);

/** Simulated AI classifier. Strict = structured output (must answer with one of the labels). */
function classify(text, labels, strict, event) {
  const lower = labels.map((l) => l.toLowerCase());
  if (!String(text || '').trim()) return { label: strict ? labels[0] || '' : 'Unsure (no text to read)', notes: ['The AI got no text to read. Check which field you mapped.'] };
  let key = Object.keys(event.ai || {}).find((k) => lower.includes(String(event.ai[k]).toLowerCase()));
  let truth = key ? event.ai[key] : null;
  const notes = [];
  if (!truth) {
    // none of the labels match what the record is really about: keyword guess
    const t = String(text).toLowerCase();
    const scored = labels.map((l) => [l, t.split(l.toLowerCase()).length - 1]).sort((a, b) => b[1] - a[1]);
    truth = scored[0]?.[1] > 0 ? scored[0][0] : null;
    if (!truth) {
      notes.push('None of your labels fit this record well, so the AI had to guess.');
      truth = labels[0] || 'other';
    }
  }
  if (strict) return { label: labels[lower.indexOf(String(truth).toLowerCase())] ?? truth, notes };
  const loose = key && event.loose?.[key];
  return { label: loose || `${cap(String(truth))}.`, notes: [...notes, 'Free-text answer: wording can change from run to run.'] };
}

const clip = (s, n = 40) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);
function madeUpNote(names) {
  const list = names.map((n) => `“${clip(n)}”`).join(', ');
  const one = names.length === 1;
  return `The AI made up ${one ? 'a value' : 'values'} for ${list}. ${one ? 'That detail isn’t' : 'Those details aren’t'} in this record’s text, so it guessed (a “hallucination”). The run kept going, but the guess is fake and was passed on to the next steps as if it were true. Fix: in “Details to pull out”, list short names of details the message actually has (like name, email, preferred time), and tick “Leave a detail empty if it is not in the text”.`;
}

function extract(text, fields, strict, event, dataset) {
  const out = {};
  const invented = [];
  const names = [];
  for (const f of fields) {
    const k = slug(f);
    const found = event.extract?.[k];
    if (found && String(text || '').toLowerCase().includes(found.split(' ')[0].toLowerCase())) out[k] = found;
    else if (strict) out[k] = '';
    else { out[k] = dataset.fabricate?.[k] || `Unknown ${f}`; invented.push(k); names.push(f); }
  }
  return { out, invented, names };
}

export const BLOCKS = {
  // ---------------- triggers ----------------
  'form.new': { group: 'trigger', app: 'Form', label: 'New form entry', desc: 'Runs once each time someone submits a form.', inputs: [] },
  'email.new': { group: 'trigger', app: 'Email', label: 'New email received', desc: 'Runs once for each email that arrives in an inbox.', inputs: [] },
  webhook: { group: 'trigger', app: 'Webhook', label: 'Webhook received', desc: 'Runs when another app sends data to this workflow’s unique web address.', inputs: [] },
  schedule: { group: 'trigger', app: 'Clock', label: 'On a schedule', desc: 'Runs at set times (every hour, every Monday…). Gets no record by itself.', inputs: [
    { key: 'every', label: 'Every', kind: 'select', options: ['hour', 'day at 8:00', 'Monday at 8:00'] },
  ] },

  // ---------------- actions ----------------
  'crm.create': {
    group: 'action', app: 'CRM', label: 'Create CRM contact', desc: 'Adds a new contact every time. Does not check if they already exist.',
    inputs: [
      { key: 'email', label: 'Email', kind: 'field', required: true }, { key: 'name', label: 'Name', kind: 'field' },
      { key: 'phone', label: 'Phone', kind: 'field' }, { key: 'note', label: 'Note', kind: 'text' },
    ],
    outputs: [{ key: 'contact_id', label: 'Contact ID' }],
    run(c, ctx) {
      if (!c.email) return { error: 'Email is empty, and the CRM requires one.' };
      if (!isEmail(c.email)) return { error: `“${c.email}” is not a valid email address, so the CRM rejected it.` };
      const id = `c${ctx.state.crm.length + 1}`;
      ctx.state.crm.push({ id, name: c.name, email: c.email.trim().toLowerCase(), phone: c.phone, note: c.note });
      return { output: { contact_id: id }, effect: `CRM: new contact ${c.name || c.email}` };
    },
  },
  'crm.upsert': {
    group: 'action', app: 'CRM', label: 'Find or create CRM contact', desc: 'Looks the person up by email first. Updates them if found, creates them if not.',
    inputs: [
      { key: 'email', label: 'Email (used to match)', kind: 'field', required: true }, { key: 'name', label: 'Name', kind: 'field' },
      { key: 'phone', label: 'Phone', kind: 'field' }, { key: 'note', label: 'Note', kind: 'text' },
    ],
    outputs: [{ key: 'contact_id', label: 'Contact ID' }, { key: 'was_new', label: 'Was new? (yes/no)' }],
    run(c, ctx) {
      if (!c.email) return { error: 'Email is empty, and the CRM requires one to match on.' };
      if (!isEmail(c.email)) return { error: `“${c.email}” is not a valid email address, so the CRM rejected it.` };
      const email = c.email.trim().toLowerCase();
      const hit = ctx.state.crm.find((x) => x.email === email);
      if (hit) {
        Object.assign(hit, { name: c.name || hit.name, phone: c.phone || hit.phone, note: c.note || hit.note });
        return { output: { contact_id: hit.id, was_new: 'no' }, effect: `CRM: updated ${hit.name || email}` };
      }
      const id = `c${ctx.state.crm.length + 1}`;
      ctx.state.crm.push({ id, name: c.name, email, phone: c.phone, note: c.note });
      return { output: { contact_id: id, was_new: 'yes' }, effect: `CRM: new contact ${c.name || email}` };
    },
  },
  'sheet.add': {
    group: 'action', app: 'Sheet', label: 'Add spreadsheet row', desc: 'Adds one row to a sheet. You choose what goes in each column.',
    inputs: [{ key: 'sheet', label: 'Sheet', kind: 'sheet' }, { key: 'columns', label: 'Columns', kind: 'columns' }],
    outputs: [{ key: 'row_number', label: 'Row number' }],
    run(c, ctx) {
      const rows = (ctx.state.sheets[c.sheet] ||= []);
      const row = Object.fromEntries((c.columns || []).filter((x) => x.name).map((x) => [x.name, x.value]));
      if (!Object.keys(row).length) return { error: 'No columns set, so there is nothing to write.' };
      rows.push(row);
      return { output: { row_number: String(rows.length + 1) }, effect: `Sheet “${c.sheet}”: row ${rows.length + 1} added` };
    },
  },
  'email.send': {
    group: 'action', app: 'Email', label: 'Send email', desc: 'Sends an email from the business’s address.',
    inputs: [{ key: 'to', label: 'To', kind: 'field', required: true }, { key: 'subject', label: 'Subject', kind: 'text' }, { key: 'body', label: 'Message', kind: 'longtext' }],
    run(c, ctx) {
      if (!c.to) return { error: 'No “To” address.' };
      if (!isEmail(c.to)) return { error: `“${c.to}” is not a valid email address, so the email bounced.` };
      if (!c.body?.trim()) return { error: 'The message is empty.' };
      ctx.state.emails.push({ to: c.to.trim().toLowerCase(), subject: c.subject, body: c.body });
      return { output: {}, effect: `Email sent to ${c.to}` };
    },
  },
  'sms.send': {
    group: 'action', app: 'SMS', label: 'Send text message', desc: 'Sends an SMS. Needs a valid phone number (and, for customers, their consent).',
    inputs: [{ key: 'to', label: 'To (phone)', kind: 'text', required: true }, { key: 'body', label: 'Message', kind: 'longtext' }],
    run(c, ctx) {
      if (!c.to?.trim()) return { error: 'No phone number to text.' };
      if (!isPhone(c.to)) return { error: `“${c.to}” is not a full phone number.` };
      if (!c.body?.trim()) return { error: 'The message is empty.' };
      ctx.state.sms.push({ to: digits(c.to), body: c.body });
      return { output: {}, effect: `Text sent to ${c.to}` };
    },
  },
  'cal.create': {
    group: 'action', app: 'Calendar', label: 'Create calendar event', desc: 'Puts an event on the business calendar.',
    inputs: [{ key: 'title', label: 'Title', kind: 'text', required: true }, { key: 'when', label: 'When', kind: 'text', required: true }],
    run(c, ctx) {
      if (!c.title?.trim() || !c.when?.trim()) return { error: 'An event needs a title and a time.' };
      ctx.state.calendar.push({ title: c.title, when: c.when });
      return { output: {}, effect: `Calendar: “${c.title}” (${c.when})` };
    },
  },
  'chat.post': {
    group: 'action', app: 'Team chat', label: 'Post to team chat', desc: 'Posts a message in a team channel.',
    inputs: [{ key: 'channel', label: 'Channel', kind: 'select', options: CHANNELS }, { key: 'message', label: 'Message', kind: 'longtext', required: true }],
    run(c, ctx) {
      if (!c.message?.trim()) return { error: 'The message is empty.' };
      ctx.state.chat.push({ channel: c.channel, message: c.message });
      return { output: {}, effect: `Chat ${c.channel}: message posted` };
    },
  },
  delay: {
    group: 'logic', app: 'Clock', label: 'Wait', desc: 'Pauses this run, then carries on. (Simulated: no real waiting.)',
    inputs: [{ key: 'wait', label: 'Wait for', kind: 'select', options: WAITS }],
    run(c) { return { output: {}, effect: `Waited ${c.wait}` }; },
  },

  // ---------------- logic ----------------
  filter: {
    group: 'logic', app: 'Logic', label: 'Only continue if…', desc: 'Stops the run quietly when the condition is false. Not an error.',
    inputs: [{ key: 'cond', label: 'Continue only if', kind: 'cond' }],
  },
  router: {
    group: 'logic', app: 'Logic', label: 'Split into paths', desc: 'Sends each record down the first path whose condition matches.',
    inputs: [],
  },
  format: {
    group: 'logic', app: 'Formatter', label: 'Format a value', desc: 'Cleans up one value: lowercase, first name, digits only…',
    inputs: [
      { key: 'value', label: 'Value', kind: 'field', required: true }, { key: 'op', label: 'Change it to', kind: 'select', options: FORMATS.map((f) => f.id), optionLabels: Object.fromEntries(FORMATS.map((f) => [f.id, f.label])) },
      { key: 'fallback', label: 'Default (if empty)', kind: 'text', showIf: (cfg) => cfg.op === 'default' },
    ],
    outputs: [{ key: 'value', label: 'Formatted value' }],
    run(c) {
      const v = String(c.value ?? '');
      const map = {
        lower: () => v.toLowerCase(), upper: () => v.toUpperCase(), trim: () => v.replace(/\s+/g, ' ').trim(), first: () => firstName(v),
        digits: () => digits(v), title: () => v.toLowerCase().replace(/\b\w/g, (m) => m.toUpperCase()), default: () => (v.trim() ? v : c.fallback || ''),
      };
      return { output: { value: (map[c.op] || map.trim)() } };
    },
  },

  // ---------------- AI (simulated) ----------------
  'ai.classify': {
    group: 'ai', app: 'AI', label: 'AI: classify', desc: 'Reads some text and picks a category.',
    inputs: [
      { key: 'text', label: 'Text to read', kind: 'longtext', required: true },
      { key: 'labels', label: 'Categories (comma-separated)', kind: 'labels', required: true },
      { key: 'strict', label: 'Answer with exactly one of these categories (structured output)', kind: 'toggle' },
    ],
    outputs: [{ key: 'label', label: 'Category' }],
    run(c, ctx) {
      const labels = labelList(c.labels);
      if (!labels.length) return { error: 'No categories set.' };
      const r = classify(c.text, labels, !!c.strict, ctx.event);
      return { output: { label: r.label }, notes: r.notes };
    },
  },
  'ai.extract': {
    group: 'ai', app: 'AI', label: 'AI: extract details', desc: 'Pulls specific facts out of messy text.',
    inputs: [
      { key: 'text', label: 'Text to read', kind: 'longtext', required: true },
      { key: 'fields', label: 'Details to pull out (comma-separated)', kind: 'labels', required: true },
      { key: 'strict', label: 'Leave a detail empty if it is not in the text', kind: 'toggle' },
    ],
    outputs: (cfg) => labelList(cfg.fields).map((f) => ({ key: slug(f), label: cap(f) })),
    run(c, ctx) {
      const fields = labelList(c.fields);
      if (!fields.length) return { error: 'No details listed to extract.' };
      const r = extract(c.text, fields, !!c.strict, ctx.event, ctx.dataset);
      return { output: r.out, invented: r.invented, notes: r.names.length ? [madeUpNote(r.names)] : [] };
    },
  },
  'ai.draft': {
    group: 'ai', app: 'AI', label: 'AI: draft a reply', desc: 'Writes a short message from your instructions and the record.',
    inputs: [{ key: 'instructions', label: 'Instructions', kind: 'longtext', required: true }, { key: 'context', label: 'What it should know', kind: 'longtext' }],
    outputs: [{ key: 'draft', label: 'Draft' }],
    run(c, ctx) {
      if (!c.instructions?.trim()) return { error: 'No instructions.' };
      const d = ctx.event.data;
      const who = firstName(d.name || d.from_name || d.full_name) || 'there';
      const about = ctx.event.summary ? ctx.event.summary.replace(/\.$/, '').toLowerCase() : 'your message';
      const notes = c.context?.trim() ? [] : ['The AI was given no record details, so the draft is generic.'];
      const text = c.context?.trim() ? `Hi ${who}, thanks for reaching out about ${about}. We’ll get back to you shortly with next steps.` : 'Hi there, thanks for reaching out. We’ll get back to you shortly.';
      return { output: { draft: text }, notes };
    },
  },
  'ai.summarize': {
    group: 'ai', app: 'AI', label: 'AI: summarize', desc: 'Boils text down to one line.',
    inputs: [{ key: 'text', label: 'Text to summarize', kind: 'longtext', required: true }],
    outputs: [{ key: 'summary', label: 'Summary' }],
    run(c, ctx) {
      if (!c.text?.trim()) return { output: { summary: '' }, notes: ['Nothing to summarize: the text was empty.'] };
      return { output: { summary: ctx.event.summary || String(c.text).slice(0, 80) } };
    },
  },
};

export const blockDef = (type) => BLOCKS[type] || null;
export const blocksIn = (group) => Object.entries(BLOCKS).filter(([, b]) => b.group === group).map(([type, b]) => ({ type, ...b }));
export const formatLabel = (id) => FORMATS.find((f) => f.id === id)?.label || id;
export { CHANNELS, WAITS };

/** Output fields a step makes available to later steps. */
export function outputsOf(step) {
  const b = BLOCKS[step.type];
  if (!b?.outputs) return [];
  return typeof b.outputs === 'function' ? b.outputs(step.config || {}) : b.outputs;
}

/** Default config for a freshly added step. */
export function defaultConfig(type, dataset) {
  const b = BLOCKS[type];
  const cfg = {};
  for (const i of b.inputs) {
    if (i.kind === 'select') cfg[i.key] = i.options[0];
    else if (i.kind === 'toggle') cfg[i.key] = false;
    else if (i.kind === 'cond') cfg[i.key] = { left: '', op: 'equals', right: '' };
    else if (i.kind === 'columns') cfg[i.key] = [{ name: '', value: '' }];
    else if (i.kind === 'sheet') cfg[i.key] = Object.keys(dataset?.apps?.sheets || { Sheet1: [] })[0];
    else cfg[i.key] = '';
  }
  return cfg;
}
