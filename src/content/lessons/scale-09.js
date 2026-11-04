// M12 · L09 · Finances: cash, taxes, tools
export default {
  steps: [
    { tag: 'example', title: 'A $4,000 month', visualFirst: true,
      visual: { type: 'calc', inputs: [
        { key: 'rev', label: 'Revenue this month', min: 1000, max: 20000, step: 250, value: 4000, prefix: '$' },
        { key: 'tools', label: 'Business expenses (tools, phone, AI usage)', min: 0, max: 3000, step: 50, value: 400, prefix: '$' },
        { key: 'set', label: 'Tax set-aside % of profit (rule of thumb)', min: 15, max: 40, value: 30, unit: '%' },
      ], outputs: [
        { label: 'Profit before tax', f: (v) => v.rev - v.tools, fmt: 'money' },
        { label: 'Move to tax savings', f: (v) => (v.rev - v.tools) * v.set / 100, fmt: 'money' },
        { label: 'Left for you and the business', f: (v) => (v.rev - v.tools) * (1 - v.set / 100), fmt: 'money', big: true },
      ], caption: 'A planning rule of thumb, not tax advice. A CPA sets your real numbers.' },
      body: ['Your business earns $4,000 this month. Not all of it is yours to spend.'],
      check: {
        type: 'num', q: 'At the starting values, how much goes to tax savings?', answer: 1080, tol: 0, prefix: '$',
        hint: '($4,000 − $400) × 30%', why: '$3,600 profit × 30% = **$1,080** set aside.',
      },
      stuck: {
        metaphor: 'A paycheck from an employer already has taxes taken out. As a business owner, you are the one taking them out.',
        worked: ['Profit: $4,000 − $400 = $3,600.', '30% of $3,600 = $1,080.', 'Move it to a separate savings account.'],
      },
    },
    { tag: 'how', title: 'Money habits from day one',
      visual: {"type": "sort", "cols": ["Do", "Don’t"], "items": [{"text": "Separate business bank account", "col": 0}, {"text": "Spend the whole setup fee the day it lands", "col": 1, "why": "Set aside for taxes first."}, {"text": "Move a tax share to savings every payment", "col": 0}, {"text": "Mix business and personal spending", "col": 1}, {"text": "Track MRR, expenses and profit monthly", "col": 0}, {"text": "Keep paying for tools you don’t use", "col": 1}], "prompt": "Sort each money habit."},
      body: ["**Separate account**, and **set aside for taxes** on every payment (rules of thumb are often 25–30% of profit; a CPA refines it).", "**Track monthly:** revenue, [[mrr]], expenses, profit; keep a **cash buffer**.", "Cut unused tools; pass client running costs through."] },
    { tag: 'law', title: 'US and Tennessee tax basics (concepts, not advice)',
      predict: {"q": "Does Tennessee have a state income tax on wages and earned income?", "options": ["No", "Yes, 5%", "Only for LLCs", "Only over $1M"], "answer": 0, "why": "Federal income and self-employment taxes still apply, paid quarterly."},
      body: ["**Federal:** income tax plus self-employment tax (15.3% on most net earnings), paid as quarterly estimates (around Apr 15, Jun 15, Sep 15, Jan 15).", "**Tennessee:** no state income tax on wages; a local business tax on gross receipts (sources point to $100,000 as the full-registration line). Check with your county clerk.", "**Structure:** sole proprietors aren’t subject to Tennessee franchise and excise tax; LLCs generally are. Sources disagree on details. Ask a Tennessee CPA."] },
    { tag: 'try', title: 'Your turn: the quarterly habit',
      check: {
        type: 'mc', q: 'A client pays a $2,500 setup fee. First thing to do?', options: ['Move your tax set-aside share into the tax savings account', 'Spend it on new tools', 'Leave it all in checking', 'Pay yourself all of it'], answer: 0,
        why: 'Set aside on every payment, so quarterly estimates aren’t a scramble.',
      } },
  ],
  quiz: [
    { type: 'mc', q: 'Why a separate business bank account?', options: ['Clean records, easier taxes, clearer profit', 'It’s cheaper', 'Banks require it', 'No reason'], answer: 0, why: 'Clarity and protection.' },
    { type: 'mc', q: 'Self-employment tax covers…', options: ['Social Security and Medicare (15.3% on most net earnings)', 'State income tax', 'Sales tax', 'Property tax'], answer: 0, why: 'Normally split with an employer; self-employed pay both halves.' },
    { type: 'mc', q: 'Does Tennessee tax wages and earned income?', options: ['No state income tax on wages and earned income', 'Yes, 5%', 'Only for LLCs', 'Only above $1 million'], answer: 0, why: 'Federal taxes still apply.' },
    { type: 'num', q: 'Profit $5,000 this month, set aside 28%. Amount to set aside?', answer: 1400, tol: 0, prefix: '$', why: '$5,000 × 0.28.' },
  ],
  cards: [
    { id: 'habits', front: 'Day-one money habits?', back: 'Separate account, tax set-aside on every payment, monthly tracking, cash buffer.' },
    { id: 'federal', front: 'Federal taxes when self-employed?', back: 'Income tax + self-employment tax (15.3% on most net earnings), paid as quarterly estimates.' },
    { id: 'tn', front: 'Tennessee basics?', back: 'No state income tax on wages; local business tax on gross receipts; LLCs generally owe franchise & excise (ask a CPA).' },
    { id: 'mrr', front: 'MRR?', back: 'Monthly recurring revenue: your total retainers per month.' },
  ],
};
