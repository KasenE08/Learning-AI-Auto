// M07 · L06 · Score and rank opportunities
export default {
  steps: [
    { tag: 'example', title: 'Four ideas, one first project', visualFirst: true,
      visual: { type: 'compare', cols: ['Idea', 'Impact $/mo', 'Confidence', 'Effort (days)', 'Score'], rows: [
        ['After-hours lead reply', '$800', 'High (0.8)', '3', '213'],
        ['AI-written quotes', '$1,500', 'Low (0.3)', '10', '45'],
        ['Invoice reminders', '$400', 'High (0.9)', '2', '180'],
        ['Full CRM migration', '$1,000', 'Medium (0.5)', '15', '33'],
      ] },
      body: ['Smoky Ridge has four ideas. Score = impact × confidence ÷ effort.'],
      check: {
        type: 'mc', q: 'Which should be the first project?',
        options: ['After-hours lead reply', 'AI-written quotes (biggest impact)', 'Full CRM migration', 'All four at once'], answer: 0,
        why: 'Highest score: solid impact you’re confident in, done in days. Quick, visible wins build trust for the bigger projects later.',
        wrong: { 1: 'Biggest number, but low confidence and lots of work. A risky first project.' },
      },
      stuck: {
        metaphor: 'Picking a first hike: not the tallest mountain, but the best view for the least risk.',
        worked: ['Leads: 800 × 0.8 ÷ 3 ≈ 213.', 'Invoices: 400 × 0.9 ÷ 2 = 180.', 'Quotes 45, migration 33. Leads wins.'],
      },
    },
    { tag: 'how', title: 'Impact, confidence, effort',
      predict: {"q": "Idea A: $1,500/month, 30% confident, 10 days. Idea B: $800/month, 80% confident, 3 days. Which first?", "options": ["B", "A", "Both at once", "Neither"], "answer": 0, "why": "Score = impact × confidence ÷ effort: A = 45, B ≈ 213. Quick, likely wins first."},
      body: ["**Impact** (monthly value), **confidence** (0–1), **effort** (days, including the client’s).", "Score = impact × confidence ÷ effort. A conversation tool, not a law.", "Also flag **risk**: customer-facing or regulated data."] },
    { tag: 'try', title: 'Your turn: score it',
      check: {
        type: 'num', q: 'Impact $600/month, confidence 0.5, effort 4 days. Score?', answer: 75, tol: 0.01,
        why: '600 × 0.5 ÷ 4 = **75**.',
      } },
    { tag: 'biz', title: 'Roadmaps sell retainers',
      predict: {"q": "Why show the client a ranked list instead of just one project?", "options": ["It turns one project into an ongoing relationship", "To look busy", "To charge for planning", "No reason"], "answer": 0, "why": "“Start with #1; next quarter #2 and #3.” Quick win first builds the trust for the rest."},
      body: [
        'Show the ranked list: “Start with #1. Next quarter, #2 and #3.” A roadmap turns one project into an ongoing relationship (Module 10, retainers).',
        'Quick win first, always. Trust is the real deliverable of project one.',
      ] },
  ],
  quiz: [
    { type: 'mc', q: 'Score formula used here?', options: ['Impact × confidence ÷ effort', 'Impact + effort', 'Effort × confidence', 'Impact only'], answer: 0, why: 'Value you’re likely to get, per unit of work.' },
    { type: 'num', q: 'Impact $1,200, confidence 0.6, effort 8 days. Score?', answer: 90, tol: 0.01, why: '1,200 × 0.6 ÷ 8 = 90.' },
    { type: 'mc', q: 'Why make the first project a quick win?', options: ['It builds trust and leads to bigger projects', 'Small projects pay more', 'Clients forget slow ones', 'It doesn’t matter'], answer: 0, why: 'Trust is the deliverable of project one.' },
  ],
  cards: [
    { id: 'score', front: 'Opportunity score?', back: 'Impact × confidence ÷ effort (plus a risk flag).' },
    { id: 'confidence', front: 'What lowers confidence?', back: 'Missing data, no API for the needed action, unclear value.' },
    { id: 'first', front: 'First project rule?', back: 'Quick, visible win. Then a roadmap.' },
  ],
};
