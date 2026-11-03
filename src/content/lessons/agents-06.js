// M05 · L06 · Booking and qualifying by voice
export default {
  steps: [
    { tag: 'example', title: 'A missed call at 7:40 pm', visualFirst: true,
      visual: { type: 'flow', play: true, nodes: [
        { label: 'Call to Rivera Plumbing after hours', kind: 'trigger', app: 'Phone', data: { caller: '555-310-7781' } },
        { label: 'Voice agent asks qualifying questions', kind: 'ai', data: { problem: 'Kitchen sink clogged', water_leaking: 'no', address: '5 Birch Rd', when: 'Tomorrow afternoon' } },
        { label: 'Decide: emergency or not?', kind: 'logic', data: { result: 'Not an emergency → book' } },
        { label: 'Book tomorrow 2–4 pm window', kind: 'action', data: { booked: 'Wed 2–4 pm' } },
        { label: 'Text confirmation + job card to the owner', kind: 'action', data: { sms: 'Booked Wed 2–4 pm, 5 Birch Rd' } },
      ] },
      body: ['Before, after-hours calls went to voicemail and many callers rang the next plumber. Run the new flow.'],
      check: {
        type: 'mc', q: 'Why ask “is water leaking right now?”',
        options: ['It decides the path: emergency dispatch vs normal booking', 'To make small talk', 'Plumbers like to know', 'It’s legally required'], answer: 0,
        why: '[[lead-qualification|Qualifying]] questions exist to make a decision. Each one should change what happens next.',
      },
      stuck: {
        metaphor: 'Triage at an emergency room: a few questions decide who’s seen now and who waits.',
        worked: ['The answer “no” means no active damage.', 'So it’s a normal booking, not a 2 am dispatch.', 'The question drove the branch.'],
      },
    },
    { tag: 'how', title: 'Qualify → decide → act → confirm',
      body: [
        'Ask only questions that change the outcome: urgency, location (in the service area?), job type, timing, budget where it matters.',
        'Decide with clear rules written by the client: emergency criteria, service area, minimum job size.',
        'Act through tools: book a slot, create the job, or transfer a true emergency to the on-call phone.',
        'Confirm twice: read it back on the call, then send a text or email (with consent) the caller can check.',
      ] },
    { tag: 'try', title: 'Your turn: pick the qualifying questions',
      check: {
        type: 'multi', q: 'A gym’s voice agent books free trials. Which questions earn their place?',
        options: ['Which location is closer for you?', 'Mornings or evenings?', 'Any injuries we should know about before the trial?', 'What’s your favorite color?', 'How did you hear about us?'], answer: [0, 1, 2, 4],
        why: 'Location and time decide the booking, injuries change who runs the trial, and source feeds marketing. Color changes nothing.',
      } },
    { tag: 'biz', title: 'Missed-call recovery sells itself',
      body: [
        'Small businesses miss many calls during jobs and after hours. A voice agent (or even a missed-call text-back) turns some of those into bookings.',
        'Measure it: calls answered after hours, bookings made, emergencies routed. Those numbers drive renewals (Module 11).',
      ] },
  ],
  quiz: [
    { type: 'mc', q: 'What makes a qualifying question worth asking?', options: ['The answer changes what happens next', 'It makes the call longer', 'Competitors ask it', 'It’s polite'], answer: 0, why: 'Every question should drive a decision.' },
    { type: 'order', q: 'Order a voice booking flow.', items: ['Qualify with a few questions', 'Decide with the client’s rules', 'Act: book or transfer', 'Confirm on the call', 'Send a written confirmation'], why: 'Ask, decide, do, confirm twice.' },
    { type: 'mc', scenario: 'A caller describes water pouring through the ceiling at 11 pm.', q: 'What should the agent do?', options: ['Follow the emergency rule: transfer to on-call or dispatch immediately', 'Book next Tuesday', 'Take a message', 'Ask about their budget first'], answer: 0, why: 'Emergencies skip the normal path by design.' },
  ],
  cards: [
    { id: 'qualify', front: 'Qualifying questions?', back: 'Only questions whose answers change what happens next.' },
    { id: 'flow', front: 'Voice booking flow?', back: 'Qualify → decide (client’s rules) → act (book/transfer) → confirm twice.' },
    { id: 'missed', front: 'Why sell missed-call recovery?', back: 'Missed calls often go to competitors; recovered bookings are easy to measure.' },
  ],
};
