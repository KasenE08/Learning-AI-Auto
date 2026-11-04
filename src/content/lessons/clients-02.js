// M09 · L02 · Warm outreach
export default {
  steps: [
    { tag: 'example', title: 'Who do you already know?', visualFirst: true,
      visual: { type: 'compare', cols: ['Person', 'Connection to a business'], rows: [
        ['Your uncle', 'Owns a landscaping company in Murfreesboro'],
        ['A friend’s mom', 'Office manager at a dental practice'],
        ['Your old coach', 'Runs a gym, always complains about no-shows'],
        ['A neighbor', 'Real estate agent on a 4-person team'],
      ] },
      body: ['Before any cold message, list everyone who owns, runs, or works at a small business.'],
      check: {
        type: 'mc', q: 'What’s the best first message to your old coach?',
        options: ['“I’m learning to build systems that cut no-shows. Could I ask you 3 questions about how your gym handles them? Not selling anything.”', '“Want to buy my AI services?”', '“Do you know anyone who needs automation?”', 'Send your price list'], answer: 0,
        why: '[[warm-outreach|Warm outreach]] starts with curiosity and a small ask. Learning their problem first leads naturally to “want me to try fixing it?”',
      },
      stuck: {
        metaphor: 'Asking a friend for advice vs handing them a sales flyer. Advice requests get yeses.',
        worked: ['You know the coach complains about no-shows.', 'Ask to learn about it, briefly, with no pitch.', 'The conversation can lead to a pilot.'],
      },
    },
    { tag: 'how', title: 'The warm-outreach sequence',
      body: [
        '**List** 30+ people with a link to a small business. Include “who do they know?”',
        '**Ask to learn:** 15 minutes about how they handle one specific thing.',
        '**Listen** and map (Module 7). Share one idea if it fits.',
        '**Offer a pilot** if there’s a clear problem (Module 8).',
        '**Ask for an introduction** if not: “Who do you know who deals with this?”',
      ] },
    { tag: 'try', title: 'Your turn: the intro ask',
      check: {
        type: 'mc', q: 'Your neighbor’s team doesn’t need anything right now. Best close to the conversation?', options: ['“Thanks! Do you know another agent or office that struggles with showing requests? I’d love an intro.”', '“OK, bye.”', '“Are you sure you don’t need it?”', '“I’ll check back next week.”'], answer: 0,
        why: 'Warm networks spread through introductions. A specific ask makes it easy to say yes.',
      } },
    { tag: 'warn', title: 'Mixing friends and business',
      body: [
        'Use the same written scope and agreement with friends and family. It protects the relationship.',
        'Discount if you like, but don’t do it free with unlimited scope (Module 8, lesson 6).',
      ] },
  ],
  quiz: [
    { type: 'order', q: 'Order the warm-outreach sequence.', items: ['List people connected to businesses', 'Ask to learn about one problem', 'Listen and map', 'Offer a pilot or ask for an intro'], why: 'Curiosity first, offer later.' },
    { type: 'mc', q: 'Why ask to learn instead of pitching?', options: ['People say yes to advice requests, and you learn the real problem', 'Pitching is illegal', 'It takes longer', 'It’s required'], answer: 0, why: 'Lower pressure, better information.' },
    { type: 'mc', q: 'A friend wants your help. What paperwork?', options: ['Same written scope and agreement as anyone', 'None; it’s a friend', 'Just a handshake', 'Only an invoice'], answer: 0, why: 'Clarity protects friendships.' },
  ],
  cards: [
    { id: 'warm', front: 'Warm outreach?', back: 'Contacting people you already know (or who know you) who are connected to businesses.' },
    { id: 'learn', front: 'First ask?', back: '15 minutes to learn how they handle one specific thing. No pitch.' },
    { id: 'intro', front: 'No fit?', back: 'Ask for a specific introduction.' },
  ],
};
