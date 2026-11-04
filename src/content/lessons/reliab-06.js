// M06 · L06 · Security: secrets and access
export default {
  steps: [
    { tag: 'example', title: 'A screenshot in a group chat', visualFirst: true,
      visual: { type: 'record', title: 'What was visible in the screenshot', data: { workflow: 'Invoice sync', step: 'Connect to invoicing app', api_key: 'sk_live_8fK2…(full key visible)', shared_in: 'A 40-person community chat, asking for help' } },
      body: ['A freelancer posted a screenshot to ask why a step failed. (Fake key, fake story.)'],
      check: {
        type: 'mc', q: 'What should happen first?',
        options: ['Revoke that key and create a new one, then reconnect', 'Delete the message and hope', 'Change the workflow’s name', 'Nothing; screenshots are private'], answer: 0,
        why: 'Once a [[secret]] is exposed, assume it’s compromised. Revoke and replace it; deleting the message doesn’t un-share it.',
      },
      stuck: {
        metaphor: 'If you post a photo of your house key online, you change the lock. Deleting the photo doesn’t un-copy the key.',
        worked: ['The key was visible to 40+ people.', 'Anyone could have copied it.', 'So revoke it and issue a new one.'],
      },
    },
    { tag: 'how', title: 'Security habits for a solo builder',
      visual: {"type": "sort", "cols": ["Safe", "Unsafe"], "items": [{"text": "API key stored in a password manager", "col": 0}, {"text": "Key pasted into an AI chat to debug", "col": 1, "why": "Keys never go into chats, including AI chats."}, {"text": "2-factor sign-in on the automation tool", "col": 0}, {"text": "One shared admin login for the whole team", "col": 1}, {"text": "Client adds you as a removable user", "col": 0}, {"text": "Webhook URL posted in a public forum", "col": 1}], "prompt": "Sort each practice."},
      body: ["**Secrets** live only in connection settings or a password manager. [[least-privilege|Least privilege]] for every connection.", "**Client-owned accounts** with you as a removable user; 2-factor everywhere.", "**Offboarding:** the client removes your access; you confirm in writing."] },
    { tag: 'try', title: 'Your turn: safe or not?',
      check: {
        type: 'multi', q: 'Which practices are safe?',
        options: ['Storing API keys in a password manager', 'Pasting a key into Claude to ask why a request fails', 'Using 2-factor sign-in on the automation tool', 'Sharing one admin login with the client’s whole team', 'Giving a reporting workflow read-only access'], answer: [0, 2, 4],
        why: 'Keys never go into chats (including AI chats). Shared admin logins remove accountability. Use individual accounts.',
      } },
    { tag: 'biz', title: 'Security is part of what you sell',
      predict: {"q": "A cautious owner worries about giving you access. What helps most?", "options": ["A one-page security note: where secrets live, what access, how it’s removed", "Promising you’re trustworthy", "Asking for their password", "Avoiding the topic"], "answer": 0, "why": "Clear, written answers to their worry build trust and close deals."},
      body: [
        'Clients worry about “giving an outsider access”. A one-page security note (where secrets live, what access you need, how it’s removed) builds trust and closes deals.',
        'Keep a simple access register per client: which systems, which scopes, granted when, removed when.',
      ] },
  ],
  quiz: [
    { type: 'mc', q: 'A key was exposed. First step?', options: ['Revoke and replace it', 'Delete the message', 'Wait and see', 'Rename the workflow'], answer: 0, why: 'Assume compromise once exposed.' },
    { type: 'multi', q: 'Where may secrets live?', options: ['Builder connection settings', 'A password manager', 'A shared doc', 'An email to the client'], answer: [0, 1], why: 'Only secure stores.' },
    { type: 'mc', scenario: 'A project ends. You still have admin access to the client’s CRM.', q: 'What should happen?', options: ['The client removes your access, and you confirm in writing', 'Keep it in case they call', 'Delete their data', 'Change their password yourself'], answer: 0, why: 'Clean offboarding protects both of you.' },
  ],
  cards: [
    { id: 'secrets', front: 'Where do secrets live?', back: 'Builder connection settings or a password manager. Never docs, chats, screenshots, AI chats.' },
    { id: 'exposed', front: 'Secret exposed?', back: 'Revoke and replace it immediately.' },
    { id: 'register', front: 'Access register?', back: 'Per client: which systems, which scopes, granted when, removed when.' },
    { id: 'offboard', front: 'Project ends?', back: 'Client removes your access; you confirm in writing.' },
  ],
};
