// M11 · L02 · Scope and change requests
const change = {
  type: 'roleplay',
  title: 'Mid-project change · simulated',
  persona: { name: 'Dale Whitaker', role: 'Owner, Whitaker Heating & Cooling (fake)' },
  start: 'ask',
  nodes: {
    ask: { say: 'Hey, while you’re in there, can the system also send quotes automatically after a tech visits?', choices: [
      { text: 'Good idea. That’s a separate workflow from what we agreed. Want me to finish launch first, then quote it as phase 2?', score: 2, why: 'Protects the launch date and turns the idea into future work.', next: 'phase' },
      { text: 'Sure, I’ll add it now.', score: 0, why: 'Unpaid scope, and the launch slips.', next: 'slip' },
      { text: 'No, that’s not part of the deal.', score: 1, why: 'True, but closes a door you could open.', next: 'phase' },
    ] },
    phase: { say: 'Phase 2… okay. When would that be?', choices: [
      { text: 'Launch is the 20th. I’ll send a quote for automated quotes this week so you can decide; it could start right after launch.', score: 2, why: 'Concrete dates, a quote, and his decision.', next: 'good' },
      { text: 'Sometime later.', score: 0, why: 'Vague answers create doubt.', next: 'good' },
    ] },
    slip: { say: 'Great. So we’re still launching on the 20th, right?', choices: [
      { text: 'Honestly, adding this pushes launch about a week. Want me to keep the 20th and do quotes as phase 2 instead?', score: 2, why: 'Honest about the trade-off and lets him choose.', next: 'good' },
      { text: 'Yeah, should be fine.', score: 0, why: 'A promise you probably can’t keep.', next: 'bad' },
    ] },
    good: { say: 'Keep the 20th. Send me the phase 2 quote.', end: true },
    bad: { say: '(Three weeks later) We’re not live yet? I told my techs it’d be running by now.', end: true },
  },
};
export default {
  steps: [
    { tag: 'example', title: '“While you’re in there…”', visualFirst: true, visual: change,
      body: ['Mid-build, the client has a new idea.'],
      check: {
        type: 'mc', q: 'What’s the main risk of saying yes on the spot?',
        options: ['The launch date slips and the agreed work gets crowded out', 'The client will be too happy', 'Nothing', 'It costs the client more'], answer: 0,
        why: 'Every addition competes with the work you promised. Protect the launch; turn good ideas into phase 2.',
      },
      stuck: {
        metaphor: 'A builder asked to add a deck before the roof is on. Great idea, after the roof.',
        worked: ['The new idea is a new workflow.', 'Adding it now delays launch.', 'Finish, then quote it as phase 2.'],
      },
    },
    { tag: 'how', title: 'Change requests during delivery',
      predict: {"q": "A good idea comes up mid-build that would delay launch. Where does it go?", "options": ["Phase 2, with a quote", "Into this build, free", "Nowhere", "Into the contract silently"], "answer": 0, "why": "Protect the launch; deferred ideas become your phase 2 pipeline."},
      body: ["Keep a change log: request, date, in or out of scope, decision.", "In scope: do it. Out: “great idea, here’s a quote”, plus what it does to the timeline.", "Never trade the launch date for unpaid extras unless the client chooses that knowingly."] },
    { tag: 'try', title: 'Your turn: in or out?',
      check: {
        type: 'multi', q: 'The agreed scope is “lead intake + instant reply + follow-up sequence”. Which requests are in scope?',
        options: ['Changing the instant reply wording', 'Adding a second lead form to intake', 'Building automated quotes', 'Adjusting the follow-up timing'], answer: [0, 3],
        why: 'Tweaking agreed parts is in. A second form is arguably new intake (clarify), and quotes are clearly new work.',
      } },
    { tag: 'warn', title: 'Gray areas',
      predict: {"q": "A request is ambiguous and tiny, and won’t affect launch. Best handling?", "options": ["Decide quickly, log it, lean generous", "Argue about it for a week", "Ignore it", "Charge double"], "answer": 0, "why": "Write the decision down either way."},
      body: ['Some requests are ambiguous (the second lead form). Decide quickly, write the decision in the change log, and lean generous on small items if it doesn’t threaten the launch.'] },
  ],
  quiz: [
    { type: 'mc', q: 'Client asks for a new workflow mid-build. Best response?', options: ['Finish what’s agreed, quote the new one as phase 2', 'Add it for free', 'Refuse forever', 'Start over'], answer: 0, why: 'Protect launch; capture the idea.' },
    { type: 'multi', q: 'What goes in a change log?', options: ['The request', 'The date', 'In or out of scope', 'The decision', 'Your opinion of the client'], answer: [0, 1, 2, 3], why: 'Facts only.' },
    { type: 'mc', q: 'Adding work will push launch a week. What do you do?', options: ['Tell the client and let them choose', 'Say nothing', 'Work nights silently', 'Cancel the extra quietly'], answer: 0, why: 'Honest trade-offs.' },
  ],
  cards: [
    { id: 'phase2', front: 'New idea mid-build?', back: 'Finish the agreed work; quote it as phase 2.' },
    { id: 'log', front: 'Change log?', back: 'Request, date, in/out of scope, decision.' },
    { id: 'tradeoff', front: 'Extra work affects launch?', back: 'Say so and let the client choose.' },
  ],
};
