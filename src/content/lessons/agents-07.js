// M05 · L07 · Multi-agent systems
export default {
  steps: [
    { tag: 'example', title: 'One agent doing everything vs a small team', visualFirst: true,
      visual: { type: 'compare', cols: ['', 'One big agent', 'Three focused agents'], rows: [
        ['Instructions', '6 pages covering booking, billing, FAQs, complaints', 'One page each: Booking, Billing, FAQ'],
        ['Tools', 'All 9 tools, including refunds', 'Booking: calendar only. Billing: invoices only. FAQ: none'],
        ['Typical problem', 'Mixes up rules; uses the wrong tool', 'Hand-offs between agents can lose context'],
      ] },
      body: ['A clinic’s assistant grew too big. You’re considering splitting it.'],
      check: {
        type: 'mc', q: 'What’s the main benefit of the split?',
        options: ['Each agent has narrow instructions and only the tools its job needs', 'It’s always cheaper', 'It removes the need for testing', 'Customers prefer more bots'], answer: 0,
        why: 'Focused agents are easier to instruct, test and secure. The cost is coordination (next lesson).',
      },
      stuck: {
        metaphor: 'One person running reception, billing and the phones gets confused. Three people at three desks each do one job well, but they have to pass papers between them.',
        worked: ['The big agent juggles everything.', 'Split agents each get one job and fewer tools.', 'Benefit: focus. Cost: hand-offs.'],
      },
    },
    { tag: 'how', title: 'When more agents help',
      predict: {"q": "A one-agent FAQ bot passes 98% of its tests. Split it into five agents?", "options": ["No; split only when one agent struggles", "Yes, more is better", "Yes, for the case study", "Only on weekends"], "answer": 0, "why": "Splitting adds hand-offs, cost and testing. Do it for a real reason."},
      body: [
        'A [[multi-agent]] system splits work across agents with different roles, instructions and tools.',
        'Helps when jobs are clearly different (booking vs billing), need different permissions, or one prompt is overloaded.',
        'Hurts when you split for its own sake: more hand-offs, more cost, harder to test. Start with one agent; split when it struggles.',
      ] },
    { tag: 'see', title: 'Common team shapes',
      visual: {"type": "sort", "cols": ["Router + specialists", "Pipeline", "Maker + checker"], "items": [{"text": "A front agent sends booking to one agent and billing to another", "col": 0}, {"text": "Research → draft → review, in order", "col": 1}, {"text": "One agent drafts a proposal; another checks it against pricing rules", "col": 2}, {"text": "Clinic: Booking, Billing, FAQ agents behind one chat", "col": 0}, {"text": "Transcribe → summarize → file", "col": 1, "why": "Each agent does one stage and passes it on."}, {"text": "A writer agent plus a fact-checker agent", "col": 2}], "prompt": "Match each setup to its team shape."},
       },
    { tag: 'try', title: 'Your turn: split or not?',
      check: {
        type: 'multi', q: 'Which situations justify a second agent?',
        options: ['Refunds need a separate, tightly limited agent with approval', 'You want it to look advanced', 'A reviewer agent should check every outgoing proposal against pricing rules', 'The single agent works well on all test cases'], answer: [0, 2],
        why: 'Different permissions and an independent check are real reasons. Looking advanced and “it already works” aren’t.',
      } },
  ],
  quiz: [
    { type: 'mc', q: 'Main benefit of multiple focused agents?', options: ['Narrow instructions and least tools per job', 'Always lower cost', 'No testing needed', 'Faster replies, always'], answer: 0, why: 'Focus and security.' },
    { type: 'mc', q: 'Main cost?', options: ['Coordination: hand-offs can lose context, more to test', 'They can’t use tools', 'Customers notice', 'None'], answer: 0, why: 'Every hand-off is a place to drop the baton.' },
    { type: 'mc', scenario: 'A one-agent FAQ bot answers 98% of test questions correctly.', q: 'Should you split it into five agents?', options: ['No; split only when one agent struggles', 'Yes, more is better', 'Yes, for the case study', 'Only on weekends'], answer: 0, why: 'Don’t add complexity without a problem to solve.' },
  ],
  cards: [
    { id: 'multi', front: 'Multi-agent system?', back: 'Several agents with different roles, instructions and tools working together.' },
    { id: 'when', front: 'When to split into more agents?', back: 'Clearly different jobs, different permissions, or an overloaded prompt. Not by default.' },
    { id: 'shapes', front: 'Three team shapes?', back: 'Router + specialists, pipeline, maker + checker.' },
  ],
};
