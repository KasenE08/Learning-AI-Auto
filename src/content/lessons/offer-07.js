// M08 · L07 · Your positioning statement
export default {
  steps: [
    { tag: 'example', title: 'One sentence that does the work', visualFirst: true,
      visual: { type: 'compare', cols: ['Part', 'Example'], rows: [
        ['I help…', 'home-service companies in East Tennessee'],
        ['…get…', 'every lead and after-hours call answered in under a minute'],
        ['…by…', 'setting up a done-for-you system that replies, qualifies and books for them'],
        ['…without…', 'hiring an answering service or another office person'],
      ] },
      body: ['A [[positioning-statement|positioning statement]] in four parts.'],
      check: {
        type: 'mc', q: 'What does the “without…” part do?',
        options: ['Answers the alternative they’re already considering', 'Makes it longer', 'Mentions technology', 'Adds a guarantee'], answer: 0,
        why: 'Owners compare you to something: hiring, an answering service, doing nothing. “Without” names that and sets you apart.',
      },
      stuck: {
        metaphor: 'A store sign that says who it’s for, what you get, and why it beats the shop next door, readable from the street.',
        worked: ['Who: home-service companies.', 'Outcome: every lead answered fast.', 'How: done-for-you system.', 'Without: hiring or an answering service.'],
      },
    },
    { tag: 'how', title: 'I help [who] get [outcome] by [how] without [pain or alternative]',
      body: [
        'Use it as your intro on calls, your profile headline, and the first line of outreach.',
        'Test it: say it to someone in the niche. If they ask “how?”, it worked. If they ask “what does that mean?”, simplify.',
      ] },
    { tag: 'try', title: 'Your turn: pick the best one',
      check: {
        type: 'mc', q: 'Which positioning statement is strongest?', options: ['“I help small accounting firms collect client tax documents on time by automating reminders and checklists, without chasing anyone by email.”', '“I’m an AI automation expert passionate about innovation.”', '“I help businesses with AI.”', '“I build multi-agent systems using the latest models.”'], answer: 0,
        why: 'Who, outcome, how, without. The others are about you or the technology.',
      } },
    { tag: 'outside', title: 'Write yours (practice)',
      body: ['Use your top-scored niche from lesson 2, even if it’s a guess for now.'],
      outside: {
        id: 'positioning',
        claudeOnly: true,
        title: 'Draft and test your positioning statement',
        goal: 'Write a four-part positioning statement for your test niche and get it critiqued.',
        steps: [
          'Write your statement: I help [who] get [outcome] by [how] without [pain or alternative].',
          'Write two alternative versions with a different outcome or “without”.',
          'Paste all three into a new Claude chat with the grading prompt below.',
        ],
        prompt: 'You are reviewing a beginner AI-automation consultant’s positioning statements for a specific small-business niche. Judge them as a busy owner in that niche would.',
        checklist: [
          'At least one version names a specific type of business (not just “small businesses”).',
          'It states an outcome the owner can picture, in plain words.',
          'The “how” is one short phrase with no jargon (no AI, LLM, agent, API).',
          'The “without” names a real alternative or pain the owner faces.',
          'It is one sentence a person could say out loud in under 15 seconds.',
        ],
      } },
  ],
  quiz: [
    { type: 'order', q: 'Order the four parts.', items: ['I help [who]', 'get [outcome]', 'by [how]', 'without [pain or alternative]'], why: 'Who, outcome, how, without.' },
    { type: 'mc', q: 'Someone in your niche hears your statement and asks “how?”. What does that mean?', options: ['It worked: they’re interested', 'It failed', 'They’re confused', 'They want a discount'], answer: 0, why: '“How?” is curiosity. “What does that mean?” is confusion.' },
    { type: 'mc', q: 'What should a positioning statement avoid?', options: ['Jargon and talking about yourself', 'Naming the customer', 'Naming the outcome', 'Being one sentence'], answer: 0, why: 'It’s about them, in their words.' },
  ],
  cards: [
    { id: 'formula', front: 'Positioning statement formula?', back: 'I help [who] get [outcome] by [how] without [pain or alternative].' },
    { id: 'test', front: 'How to test it?', back: 'Say it to someone in the niche: “how?” = good; “what does that mean?” = simplify.' },
    { id: 'without', front: 'What does “without” do?', back: 'Names the alternative they’re comparing you to.' },
  ],
};
