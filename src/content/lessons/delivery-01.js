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
      body: [
        '**Same-day welcome:** kickoff date, what you need, the timeline.',
        '**Access checklist:** which apps, which permission level, added as a user (never shared passwords; Module 6).',
        '**Contacts:** one decision-maker, one day-to-day contact, and how fast each replies.',
        '**Baseline:** the key number(s) today.',
        '**Kickoff call:** confirm scope, map details, success measure, and launch date.',
      ] },
    { tag: 'try', title: 'Your turn: order the first week',
      check: {
        type: 'order', q: 'Order a clean onboarding.',
        items: ['Agreement signed and first payment', 'Welcome email with timeline', 'Access checklist completed', 'Kickoff call: scope, contacts, baseline', 'Build starts'],
        why: 'Paperwork, clear expectations, access, alignment, then work.',
      } },
    { tag: 'biz', title: 'Automate your own onboarding',
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
