// M08 · L06 · Proof before clients
export default {
  steps: [
    { tag: 'example', title: 'No clients yet. What can you show?', visualFirst: true,
      visual: { type: 'compare', cols: ['Proof', 'Honest?', 'Convincing?'], rows: [
        ['A 2-minute screen recording of your lead-response build running on a fake HVAC company', 'Yes: labeled as a demo', 'High: they see it work'],
        ['“Trusted by 50+ businesses” on your site', 'No: it’s made up', 'Until someone asks'],
        ['A write-up of your sandbox builds with before/after numbers on test data', 'Yes: labeled as a test', 'Medium'],
        ['A discounted pilot for a friend’s business, then their real results', 'Yes', 'High'],
      ] },
      body: ['Everyone starts with zero clients.'],
      check: {
        type: 'multi', q: 'Which forms of proof are honest **and** useful?',
        options: ['The labeled demo recording', '“Trusted by 50+ businesses”', 'The labeled test write-up', 'The pilot with real results'], answer: [0, 2, 3],
        why: 'Show real work, clearly labeled. Invented claims destroy trust the moment they’re questioned, and can be illegal (deceptive advertising).',
      },
      stuck: {
        metaphor: 'A new chef with no restaurant still gets hired by cooking a tasting menu, not by claiming awards they never won.',
        worked: ['Demos and test write-ups show real skill, labeled honestly.', 'A pilot creates real results.', 'Made-up numbers are out.'],
      },
    },
    { tag: 'how', title: 'Building proof from zero',
      body: [
        '**Demo builds** on fake data in your niche: record them working (your sandbox builds are a start).',
        '**Teardown write-ups:** “How an HVAC company could answer every after-hours lead” with a diagram and ROI example.',
        '**A pilot** with someone you know, at a discount, in exchange for a testimonial and permission to share results.',
        '**Your own business:** automate your intake and follow-up, then show it.',
      ] },
    { tag: 'try', title: 'Your turn: pilot terms',
      check: {
        type: 'mc', q: 'Best structure for a first pilot with a friend’s gym?', options: ['Discounted, one workflow, 30 days, written scope, permission to share results and a testimonial if it works', 'Free, unlimited scope, no paperwork', 'Full price, no discount', 'Free, and you promise results'], answer: 0,
        why: 'A discount (not free), tight scope, clear terms, and a proof agreement. Free and unlimited tends to produce neither respect nor results.',
      } },
    { tag: 'law', title: 'Honesty is also a legal line',
      body: [
        'In the US, deceptive advertising (fake reviews, made-up results or client counts) can break consumer-protection law.',
        'Label demos as demos and test data as test data. Get written permission before naming a client or sharing their numbers.',
      ] },
  ],
  quiz: [
    { type: 'multi', q: 'Honest proof with zero clients?', options: ['Labeled demo recordings', 'Teardown write-ups', 'A discounted pilot', 'Invented testimonials'], answer: [0, 1, 2], why: 'Never invent testimonials.' },
    { type: 'mc', q: 'Why discount a first pilot rather than doing it free?', options: ['Paying clients take it seriously, and it sets a price anchor', 'Free is illegal', 'Discounts are tax-free', 'No reason'], answer: 0, why: 'Commitment and anchoring.' },
    { type: 'mc', q: 'Before sharing a pilot client’s results publicly, you need…', options: ['Their written permission', 'Nothing', 'A lawyer’s approval every time', 'Their bank details'], answer: 0, why: 'Permission first.' },
  ],
  cards: [
    { id: 'zero', front: 'Proof with zero clients?', back: 'Labeled demos, teardown write-ups, a discounted pilot, your own automated business.' },
    { id: 'pilot', front: 'Pilot terms?', back: 'Discounted, one workflow, ~30 days, written scope, permission for testimonial and results.' },
    { id: 'honest', front: 'Fake testimonials or client counts?', back: 'Never. They destroy trust and can be illegal.' },
  ],
};
