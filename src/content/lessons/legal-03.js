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
      body: [
        '**Sector laws:** HIPAA (health), financial-privacy rules (banks, lenders, tax preparers), COPPA (children under 13 online), and others.',
        '**State comprehensive laws:** several states have broad consumer-privacy laws. Tennessee’s (TIPA, in effect since July 1, 2025) applies only to businesses over $25 million in revenue that also handle data on large numbers of Tennessee consumers. Most small clients, and you, fall below it.',
        '**Other states’ laws** can reach a business with customers there, depending on thresholds. Outside the US, the EU’s GDPR can apply to EU residents’ data.',
        'Small isn’t exempt from everything: sector laws, contracts, and good practice still apply.',
      ] },
    { tag: 'try', title: 'Your turn: your role',
      check: {
        type: 'mc', q: 'When you build automations that handle a client’s customer data, what are you usually?', options: ['A vendor (service provider) processing data on the client’s behalf', 'The owner of that data', 'A government agency', 'Not involved'], answer: 0,
        why: 'You process data for the client. Agreements often include a data-protection section saying what you may do with it (lesson 1).',
      } },
    { tag: 'key', title: 'Habits that hold up under most laws',
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
