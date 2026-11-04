// M08 · L04 · Packaging a flagship offer
export default {
  steps: [
    { tag: 'example', title: 'A one-page offer', visualFirst: true,
      visual: { type: 'compare', cols: ['Part', '“Never Miss a Job” (fake offer for home-service companies)'], rows: [
        ['Who', 'HVAC, plumbing and electrical companies with 2–15 staff'],
        ['Outcome', 'Every lead and after-hours call answered in under a minute, booked or routed'],
        ['Included', 'Lead intake from web + ads, instant text/email reply, follow-up sequence, after-hours call handling, weekly report'],
        ['Not included', 'Website redesign, ad management, a new CRM'],
        ['Timeline', 'Live in 3 weeks'],
        ['Price', '$2,500 setup + $400/month (example)'],
        ['Guarantee', 'If response time isn’t under 5 minutes in month one, next month is free'],
      ] },
      body: ['Your flagship: one clear package you sell over and over.'],
      check: {
        type: 'mc', q: 'Why list what’s **not** included?',
        options: ['It prevents scope creep and arguments later', 'To seem exclusive', 'It’s legally required', 'To make the page longer'], answer: 0,
        why: 'Owners assume “automation” covers everything. Writing the boundaries down protects your time and margin (Module 11).',
      },
      stuck: {
        metaphor: 'A restaurant’s set menu: what’s included, what’s extra, one price. No haggling over every side dish.',
        worked: ['Clients fill gaps with their own assumptions.', '“Not included” closes the gaps.', 'Fewer disputes, protected margin.'],
      },
    },
    { tag: 'how', title: 'Seven parts of a packaged offer',
      predict: {"q": "Which offer name sells best?", "options": ["“Never Miss a Job”", "“Automation Package B”", "“AI Solution Pro”", "“Tier 2”"], "answer": 0, "why": "A plain name that states the outcome sells before you explain anything."},
      body: ["Who, outcome, included, not included, timeline, price, guarantee.", "Same package every time; customize inside the boundaries.", "One flagship plus, at most, one small entry offer."] },
    { tag: 'try', title: 'Your turn: fix the scope',
      check: {
        type: 'multi', q: 'Which belong in the “Included” list of a clear offer?',
        options: ['Lead intake from the website form', 'Instant text reply to new leads', '“And anything else you need”', 'Weekly response-time report'], answer: [0, 1, 3],
        why: '“Anything else you need” makes the scope infinite. Name concrete deliverables.',
      } },
    { tag: 'biz', title: 'Packaging is what lets you scale solo',
      predict: {"q": "What does a packaged offer give you that custom quotes don’t?", "options": ["Reusable builds and a repeatable sales conversation", "Higher costs", "More meetings", "Nothing"], "answer": 0, "why": "Predictable delivery and a tested price, which Module 12 builds on."},
      body: ['A packaged offer means reusable builds, a repeatable sales conversation, predictable delivery time, and a price you’ve tested. Module 12 builds on this.'] },
  ],
  quiz: [
    { type: 'multi', q: 'Parts of a packaged offer?', options: ['Who it’s for', 'Outcome', 'Included / not included', 'Timeline and price', 'Guarantee', 'Your life story'], answer: [0, 1, 2, 3, 4], why: 'Your story belongs on your website, not the offer.' },
    { type: 'mc', q: 'How many offers should a solo consultant lead with?', options: ['One flagship (plus maybe one small entry offer)', 'As many as possible', 'Ten tiers', 'None; custom quotes only'], answer: 0, why: 'Fewer options, faster decisions.' },
    { type: 'mc', q: 'Why name an offer after its outcome?', options: ['The name sells the result before you explain anything', 'Names don’t matter', 'For trademark reasons', 'To include AI in it'], answer: 0, why: '“Never Miss a Job” vs “Automation Package B”.' },
  ],
  cards: [
    { id: 'seven', front: 'Seven parts of a packaged offer?', back: 'Who, outcome, included, not included, timeline, price, guarantee.' },
    { id: 'not', front: 'Why list “not included”?', back: 'Prevents scope creep and disputes.' },
    { id: 'one', front: 'How many offers?', back: 'One flagship, maybe one small entry offer.' },
  ],
};
