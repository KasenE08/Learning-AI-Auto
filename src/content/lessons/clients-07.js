// M09 · L07 · Discovery call structure
const discovery = {
  type: 'roleplay',
  title: 'Discovery call · simulated',
  persona: { name: 'Renee Alvarez', role: 'Office manager, Volunteer Dental (fake), Knoxville TN' },
  start: 'open',
  nodes: {
    open: { say: 'Hi, this is Renee. You wanted 20 minutes about appointment reminders?', choices: [
      { text: 'Thanks for making time. Before I share anything, could you walk me through what happens today when a patient books?', score: 2, why: 'Opens with their process. You learn before you pitch.', next: 'process' },
      { text: 'Yes! Let me show you our AI reminder system first. It uses…', score: 0, why: 'Pitching before you know the problem. She’ll tune out.', next: 'pitched' },
      { text: 'Sure. How many no-shows do you get a month?', score: 1, why: 'A useful number, but asked before you understand how things work.', next: 'process' },
    ] },
    process: { say: 'Patients book by phone or the website. The front desk texts a reminder the day before… when they remember. Mondays are chaos.', choices: [
      { text: 'What happens on the days they don’t remember?', score: 2, why: 'Follows the thread she gave you: the gap.', next: 'pain' },
      { text: 'Our system automates that completely.', score: 0, why: 'Jumped to the pitch at the first sign of a problem.', next: 'pitched' },
      { text: 'Got it. Which scheduling software do you use?', score: 1, why: 'You’ll need it later, but you just stepped past the pain.', next: 'pain' },
    ] },
    pitched: { say: 'Hm. We’ve had a lot of vendors pitch us. I’m not sure we need another system.', choices: [
      { text: 'Fair enough. Let me back up: what’s actually frustrating about reminders right now?', score: 2, why: 'Recovered by returning to her problem.', next: 'pain' },
      { text: 'This one is different, it’s AI-powered.', score: 0, why: '“AI” isn’t a reason. You’ve lost her.', next: 'lost' },
    ] },
    pain: { say: 'Honestly? No-shows. Maybe ten a month. Each one is an empty chair, and Dr. Patel gets frustrated.', choices: [
      { text: 'What does one empty chair cost the practice, roughly?', score: 2, why: 'Turns the pain into a number you can build ROI on.', next: 'value' },
      { text: 'How do you handle a no-show today?', score: 1, why: 'Good detail, but the cost question matters more right now.', next: 'value' },
      { text: 'Ten is a lot! We can definitely fix that.', score: 0, why: 'Promising before you know enough.', next: 'value' },
    ] },
    value: { say: 'Probably $150 to $200 per appointment. Plus the hygienist sitting around.', choices: [
      { text: 'So around $1,500–2,000 a month. If we cut that in half, would that be worth exploring?', score: 2, why: 'Summarizes in her numbers and checks if it matters to her.', next: 'next' },
      { text: 'Interesting.', score: 1, why: 'Missed the chance to connect pain to value.', next: 'next' },
      { text: 'Our price is $500 a month.', score: 0, why: 'Price before she agrees the problem is worth solving.', next: 'meh' },
    ] },
    next: { say: 'Yeah, it would. I’d need Dr. Patel to sign off, though.', choices: [
      { text: 'Makes sense. Could we do 15 minutes with Dr. Patel this week? I’ll bring a one-page plan with these numbers.', score: 2, why: 'A specific next step that includes the decision-maker.', next: 'good' },
      { text: 'Okay, let me know what she says.', score: 1, why: 'Passive: the deal now depends on Renee’s memory.', next: 'meh' },
      { text: 'Can you just sign today?', score: 0, why: 'She just told you she can’t.', next: 'meh' },
    ] },
    good: { say: 'Thursday at 12:30 works. Send me the invite.', end: true },
    meh: { say: 'Send me something by email and I’ll look at it when I can.', end: true },
    lost: { say: 'I’ve got patients waiting. Just email me something.', end: true },
  },
};
export default {
  steps: [
    { tag: 'example', title: 'Run a discovery call', visualFirst: true, visual: discovery,
      body: ['Practice first. Every reply you pick is scored instantly. Replay to find the best path.'],
      check: {
        type: 'mc', q: 'Looking back: what should a discovery call mostly be?',
        options: ['Mostly you asking and listening; a short summary and next step at the end', 'Mostly your pitch', 'A product demo', 'Small talk'], answer: 0,
        why: '[[discovery-call|Discovery]] is about their problem, its cost, and who decides. The pitch comes later, in their words.',
      },
      stuck: {
        metaphor: 'A doctor’s appointment: questions and listening first, diagnosis after, prescription last.',
        worked: ['The strong replies asked about her process and costs.', 'The weak ones pitched early.', 'So: mostly asking and listening.'],
      },
    },
    { tag: 'how', title: 'A five-part structure (about 20 minutes)',
      predict: {"q": "Which part of a discovery call should take the most time?", "options": ["Pain and its cost", "The opening", "Your pitch", "Small talk"], "answer": 0, "why": "About 7 of 20 minutes go to what goes wrong and what it costs."},
      body: ["**Open** (ask permission to ask questions), then **current process**: “walk me through the last one.”", "**Pain and cost** (the longest part), then **decision**: who decides, budget, timing.", "**Summary + next step:** their problem in their words, and a specific next meeting."] },
    { tag: 'try', title: 'Your turn: order the call',
      check: {
        type: 'order', q: 'Order the parts of a discovery call.',
        items: ['Open and ask permission to ask questions', 'Current process', 'Pain and its cost', 'Decision-makers, budget, timing', 'Summary and next step'],
        why: 'Context, then pain, then the practical buying questions, then a clear next step.',
      } },
    { tag: 'warn', title: 'Talk less',
      predict: {"q": "Roughly how much of a discovery call should you be talking?", "options": ["Less than a third", "Most of it", "Exactly half", "None"], "answer": 0, "why": "If you’re explaining technology, you’ve drifted. Bring it back with a question."},
      body: ['Aim to speak less than a third of the time. If you’re explaining technology, you’ve drifted. Bring it back with a question.'] },
  ],
  quiz: [
    { type: 'mc', q: 'Why ask “who else is involved in decisions?”', options: ['So the decision-maker hears the proposal', 'To be polite', 'To find more clients', 'It’s not needed'], answer: 0, why: 'Many deals stall when the real decider isn’t in the room.' },
    { type: 'mc', q: 'How much should you talk on a discovery call?', options: ['Less than a third of the time', 'Most of the time', 'Exactly half', 'Not at all'], answer: 0, why: 'Listen to learn.' },
    { type: 'mc', q: 'The call should end with…', options: ['A summary in their words and a specific next step', '“Let me know”', 'An invoice', 'A long demo'], answer: 0, why: 'Clarity and momentum.' },
  ],
  cards: [
    { id: 'five', front: 'Discovery call parts?', back: 'Open → current process → pain and cost → decision/budget/timing → summary + next step.' },
    { id: 'talk', front: 'How much should you talk?', back: 'Less than a third of the time.' },
    { id: 'end', front: 'End every discovery call with?', back: 'Their problem in their words and a specific next meeting.' },
  ],
};
