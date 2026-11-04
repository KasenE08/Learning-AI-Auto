// CAP · L03 · Find and price the opportunity
const roi = {
  type: 'calc',
  inputs: [
    { key: 'req', label: 'Web requests per week', min: 40, max: 300, step: 10, value: 120 },
    { key: 'min', label: 'Minutes saved per request', min: 1, max: 8, step: 0.5, value: 3 },
    { key: 'rate', label: 'Front-desk loaded cost per hour', min: 15, max: 40, value: 22, prefix: '$' },
    { key: 'kept', label: 'Clients kept per month (urgent nights answered)', min: 0, max: 6, value: 1 },
    { key: 'ltv', label: 'Profit from a kept client over a year', min: 100, max: 2000, step: 50, value: 600, prefix: '$' },
    { key: 'run', label: 'Monthly running costs + retainer', min: 100, max: 1000, step: 25, value: 350, prefix: '$' },
  ],
  outputs: [
    { label: 'Time value per month', f: (v) => v.req * v.min / 60 * 52 / 12 * v.rate, fmt: 'money' },
    { label: 'Kept-client value per month', f: (v) => v.kept * v.ltv, fmt: 'money' },
    { label: 'Net benefit per month', f: (v) => v.req * v.min / 60 * 52 / 12 * v.rate + v.kept * v.ltv - v.run, fmt: 'money', big: true },
  ],
  caption: 'Fake but realistic numbers from your discovery call. Conservative on purpose.',
};
export default {
  steps: [
    { tag: 'example', title: 'Riverbend’s ROI', visualFirst: true, visual: roi,
      body: ['Plug in what Keisha told you. Keep it conservative.'],
      check: {
        type: 'num', q: 'At the starting values, net benefit per month (nearest dollar)?', answer: 822, tol: 2, prefix: '$',
        hint: 'Time: 120 × 3 ÷ 60 × 52 ÷ 12 × 22. Then + 1 × 600 − 350.',
        why: 'Time ≈ $572 + kept client $600 − $350 ≈ **$822 a month**. Modest and believable.',
      },
      stuck: {
        metaphor: 'A household budget: money saved plus money kept, minus the new monthly bill.',
        worked: ['120 × 3 = 360 min/week = 6 h/week ≈ 26 h/month × $22 ≈ $572.', '1 kept client ≈ $600.', '$572 + $600 − $350 ≈ $822.'],
      },
    },
    { tag: 'how', title: 'Rank what to build first',
      visual: { type: 'sort', prompt: 'Phase 1 or later?', cols: ['Phase 1', 'Later (roadmap)'], items: [
        { text: 'Sort requests + text the on-call vet for urgent ones', col: 0 },
        { text: 'Instant confirmation to every owner', col: 0 },
        { text: 'Vaccine reminder campaigns', col: 1, why: 'Valuable, but separate. Great phase 2 upsell.' },
        { text: 'An after-hours voice agent', col: 1, why: 'Bigger build and higher risk; earn trust first.' },
        { text: 'Calendar holds for routine requests', col: 0 },
        { text: 'Full practice-software migration', col: 1 },
      ] },
      body: ['Phase 1 solves the scary problem fast with high confidence.', 'Everything else becomes a roadmap (and future retainer value).'] },
    { tag: 'biz', title: 'Set the price',
      predict: { q: 'Net benefit ≈ $822/month. Which setup price leaves Riverbend a clear win in year one?', options: ['About $2,000', '$9,000', '$300', '$15,000'], answer: 0, why: '$2,000 pays back in under 3 months; the clinic keeps most of the value.' },
      body: ['Your floor: ~16 hours × your rate + costs. Their value: ~$9,900 net in year one.', 'Two options: Core ($2,000 setup + $250/month) and Core + reminders ($3,200 + $350/month).', 'Running costs (texting, AI) on the clinic’s own accounts.'] },
    { tag: 'try', title: 'Your turn: payback',
      check: {
        type: 'num', q: 'Setup $2,000; net benefit $822/month. Payback in months (one decimal)?', answer: 2.4, tol: 0.05, unit: 'months',
        why: '2,000 ÷ 822 ≈ **2.4 months**. An easy story for Dr. Whitfield.',
      } },
  ],
  quiz: [
    { type: 'mc', q: 'Why count a “kept client” at profit over a year, not one visit?', options: ['A client lost to a competitor takes all their future visits with them', 'It inflates the number', 'Visits don’t matter', 'Vets prefer it'], answer: 0, why: 'But stay conservative: one kept client a month.' },
    { type: 'mc', q: 'Why is the voice agent “later”?', options: ['Bigger, riskier build; earn trust with a quick win first', 'It’s illegal', 'Clinics hate phones', 'It’s cheap'], answer: 0, why: 'Quick win first.' },
    { type: 'num', q: 'Floor: 16 hours × $80 + $70 costs. Floor price?', answer: 1350, tol: 0, prefix: '$', why: '1,280 + 70 = $1,350, well under the $2,000 price.' },
  ],
  cards: [
    { id: 'roi', front: 'Riverbend net benefit (conservative)?', back: 'About $820/month: time saved + one kept client − running costs.' },
    { id: 'phase', front: 'Riverbend phase 1?', back: 'Sort requests, text on-call vet for urgent ones, confirm every owner, hold routine slots.' },
    { id: 'price', front: 'Riverbend options?', back: 'Core $2,000 + $250/mo; Core + reminders $3,200 + $350/mo (example).' },
  ],
};
