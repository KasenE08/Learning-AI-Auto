// M12 · L05 · AI agents instead of hires
export default {
  steps: [
    { tag: 'example', title: 'Jobs you’d hire for, done by agents', visualFirst: true,
      visual: { type: 'compare', cols: ['Would-be hire', 'Agent does', 'You do'], rows: [
        ['Sales assistant', 'Researches prospects, drafts first lines', 'Checks facts, edits, sends'],
        ['Account manager', 'Drafts monthly reports from the numbers', 'Reviews, adds the 3-line summary'],
        ['Support desk', 'Triages client alerts, drafts the first reply', 'Decides and handles urgent issues'],
        ['Bookkeeper’s helper', 'Categorizes expenses, flags odd ones', 'Approves; your CPA files taxes'],
        ['Junior builder', 'Drafts client config from the intake form', 'Reviews, runs the test set'],
      ] },
      body: ['Instead of hiring, you coordinate AI agents (Module 5) on the repeatable parts of your SOPs.'],
      check: {
        type: 'mc', q: 'What do all the “You do” cells have in common?',
        options: ['Judgment, final approval, and anything that leaves your business', 'Typing', 'Nothing important', 'Building everything from scratch'], answer: 0,
        why: 'Agents prepare; you decide. Anything sent to a client or prospect, any money decision, any judgment call passes through you.',
      },
      stuck: {
        metaphor: 'A chef with prep cooks: they chop, measure and plate; the chef tastes and decides what leaves the kitchen.',
        worked: ['Agents do research, drafts, triage, categorizing.', 'You check, decide, approve, send.', 'Judgment and the exits stay with you.'],
      },
    },
    { tag: 'how', title: 'Choosing what to give agents',
      body: [
        'Start from your SOPs (lesson 2). Pick steps that are frequent, mostly drafting or sorting, and easy to check.',
        'Give each agent a narrow brief, structured output, and only the tools it needs (Module 5).',
        'Keep a human checkpoint before anything goes out (Module 3).',
        'Measure: how often do you accept drafts unchanged? That tells you where agents are reliable.',
      ] },
    { tag: 'try', title: 'Your turn: agent or you?',
      check: {
        type: 'multi', q: 'Which tasks suit an agent with your review?', options: ['Drafting a client’s monthly report from the numbers', 'Deciding whether to fire a difficult client', 'Sorting 40 alerts into urgent/normal', 'Researching 20 prospects’ websites', 'Negotiating a contract change'], answer: [0, 2, 3],
        why: 'Drafts, sorting and research are agent work. Relationship decisions and negotiation are yours.',
      } },
    { tag: 'biz', title: 'The point: more clients, same one person',
      body: ['Agents raise your capacity (lesson 8) by cutting hours per client, without payroll, management, or employment law. The cost is your review time and the tool bills.'] },
  ],
  quiz: [
    { type: 'mc', q: 'What should always pass through you?', options: ['Anything leaving your business, money decisions, judgment calls', 'Nothing', 'Only invoices', 'Only research'], answer: 0, why: 'Human checkpoints at the exits.' },
    { type: 'mc', q: 'Best first tasks for agents?', options: ['Frequent drafting or sorting that’s easy to check', 'Rare, high-stakes decisions', 'Client negotiations', 'Firing clients'], answer: 0, why: 'Easy to verify, high volume.' },
    { type: 'mc', q: 'How do you know an agent is reliable on a task?', options: ['Track how often you accept its drafts unchanged', 'It sounds confident', 'It’s expensive', 'You don’t'], answer: 0, why: 'Measure acceptance rate.' },
  ],
  cards: [
    { id: 'split', front: 'Agents vs you?', back: 'Agents prepare (research, drafts, sorting); you decide and approve what leaves.' },
    { id: 'pick', front: 'Which tasks for agents?', back: 'Frequent, drafting/sorting, easy to check, from your SOPs.' },
    { id: 'measure', front: 'Measure agent reliability?', back: 'Acceptance rate of drafts.' },
  ],
};
