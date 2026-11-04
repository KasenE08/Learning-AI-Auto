// M12 · L06 · Coordinating agents with checkpoints
export default {
  steps: [
    { tag: 'example', title: 'Your Monday morning, run by agents', visualFirst: true,
      visual: { type: 'flow', play: true, nodes: [
        { label: 'Monday 6:00 am', kind: 'trigger', app: 'Schedule' },
        { label: 'Health agent: check every client’s runs, alerts, volumes', kind: 'ai', data: { green: 9, yellow: 'Volunteer Dental: reminders volume down 40%', red: 'none' } },
        { label: 'Pipeline agent: list follow-ups due, draft them', kind: 'ai', data: { drafts: 6 } },
        { label: 'Report agent: draft reports due this week', kind: 'ai', data: { drafts: 2 } },
        { label: 'One briefing to you, with approve/edit buttons', kind: 'logic', data: { your_time: '~25 minutes' } },
        { label: 'Approved items go out; the yellow flag becomes a task', kind: 'action' },
      ] },
      body: ['An [[orchestrator]] runs three worker agents and hands you one briefing.'],
      check: {
        type: 'mc', q: 'Where is the checkpoint in this flow?',
        options: ['The single briefing: nothing goes out until you approve it', 'There isn’t one', 'At 6:00 am', 'Inside each agent'], answer: 0,
        why: 'Agents work in parallel; everything converges on one human review before anything leaves (Module 5, lesson 8).',
      },
      stuck: {
        metaphor: 'A newsroom: reporters file stories overnight; the editor approves the front page before it prints.',
        worked: ['Three agents prepare work.', 'Everything lands in one briefing.', 'You approve; then it goes out.'],
      },
    },
    { tag: 'how', title: 'Design rules for your own agent ops',
      visual: {"type": "sort", "cols": ["Good design", "Bad design"], "items": [{"text": "One morning briefing with approve/edit buttons", "col": 0}, {"text": "A ping for every single agent result", "col": 1}, {"text": "Agents flag a 40% volume drop for you to decide", "col": 0}, {"text": "Agents email clients without review", "col": 1, "why": "Anything leaving your business passes through you."}, {"text": "Step and spend limits per run", "col": 0}, {"text": "No alert if the briefing never arrives", "col": 1}], "prompt": "Sort each agent-ops design choice."},
      body: ["**One briefing, one time**, with structured outputs you can scan.", "**Flags, not fixes**; limits and logs on every run.", "If the briefing doesn’t arrive, that’s an alert too."] },
    { tag: 'try', title: 'Your turn: what the agent may do alone',
      check: {
        type: 'multi', q: 'Which actions can run without your approval?', options: ['Logging run statistics to your ops sheet', 'Sending a follow-up email to a prospect', 'Creating a task for you about a yellow flag', 'Emailing a client their monthly report'], answer: [0, 2],
        why: 'Internal, reversible actions can run alone. Anything sent to a client or prospect waits for you.',
      } },
    { tag: 'key', title: 'Your time budget',
      predict: {"q": "You’re rewriting 80% of an agent’s drafts. What now?", "options": ["Improve its brief or take the task back", "Keep going", "Let it send unreviewed", "Add more agents"], "answer": 0, "why": "Review should take a fraction of doing the work yourself."},
      body: ['Aim for review time that’s a fraction of doing the work yourself. If you’re rewriting most drafts, fix the agent’s brief or take the task back.'] },
  ],
  quiz: [
    { type: 'mc', q: 'How should agent output reach you?', options: ['Batched into one briefing at a set time', 'A ping for every item', 'Never; agents act alone', 'Random times'], answer: 0, why: 'One review session.' },
    { type: 'mc', q: 'An agent notices a client’s volume dropped 40%. It should…', options: ['Flag it for you to decide', 'Fix it automatically', 'Email the client', 'Ignore it'], answer: 0, why: 'Flags, not fixes.' },
    { type: 'mc', q: 'You rewrite 80% of an agent’s drafts. What now?', options: ['Improve its brief/examples or take the task back', 'Keep going', 'Let it send unreviewed', 'Add more agents'], answer: 0, why: 'Review time should be small.' },
  ],
  cards: [
    { id: 'briefing', front: 'Agent ops output?', back: 'One batched briefing with approve/edit, at a set time.' },
    { id: 'flags', front: 'Agents and anomalies?', back: 'Flag them; you decide.' },
    { id: 'alone', front: 'What may agents do without approval?', back: 'Internal, reversible actions (logging, creating your tasks).' },
  ],
};
