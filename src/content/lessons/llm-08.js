// M02 · L08 · RAG: answers from their documents
export default {
  steps: [
    { tag: 'example', title: '“Do you take my insurance?”', visualFirst: true,
      visual: { type: 'compare', cols: ['', 'Model alone', 'Model + clinic documents'], rows: [
        ['Answer', '“Most dental offices accept major insurance plans. Please check with us.”', '“Yes, we’re in-network with Delta Dental PPO and Cigna. We don’t take Medicaid. (Source: Insurance FAQ, updated May)”'],
        ['Correct for this clinic?', 'Vague at best', 'Yes, with a source'],
      ], pick: 1 },
      body: ['A dental clinic’s website chat. Same model, two setups. (Fake clinic, fake policy.)'],
      check: {
        type: 'mc', q: 'Where did the specific answer come from?',
        options: ['A passage from the clinic’s FAQ, found and put into the prompt', 'The model’s training', 'A guess', 'The patient’s message'], answer: 0,
        why: 'The system looked up the relevant part of the clinic’s documents and gave it to the model with the question. That’s [[rag|RAG]].',
      },
      stuck: {
        metaphor: 'An open-book exam. The model is a smart student; RAG hands it the right page of the textbook before it answers.',
        worked: ['The model alone doesn’t know this clinic’s policy.', 'The second setup found the Insurance FAQ passage.', 'It answered from that passage and cited it.'],
      },
    },
    { tag: 'how', title: 'Retrieve, then generate',
      visual: { type: 'flow', nodes: [
        { label: 'Setup: split documents into chunks', kind: 'logic', sub: 'FAQ, price list, policies → small passages' },
        { label: 'Setup: index each chunk by meaning', kind: 'ai', sub: 'An embedding: a “meaning fingerprint”' },
        { label: 'Question arrives', kind: 'trigger' },
        { label: 'Find the most similar chunks', kind: 'logic', data: { top_chunks: ['Insurance FAQ §2', 'Insurance FAQ §3'] } },
        { label: 'Prompt: question + chunks + “answer only from these”', kind: 'ai' },
      ] },
      body: [
        'RAG = **r**etrieval-**a**ugmented **g**eneration: look up relevant passages, then generate the answer from them.',
        'Documents are split into [[chunk|chunks]]. Each gets an [[embedding]] so the system can find passages by meaning, not just exact words.',
        'Many no-code tools and chat products do this for you when you upload “knowledge” files.',
      ] },
    { tag: 'try', title: 'Your turn: why did it miss?',
      body: ['A patient asks “Do you see kids?” The bot says “I don’t have that information.” The clinic’s FAQ does say they treat children from age 3, on page 4 of a 30-page PDF.'],
      check: {
        type: 'mc', q: 'What’s the most likely cause?', options: ['Retrieval didn’t surface that passage (wording or chunking)', 'The model refuses questions about kids', 'RAG only works on short documents', 'The patient asked the wrong way'], answer: 0,
        why: 'If the right chunk isn’t retrieved, the model can’t use it. Fixes: clearer documents (one topic per heading, use the words patients use), better chunking, or testing common questions.',
      } },
    { tag: 'biz', title: 'Most RAG problems are document problems',
      predict: {"q": "A bot quotes last year’s prices. Most likely cause?", "options": ["The old price list is still in its documents", "The model is too small", "Customers asked wrong", "RAG is broken"], "answer": 0, "why": "Outdated or contradictory documents give outdated answers. Cleaning up knowledge is part of the job."},
      body: [
        'Outdated, contradictory, or scattered documents give outdated, contradictory answers.',
        'A big part of a RAG project is cleaning up the client’s knowledge: one current FAQ, clear headings, dated policies.',
        'Write a list of the 30 questions customers really ask, and test every one before launch.',
      ] },
    { tag: 'warn', title: 'Rules for trustworthy answers',
      predict: {"q": "The documents don’t cover a question. What should the bot do?", "options": ["Say so and offer a person", "Guess from general knowledge", "Make up a policy", "End the chat"], "answer": 0, "why": "“Answer only from the passages; otherwise say so” is how you avoid confident wrong answers."},
      body: [
        'Instruct: “Answer only from the provided passages. If they don’t cover it, say so and offer a person.”',
        'Show sources where possible, so staff can check answers.',
        'Keep private documents out of public bots. If a passage can be retrieved, it can be quoted.',
      ] },
  ],
  quiz: [
    { type: 'mc', q: 'What does RAG stand for?', options: ['Retrieval-augmented generation', 'Random answer generation', 'Rapid AI growth', 'Rule-applied grammar'], answer: 0, why: 'Retrieve relevant passages, then generate the answer from them.' },
    { type: 'order', q: 'Order a RAG answer at run time.', items: ['Question arrives', 'Find the most similar chunks', 'Put question + chunks in the prompt', 'Model answers from the chunks'], why: 'Retrieve first, then generate.' },
    { type: 'mc', scenario: 'A bot quotes last year’s prices. The new price list was uploaded, but the old one is still in the knowledge base.', q: 'What’s the fix?', options: ['Remove or clearly date the old price list', 'Use a bigger model', 'Tell customers to ignore old prices', 'Turn off RAG'], answer: 0,
      why: 'Contradictory documents → contradictory answers. Clean the knowledge base.' },
    { type: 'multi', q: 'Which make RAG answers more trustworthy?', options: ['“Answer only from the passages; otherwise say so”', 'Showing the source', 'Testing the 30 most common questions', 'Letting it fill gaps from general knowledge'], answer: [0, 1, 2], why: 'Filling gaps from general knowledge is how wrong, confident answers happen.' },
  ],
  cards: [
    { id: 'rag', front: 'RAG?', back: 'Retrieve relevant passages from the client’s documents, then have the model answer from them.' },
    { id: 'chunk', front: 'Why split documents into chunks?', back: 'So the system can fetch just the relevant passages into the prompt.' },
    { id: 'embedding', front: 'Embedding?', back: 'A “meaning fingerprint” of text that lets you find passages by meaning, not exact words.' },
    { id: 'docs', front: 'Most common cause of bad RAG answers?', back: 'The documents: outdated, contradictory, or the right passage isn’t retrieved.' },
  ],
};
