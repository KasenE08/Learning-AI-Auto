// M10 · L07 · Scope creep and raising prices
const creep = {
  type: 'roleplay',
  title: '“Can you just add…” · simulated',
  persona: { name: 'Marisol Vega', role: 'Owner, Ironside Fitness (fake), Chattanooga TN' },
  start: 'ask',
  nodes: {
    ask: { say: 'Love the lead follow-ups! Can you just add a birthday text for all 600 members? Should be quick, right?', choices: [
      { text: 'Glad it’s working! Birthday texts are a new workflow, so it’s outside our current scope. I can send a quick quote today. Want that?', score: 2, why: 'Friendly, clear about scope, and offers a path to yes.', next: 'quote' },
      { text: 'Sure, no problem, I’ll do it this week.', score: 0, why: 'Unpaid work, and it sets the expectation that everything is “just one more thing”.', next: 'more' },
      { text: 'That’s not in the contract.', score: 1, why: 'Correct, but blunt. Pair the boundary with an offer.', next: 'quote' },
    ] },
    quote: { say: 'Oh. How much would that be?', choices: [
      { text: 'Around $400 to set up, and it fits in your current monthly plan. It also needs texting consent from members first. I’ll include that in the quote.', score: 2, why: 'Clear price, honest about a requirement (consent).', next: 'ok' },
      { text: 'Not sure, maybe $1,000? Or less?', score: 0, why: 'Vague pricing invites haggling and lowers trust.', next: 'ok' },
    ] },
    more: { say: 'Great! Oh, and could you also redo our class signup form while you’re at it?', choices: [
      { text: 'Let me pause: both of these are new work. I’ll do a quick change-request quote for each so you can decide.', score: 2, why: 'Recovers by applying the change process.', next: 'ok' },
      { text: 'Sure, why not.', score: 0, why: 'Now you’re working for free indefinitely.', next: 'end_bad' },
    ] },
    ok: { say: 'Okay, send it over and I’ll look.', end: true },
    end_bad: { say: 'Amazing. You’re the best! I’ll send you a few more ideas tonight.', end: true },
  },
};
export default {
  steps: [
    { tag: 'example', title: '“Should be quick, right?”', visualFirst: true, visual: creep,
      body: ['A happy client asks for “just one more thing”.'],
      check: {
        type: 'mc', q: 'What protects both the relationship and your business?',
        options: ['A friendly boundary plus a quick quote for new work', 'Doing it free to keep them happy', 'Refusing coldly', 'Ignoring the request'], answer: 0,
        why: '[[scope-creep|Scope creep]] is normal. A change-request habit keeps it fair: new work, new price, client decides.',
      },
      stuck: {
        metaphor: 'A painter asked to “also do the garage while you’re here”. Happy to, with a quote, because it’s another job.',
        worked: ['Birthday texts are a new workflow.', 'Say so kindly.', 'Offer a quick quote. Client chooses.'],
      },
    },
    { tag: 'how', title: 'The change-request habit',
      predict: {"q": "A client asks for something outside scope. When does work start?", "options": ["After they approve a short written quote", "Immediately", "After launch, free", "Never"], "answer": 0, "why": "Quote first. Small favors are fine if you say “this one’s on me”."},
      body: [
        'Your agreement defines what’s included (Module 8) and how changes work.',
        'For anything outside it: a short written quote (what, price, timeline). Work starts when they approve.',
        'Small favors are fine sometimes, but say “this one’s on me” so it’s visibly a gift, not the new normal.',
      ] },
    { tag: 'see', title: 'Raising prices',
      predict: {"q": "Who sees a price increase first?", "options": ["New clients", "Your oldest client, tomorrow", "Everyone, overnight", "Nobody, ever"], "answer": 0, "why": "New proposals first; existing clients at an annual review with 30–60 days’ notice."},
      body: [
        'New clients first: raise prices for new proposals as demand and results grow.',
        'Existing clients: review once a year, give 30–60 days’ notice, and tie it to added value or results.',
        'Some clients will leave. If you’re fully booked, that’s often fine (Module 12).',
      ] },
    { tag: 'try', title: 'Your turn: the gift',
      check: {
        type: 'mc', q: 'A client asks to change one email’s wording (2 minutes). Best handling?', options: ['Do it, and if it’s outside the retainer’s change allowance, say “this one’s on me”', 'Send a $200 quote', 'Refuse', 'Ignore it'], answer: 0,
        why: 'Tiny favors build goodwill when they’re named as favors. Retainers often include small changes anyway (lesson 3).',
      } },
  ],
  quiz: [
    { type: 'order', q: 'Order the change-request process.', items: ['Client asks for something new', 'You confirm it’s outside scope', 'You send a short written quote', 'Client approves', 'Work starts'], why: 'Quote before work.' },
    { type: 'mc', q: 'Best way to raise prices for existing clients?', options: ['Annual review with 30–60 days’ notice, tied to value', 'Surprise on the next invoice', 'Never raise them', 'Double them overnight'], answer: 0, why: 'Predictable and fair.' },
    { type: 'mc', q: 'Why name a favor as a favor?', options: ['So it doesn’t become the expected norm', 'To get credit only', 'It’s required', 'It isn’t useful'], answer: 0, why: 'Visible gifts build goodwill without moving the scope.' },
  ],
  cards: [
    { id: 'creep', front: 'Scope creep?', back: 'Extra requests beyond the agreed scope. Handle with a quick written quote.' },
    { id: 'gift', front: 'Small favor?', back: 'Fine, but say “this one’s on me”.' },
    { id: 'raise', front: 'Raising prices?', back: 'New clients first; existing clients annually with notice, tied to value.' },
  ],
};
