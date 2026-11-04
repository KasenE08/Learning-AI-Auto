// CAP · L05 · Build it in the sandbox
export default {
  steps: [
    { tag: 'example', title: 'The system you promised', visualFirst: true,
      visual: { type: 'flow', nodes: [
        { label: 'Appointment form submitted', kind: 'trigger' },
        { label: 'AI: urgent / routine / spam (fixed)', kind: 'ai' },
        { label: 'Only continue if not spam', kind: 'logic' },
        { label: 'Find or create owner in CRM', kind: 'action' },
        { label: 'Split: urgent or otherwise', kind: 'logic', branches: [
          { label: 'Urgent', nodes: [{ label: 'Text on-call vet', kind: 'action' }, { label: 'Ping #front-desk (pet name only)', kind: 'action' }, { label: 'Confirm to owner (text if OK, else email)', kind: 'logic' }] },
          { label: 'Otherwise', nodes: [{ label: 'Calendar hold', kind: 'action' }, { label: 'Confirm to owner (text if OK, else email)', kind: 'logic' }] },
        ] },
      ] },
      body: ['Your design from the proposal. Notice where the owner confirmation sits.'],
      check: {
        type: 'mc', q: 'Why is “confirm to owner” inside **both** paths instead of once at the end?',
        options: ['In this builder, steps after a router don’t run; each path must finish its own work', 'To send two confirmations', 'It’s a mistake', 'Confirmations must come first'], answer: 0,
        why: 'Paths don’t merge back in the sandbox (many real tools work the same way). So each path ends with its own confirmation split.',
      },
      stuck: {
        metaphor: 'Two hallways that never rejoin: if both lead to an exit, each needs its own exit sign.',
        worked: ['After the split, a record only follows one path.', 'Nothing after the router runs.', 'So each path confirms on its own.'],
      },
    },
    { tag: 'how', title: 'The traps in Riverbend’s data',
      visual: { type: 'sort', prompt: 'Match each trap to how your build handles it.', cols: ['Upsert', 'Consent split', 'Alert on failure', 'Spam filter'], items: [
        { text: 'Maria books twice for Biscuit', col: 0 },
        { text: 'Jen said “no” to texts', col: 1 },
        { text: 'Greg’s email is mistyped and he said no to texts', col: 2, why: 'His email confirmation will fail; the team must hear about it.' },
        { text: 'An SEO company fills in the form', col: 3 },
        { text: 'Ana gave no phone number', col: 1, why: 'She said no to texts anyway, so she gets an email.' },
        { text: 'JEN.PARK@EXAMPLE.COM in capitals', col: 0, why: 'Find-or-create matches emails without caring about capitals.' },
      ] },
      body: ['Every trap maps to a pattern from Modules 3, 4 and 6.', 'Look at the test data tab before building.'] },
    { tag: 'build', title: 'Build it', build: { challenge: 'capstone-build' },
      body: ['Nine checks. You need all nine for the capstone to count.', 'Use the Results tab after each run to see exactly what happened to every record.'] },
    { tag: 'try', title: 'Your turn: debug a run',
      check: {
        type: 'mc', scenario: 'Your first run: Biscuit’s urgent request texted the vet, but Biscuit’s owner got no confirmation, and the run shows “Finished”.',
        q: 'Most likely cause?', options: ['The confirmation steps are after the router, so they never run', 'The vet’s phone is wrong', 'Maria’s email is invalid', 'The AI said spam'], answer: 0,
        why: 'A “Finished” run with a missing step usually means the step sits where the record never goes. Move it inside each path.',
      } },
  ],
  quiz: [
    { type: 'mc', q: 'Where must the spam filter sit?', options: ['Before the CRM step', 'After the CRM step', 'At the end', 'Nowhere'], answer: 0, why: 'Spam must never reach the CRM.' },
    { type: 'multi', q: 'Which confirmation steps need “alert on failure”?', options: ['Email to owner', 'Text to owner', 'Calendar hold', 'Classify step'], answer: [0, 1], why: 'Those are the ones that can fail on bad contact details.' },
    { type: 'mc', q: 'What may the #front-desk ping contain?', options: ['The pet’s name and “urgent, see CRM”', 'The owner’s phone', 'The owner’s full name and email', 'The full form'], answer: 0, why: 'Minimum data in chat.' },
  ],
  cards: [
    { id: 'paths', front: 'Steps after a router in the sandbox?', back: 'Don’t run. Each path finishes its own work.' },
    { id: 'traps', front: 'Riverbend’s traps?', back: 'Duplicate owner, no-text consent, bad email, missing phone, capitals, spam.' },
    { id: 'nine', front: 'Capstone sandbox requirement?', back: 'All nine checks passing.' },
  ],
};
