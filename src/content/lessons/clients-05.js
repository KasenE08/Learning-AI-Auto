// M09 · L05 · Content and inbound
export default {
  steps: [
    { tag: 'example', title: 'One post, three replies', visualFirst: true,
      visual: { type: 'compare', cols: ['Post', 'What happened'], rows: [
        ['“5 ways AI is transforming business in 2026”', 'A few likes from other consultants'],
        ['“I called 20 HVAC companies in Knoxville at 7 pm. 14 went to voicemail. Here’s what that costs in a heat wave (simple math).”', '3 HVAC owners commented, 1 asked for a call'],
      ], pick: 1 },
      body: ['Two posts in a local business group.'],
      check: {
        type: 'mc', q: 'Why did the second post bring a lead?',
        options: ['It showed a specific problem in the niche, with real (honestly gathered) observations and math', 'It was shorter', 'It mentioned AI', 'Luck'], answer: 0,
        why: '[[inbound]] content works when it makes your niche feel seen. Generic AI posts attract other consultants, not buyers.',
      },
      stuck: {
        metaphor: 'A mechanic who posts “here’s why your brakes squeal” gets brake jobs. One who posts “the future of cars” gets likes.',
        worked: ['Post 1 is generic.', 'Post 2 is about the niche’s exact problem, with numbers.', 'Owners recognized themselves.'],
      },
    },
    { tag: 'how', title: 'Content that brings clients',
      visual: {"type": "sort", "cols": ["Attracts buyers", "Attracts peers only"], "items": [{"text": "“How a dental office could cut no-shows: the 4-step system”", "col": 0}, {"text": "“5 ways AI is transforming business”", "col": 1}, {"text": "A labeled demo of your HVAC lead build", "col": 0}, {"text": "A comparison of AI model benchmarks", "col": 1, "why": "Interesting to other builders, not to owners."}, {"text": "“I called 20 HVAC companies at 7 pm. Here’s what I found.”", "col": 0}, {"text": "“Why I love automation”", "col": 1}], "prompt": "Sort each post idea."},
      body: ["**Teardowns** and honest **small experiments** in your niche (never shaming a named business).", "**Before/after demos** of your builds, labeled as demos.", "Post where owners actually are: local groups, trade associations."] },
    { tag: 'try', title: 'Your turn: pick the post',
      check: {
        type: 'mc', q: 'Your niche is small accounting firms. Best post?', options: ['“The 3 emails every tax client ignores, and the reminder sequence that gets documents in on time.”', '“Why I love automation.”', '“AI will replace accountants.”', '“Hire me.”'], answer: 0,
        why: 'Specific, useful to them today, and it shows how you think. The “replace accountants” post insults your buyers.',
      } },
    { tag: 'biz', title: 'Inbound is slow; outreach is fast',
      predict: {"q": "You need your first client in 60 days. Content or outreach?", "options": ["Outreach, with content alongside", "Content only", "Neither", "Wait for inbound"], "answer": 0, "why": "Content builds trust over months; outreach starts conversations this week. Reuse posts in outreach."},
      body: ['Content takes months to build trust. Do it alongside outreach, not instead of it. One useful post a week, reused in your outreach (“wrote this for HVAC owners, thought of you”).'] },
  ],
  quiz: [
    { type: 'mc', q: 'What content attracts buyers rather than peers?', options: ['Specific, useful posts about the niche’s problems', 'General AI news', 'Tool comparisons', 'Your certifications'], answer: 0, why: 'Talk to buyers about their problems.' },
    { type: 'mc', q: 'Where should you post?', options: ['Where your niche’s owners actually spend time', 'Wherever AI people hang out', 'Everywhere at once', 'Nowhere'], answer: 0, why: 'Go to the buyers.' },
    { type: 'mc', q: 'Content or outreach first?', options: ['Both, but outreach brings clients faster; content builds over months', 'Content only', 'Outreach only, forever', 'Neither'], answer: 0, why: 'Fast + slow together.' },
  ],
  cards: [
    { id: 'inbound', front: 'Content that brings clients?', back: 'Teardowns, honest niche observations, labeled demos, posted where owners are.' },
    { id: 'speed', front: 'Content vs outreach speed?', back: 'Outreach fast; content builds trust over months. Do both.' },
    { id: 'reuse', front: 'Reuse content how?', back: 'Share it in outreach: “wrote this for owners like you”.' },
  ],
};
