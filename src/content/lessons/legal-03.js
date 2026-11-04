// M13 · L03 · Privacy laws as concepts
export default {
  steps: [
    { tag: 'example', title: 'Which rules apply?', visualFirst: true,
      visual: { type: 'compare', cols: ['Client (fake)', 'Likely relevant rules (concepts)'], rows: [
        ['Dental clinic in Knoxville', 'HIPAA (patient health information) regardless of size'],
        ['Small online shop with customers in California', 'California privacy law may apply depending on size thresholds; CAN-SPAM for email'],
        ['Tennessee HVAC company, $3M revenue', 'Tennessee’s broad privacy law (TIPA) likely does not apply (it targets much larger businesses); other rules still do'],
        ['Accounting firm', 'Financial-privacy and professional confidentiality rules'],
      ] },
      body: ['US privacy law is a patchwork: rules by sector (health, finance, children) plus some state laws. (Concepts only; not legal advice.)'],
      check: {
        type: 'mc', q: 'Why does HIPAA matter for the dental clinic even though it’s small?',
        options: ['Sector laws like HIPAA apply by the type of data, not the size of the business', 'Because it’s in Tennessee', 'It doesn’t', 'Only big clinics count'], answer: 0,
        why: 'Health information triggers HIPAA rules for the clinic and its vendors (Module 6: business associate agreements).',
      },
      stuck: {
        metaphor: 'Food-safety rules apply to a tiny food truck as much as a big restaurant, because of what they handle.',
        worked: ['HIPAA is about health data.', 'The clinic handles health data.', 'So it applies, whatever the size.'],
      },
    },
    { tag: 'how', title: 'The map (concepts)',
      predict: {"q": "A small Knoxville dental clinic: does HIPAA apply even though it’s small?", "options": ["Yes, sector laws apply by type of data", "No, it’s small", "Only in California", "Only if it has 50 staff"], "answer": 0, "why": "Health data triggers HIPAA regardless of size. Tennessee’s broad privacy law (TIPA) targets only much larger businesses."},
      body: ["**Sector laws** apply by data type: HIPAA (health), financial privacy, COPPA (kids under 13).", "**State laws:** Tennessee’s TIPA (since July 1, 2025) covers only businesses over $25M revenue meeting data thresholds; other states’ laws may reach customers there.", "GDPR can apply to EU residents’ data. Small isn’t exempt from everything."] },
    { tag: 'try', title: 'Your turn: your role',
      check: {
        type: 'mc', q: 'When you build automations that handle a client’s customer data, what are you usually?', options: ['A vendor (service provider) processing data on the client’s behalf', 'The owner of that data', 'A government agency', 'Not involved'], answer: 0,
        why: 'You process data for the client. Agreements often include a data-protection section saying what you may do with it (lesson 1).',
      } },
    { tag: 'key', title: 'Habits that hold up under most laws',
      predict: {"q": "A client works in a regulated sector. What do you do first?", "options": ["Ask what rules they follow and involve their compliance person or lawyer", "Guess", "Ignore it", "Avoid all data"], "answer": 0, "why": "Minimize, restrict, delete on schedule, vet vendors, document, and bring in their experts."},
      body: [
        'Collect and copy only what’s needed (minimization), restrict access, delete on schedule, use vendors with suitable terms, and write down what you did (Module 6).',
        'When a client is in a regulated sector, ask what rules they follow and involve their compliance person or lawyer.',
      ] },
  ],
  quiz: [
    { type: 'mc', q: 'US privacy law is…', options: ['A patchwork of sector and state laws', 'One single federal law', 'Nonexistent', 'Only about websites'], answer: 0, why: 'Sector laws plus some state laws.' },
    { type: 'mc', q: 'Tennessee’s broad privacy law (TIPA) applies to…', options: ['Large businesses (over $25M revenue) that also meet data-volume thresholds', 'Every business in Tennessee', 'Only hospitals', 'Nobody yet'], answer: 0, why: 'Most small businesses fall below it; sector laws can still apply.' },
    { type: 'mc', q: 'What triggers HIPAA?', options: ['Handling protected health information for covered entities and their vendors', 'Being in Tennessee', 'Having a website', 'Size over 50 staff'], answer: 0, why: 'The type of data and who handles it.' },
  ],
  cards: [
    { id: 'patchwork', front: 'US privacy law structure?', back: 'Sector laws (health, finance, kids) + some state comprehensive laws.' },
    { id: 'tipa', front: 'Tennessee TIPA?', back: 'In effect July 1, 2025; applies to businesses over $25M revenue meeting data thresholds. Most small businesses fall below it.' },
    { id: 'vendor', front: 'Your role with client data?', back: 'A vendor processing it on the client’s behalf, under their agreement.' },
  ],
};
