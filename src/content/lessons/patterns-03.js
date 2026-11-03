// M03 · L03 · Routers: branch by category
export default {
  steps: [
    { tag: 'example', title: 'Sort, then send', visualFirst: true,
      visual: { type: 'flow', nodes: [
        { label: 'Booking form', kind: 'trigger', data: { name: 'Lee Park', reason: 'Gum is swollen and bleeding a little' } },
        { label: 'AI: classify (urgent / routine, fixed)', kind: 'ai', data: { label: 'urgent' } },
        { label: 'Split into paths', kind: 'logic', branches: [
          { label: 'urgent', nodes: [{ label: 'Text the front desk', kind: 'action', data: { to: '555-201-0000', body: 'URGENT: Lee Park, swollen bleeding gum' } }] },
          { label: 'routine', nodes: [{ label: 'Add to Waitlist sheet', kind: 'action' }] },
          { label: 'Otherwise', nodes: [{ label: 'Alert #ops-alerts: “unclassified request”', kind: 'action' }] },
        ] },
      ] },
      body: ['Classify once, then route. Tap the blocks.'],
      check: {
        type: 'mc', q: 'What is the “Otherwise” path for, if the AI only answers urgent or routine?',
        options: ['Safety net: anything unexpected still reaches a person', 'Nothing; it’s never used', 'Spam', 'Routine requests'], answer: 0,
        why: 'Fixed answers make surprises rare, not impossible. A blank or garbled form still gets seen.',
      },
      stuck: {
        metaphor: 'Airport baggage belts: every bag goes to a belt, and bags with unreadable tags go to the lost-and-found desk, not the floor.',
        worked: ['Two paths cover the expected answers.', 'Otherwise catches anything else.', 'Nothing can fall through silently.'],
      },
    },
    { tag: 'how', title: 'The classify-and-route pattern',
      body: [
        'Step 1: one decision step (AI or a rule) that outputs a **single category** from a fixed list.',
        'Step 2: a router with one path per category, plus Otherwise.',
        'Keep the categories few and meaningful: each path should do something actually different.',
        'Write the categories down with the client. They’re business decisions, not technical ones.',
      ] },
    { tag: 'try', title: 'Your turn: how many paths?',
      check: {
        type: 'mc', scenario: 'A bakery wants: wedding cake inquiries → owner; custom birthday cakes → order form link; complaints → manager; everything else → standard auto-reply.',
        q: 'How many router paths, including the safety net?', options: ['4: wedding, birthday, complaint, Otherwise', '3', '5', '1'], answer: 0,
        why: 'Three specific paths plus Otherwise, which does the standard auto-reply. “Everything else” is exactly what Otherwise is for.',
      } },
    { tag: 'build', title: 'Build it: route urgent patients', build: { challenge: 'route-urgent' },
      body: ['Classify with fixed answers, route, and make sure no request falls through. Seven checks.'] },
  ],
  quiz: [
    { type: 'mc', q: 'Why classify into **one** field before routing?', options: ['Each path then checks one clean value', 'Routers can’t read text', 'It’s cheaper', 'AI must always come first'], answer: 0, why: 'One decision, made once, makes every path condition simple and exact.' },
    { type: 'mc', q: 'What should an Otherwise path usually do?', options: ['Alert a person or apply a safe default', 'Nothing', 'Delete the record', 'Retry the AI forever'], answer: 0, why: 'Make the unexpected visible or handle it safely.' },
    { type: 'multi', q: 'Good signs your categories are right?', options: ['Each path does something different', 'The client agreed on them', 'Almost nothing lands in Otherwise', 'There are at least 15 of them'], answer: [0, 1, 2], why: 'Few, meaningful, agreed categories. Fifteen is usually too many.' },
  ],
  cards: [
    { id: 'pattern', front: 'Classify-and-route pattern?', back: 'One step outputs a single category; a router has one path per category plus Otherwise.' },
    { id: 'otherwise', front: 'Otherwise path’s job?', back: 'Alert a person or apply a safe default for anything unexpected.' },
    { id: 'categories', front: 'Who decides the categories?', back: 'The client, with you. They’re business decisions.' },
  ],
};
