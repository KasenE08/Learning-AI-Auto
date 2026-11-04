// M12 · L08 · Capacity: how many clients
const cap = {
  type: 'calc',
  inputs: [
    { key: 'week', label: 'Hours you want to work per week', min: 15, max: 60, value: 40 },
    { key: 'sales', label: 'Weekly hours on sales, admin, learning', min: 2, max: 25, value: 12 },
    { key: 'per', label: 'Monthly hours per retainer client (support, review, report)', min: 1, max: 15, step: 0.5, value: 4 },
    { key: 'builds', label: 'New builds per month', min: 0, max: 6, value: 1 },
    { key: 'bh', label: 'Hours per new build', min: 5, max: 40, value: 12 },
  ],
  outputs: [
    { label: 'Monthly hours available for clients', f: (v) => (v.week - v.sales) * 52 / 12, fmt: 'hours' },
    { label: 'Hours left after new builds', f: (v) => (v.week - v.sales) * 52 / 12 - v.builds * v.bh, fmt: 'hours' },
    { label: 'Max retainer clients', f: (v) => Math.floor(((v.week - v.sales) * 52 / 12 - v.builds * v.bh) / v.per), fmt: 'num', big: true },
  ],
  caption: 'Example inputs. Track your real hours per client for a month to get your own numbers.',
};
export default {
  steps: [
    { tag: 'example', title: 'How many clients can one person carry?', visualFirst: true, visual: cap,
      body: ['Drag the sliders. The biggest lever is hours per client.'],
      check: {
        type: 'mc', q: 'Which change raises capacity most at the starting values?',
        options: ['Cutting hours per client from 4 to 2 (templates, agents, fewer issues)', 'Working 2 more hours a week', 'One fewer build a month', 'Nothing changes it'], answer: 0,
        why: 'Halving per-client hours roughly doubles capacity. That’s what productizing, monitoring and agents buy you.',
      },
      stuck: {
        metaphor: 'A bus holds more people if each person takes less space, not just if you add one more seat.',
        worked: ['At 4 h/client: about 23 clients.', 'At 2 h/client: about 47.', 'Per-client hours are the big lever.'],
      },
    },
    { tag: 'how', title: 'Capacity math',
      predict: {"q": "Halving your hours per client roughly does what to capacity?", "options": ["Doubles it", "Halves it", "Nothing", "Adds 10%"], "answer": 0, "why": "Hours per client is the biggest lever."},
      body: ["Monthly client hours = (weekly hours − sales/admin) × 52 ÷ 12, minus new-build hours.", "Divide by hours per retainer client, and keep 10–20% headroom.", "Revenue ceiling = clients × retainer + builds × setup. Raise it with price."] },
    { tag: 'try', title: 'Your turn: compute it',
      check: {
        type: 'num', q: '120 monthly client hours available, 1 build of 20 hours, 4 hours per retainer client. Max retainer clients?', answer: 25, tol: 0,
        why: '(120 − 20) ÷ 4 = **25** clients (before headroom).',
      } },
    { tag: 'biz', title: 'Choose your number',
      predict: {"q": "You hit your client cap and demand keeps coming. Best move in a solo business?", "options": ["Raise prices for new clients", "Squeeze in more", "Drop quality checks", "Lower prices"], "answer": 0, "why": "Higher value per client keeps you at one-person scale."},
      body: ['Decide a client cap that keeps your review quality high (lesson 7). When you hit it, raise prices for new clients or tighten the package instead of squeezing in more.'] },
  ],
  quiz: [
    { type: 'num', q: '35 hours/week, 10 on sales/admin. Monthly client hours (one decimal)?', answer: 108.3, tol: 0.1, unit: 'h', why: '25 × 52 ÷ 12 ≈ 108.3.' },
    { type: 'mc', q: 'Biggest capacity lever?', options: ['Hours per client', 'Working weekends', 'More tools', 'Shorter emails'], answer: 0, why: 'Per-client hours multiply across every client.' },
    { type: 'mc', q: 'At your client cap, what do you do?', options: ['Raise prices for new clients or tighten packages', 'Squeeze in more', 'Drop quality checks', 'Hire (outside this course’s scope)'], answer: 0, why: 'Stay at one-person scale with higher value per client.' },
  ],
  cards: [
    { id: 'math', front: 'Capacity math?', back: '(Weekly hours − sales/admin) × 52 ÷ 12, minus build hours, ÷ hours per client.' },
    { id: 'lever', front: 'Biggest capacity lever?', back: 'Hours per client (templates, monitoring, agents).' },
    { id: 'cap', front: 'At your cap?', back: 'Raise prices for new clients; tighten packages; keep headroom.' },
  ],
};
