// M12 · L10 · Profit and saying no
export default {
  steps: [
    { tag: 'example', title: 'Two clients at the same price', visualFirst: true,
      visual: { type: 'compare', cols: ['', 'Client A', 'Client B'], rows: [
        ['Retainer', '$400/month', '$400/month'],
        ['Your hours per month', '2', '9'],
        ['Scope changes requested', 'Rarely, always via quotes', 'Weekly “quick” asks'],
        ['Pays on time', 'Yes', 'Usually late'],
        ['Effective rate', '$200/hour', '$44/hour'],
      ] },
      body: ['Same package, same price, very different businesses for you.'],
      check: {
        type: 'mc', q: 'What should you do about Client B?',
        options: ['Fix it: enforce scope and payment terms, re-price, or part ways politely', 'Nothing; revenue is revenue', 'Give B a discount', 'Drop Client A instead'], answer: 0,
        why: 'At one-person scale, time is the limit. A client at $44/hour crowds out better clients. Fix the terms first; if it doesn’t change, offboard kindly (Module 11).',
      },
      stuck: {
        metaphor: 'A restaurant table that orders one coffee and stays all evening on a busy night.',
        worked: ['A: $400 ÷ 2 h = $200/h.', 'B: $400 ÷ 9 h ≈ $44/h.', 'B takes time better clients could use.'],
      },
    },
    { tag: 'how', title: 'Watch profit per client',
      body: [
        'Track hours per client monthly. Compute each client’s effective rate.',
        'Fix low ones: enforce scope (Module 10), move to a higher tier, or raise the price at renewal.',
        'Say no up front to bad-fit clients: wrong niche, unstable processes, “just make it cheap”, disrespect for boundaries.',
      ] },
    { tag: 'try', title: 'Your turn: red flags in a prospect',
      check: {
        type: 'multi', q: 'Which are reasons to decline or carefully qualify a prospect?', options: ['“Our last three consultants were all useless.”', '“Can you do it for half if we promise referrals?”', '“We’ve mapped our process and know what we want.”', '“We need it live by tomorrow, and the scope is flexible.”'], answer: [0, 1, 3],
        why: 'Blaming everyone before you, discount-for-promises, and impossible timelines with fuzzy scope predict trouble. A mapped process is a great sign.',
      } },
    { tag: 'key', title: 'The solo business you’re building',
      body: [
        'A focused niche, one productized offer, a dozen or two well-paying retainer clients, agents doing the preparation, you doing the judgment.',
        'Profit grows through price and efficiency, not headcount. That’s the finish line of this module.',
      ] },
  ],
  quiz: [
    { type: 'num', q: 'A client pays $500/month and takes 8 hours. Effective rate?', answer: 62.5, tol: 0.01, prefix: '$', why: '$500 ÷ 8.' },
    { type: 'mc', q: 'First step with a low-profit client?', options: ['Enforce scope and terms, or move them up a tier', 'Immediately fire them', 'Give a discount', 'Ignore it'], answer: 0, why: 'Fix before you part ways.' },
    { type: 'mc', q: 'How does a solo business grow profit?', options: ['Price and efficiency', 'Hiring', 'More hours forever', 'Lower prices'], answer: 0, why: 'One-person scale.' },
  ],
  cards: [
    { id: 'rate', front: 'Track per client?', back: 'Hours and effective rate, monthly.' },
    { id: 'fix', front: 'Low-profit client?', back: 'Enforce scope, move up a tier, re-price at renewal, or offboard kindly.' },
    { id: 'finish', front: 'Solo finish line?', back: 'Niche + one productized offer + retainer clients + agents prepare, you decide.' },
  ],
};
