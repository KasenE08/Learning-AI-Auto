// Fake businesses for the workflow sandbox. Every name, email and phone number is made up
// (example.com addresses, 555 numbers). Nothing here is ever sent anywhere.
//
// Each dataset:
//   trigger   which trigger type its test events come from
//   fields    what the trigger hands to the workflow (key, label)
//   events    test records. `data` is what the trigger outputs. The rest is hidden "ground truth"
//             the simulated AI uses: ai (label answers), loose (what a free-text AI answer looks like),
//             extract (facts actually present in the text), summary.
//   apps      what the connected apps hold before the run (CRM contacts, sheets)
//   fabricate what a careless AI invents when asked for a fact that isn't in the text

export const datasets = {
  dental: {
    id: 'dental',
    name: 'Bright Smile Dental',
    industry: 'Dental clinic · 2 dentists, 1 front desk',
    blurb: 'Patients request appointments through a booking form on the website. The front desk copies each one into the CRM by hand and emails back.',
    trigger: 'form.new',
    source: 'Website booking form',
    frontDesk: '555-201-0000',
    fields: [
      { key: 'name', label: 'Name' }, { key: 'email', label: 'Email' }, { key: 'phone', label: 'Phone' },
      { key: 'reason', label: 'Reason for visit' }, { key: 'preferred_time', label: 'Preferred time' }, { key: 'sms_ok', label: 'OK to text?' },
    ],
    events: [
      { data: { name: 'Dana Reyes', email: 'dana.reyes@example.com', phone: '(555) 201-3344', reason: 'Chipped my front tooth and it hurts when I bite', preferred_time: 'Tomorrow morning', sms_ok: 'yes' },
        ai: { urgency: 'urgent', topic: 'repair' }, loose: { urgency: 'Urgent - patient reports pain' }, summary: 'Chipped front tooth with pain; wants tomorrow morning.' },
      { data: { name: 'Omar Khan', email: 'omar.k@example.com', phone: '555-201-8890', reason: 'Routine cleaning, it has been about a year', preferred_time: 'Any weekday after 4', sms_ok: 'yes' },
        ai: { urgency: 'routine', topic: 'cleaning' }, loose: { urgency: 'Routine (cleaning)' }, summary: 'Yearly cleaning; weekdays after 4.' },
      { data: { name: 'Lee Park', email: 'lee.park@example.com', phone: '', reason: 'Gum is swollen and bleeding a little', preferred_time: 'ASAP', sms_ok: 'no' },
        ai: { urgency: 'urgent', topic: 'gums' }, loose: { urgency: 'Possibly urgent' }, summary: 'Swollen, bleeding gum; wants ASAP. No phone given.' },
      { data: { name: 'Priya Shah', email: 'PRIYA.SHAH@EXAMPLE.COM', phone: '555.201.7720', reason: 'Want to ask about whitening prices', preferred_time: 'Saturday', sms_ok: 'yes' },
        ai: { urgency: 'routine', topic: 'cosmetic' }, loose: { urgency: 'Not urgent, cosmetic question' }, summary: 'Whitening price question; Saturday.' },
      { data: { name: 'Dana Reyes', email: 'dana.reyes@example.com', phone: '(555) 201-3344', reason: 'Following up, can I come in today? Still hurts', preferred_time: 'Today', sms_ok: 'yes' },
        ai: { urgency: 'urgent', topic: 'repair' }, loose: { urgency: 'URGENT' }, summary: 'Same patient as before, still in pain, wants today.' },
      { data: { name: 'Sam Ortiz', email: 'sam.o@example', phone: '555 201 4410', reason: 'New patient checkup', preferred_time: 'Next week', sms_ok: 'no' },
        ai: { urgency: 'routine', topic: 'checkup' }, loose: { urgency: 'routine' }, summary: 'New patient checkup next week. Email looks mistyped.' },
    ],
    apps: { crm: [], sheets: { Waitlist: [] } },
    fabricate: { phone: '555-201-0101', email: 'patient@example.com', insurance: 'Delta Dental PPO', date: 'Monday 10:00' },
  },

  plumbing: {
    id: 'plumbing',
    name: 'Rivera Plumbing',
    industry: 'Plumbing · owner + 3 techs',
    blurb: 'Every job request lands in one shared inbox. The owner reads them at night, picks out the urgent ones, and types addresses into the job sheet.',
    trigger: 'email.new',
    source: 'Shared inbox (jobs@)',
    owner: '555-310-0001',
    fields: [
      { key: 'from_name', label: 'Sender name' }, { key: 'from_email', label: 'Sender email' },
      { key: 'subject', label: 'Subject' }, { key: 'body', label: 'Email text' },
    ],
    events: [
      { data: { from_name: 'Grace Holt', from_email: 'grace.holt@example.com', subject: 'Water heater leaking', body: 'Hi, my water heater in the garage is leaking all over the floor. I am at 14 Elm St. Call me at 555-310-2210. Thanks, Grace' },
        ai: { intent: 'emergency' }, loose: { intent: 'Emergency!! active leak' }, extract: { address: '14 Elm St', issue: 'Water heater leaking', phone: '555-310-2210', name: 'Grace Holt' }, summary: 'Active water heater leak at 14 Elm St.' },
      { data: { from_name: 'Marcus Webb', from_email: 'mwebb@example.com', subject: 'Quote for bathroom remodel', body: 'Looking for a quote to replace the tub and vanity in our upstairs bathroom. We are at 88 Oak Ave. No rush, sometime next month.' },
        ai: { intent: 'quote' }, loose: { intent: 'Quote request (remodel)' }, extract: { address: '88 Oak Ave', issue: 'Replace tub and vanity', name: 'Marcus Webb' }, summary: 'Remodel quote for tub and vanity at 88 Oak Ave, next month.' },
      { data: { from_name: 'Accounts Payable', from_email: 'ap@example.com', subject: 'Invoice #2291 question', body: 'We were charged twice for invoice 2291. Can you check and send a corrected copy?' },
        ai: { intent: 'billing' }, loose: { intent: 'Billing / invoice issue' }, extract: { issue: 'Charged twice for invoice 2291' }, summary: 'Possible double charge on invoice 2291.' },
      { data: { from_name: 'SEO Growth Team', from_email: 'growth@example.net', subject: 'Increase your Google ranking!!!', body: 'We can get you to #1 on Google in 30 days. Reply YES for a free audit.' },
        ai: { intent: 'spam' }, loose: { intent: 'Marketing spam' }, extract: {}, summary: 'Unsolicited SEO pitch.' },
      { data: { from_name: 'Tina Cho', from_email: 'tina.cho@example.com', subject: 'Kitchen sink clogged', body: 'Kitchen sink has been backed up since this morning. 5 Birch Rd. My number is 555-310-7781, afternoons are best.' },
        ai: { intent: 'service' }, loose: { intent: 'Service call - clog' }, extract: { address: '5 Birch Rd', issue: 'Kitchen sink clogged', phone: '555-310-7781', name: 'Tina Cho' }, summary: 'Clogged kitchen sink at 5 Birch Rd; afternoons.' },
    ],
    apps: { crm: [{ id: 'c1', name: 'Grace Holt', email: 'grace.holt@example.com', phone: '555-310-2210' }], sheets: { Jobs: [] } },
    fabricate: { phone: '555-310-0000', address: '100 Main St', name: 'Customer', issue: 'Plumbing problem' },
  },

  fitness: {
    id: 'fitness',
    name: 'Ironside Fitness',
    industry: 'Gym · 2 locations',
    blurb: 'Ads send leads to a signup page, which pushes each lead to a webhook. Today leads sit in a spreadsheet for days before anyone calls.',
    trigger: 'webhook',
    source: 'Ad signup page (webhook)',
    fields: [
      { key: 'full_name', label: 'Full name' }, { key: 'email', label: 'Email' }, { key: 'phone', label: 'Phone' },
      { key: 'goal', label: 'Goal' }, { key: 'source', label: 'Ad source' },
    ],
    events: [
      { data: { full_name: 'Jordan Bell', email: 'jordan.bell@example.com', phone: '555-410-1188', goal: 'Lose 20 lbs before my wedding in June, want a trainer', source: 'Instagram' },
        ai: { fit: 'hot' }, loose: { fit: 'Very hot lead!' }, summary: 'Wants a trainer for a June deadline.' },
      { data: { full_name: 'Alex Moreno', email: 'alex.m@example.com', phone: '555-410-2020', goal: 'Just checking prices', source: 'Facebook' },
        ai: { fit: 'cold' }, loose: { fit: 'Cold-ish' }, summary: 'Price shopping.' },
      { data: { full_name: 'Kim Nguyen', email: 'kim.n@example.com', phone: '', goal: 'Get back into lifting after a knee injury', source: 'Google' },
        ai: { fit: 'warm' }, loose: { fit: 'Warm' }, summary: 'Returning after knee injury; no phone.' },
      { data: { full_name: 'Chris Patel', email: 'chris.patel@example.com', phone: '555-410-7731', goal: 'Join with my partner, classes in the evening', source: 'Instagram' },
        ai: { fit: 'hot' }, loose: { fit: 'HOT - couple signup' }, summary: 'Couple wants evening classes.' },
    ],
    apps: { crm: [], sheets: { Leads: [] } },
    fabricate: { phone: '555-410-0000', budget: '$50/month' },
  },
};

export const datasetList = () => Object.values(datasets);
export const datasetById = (id) => datasets[id] || null;
