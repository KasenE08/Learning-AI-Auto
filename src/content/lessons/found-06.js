// M01 · L06 · APIs: apps asking apps
export default {
  steps: [
    { tag: 'example', title: 'Your workflow asks the CRM a question', visualFirst: true,
      visual: { type: 'exchange', actors: ['Your workflow', 'CRM'], messages: [
        { from: 0, to: 1, label: 'GET contact where email = dana.reyes@example.com', kind: 'request', body: { method: 'GET', endpoint: '/contacts', search: 'email = dana.reyes@example.com', key: '•••••• (secret)' } },
        { from: 1, to: 0, label: '200 OK + the contact', kind: 'response', body: { status: '200 OK', id: 'c1', name: 'Dana Reyes', last_visit: '2026-08-14' } },
        { from: 0, to: 1, label: 'PATCH contact c1: add note', kind: 'request', body: { method: 'PATCH', endpoint: '/contacts/c1', note: 'Booked again: chipped tooth' } },
        { from: 1, to: 0, label: '200 OK', kind: 'response', body: { status: '200 OK', updated: 'yes' } },
      ] },
      body: ['Step through it. Every “Find” or “Update” block in a builder does exactly this behind the scenes.'],
      check: {
        type: 'mc', q: 'What did the workflow need to send so the CRM knew **which** contact to update?',
        options: ['The contact’s ID, c1, that came back from the first answer', 'The patient’s name', 'Nothing; the CRM remembers', 'The whole contact list'], answer: 0,
        why: 'The first request found the contact and the response included its ID. The update used that ID to say exactly which record to change.',
      },
      stuck: {
        metaphor: 'Calling a store: “Do you have my order under Dana Reyes?” “Yes, it’s order 1042.” “Great, add a note to order 1042.”',
        worked: ['Request 1 asked: find the contact with this email.', 'Response 1 answered with id c1.', 'Request 2 used c1 in its address: /contacts/c1.'],
      },
    },
    { tag: 'how', title: 'An API is a menu of requests',
      predict: {"q": "Your workflow wants to change a contact’s phone number. Which request method fits?", "options": ["PATCH (update)", "GET (read)", "DELETE (remove)", "POST (create)"], "answer": 0, "why": "Updates use PATCH or PUT. GET reads, POST creates, DELETE removes."},
      body: ["An [[api]] is the list of things an app lets other software ask for: find, create, update, send.", "Each request goes to an [[endpoint]] with a method: GET (read), POST (create), PATCH/PUT (update), DELETE (remove). The app answers with a [[status-code]].", "No-code builders wrap all this in friendly blocks: you pick “Find contact”, the builder writes the request."] },
    { tag: 'see', title: 'Status codes you’ll see in logs',
      visual: {"type": "sort", "cols": ["Retry later", "Fix the request", "Fix the connection"], "items": [{"text": "429 Too many requests", "col": 0}, {"text": "500 Server error", "col": 0}, {"text": "400 “amount must be a number”", "col": 1}, {"text": "404 Not found", "col": 1, "why": "The record or address doesn’t exist; retrying won’t create it."}, {"text": "401 Unauthorized", "col": 2}, {"text": "403 Forbidden", "col": 2}], "prompt": "What should you do about each error?"},
      
      body: ["2xx = worked. 4xx = your request has a problem. 5xx = the other side has a problem.", "429 and 5xx are usually temporary; 400 and 404 fail the same way until you change something.", "401 and 403 mean the login or permissions need fixing."] },
    { tag: 'try', title: 'Your turn: read the error',
      body: ['A workflow log says: **“Create invoice failed: 400. Field ‘amount’ must be a number.”**'],
      check: {
        type: 'mc', q: 'What’s the most likely fix?', options: ['Map a number (or convert the text to a number) into Amount', 'Wait an hour and retry', 'Reconnect the invoicing account', 'Contact the invoicing app’s support'], answer: 0,
        why: '400 means your request was wrong, and the message says how: Amount got text. Retrying the same bad request gives the same error.',
        wrong: { 1: 'Waiting helps with 429 and 5xx. A 400 will fail the same way every time.', 2: 'That’s the fix for 401/403.' },
      } },
    { tag: 'biz', title: 'Why this matters for your business',
      predict: {"q": "A website says an app “integrates with your CRM”. What should you check before quoting?", "options": ["That it supports the exact action you need, like updating a deal", "Nothing; integrates means everything works", "Its logo", "How many users it has"], "answer": 0, "why": "“Integrates” can mean one tiny action. Check the specific verb you need."},
      body: [
        'Before quoting a job, check that each app has an API (or a ready-made block in your builder) for the exact action you need.',
        '“It integrates with X” on a website can mean one tiny action. Look for the specific verb: can it **update** a deal, not just create one?',
        'If there’s no API, there’s usually no reliable automation. Scraping screens or emails is fragile; price that risk in or walk away.',
      ] },
  ],
  quiz: [
    { type: 'mc', q: 'What is an API?', options: ['The set of requests an app lets other software make', 'A kind of database', 'An AI model', 'A website’s design'], answer: 0, why: 'An API is a menu: the requests the app accepts and what it sends back.' },
    { type: 'mc', q: 'Which method creates something new?', options: ['POST', 'GET', 'DELETE', '404'], answer: 0, why: 'POST creates or sends. GET reads. 404 isn’t a method; it’s a status code.' },
    { type: 'mc', scenario: 'Every run of a client’s workflow suddenly fails with 401 after they changed their CRM password.', q: 'What do you do?',
      options: ['Reconnect the CRM account in the builder', 'Rebuild the whole workflow', 'Wait for the CRM to fix it', 'Change the status code'], answer: 0,
      why: '401 = not authenticated. The saved login no longer works, so reconnect it (next lesson covers logins and keys).' },
    { type: 'multi', q: 'Which errors are usually worth retrying later, unchanged?', options: ['429 Too many requests', '500 Server error', '400 Bad request', '404 Not found'], answer: [0, 1],
      why: '429 and 5xx are temporary. 400 and 404 will fail the same way until you change the request.' },
  ],
  cards: [
    { id: 'api', front: 'What is an API?', back: 'The menu of requests an app accepts from other software, and what it answers.' },
    { id: 'methods', front: 'GET, POST, PATCH, DELETE?', back: 'Read, create/send, update, remove.' },
    { id: 'codes', front: '2xx, 4xx, 5xx?', back: '2xx worked. 4xx your request has a problem. 5xx the other app has a problem.' },
    { id: '429', front: 'What does 429 mean?', back: 'Too many requests. Slow down and retry later.' },
    { id: 'verb', front: 'Before quoting, what do you check about an app’s API?', back: 'That it supports the exact action (verb) you need, not just “integrates with X”.' },
  ],
};
