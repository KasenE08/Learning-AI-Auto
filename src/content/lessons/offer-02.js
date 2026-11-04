// M08 · L02 · Picking a niche: a scoring method
const scorer = {
  type: 'calc',
  inputs: [
    { key: 'pain', label: 'Pain: how much the problem costs them (1–5)', min: 1, max: 5, value: 4 },
    { key: 'pay', label: 'Ability to pay (1–5)', min: 1, max: 5, value: 3 },
    { key: 'reach', label: 'Can you reach them? (1–5)', min: 1, max: 5, value: 4 },
    { key: 'repeat', label: 'Same problem across many of them (1–5)', min: 1, max: 5, value: 5 },
    { key: 'you', label: 'Your interest / access (1–5)', min: 1, max: 5, value: 3 },
    { key: 'risk', label: 'Regulation / data risk (1 = high risk, 5 = low)', min: 1, max: 5, value: 4 },
  ],
  outputs: [
    { label: 'Weighted score (out of 100)', f: (v) => ((v.pain * 25 + v.pay * 20 + v.reach * 20 + v.repeat * 15 + v.you * 10 + v.risk * 10) / 5), fmt: 'num', big: true },
  ],
  caption: 'Weights: pain 25%, pay 20%, reach 20%, repeatability 15%, you 10%, risk 10%. Adjust them to taste.',
};
export default {
  steps: [
    { tag: 'example', title: 'Scoring “HVAC companies in East Tennessee”', visualFirst: true, visual: scorer,
      body: ['Rate a candidate niche on six criteria. The starting values are one honest guess for HVAC companies (fake research).'],
      check: {
        type: 'mc', q: 'Which criterion has the biggest weight here, and why?',
        options: ['Pain: no pain, no purchase, however easy they are to reach', 'Your interest: passion matters most', 'Risk', 'They’re all equal'], answer: 0,
        why: 'If the problem doesn’t cost them much, nothing else matters. Pain first, then ability to pay and reachability.',
      },
      stuck: {
        metaphor: 'Choosing where to open a food truck: hungry crowds (pain) with money (pay) that you can actually park near (reach).',
        worked: ['Look at the caption’s weights.', 'Pain is 25%, the largest.', 'Because without pain, nobody buys.'],
      },
    },
    { tag: 'how', title: 'Six criteria',
      body: [
        '**Pain:** the problem costs real money or stress, often.',
        '**Ability to pay:** healthy margins; a few thousand dollars is a normal purchase for them.',
        '**Reach:** you can find and talk to them (associations, local groups, people you know).',
        '**Repeatability:** many businesses have the same problem with similar tools.',
        '**You:** interest, background, or connections that give you an edge.',
        '**Risk:** heavy regulation or sensitive data raises the bar (Module 13).',
      ] },
    { tag: 'try', title: 'Your turn: compare two',
      check: {
        type: 'mc', scenario: 'Niche A scores 78: home-service companies (HVAC, plumbing) near you. Niche B scores 61: hospitals.',
        q: 'Why might B score lower even though hospitals have big budgets?', options: ['Hard to reach as a solo newcomer, heavy regulation, long buying cycles', 'Hospitals have no pain', 'Hospitals don’t use software', 'Scores are random'], answer: 0,
        why: 'Big budgets don’t help if you can’t reach the buyer or meet the compliance bar. Solo consultants usually start with owner-run businesses.',
      } },
    { tag: 'biz', title: 'Score three, test one',
      body: [
        'Score three candidate niches. Pick the top one for 60–90 days of focused outreach (Module 9).',
        'Then re-score with what you learned in real conversations. The scoring is a starting point, not a verdict.',
      ] },
  ],
  quiz: [
    { type: 'order', q: 'Order the criteria by weight in this method (highest first).', items: ['Pain', 'Ability to pay', 'Reach', 'Repeatability', 'Your interest'], why: 'Pain 25%, pay 20%, reach 20%, repeatability 15%, you 10% (risk also 10%).' },
    { type: 'mc', q: 'Why is reach a criterion?', options: ['A great niche you can’t talk to won’t produce clients', 'Reach doesn’t matter online', 'It’s the least important', 'Because of taxes'], answer: 0, why: 'You need conversations to get clients.' },
    { type: 'mc', q: 'After scoring three niches, what next?', options: ['Test the top one for 60–90 days, then re-score', 'Pursue all three at once', 'Pick the lowest score to be different', 'Wait for a better idea'], answer: 0, why: 'Focus, learn, adjust.' },
  ],
  cards: [
    { id: 'six', front: 'Six niche criteria?', back: 'Pain, ability to pay, reach, repeatability, you, risk.' },
    { id: 'pain', front: 'Most important criterion?', back: 'Pain: no pain, no purchase.' },
    { id: 'test', front: 'How long to test a niche?', back: '60–90 days of focused outreach, then re-score.' },
  ],
};
