// M04 · L02 · Email: send, parse, deliver
export default {
  steps: [
    { tag: 'example', title: 'Why the receipts went to spam', visualFirst: true,
      visual: { type: 'compare', cols: ['', 'Before', 'After'], rows: [
        ['Sent from', 'A new automation tool, using the shop’s address, no setup', 'Same address, domain set up with SPF, DKIM, DMARC'],
        ['Unsubscribe link (newsletter)', 'Missing', 'One-click'],
        ['Where receipts land', 'Spam folder', 'Inbox'],
      ], pick: 1 },
      body: ['A bakery started sending order receipts from an automation. Customers said they never got them.'],
      check: {
        type: 'mc', q: 'What most likely fixed it?',
        options: ['Proving the emails really come from the bakery’s domain', 'Writing nicer subject lines', 'Sending at night', 'Using more images'], answer: 0,
        why: 'Inbox providers check that mail claiming to be from a domain is authorized by it. That’s [[email-auth|SPF, DKIM, and DMARC]].',
      },
      stuck: {
        metaphor: 'A letter on company letterhead but posted from a random mailbox. The mailroom gets suspicious unless the company has said “yes, that mailbox is ours”.',
        worked: ['The new tool sent “as” the bakery without authorization.', 'Inbox providers flagged it as possibly fake.', 'Setting up SPF/DKIM/DMARC authorizes it.'],
      },
    },
    { tag: 'how', title: 'Two kinds of email, two sets of rules',
      visual: {"type": "sort", "cols": ["Transactional", "Marketing"], "items": [{"text": "Order receipt", "col": 0}, {"text": "Monthly newsletter", "col": 1}, {"text": "Appointment confirmation", "col": 0}, {"text": "Holiday promotion", "col": 1}, {"text": "Password reset", "col": 0}, {"text": "Cold outreach to a business", "col": 1, "why": "Unrequested commercial email is marketing, with its own rules."}], "prompt": "Sort each email."},
      body: [
        '**Transactional:** triggered by something the person did: receipts, confirmations, password resets. Expected, one-to-one.',
        '**Marketing:** newsletters, promotions, cold outreach. Needs consent and a working unsubscribe (Module 13).',
        'Keep them apart. Many businesses send marketing from a separate address or subdomain so a bad campaign can’t sink the receipts.',
      ] },
    { tag: 'see', title: 'Deliverability basics',
      predict: {"q": "Receipts from a new automation land in spam. What most likely fixes it?", "options": ["Setting up SPF, DKIM and DMARC on the client’s domain", "Better subject lines", "More images", "Sending at night"], "answer": 0, "why": "Inbox providers check that mail claiming to come from a domain is authorized by it."},
      body: [
        '[[deliverability|Deliverability]] = landing in the inbox, not spam. It’s earned by authentication, low complaint rates, and sending things people expect.',
        'Since 2024, Gmail and Yahoo require bulk senders to authenticate with SPF, DKIM and DMARC, offer one-click unsubscribe, and keep spam complaints low (their stated ceiling is 0.3%).',
        'Your role: check the client’s domain setup before launching email automations, and send from their domain, not a tool’s default.',
      ] },
    { tag: 'try', title: 'Your turn: parsing incoming email',
      body: ['Automations also **read** email: job requests, orders from suppliers, form notifications.'],
      check: {
        type: 'mc', q: 'A supplier emails invoices as PDFs with different layouts each time. Best way to get the amount and due date?',
        options: ['An AI extract step on the PDF text, with “leave empty if missing” and a check', 'A rule: “the amount is always on line 7”', 'Forward them all to the owner', 'Ignore PDFs'], answer: 0,
        why: 'Varying layouts break fixed rules. AI extraction handles variety; validate the result (is it a number? is a date present?) before using it.',
      } },
    { tag: 'warn', title: 'Email traps',
      predict: {"q": "An auto-reply answers another auto-reply, which answers back… What is this?", "options": ["A mail loop", "A digest", "A sequence", "Spam filtering"], "answer": 0, "why": "Filter out your own address and no-reply senders to prevent loops."},
      body: [
        'Mail loops: an auto-reply that answers auto-replies. Filter out messages from your own address and “no-reply” senders.',
        'Threading: replies should keep the subject (Re: …) so the conversation stays together.',
        'Test sends go to **your** address with fake data, never to real customers.',
      ] },
  ],
  quiz: [
    { type: 'multi', q: 'Which are transactional emails?', options: ['Order receipt', 'Monthly newsletter', 'Appointment confirmation', 'Holiday promotion', 'Password reset'], answer: [0, 2, 4], why: 'Triggered by the person’s own action, one-to-one.' },
    { type: 'mc', q: 'What do SPF, DKIM and DMARC do?', options: ['Prove mail claiming to be from a domain is authorized by it', 'Encrypt the message', 'Shorten links', 'Count opens'], answer: 0, why: 'They’re email authentication. Without them, mail is more likely flagged.' },
    { type: 'mc', scenario: 'A client wants to send promotions from the same address as their invoices.', q: 'What do you advise?', options: ['Separate address or subdomain for marketing, so complaints can’t hurt invoices', 'Same address is fine', 'Stop sending invoices by email', 'Use a free webmail address'], answer: 0, why: 'Protect the critical transactional mail.' },
    { type: 'mc', q: 'What’s a mail loop?', options: ['Automations replying to each other forever', 'A newsletter series', 'A type of spam filter', 'Email threading'], answer: 0, why: 'Filter out auto-replies and your own address.' },
  ],
  cards: [
    { id: 'types', front: 'Transactional vs marketing email?', back: 'Transactional: triggered by the person’s action (receipts). Marketing: promotions; needs consent + unsubscribe.' },
    { id: 'auth', front: 'SPF, DKIM, DMARC?', back: 'Email authentication: proof that mail from a domain is authorized by it.' },
    { id: 'bulk', front: 'Gmail/Yahoo bulk sender basics (since 2024)?', back: 'Authenticate, one-click unsubscribe, keep spam complaints low (ceiling 0.3%).' },
    { id: 'parse', front: 'Reading varied PDFs/emails?', back: 'AI extraction with leave-empty rules, then validate before using the values.' },
  ],
};
