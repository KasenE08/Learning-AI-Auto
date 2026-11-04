// M09 · L10 · Handling objections
const objections = {
  type: 'roleplay',
  title: 'Objections · simulated',
  persona: { name: 'Dale Whitaker', role: 'Owner, Whitaker Heating & Cooling (fake), Maryville TN' },
  start: 'price',
  nodes: {
    price: { say: '$2,500 to set up plus a monthly fee? That’s a lot for something I haven’t seen work.', choices: [
      { text: 'Totally fair. Can I ask what a single install job is worth to you?', score: 2, why: 'Acknowledges, then moves the conversation to value in his numbers.', next: 'value' },
      { text: 'It’s actually cheap compared to other providers.', score: 0, why: 'Defensive, and he doesn’t care about other providers.', next: 'defensive' },
      { text: 'I could do $1,500 instead.', score: 0, why: 'Discounting instantly says the first price wasn’t real.', next: 'discount' },
    ] },
    value: { say: 'Eight grand, give or take. Maybe two grand profit on it.', choices: [
      { text: 'So if this saves one install a month that would’ve gone to voicemail, it pays for itself several times. Does losing one a month in summer sound realistic?', score: 2, why: 'Connects price to his profit and lets him confirm the assumption.', next: 'service' },
      { text: 'Right, so it’s a no-brainer.', score: 1, why: 'The math is right, but telling him what to think rarely lands.', next: 'service' },
    ] },
    defensive: { say: 'Other providers? I don’t know any of them. I know my money.', choices: [
      { text: 'Fair point. What’s one install job worth to you?', score: 2, why: 'Recovered by going back to his value.', next: 'value' },
      { text: 'Well, our prices go up next month.', score: 0, why: 'Fake pressure. Trust drops.', next: 'cold' },
    ] },
    discount: { say: 'So the first price wasn’t real?', choices: [
      { text: 'It was. Let me take that back and explain what’s included and what it’s worth to you instead.', score: 2, why: 'The best recovery available: honest, and back to value. Better still: don’t discount in the first place.', next: 'value' },
      { text: 'Okay, $1,200 then.', score: 0, why: 'Now the price means nothing.', next: 'cold' },
    ] },
    service: { say: 'Summer, sure. But I tried an answering service before. People hated it.', choices: [
      { text: 'What did they hate about it?', score: 2, why: 'Understand the objection before answering it.', next: 'why' },
      { text: 'This is totally different, it’s AI.', score: 0, why: 'Doesn’t address his actual worry.', next: 'think' },
      { text: 'Sorry to hear that.', score: 1, why: 'Empathetic, but you didn’t learn what went wrong.', next: 'think' },
    ] },
    why: { say: 'They couldn’t answer anything. Couldn’t book. Just took messages.', choices: [
      { text: 'That’s the key difference: this books into your schedule and texts Brenda the job details. Want to hear a two-minute recording of a test call?', score: 2, why: 'Answers his exact complaint and offers proof.', next: 'think' },
      { text: 'Ours takes messages too.', score: 0, why: 'You just described the thing he hated.', next: 'cold' },
    ] },
    think: { say: 'Let me think about it.', choices: [
      { text: 'Of course. What would you need to see to feel sure? Maybe a 30-day pilot on after-hours calls only?', score: 2, why: 'Finds the real hesitation and lowers the risk.', next: 'good' },
      { text: 'Sure, I’ll check back in a few months.', score: 0, why: 'Gives up the momentum entirely.', next: 'cold' },
      { text: 'This offer expires Friday.', score: 0, why: 'Fake urgency with a skeptical owner backfires.', next: 'cold' },
    ] },
    good: { say: 'A pilot on after-hours only… yeah. Send me that.', end: true },
    cold: { say: 'Alright, I’ve got to go. I’ll call you if I need you.', end: true },
  },
};
export default {
  steps: [
    { tag: 'example', title: 'Handle three objections', visualFirst: true, visual: objections,
      body: ['Price, a bad past experience, and “let me think about it”. Pick your replies.'],
      check: {
        type: 'mc', q: 'What did the strongest replies have in common?',
        options: ['They acknowledged the concern, then asked a question before answering', 'They argued back', 'They offered discounts', 'They added urgency'], answer: 0,
        why: 'An [[objection]] is information. Understand it, then answer the real concern with value or proof.',
      },
      stuck: {
        metaphor: 'A doctor hearing “it hurts” asks “where, and since when?” before prescribing anything.',
        worked: ['Strong replies: “fair”, then a question.', 'Then an answer tied to what he said.', 'Weak replies argued, discounted, or pressured.'],
      },
    },
    { tag: 'how', title: 'Acknowledge → ask → answer → check',
      predict: {"q": "Prospect: “It’s too expensive.” Best first move?", "options": ["“That’s fair. What does this problem cost you each month?”", "Argue it’s cheap", "Drop the price 40%", "Say the price rises Friday"], "answer": 0, "why": "Acknowledge, then ask. Answer the real concern with their numbers, proof, or a scope change."},
      body: ["**Acknowledge** (“That’s fair.”) and **ask** what’s behind it: “What happened last time?”", "**Answer** the real concern with value (their numbers), proof (a demo, a pilot), or a scope change.", "**Check:** “Does that address it?”"] },
    { tag: 'see', title: 'Common objections',
      visual: {"type": "sort", "cols": ["Value not clear", "Bad past experience", "Unspoken worry"], "items": [{"text": "“That’s a lot of money.”", "col": 0}, {"text": "“We tried an answering service. Customers hated it.”", "col": 1}, {"text": "“Let me think about it.”", "col": 2}, {"text": "“I’m not sure it’s worth it.”", "col": 0}, {"text": "“The last agency promised the moon.”", "col": 1}, {"text": "“Send me some info.”", "col": 2, "why": "Often a polite brush-off hiding a concern; ask what they’d need to see."}], "prompt": "What does each objection usually mean?"},
       },
    { tag: 'outside', title: 'Role-play: objections with Claude',
      body: ['Claude plays a gym owner with several objections. Practice the four steps live.'],
      outside: {
        id: 'objections-roleplay',
        title: 'Objections: a skeptical gym owner',
        goal: 'Handle each objection by acknowledging, asking, answering, and checking, and end with a clear next step.',
        steps: [
          'Open a new Claude chat, paste the role-play prompt, and play the consultant. Your proposal is already in her inbox.',
          'Use acknowledge → ask → answer → check for each objection.',
          'No discounts unless you remove something from the scope.',
          'Type END, copy the transcript, and grade it in a separate chat.',
        ],
        data: ['Your proposal: lead follow-up system, $2,000 setup + $300/month', 'Her numbers (from discovery): ~120 ad leads/month, ~25% book a trial, membership ≈ $60/month, members stay ~10 months'],
        roleplay: {
          persona: 'Marisol Vega, owner of Ironside Fitness (fake), Chattanooga, Tennessee. Direct, numbers-minded, has been burned by marketing agencies.',
          business: 'Two locations, about 600 members, runs paid social ads every month.',
          situation: 'She read your proposal and agreed to a 15-minute call to “talk about it”.',
          hidden: [
            'Her real worry is that automated texts will feel spammy and hurt the gym’s friendly reputation.',
            'A previous agency promised “3x leads” and delivered junk; she paid for 6 months.',
            'Her front-desk staff currently call leads, but only during their shifts, and many leads go cold overnight.',
            'She has budget for this if she believes it works; she’d prefer a short trial over a long contract.',
          ],
          objections: ['“$2,000 just to set it up? For texts?”', '“The last agency promised the moon and gave me nothing.”', '“I don’t want my members thinking we’re a spam factory.”', '“Let me think about it.”'],
          style: 'Push back on vague answers. Respect specific numbers and honesty.',
          opening: 'Start with: “Okay, I read it. Honestly, my first reaction was: that’s a lot of money for some texts.”',
        },
        prompt: 'You are a sales coach grading a beginner consultant’s handling of objections from a skeptical gym owner. Be fair but strict.',
        checklist: [
          'The consultant acknowledged objections instead of arguing.',
          'They asked a question to understand each main objection before answering it.',
          'They tied the price to the owner’s own numbers (leads, trial rate, membership value).',
          'They addressed the past bad agency experience by showing what is different, without bashing the agency.',
          'They took the spam concern seriously and explained how messages would feel personal and limited.',
          'They didn’t discount without changing the scope.',
          'They handled “let me think about it” by finding the real hesitation.',
          'The call ended with a specific next step (for example a pilot or a follow-up time).',
        ],
      } },
  ],
  quiz: [
    { type: 'order', q: 'Order the objection steps.', items: ['Acknowledge', 'Ask', 'Answer', 'Check'], why: 'Understand before you answer.' },
    { type: 'mc', q: 'Prospect: “It’s too expensive.” Best first reply?', options: ['“That’s fair. Can I ask what this problem costs you each month?”', '“It’s cheap compared to others.”', '“I can drop it 40%.”', '“The price goes up Friday.”'], answer: 0, why: 'Acknowledge and move to value.' },
    { type: 'mc', q: 'When is a discount reasonable?', options: ['When you also reduce the scope', 'Whenever they hesitate', 'Never, under any conditions', 'Always on the first call'], answer: 0, why: 'Less price, less scope. Otherwise your price means nothing.' },
  ],
  cards: [
    { id: 'steps', front: 'Objection steps?', back: 'Acknowledge → ask → answer the real concern → check.' },
    { id: 'think', front: '“Let me think about it” → ?', back: '“What would you need to see to feel sure?”' },
    { id: 'discount', front: 'Discount rule?', back: 'Only with reduced scope.' },
  ],
};
