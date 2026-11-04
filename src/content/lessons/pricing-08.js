// M10 · L08 · Pricing drills
export default {
  steps: [
    { tag: 'example', title: 'Price a full offer', visualFirst: true,
      visual: { type: 'calc', inputs: [
        { key: 'value', label: 'Client net benefit per month', min: 300, max: 8000, step: 100, value: 2000, prefix: '$' },
        { key: 'share', label: 'Setup as months of value', min: 0.5, max: 4, step: 0.5, value: 1.5 },
        { key: 'ret', label: 'Monthly retainer', min: 100, max: 1500, step: 50, value: 350, prefix: '$' },
      ], outputs: [
        { label: 'Setup fee', f: (v) => v.value * v.share, fmt: 'money' },
        { label: 'Client’s first-year net gain after paying you', f: (v) => 12 * v.value - v.value * v.share - 12 * v.ret, fmt: 'money', big: true },
        { label: 'Your first-year revenue', f: (v) => v.value * v.share + 12 * v.ret, fmt: 'money' },
      ], caption: 'A simple way to sanity-check a price: both sides should clearly win.' },
      body: ['Drag the sliders and watch both sides’ year.'],
      check: {
        type: 'num', q: 'At the starting values, what’s the client’s first-year net gain after paying you (in dollars)?', answer: 16800, tol: 1, prefix: '$',
        hint: '12 × 2,000 − setup − 12 × 350', why: '$24,000 − $3,000 − $4,200 = **$16,800**. A strong win for them; $7,200 for you.',
      },
      stuck: {
        metaphor: 'A fair trade: both people walk away glad they did it.',
        worked: ['Value: 12 × $2,000 = $24,000.', 'Setup: 1.5 × $2,000 = $3,000.', 'Retainer: 12 × $350 = $4,200.', '$24,000 − $3,000 − $4,200 = $16,800.'],
      },
    },
    { tag: 'try', title: 'Drill 1: effective rate',
      check: {
        type: 'num', q: 'Setup $2,400 took 16 hours. Effective hourly rate?', answer: 150, tol: 0.5, prefix: '$', why: '$2,400 ÷ 16 = $150/hour.',
      } },
    { tag: 'try', title: 'Drill 2: payback',
      check: {
        type: 'num', q: 'Client net benefit $1,200/month after your retainer. Setup $3,000. Payback in months?', answer: 2.5, tol: 0.01, unit: 'months', why: '3,000 ÷ 1,200 = 2.5 months.',
      } },
    { tag: 'try', title: 'Drill 3: usage markup',
      check: {
        type: 'num', q: 'Pass-through AI costs were $180 this month. You bill at cost + 20%. Amount billed?', answer: 216, tol: 0, prefix: '$', why: '$180 × 1.2 = $216.',
      } },
    { tag: 'key', title: 'The pricing checklist',
      body: [
        'Above your floor? Well under their value? Running costs covered or passed through? Usage capped? Scope and change process written down?',
        'If all five are yes, the price is defensible.',
      ] },
  ],
  quiz: [
    { type: 'num', q: '10 retainer clients at $300/month, $50/month tool costs each. Annual retainer profit before your time?', answer: 30000, tol: 0, prefix: '$', why: '10 × $250 × 12 = $30,000.' },
    { type: 'num', q: 'Value $1,500/month; setup = 2 months of value. Setup fee?', answer: 3000, tol: 0, prefix: '$', why: '2 × $1,500.' },
    { type: 'num', q: 'Floor: 18 hours × $85 + $60 costs. Floor price?', answer: 1590, tol: 0, prefix: '$', why: '18 × 85 = 1,530 + 60 = $1,590.' },
    { type: 'multi', q: 'The five pricing checks?', options: ['Above your floor', 'Well under their value', 'Running costs covered', 'Usage capped', 'Scope and change process written', 'Matches a competitor exactly'], answer: [0, 1, 2, 3, 4], why: 'Competitors are context, not a rule.' },
  ],
  cards: [
    { id: 'checklist', front: 'Five pricing checks?', back: 'Above floor, under value, running costs covered, usage capped, scope written.' },
    { id: 'both', front: 'Sanity check for any price?', back: 'Both sides clearly win in year one.' },
    { id: 'rate', front: 'Effective rate?', back: 'Price ÷ hours actually spent.' },
  ],
};
