// CAP · L08 · Retain and expand
const renewal = {
  type: 'roleplay',
  title: '90-day review · simulated',
  persona: { name: 'Dr. Sam Whitfield', role: 'Owner, Riverbend Animal Clinic (fake)' },
  start: 'open',
  nodes: {
    open: { say: 'Keisha says it’s been going well. What have we actually gotten for the money?', choices: [
      { text: 'Urgent night requests used to wait about 12 hours; now the on-call vet hears in under a minute. 38 urgent nights handled, and every owner got a confirmation.', score: 2, why: 'Results vs the baseline, in plain numbers.', next: 'gap' },
      { text: 'The system has run 1,420 times with a 99.4% success rate.', score: 1, why: 'True, but it’s about the system, not his clinic.', next: 'gap' },
      { text: 'Lots of things! It’s great.', score: 0, why: 'Vague. He asked for value.', next: 'doubt' },
    ] },
    doubt: { say: 'That’s not very specific.', choices: [
      { text: 'You’re right. Here’s the before/after: night urgent requests went from ~12 hours to under a minute.', score: 2, why: 'Recovered with the numbers.', next: 'gap' },
      { text: 'Trust me, it works.', score: 0, why: 'Trust is earned with evidence.', next: 'cold' },
    ] },
    gap: { say: 'Good. What’s still a problem, in your view?', choices: [
      { text: 'No-shows: still about 15 a month at around $90. Reminder texts with a reschedule link could cut that. Want me to send a short quote for adding them?', score: 2, why: 'One suggestion tied to a known pain, with a clear next step.', next: 'renew' },
      { text: 'I can build you anything you want: chatbots, voice agents, a new website.', score: 0, why: 'A list of everything is a list of nothing.', next: 'renew' },
    ] },
    renew: { say: 'Send the quote. And we’ll keep the monthly plan going.', end: true },
    cold: { say: 'I’ll think about whether we keep paying for this.', end: true },
  },
};
export default {
  steps: [
    { tag: 'example', title: 'The 90-day review', visualFirst: true, visual: renewal,
      body: ['Three months in. Dr. Whitfield wants to know what he’s paying for.'],
      check: {
        type: 'mc', q: 'What made the strongest opening answer strong?',
        options: ['Results compared to the baseline, in his clinic’s terms', 'Technical uptime numbers', 'Enthusiasm', 'A long feature list'], answer: 0,
        why: 'The baseline you recorded at onboarding is what makes this answer possible.',
      },
      stuck: {
        metaphor: 'A personal trainer showing before/after measurements, not how many reps you did.',
        worked: ['He asked about value.', 'Before: ~12 h. After: under a minute.', 'That’s the answer that renews.'],
      },
    },
    { tag: 'how', title: 'The monthly report numbers',
      visual: { type: 'calc', inputs: [
        { key: 'nights', label: 'Urgent night requests handled this month', min: 0, max: 30, value: 13 },
        { key: 'conf', label: 'Owners confirmed automatically', min: 100, max: 800, step: 10, value: 480 },
        { key: 'min', label: 'Front-desk minutes saved per request', min: 1, max: 6, step: 0.5, value: 3 },
      ], outputs: [
        { label: 'Front-desk hours saved this month', f: (v) => v.conf * v.min / 60, fmt: 'hours', big: true },
        { label: 'Urgent nights answered in under a minute', f: (v) => v.nights, fmt: 'num' },
      ], caption: 'Example numbers for one month.' },
      body: ['2–4 measures tied to what you sold, vs the baseline.', 'One issue + what you did; one suggestion for next month.'] },
    { tag: 'biz', title: 'Choose the expansion',
      visual: { type: 'sort', prompt: 'Good next suggestion for Riverbend now, or not yet?', cols: ['Suggest now', 'Not yet'], items: [
        { text: 'No-show reminders with reschedule links', col: 0 },
        { text: 'Vaccine-due reminders (with consent)', col: 0 },
        { text: 'An AI vet that gives medical advice', col: 1, why: 'Out of scope forever: medical judgment stays with vets.' },
        { text: 'An after-hours voice agent', col: 1, why: 'Possible later, once reminders prove themselves and trust is high.' },
        { text: 'Monthly review requests to happy owners', col: 0 },
        { text: 'Rebuilding their whole practice software', col: 1 },
      ] },
      body: ['One suggestion at a time, tied to a pain they’ve mentioned, with its own small ROI.'] },
    { tag: 'try', title: 'Your turn: capstone complete?',
      check: {
        type: 'multi', q: 'Which together complete the capstone in this app?', options: ['All 8 capstone lessons finished', 'Sandbox build at 100% (all 9 checks)', 'Real build saved with at least 6 of 8 items', 'A real client signed'], answer: [0, 1, 2],
        why: 'Everything here is simulated. Your Progress page shows the capstone status, and it feeds the launch-readiness result.',
      } },
  ],
  quiz: [
    { type: 'mc', q: 'What renews a retainer?', options: ['Visible results vs the baseline, every month', 'A long contract', 'Discounts', 'Silence'], answer: 0, why: 'Show value monthly.' },
    { type: 'num', q: '480 confirmations × 3 minutes saved. Hours saved?', answer: 24, tol: 0, unit: 'hours', why: '1,440 minutes = 24 hours.' },
    { type: 'mc', q: 'Best expansion for Riverbend at 90 days?', options: ['No-show reminders, with a short quote', 'An AI that diagnoses pets', 'Everything at once', 'Nothing ever'], answer: 0, why: 'Tied to a known pain, low risk.' },
  ],
  cards: [
    { id: 'review', front: '90-day review opener?', back: 'Results vs baseline in the client’s terms.' },
    { id: 'expand', front: 'Riverbend next step?', back: 'No-show reminders with reschedule links (with consent), quoted separately.' },
    { id: 'complete', front: 'Capstone complete =', back: '8 lessons + sandbox build 100% + real build ≥ 6/8 saved.' },
  ],
};
