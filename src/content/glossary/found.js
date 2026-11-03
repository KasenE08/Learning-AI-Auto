// Glossary: Module 1 (Automation foundations).
export default [
  { id: 'workflow', term: 'Workflow', aka: ['Automation', 'Flow'], lessons: ['found-01'],
    def: 'A list of steps a computer runs for you, starting with one trigger. Different tools give it different names; the idea is the same.' },
  { id: 'trigger', term: 'Trigger', lessons: ['found-01'],
    def: 'The event that starts a workflow: a form is submitted, an email arrives, a payment goes through, or a set time is reached.' },
  { id: 'action', term: 'Action', lessons: ['found-01'],
    def: 'A step that does something in an app: save a contact, send an email, add a spreadsheet row, post a message.' },
  { id: 'run', term: 'Run', aka: ['Execution'], lessons: ['found-01'],
    def: 'One pass through the whole workflow for one record. Thirty form submissions means thirty runs.' },
  { id: 'record', term: 'Record', aka: ['Item'], lessons: ['found-01'],
    def: 'One unit of data moving through a workflow, like one form submission or one email. It is made of fields.' },
  { id: 'field', term: 'Field', lessons: ['found-01'],
    def: 'One named piece of a record, like “email” or “phone”. Later steps pick fields from earlier steps to use.' },
  { id: 'crm', term: 'CRM', aka: ['Customer relationship management'], lessons: ['found-01'],
    def: 'The app a business uses to keep track of customers and leads: contacts, notes, deals, and history.' },
];
