// M02 · L02 · Prompt anatomy
export default {
  steps: [
    { tag: 'example', title: 'Two prompts, same email', visualFirst: true,
      visual: { type: 'compare', cols: ['', 'Prompt A', 'Prompt B'], rows: [
        ['Prompt', '“Reply to this email.”', '“You answer emails for Rivera Plumbing. Write a reply under 80 words. Confirm we got the request, give our emergency number 555-310-0001 if water is leaking, never quote prices. Email: …”'],
        ['Reply', 'Long, generic, offers a discount Rivera never approved', 'Short, on-brand, gives the right number, no prices'],
      ], pick: 1 },
      body: ['Same model, same email. Only the instructions changed.'],
      check: {
        type: 'mc', q: 'Why did Prompt A promise a discount?',
        options: ['Nothing told it not to, so it filled the gap with a plausible guess', 'The model is broken', 'The email asked for one', 'Discounts are always offered'], answer: 0,
        why: 'Whatever you leave out, the model fills with something plausible. Good prompts close the gaps that matter.',
      },
      stuck: {
        metaphor: 'Briefing a new temp on day one. Say only “handle the emails” and they’ll improvise. Tell them who you are, what to do, what never to do, and what a good reply looks like, and they’ll get it right.',
        worked: ['Prompt A gave no rules about prices.', 'The model predicted a typical customer-service reply, which often includes offers.', 'Prompt B said “never quote prices”, closing that gap.'],
      },
    },
    { tag: 'how', title: 'Five parts of a solid prompt',
      visual: {"type": "sort", "cols": ["Role", "Task", "Context", "Rules", "Output format"], "items": [{"text": "“You answer emails for Rivera Plumbing.”", "col": 0}, {"text": "“Write a reply to this email.”", "col": 1}, {"text": "“Our emergency line is 555-310-0001.”", "col": 2}, {"text": "“Never quote prices.”", "col": 3}, {"text": "“Return only the reply text, under 80 words.”", "col": 4}, {"text": "“Business hours: Mon–Fri 8–5.”", "col": 2, "why": "A fact the model needs is context."}], "prompt": "Sort each line of a prompt into its part."},
      body: ["**Role** and **task:** who it’s working as and the one job.", "**Context:** facts it needs. Facts in the prompt beat facts it has to remember.", "**Rules** (limits, must-nots) and **output format** (exactly what to return)."] },
    { tag: 'try', title: 'Your turn: find the missing part',
      body: ['Prompt: **“You are the assistant for Ironside Fitness. Summarize this lead for the sales team. Lead: [lead data]”**'],
      check: {
        type: 'mc', q: 'What’s most clearly missing?', options: ['Output format (how long, what to include)', 'Role', 'Task', 'The lead data'], answer: 0,
        why: 'Role, task and data are there. Without a format, one summary is a paragraph and the next is five bullets. Say e.g. “One line: name, goal, best time to call.”',
      } },
    { tag: 'see', title: 'System prompt vs the message',
      predict: {"q": "Where do standing rules like “never quote prices” belong?", "options": ["The system prompt, the same every run", "The message, retyped each run", "A separate workflow", "Nowhere"], "answer": 0, "why": "The system prompt holds standing instructions; the message holds this run’s data."},
      body: [
        'Many AI steps have two boxes. The [[system-prompt]] holds standing instructions (role, rules, format). The **message** holds this run’s data.',
        'Keep rules in the system prompt and map the record into the message. Same instructions every run; only the data changes.',
        'Mark where data starts and ends (“Email: <<< … >>>”). It helps the model tell your instructions from the customer’s words (lesson 9 shows why).',
      ] },
    { tag: 'warn', title: 'Prompts are tested, not written once',
      predict: {"q": "You fix a prompt so one bad output is now right. What next?", "options": ["Re-run all your examples", "Ship it", "Test only that one case again", "Delete the other examples"], "answer": 0, "why": "A fix for one case can break another. Re-run the whole set."},
      body: [
        'Run a prompt on 10–20 real-looking examples, including the weird ones, before trusting it.',
        'When one output is wrong, add a rule or an example that fixes it, then re-run **all** examples. A fix for one case can break another.',
      ] },
  ],
  quiz: [
    { type: 'order', q: 'Put a prompt’s parts in a sensible order.', items: ['Role', 'Task', 'Context', 'Rules', 'Output format'], why: 'Who you are, what to do, what you need to know, what not to do, what to hand back.' },
    { type: 'mc', q: 'Where do standing rules belong in a two-box AI step?', options: ['The system prompt', 'The message, retyped each run', 'A separate workflow', 'Nowhere; models know the rules'], answer: 0, why: 'Standing instructions go in the system prompt; per-run data goes in the message.' },
    { type: 'mc', scenario: 'An AI reply step sometimes writes 300 words and sometimes 30.', q: 'What’s the best first fix?', options: ['Add an output rule: “under 80 words, 2 short paragraphs”', 'Switch AI providers', 'Delete the AI step', 'Ask customers to write shorter emails'], answer: 0,
      why: 'Inconsistent output usually means the format wasn’t specified. Say exactly what you want.' },
    { type: 'multi', q: 'Which belong in the **context** part?', options: ['Business hours', 'The customer’s past orders', '“Never mention competitors”', 'The price list it may quote'], answer: [0, 1, 3],
      why: 'Context = facts it needs. “Never mention competitors” is a rule.' },
  ],
  cards: [
    { id: 'parts', front: 'Five parts of a solid prompt?', back: 'Role, task, context, rules, output format.' },
    { id: 'gaps', front: 'What happens to things a prompt leaves out?', back: 'The model fills them with something plausible, which may be wrong for the client.' },
    { id: 'system', front: 'System prompt vs message?', back: 'System prompt = standing instructions. Message = this run’s data.' },
    { id: 'test', front: 'How do you know a prompt works?', back: 'Run it on 10–20 realistic examples, including weird ones, and re-run all after each change.' },
  ],
};
