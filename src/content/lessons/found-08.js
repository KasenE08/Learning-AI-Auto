// M01 · L08 · Logins, keys, and permissions
export default {
  steps: [
    { tag: 'example', title: '“Allow access?”', visualFirst: true,
      visual: { type: 'exchange', actors: ['Automation tool', 'Client’s calendar app'], messages: [
        { from: 0, to: 1, label: 'Please let me in', kind: 'request', note: 'The client clicks “Connect calendar” in your builder.' },
        { from: 1, to: 0, label: 'Client signs in and approves: read + create events', kind: 'event', body: { allowed: ['See your events', 'Create events'], not_allowed: ['Delete events', 'Change settings'] } },
        { from: 1, to: 0, label: 'Here’s an access token', kind: 'response', body: { token: '•••••• (secret)', expires: 'in 1 hour, refreshed automatically', scopes: 'read, create' } },
        { from: 0, to: 1, label: 'Create event (shows the token)', kind: 'request' },
      ] },
      body: ['This is what happens when a client connects an app. Notice what the token **can’t** do.'],
      check: {
        type: 'mc', q: 'Did the automation tool ever see the client’s calendar password?',
        options: ['No. It got a token with limited permissions instead', 'Yes, it stored the password', 'Yes, in the first request', 'Only if the client typed it into the builder'], answer: 0,
        why: 'The client signed in on the calendar app’s own page. The tool only received a token that allows reading and creating events.',
      },
      stuck: {
        metaphor: 'A hotel key card: front desk checks your ID once, then hands you a card that opens your room and the gym, not every room, and it stops working at checkout.',
        worked: ['The client signed in on the calendar’s side.', 'The calendar issued a token with two permissions.', 'The tool shows the token each time; the password never left the calendar app.'],
      },
    },
    { tag: 'how', title: 'Two common ways apps let you in',
      predict: {"q": "A client clicks “Connect calendar” and approves access. What does your automation tool receive?", "options": ["A token with limited permissions", "Their calendar password", "A copy of the calendar app", "Nothing"], "answer": 0, "why": "That’s OAuth: the person signs in on the app’s own page, and your tool gets a scoped token."},
      body: [
        '[[oauth|OAuth]] (“Sign in with… / Allow access”): the person signs in on the app’s own page and approves [[scope|scopes]]. Your tool gets a token, not the password. Access can be revoked.',
        '[[api-key|API key]]: a long secret string the account owner creates in the app’s settings and pastes into your tool. Simple, but whoever holds it can act as that account.',
        'Either way, your builder stores the connection once. Every block that uses that app reuses it.',
      ] },
    { tag: 'see', title: 'Who owns the connection?',
      predict: {"q": "You build in your own accounts. The client leaves after a year. What happens?", "options": ["A messy handover: their workflows live in your accounts", "Nothing changes", "The client keeps everything automatically", "The tools move themselves"], "answer": 0, "why": "Build in the client’s accounts, with you added as a removable user. Leaving is then clean."},
      visual: { type: 'compare', cols: ['', 'Client’s own account', 'Your account'], rows: [
        ['Who pays for the tools', 'Client', 'You (bill it back)'],
        ['If you part ways', 'Client keeps everything', 'Messy handover'],
        ['Data responsibility', 'Mostly the client’s', 'More of it falls on you'],
        ['Best for', 'Most client work', 'Your own internal workflows'],
      ], pick: 0 },
      body: ['A common, safer setup: build in the client’s accounts, with your own login added as a user they can remove.'] },
    { tag: 'try', title: 'Your turn: least access',
      check: {
        type: 'mc', scenario: 'You’re automating “add new leads to the CRM”. The CRM asks which permissions to grant.',
        q: 'Which do you request?', options: ['Create and read contacts only', 'Full admin access, to be safe', 'Everything, including billing', 'Read-only'], answer: 0,
        why: 'Ask for the least access that does the job. If the connection leaks, less can go wrong. Read-only wouldn’t let you add leads.',
        wrong: { 1: '“To be safe” is backwards: more access means more damage if anything goes wrong.' },
      } },
    { tag: 'warn', title: 'Treat keys like passwords',
      predict: {"q": "An API key is accidentally pasted in a group chat. What’s the right move?", "options": ["Revoke it and create a new one", "Delete the message", "Ask people not to use it", "Nothing"], "answer": 0, "why": "Once exposed, assume it’s compromised. Revoking makes the old key useless."},
      body: [
        'Never paste API keys into emails, chat, docs, or AI chats. Use the builder’s connection settings.',
        'If a key leaks, the account owner deletes it and makes a new one. Deleting it is called **revoking**.',
        'Connections break when passwords change, people leave, or tokens expire. That shows up as 401 errors (Module 6 covers alerts).',
      ] },
  ],
  quiz: [
    { type: 'mc', q: 'What does your tool receive with OAuth?', options: ['A token with limited permissions', 'The user’s password', 'A copy of the whole app', 'An API key the user typed in'], answer: 0, why: 'OAuth hands over a scoped token. The password stays with the app.' },
    { type: 'mc', q: 'Where should an API key live?', options: ['In the builder’s connection settings', 'In a shared doc so the team can find it', 'In the workflow’s email body', 'In a chat message to the client'], answer: 0, why: 'Keys belong in the tool’s secure connection storage only.' },
    { type: 'mc', scenario: 'A contractor who built automations for a client leaves. Their personal API key powers every workflow.', q: 'What’s the risk?',
      options: ['Workflows break when the key is revoked, and the contractor kept access until then', 'None; keys last forever', 'The client loses all their data', 'The builder deletes the workflows'], answer: 0,
      why: 'Connections tied to a person break when they leave, and access lingers. Use client-owned accounts and service connections.' },
    { type: 'multi', q: 'Which follow “least access”?', options: ['Read-only for a reporting workflow', 'Admin rights so nothing ever fails', 'Access to one shared inbox, not all mailboxes', 'Your personal account for a client’s production workflow'], answer: [0, 2],
      why: 'Grant only what the job needs, on accounts that belong to the right owner.' },
  ],
  cards: [
    { id: 'oauth', front: 'OAuth in one line?', back: 'User signs in on the app’s page and approves scopes; your tool gets a limited token, not the password.' },
    { id: 'apikey', front: 'API key?', back: 'A secret string that lets software act as an account. Treat it like a password.' },
    { id: 'scope', front: 'What is a scope?', back: 'One permission in a connection, like “read contacts” or “create events”.' },
    { id: 'least', front: 'Least access?', back: 'Grant only the permissions the workflow needs.' },
    { id: 'owner', front: 'Whose accounts should client automations run on?', back: 'Usually the client’s, with you added as a removable user.' },
  ],
};
