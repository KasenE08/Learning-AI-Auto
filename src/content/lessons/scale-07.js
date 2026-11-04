// M12 · L07 · Where agent ops breaks
export default {
  steps: [
    { tag: 'example', title: 'Four ways it went wrong (fake)', visualFirst: true,
      visual: { type: 'compare', cols: ['What happened', 'Why agents couldn’t handle it'], rows: [
        ['A long-time client was quietly unhappy; the report agent kept sending cheerful reports', 'Relationships run on tone and trust, not data'],
        ['A research agent invented a prospect’s “recent award”; it went out unchecked on a busy week', 'You skipped the checkpoint'],
        ['Two agents each “fixed” the same client config differently', 'No single owner of a decision'],
        ['A client asked who is responsible when something breaks', 'Only you can be accountable'],
      ] },
      body: ['Agents raise capacity, but some things don’t delegate.'],
      check: {
        type: 'mc', q: 'Which failure was really a process failure, not an agent failure?',
        options: ['The invented award: the human checkpoint was skipped', 'The unhappy client', 'Accountability', 'None'], answer: 0,
        why: 'Agents will sometimes be wrong (Module 2). The checkpoint exists for exactly that, and skipping it on busy weeks is the classic failure.',
      },
      stuck: {
        metaphor: 'A seatbelt only works if you wear it on every trip, especially the rushed ones.',
        worked: ['The agent invented a fact (expected sometimes).', 'Your review was supposed to catch it.', 'Skipping the review was the failure.'],
      },
    },
    { tag: 'how', title: 'What stays human',
      body: [
        '**Relationships:** reading tone, noticing unhappiness, calls that need empathy.',
        '**Judgment and trade-offs:** which client to prioritize, whether to take a project, how to handle a mistake.',
        '**Accountability:** contracts, promises, and fixing what broke are yours.',
        '**Final say on anything external.**',
        'And watch for **compounding errors**: one agent’s mistake becomes the next agent’s input.',
      ] },
    { tag: 'try', title: 'Your turn: where’s the limit?',
      check: {
        type: 'mc', scenario: 'You have 14 clients. Your weekly review takes 6 hours, and you’ve started approving drafts without reading them.',
        q: 'What does this tell you?', options: ['You’re at capacity: raise prices, tighten scope, or stop taking clients, rather than drop the checkpoint', 'Add more agents', 'Remove the review', 'Hire immediately'], answer: 0,
        why: 'When the human checkpoint becomes a rubber stamp, the system is over capacity. At one-person scale, the levers are price, scope and client count.',
      } },
    { tag: 'key', title: 'One-person scale is a choice',
      body: ['This course stops at one person by design. When review quality slips, the answer here isn’t a hire. It’s fewer, better-paying clients and tighter packages (lessons 8 and 10).'] },
  ],
  quiz: [
    { type: 'multi', q: 'What stays human in agent ops?', options: ['Client relationships', 'Judgment and trade-offs', 'Accountability', 'Final say on anything external', 'Sorting alerts'], answer: [0, 1, 2, 3], why: 'Sorting alerts is agent work.' },
    { type: 'mc', q: 'What are compounding errors?', options: ['One agent’s mistake becomes the next agent’s input', 'Interest on loans', 'Two clients at once', 'A typo'], answer: 0, why: 'Validate between steps.' },
    { type: 'mc', q: 'Your review has become a rubber stamp. Solo-scale fix?', options: ['Fewer clients, higher prices, or tighter scope', 'Remove the review', 'More agents', 'Ignore it'], answer: 0, why: 'Protect the checkpoint.' },
  ],
  cards: [
    { id: 'human', front: 'What stays human?', back: 'Relationships, judgment, accountability, final say on anything external.' },
    { id: 'compound', front: 'Compounding errors?', back: 'One agent’s mistake feeding the next. Validate between steps.' },
    { id: 'limit', front: 'Sign you’re over capacity?', back: 'Your review becomes a rubber stamp.' },
  ],
};
