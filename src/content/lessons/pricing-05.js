// M10 · L05 · Usage-based pricing and pass-through costs
export default {
  steps: [
    { tag: 'example', title: 'A voice agent’s bill grows with calls', visualFirst: true,
      visual: { type: 'calc', inputs: [
        { key: 'calls', label: 'Calls handled per month', min: 50, max: 2000, step: 50, value: 300 },
        { key: 'mins', label: 'Average minutes per call', min: 1, max: 10, value: 3 },
        { key: 'cost', label: 'Your cost per minute (phone + voice + AI, example)', min: 0.05, max: 0.5, step: 0.01, value: 0.15, prefix: '$' },
        { key: 'margin', label: 'Markup on usage %', min: 0, max: 100, value: 30, unit: '%' },
      ], outputs: [
        { label: 'Your usage cost / month', f: (v) => v.calls * v.mins * v.cost, fmt: 'money' },
        { label: 'Usage billed to client / month', f: (v) => v.calls * v.mins * v.cost * (1 + v.margin / 100), fmt: 'money', big: true },
      ], caption: 'Per-minute costs here are made up. Real costs vary by provider and change often.' },
      body: ['An after-hours voice agent for a plumber (fake numbers). Its cost depends on how many calls come in.'],
      check: {
        type: 'mc', q: 'Calls triple in a heat wave. With a flat monthly fee and no usage terms, who absorbs the extra cost?',
        options: ['You do', 'The client', 'The phone company', 'Nobody'], answer: 0,
        why: 'Variable costs under a flat fee land on you. Use a usage component, a cap, or client-owned accounts.',
      },
      stuck: {
        metaphor: 'An all-you-can-eat buffet priced for normal appetites, on the day a football team walks in.',
        worked: ['Costs scale with calls.', 'A flat fee doesn’t.', 'The difference comes out of your pocket.'],
      },
    },
    { tag: 'how', title: 'Three ways to handle variable costs',
      body: [
        '**Client-owned accounts:** the client pays the phone, AI and tool providers directly. Cleanest; you charge for your work.',
        '**Pass-through with markup:** you pay, then bill usage at cost plus a margin (e.g. 15–30%) for handling it.',
        '**Usage-based pricing:** price per unit of outcome (per call handled, per lead processed), with a monthly minimum.',
        'Always set a cap or an alert threshold, so nobody gets a surprise bill.',
      ] },
    { tag: 'try', title: 'Your turn: per-unit price',
      check: {
        type: 'num', q: 'Your cost is $0.45 per call. You want a 40% markup. Price per call in dollars?', answer: 0.63, tol: 0.005, prefix: '$',
        why: '$0.45 × 1.40 = **$0.63** per call.',
      } },
    { tag: 'law', title: 'Tennessee note: how you package can change sales tax',
      body: [
        'In Tennessee, consulting and services are generally not subject to sales tax, but access to software that a customer uses remotely can be taxable.',
        'If you resell software access or bundle it with your service, sales tax may apply. Client-owned accounts avoid most of that question.',
        'Sources and rulings differ on edge cases. Ask a Tennessee CPA before you set up billing.',
      ] },
  ],
  quiz: [
    { type: 'multi', q: 'Ways to handle variable usage costs?', options: ['Client-owned accounts', 'Pass-through with markup', 'Usage-based pricing with a minimum', 'Ignore it'], answer: [0, 1, 2], why: 'Ignoring it means you pay.' },
    { type: 'num', q: '500 calls × 4 minutes × $0.12/min. Your monthly usage cost?', answer: 240, tol: 0, prefix: '$', why: '500 × 4 × 0.12 = $240.' },
    { type: 'mc', q: 'Why set a cap or alert on usage?', options: ['No surprise bills for you or the client', 'Caps are illegal', 'To stop the system', 'For taxes'], answer: 0, why: 'Predictability.' },
  ],
  cards: [
    { id: 'three', front: 'Handling variable costs?', back: 'Client-owned accounts, pass-through with markup, or usage-based pricing with a minimum. Always cap.' },
    { id: 'flat', front: 'Flat fee + rising usage?', back: 'You absorb the cost. Add usage terms.' },
    { id: 'tn', front: 'Tennessee sales tax and your packaging?', back: 'Services generally aren’t taxed; reselling remotely accessed software can be. Ask a CPA.' },
  ],
};
