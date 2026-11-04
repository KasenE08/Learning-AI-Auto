// M03 · L05 · Human approval steps
export default {
  steps: [
    { tag: 'example', title: 'AI drafts, a person decides', visualFirst: true,
      visual: { type: 'flow', play: true, nodes: [
        { label: 'Angry review posted', kind: 'trigger', data: { rating: '1 star', text: 'Cake was dry and late. Never again.' } },
        { label: 'AI: draft a reply', kind: 'ai', data: { draft: 'We’re sorry your cake arrived late and dry. We’d like to make it right: please call us at…' } },
        { label: 'Ask owner to approve (chat buttons)', kind: 'logic', data: { options: ['Approve', 'Edit', 'Reject'], answer: 'Edit' } },
        { label: 'Post the approved reply', kind: 'action', data: { posted: 'Owner’s edited version' } },
      ] },
      body: ['A bakery wants fast replies to bad reviews, but not ones the owner hasn’t seen.'],
      check: {
        type: 'mc', q: 'Why put a person between the draft and the post?',
        options: ['A public reply can’t be taken back, and tone matters', 'The AI can’t post', 'It’s required by every review site', 'To slow things down'], answer: 0,
        why: 'Public, irreversible, reputation-sensitive: the classic case for [[human-in-the-loop|human approval]]. The AI still saves most of the effort.',
      },
      stuck: {
        metaphor: 'A junior writes the letter, the boss signs it. The signature step is quick, and it catches the one letter that would have been a disaster.',
        worked: ['The reply is public and permanent.', 'A bad tone could cost customers.', 'So a person approves before posting.'],
      },
    },
    { tag: 'how', title: 'How approval steps work',
      predict: {"q": "Nobody answers an approval request for two days. What should the safe default be?", "options": ["Remind, escalate, then don’t send", "Send it anyway", "Wait forever", "Delete the draft silently"], "answer": 0, "why": "Set a timeout. For anything risky, the safe default is not sending."},
      body: [
        'The workflow pauses and sends a request to a person (chat buttons, an email link, a task) with the draft and context.',
        'The answer (approve / edit / reject) decides the next path. Edits replace the draft.',
        'Set a **timeout**: if nobody answers in X hours, remind them, escalate, or take the safe default (usually: don’t send).',
      ] },
    { tag: 'try', title: 'Your turn: approve or automate?',
      check: {
        type: 'multi', q: 'Which actions deserve a human approval step?',
        options: ['Refunds over $100', 'Adding a new lead to the CRM', 'A public reply to a complaint', 'Sending a quote with a custom price', 'Logging a row in a sheet'], answer: [0, 2, 3],
        why: 'Money, public words, and custom commitments. Routine, reversible record-keeping doesn’t need a person.',
      } },
    { tag: 'biz', title: 'Approval is a selling point',
      predict: {"q": "After two months the owner approves 97% of drafts unchanged. What can you offer?", "options": ["Automate routine ones; keep approval for risky ones", "Remove the AI", "Add a second approver", "Nothing changes"], "answer": 0, "why": "Track the approval rate. It’s your evidence for reducing friction, and a case-study number."},
      body: [
        'Many owners fear “AI emailing my customers”. Offer approval first; switch to fully automatic once the drafts have proven themselves.',
        'Track how often drafts are approved unchanged. A high approval rate is your evidence for removing the step later (and a case-study number).',
      ] },
  ],
  quiz: [
    { type: 'mc', q: 'What should happen if nobody answers an approval request?', options: ['A timeout: remind, escalate, or take the safe default', 'Send it anyway immediately', 'Wait forever', 'Delete the workflow'], answer: 0, why: 'Plan for silence. The safe default is usually “don’t send”.' },
    { type: 'multi', q: 'Which make an approval step easy to answer?', options: ['The draft and its context in one message', 'One-tap Approve / Edit / Reject', 'A link to log into five apps', 'No context, just “approve?”'], answer: [0, 1], why: 'Make the decision a few seconds of work.' },
    { type: 'mc', scenario: 'After two months, the owner approves 97% of AI review replies unchanged.', q: 'What can you offer next?', options: ['Auto-post routine replies; keep approval for 1–2 star reviews', 'Remove the AI', 'Add a second approver', 'Nothing should change'], answer: 0, why: 'Use the data to reduce friction where the risk is low.' },
  ],
  cards: [
    { id: 'hitl', front: 'Human-in-the-loop?', back: 'The workflow pauses for a person to approve, edit, or reject before continuing.' },
    { id: 'when', front: 'When to require approval?', back: 'Money, public words, custom commitments, anything you can’t undo.' },
    { id: 'timeout', front: 'Approval with no answer?', back: 'Timeout → remind, escalate, or safe default (usually don’t send).' },
    { id: 'rate', front: 'Why track approval rate?', back: 'Evidence for automating more later, and a case-study number.' },
  ],
};
