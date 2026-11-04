// M11 · L01 · Onboarding
export default {
  steps: [
    { tag: 'example', title: 'Week one, two ways', visualFirst: true,
      visual: { type: 'compare', cols: ['', 'Messy start', 'Clean start'], rows: [
        ['Day 1', 'Signed. Then silence for a week', 'Welcome email: kickoff time, what you need, what happens when'],
        ['Access', 'Ten emails asking for logins', 'One checklist; client adds you as a user to each app'],
        ['Contact', '“Who should I ask about the CRM?”', 'One named point of contact + backup'],
        ['Success measure', 'Never defined', 'Baseline recorded: response time today = 14 hours'],
      ], pick: 1 },
      body: ['Smoky Ridge just signed (fake).'],
      check: {
        type: 'mc', q: 'Why record a baseline in week one?',
        options: ['Without “before”, you can’t prove “after” at renewal time', 'It’s required by law', 'To fill the kickoff call', 'Clients ask for it'], answer: 0,
        why: 'The [[baseline]] (response time today, no-shows last month) is the number your results report compares against.',
      },
      stuck: {
        metaphor: 'A weight-loss program weighs you on day one. Without it, “you lost 10 pounds” is just a guess.',
        worked: ['Results need a comparison.', 'Measure before you change anything.', 'Then every report shows the difference.'],
      },
    },
    { tag: 'how', title: 'The onboarding checklist',
      visual: {"type": "sort", "cols": ["Welcome", "Access", "Contacts", "Baseline", "Kickoff"], "items": [{"text": "Email with kickoff date and timeline, sent the day they sign", "col": 0}, {"text": "Client adds you as a user to their CRM", "col": 1}, {"text": "Dale decides; Brenda handles day to day", "col": 2}, {"text": "“Leads currently wait about 14 hours for a reply”", "col": 3}, {"text": "Call to confirm scope and the launch date", "col": 4}, {"text": "Checklist of apps and permission levels", "col": 1, "why": "Which apps and what level of access you need."}], "prompt": "Which onboarding item is each?"},
      body: ["**Same-day welcome** with the timeline, and an **access checklist** (added as a user, never shared passwords).", "**Named contacts** and a **baseline** number recorded before anything changes.", "**Kickoff call:** confirm scope, success measure and launch date."] },
    { tag: 'try', title: 'Your turn: order the first week',
      check: {
        type: 'order', q: 'Order a clean onboarding.',
        items: ['Agreement signed and first payment', 'Welcome email with timeline', 'Access checklist completed', 'Kickoff call: scope, contacts, baseline', 'Build starts'],
        why: 'Paperwork, clear expectations, access, alignment, then work.',
      } },
    { tag: 'biz', title: 'Automate your own onboarding',
      predict: {"q": "What should trigger your own onboarding automation?", "options": ["The signed agreement", "Your memory", "The first support request", "The launch"], "answer": 0, "why": "Signed → welcome email → access checklist → kickoff link → reminders. The pipeline pattern again."},
      body: ['Signed agreement → welcome email → access checklist → kickoff booking link → reminders until access is done. You already know how to build this (Modules 3–4).'] },
  ],
  quiz: [
    { type: 'multi', q: 'What belongs in onboarding?', options: ['Welcome email with timeline', 'Access checklist', 'Named contacts', 'Baseline numbers', 'Shared password spreadsheet'], answer: [0, 1, 2, 3], why: 'Never shared passwords. Get added as a user.' },
    { type: 'mc', q: 'What is a baseline?', options: ['The key number before you change anything', 'The contract', 'A type of retainer', 'The launch date'], answer: 0, why: 'Before vs after.' },
    { type: 'mc', q: 'How should you get access to client apps?', options: ['The client adds you as a user with the right permissions', 'They email you their passwords', 'You guess', 'Use their admin login'], answer: 0, why: 'Removable, auditable access.' },
  ],
  cards: [
    { id: 'checklist', front: 'Onboarding checklist?', back: 'Welcome email, access checklist, named contacts, baseline, kickoff call.' },
    { id: 'baseline', front: 'Why a baseline?', back: 'To prove results later: before vs after.' },
    { id: 'access', front: 'Access method?', back: 'Added as a user with least privilege. Never shared passwords.' },
  ],
};
