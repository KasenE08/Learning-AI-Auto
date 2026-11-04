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
      predict: {"q": "How do you know an agent is reliable on a task?", "options": ["You accept most of its drafts unchanged", "It sounds confident", "It’s expensive", "It never asks questions"], "answer": 0, "why": "Measure acceptance rate."},
      body: ["Start from your SOPs: pick frequent drafting or sorting steps that are easy to check.", "Narrow brief, structured output, only the tools it needs, and a human checkpoint.", "Track how often you accept drafts unchanged."] },
    { tag: 'try', title: 'Your turn: agent or you?',
      check: {
        type: 'multi', q: 'Which tasks suit an agent with your review?', options: ['Drafting a client’s monthly report from the numbers', 'Deciding whether to fire a difficult client', 'Sorting 40 alerts into urgent/normal', 'Researching 20 prospects’ websites', 'Negotiating a contract change'], answer: [0, 2, 3],
        why: 'Drafts, sorting and research are agent work. Relationship decisions and negotiation are yours.',
      } },
    { tag: 'biz', title: 'The point: more clients, same one person',
      predict: {"q": "What do agents cost you instead of payroll?", "options": ["Your review time and tool bills", "Nothing", "An office", "Employment paperwork"], "answer": 0, "why": "They cut hours per client, which raises capacity (lesson 8)."},
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
