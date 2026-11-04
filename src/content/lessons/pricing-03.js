// M10 · L03 · Retainers
export default {
  steps: [
    { tag: 'example', title: 'What does $400 a month buy?', visualFirst: true,
      visual: { type: 'compare', cols: ['Included in the retainer (example)', 'Not included'], rows: [
        ['Monitoring and failure alerts', 'New workflows'],
        ['Fixes when something breaks (connections, API changes)', 'Redesigns'],
        ['Up to 2 small changes a month (wording, a new field)', 'Big changes (quoted separately)'],
        ['Monthly results report', 'Training new staff from scratch'],
        ['Tool and AI running costs up to $100', 'Usage above the cap (billed at cost + 15%)'],
      ] },
      body: ['Smoky Ridge’s monthly [[retainer]] (fake).'],
      check: {
        type: 'mc', q: 'Why define “small change” and cap the running costs?',
        options: ['Without limits, a fixed monthly fee becomes unlimited work and unlimited costs', 'To look professional', 'It’s legally required', 'Clients prefer long lists'], answer: 0,
        why: 'Clear limits keep the retainer profitable and keep expectations matched.',
      },
      stuck: {
        metaphor: 'A gym membership includes classes and the weight room, not personal training. Everyone knows where the line is.',
        worked: ['A fixed fee with unlimited work loses money.', 'Defining “small” and capping costs sets the line.', 'Bigger requests get quoted separately.'],
      },
    },
    { tag: 'how', title: 'Why retainers exist',
      body: [
        'Automations need care: apps change, connections expire, the business changes. Someone must watch them.',
        'For the client: peace of mind and a person to call. For you: predictable income.',
        'Price it on what it includes and the value of keeping things running, not on your hours alone.',
        'Common terms: an initial term (e.g. 3–6 months), then month to month with 30 days’ notice.',
      ] },
    { tag: 'try', title: 'Your turn: monthly math',
      check: {
        type: 'num', q: 'You have 8 clients on a $350/month retainer, with $60/month of tool costs each. Monthly profit from retainers before your time?', answer: 2320, tol: 0, prefix: '$',
        why: '8 × ($350 − $60) = **$2,320** a month.',
      } },
    { tag: 'biz', title: 'Retainers are the business',
      body: [
        'Setup fees are lumpy; retainers stack. Ten clients on modest retainers is a foundation (Module 12 does the capacity math).',
        'Earn renewals with reports that show value every month (Module 11).',
      ] },
  ],
  quiz: [
    { type: 'multi', q: 'Typical retainer inclusions?', options: ['Monitoring', 'Fixes when things break', 'A few small changes', 'Unlimited new projects'], answer: [0, 1, 2], why: 'New projects are quoted separately.' },
    { type: 'num', q: '12 retainer clients at $400/month. Annual retainer revenue?', answer: 57600, tol: 0, prefix: '$', why: '12 × $400 × 12 = $57,600.' },
    { type: 'mc', q: 'Why cap running costs inside a retainer?', options: ['Usage can grow; the cap protects your margin', 'To charge more', 'Caps are required', 'No reason'], answer: 0, why: 'Bill usage above the cap separately.' },
  ],
  cards: [
    { id: 'retainer', front: 'What a retainer pays for?', back: 'Monitoring, fixes, a few defined small changes, reporting, and capped running costs.' },
    { id: 'limits', front: 'Retainer rule?', back: 'Define “small change” and cap running costs, or it becomes unlimited work.' },
    { id: 'terms', front: 'Common retainer terms?', back: 'Initial term (3–6 months), then month to month with notice.' },
  ],
};
