// M12 · L02 · SOPs
export default {
  steps: [
    { tag: 'example', title: 'An SOP for onboarding a new client', visualFirst: true,
      visual: { type: 'compare', cols: ['Step', 'Done by', 'Done when'], rows: [
        ['Send agreement + invoice (template)', 'Automation', 'Same day as “yes”'],
        ['Welcome email with access checklist', 'Automation', 'When first payment lands'],
        ['Kickoff call; record baseline in client sheet', 'You', 'Within 5 business days'],
        ['Create client folder from template', 'Automation', 'After kickoff'],
        ['Configure template build; run test set', 'You (agent drafts config)', 'Week 1–2'],
      ] },
      body: ['A [[sop]]: a standard operating procedure. Written once, followed every time.'],
      check: {
        type: 'mc', q: 'Why write this down if you’re the only person in the business?',
        options: ['So nothing depends on memory, steps can be automated, and quality is the same for every client', 'For investors', 'It’s required by law', 'You don’t need to'], answer: 0,
        why: 'SOPs are how you notice what to automate, hand work to AI agents safely, and never skip a step on a busy week.',
      },
      stuck: {
        metaphor: 'A pilot’s checklist. Pilots know how to fly; the checklist makes sure nothing is missed on a tired day.',
        worked: ['Memory fails when busy.', 'Written steps don’t.', 'And written steps can be automated or delegated.'],
      },
    },
    { tag: 'how', title: 'Writing a useful SOP',
      predict: {"q": "When is the best time to write an SOP?", "options": ["While doing the task", "From memory a year later", "Only when hiring", "Never"], "answer": 0, "why": "Capture the real steps as they happen."},
      body: ["Write it while doing the task; each step says what, who, when, and what “done” looks like.", "Link templates and checklists in the step; mark the judgment steps that stay human.", "Update it whenever your way of working changes."] },
    { tag: 'try', title: 'Your turn: which processes first?',
      check: {
        type: 'multi', q: 'Which of your own processes deserve an SOP first?', options: ['Client onboarding', 'Monthly reporting', 'Responding to an urgent support issue', 'Choosing a logo color'], answer: [0, 1, 2],
        why: 'Frequent, important, or high-stress processes. A logo is a one-off.',
      } },
    { tag: 'key', title: 'SOP → automation → agent',
      visual: {"type": "sort", "cols": ["Automation (rules)", "AI agent (drafting)", "You (judgment)"], "items": [{"text": "Send the welcome email when payment lands", "col": 0}, {"text": "Draft the monthly report summary", "col": 1}, {"text": "Decide whether to take on a new client", "col": 2}, {"text": "Create the client folder from a template", "col": 0}, {"text": "Draft first lines for 20 prospects", "col": 1}, {"text": "Handle an upset client call", "col": 2, "why": "Relationships stay human."}], "prompt": "Who should do each SOP step?"},
      body: ['Once a step is written clearly, you can automate it (rules) or give it to an AI agent (judgment-light drafting), with you reviewing. Lessons 5–6.'] },
  ],
  quiz: [
    { type: 'multi', q: 'Each SOP step should say…', options: ['What', 'Who', 'When', 'What “done” looks like'], answer: [0, 1, 2, 3], why: 'Clear enough to follow or automate.' },
    { type: 'mc', q: 'Best time to write an SOP?', options: ['While doing the task', 'From memory years later', 'Never', 'Only when hiring'], answer: 0, why: 'Capture the real steps.' },
    { type: 'mc', q: 'Why SOPs for a solo business?', options: ['Consistency, automation, and safe delegation to agents', 'They’re only for big companies', 'For investors', 'No reason'], answer: 0, why: 'They make scaling solo possible.' },
  ],
  cards: [
    { id: 'sop', front: 'SOP?', back: 'A written standard procedure: what, who, when, done-when for each step.' },
    { id: 'first', front: 'Which SOPs first?', back: 'Frequent, important, or high-stress processes (onboarding, reporting, urgent support).' },
    { id: 'path', front: 'SOP leads to?', back: 'Automation (rules) or AI agents (drafting), with your review.' },
  ],
};
