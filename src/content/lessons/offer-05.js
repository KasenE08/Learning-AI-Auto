// M08 · L05 · Guarantees and risk reversal
export default {
  steps: [
    { tag: 'example', title: 'Three guarantees', visualFirst: true,
      visual: { type: 'compare', cols: ['Guarantee', 'Good or risky?'], rows: [
        ['“Double your revenue or your money back.”', 'Risky: you don’t control revenue'],
        ['“If leads aren’t answered in under 5 minutes in month one, next month is free.”', 'Good: specific, measurable, in your control'],
        ['“Satisfaction guaranteed.”', 'Vague: invites disputes'],
      ] },
      body: ['You want to make saying yes feel safer for a nervous owner.'],
      check: {
        type: 'mc', q: 'What makes the second guarantee good?',
        options: ['It promises something you control and can measure', 'It’s the cheapest', 'It’s the most exciting', 'It sounds legal'], answer: 0,
        why: '[[risk-reversal|Risk reversal]] works when the promise is about your delivery (response time, uptime, launch date), not outcomes that depend on the owner’s business.',
      },
      stuck: {
        metaphor: 'A pizza place guarantees “30 minutes or it’s free”, not “you’ll enjoy dinner with your family”. They control delivery time, not your evening.',
        worked: ['Revenue depends on many things you don’t control.', 'Response time is entirely your system’s job.', 'Guarantee what you control.'],
      },
    },
    { tag: 'how', title: 'Ways to lower the client’s risk',
      body: [
        '**Performance guarantee** on what you control: response time, launch date, uptime.',
        '**Paid pilot:** a small, short first phase (one workflow, 30 days) before the full project.',
        '**Milestone payments:** part up front, part at launch, so they don’t pay everything before seeing it work.',
        '**Easy exit:** month-to-month retainers after the first term, with clear handover (Module 11).',
      ] },
    { tag: 'try', title: 'Your turn: write it safely',
      check: {
        type: 'mc', q: 'Which guarantee is safest for you and still attractive?', options: ['“Live within 21 days of getting access, or we refund the setup fee.”', '“You’ll get 10 new clients a month.”', '“Your staff will love it.”', '“100% uptime forever.”'], answer: 0,
        why: 'Specific, measurable, and in your control (as long as the client provides access, which is why that condition is written in).',
      } },
    { tag: 'warn', title: 'Write the conditions',
      body: [
        'Guarantees need conditions: the client provides access and data on time, uses the system as agreed, and the metric is measured a stated way.',
        'Put the exact wording in the contract (Module 13).',
      ] },
  ],
  quiz: [
    { type: 'mc', q: 'What should a guarantee promise?', options: ['Something you control and can measure', 'Revenue growth', 'Happiness', 'Anything the client wants'], answer: 0, why: 'Control and measurability.' },
    { type: 'multi', q: 'Risk reducers?', options: ['Paid pilot', 'Milestone payments', 'Performance guarantee on delivery', 'Unlimited free revisions forever'], answer: [0, 1, 2], why: 'Unlimited anything destroys your margin.' },
    { type: 'mc', q: 'Why write conditions into a guarantee?', options: ['It depends on the client doing their part (access, data, usage)', 'To avoid paying ever', 'Conditions look professional', 'They’re optional'], answer: 0, why: 'Fair to both sides, and clear.' },
  ],
  cards: [
    { id: 'control', front: 'Guarantee rule?', back: 'Promise what you control and can measure (response time, launch date), not revenue.' },
    { id: 'reducers', front: 'Four risk reducers?', back: 'Performance guarantee, paid pilot, milestone payments, easy exit.' },
    { id: 'conditions', front: 'Every guarantee needs?', back: 'Written conditions (client provides access/data; how it’s measured).' },
  ],
};
