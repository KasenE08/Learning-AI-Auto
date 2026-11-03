// M04 · L09 · Payments as triggers
export default {
  steps: [
    { tag: 'example', title: 'What a payment app tells you', visualFirst: true,
      visual: { type: 'compare', cols: ['Event (webhook)', 'What the business wants'], rows: [
        ['Payment succeeded', 'Mark invoice paid, thank-you receipt, update CRM'],
        ['Payment failed', 'Polite retry notice, task for the owner if it fails again'],
        ['Refund issued', 'Update records, adjust revenue report'],
        ['Dispute opened', 'Alert the owner immediately: deadline to respond'],
        ['Subscription cancelled', 'Win-back email, update membership'],
      ] },
      body: ['Payment apps send an event for each of these. Each is a trigger you can build on.'],
      check: {
        type: 'mc', q: 'Which event needs the **fastest** human attention?',
        options: ['Dispute opened', 'Payment succeeded', 'Refund issued', 'Subscription cancelled'], answer: 0,
        why: 'A [[chargeback|dispute]] has a response deadline, and losing it costs the payment plus fees. Instant alert to a person.',
      },
      stuck: {
        metaphor: 'Most mail is bills and receipts. A court notice with a deadline goes straight to the top of the pile.',
        worked: ['Succeeded, refund, cancelled: routine updates.', 'Dispute: deadline + money at risk.', 'So disputes get the instant alert.'],
      },
    },
    { tag: 'how', title: 'Rules for money workflows',
      body: [
        'Trigger on the payment app’s **events** (webhooks), not on a “paid” email in someone’s inbox.',
        'Webhooks can arrive twice or out of order. Match on the payment ID and make steps [[idempotency|idempotent]] (Module 3).',
        'Never handle card numbers yourself. The payment app holds them; your workflow only sees IDs, amounts, and status.',
        'Automate records and messages. Keep refunds and price changes behind approval.',
      ] },
    { tag: 'try', title: 'Your turn: dunning',
      body: ['Recovering failed payments with a series of reminders is called [[dunning]].'],
      check: {
        type: 'order', q: 'Order a gentle dunning sequence for a failed membership payment.',
        items: ['Payment failed event', 'Email: “Your card didn’t go through, update it here”', 'Wait 3 days; check if paid', 'If not, text (with consent) a reminder', 'Wait 4 days; if still unpaid, create a task for the owner'],
        why: 'Event, friendly notice, wait-and-check, second channel, then a human. Stop the moment it’s paid.',
      } },
    { tag: 'biz', title: 'Easy ROI to show',
      body: [
        'Failed-payment recovery is one of the clearest wins: every recovered payment is money the client would have lost.',
        'Track it: “recovered $1,240 this month” is a case-study line (Module 11).',
      ] },
  ],
  quiz: [
    { type: 'mc', q: 'Best trigger for “invoice paid”?', options: ['The payment app’s payment-succeeded event', 'A “paid” email in the inbox', 'Checking the bank statement weekly', 'The customer saying so'], answer: 0, why: 'Trigger on the real event, not an echo.' },
    { type: 'mc', q: 'A payment webhook arrives twice. What prevents two receipts?', options: ['Checking the payment ID was already handled', 'Ignoring all webhooks', 'Sending receipts weekly', 'Asking customers to delete one'], answer: 0, why: 'Idempotency by unique ID.' },
    { type: 'mc', q: 'Should your workflow store card numbers?', options: ['No. The payment app holds them; you use IDs and status', 'Yes, in the CRM', 'Yes, encrypted in a sheet', 'Only the last 8 digits'], answer: 0, why: 'Keep card data out of your systems entirely.' },
    { type: 'multi', q: 'Which deserve human approval?', options: ['Issuing a refund', 'Sending a receipt', 'Changing a customer’s price', 'Marking an invoice paid after a success event'], answer: [0, 2], why: 'Money out and price changes. Receipts and records are routine.' },
  ],
  cards: [
    { id: 'events', front: 'Key payment events?', back: 'Succeeded, failed, refunded, dispute opened, subscription cancelled.' },
    { id: 'dispute', front: 'Dispute opened → ?', back: 'Instant alert to a person; there’s a response deadline.' },
    { id: 'dunning', front: 'Dunning?', back: 'A reminder sequence to recover failed payments; stops when paid.' },
    { id: 'cards', front: 'Card numbers in your workflows?', back: 'Never. Use IDs, amounts, and status.' },
  ],
};
