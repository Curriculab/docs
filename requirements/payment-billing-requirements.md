# Payment & Billing Requirements

**Story Prefix:** PAY
**Feature Area:** Payment & Billing
**System Overview:** [university-reg-features.md](./university-reg-features.md)
**Related docs:** Access restrictions → [user-authentication-requirements.md](./user-authentication-requirements.md) (AUTH-009) | Notifications → [notifications-requirements.md](./notifications-requirements.md)

---

## PAY-001: View Tuition and Fee Breakdown per Term

**As a** Student
**I want** to see a detailed breakdown of my tuition and fees for each term
**So that** I understand exactly what I owe and why

### Acceptance Criteria
- [ ] The billing page displays, per term: tuition charges (by course and credit hour), mandatory fees (technology, activity, health, etc.), course-specific fees (lab fees, materials), and any adjustments or credits
- [ ] Line items are labeled clearly so students understand each charge
- [ ] The current outstanding balance is displayed prominently at the top of the billing page
- [ ] Financial aid applied to the balance is shown as a credit line item (linked to PAY-005)
- [ ] Only the account holder (Student) and Administrators can view billing details (AUTH-009)

---

## PAY-002: Make an Online Payment

**As a** Student
**I want** to pay my tuition and fees online
**So that** I can settle my balance conveniently without visiting the bursar's office

### Acceptance Criteria
- [ ] Students can make a full or partial payment via credit/debit card or ACH bank transfer
- [ ] The payment form is served over HTTPS; card data is processed through a PCI-DSS compliant payment gateway and is never stored on university servers
- [ ] Students receive an on-screen confirmation and email receipt immediately after a successful payment
- [ ] Failed payments display a clear error message and do not result in a partial charge
- [ ] Students can save a payment method (tokenized) for future use; saved methods can be removed at any time

---

## PAY-003: View Payment History

**As a** Student
**I want** to view a history of all payments I have made
**So that** I can reconcile my records and confirm past transactions

### Acceptance Criteria
- [ ] The payment history page lists all transactions: date, amount, payment method (last 4 digits for card / masked account for ACH), transaction ID, and status (Successful / Pending / Failed)
- [ ] Students can download individual payment receipts as PDF
- [ ] Payment history is accessible to the student and to Administrators; it is not accessible to Instructors or Academic Staff (AUTH-009)
- [ ] History covers all terms; students can filter by term or date range

---

## PAY-004: Receive Automated Billing Reminders

**As a** Student
**I want** to receive automated reminders before payment deadlines
**So that** I do not miss due dates and incur late fees or holds

### Acceptance Criteria
- [ ] Automated reminders are sent 30 days, 14 days, 7 days, and 1 day before each billing due date
- [ ] Reminders include: amount due, due date, and a direct link to the payment page (PAY-002)
- [ ] Students with a zero balance for the term do not receive reminders for that term
- [ ] Reminders are delivered via email by default; SMS delivery is available if opted into (see [notifications-requirements.md](./notifications-requirements.md) NOTIF-002)
- [ ] Administrators can configure the billing due dates and reminder schedule per term

---

## PAY-005: View Financial Aid Applied to Balance

**As a** Student
**I want** to see how my financial aid (grants, scholarships, loans) has been applied to my account
**So that** I understand my net balance after aid disbursement

### Acceptance Criteria
- [ ] The billing page displays a financial aid section listing each aid type (grant, scholarship, loan, work-study), the awarding authority, and the amount applied
- [ ] Financial aid data is synced from the financial aid system (see [integration-requirements.md](./integration-requirements.md) INT-001)
- [ ] The net balance (charges minus aid) is clearly calculated and displayed
- [ ] Students are notified when financial aid is posted or updated on their account (see [notifications-requirements.md](./notifications-requirements.md))
- [ ] If aid disbursement results in a credit balance, the student is informed of the refund process

---

## PAY-006: Generate a Billing Statement

**As a** Student or Administrator
**I want** to generate a formatted billing statement for a specific term
**So that** I can submit it to a third party (employer reimbursement, loan servicer, tax purposes)

### Acceptance Criteria
- [ ] Students can generate a billing statement for any term in which they have charges
- [ ] The statement includes: student name, student ID, term, itemized charges, financial aid applied, payments made, and outstanding balance
- [ ] Statements are downloadable as a PDF and optionally emailable to a specified address
- [ ] Administrators can generate billing statements for any student account
- [ ] Statements are clearly labeled with the generation date to indicate they are point-in-time snapshots
