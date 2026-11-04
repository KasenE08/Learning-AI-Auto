// M09 · L01 · The pipeline: stranger to client
export default {
  steps: [
    { tag: 'example', title: 'Your own sales funnel', visualFirst: true,
      visual: { type: 'calc', inputs: [
        { key: 'reach', label: 'Owners you contact per month', min: 10, max: 300, step: 10, value: 100 },
        { key: 'reply', label: 'Reply rate %', min: 1, max: 40, value: 10, unit: '%' },
        { key: 'call', label: 'Replies that book a call %', min: 10, max: 80, value: 50, unit: '%' },
        { key: 'win', label: 'Calls that become clients %', min: 5, max: 60, value: 20, unit: '%' },
      ], outputs: [
        { label: 'Replies', f: (v) => v.reach * v.reply / 100, fmt: 'num' },
        { label: 'Discovery calls', f: (v) => v.reach * v.reply / 100 * v.call / 100, fmt: 'num' },
        { label: 'New clients per month', f: (v) => v.reach * v.reply / 100 * v.call / 100 * v.win / 100, fmt: 'num', big: true },
      ], caption: 'Example rates only. Track your own; they vary a lot by niche, channel and message.' },
      body: ['Getting clients is a [[sales-pipeline|pipeline]] too: many conversations become a few clients. Drag the sliders.'],
      check: {
        type: 'num', q: 'At the starting values, how many new clients per month?', answer: 1, tol: 0.01,
        hint: '100 × 10% × 50% × 20%', why: '100 → 10 replies → 5 calls → **1 client**. To get more, raise the number at the top or improve any rate.',
      },
      stuck: {
        metaphor: 'Fishing: many casts, some bites, a few fish. You can cast more or use better bait.',
        worked: ['100 × 10% = 10 replies.', '10 × 50% = 5 calls.', '5 × 20% = 1 client.'],
      },
    },
    { tag: 'how', title: 'Stages and what moves people through them',
      visual: {"type": "sort", "cols": ["Reach", "Reply", "Discovery", "Proposal", "Close"], "items": [{"text": "You send a first message to an HVAC owner", "col": 0}, {"text": "She answers: “Sure, what’s this about?”", "col": 1}, {"text": "A 20-minute call about her missed calls", "col": 2}, {"text": "A one-page plan with two prices", "col": 3}, {"text": "Signed agreement + first payment", "col": 4}, {"text": "A friend introduces you to a dentist", "col": 0, "why": "Being introduced is how they first hear of you."}], "prompt": "Which pipeline stage is each moment?"},
      body: ["**Reach** → **reply** → **discovery call** → **proposal** → **close**.", "Each stage has its own conversion rate; fix the weakest one.", "Track every stage in your own CRM (you’ll automate it in Module 12)."] },
    { tag: 'try', title: 'Your turn: find the bottleneck',
      check: {
        type: 'mc', scenario: 'Last month: 150 messages, 20 replies, 12 calls, 0 clients.',
        q: 'Where’s the problem?', options: ['Calls to clients: the discovery or proposal stage', 'Not enough messages', 'Reply rate', 'Nothing; bad luck'], answer: 0,
        why: 'Plenty of calls, no wins. Work on discovery questions, fit, and proposals (lessons 7–11), not on sending more messages.',
      } },
    { tag: 'key', title: 'Consistency beats bursts',
      predict: {"q": "Which outreach habit fills a pipeline better?", "options": ["25 thoughtful messages every week", "200 messages once, then nothing", "One message a month", "Only when you need money"], "answer": 0, "why": "Pipelines take weeks to fill. Steady beats bursts."},
      body: ['A steady weekly habit (say, 25 thoughtful messages and 2 follow-up rounds) beats 200 messages once and then nothing. Pipelines take weeks to fill.'] },
  ],
  quiz: [
    { type: 'order', q: 'Order the stages.', items: ['Reach', 'Reply / interest', 'Discovery call', 'Proposal', 'Close'], why: 'From stranger to client.' },
    { type: 'num', q: '200 contacts, 5% reply, 60% of replies book calls, 25% of calls close. Clients?', answer: 1.5, tol: 0.01, why: '200 × 0.05 × 0.6 × 0.25 = 1.5.' },
    { type: 'mc', scenario: '200 messages, 2 replies.', q: 'What should you fix first?', options: ['The message and targeting (reply rate)', 'Your proposal template', 'Your pricing', 'Send 2,000 messages'], answer: 0, why: 'Fix the stage that’s broken.' },
  ],
  cards: [
    { id: 'stages', front: 'Sales pipeline stages?', back: 'Reach → reply → discovery call → proposal → close.' },
    { id: 'bottleneck', front: 'How to improve the pipeline?', back: 'Find the stage with the worst rate and fix that one.' },
    { id: 'steady', front: 'Bursts or consistency?', back: 'A steady weekly habit.' },
  ],
};
