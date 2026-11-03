// M02 · L10 · Cost, speed, and model size
export default {
  steps: [
    { tag: 'example', title: 'What does one AI step cost a month?', visualFirst: true,
      visual: { type: 'calc', inputs: [
        { key: 'runs', label: 'Runs per month', min: 100, max: 20000, step: 100, value: 2000 },
        { key: 'inTok', label: 'Tokens in per run (prompt + email)', min: 200, max: 8000, step: 100, value: 1200 },
        { key: 'outTok', label: 'Tokens out per run', min: 10, max: 1500, step: 10, value: 150 },
        { key: 'pin', label: 'Price per million tokens in ($, example)', min: 0.1, max: 15, step: 0.1, value: 1 },
        { key: 'pout', label: 'Price per million tokens out ($, example)', min: 0.5, max: 75, step: 0.5, value: 5 },
      ], outputs: [
        { label: 'Cost per run', f: (v) => (v.inTok * v.pin + v.outTok * v.pout) / 1e6, fmt: 'num' },
        { label: 'Cost per month', f: (v) => v.runs * (v.inTok * v.pin + v.outTok * v.pout) / 1e6, fmt: 'money', big: true },
      ], caption: 'Prices here are made-up examples. Real prices vary by provider and model and change often.' },
      body: ['A plumbing inbox classifier: 2,000 emails a month. Drag the sliders.'],
      check: {
        type: 'num', q: 'At the starting values, what’s the monthly cost in dollars?', answer: 3.9, tol: 0.05, prefix: '$',
        hint: 'Per run: (1,200 × $1 + 150 × $5) ÷ 1,000,000. Then × 2,000.',
        why: '(1,200 + 750) ÷ 1,000,000 = $0.00195 per run × 2,000 = **$3.90**. Small, but it scales with volume and prompt size.',
      },
      stuck: {
        metaphor: 'Like a taxi meter with two rates: one for the words you send in, a higher one for the words it writes back.',
        worked: ['Input: 1,200 tokens × $1 per million = $0.0012.', 'Output: 150 × $5 per million = $0.00075.', 'Per run $0.00195 × 2,000 runs = $3.90.'],
      },
    },
    { tag: 'how', title: 'What drives cost and speed',
      body: [
        'You pay per token, usually with output tokens priced higher than input. Long prompts × many runs add up.',
        'Bigger models: better at hard reasoning and writing, slower, pricier. Smaller models: fast and cheap, great at simple classify/extract jobs.',
        'Speed matters most where a person is waiting: chat and especially voice. Background jobs can use slower, smarter models.',
      ] },
    { tag: 'try', title: 'Your turn: match the job to the model',
      check: {
        type: 'multi', q: 'Where is a **small, fast** model usually the right call?',
        options: ['Spam / not-spam on every incoming email', 'Writing a careful, personalized proposal draft', 'Picking one of five fixed categories', 'Analyzing a 40-page contract for risks'], answer: [0, 2],
        why: 'Simple, high-volume, fixed-choice jobs suit small models. Long, nuanced work earns a bigger model.',
      } },
    { tag: 'biz', title: 'Pass-through costs in your offer',
      body: [
        'AI usage is a running cost, like the automation tool’s plan. Decide who pays: client’s own account (cleanest), or you bill it with a margin.',
        'Estimate with real numbers: runs × (tokens in, out) × the provider’s current prices. Add headroom.',
        'Cut cost without hurting quality: shorter prompts, a filter before the AI step, small models for simple steps.',
      ] },
    { tag: 'key', title: 'Pick the smallest model that passes your test set',
      body: ['Start with your test set (lesson 3). Try a small model. Move up only if it fails cases that matter. Re-check when prices or models change.'] },
  ],
  quiz: [
    { type: 'num', q: '10,000 runs/month. Each run costs $0.002. Monthly cost in dollars?', answer: 20, tol: 0.01, prefix: '$', why: '10,000 × $0.002 = $20.' },
    { type: 'mc', q: 'Which usually costs more per token?', options: ['Output tokens', 'Input tokens', 'They’re always equal', 'Neither; it’s per run'], answer: 0, why: 'Most providers price generated (output) tokens higher.' },
    { type: 'mc', scenario: 'A voice agent feels sluggish: callers wait two seconds after every sentence.', q: 'Which change most directly helps?', options: ['A faster, smaller model for the conversation', 'A longer system prompt', 'More examples in the prompt', 'Logging every call'], answer: 0,
      why: 'Speed matters most where a person waits. Longer prompts make it slower.' },
    { type: 'multi', q: 'Which cut AI cost without hurting quality?', options: ['Filter junk before the AI step', 'Trim unneeded text from the prompt', 'Use a small model where it passes the test set', 'Run every email twice to be safe'], answer: [0, 1, 2], why: 'Running twice doubles cost.' },
  ],
  cards: [
    { id: 'pricing', front: 'How are AI models usually priced?', back: 'Per token, with input and output priced separately (output usually higher).' },
    { id: 'size', front: 'Small vs big model?', back: 'Small: fast, cheap, good for simple fixed-choice jobs. Big: better at hard reasoning and writing, slower, pricier.' },
    { id: 'pick', front: 'How do you choose a model size?', back: 'The smallest model that passes your test set.' },
    { id: 'monthly', front: 'Monthly AI cost estimate?', back: 'Runs × (tokens in × in-price + tokens out × out-price), plus headroom.' },
  ],
};
