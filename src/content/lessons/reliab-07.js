// M06 · L07 · Data privacy in practice
export default {
  steps: [
    { tag: 'example', title: 'Where did the patient data go?', visualFirst: true,
      visual: { type: 'flow', nodes: [
        { label: 'Booking form', kind: 'trigger', data: { name: 'Lee Park', phone: '(none)', reason: 'Gum is swollen and bleeding' } },
        { label: 'AI: classify urgency', kind: 'ai', sub: 'Third-party AI provider' },
        { label: 'Post to #front-desk', kind: 'action', data: { message: 'URGENT: Lee Park, swollen bleeding gum, lee.park@example.com' } },
        { label: 'Log row in a shared sheet', kind: 'action', sub: 'Shared with 6 staff + the cleaning contractor' },
      ] },
      body: ['Follow Lee’s health details through Bright Smile’s workflow.'],
      check: {
        type: 'multi', q: 'Where did Lee’s health details end up that they probably shouldn’t?',
        options: ['Team chat, with full name and email', 'A sheet the cleaning contractor can open', 'The AI provider, without checking its data terms', 'The booking form itself'], answer: [0, 1, 2],
        why: 'Each copy is another place to protect. Health details went to chat, an over-shared sheet, and a vendor nobody checked. The form is where it’s supposed to be.',
      },
      stuck: {
        metaphor: 'Photocopying a medical file and leaving copies in the break room, the hallway, and a courier’s van.',
        worked: ['Count the copies after the form.', 'Chat: visible to all staff, kept for years.', 'Sheet: shared with a contractor.', 'AI vendor: terms unchecked.'],
      },
    },
    { tag: 'how', title: 'Privacy by design, in four habits',
      visual: {"type": "sort", "cols": ["Minimize", "Know your vendors", "Limit access", "Retention"], "items": [{"text": "Post “first name + see CRM” instead of the whole form", "col": 0}, {"text": "Check whether the AI tool trains on your data", "col": 1}, {"text": "Share one record, not the whole folder", "col": 2}, {"text": "Delete test exports after launch", "col": 3}, {"text": "Check the vendor will sign a BAA for health data", "col": 1}, {"text": "Don’t copy phone numbers into the report", "col": 0, "why": "Not needed = not copied."}], "prompt": "Which privacy habit is each action?"},
      body: ["**Minimize:** pass on only what each step needs ([[data-minimization]]).", "**Know your vendors** and **limit access** to people and connections.", "**Retention:** delete what you no longer need, on a schedule."] },
    { tag: 'see', title: 'Some data has extra rules',
      predict: {"q": "A dental clinic’s patient data goes to an AI tool. What do you check first?", "options": ["Whether the vendor meets HIPAA needs (e.g. signs a BAA)", "The tool’s logo", "Its speed", "Nothing"], "answer": 0, "why": "Health data is regulated more strictly. Many tools only sign a BAA on certain plans, or not at all."},
      body: [
        'Health, financial, children’s and biometric data are often regulated more strictly.',
        'Example: in the US, a dental clinic’s patient data is generally protected health information under HIPAA, and vendors handling it may need a business associate agreement (BAA). Many tools only offer one on certain plans, or not at all.',
        'Laws like GDPR (EU) and California’s privacy laws give people rights over their data. Module 13 covers the concepts; for real clients, get proper advice.',
      ] },
    { tag: 'try', title: 'Your turn: minimize the message',
      check: {
        type: 'mc', q: 'Which chat alert for an urgent dental request is best?',
        options: ['“Lee: urgent request, see the CRM”', '“URGENT: Lee Park, swollen bleeding gum, lee.park@example.com”', '“Urgent request from Lee Park, DOB 03/14/1990”', '“New message”'], answer: 0,
        why: 'Enough to act (who, urgent, where to look), with health details kept in the system built for them. “New message” is too little to act on.',
      } },
    { tag: 'build', title: 'Build it: keep health details out of chat', build: { challenge: 'minimize-data' },
      body: ['Ping #front-desk for urgent requests with the first name only. No last names, phones, emails, or symptoms.'] },
  ],
  quiz: [
    { type: 'mc', q: 'What is data minimization?', options: ['Collecting and passing on only what each step needs', 'Compressing files', 'Deleting all data', 'Using smaller AI models'], answer: 0, why: 'Fewer copies, less risk.' },
    { type: 'multi', q: 'What do you check about a vendor that will handle client data?', options: ['Whether it trains on your data', 'Where data is stored', 'Whether it signs required agreements (e.g. a BAA for US health data)', 'Its logo color'], answer: [0, 1, 2], why: 'Data terms decide whether you can use it for this client.' },
    { type: 'mc', scenario: 'A clinic wants AI to summarize patient messages using a tool that won’t sign a BAA on their plan.', q: 'What do you do?', options: ['Don’t send patient data to it; find a compliant option or redesign', 'Use it anyway', 'Remove names and hope', 'Ask patients to consent in a chat'], answer: 0, why: 'Regulated data needs vendors that meet the rules. Get proper advice for real cases.' },
    { type: 'mc', q: 'What is retention?', options: ['How long data is kept before deletion', 'Customer loyalty', 'A backup', 'An AI setting'], answer: 0, why: 'Delete what you no longer need, on a schedule.' },
  ],
  cards: [
    { id: 'habits', front: 'Four privacy habits?', back: 'Minimize, know your vendors, limit access, delete on a schedule.' },
    { id: 'copies', front: 'Every copy of personal data is…?', back: 'Another place to protect. Fewer copies, less risk.' },
    { id: 'hipaa', front: 'US health data and vendors?', back: 'Generally HIPAA-protected; vendors may need a BAA. Check before sending data.' },
    { id: 'chat', front: 'Personal data in chat alerts?', back: 'Minimum to act: first name + “see the CRM”.' },
  ],
};
