// M05 · L03 · Handoff to a human
export default {
  steps: [
    { tag: 'example', title: 'Good handoff, bad handoff', visualFirst: true,
      visual: { type: 'compare', cols: ['', 'Bad', 'Good'], rows: [
        ['What the customer hears', '“I can’t help with that.” (chat ends)', '“I’ll pass this to Maria at the front desk. She’ll reply by 4 pm today.”'],
        ['What staff receive', 'Nothing', 'Name, verified email, summary: “Crown fell off, mild pain, wants this week”, full transcript link'],
        ['Customer repeats themselves?', 'Yes, if they call back at all', 'No'],
      ], pick: 1 },
      body: ['A dental chat agent meets a question it shouldn’t answer.'],
      check: {
        type: 'mc', q: 'What makes the good handoff good?',
        options: ['The customer knows what happens next, and staff get context so nobody repeats anything', 'It uses a friendlier tone', 'It answers the medical question anyway', 'It’s shorter'], answer: 0,
        why: 'A [[handoff]] is a hand-over, not a dead end: clear expectation for the customer, full context for the human.',
      },
      stuck: {
        metaphor: 'A relay race: the baton is passed hand to hand. Dropping it on the track isn’t a handoff.',
        worked: ['Bad: conversation ends, nobody knows.', 'Good: customer told who and when; staff get a summary.', 'Context travels with the case.'],
      },
    },
    { tag: 'how', title: 'When to hand off',
      visual: {"type": "sort", "cols": ["Hand off", "Keep answering"], "items": [{"text": "“Can I talk to a real person?”", "col": 0}, {"text": "“What time does the 6 pm class end?”", "col": 1}, {"text": "“I was charged twice and I’m furious”", "col": 0}, {"text": "“Do you have showers?”", "col": 1}, {"text": "Same question asked a third time", "col": 0, "why": "Loops mean the agent isn’t helping; pass it on."}, {"text": "“Do you take cards?”", "col": 1}], "prompt": "A gym chat agent: what happens next?"},
      body: ["Hand off when it’s out of scope, the agent can’t answer, or emotions run high.", "Always honor “I want a person”, and watch for loops.", "High-value moments (a big order, a hot lead) may deserve a human fast."] },
    { tag: 'try', title: 'Your turn: hand off or keep going?',
      check: {
        type: 'multi', q: 'In a gym chat, which should trigger a handoff?',
        options: ['“Can I talk to a real person?”', '“What time does the 6 pm class end?”', '“I was charged twice and I’m furious”', '“Do you have showers?”', 'The customer asks about price three times and still seems confused'], answer: [0, 2, 4],
        why: 'Explicit request, billing anger, and a loop. Class times and showers are easy answers.',
      } },
    { tag: 'see', title: 'What the handoff package contains',
      predict: {"q": "Handoffs go to a shared inbox nobody checks on weekends. What’s missing?", "options": ["A watched queue with an alert if items wait too long", "A friendlier bot", "More documents", "Nothing"], "answer": 0, "why": "A handoff nobody receives is just a dead end."},
      body: ["Who (verified contact) and what (a short summary + transcript link).", "Why it was handed off, and the promise made to the customer (“by 4 pm”).", "Where: a queue someone watches, with an alert if it waits too long."] },
  ],
  quiz: [
    { type: 'mc', q: 'A customer types “I want to speak to a human.” What should the agent do?', options: ['Hand off, every time', 'Try two more answers first', 'Explain why the bot is better', 'End the chat'], answer: 0, why: 'Always honor it.' },
    { type: 'multi', q: 'What goes in a handoff package?', options: ['Summary + transcript link', 'Reason for handoff', 'Promise made to the customer', 'The agent’s system prompt'], answer: [0, 1, 2], why: 'Staff need context and the commitment, not the prompt.' },
    { type: 'mc', scenario: 'Handoffs go to a shared inbox nobody checks on weekends.', q: 'What’s missing?', options: ['A watched queue with an alert when items wait too long', 'A friendlier bot', 'More documents', 'Nothing'], answer: 0, why: 'A handoff nobody receives is a dead end with extra steps.' },
  ],
  cards: [
    { id: 'when', front: 'Five reasons to hand off?', back: 'Out of scope, can’t answer, emotion or explicit request, loops, high value.' },
    { id: 'package', front: 'Handoff package?', back: 'Who, summary + transcript, why, the promise made, routed to a watched queue.' },
    { id: 'human', front: '“Can I talk to a person?”', back: 'Always hand off.' },
  ],
};
