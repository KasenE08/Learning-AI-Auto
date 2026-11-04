// M01 · L09 · Filters and branches
export default {
  steps: [
    { tag: 'example', title: 'One lead has no phone number', visualFirst: true,
      visual: { type: 'flow', nodes: [
        { label: 'New lead', kind: 'trigger', app: 'Webhook', data: { full_name: 'Kim Nguyen', email: 'kim.n@example.com', phone: '' } },
        { label: 'Split into paths', kind: 'logic', branches: [
          { label: 'Phone is not empty', nodes: [{ label: 'Post “Call Kim at …” in #sales', kind: 'action' }] },
          { label: 'Otherwise', nodes: [{ label: 'Email Kim: “Best number to reach you?”', kind: 'action', data: { to: 'kim.n@example.com' } }] },
        ] },
      ], branch: 1 },
      body: ['Kim skipped the phone field. The workflow checks before acting.'],
      check: {
        type: 'mc', q: 'Which path does Kim’s record take?', options: ['Otherwise: email Kim', 'Phone is not empty: post in #sales', 'Both paths', 'Neither; the run stops'], answer: 0,
        why: 'Phone is empty, so the first condition is false. The router sends the record down “Otherwise”.',
      },
      stuck: {
        metaphor: 'A mail sorter: each letter goes into exactly one slot. Letters with no matching slot go in the “other” bin.',
        worked: ['Check path 1’s condition: is Kim’s phone not empty? It’s empty, so no.', 'Move on to the next path: Otherwise catches everything else.', 'Kim goes down Otherwise.'],
      },
    },
    { tag: 'how', title: 'Filters stop; routers choose',
      predict: {"q": "A filter’s condition is false. What happens to the run?", "options": ["It stops quietly; not an error", "It fails with an error", "It skips one step and continues", "It retries"], "answer": 0, "why": "Filters end the run on purpose. Routers pick a path instead of stopping."},
      body: ["A [[filter]] checks a [[condition]]: true, carry on; false, the run stops quietly.", "A [[router]] checks paths top to bottom and sends the record down the **first** match. An **Otherwise** path catches the rest.", "A condition = a field + a comparison + a value: “Phone · is empty”."] },
    { tag: 'try', title: 'Your turn: filter or router?',
      check: {
        type: 'multi', q: 'Which of these call for a **router** (different actions per case), not a filter?',
        options: ['Urgent → text the dentist; routine → waitlist', 'Ignore spam, handle everything else the same', 'Big orders → manager; small orders → auto-approve', 'Only process leads from Instagram'], answer: [0, 2],
        why: 'Different actions per case = router. “Only these, else nothing” = filter.',
      } },
    { tag: 'warn', title: 'Conditions are literal',
      predict: {"q": "A path checks “Category is exactly urgent”. The value is “Urgent!”. Does it match?", "options": ["No", "Yes", "Only on weekdays", "Only if the AI is confident"], "answer": 0, "why": "Exact means exact. Standardize values first; Module 2 shows how AI can return fixed labels."},
      body: [
        '“is exactly urgent” does not match “Urgent!”, “urgent - pain”, or “URGENT ” in some tools. Clean or standardize values first (Module 2 shows how AI can return fixed labels).',
        'Order matters in a router: put the most specific path first. A path for “contains urgent” above “contains very urgent” catches both.',
        'Always decide what happens to records that match **no** path.',
      ] },
    { tag: 'build', title: 'Build it: route leads with and without a phone', build: { challenge: 'no-phone-route' },
      body: ['Ironside’s leads, two paths, and one rule: nobody gets both.'] },
  ],
  quiz: [
    { type: 'mc', q: 'A filter’s condition is false. What happens?', options: ['The run stops quietly; not an error', 'The run fails with an error', 'The next step is skipped and the rest continues', 'The workflow turns off'], answer: 0, why: 'Filters end the run on purpose. Nothing after them runs for that record.' },
    { type: 'mc', scenario: 'A router has two paths: “Category is exactly urgent” and “Category is exactly routine”. The AI returned “Routine (cleaning)”.', q: 'What happens to that record?',
      options: ['It’s dropped: no path matched and there’s no Otherwise', 'It goes down “routine”', 'It goes down both', 'The router picks the closest match'], answer: 0,
      why: 'Conditions are literal. Add an Otherwise path, and make the AI return exact labels.' },
    { type: 'order', q: 'A router checks paths in order. Arrange so “VIP refund” isn’t swallowed by the general refund path.', items: ['Customer is VIP AND topic is refund', 'Topic is refund', 'Topic is question', 'Otherwise'],
      why: 'Most specific first. If “Topic is refund” came first, VIP refunds would go there.' },
    { type: 'mc', q: 'Which condition finds leads with no phone?', options: ['Phone · is empty', 'Phone · is exactly “no”', 'Phone · contains “0”', 'Name · is empty'], answer: 0, why: 'A blank field is empty, not the word “no”.' },
  ],
  cards: [
    { id: 'filter', front: 'Filter?', back: 'Only continue if a condition is true. Otherwise the run stops quietly.' },
    { id: 'router', front: 'Router?', back: 'Sends each record down the first path whose condition matches.' },
    { id: 'otherwise', front: 'Why add an “Otherwise” path?', back: 'Records that match no path are dropped silently without one.' },
    { id: 'literal', front: 'Does “is exactly urgent” match “Urgent!”?', back: 'No. Conditions are literal; standardize values first.' },
    { id: 'order', front: 'Router path order rule?', back: 'Most specific path first.' },
  ],
};
