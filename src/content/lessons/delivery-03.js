// M11 · L03 · Build cycles and check-ins
export default {
  steps: [
    { tag: 'example', title: 'Three weeks, visible progress', visualFirst: true,
      visual: { type: 'compare', cols: ['Week', 'You do', 'Client sees'], rows: [
        ['1', 'Build lead intake + instant reply on test data', '2-minute recording + “what’s next”'],
        ['2', 'Follow-up sequence, edge cases, alerts', 'Test run on their real form with your phone number'],
        ['3', 'Docs, training, soft launch', 'Live system + runbook + first report date'],
      ] },
      body: ['Smoky Ridge’s build, split into weekly cycles (fake).'],
      check: {
        type: 'mc', q: 'Why send a short recording every week?',
        options: ['The client sees progress and can catch misunderstandings early', 'To show off', 'Because it’s required', 'To avoid meetings entirely'], answer: 0,
        why: 'Silence makes clients nervous. Seeing a working piece early also surfaces “oh, that’s not what I meant” while it’s cheap to fix.',
      },
      stuck: {
        metaphor: 'A tailor’s fitting halfway through: you catch the sleeve length before the suit is finished.',
        worked: ['Weekly recordings show progress.', 'The client reacts to something real.', 'Misunderstandings get fixed early.'],
      },
    },
    { tag: 'how', title: 'A simple delivery rhythm',
      body: [
        'Split the build into weekly pieces, each ending in something the client can see.',
        'One short update per week: done, next, anything you need from them.',
        'Test with your own contact details before anything touches real customers (Module 6).',
        'Use the safe-change routine for every change after launch.',
      ] },
    { tag: 'try', title: 'Your turn: the weekly update',
      check: {
        type: 'mc', q: 'Best weekly update?', options: ['“Done: instant reply works on test leads (video). Next: follow-up sequence. Need: Brenda’s preferred wording by Thursday.”', '“Making progress!”', '“The API returned a 429 so I implemented exponential backoff.”', 'No update until launch'], answer: 0,
        why: 'Done, next, need. Plain words, a video, and a clear ask with a date.',
      } },
    { tag: 'warn', title: 'Waiting on the client',
      body: ['Most delays are waiting for access or answers. Ask with a date, follow up once, and say what slips if it doesn’t arrive. Write it down.'] },
  ],
  quiz: [
    { type: 'order', q: 'Order a weekly update.', items: ['What’s done (with proof)', 'What’s next', 'What you need from them, by when'], why: 'Done, next, need.' },
    { type: 'mc', q: 'Most common cause of delays?', options: ['Waiting for client access or answers', 'Slow computers', 'Bad weather', 'Too many meetings'], answer: 0, why: 'Ask early, with dates.' },
    { type: 'mc', q: 'Why split work into weekly visible pieces?', options: ['Progress is visible and misunderstandings surface early', 'It’s slower', 'Clients prefer surprises', 'For billing only'], answer: 0, why: 'Early feedback is cheap.' },
  ],
  cards: [
    { id: 'rhythm', front: 'Delivery rhythm?', back: 'Weekly pieces, each ending in something the client can see.' },
    { id: 'update', front: 'Weekly update format?', back: 'Done (with proof), next, need (with a date).' },
    { id: 'waiting', front: 'Client is slow with access?', back: 'Ask with a date, follow up once, state what slips.' },
  ],
};
