// M12 · L01 · From custom to productized
export default {
  steps: [
    { tag: 'example', title: 'Client #1 vs client #8', visualFirst: true,
      visual: { type: 'compare', cols: ['', 'Client #1 (custom)', 'Client #8 (productized)'], rows: [
        ['Discovery', '3 calls, a new map from scratch', '1 call with a standard intake form'],
        ['Build', '40 hours', '10 hours from a template + configuration'],
        ['Price', 'Custom quote', 'Fixed package price'],
        ['Docs', 'Written fresh', 'Template, client details filled in'],
        ['Your effective rate', '$60/hour', '$250/hour'],
      ] },
      body: ['The same “Never Miss a Job” system, first and eighth time.'],
      check: {
        type: 'mc', q: 'What changed between client #1 and client #8?',
        options: ['The work became a repeatable product: same intake, template build, fixed price, template docs', 'You worked faster by skipping testing', 'The clients were simpler', 'Prices went down'], answer: 0,
        why: 'A [[productized-service|productized service]] turns custom work into a repeatable package. That’s what lets one person serve many clients.',
      },
      stuck: {
        metaphor: 'A bakery that bakes custom cakes vs one that has six signature cakes. Same skill; one scales.',
        worked: ['Intake, build, docs became templates.', 'Price became fixed.', 'Hours dropped; rate rose.'],
      },
    },
    { tag: 'how', title: 'What to standardize',
      predict: {"q": "Which one change cuts build time the most for client #8?", "options": ["A template workflow + a config sheet", "Typing faster", "A bigger AI model", "Skipping tests"], "answer": 0, "why": "Template + config turns a rebuild into filling in details."},
      body: ["**Intake** form and **template build + config sheet** per client.", "**Fixed pricing** tiers and **doc/report templates**.", "**Onboarding and offboarding** as checklists and automated emails."] },
    { tag: 'try', title: 'Your turn: what stays custom?',
      check: {
        type: 'multi', q: 'In a productized offer, which should still be customized per client?',
        options: ['Message wording and business details', 'Which of their apps it connects to (from a supported list)', 'Whether to test it', 'The core workflow design, every time'], answer: [0, 1],
        why: 'Configure details within the template. Testing is never optional, and redesigning the core each time defeats the purpose.',
      } },
    { tag: 'biz', title: 'Productize after 2–3 custom builds',
      predict: {"q": "When should you freeze a build into a template?", "options": ["After 2–3 custom builds of the same thing", "Before the first client", "After 50", "Never"], "answer": 0, "why": "The first few teach you what really varies."},
      body: ['Do the first couple custom (you learn what really varies). Then freeze the core into a template and stop saying yes to things outside it, or price them as custom work.'] },
  ],
  quiz: [
    { type: 'multi', q: 'What do you standardize to productize?', options: ['Intake', 'Template build + config sheet', 'Fixed pricing', 'Doc and report templates'], answer: [0, 1, 2, 3], why: 'All of these.' },
    { type: 'mc', q: 'When to productize?', options: ['After 2–3 custom builds of the same thing', 'Before your first client', 'Never', 'After 50 clients'], answer: 0, why: 'Learn what varies first.' },
    { type: 'num', q: 'Package price $2,500. Build time drops from 40 to 10 hours. New effective rate?', answer: 250, tol: 0.5, prefix: '$', why: '$2,500 ÷ 10.' },
  ],
  cards: [
    { id: 'productized', front: 'Productized service?', back: 'A repeatable package: standard intake, template build, fixed price, template docs.' },
    { id: 'config', front: 'What varies per client?', back: 'Configuration (wording, details, supported apps), not the core design.' },
    { id: 'when', front: 'When to productize?', back: 'After 2–3 custom builds of the same thing.' },
  ],
};
