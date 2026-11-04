// M11 · L09 · Case studies and testimonials
export default {
  steps: [
    { tag: 'example', title: 'A short case study', visualFirst: true,
      visual: { type: 'compare', cols: ['Section', 'Smoky Ridge Heating & Air (fake)'], rows: [
        ['Problem', 'After-hours leads waited up to 60 hours for a callback; many booked competitors'],
        ['What we did', 'Instant replies, follow-up, and after-hours call handling, connected to their job system'],
        ['Result', 'Median first reply: 14 hours → 1 minute. Booked visits: 22% → 31% (first 3 months)'],
        ['In their words', '“Brenda used to start every Monday digging through voicemail. Now it’s already handled.” (Dale, owner)'],
      ] },
      body: ['Written with permission, using real (here: fake) numbers from the reports.'],
      check: {
        type: 'mc', q: 'What makes this case study convincing?',
        options: ['Specific before/after numbers and the client’s own words', 'Lots of adjectives', 'Technical details', 'It’s long'], answer: 0,
        why: 'Owners in the same niche recognize the problem and believe numbers. A quote in the owner’s voice beats your description.',
      },
      stuck: {
        metaphor: 'A before/after photo of a renovated kitchen, plus the homeowner saying what changed in their mornings.',
        worked: ['Problem they recognize.', 'Numbers that changed.', 'A real quote.'],
      },
    },
    { tag: 'how', title: 'Getting a testimonial and a case study',
      predict: {"q": "Easiest way to get a testimonial from a busy owner?", "options": ["Draft it from their own words and let them edit", "Wait for them to write one", "Write it and publish", "Pay for it"], "answer": 0, "why": "Remove the effort; keep it theirs; get written permission."},
      body: ["Ask after a visible win; draft 2–3 sentences from what they said and let them edit.", "Get **written permission** for name, logo, numbers and quote.", "Use the reports’ numbers exactly."] },
    { tag: 'try', title: 'Your turn: honest numbers',
      check: {
        type: 'mc', q: 'Bookings went from 22% to 31%. Which claim is honest?', options: ['“Booked visits rose from 22% to 31% in three months.”', '“Bookings up 50%!”', '“Doubled their business.”', '“Unlimited leads.”'], answer: 0,
        why: 'State exactly what was measured, over what period. (22% → 31% is a 9-point rise, about 41% relative. Either way, say which you mean.)',
      } },
    { tag: 'law', title: 'Permission and accuracy',
      predict: {"q": "Can you put a client’s logo on your website because you built their system?", "options": ["Only with written permission", "Yes, automatically", "Yes, if small", "Only if they’re happy"], "answer": 0, "why": "Permission first, and testimonials must reflect real, honest opinions."},
      body: ['Use client names, logos, and results only with written permission. Testimonials must reflect real, honest opinions; misleading endorsements can break US consumer-protection rules.'] },
  ],
  quiz: [
    { type: 'order', q: 'Order a case study.', items: ['Problem', 'What we did', 'Result (numbers)', 'Quote in their words'], why: 'Recognizable story with proof.' },
    { type: 'mc', q: 'Before publishing a client’s name and numbers you need…', options: ['Written permission', 'Nothing', 'A lawyer every time', 'Their password'], answer: 0, why: 'Always ask.' },
    { type: 'mc', q: 'Easiest way to get a testimonial?', options: ['Draft it from their words and let them edit', 'Wait for them to write one', 'Write it yourself and publish', 'Pay for it'], answer: 0, why: 'Remove effort, keep it theirs.' },
  ],
  cards: [
    { id: 'shape', front: 'Case study shape?', back: 'Problem, what we did, result with numbers, quote in their words.' },
    { id: 'permission', front: 'Using a client’s name/results?', back: 'Written permission first.' },
    { id: 'numbers', front: 'Numbers in case studies?', back: 'Exactly what was measured and over what period. Never inflate.' },
  ],
};
