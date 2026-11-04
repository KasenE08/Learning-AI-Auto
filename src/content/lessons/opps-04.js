// M07 · L04 · ROI math
const roi = {
  type: 'calc',
  inputs: [
    { key: 'hours', label: 'Hours saved per month', min: 0, max: 80, value: 22 },
    { key: 'rate', label: 'Loaded cost per hour', min: 15, max: 80, value: 25, prefix: '$' },
    { key: 'extra', label: 'Extra jobs won per month', min: 0, max: 20, value: 2 },
    { key: 'profit', label: 'Profit per extra job', min: 0, max: 2000, step: 50, value: 400, prefix: '$' },
    { key: 'run', label: 'Running costs per month (tools, AI, your retainer)', min: 0, max: 1500, step: 25, value: 300, prefix: '$' },
    { key: 'setup', label: 'One-time setup fee', min: 0, max: 10000, step: 250, value: 2500, prefix: '$' },
  ],
  outputs: [
    { label: 'Value of time saved / month', f: (v) => v.hours * v.rate, fmt: 'money' },
    { label: 'Extra profit / month', f: (v) => v.extra * v.profit, fmt: 'money' },
    { label: 'Net benefit / month', f: (v) => v.hours * v.rate + v.extra * v.profit - v.run, fmt: 'money', big: true },
    { label: 'Payback period', f: (v) => v.setup / (v.hours * v.rate + v.extra * v.profit - v.run), fmt: 'months' },
  ],
  caption: 'Example numbers for Smoky Ridge (fake). Swap in measured numbers for a real client.',
};
export default {
  steps: [
    { tag: 'example', title: 'Is the lead-response build worth it?', visualFirst: true, visual: roi,
      body: ['Smoky Ridge: instant lead capture and follow-up saves ~22 hours a month and wins ~2 extra jobs (conservative). Drag the sliders.'],
      check: {
        type: 'num', q: 'At the starting values, what is the net benefit per month in dollars?', answer: 850, tol: 1, prefix: '$',
        hint: '(22 × 25) + (2 × 400) − 300', why: '$550 time + $800 profit − $300 running costs = **$850 a month**.',
      },
      stuck: {
        metaphor: 'Like a gym membership that pays you: what you gain each month, minus the monthly fee.',
        worked: ['Time: 22 h × $25 = $550.', 'Extra jobs: 2 × $400 = $800.', '$550 + $800 − $300 running = $850.'],
      },
    },
    { tag: 'how', title: 'The formulas',
      body: [
        '**Monthly benefit** = (hours saved × loaded rate) + (extra wins × profit per win) + (other money recovered).',
        '**Net monthly benefit** = monthly benefit − running costs.',
        '**[[payback-period|Payback period]]** = setup fee ÷ net monthly benefit (in months).',
        '**ROI over a year** = (12 × net monthly benefit − setup fee) ÷ setup fee.',
      ] },
    { tag: 'try', title: 'Your turn: payback',
      check: {
        type: 'num', q: 'Setup fee $2,500. Net benefit $850/month. Payback period in months (one decimal)?', answer: 2.9, tol: 0.05, unit: 'months',
        why: '2,500 ÷ 850 ≈ **2.9 months**. Under 6 months is usually an easy yes for a small business.',
      } },
    { tag: 'warn', title: 'Count profit, not revenue',
      body: [
        'An extra $3,000 job doesn’t add $3,000 to the owner’s pocket. Use profit per job (ask, or use a conservative share).',
        'Hours saved only become money if they’re reused (more jobs, less overtime) or the cost is avoided. Say so honestly.',
      ] },
  ],
  quiz: [
    { type: 'num', q: 'Saves 10 h/month at $30/h, wins 1 extra job worth $500 profit, running costs $200/month. Net monthly benefit in dollars?', answer: 600, tol: 0, prefix: '$', why: '$300 + $500 − $200 = $600.' },
    { type: 'num', q: 'Setup $3,000; net benefit $600/month. Payback in months?', answer: 5, tol: 0.01, unit: 'months', why: '3,000 ÷ 600 = 5.' },
    { type: 'mc', q: 'An extra job brings in $3,000 of revenue at a 20% profit margin. What goes in the ROI?', options: ['$600 profit', '$3,000', '$2,400', 'Nothing'], answer: 0, why: 'Use profit: $3,000 × 20% = $600.' },
    { type: 'num', q: 'Net benefit $850/month, setup $2,500. First-year ROI as a percent (whole number)?', answer: 308, tol: 1, unit: '%', why: '(12 × 850 − 2,500) ÷ 2,500 = 7,700 ÷ 2,500 = 3.08 → **308%**.' },
  ],
  cards: [
    { id: 'net', front: 'Net monthly benefit?', back: '(Hours saved × loaded rate) + (extra wins × profit) + other recovered money − running costs.' },
    { id: 'payback', front: 'Payback period?', back: 'Setup fee ÷ net monthly benefit.' },
    { id: 'roi', front: 'First-year ROI?', back: '(12 × net monthly benefit − setup fee) ÷ setup fee.' },
    { id: 'profit', front: 'Revenue or profit in ROI?', back: 'Profit.' },
  ],
};
