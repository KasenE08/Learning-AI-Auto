// M09 · L12 · Follow-up
export default {
  steps: [
    { tag: 'example', title: 'Proposal sent. Silence.', visualFirst: true,
      visual: { type: 'compare', cols: ['Day', 'Follow-up'], rows: [
        ['2', '“Any questions on the proposal? Happy to walk through it with Dr. Patel.”'],
        ['6', 'A useful extra: “Here’s a 1-minute recording of the reminder flow on test data.”'],
        ['13', '“Should I keep this open, or is now not the right time? Either answer is fine.”'],
        ['After that', 'Stop. Add a note to check in next quarter.'],
      ] },
      body: ['Volunteer Dental (fake) went quiet after the proposal.'],
      check: {
        type: 'mc', q: 'Why does each follow-up add something or ask an easy question?',
        options: ['“Just checking in” gives them nothing to reply to; value or an easy yes/no does', 'To fill their inbox', 'It’s a rule', 'To pressure them'], answer: 0,
        why: 'Good [[follow-up|follow-ups]] are useful or easy to answer. The last one gives permission to say no, which often gets a reply.',
      },
      stuck: {
        metaphor: 'Following up with a friend about plans: “still on for Saturday?” works; repeating “hey” five times doesn’t.',
        worked: ['Day 2: an offer to help.', 'Day 6: something useful.', 'Day 13: an easy yes/no.', 'Then stop.'],
      },
    },
    { tag: 'how', title: 'Follow-up rules',
      predict: {"q": "Which follow-up is most likely to get a reply?", "options": ["“Should I keep this open, or is now not the right time? Either is fine.”", "“Just checking in!”", "“Did you get my email?”", "“Why haven’t you replied?”"], "answer": 0, "why": "Permission to say no often gets a reply. Add value or ask an easy question, then stop."},
      body: ["2–3 follow-ups, spaced wider each time, then stop.", "Each adds value or asks an easy question; give permission to say no.", "Track every prospect in your CRM with a next-action date."] },
    { tag: 'try', title: 'Your turn: pick the follow-up',
      check: {
        type: 'mc', q: 'Best second follow-up after no reply?', options: ['“Thought of you: here’s how a similar practice handles recall reminders (2-min read).”', '“Just checking in!”', '“Did you get my last email?”', '“Why haven’t you replied?”'], answer: 0,
        why: 'Adds value and stays relevant without guilt-tripping.',
      } },
    { tag: 'key', title: 'Practice what you sell',
      predict: {"q": "Your own follow-up is a sequence with a stop condition. What does that show prospects?", "options": ["That you can build theirs", "Nothing", "That you’re pushy", "That you use AI"], "answer": 0, "why": "Organized follow-up is proof of your skill."},
      body: ['Your own follow-up is a sequence with a stop condition (Module 3, lesson 6). Prospects notice when your follow-up is organized; it’s proof you can build theirs.'] },
  ],
  quiz: [
    { type: 'mc', q: 'How many follow-ups after a proposal?', options: ['2–3, spaced out, then stop', '10, daily', 'None', 'Until they reply'], answer: 0, why: 'Persistent, not pushy.' },
    { type: 'mc', q: 'Why give permission to say no?', options: ['A clear no frees your time, and it often prompts a reply', 'It’s polite only', 'To lose deals', 'It’s required by law'], answer: 0, why: 'Clarity beats silence.' },
    { type: 'multi', q: 'Good follow-up content?', options: ['A short demo recording', 'A relevant idea for their business', 'An easy yes/no question', '“Just checking in”'], answer: [0, 1, 2], why: '“Just checking in” gives nothing.' },
  ],
  cards: [
    { id: 'rules', front: 'Follow-up rules?', back: '2–3 spaced touches, each adds value or asks an easy question, then stop.' },
    { id: 'no', front: 'Last follow-up?', back: 'Give permission to say no: “keep it open, or not the right time?”' },
    { id: 'track', front: 'Track follow-ups where?', back: 'Your own CRM with a next-action date.' },
  ],
};
