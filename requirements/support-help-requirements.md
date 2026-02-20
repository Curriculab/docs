---
sidebar_label: "Support & Help"
description: "FAQ, ticket submission, ticket tracking, staff response workflow, and metrics."
---

# Support & Help Requirements

**Story Prefix:** SUP
**Feature Area:** Support & Help
**System Overview:** [university-reg-features.md](./university-reg-features.md)

---

## SUP-001: Browse FAQ and Help Documentation

**As a** Student
**I want** to access a self-service help center with FAQs and step-by-step guides
**So that** I can resolve common questions without waiting for support staff

### Acceptance Criteria
- [ ] A help center is accessible from the main navigation (unauthenticated and authenticated users)
- [ ] Articles are organized by topic (e.g., Registration, Billing, Academic Records, Technical Issues) and are keyword-searchable
- [ ] Each article includes a "Was this helpful?" feedback prompt; negative feedback prompts a prompt to submit a support ticket (SUP-002)
- [ ] Administrators can create, edit, archive, and delete help articles via a content management interface
- [ ] Archived articles are hidden from users but remain accessible to Administrators for reference

---

## SUP-002: Submit a Support Ticket

**As a** Student
**I want** to submit a support ticket when I have an issue the help center does not resolve
**So that** I can get personalized assistance from support staff

### Acceptance Criteria
- [ ] Authenticated users can submit a ticket with: subject, category (Registration, Billing, Technical, Other), priority (Standard / Urgent), and description
- [ ] Submitters can attach files (screenshots, documents) up to 10 MB per attachment, 3 attachments per ticket
- [ ] Upon submission, the user receives an in-system notification and email confirmation with a unique ticket number and expected response time
- [ ] Students without an active login (locked out) can submit a ticket via an unauthenticated form using their student ID and registered email address

---

## SUP-003: Track Status of a Submitted Ticket

**As a** Student
**I want** to see the current status of my support tickets
**So that** I know whether my issue is being worked on and when it was resolved

### Acceptance Criteria
- [ ] Users can view all their submitted tickets in a "My Tickets" page with: ticket number, subject, category, status (Open / In Progress / Awaiting User Response / Resolved / Closed), and last updated timestamp
- [ ] Clicking a ticket shows the full conversation thread between the user and support staff
- [ ] Users are notified via email and in-system notification when their ticket status changes or when support staff add a reply
- [ ] Users can add a follow-up reply to an open or in-progress ticket
- [ ] Resolved tickets are automatically closed after 7 days with no follow-up; users can reopen a closed ticket within 30 days by replying

---

## SUP-004: Support Staff View and Respond to Tickets

**As a** Support Staff member (Administrator role)
**I want** to view and respond to incoming support tickets
**So that** I can resolve user issues efficiently

### Acceptance Criteria
- [ ] Administrators can view a queue of all tickets filterable by: status, category, priority, and date range
- [ ] Tickets can be assigned to a specific staff member; the assigned staff member receives a notification
- [ ] Staff can add internal notes to a ticket that are visible only to other staff, not to the submitter
- [ ] Staff can change ticket status, reassign tickets, and merge duplicate tickets
- [ ] When staff add a public reply, the submitter is notified via email and in-system notification
- [ ] Staff can mark a ticket as resolved; the submitter is notified and given the option to confirm resolution or request further assistance

---

## SUP-005: Admin View Ticket Volume and Resolution Metrics

**As an** Administrator
**I want** to view support ticket volume and resolution metrics
**So that** I can assess team performance and identify recurring issues for process improvement

### Acceptance Criteria
- [ ] The admin dashboard displays: total tickets submitted (by day/week/month), tickets by category and status, average first response time, average resolution time, and satisfaction score (from user feedback)
- [ ] Metrics can be filtered by date range and support staff member
- [ ] Tickets with resolution time exceeding SLA thresholds (configurable by Administrator) are highlighted in the queue
- [ ] Report data can be exported as CSV (see [reporting-requirements.md](./reporting-requirements.md) RPT-004)
- [ ] Access to metrics is restricted to Administrators
