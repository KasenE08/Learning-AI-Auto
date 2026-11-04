// M10 · L01 · Cost, value, and the gap
export default {
  steps: [
    { tag: 'example', title: 'Where should the price land?', visualFirst: true,
      visual: { type: 'calc', inputs: [
        { key: 'hours', label: 'Your hours to build (with reuse)', min: 5, max: 80, value: 20 },
        { key: 'rate', label: 'Your target rate per hour', min: 25, max: 200, step: 5, value: 75, prefix: '$' },
        { key: 'tools', label: 'Your one-time costs (tools, testing)', min: 0, max: 500, step: 25, value: 50, prefix: '$' },
        { key: 'value', label: 'Client’s net benefit in year one', min: 1000, max: 60000, step: 500, value: 10000, prefix: '$' },
      ], outputs: [
        { label: 'Your floor (cost)', f: (v) => v.hours * v.rate + v.tools, fmt: 'money' },
        { label: 'Client’s ceiling (year-one value)', f: (v) => v.value, fmt: 'money' },
        { label: 'Gap to price within', f: (v) => v.value - (v.hours * v.rate + v.tools), fmt: 'money', big: true },
      ], caption: 'Example numbers. The client’s value comes from your ROI math (Module 7).' },
      body: ['The Smoky Ridge lead-response build (fake numbers).'],
      check: {
        type: 'mc', q: 'With a $1,550 floor and $10,000 of year-one value, where should a setup price sit?',
        options: ['Somewhere in between, so the client keeps most of the value and you’re well paid', 'Exactly $1,550', '$10,000', 'Below $1,550 to win the deal'], answer: 0,
        why: 'Price between your cost floor and their value. The client should clearly come out ahead; you should clearly earn more than your hours.',
      },
      stuck: {
        metaphor: 'Selling a used car: below what it cost you, you lose; above what it’s worth to the buyer, they walk. The deal lives in between.',
        worked: ['Floor: 20 × $75 + $50 = $1,550.', 'Ceiling: $10,000 of value.', 'Price in the gap, leaving the client a clear win.'],
      },
    },
    { tag: 'how', title: 'Floor, ceiling, and the price',
      body: [
        '**Floor:** your time × a rate you’d be happy with, plus your costs. Below it, you’re subsidizing the client.',
        '**Ceiling:** the value to the client. Above it, nobody buys.',
        '**Price:** in the gap. Many consultants aim for the client to get several times their money back in year one.',
        'Reuse lowers your floor over time (Module 12). Same price, fewer hours = higher effective rate.',
      ] },
    { tag: 'try', title: 'Your turn: effective rate',
      check: {
        type: 'num', q: 'You charge $3,000 for a build. The first time took 40 hours; with reuse it now takes 12. What’s your effective hourly rate now?', answer: 250, tol: 0.5, prefix: '$',
        why: '$3,000 ÷ 12 = **$250/hour**, up from $75. That’s why fixed prices beat hourly billing for packaged work.',
      } },
    { tag: 'warn', title: 'Why not bill hourly?',
      body: [
        'Hourly billing punishes you for getting faster and makes clients watch the clock.',
        'Fixed setup fees + monthly retainers match how clients think: “what do I get, what does it cost?”',
        'Track your hours privately anyway, to know your floor and effective rate.',
      ] },
  ],
  quiz: [
    { type: 'mc', q: 'What is your price floor?', options: ['Your time × target rate + your costs', 'The client’s budget', 'Competitors’ prices', 'Zero'], answer: 0, why: 'Below it you’re losing money or time.' },
    { type: 'num', q: 'A build takes you 15 hours; target rate $80; costs $100. Floor in dollars?', answer: 1300, tol: 0, prefix: '$', why: '15 × 80 + 100 = $1,300.' },
    { type: 'mc', q: 'Why does reuse matter for pricing?', options: ['Same price, fewer hours: a higher effective rate', 'You can charge less forever', 'Clients pay more for reused work', 'It doesn’t'], answer: 0, why: 'Packaged work rewards efficiency.' },
  ],
  cards: [
    { id: 'gap', front: 'Price lives where?', back: 'Between your cost floor and the client’s value ceiling, leaving them a clear win.' },
    { id: 'floor', front: 'Price floor?', back: 'Your hours × target rate + your costs.' },
    { id: 'hourly', front: 'Hourly vs fixed?', back: 'Fixed setup + retainer; hourly punishes you for getting faster.' },
  ],
};
