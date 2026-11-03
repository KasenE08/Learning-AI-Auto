// M02 · L01 · What an LLM actually does
export default {
  steps: [
    { tag: 'example', title: 'Finish the sentence', visualFirst: true,
      visual: { type: 'compare', cols: ['Text so far', 'Likely next words'], rows: [
        ['“Thanks for booking with Bright Smile. Your appointment is on…”', 'a day and time'],
        ['“Dear Mr. Holt, we received your”', 'request / payment / message'],
        ['“Category of this email (urgent or routine):”', 'urgent / routine'],
      ] },
      body: ['You can guess what comes next in each line without being told any rules. So can an AI model.'],
      check: {
        type: 'mc', q: 'At its core, what is a language model doing when it “answers”?',
        options: ['Predicting the most likely next piece of text, over and over', 'Looking the answer up in a database of facts', 'Running a search engine', 'Copying a stored answer written by a human'], answer: 0,
        why: 'An [[llm]] writes one small piece of text at a time, each time picking what is likely to come next given everything before it.',
        wrong: { 1: 'It has no fact database. It learned patterns from huge amounts of text, which is why it can sound right while being wrong.' },
      },
      stuck: {
        metaphor: 'Your phone’s keyboard suggests the next word. An LLM is that idea scaled up enormously: trained on vast amounts of text, predicting whole answers one piece at a time.',
        worked: ['Look at the lines above: you predicted endings from patterns.', 'An LLM does the same thing, piece by piece.', 'So it predicts likely text; it doesn’t look facts up.'],
      },
    },
    { tag: 'how', title: 'Tokens, context, and no memory',
      body: [
        'Models read and write in [[token|tokens]]: chunks of text, roughly ¾ of an English word each on average.',
        'The [[context-window]] is how much text the model can consider at once: your instructions, the data, and its answer. Different models have different limits.',
        'Each call starts fresh. The model only knows what you send **in that call** plus what it learned in training. Chat apps feel like they remember because they resend the conversation each time.',
      ] },
    { tag: 'see', title: 'Good at, bad at',
      visual: { type: 'compare', cols: ['', 'Strong', 'Weak'], rows: [
        ['Language', 'Reading messy text, rewriting, summarizing, drafting', 'Guaranteeing exact wording every time'],
        ['Sorting', 'Classifying intent, urgency, sentiment', 'Rules with hard edges (use a filter instead)'],
        ['Facts', 'Facts **you put in the prompt**', 'Facts it has to recall (it can make them up)'],
        ['Math', 'Explaining a calculation', 'Doing exact arithmetic reliably (use a formatter or sheet)'],
      ] },
      body: ['In automation, use the model for the fuzzy language parts and ordinary steps for the exact parts.'] },
    { tag: 'try', title: 'Your turn: AI or ordinary step?',
      check: {
        type: 'multi', q: 'Which jobs are a good fit for an AI step?',
        options: ['Decide if a customer email is a complaint', 'Add 8% tax to an invoice total', 'Pull the address out of a rambling email', 'Check if a field is empty', 'Draft a friendly reply'], answer: [0, 2, 4],
        why: 'Judging tone, pulling facts from messy text, and drafting are language jobs. Tax math and empty checks are exact rules; use ordinary steps.',
      } },
    { tag: 'key', title: 'The mental model to keep',
      body: [
        'Every AI step is: **instructions + data in → predicted text out.**',
        'Better instructions and better data in = better text out. That is most of this module.',
        'The output is a guess, usually a very good one. Your workflow must handle the times it isn’t (Module 6).',
      ] },
  ],
  quiz: [
    { type: 'mc', q: 'Roughly how much of an English word is a token, on average?', options: ['About ¾ of a word', 'Exactly one word', 'One letter', 'A whole sentence'], answer: 0, why: 'Tokens are chunks; common words are one token, long or rare words are several.' },
    { type: 'mc', scenario: 'A client asks: “Can the AI remember what each customer said last month?”', q: 'What’s the accurate answer?',
      options: ['Only if the workflow looks it up and includes it in the prompt', 'Yes, models remember every conversation', 'No, it’s impossible', 'Only on paid plans'], answer: 0,
      why: 'Each call starts fresh. Memory is something you build: store history (CRM, notes) and send the relevant part with each call.' },
    { type: 'multi', q: 'Which should be ordinary (non-AI) steps?', options: ['Summing order totals', 'Checking if an email field is valid', 'Summarizing a long complaint', 'Comparing a date to today'], answer: [0, 1, 3],
      why: 'Exact math and rule checks belong to ordinary steps. Summarizing is a language job.' },
    { type: 'mc', q: 'What is the context window?', options: ['How much text the model can consider in one call', 'The chat app’s screen', 'How long the model has been trained', 'A security setting'], answer: 0, why: 'It caps instructions + data + answer for a single call.' },
  ],
  cards: [
    { id: 'predict', front: 'What does an LLM do, at its core?', back: 'Predicts likely next text, one token at a time, from patterns it learned.' },
    { id: 'token', front: 'Token?', back: 'A chunk of text the model reads and writes; roughly ¾ of an English word on average.' },
    { id: 'memory', front: 'Does a model remember past calls?', back: 'No. Each call starts fresh; you send whatever history it needs.' },
    { id: 'split', front: 'AI step vs ordinary step?', back: 'AI for fuzzy language jobs; ordinary steps for exact rules and math.' },
  ],
};
