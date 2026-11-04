// M08 · L03 · Problem-first offers
export default {
  steps: [
    { tag: 'example', title: 'What are you selling?', visualFirst: true,
      visual: { type: 'compare', cols: ['Offer', 'Owner’s reaction'], rows: [
        ['“An AI voice agent with tool calling and a CRM integration.”', '“…What does that do for me?”'],
        ['“Every call after 5 pm gets answered, qualified, and booked, so weekend emergencies stop going to competitors.”', '“How much?”'],
      ] },
      body: ['Two ways to describe the exact same thing to a plumbing company owner.'],
      check: {
        type: 'mc', q: 'What’s the first offer missing?',
        options: ['The problem it solves and the outcome for the owner', 'More technical detail', 'A lower price', 'A logo'], answer: 0,
        why: 'Owners buy outcomes, not mechanisms. The technology is how you deliver; the outcome is what they pay for.',
      },
      stuck: {
        metaphor: 'People don’t buy a drill; they buy the hole in the wall. And really, the shelf that hangs on it.',
        worked: ['Offer 1 lists features.', 'Offer 2 names the problem (missed calls) and the result (jobs kept).', 'Problems and results sell.'],
      },
    },
    { tag: 'how', title: 'Problem → outcome → mechanism',
      body: [
        '**Problem** in their words: “after-hours calls go to voicemail and customers call the next company”.',
        '**Outcome** they can picture: “every call answered and booked, even at 2 am”.',
        '**Mechanism** (briefly): “a phone assistant connected to your schedule”. Only as much detail as they need to believe it.',
        'Proof (Module 8, lesson 6) and price come after they care.',
      ] },
    { tag: 'try', title: 'Your turn: rewrite the line',
      check: {
        type: 'mc', q: 'Best problem-first line for a gym?', options: ['“New leads hear from you within a minute and get booked for a trial, even on weekends.”', '“We use GPT-class models in a multi-agent workflow.”', '“AI-powered lead management solution.”', '“Automation for fitness.”'], answer: 0,
        why: 'A specific outcome the owner can picture. The others are jargon or vague.',
      } },
    { tag: 'warn', title: 'Jargon check',
      body: ['Before any call, reread your offer and cross out: AI, agent, LLM, workflow, integration, API. If the sentence still makes sense to the owner, it’s ready. Use those words only if they ask.'] },
  ],
  quiz: [
    { type: 'order', q: 'Order a problem-first offer.', items: ['The problem, in their words', 'The outcome they can picture', 'The mechanism, briefly', 'Proof and price'], why: 'Care first, then belief, then numbers.' },
    { type: 'mc', q: 'An owner asks “what does that do for me?” What went wrong?', options: ['You led with the mechanism instead of the outcome', 'Your price was too high', 'They’re not interested in tech', 'Nothing'], answer: 0, why: 'Outcomes first.' },
    { type: 'multi', q: 'Words to avoid in a first pitch to a small-business owner?', options: ['LLM', 'API', 'Multi-agent', '“Your missed calls”'], answer: [0, 1, 2], why: 'Use their words, not yours.' },
  ],
  cards: [
    { id: 'order', front: 'Problem-first offer order?', back: 'Problem (their words) → outcome → brief mechanism → proof and price.' },
    { id: 'outcome', front: 'What do owners buy?', back: 'Outcomes, not mechanisms.' },
    { id: 'jargon', front: 'Jargon check?', back: 'Cross out AI/agent/LLM/API; the sentence should still make sense.' },
  ],
};
