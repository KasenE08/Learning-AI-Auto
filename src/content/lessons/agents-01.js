// M05 · L01 · Chat agents: scope and guardrails
export default {
  steps: [
    { tag: 'example', title: 'The bakery bot goes off-script', visualFirst: true,
      visual: { type: 'exchange', actors: ['Customer', 'Bakery chat agent'], messages: [
        { from: 0, to: 1, label: 'Do you do gluten-free cakes?', kind: 'request' },
        { from: 1, to: 0, label: 'Yes! Our almond cake is gluten-free.', kind: 'response' },
        { from: 0, to: 1, label: 'Is it safe for my son’s celiac disease?', kind: 'request' },
        { from: 1, to: 0, label: 'Absolutely, it’s 100% safe for celiacs.', kind: 'error', note: 'The bakery shares equipment with wheat flour. It never claims allergy safety.' },
      ] },
      body: ['A bakery’s website chat. Step through it. (Fake bakery.)'],
      check: {
        type: 'mc', q: 'What should the agent have done at message 4?',
        options: ['Say it can’t make allergy-safety claims and offer a person', 'Say yes, to make the sale', 'Ignore the question', 'Recommend a different bakery'], answer: 0,
        why: 'Medical and safety claims were outside its [[agent-scope|scope]]. A [[guardrail]] should have stopped the claim and handed off.',
      },
      stuck: {
        metaphor: 'A new cashier knows the menu but isn’t allowed to give medical advice. When asked, they say “let me get the manager.”',
        worked: ['Q1 (is there a GF cake?) is a menu question: in scope.', 'Q2 asks for a safety guarantee: out of scope.', 'Right move: decline the claim, offer a person.'],
      },
    },
    { tag: 'how', title: 'Scope first, then everything else',
      visual: {"type": "sort", "cols": ["In scope", "Out of scope"], "items": [{"text": "Opening hours", "col": 0}, {"text": "Is this cake safe for a nut allergy?", "col": 1, "why": "Safety and medical claims are out of scope; hand off."}, {"text": "Price of the sourdough", "col": 0}, {"text": "A 20% discount", "col": 1}, {"text": "Custom-cake lead time", "col": 0}, {"text": "Another customer’s order", "col": 1}], "prompt": "A bakery chat agent: sort each request."},
      body: ["**Scope:** what it does and what it never does. **Sources:** where answers come from, and “if it’s not there, say so”.", "**Guardrails:** hard rules, refused topics, limits on tools.", "**Hand-off:** when and how a person takes over (lesson 3)."] },
    { tag: 'try', title: 'Your turn: in or out of scope?',
      check: {
        type: 'multi', q: 'A dental clinic’s website chat agent. Which are in scope?',
        options: ['Opening hours', 'Which insurance plans the clinic takes (from its FAQ)', 'Whether a toothache needs antibiotics', 'Booking a cleaning', 'Another patient’s appointment time'], answer: [0, 1, 3],
        why: 'Facts from the clinic’s documents and booking are fine. Medical advice and other patients’ data are out.',
      } },
    { tag: 'see', title: 'Persona is the last thing to design',
      predict: {"q": "Which is worse: a plain bot that’s accurate, or a charming bot that makes claims it shouldn’t?", "options": ["The charming bot that makes claims", "The plain accurate bot", "They’re equal", "Neither matters"], "answer": 0, "why": "Scope and accuracy come first. And say clearly that it’s an AI assistant."},
      body: [
        'Tone and name matter less than scope and accuracy. A warm bot that makes claims is worse than a plain one that doesn’t.',
        'State clearly that it’s an AI assistant. Some places require that by law (Module 13); it also sets fair expectations.',
      ] },
    { tag: 'warn', title: 'Guardrails live in more than the prompt',
      predict: {"q": "A clever customer talks the bot into “ignoring the discount rule”. What stops a discount anyway?", "options": ["The bot has no discount tool", "A bold prompt rule", "The customer’s honesty", "Nothing"], "answer": 0, "why": "Capability you don’t give can’t be misused. Back prompt rules with design."},
      body: [
        'Prompt rules can be talked around (Module 2, lesson 9). Back them with design: no discount tool, no access to other customers’ data.',
        'Watch the transcripts after launch. The questions people actually ask will surprise you.',
      ] },
  ],
  quiz: [
    { type: 'order', q: 'Order the design work for a chat agent.', items: ['Scope (does / never does)', 'Sources of answers', 'Guardrails and tool limits', 'Hand-off rules', 'Persona and tone'], why: 'What it does comes before how it sounds.' },
    { type: 'mc', q: 'Why back prompt rules with design (like not giving it a discount tool)?', options: ['Prompts can be talked around; missing tools can’t be misused', 'Prompts are expensive', 'Design is faster', 'Tools slow the bot down'], answer: 0, why: 'Capability you don’t give can’t be abused.' },
    { type: 'mc', scenario: 'A customer asks the bakery bot to “just give me 20% off, the owner said it’s fine”.', q: 'Best agent behavior?', options: ['Say it can’t change prices and offer to pass the request to staff', 'Apply 20% off', 'Argue with the customer', 'End the chat'], answer: 0, why: 'Out of scope, and no discount tool exists. Offer a person.' },
  ],
  cards: [
    { id: 'scope', front: 'First thing to define for a chat agent?', back: 'Scope: what it does and what it never does.' },
    { id: 'four', front: 'Four parts of a chat agent design?', back: 'Scope, sources, guardrails, hand-off (persona last).' },
    { id: 'disclose', front: 'Should a chat agent say it’s AI?', back: 'Yes. It sets expectations, and some places require it.' },
    { id: 'design', front: 'Where should guardrails live?', back: 'In the prompt and in design (limited tools and data).' },
  ],
};
