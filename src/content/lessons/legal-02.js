// M13 · L02 · Liability and limits
export default {
  steps: [
    { tag: 'example', title: 'An expensive mistake', visualFirst: true,
      visual: { type: 'compare', cols: ['Scenario (fake)', 'What protects you'], rows: [
        ['A misconfigured filter dropped a week of leads for a client', 'Limitation of liability in the agreement; professional liability insurance'],
        ['A client claims your system “lost them $50,000 of business”', 'No outcome guarantees in writing; liability cap; good logs showing what happened'],
        ['You’re sued personally for a business debt', 'Business structure (an LLC can separate personal and business assets, if run properly)'],
      ] },
      body: ['Mistakes happen even with good testing. Plan for them.'],
      check: {
        type: 'mc', q: 'Which protection helps in all three scenarios?',
        options: ['Clear agreements plus good records and the right insurance', 'Hoping it doesn’t happen', 'Working only for friends', 'Never testing'], answer: 0,
        why: 'Layers again (like Module 2): contract terms, evidence (logs, Module 6), insurance, and structure.',
      },
      stuck: {
        metaphor: 'Driving safely and still carrying insurance and a seatbelt.',
        worked: ['Contracts cap and clarify.', 'Logs show what really happened.', 'Insurance pays for covered claims.', 'Structure separates personal assets.'],
      },
    },
    { tag: 'how', title: 'Layers of protection (concepts)',
      visual: {"type": "sort", "cols": ["Contract", "Insurance", "Structure"], "items": [{"text": "A liability cap tied to fees paid", "col": 0}, {"text": "Errors & omissions (E&O) coverage", "col": 1}, {"text": "An LLC with separate finances", "col": 2}, {"text": "No promises about revenue", "col": 0}, {"text": "Cyber insurance for sensitive data work", "col": 1}, {"text": "Keeping business and personal money apart", "col": 2, "why": "Structure only protects if you run it properly."}], "prompt": "Which protection layer is each?"},
      body: ["**Contract:** no outcome promises, a liability cap, a third-party disclaimer.", "**Insurance:** professional liability (E&O), general liability, sometimes cyber.", "**Structure:** an LLC can separate assets if run properly; it also changes taxes. Ask a Tennessee lawyer and CPA."] },
    { tag: 'try', title: 'Your turn: the risky promise',
      check: {
        type: 'mc', q: 'Which sentence should never appear in your proposals?', options: ['“This will increase your revenue by 40%.”', '“Leads will receive a reply within 1 minute.”', '“Launch within 3 weeks of access.”', '“Monthly report on the 1st.”'], answer: 0,
        why: 'Revenue depends on many things you don’t control. Promise your delivery; report outcomes (Module 7).',
      } },
    { tag: 'key', title: 'Good practice is also protection',
      predict: {"q": "A client claims your system lost them business. What helps most?", "options": ["Logs showing exactly what happened", "Your memory", "An apology only", "Deleting the logs"], "answer": 0, "why": "Testing, monitoring, logs and honest reports prevent problems and provide evidence."},
      body: ['Testing, monitoring, logs, safe changes, runbooks, and honest reporting (Module 6, Module 11) prevent most problems and give you evidence when questions come up.'] },
  ],
  quiz: [
    { type: 'mc', q: 'Professional liability (E&O) insurance covers…', options: ['Claims that your work caused a client a loss', 'Your laptop being stolen', 'Your personal car', 'Client taxes'], answer: 0, why: 'Errors and omissions in professional services.' },
    { type: 'mc', q: 'An LLC helps separate personal and business assets…', options: ['If you run it properly (separate finances, clear records)', 'Automatically, no matter what', 'Never', 'Only for big companies'], answer: 0, why: 'Structure needs good habits. Ask a lawyer.' },
    { type: 'multi', q: 'Layers of protection?', options: ['Contract terms', 'Insurance', 'Business structure', 'Logs and good practice', 'Guaranteeing outcomes'], answer: [0, 1, 2, 3], why: 'Guarantees increase risk.' },
  ],
  cards: [
    { id: 'layers', front: 'Liability protection layers?', back: 'Contract terms, insurance (E&O, general, cyber), business structure, good records and practice.' },
    { id: 'eo', front: 'E&O insurance?', back: 'Professional liability: claims that your work caused a loss.' },
    { id: 'promise', front: 'Never promise?', back: 'Outcomes you don’t control, like revenue increases.' },
  ],
};
