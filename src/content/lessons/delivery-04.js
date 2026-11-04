// M11 · L04 · Documentation clients use
export default {
  steps: [
    { tag: 'example', title: 'Which doc gets read?', visualFirst: true,
      visual: { type: 'compare', cols: ['', 'Doc A', 'Doc B'], rows: [
        ['Length', '22 pages', '2 pages'],
        ['Starts with', 'Architecture and API details', '“What this does for you” in 3 bullets'],
        ['Includes', 'Every setting', 'How to pause it, who to call, what the alerts mean, how to change the reply wording'],
        ['Who reads it', 'Nobody', 'Brenda, on day one'],
      ], pick: 1 },
      body: ['Two handover documents for the same system.'],
      check: {
        type: 'mc', q: 'Who is client documentation for?',
        options: ['The people who use the system day to day', 'Other developers', 'You, as a memory aid only', 'Nobody'], answer: 0,
        why: 'Write for Brenda: what it does, what to do when something looks wrong, how to make common small changes. Keep your technical notes separately.',
      },
      stuck: {
        metaphor: 'A new car’s quick-start card vs the full service manual. Owners read the card.',
        worked: ['Doc A answers a developer’s questions.', 'Doc B answers the office manager’s.', 'The office manager is who uses it.'],
      },
    },
    { tag: 'how', title: 'Two documents, two readers',
      visual: {"type": "sort", "cols": ["Client guide", "Build notes + runbook"], "items": [{"text": "How to pause the system", "col": 0}, {"text": "Which API connections each workflow uses", "col": 1}, {"text": "What a failure alert means and who to call", "col": 0}, {"text": "The test set and change log", "col": 1}, {"text": "How to change the instant-reply wording", "col": 0}, {"text": "Accounts and permission levels", "col": 1, "why": "Technical details for whoever maintains it."}], "prompt": "Which document does each belong in?"},
      body: [
        '**Client guide (1–2 pages):** what it does, what they’ll see, how to pause it, what alerts mean, who to call, common small edits. Screenshots help.',
        '**Your build notes + runbook:** workflows, connections, accounts, test set, change log (Module 6). Shared with the client too, so they’re never locked in.',
      ] },
    { tag: 'try', title: 'Your turn: client guide or build notes?',
      check: {
        type: 'multi', q: 'Which belong in the **client guide**?',
        options: ['How to pause the system', 'What a failure alert means and who to contact', 'Which API endpoints each step calls', 'How to change the instant-reply wording'], answer: [0, 1, 3],
        why: 'API details belong in your build notes. The guide covers what a non-technical user needs.',
      } },
    { tag: 'biz', title: 'Docs reduce support load',
      predict: {"q": "Three clients ask the same question this month. What do you update?", "options": ["The client guide", "Nothing", "Your prices", "The contract"], "answer": 0, "why": "Every question the guide answers is a message you don’t get."},
      body: ['Every question the guide answers is a message you don’t get. Update it whenever you notice the same question twice.'] },
  ],
  quiz: [
    { type: 'mc', q: 'How long should a client guide be?', options: ['1–2 pages', '20+ pages', 'No guide', 'One sentence'], answer: 0, why: 'Short enough to read on day one.' },
    { type: 'multi', q: 'Client guide contents?', options: ['What it does', 'How to pause it', 'What alerts mean', 'Who to call'], answer: [0, 1, 2, 3], why: 'Practical, for daily users.' },
    { type: 'mc', q: 'Should the client get your build notes and runbook too?', options: ['Yes, so they’re never locked in', 'No, keep them secret', 'Only if they pay extra', 'Only if you quit'], answer: 0, why: 'Trust and fair handover.' },
  ],
  cards: [
    { id: 'two', front: 'Two documents?', back: 'Client guide (1–2 pages, for users) and build notes + runbook (technical, also shared).' },
    { id: 'guide', front: 'Client guide contents?', back: 'What it does, what they’ll see, how to pause, what alerts mean, who to call, small edits.' },
    { id: 'update', front: 'When to update docs?', back: 'When the same question comes up twice.' },
  ],
};
