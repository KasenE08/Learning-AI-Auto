// M07 · L05 · Beyond hours saved
export default {
  steps: [
    { tag: 'example', title: 'Same build, two pitches', visualFirst: true,
      visual: { type: 'compare', cols: ['', 'Pitch A', 'Pitch B'], rows: [
        ['Headline', '“Save 6 hours a month on data entry.”', '“Every after-hours lead gets a reply in under a minute, so fewer go to the next company on Google.”'],
        ['Owner hears', '“Saves my office manager a bit of time.”', '“I stop losing jobs on weekends.”'],
      ], pick: 1 },
      body: ['A Chattanooga roofing company (fake). Same workflow, two ways to describe its value.'],
      check: {
        type: 'mc', q: 'Why does Pitch B usually land better?',
        options: ['It ties to revenue the owner already feels they’re losing', 'It’s longer', 'It mentions AI', 'Hours don’t matter'], answer: 0,
        why: 'Owners care most about money in (jobs won) and risk (things going wrong). Time saved matters, but it’s rarely the biggest number.',
      },
      stuck: {
        metaphor: 'A smoke alarm isn’t sold on saving time spent sniffing for smoke. It’s sold on what it prevents.',
        worked: ['Pitch A: a small internal saving.', 'Pitch B: jobs no longer lost.', 'Revenue the owner already worries about wins.'],
      },
    },
    { tag: 'how', title: 'Five kinds of value',
      visual: {"type": "sort", "cols": ["Time saved", "Speed", "Revenue recovered", "Errors avoided", "Capacity"], "items": [{"text": "No retyping leads", "col": 0}, {"text": "Reply in 1 minute, not 1 day", "col": 1}, {"text": "Failed payments retried", "col": 2}, {"text": "No wrong phone numbers", "col": 3}, {"text": "20% more jobs without hiring", "col": 4}, {"text": "Unanswered quotes followed up and won", "col": 2, "why": "Money that was slipping away and now comes in."}], "prompt": "Which kind of value is each result?"},
      
      body: ["Lead with the value that matters most to this owner, usually money in or risk avoided.", "Support it with the others."] },
    { tag: 'try', title: 'Your turn: name the value',
      check: {
        type: 'mc', scenario: 'A dental clinic’s reminder texts cut no-shows from 12 a month to 5. Each empty slot costs them about $150.',
        q: 'Which value is this, and what’s it worth per month?', options: ['Errors avoided / revenue: 7 × $150 = $1,050', 'Time saved: 7 hours', 'Capacity: 12 patients', 'Speed: 7 minutes'], answer: 0,
        why: 'Seven fewer empty slots × $150. That number will matter more to the owner than the minutes saved sending reminders by hand.',
      } },
    { tag: 'warn', title: 'Don’t overclaim',
      predict: {"q": "Which is safe to promise?", "options": ["“Every lead gets a reply within a minute.”", "“Your sales will rise 50%.”", "“Zero no-shows.”", "“Double revenue in 90 days.”"], "answer": 0, "why": "Promise what you control; report outcomes once you’ve measured them."},
      body: [
        'Speed improves win rates, but you can’t promise a specific lift. Say “faster replies usually win more of these”, then measure after launch.',
        'Promise what you control (response time, reminders sent). Report what you measure (jobs won, no-shows) once you have data.',
      ] },
  ],
  quiz: [
    { type: 'multi', q: 'Which are value types beyond hours saved?', options: ['Speed', 'Revenue recovered', 'Errors avoided', 'Capacity'], answer: [0, 1, 2, 3], why: 'All four often outweigh time saved.' },
    { type: 'num', q: 'Failed payments: $3,000/month go uncollected; a dunning sequence recovers 40%. Monthly value in dollars?', answer: 1200, tol: 0, prefix: '$', why: '$3,000 × 40% = $1,200.' },
    { type: 'mc', q: 'What can you safely promise?', options: ['What you control, like response time', 'A 50% increase in sales', 'Double revenue in 90 days', 'Zero no-shows'], answer: 0, why: 'Promise inputs you control; report outcomes you measure.' },
  ],
  cards: [
    { id: 'five', front: 'Five kinds of value?', back: 'Time saved, speed, revenue recovered, errors avoided, capacity.' },
    { id: 'lead', front: 'Which value to lead with?', back: 'The one this owner feels most, usually revenue or risk.' },
    { id: 'promise', front: 'Promise vs report?', back: 'Promise what you control; report what you measure.' },
  ],
};
