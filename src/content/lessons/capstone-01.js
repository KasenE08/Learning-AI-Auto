// CAP · L01 · Meet the client
const firstCall = {
  type: 'roleplay',
  title: 'First call · simulated',
  persona: { name: 'Keisha Moore', role: 'Practice manager, Riverbend Animal Clinic (fake), Chattanooga TN' },
  start: 'open',
  nodes: {
    open: { say: 'Hi! Our vet Dr. Whitfield said a friend of his mentioned you. I have about ten minutes. What’s this about?', choices: [
      { text: 'Thanks for taking the call. I help clinics stop requests from slipping through. Could I ask how web appointment requests get handled today?', score: 2, why: 'Short intro, then straight to learning about her process.', next: 'process' },
      { text: 'I build AI agents and multi-agent automations for businesses. Let me explain how they work…', score: 0, why: 'Jargon and a lecture before you know anything about her.', next: 'cool' },
      { text: 'Do you want to save money?', score: 1, why: 'Everyone says yes; it teaches you nothing.', next: 'process' },
    ] },
    cool: { say: 'Okay… I’m not really a tech person. What would that actually do for us?', choices: [
      { text: 'Fair question. Can I ask what happens to a web request that comes in at night?', score: 2, why: 'Recovers by asking about her world.', next: 'process' },
      { text: 'It uses large language models with tool calling.', score: 0, why: 'More jargon. She’ll end the call soon.', next: 'meh' },
    ] },
    process: { say: 'They land in our shared inbox. We check it when the phones calm down. At night they just sit until morning.', choices: [
      { text: 'What happens when one of those night requests turns out to be urgent?', score: 2, why: 'Follows the risk she just revealed.', next: 'pain' },
      { text: 'We can fix that with automation!', score: 0, why: 'Pitching before you understand the cost.', next: 'pain' },
    ] },
    pain: { say: 'Honestly, it scares me. Last month a dog ate something toxic at 9 pm; the owner emailed us, then drove to the emergency hospital across town.', choices: [
      { text: 'That sounds stressful. Would you be open to a 30-minute call this week to walk through the whole request process with me?', score: 2, why: 'Empathy plus a specific next step: a proper discovery call.', next: 'good' },
      { text: 'Our package is $2,500. Want to sign up?', score: 0, why: 'Price before discovery. Way too early.', next: 'meh' },
      { text: 'Okay, let me know if you want help.', score: 1, why: 'Kind, but leaves the next step to her.', next: 'meh' },
    ] },
    good: { say: 'Yes. Thursday at 1? I’ll pull some numbers before then.', end: true },
    meh: { say: 'I need to get back to the front desk. Send me an email, I guess.', end: true },
  },
};
export default {
  steps: [
    { tag: 'example', title: 'A warm introduction', visualFirst: true, visual: firstCall,
      body: ['Your capstone client. A friend of the clinic’s vet passed on your name. Play the first call.'],
      check: {
        type: 'mc', q: 'What was the real goal of this first call?',
        options: ['Learn enough to earn a proper discovery call', 'Close the deal', 'Explain how AI works', 'Send a price list'], answer: 0,
        why: 'First calls open doors. The strongest path ends with a booked discovery call and Keisha bringing numbers.',
      },
      stuck: {
        metaphor: 'A first coffee with someone isn’t a job interview. You’re only trying to earn the second meeting.',
        worked: ['Strong replies asked about her process.', 'They ended with a specific next step.', 'So the goal was the discovery call, not a sale.'],
      },
    },
    { tag: 'how', title: 'Research before discovery',
      predict: { q: 'Before Thursday’s discovery call, what’s worth 20 minutes of research?', options: ['Their website, reviews, and how requests reach them', 'Their competitors’ logos', 'Nothing; just show up', 'The newest AI models'], answer: 0, why: 'Know how they work and what customers say, so your questions are specific.' },
      body: ['Read their site and reviews; try their contact form and phone after hours (respectfully).', 'Note what you see as **observations**, and your guesses as **assumptions to test**.', 'Prepare 5–6 discovery questions from Module 9.'] },
    { tag: 'see', title: 'What you found (fake research)',
      visual: { type: 'sort', prompt: 'Fact you observed, or assumption to test on the call?', cols: ['Observed fact', 'Assumption to test'], items: [
        { text: 'The website form says “we’ll reply within 1 business day”', col: 0 },
        { text: 'Two recent reviews mention “couldn’t get through on the phone”', col: 0 },
        { text: 'They lose a lot of clients to the emergency hospital', col: 1, why: 'Keisha mentioned one case. How often is a question for discovery.' },
        { text: 'The after-hours phone message gives an emergency hospital’s number', col: 0 },
        { text: 'The front desk is overwhelmed every morning', col: 1, why: 'Likely, but you haven’t seen it. Ask.' },
        { text: 'They’d pay for an after-hours voice agent', col: 1 },
      ] },
      body: ['Facts make your questions sharp. Assumptions become questions, never claims.', 'Keep both in your notes for the proposal.'] },
    { tag: 'try', title: 'Your turn: the follow-up email',
      check: {
        type: 'mc', q: 'Best confirmation email after the call?', options: ['“Thanks, Keisha. Confirmed for Thursday 1 pm. If you can, bring rough numbers: web requests per week and after-hours ones. Talk soon.”', '“Attached is our 20-page AI brochure.”', '“Looking forward to transforming your clinic with AI!”', 'No email; she’ll remember'], answer: 0,
        why: 'Confirms the time, asks for useful numbers, and stays short and plain.',
      } },
  ],
  quiz: [
    { type: 'mc', q: 'The goal of a first call with a warm introduction is…', options: ['To earn a proper discovery call', 'To close', 'To demo everything', 'To talk pricing'], answer: 0, why: 'One step at a time.' },
    { type: 'multi', q: 'Good pre-discovery research?', options: ['Their website and contact form', 'Recent reviews', 'Their after-hours phone message', 'Their staff’s personal social media'], answer: [0, 1, 2], why: 'Stay professional and business-focused.' },
    { type: 'mc', q: 'You suspect they lose many clients after hours. How do you treat that?', options: ['As an assumption to test with questions', 'As a fact for the proposal', 'As something to ignore', 'As a headline for your ad'], answer: 0, why: 'Test it in discovery.' },
  ],
  cards: [
    { id: 'goal', front: 'Goal of a first call?', back: 'Earn the discovery call: learn a little, end with a specific next step.' },
    { id: 'research', front: 'Pre-discovery research?', back: 'Website, reviews, how requests reach them; split facts from assumptions.' },
    { id: 'assume', front: 'Assumptions about a prospect?', back: 'Turn them into discovery questions, never claims.' },
  ],
};
