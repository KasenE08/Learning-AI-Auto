// M10 · L04 · Value-based pricing
export default {
  steps: [
    { tag: 'example', title: 'Same build, two clients, two prices', visualFirst: true,
      visual: { type: 'compare', cols: ['', 'Small lawn-care company', 'Busy HVAC company'], rows: [
        ['After-hours leads lost per month', '2 small jobs ($150 profit each)', '2 installs ($2,000 profit each)'],
        ['Monthly value of fixing it', '$300', '$4,000'],
        ['Hours for you to build', 'About the same', 'About the same'],
        ['Reasonable setup price', 'Lower', 'Higher'],
      ] },
      body: ['The same lead-response system, sold to two (fake) Tennessee businesses.'],
      check: {
        type: 'mc', q: 'Is it fair to charge the HVAC company more for the same build?',
        options: ['Yes: price reflects value, and both should still get a clear win', 'No, prices must equal hours', 'Only if they’re rude', 'Only if you lie about the work'], answer: 0,
        why: '[[value-based-pricing|Value-based pricing]] ties price to what it’s worth to them. Both pay well under the value they get.',
      },
      stuck: {
        metaphor: 'A locksmith opening a car charges the same for the trick, but a sports car with a baby inside is a very different value from an old pickup in a driveway.',
        worked: ['HVAC: $4,000/month of value.', 'Lawn care: $300/month.', 'Charging both the same leaves one overpaying and one underpaying.'],
      },
    },
    { tag: 'how', title: 'How to price on value',
      predict: {"q": "Where does the value number go in a proposal?", "options": ["Before the price", "After the price", "In the contract only", "Nowhere"], "answer": 0, "why": "Anchoring: “this costs you $4,000 a month” makes the price feel small."},
      body: ["You need the problem’s cost from discovery; anchor to it before the price.", "Price as a share of value, with options at different levels.", "Stay within a sensible band for your niche so prices stay trustworthy."] },
    { tag: 'try', title: 'Your turn: anchor first',
      check: {
        type: 'mc', q: 'Where should the value number appear in a proposal?', options: ['Before the price', 'After the price', 'Nowhere', 'In the contract only'], answer: 0,
        why: '“This costs you $4,000 a month” makes “$3,500 setup” feel small. Price first, and $3,500 feels big.',
      } },
    { tag: 'warn', title: 'Value pricing needs honest value',
      predict: {"q": "You inflate the value in a proposal. When does it backfire?", "options": ["When the results report comes", "Never", "Before signing", "Only with lawyers"], "answer": 0, "why": "Use conservative numbers the client gave you, and cite them."},
      body: ['Inflated value claims backfire when the results report comes. Use conservative numbers the client gave you, and say where they came from.'] },
  ],
  quiz: [
    { type: 'mc', q: 'Value-based pricing sets price based on…', options: ['What the result is worth to the client', 'Your hours only', 'Competitors only', 'Random'], answer: 0, why: 'Value, with a clear win left for the client.' },
    { type: 'mc', q: 'What must discovery uncover for value pricing?', options: ['The cost of the problem, in their numbers', 'Their favorite color', 'Their software list only', 'Nothing'], answer: 0, why: 'No numbers, no value pricing.' },
    { type: 'mc', q: 'Value or price first in the proposal?', options: ['Value first', 'Price first', 'Same line', 'Doesn’t matter'], answer: 0, why: 'Anchoring.' },
  ],
  cards: [
    { id: 'value', front: 'Value-based pricing?', back: 'Price tied to what the result is worth to the client, leaving them a clear win.' },
    { id: 'anchor', front: 'Anchor?', back: 'State the problem’s cost before the price.' },
    { id: 'honest', front: 'Value pricing risk?', back: 'Inflated claims backfire at the results report. Use their conservative numbers.' },
  ],
};
