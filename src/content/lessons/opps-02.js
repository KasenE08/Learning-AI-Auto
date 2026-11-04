// M07 · L02 · Process mapping
export default {
  steps: [
    { tag: 'example', title: '“Walk me through the last one”', visualFirst: true,
      visual: { type: 'compare', cols: ['You ask', 'What you learn'], rows: [
        ['“How do you handle new leads?”', '“We call them back quickly.” (the ideal)'],
        ['“Walk me through the last lead you got. What happened first?”', '“It came in Saturday, I saw it Monday, called Tuesday, they’d already booked someone else.” (reality)'],
      ], pick: 1 },
      body: ['Two ways to ask the owner of Smoky Ridge Heating & Air about leads.'],
      check: {
        type: 'mc', q: 'Why is the second question better?',
        options: ['A real, recent case shows what actually happens, delays included', 'It’s more polite', 'It’s shorter', 'Owners prefer stories'], answer: 0,
        why: 'General questions get the ideal process. A specific recent case gets the real one, with the delay that’s costing them jobs.',
      },
      stuck: {
        metaphor: 'Ask someone “do you eat healthy?” and they’ll say yes. Ask “what did you eat yesterday?” and you get the truth.',
        worked: ['Q1 invited the official answer.', 'Q2 asked for one real case, step by step.', 'The real case revealed a 3-day delay.'],
      },
    },
    { tag: 'how', title: 'The mapping interview',
      body: [
        'Pick **one** process. Ask for the last real example, then “what happened next?” until it’s done.',
        'For each step note: who, which tool, how long, what goes wrong (Module 3, lesson 1).',
        'Ask about exceptions: “what happens when…?” (no answer, wrong info, weekend, the owner’s away).',
        'Ask about volume: “how many of these a week? A busy week?”',
        'Read the map back. Owners correct it, and they feel heard, which helps later.',
      ] },
    { tag: 'try', title: 'Your turn: the next question',
      body: ['Owner: “When a lead comes in, my office manager puts it in the job system.”'],
      check: {
        type: 'mc', q: 'Best next question?', options: ['“How long after it comes in does that usually happen?”', '“Great, what software do you use?”', '“Have you thought about AI?”', '“That sounds efficient.”'], answer: 0,
        why: 'Time and delay are where the value hides. Software names can wait; pitching AI now ends the discovery too early.',
      } },
    { tag: 'see', title: 'The output: a one-page map',
      visual: { type: 'flow', nodes: [
        { label: 'Lead arrives (web form, any time)', kind: 'trigger', sub: '~15/day; weekends too' },
        { label: 'Office manager sees it', kind: 'logic', sub: 'Mon–Fri 8–5 only → up to 60 h wait' },
        { label: 'Retype into job system', kind: 'action', sub: '4 min; typos in phone numbers' },
        { label: 'Call back', kind: 'action', sub: 'Often next day; many already booked elsewhere' },
      ] },
      body: ['Annotated with volume, time, and problems. This page is the start of your proposal.'] },
  ],
  quiz: [
    { type: 'mc', q: 'Best opening question in a mapping interview?', options: ['“Walk me through the last time this happened.”', '“What’s your process?”', '“Do you want AI?”', '“What software do you use?”'], answer: 0, why: 'A real recent case beats a description of the ideal.' },
    { type: 'multi', q: 'What should you ask about besides the normal path?', options: ['Exceptions (weekends, missing info)', 'Volume in normal and busy weeks', 'What goes wrong', 'Their favorite apps'], answer: [0, 1, 2], why: 'The exceptions and volume decide the design and the value.' },
    { type: 'mc', q: 'Why read the map back to the owner?', options: ['They correct mistakes and feel heard', 'It wastes time', 'It’s required', 'To show off'], answer: 0, why: 'Accuracy and trust, both useful at proposal time.' },
  ],
  cards: [
    { id: 'last', front: 'Best mapping question?', back: '“Walk me through the last one. What happened first? Then?”' },
    { id: 'notes', front: 'Note per step?', back: 'Who, tool, time, what goes wrong.' },
    { id: 'exceptions', front: 'Always ask about?', back: 'Exceptions (weekends, missing info, owner away) and volume.' },
  ],
};
