// M11 · L05 · Launch and training
export default {
  steps: [
    { tag: 'example', title: 'Launch day plan', visualFirst: true,
      visual: { type: 'flow', nodes: [
        { label: 'Tuesday 9 am (not Friday 5 pm)', kind: 'trigger', sub: 'A quiet, watched time' },
        { label: 'Soft launch: real leads, team watches each one', kind: 'action' },
        { label: '20-minute training with Brenda + techs', kind: 'action', sub: 'What they’ll see, what to do' },
        { label: 'Watch the first 10 real runs', kind: 'logic' },
        { label: 'Day 7 check-in: tweaks + first numbers', kind: 'action' },
      ] },
      body: ['Smoky Ridge goes live (fake).'],
      check: {
        type: 'mc', q: 'Why launch on a Tuesday morning?',
        options: ['Everyone is around to watch and fix issues quickly', 'Tuesdays are lucky', 'Clients prefer Tuesdays', 'It doesn’t matter'], answer: 0,
        why: 'Launch when you and the client can watch the first real runs. Friday-evening launches meet their first problem with nobody around (Module 6).',
      },
      stuck: {
        metaphor: 'Opening a new restaurant on a quiet weeknight before the big weekend, so the kitchen can find its rhythm.',
        worked: ['First real runs reveal surprises.', 'You need people around to respond.', 'So launch at a quiet, watched time.'],
      },
    },
    { tag: 'how', title: 'Launch checklist',
      body: [
        'Test set passes; alerts and fallbacks tested by breaking things on purpose.',
        'Client guide ready; runbook done.',
        '**Soft launch:** real data, closely watched, with an easy way to pause.',
        '**Train the users** (short, practical): what changes for them, what to do when they see X.',
        'Book the 1-week check-in and the first results report before you leave.',
      ] },
    { tag: 'try', title: 'Your turn: training focus',
      check: {
        type: 'mc', q: 'What should a 20-minute training focus on?', options: ['What changes for them day to day and what to do when something looks off', 'How the AI model works', 'Every setting in the builder', 'Your other clients'], answer: 0,
        why: 'Users need their new routine and the exceptions, not the internals.',
      } },
    { tag: 'warn', title: 'Staff worries',
      body: ['People fear being replaced. Show how the system removes their busywork and keeps them in charge of the judgment calls. Brenda as the hero of the launch beats Brenda as a skeptic.'] },
  ],
  quiz: [
    { type: 'mc', q: 'Best launch time?', options: ['A quiet, watched weekday morning', 'Friday at 5 pm', 'Midnight', 'During your vacation'], answer: 0, why: 'Be around for the first runs.' },
    { type: 'mc', q: 'Soft launch means…', options: ['Real data, closely watched, easy to pause', 'Test data only', 'Launching quietly without telling the client', 'Launching half the steps'], answer: 0, why: 'Real but supervised.' },
    { type: 'multi', q: 'Before leaving launch day, book…', options: ['The 1-week check-in', 'The first results report date', 'Your next vacation', 'A referral request'], answer: [0, 1], why: 'Referrals come after a visible win.' },
  ],
  cards: [
    { id: 'when', front: 'When to launch?', back: 'A quiet, watched weekday morning. Never Friday evening.' },
    { id: 'soft', front: 'Soft launch?', back: 'Real data, closely watched, easy to pause.' },
    { id: 'train', front: 'Training focus?', back: 'What changes day to day and what to do when something looks off.' },
  ],
};
