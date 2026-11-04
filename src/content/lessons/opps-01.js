// M07 · L01 · Where time leaks
export default {
  steps: [
    { tag: 'example', title: 'A day at a Knoxville HVAC office', visualFirst: true,
      visual: { type: 'compare', cols: ['Task', 'How often', 'Minutes each'], rows: [
        ['Copy web leads into the job system', '15 a day', '4'],
        ['Call back missed calls from the voicemail list', '10 a day', '3'],
        ['Text customers “tech is on the way”', '12 a day', '2'],
        ['Chase unpaid invoices by email', '20 a week', '5'],
        ['Write a custom quote for a new system', '3 a week', '45'],
      ] },
      body: ['Smoky Ridge Heating & Air (fake) has one office manager. You asked them to list what fills their day.'],
      check: {
        type: 'mc', q: 'Which task looks like the best automation candidate?',
        options: ['Copying web leads: frequent, repetitive, same steps every time', 'Writing custom quotes: the longest task', 'All are equal', 'None; they’re all quick'], answer: 0,
        why: 'Frequency × sameness beats length. Quotes take longest but need judgment each time; lead copying happens 15 times a day, identically.',
        wrong: { 1: 'Long, but each one is different and needs expertise. Hard to automate fully (AI can help draft, though).' },
      },
      stuck: {
        metaphor: 'A dripping tap wastes more water than a single spilled glass. Small, constant leaks add up.',
        worked: ['Lead copying: 15 × 4 min = 60 min a day.', 'Quotes: 3 × 45 = 135 min a week, but each is unique.', 'Frequent and identical wins.'],
      },
    },
    { tag: 'how', title: 'Signals of an automation opportunity',
      visual: {"type": "sort", "cols": ["Repetition", "Copying", "Waiting", "Forgetting"], "items": [{"text": "“We send the same welcome email 30 times a week.”", "col": 0}, {"text": "“I retype every web lead into the job system.”", "col": 1}, {"text": "“Voicemails sit until Monday.”", "col": 2}, {"text": "“Quote follow-ups happen when I remember.”", "col": 3}, {"text": "“I copy invoice totals into the sheet.”", "col": 1, "why": "Typing what one system already knows into another is copying."}, {"text": "“Forms wait in the inbox until lunch.”", "col": 2}], "prompt": "Which signal is each owner quote?"},
      body: ["**Repetition** and **copying between apps:** the same steps, again and again.", "**Waiting** and **forgetting:** work that sits, and follow-ups that slip when it’s busy.", "**Rules in someone’s head:** “if it’s an emergency, call the owner.”"] },
    { tag: 'try', title: 'Your turn: spot the leaks',
      check: {
        type: 'multi', q: 'A Nashville property manager says these things. Which hint at automation opportunities?',
        options: ['“We re-type every rental application into our system.”', '“Late-rent reminders go out when I remember.”', '“Deciding which repair vendor to trust takes experience.”', '“Maintenance requests come by text, email, and phone, and some get lost.”'], answer: [0, 1, 3],
        why: 'Re-typing, forgetting, and scattered intake are classic leaks. Vendor judgment is expertise; support it, don’t replace it.',
      } },
    { tag: 'biz', title: 'Listen for the words',
      predict: {"q": "Which owner sentence most clearly signals an automation opportunity?", "options": ["“It falls through the cracks when we’re busy.”", "“We’re a family business.”", "“We’ve been open 20 years.”", "“Our logo is blue.”"], "answer": 0, "why": "“Falls through the cracks”, “every time”, “I forget to”: write those phrases down word for word."},
      body: [
        'Owners rarely say “I need an automation.” They say: “we always…”, “every single time…”, “I forget to…”, “it falls through the cracks”, “I spend my evenings on…”.',
        'Write those phrases down word for word. They become your proposal’s problem statement (Module 9).',
      ] },
  ],
  quiz: [
    { type: 'multi', q: 'Which are signals of an automation opportunity?', options: ['Repetition', 'Copying between apps', 'Work waiting until someone checks', 'Tasks needing deep expertise every time'], answer: [0, 1, 2], why: 'Expert judgment can be assisted, but it’s rarely the first thing to automate.' },
    { type: 'mc', q: 'Why does frequency matter more than length?', options: ['Small tasks done many times add up and are usually identical', 'Long tasks can’t be measured', 'Short tasks are cheaper to build', 'It doesn’t'], answer: 0, why: 'Volume × sameness is where automation pays.' },
    { type: 'mc', scenario: 'An owner says: “Half our quote requests never get a follow-up because we’re on job sites all day.”', q: 'What kind of leak is this?', options: ['Forgetting / waiting: a follow-up sequence opportunity', 'Copying between apps', 'Not an automation problem', 'An expertise problem'], answer: 0, why: 'Things slip when people are busy. Sequences don’t get busy.' },
  ],
  cards: [
    { id: 'signals', front: 'Five automation signals?', back: 'Repetition, copying between apps, waiting, forgetting, rules applied in someone’s head.' },
    { id: 'freq', front: 'Frequency or task length?', back: 'Frequency × sameness usually wins.' },
    { id: 'words', front: 'Phrases that reveal leaks?', back: '“We always…”, “every time…”, “I forget to…”, “falls through the cracks”.' },
  ],
};
