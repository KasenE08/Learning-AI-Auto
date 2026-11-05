// Client-ready templates. Fill the fields; the output is plain text you copy into your own docs or email.
// field kinds: text, longtext, number. `out(v)` builds the document from the values.
const money = (n) => `$${Math.round(Number(n) || 0).toLocaleString('en-US')}`;
const lines = (s) => String(s || '').split('\n').map((x) => x.trim()).filter(Boolean);
const bullets = (s, mark = '- ') => lines(s).map((x) => mark + x).join('\n') || `${mark}…`;

export function roiNumbers(v) {
  const hours = (Number(v.tasks) || 0) * (Number(v.minutes) || 0) / 60 * 52 / 12;
  const timeValue = hours * (Number(v.rate) || 0);
  const winValue = (Number(v.wins) || 0) * (Number(v.profit) || 0);
  const benefit = timeValue + winValue + (Number(v.recovered) || 0);
  const net = benefit - (Number(v.running) || 0);
  const setup = Number(v.setup) || 0;
  return { hours, timeValue, winValue, benefit, net, payback: net > 0 ? setup / net : Infinity, roi: setup > 0 ? (12 * net - setup) / setup : 0 };
}

export const templates = [
  {
    id: 'proposal', title: 'One-page proposal', blurb: 'Situation, plan, what changes, timeline, two options, next step (Module 9).',
    fields: [
      { key: 'client', label: 'Client business', placeholder: 'Riverbend Animal Clinic' },
      { key: 'decider', label: 'Prepared for', placeholder: 'Dr. Sam Whitfield and Keisha Moore' },
      { key: 'situation', label: 'Their situation, in their words (one line each)', kind: 'longtext', placeholder: 'About 25 web requests a week arrive after hours and wait until 8 am.' },
      { key: 'plan', label: 'What you’ll do (one line each)', kind: 'longtext', placeholder: 'Urgent requests text the on-call vet within a minute.' },
      { key: 'changes', label: 'What changes for them (one line each)', kind: 'longtext', placeholder: 'No more retyping requests.' },
      { key: 'timeline', label: 'Timeline', placeholder: 'Live 3 weeks after we get access' },
      { key: 'optA', label: 'Option A (name, setup, monthly, what’s in it)', placeholder: 'Core · $2,000 setup · $250/month · triage, urgent routing, confirmations' },
      { key: 'optB', label: 'Option B', placeholder: 'Core + reminders · $3,200 setup · $350/month · adds no-show reminders' },
      { key: 'notIncluded', label: 'Not included (one line each)', kind: 'longtext', placeholder: 'Website changes' },
      { key: 'next', label: 'Next step', placeholder: 'Sign the agreement, pay 50% of setup, and complete the access checklist.' },
    ],
    out: (v) => `PROPOSAL: ${v.client || '[Client]'}
Prepared for: ${v.decider || '[Decision-maker]'}

YOUR SITUATION
${bullets(v.situation)}

WHAT WE’LL DO
${bullets(v.plan)}

WHAT CHANGES
${bullets(v.changes)}

TIMELINE
${v.timeline || '[Timeline]'}

INVESTMENT
Option A: ${v.optA || '[Name · setup · monthly · includes]'}
Option B: ${v.optB || '[Name · setup · monthly · includes]'}

NOT INCLUDED
${bullets(v.notIncluded)}

NEXT STEP
${v.next || '[One specific next step]'}`,
  },
  {
    id: 'discovery', title: 'Discovery-call script', blurb: 'The five-part, 20-minute call with question layers (Module 9).',
    fields: [
      { key: 'prospect', label: 'Prospect name', placeholder: 'Keisha' },
      { key: 'business', label: 'Business', placeholder: 'Riverbend Animal Clinic' },
      { key: 'process', label: 'The process you’ll explore', placeholder: 'how web appointment requests get handled' },
      { key: 'intro', label: 'Your one-line intro', placeholder: 'I help clinics make sure no request slips through, day or night.' },
    ],
    out: (v) => `DISCOVERY CALL: ${v.business || '[Business]'} (about 20 minutes, you talk < 1/3)

1. OPEN (1 min)
“Thanks for making time, ${v.prospect || '[name]'}. ${v.intro || '[Your one-line intro]'} Before I share anything, OK if I ask a few questions about ${v.process || '[process]'}?”

2. CURRENT PROCESS (5 min)
- “Walk me through the last time this happened. What came first?”
- “What happened next?” (repeat until done)
- “What happens on weekends, or when someone’s out?”

3. PAIN AND COST (7 min)
- “What goes wrong? How often?”
- “How many a week? A busy week?”
- “What does one of those cost you: money, time, customers?”
- “What would it mean if that was fixed?”

4. DECISION (3 min)
- “Who else would be involved in a decision like this?”
- “Is there a budget range you’d want to stay within?”
- “Any timing that matters (a season, a launch)?”

5. SUMMARY + NEXT STEP (3 min)
“So, in your words: [problem]. It costs about [number]. Could we book 20 minutes with [decider] to walk through a one-page plan?”`,
  },
  {
    id: 'roi', title: 'ROI calculator', blurb: 'Hours, dollars and payback for a client’s process (Module 7). Use their numbers, conservatively.', roi: true,
    fields: [
      { key: 'client', label: 'Client', placeholder: 'Smoky Ridge Heating & Air' },
      { key: 'tasks', label: 'Tasks per week', kind: 'number', placeholder: '120' },
      { key: 'minutes', label: 'Minutes saved per task', kind: 'number', placeholder: '3' },
      { key: 'rate', label: 'Loaded cost per hour ($)', kind: 'number', placeholder: '25' },
      { key: 'wins', label: 'Extra wins per month', kind: 'number', placeholder: '1' },
      { key: 'profit', label: 'Profit per win ($)', kind: 'number', placeholder: '600' },
      { key: 'recovered', label: 'Other money recovered per month ($)', kind: 'number', placeholder: '0' },
      { key: 'running', label: 'Running costs + retainer per month ($)', kind: 'number', placeholder: '350' },
      { key: 'setup', label: 'Setup fee ($)', kind: 'number', placeholder: '2000' },
    ],
    out: (v) => {
      const r = roiNumbers(v);
      return `ROI ESTIMATE: ${v.client || '[Client]'} (conservative)

Time saved: ${r.hours.toFixed(1)} hours/month × ${money(v.rate)} = ${money(r.timeValue)}/month
Extra wins: ${Number(v.wins) || 0} × ${money(v.profit)} profit = ${money(r.winValue)}/month
Other money recovered: ${money(v.recovered)}/month
Monthly benefit: ${money(r.benefit)}
Running costs + retainer: ${money(v.running)}/month
NET MONTHLY BENEFIT: ${money(r.net)}

Setup fee: ${money(v.setup)}
Payback: ${Number.isFinite(r.payback) ? `${r.payback.toFixed(1)} months` : 'not reached (net benefit ≤ 0)'}
First-year ROI: ${Math.round(r.roi * 100)}%

Numbers come from your own records and are deliberately conservative.`;
    },
  },
  {
    id: 'pricing', title: 'Pricing sheet', blurb: 'Three tiers, usage terms, payment terms (Module 10).',
    fields: [
      { key: 'name', label: 'Package name', placeholder: 'Never Miss a Job' },
      { key: 'who', label: 'Who it’s for', placeholder: 'Home-service companies with 2–15 staff' },
      { key: 'outcome', label: 'Outcome', placeholder: 'Every lead and after-hours call answered in under a minute' },
      { key: 't1', label: 'Starter (setup · monthly · includes)', placeholder: '$1,200 · $150/month · lead capture + instant reply' },
      { key: 't2', label: 'Standard (recommended)', placeholder: '$2,500 · $350/month · + follow-up sequence' },
      { key: 't3', label: 'Complete', placeholder: '$4,500 · $650/month · + after-hours call handling' },
      { key: 'usage', label: 'Usage terms', placeholder: 'Phone and AI usage on your own accounts; alert at 80% of the monthly cap.' },
      { key: 'payment', label: 'Payment terms', placeholder: '50% of setup to start, 50% at launch; monthly billed in advance; 3-month initial term, then month to month.' },
    ],
    out: (v) => `${(v.name || '[Package name]').toUpperCase()}
For: ${v.who || '[Who it’s for]'}
Outcome: ${v.outcome || '[Outcome]'}

STARTER: ${v.t1 || '[setup · monthly · includes]'}
STANDARD (most choose this): ${v.t2 || '[setup · monthly · includes]'}
COMPLETE: ${v.t3 || '[setup · monthly · includes]'}

Usage: ${v.usage || '[usage terms]'}
Payment: ${v.payment || '[payment terms]'}
Changes outside the package are quoted in writing before work starts.`,
  },
  {
    id: 'onboarding', title: 'Onboarding checklist', blurb: 'Welcome, access, contacts, baseline, kickoff (Module 11).',
    fields: [
      { key: 'client', label: 'Client', placeholder: 'Riverbend Animal Clinic' },
      { key: 'decider', label: 'Decision-maker', placeholder: 'Dr. Sam Whitfield' },
      { key: 'daily', label: 'Day-to-day contact', placeholder: 'Keisha Moore' },
      { key: 'apps', label: 'Apps to access (one per line, with permission level)', kind: 'longtext', placeholder: 'Web form: editor\nCRM: create + read contacts' },
      { key: 'baseline', label: 'Baseline metric(s)', kind: 'longtext', placeholder: 'Urgent night requests wait ~12 hours' },
      { key: 'kickoff', label: 'Kickoff date', placeholder: 'Mon, Nov 9' },
      { key: 'launch', label: 'Target launch date', placeholder: 'Tue, Nov 24' },
    ],
    out: (v) => `ONBOARDING: ${v.client || '[Client]'}

[ ] Agreement signed and first payment received
[ ] Welcome email sent (kickoff ${v.kickoff || '[date]'}, launch target ${v.launch || '[date]'})
[ ] Contacts confirmed: decisions ${v.decider || '[name]'}, day to day ${v.daily || '[name]'}
[ ] Access granted (added as a user, never shared passwords):
${bullets(v.apps, '    [ ] ')}
[ ] Baseline recorded:
${bullets(v.baseline, '    - ')}
[ ] Kickoff call: scope, success measure, launch date confirmed
[ ] Test set prepared from anonymized examples
[ ] Client guide and runbook drafted before launch
[ ] Launch on a watched weekday morning; first report date booked`,
  },
  {
    id: 'contract', title: 'Contract outline', blurb: 'The clauses to cover with your lawyer. Concepts only, not legal advice (Module 13).',
    fields: [
      { key: 'you', label: 'Your business name', placeholder: 'Your Name Automation' },
      { key: 'client', label: 'Client', placeholder: 'Riverbend Animal Clinic' },
      { key: 'scope', label: 'Scope (included / not included)', kind: 'longtext', placeholder: 'Included: request triage, urgent routing, confirmations\nNot included: website changes' },
      { key: 'payment', label: 'Payment terms', placeholder: '50% at signing, 50% at launch; retainer monthly in advance' },
      { key: 'term', label: 'Term and termination', placeholder: '3-month initial term, then month to month with 30 days’ notice' },
      { key: 'cap', label: 'Liability cap', placeholder: 'Fees paid in the 3 months before the claim' },
      { key: 'state', label: 'Governing law (state)', placeholder: 'Tennessee' },
    ],
    out: (v) => `SERVICE AGREEMENT OUTLINE: ${v.you || '[You]'} and ${v.client || '[Client]'}
Concepts only. Not legal advice. Have a ${v.state || '[state]'} business lawyer review your template.

1. Scope
${bullets(v.scope, '   ')}
2. Change requests: work outside scope is quoted in writing; starts on approval.
3. Payment: ${v.payment || '[terms, due dates, late fees]'}
4. Client responsibilities: timely access, data and decisions; delays move dates.
5. Intellectual property: client owns its configured system; consultant keeps general templates and know-how.
6. Confidentiality and data protection: what consultant may access, how it’s protected, deletion at the end.
7. Third-party services: consultant isn’t responsible for outages, changes or prices of tools it doesn’t control.
8. Warranties: work done professionally; no guarantee of business outcomes (revenue, bookings).
9. Limitation of liability: ${v.cap || '[cap, e.g. fees paid in the prior 3 months]'}
10. Term and termination: ${v.term || '[term and notice]'}; handover and access removal on exit.
11. AI and compliance: AI is disclosed to end customers; client confirms consent for texts and recordings.
12. Governing law: ${v.state || '[state]'}.`,
  },
];

export const templateById = (id) => templates.find((t) => t.id === id) || null;
