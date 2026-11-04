// M10 · L06 · Tiers and packages
export default {
  steps: [
    { tag: 'example', title: 'Three tiers', visualFirst: true,
      visual: { type: 'compare', cols: ['', 'Starter', 'Standard (most pick this)', 'Complete'], rows: [
        ['Lead capture + instant reply', '✓', '✓', '✓'],
        ['Follow-up sequence', '—', '✓', '✓'],
        ['After-hours voice agent', '—', '—', '✓'],
        ['Setup (example)', '$1,200', '$2,500', '$4,500'],
        ['Monthly (example)', '$150', '$350', '$650'],
      ], pick: 1 },
      body: ['“Never Miss a Job” in three tiers (fake prices).'],
      check: {
        type: 'mc', q: 'What is the Complete tier mainly doing for the sale?',
        options: ['Making Standard look like the sensible middle, while still being a real option for some', 'Nothing; nobody buys it', 'Tricking clients', 'Lowering prices'], answer: 0,
        why: 'Many buyers pick the middle option. A real top tier also catches the clients who want everything.',
      },
      stuck: {
        metaphor: 'Coffee sizes: the large makes the medium feel reasonable, and some people really do want the large.',
        worked: ['Three options shift the question to “which one?”.', 'The middle feels balanced.', 'The top tier is real, not a decoy.'],
      },
    },
    { tag: 'how', title: 'Designing tiers',
      predict: {"q": "What should make one tier better than the one below it?", "options": ["An extra outcome, like after-hours calls answered", "Better testing", "A nicer name", "Faster email replies from you"], "answer": 0, "why": "Tiers differ by outcomes. Every tier gets proper testing."},
      body: ["Each tier adds **outcomes**; the middle tier fits most clients.", "The entry tier still delivers a real win.", "Keep it to three."] },
    { tag: 'try', title: 'Your turn: what goes up a tier?',
      check: {
        type: 'mc', q: 'Which upgrade belongs in a higher tier?', options: ['A new outcome, like after-hours calls answered', 'The same thing with a nicer name', 'Fixing bugs in the lower tier', 'Basic testing'], answer: 0,
        why: 'Tiers differ by outcomes. Testing and bug fixes belong to every tier.',
      } },
    { tag: 'biz', title: 'Tiers make upgrades natural',
      predict: {"q": "A Starter client is getting great results. What’s the natural upsell?", "options": ["Move up to Standard", "A brand-new custom project", "A discount", "Nothing"], "answer": 0, "why": "Tiers turn upsells into a simple step up."},
      body: ['A Starter client who sees results has an obvious next step. Upsells become “move to Standard”, not a new sales process (Module 11).'] },
  ],
  quiz: [
    { type: 'mc', q: 'How many tiers?', options: ['Three', 'One', 'Seven', 'As many as clients want'], answer: 0, why: 'Enough to compare, few enough to decide.' },
    { type: 'mc', q: 'Tiers should differ by…', options: ['Outcomes', 'Quality of testing', 'How nice you are', 'Font'], answer: 0, why: 'More results, not worse versions.' },
    { type: 'mc', q: 'Which tier should fit most clients?', options: ['The middle', 'The cheapest', 'The most expensive', 'None'], answer: 0, why: 'Design the middle as the default recommendation.' },
  ],
  cards: [
    { id: 'three', front: 'Tier design?', back: 'Three tiers, each adding outcomes; the middle fits most; the entry still wins.' },
    { id: 'top', front: 'Why a top tier?', back: 'It frames the middle and serves clients who want everything.' },
    { id: 'upsell', front: 'Tiers and upsells?', back: 'Upgrades become “move up a tier”.' },
  ],
};
