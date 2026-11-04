// M09 · L11 · Closing
const closing = {
  type: 'roleplay',
  title: 'Closing · simulated',
  persona: { name: 'Marisol Vega', role: 'Owner, Ironside Fitness (fake), Chattanooga TN' },
  start: 'open',
  nodes: {
    open: { say: 'I read the proposal again. It looks good, I think.', choices: [
      { text: 'Great. Is there any part you’d change before we start?', score: 2, why: 'Invites the last concern out into the open.', next: 'timeline' },
      { text: 'So can I send the invoice?', score: 1, why: 'Direct, but skips checking for a final worry.', next: 'timeline' },
      { text: 'Do you have any questions about AI?', score: 0, why: 'Reopens a topic she didn’t raise.', next: 'timeline' },
    ] },
    timeline: { say: 'Just the timing. We have a new-year promo starting on the 15th.', choices: [
      { text: 'We can have lead follow-up live by the 12th if I get access by Friday. Shall I send the agreement and the access checklist now?', score: 2, why: 'Solves her constraint and asks for the next action.', next: 'terms' },
      { text: 'We’ll try our best.', score: 1, why: 'Vague. She needs a date she can plan around.', next: 'terms' },
      { text: 'The timeline is fixed, sorry.', score: 0, why: 'Ignores her actual deadline.', next: 'stall' },
    ] },
    terms: { say: 'Okay. Do I pay everything up front?', choices: [
      { text: 'Half the setup fee to start, half at launch, then monthly. That’s in the agreement.', score: 2, why: 'Clear, fair, and matches what she’ll sign.', next: 'yes' },
      { text: 'Whatever works for you.', score: 0, why: 'Uncertainty about terms makes clients nervous.', next: 'stall' },
      { text: 'Yes, all up front.', score: 1, why: 'Clear, but more risk for her than needed.', next: 'yes' },
    ] },
    yes: { say: 'Send it over. Let’s do it.', end: true },
    stall: { say: 'Let me talk to my manager and get back to you.', end: true },
  },
};
export default {
  steps: [
    { tag: 'example', title: 'From “looks good” to signed', visualFirst: true, visual: closing,
      body: ['She likes the proposal. Get from “I think” to a signed agreement.'],
      check: {
        type: 'mc', q: 'What does closing mostly come down to here?',
        options: ['Removing the last obstacles and making the next action clear and easy', 'Pressure', 'A clever line', 'Lowering the price'], answer: 0,
        why: 'If discovery and the proposal were good, [[closing]] is asking for the decision and clearing what’s in the way: timing, terms, access.',
      },
      stuck: {
        metaphor: 'Checking out at a store: the decision is made; you just need a clear, quick checkout line.',
        worked: ['She already liked it.', 'Obstacles: timing and payment terms.', 'Answer both clearly, then ask for the next step.'],
      },
    },
    { tag: 'how', title: 'Closing habits',
      body: [
        '**Ask directly:** “Shall I send the agreement?” Silence after asking is fine.',
        '**Surface the last concern:** “Anything you’d change before we start?”',
        '**Make it easy:** e-signature, a payment link, an access checklist, a kickoff date.',
        '**Never fake urgency.** Real deadlines (their promo, your schedule) are fine to mention.',
      ] },
    { tag: 'try', title: 'Your turn: the ask',
      check: {
        type: 'mc', q: 'Best closing question after a good proposal walkthrough?', options: ['“Does this look right? If so, I’ll send the agreement and we can kick off Monday.”', '“So… what do you think about maybe possibly moving forward?”', '“Sign now or the price doubles.”', '“Let me know whenever.”'], answer: 0,
        why: 'Clear, direct, with a concrete next step.',
      } },
    { tag: 'biz', title: 'After yes',
      body: ['Send the agreement and invoice the same day, plus a short “what happens next” email: kickoff date, what you need from them, when they’ll see progress. Onboarding starts here (Module 11).'] },
  ],
  quiz: [
    { type: 'mc', q: 'What makes closing easy?', options: ['Good discovery and a clear proposal, then removing final obstacles', 'Pressure tactics', 'Talking fast', 'Discounts'], answer: 0, why: 'Most of closing happens earlier.' },
    { type: 'multi', q: 'Fair to mention when closing?', options: ['Their real promo deadline', 'Your actual schedule availability', 'A made-up price increase', 'A fake “only 2 spots left”'], answer: [0, 1], why: 'Real constraints only.' },
    { type: 'mc', q: 'What should happen the day they say yes?', options: ['Agreement, invoice, and a “what happens next” email', 'Wait a week', 'Start building with no paperwork', 'Ask for a testimonial'], answer: 0, why: 'Momentum and clarity.' },
  ],
  cards: [
    { id: 'ask', front: 'How to ask for the business?', back: 'Directly: “Shall I send the agreement?” Then be quiet.' },
    { id: 'obstacles', front: 'Closing is mostly?', back: 'Clearing final obstacles (timing, terms, access) and making the next step easy.' },
    { id: 'urgency', front: 'Urgency?', back: 'Only real deadlines. Never fake.' },
  ],
};
