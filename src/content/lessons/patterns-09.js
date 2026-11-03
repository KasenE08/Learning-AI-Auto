// M03 · L09 · Reusable sub-workflows
export default {
  steps: [
    { tag: 'example', title: 'Three workflows, one copy-pasted block', visualFirst: true,
      visual: { type: 'compare', cols: ['Workflow', 'Contains'], rows: [
        ['Website form → CRM', 'Clean name, normalize email, find-or-create contact'],
        ['Phone lead → CRM', 'Clean name, normalize email, find-or-create contact'],
        ['Ad lead → CRM', 'Clean name, normalize email, find-or-create contact'],
      ] },
      body: ['A gym’s three lead sources each have the same three steps pasted in. The client now wants every contact tagged with a source.'],
      check: {
        type: 'mc', q: 'With this setup, how many places do you edit to add the tag?',
        options: ['3, and you must keep them identical forever', '1', '0', 'It can’t be done'], answer: 0,
        why: 'Copies drift. One gets fixed, two don’t. A shared [[sub-workflow]] means one edit.',
      },
      stuck: {
        metaphor: 'Three printed copies of a recipe. Fix a typo in one, and the other two still have it.',
        worked: ['The same steps exist in three workflows.', 'A change has to be made in each.', 'So 3 edits, and a risk of missing one.'],
      },
    },
    { tag: 'how', title: 'Call one workflow from another',
      body: [
        'A sub-workflow is a workflow that other workflows call, like a shared function: inputs in, result out.',
        'Example: “Save lead” takes name, email, phone, source; returns the contact ID. All three lead workflows call it.',
        'Many builders support this directly (“run another workflow”), or you trigger it with a webhook.',
        'Benefits: one place to fix, consistent data, easier testing. Cost: an extra hop, and one more thing that must stay on.',
      ] },
    { tag: 'try', title: 'Your turn: what goes in the sub-workflow?',
      check: {
        type: 'multi', q: 'Which steps are shared by every lead source and belong in “Save lead”?',
        options: ['Normalize the email', 'Find or create the CRM contact', 'Parse the website form’s special fields', 'Tag the contact with its source'], answer: [0, 1, 3],
        why: 'Shared steps go in the sub-workflow. Source-specific parsing stays in each caller; it passes clean inputs in.',
      } },
    { tag: 'biz', title: 'Reusable pieces are reusable products',
      body: [
        'Sub-workflows are also how you get faster across clients: “save lead”, “alert on failure”, “daily digest” become your own toolkit.',
        'Module 12 turns this into productized services. Start naming and saving good pieces now.',
      ] },
  ],
  quiz: [
    { type: 'mc', q: 'What is a sub-workflow?', options: ['A workflow other workflows call with inputs, returning a result', 'A workflow that runs at night', 'A deleted workflow', 'A workflow with no trigger at all'], answer: 0, why: 'Shared logic in one place.' },
    { type: 'mc', q: 'Biggest benefit?', options: ['Fix or change shared logic in one place', 'Fewer tasks, always', 'No testing needed', 'Faster to draw'], answer: 0, why: 'Copies drift; one shared piece stays consistent.' },
    { type: 'mc', scenario: 'The shared “Save lead” sub-workflow is accidentally turned off.', q: 'What happens?', options: ['Every workflow that calls it fails at that step', 'Only one lead source breaks', 'Nothing', 'The CRM saves leads by itself'], answer: 0, why: 'Shared pieces are shared risks. Monitor them (Module 6).' },
  ],
  cards: [
    { id: 'sub', front: 'Sub-workflow?', back: 'A workflow other workflows call: inputs in, result out.' },
    { id: 'drift', front: 'Problem with copy-pasted steps?', back: 'Copies drift: one gets fixed, others don’t.' },
    { id: 'split', front: 'What stays in the caller vs the sub-workflow?', back: 'Source-specific parsing in the caller; shared steps in the sub-workflow.' },
  ],
};
