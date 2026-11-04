// M13 · L01 · Contract clauses that matter
export default {
  steps: [
    { tag: 'example', title: 'Where the argument starts', visualFirst: true,
      visual: { type: 'compare', cols: ['Dispute (fake)', 'The clause that would have settled it'], rows: [
        ['“I thought the voice agent was included.”', 'Scope (included / not included)'],
        ['“Why do I owe you for the second half?”', 'Payment terms and milestones'],
        ['“You built it, but I own it, right? Can you reuse it for my competitor?”', 'Intellectual property'],
        ['“The texting provider went down, so you owe me a refund.”', 'Third-party services + limitation of liability'],
        ['“We want to cancel tomorrow.”', 'Term and termination'],
      ] },
      body: ['Almost every client dispute traces back to something the agreement didn’t say clearly. (Concepts only. Not legal advice.)'],
      check: {
        type: 'mc', q: 'What’s the best protection against these disputes?',
        options: ['A clear written agreement covering these topics, reviewed once by a lawyer', 'A handshake', 'Being nice', 'Avoiding clients'], answer: 0,
        why: 'A [[service-agreement]] turns future arguments into “let’s check what we agreed”. Have a Tennessee lawyer review your template once; reuse it.',
      },
      stuck: {
        metaphor: 'A rental lease: nobody reads it until the dishwasher breaks. Then it’s the only thing that matters.',
        worked: ['Each dispute maps to a clause.', 'Missing clause = argument.', 'Clear clause = quick answer.'],
      },
    },
    { tag: 'how', title: 'Clauses to understand',
      visual: {"type": "sort", "cols": ["Scope / changes", "Payment", "IP", "Third-party services", "Liability cap"], "items": [{"text": "“The voice agent is not included.”", "col": 0}, {"text": "“50% on signing, 50% at launch.”", "col": 1}, {"text": "“Client owns its configured system; consultant keeps general templates.”", "col": 2}, {"text": "“Consultant isn’t responsible for outages of tools it doesn’t control.”", "col": 3}, {"text": "“Total liability is limited to fees paid in the last 3 months.”", "col": 4}, {"text": "“New workflows are quoted separately.”", "col": 0, "why": "How changes are handled is part of scope."}], "prompt": "Which clause is each sentence from?"},
      body: ["**Scope and changes**, **payment**, and **IP** (who owns what).", "**Confidentiality/data**, **third-party services**, and **warranties + liability cap**.", "**Term, termination, handover**, and **governing law** (e.g. Tennessee)."] },
    { tag: 'try', title: 'Your turn: match the clause',
      check: {
        type: 'mc', q: 'A client wants to use your general lead-response template for their sister company without paying. Which clause decides it?', options: ['Intellectual property / license', 'Payment terms', 'Confidentiality', 'Governing law'], answer: 0,
        why: 'Who owns what, and what each side may reuse, is the IP clause.',
      } },
    { tag: 'warn', title: 'Templates need a real lawyer once',
      predict: {"q": "What’s a smart use of some of your first profits?", "options": ["A Tennessee lawyer reviewing your agreement template once", "A fancier logo", "More tools", "Nothing legal"], "answer": 0, "why": "This module explains clauses so you can discuss them. It isn’t legal advice."},
      body: [
        'This module teaches what the clauses are for so you can talk about them sensibly. It isn’t legal advice.',
        'Pay a Tennessee business lawyer to review your agreement template once. That’s a good use of your first profits.',
      ] },
  ],
  quiz: [
    { type: 'multi', q: 'Key clauses in a service agreement?', options: ['Scope and change requests', 'Payment', 'IP ownership', 'Limitation of liability', 'Your favorite tools'], answer: [0, 1, 2, 3], why: 'Tools aren’t a clause.' },
    { type: 'mc', q: 'Third-party services clause covers…', options: ['Outages and changes in tools you don’t control', 'Your employees', 'The client’s taxes', 'Marketing'], answer: 0, why: 'You can’t promise another company’s uptime.' },
    { type: 'mc', q: 'Limitation of liability does what?', options: ['Caps what you owe if something goes wrong', 'Removes all responsibility', 'Guarantees results', 'Sets the price'], answer: 0, why: 'A cap, often tied to fees paid.' },
  ],
  cards: [
    { id: 'clauses', front: 'Core clauses?', back: 'Scope/changes, payment, IP, confidentiality/data, third-party services, warranties/liability cap, term/termination, governing law.' },
    { id: 'ip', front: 'Common IP split?', back: 'Client owns their configured system; you keep general templates and know-how.' },
    { id: 'lawyer', front: 'Agreement template?', back: 'Have a Tennessee lawyer review it once; reuse it.' },
  ],
};
