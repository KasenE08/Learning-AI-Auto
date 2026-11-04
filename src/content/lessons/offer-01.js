// M08 · L01 · Generalist vs niche
export default {
  steps: [
    { tag: 'example', title: 'Two consultants, same skills', visualFirst: true,
      visual: { type: 'compare', cols: ['', '“I automate businesses with AI”', '“I help HVAC companies stop losing after-hours leads”'], rows: [
        ['Who remembers you', 'Nobody in particular', 'Every HVAC owner who hears it'],
        ['Referrals', '“Know anyone who needs AI?” (vague)', '“My HVAC buddy has this exact problem”'],
        ['Second client', 'Start from scratch', 'Reuse 80% of the first build'],
        ['Price you can charge', 'Compared with any freelancer', 'Compared with lost jobs'],
      ], pick: 1 },
      body: ['Same person, same skills, two ways to describe the business.'],
      check: {
        type: 'mc', q: 'What’s the biggest practical advantage of the niche version?',
        options: ['Each client makes the next one easier: referrals, reusable builds, sharper pitches', 'It sounds fancier', 'It’s legally required', 'There’s no advantage'], answer: 0,
        why: 'A [[niche]] compounds. Same problems, same tools, same language, and owners in a trade talk to each other.',
      },
      stuck: {
        metaphor: 'A general doctor vs a knee specialist. When your knee hurts, you remember the specialist’s name.',
        worked: ['Generalist: no one feels it’s for them.', 'Niche: a specific owner hears their own problem.', 'Each win makes the next easier.'],
      },
    },
    { tag: 'how', title: 'The trade-off',
      predict: {"q": "A niche has fewer prospects. What usually goes up?", "options": ["Win rate and reuse between clients", "Your costs", "The number of competitors", "Nothing"], "answer": 0, "why": "Smaller pool, higher win rate and more reuse. The table shows the trade."},
      visual: { type: 'compare', cols: ['', 'Generalist', 'Niche'], rows: [
        ['Pool of prospects', 'Huge', 'Smaller'],
        ['Win rate', 'Lower', 'Higher'],
        ['Reuse between clients', 'Low', 'High'],
        ['Risk', 'Spread out', 'Tied to one industry'],
        ['Best when', 'Learning what you like', 'You’ve found a problem you can solve repeatedly'],
      ] },
      body: ['A common path: take a few varied projects, notice which problem and trade fit you, then commit.'] },
    { tag: 'try', title: 'Your turn: tighten it',
      check: {
        type: 'mc', q: 'Which is the sharpest niche statement?', options: ['“I help independent dental clinics fill empty chairs with automated reminders and recall.”', '“I help healthcare with AI.”', '“I build automations.”', '“I help small businesses grow.”'], answer: 0,
        why: 'Who (independent dental clinics), problem (empty chairs), how (reminders and recall). The others could mean anything.',
      } },
    { tag: 'biz', title: 'A niche can be a problem, not just an industry',
      predict: {"q": "Is “speed-to-lead for home-service companies” a niche?", "options": ["Yes: a problem-based niche", "No, niches are industries only", "Only if it’s one city", "Only for big firms"], "answer": 0, "why": "Problem niches cross industries but keep the reuse."},
      body: [
        '“Speed-to-lead for home-service companies” or “document collection for small accounting firms” are niches too.',
        'Problem-based niches cross industries but keep the reuse. Next lesson scores options.',
      ] },
  ],
  quiz: [
    { type: 'multi', q: 'Advantages of a niche?', options: ['Referrals within the trade', 'Reusable builds', 'Sharper pitch', 'Bigger pool of prospects'], answer: [0, 1, 2], why: 'The pool is smaller; the win rate is higher.' },
    { type: 'mc', q: 'Main risk of a niche?', options: ['You’re tied to one industry’s ups and downs', 'Clients won’t understand you', 'It’s illegal', 'You can never change it'], answer: 0, why: 'Concentration risk. You can still change niches later.' },
    { type: 'mc', q: 'Can a niche be a problem instead of an industry?', options: ['Yes, e.g. speed-to-lead for home services', 'No, only industries', 'Only for big companies', 'Only online'], answer: 0, why: 'Problem niches keep the reuse benefit.' },
  ],
  cards: [
    { id: 'niche', front: 'Why niche?', back: 'Compounding: referrals, reusable builds, a sharper pitch, value-based pricing.' },
    { id: 'tradeoff', front: 'Niche trade-off?', back: 'Smaller pool and concentration risk vs higher win rate and reuse.' },
    { id: 'shape', front: 'A sharp niche statement has?', back: 'Who, problem, and how.' },
  ],
};
