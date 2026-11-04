// M05 · L08 · Orchestrator and workers
export default {
  steps: [
    { tag: 'example', title: 'Researching a prospect', visualFirst: true,
      visual: { type: 'exchange', actors: ['Orchestrator', 'Research worker', 'Writing worker'], messages: [
        { from: 0, to: 1, label: 'Find: services, team size, reviews for Oak & Iron Fitness', kind: 'request', body: { task: 'research', company: 'Oak & Iron Fitness (fake)', return: 'facts with sources' } },
        { from: 1, to: 0, label: '5 facts with sources', kind: 'response', body: { services: 'Personal training, classes', reviews: 'Many mention slow replies to inquiries', sources: '2 pages' } },
        { from: 0, to: 2, label: 'Draft a 3-line intro using these facts', kind: 'request' },
        { from: 2, to: 0, label: 'Draft', kind: 'response' },
        { from: 0, to: 0, label: 'Check against rules, send to you for approval', kind: 'event' },
      ] },
      body: ['Your own internal agent team preparing for a (simulated) sales call. Step through it.'],
      check: {
        type: 'mc', q: 'What is the orchestrator’s job?',
        options: ['Split the goal into tasks, give each worker clear inputs, check and combine the results', 'Do all the research itself', 'Send emails to prospects automatically', 'Nothing; workers coordinate themselves'], answer: 0,
        why: 'The [[orchestrator]] plans and checks; workers do narrow tasks with their own tools. The final send still goes through you.',
      },
      stuck: {
        metaphor: 'A general contractor: hires the electrician and the plumber, tells each exactly what to do, inspects their work, and signs off.',
        worked: ['Message 1 and 3: the orchestrator hands out tasks.', 'Messages 2 and 4: workers return results.', 'Message 5: it checks and passes to you.'],
      },
    },
    { tag: 'how', title: 'Making orchestration reliable',
      predict: {"q": "A research worker returns “facts” with no sources, and the draft quotes them. What should have caught it?", "options": ["An orchestrator checkpoint rejecting results without sources", "A bigger model", "The prospect", "Nothing"], "answer": 0, "why": "Validate each worker’s output before building on it."},
      body: ["**Clear briefs** with a defined output shape for each worker.", "**Checkpoints** that validate results, plus **limits** on calls, time and spend.", "**Human approval** before anything leaves your business."] },
    { tag: 'try', title: 'Your turn: where is the checkpoint?',
      check: {
        type: 'order', q: 'Order an orchestrated weekly client-report job.',
        items: ['Orchestrator receives “prepare Rivera’s weekly report”', 'Data worker pulls the week’s numbers', 'Orchestrator checks the numbers are complete', 'Writing worker drafts the summary', 'You approve, then it’s sent'],
        why: 'Plan, get data, check it before writing on top of it, draft, human approval before it leaves.',
      } },
    { tag: 'biz', title: 'This is how you run ops solo',
      predict: {"q": "In your own agent-run business, what always goes through you?", "options": ["Anything sent to a client or prospect", "Nothing", "Only invoices", "Only research"], "answer": 0, "why": "Agents prepare; you approve at the exits. Module 12 builds on this."},
      body: [
        'Module 12 uses this exact pattern for your own business: agents prepare reports, drafts and research; you approve.',
        'Know where it breaks: vague briefs, unchecked results, and no human at the exits.',
      ] },
  ],
  quiz: [
    { type: 'mc', q: 'What does a worker agent get?', options: ['A narrow task, clear inputs, a defined output shape', 'The whole goal and all tools', 'Nothing; it decides', 'Customer passwords'], answer: 0, why: 'Narrow and well-defined.' },
    { type: 'multi', q: 'Which make orchestration reliable?', options: ['Structured outputs from workers', 'Checks between steps', 'Spend and step limits', 'Letting workers send emails to clients directly'], answer: [0, 1, 2], why: 'Exits go through a human.' },
    { type: 'mc', scenario: 'A research worker returned “facts” with no sources, and the draft quoted them.', q: 'What should have caught this?', options: ['An orchestrator checkpoint: reject results without sources', 'A bigger writing model', 'The prospect', 'Nothing'], answer: 0, why: 'Validate worker output before building on it.' },
  ],
  cards: [
    { id: 'orch', front: 'Orchestrator?', back: 'Splits a goal into tasks, briefs workers, checks and combines results.' },
    { id: 'worker', front: 'Worker agent?', back: 'Does one narrow task with clear inputs, limited tools, and a defined output.' },
    { id: 'reliable', front: 'Four reliability rules?', back: 'Clear briefs, checkpoints, limits, human approval at the exits.' },
  ],
};
