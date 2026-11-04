// M01 · L05 · Data shapes: records, fields, lists
const order = {
  order_id: 'A-1042', customer: { name: 'Grace Holt', email: 'grace.holt@example.com' }, paid: true, total: 86.5,
  items: [{ product: 'Sourdough loaf', qty: 2, price: 9 }, { product: 'Birthday cake', qty: 1, price: 68.5 }],
};
export default {
  steps: [
    { tag: 'example', title: 'One online order, two views', visualFirst: true,
      visual: { type: 'record', title: 'A bakery order (fake)', data: order },
      body: ['Switch between **As fields** and **As JSON**. It’s the same order.'],
      check: {
        type: 'mc', q: 'How many different products are in this order?',
        options: ['2', '3', '1', 'Can’t tell'], answer: 0,
        why: '`items` is a **list** with two entries: the sourdough (qty 2) and the cake (qty 1). Quantity isn’t the same as number of products.',
        wrong: { 1: 'That’s the total quantity (2 loaves + 1 cake). Count the entries in `items`.' },
      },
      stuck: {
        metaphor: 'A paper receipt: a few lines at the top (order number, customer), then a list of line items, one per product.',
        worked: ['Find `items`.', 'It holds two entries, each with product, qty, price.', 'Two entries = two products.'],
      },
    },
    { tag: 'how', title: 'Four shapes cover almost everything',
      visual: {"type": "sort", "cols": ["Field", "Record", "List"], "items": [{"text": "paid: true", "col": 0}, {"text": "The customer: name + email together", "col": 1}, {"text": "items: 3 line items", "col": 2}, {"text": "total: 86.5", "col": 0}, {"text": "One whole order", "col": 1}, {"text": "The attachments on an email", "col": 2, "why": "Attachments can repeat, so they’re a list."}], "prompt": "Sort each piece of the bakery order."},
      body: ["**Field:** one name, one value. **Record** ([[json-object|object]]): fields that belong together.", "**List** ([[json-array|array]]): several items of the same kind, in order.", "**Nesting:** shapes inside shapes, like an order holding a customer record and a list of items."] },
    { tag: 'see', title: 'Reading JSON without writing it',
      body: [
        '[[json]] is how apps send data to each other. You’ll read it in logs and test results; builders let you click fields instead of typing it.',
        '`{ }` wraps a record. `[ ]` wraps a list. `"name": value` is a field. Text has quotes; numbers and true/false don’t.',
        'A path names a nested field: **customer › email**, or **items › 1 › product** for the first item.',
      ],
      check: {
        type: 'mc', q: 'Which path gets the customer’s email?', options: ['customer › email', 'email', 'items › email', 'order_id › email'], answer: 0,
        why: 'Email lives inside the `customer` record, so you go into customer, then pick email.',
        wrong: { 1: 'There’s no email at the top level of this order. It’s nested inside customer.' },
      } },
    { tag: 'why', title: 'Why lists change your workflow',
      predict: {"q": "An order has 3 items. Your “send email” step isn’t set to loop. How many emails go out?", "options": ["One", "Three", "None", "It depends on the weather"], "answer": 0, "why": "Without a loop, a step runs once per record. To act once per item, you loop (Module 3)."},
      body: [
        'A step that sends one email handles one record. Give it a list of three items and it needs to know: one email total, or one per item?',
        'Builders handle lists by **looping**: run these steps once per item. Module 3 covers loops; for now, notice when data is a list.',
        'Types matter too: `"86.50"` in quotes is text; `86.5` is a number you can add up.',
      ] },
    { tag: 'try', title: 'Your turn: name the shape',
      check: {
        type: 'order', q: 'Order these from the smallest shape to the largest.',
        items: ['The value 68.5', 'The field price: 68.5', 'The cake item record', 'The items list', 'The whole order'],
        why: 'A value sits in a field, fields make a record, records make a list, and the order record holds the list.',
      } },
  ],
  quiz: [
    { type: 'mc', q: 'In JSON, what do square brackets `[ ]` mean?', options: ['A list', 'A record', 'Text', 'A comment'], answer: 0, why: '`[ ]` is a list (array). `{ }` is a record (object).' },
    { type: 'multi', q: 'Which of these are lists?', options: ['The line items on an order', 'A customer’s email', 'The attachments on an email', 'The order total', 'The answers to one form'], answer: [0, 2],
      why: 'Line items and attachments can repeat. An email and a total are single values; one form’s answers are one record.' },
    { type: 'mc', scenario: 'An order’s `total` arrives as `"86.50"` (in quotes). You add it to a running monthly total.', q: 'What can go wrong?',
      options: ['It’s text, so it may be glued on (“10086.50”) instead of added', 'Nothing; quotes don’t matter', 'The order is deleted', 'JSON can’t hold money'], answer: 0,
      why: 'Quoted values are text. Convert to a number before doing math; most builders have a “to number” option.' },
    { type: 'num', q: 'An order has items with qty 2, 1 and 3. How many units in total?', answer: 6, tol: 0, why: '2 + 1 + 3 = 6. Three entries in the list, six units.' },
  ],
  cards: [
    { id: 'shapes', front: 'Four data shapes?', back: 'Field (name + value), record (group of fields), list (repeating items), nesting (shapes inside shapes).' },
    { id: 'brackets', front: 'JSON: `{ }` vs `[ ]`?', back: '`{ }` = record (object). `[ ]` = list (array).' },
    { id: 'path', front: 'How do you name a nested field?', back: 'With a path: customer › email, or items › 1 › product.' },
    { id: 'types', front: '`"86.50"` vs `86.5`?', back: 'Quoted = text. Unquoted = number you can do math with.' },
    { id: 'lists', front: 'Why do lists matter in a workflow?', back: 'Steps handle one item at a time unless you loop: run steps once per item.' },
  ],
};
