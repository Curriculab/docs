---
sidebar_label: "Graduation"
description: "Graduation application, Registrar clearance, ceremony registration, and diploma ordering."
---

# Graduation & Commencement Requirements

**Story Prefix:** GRAD
**Feature Area:** Graduation & Commencement
**System Overview:** [university-reg-features.md](./university-reg-features.md)
**Related docs:** Academic Records → [academic-records-requirements.md](./academic-records-requirements.md) | Degree Programs → [degree-programs-requirements.md](./degree-programs-requirements.md) | Payment & Billing → [payment-billing-requirements.md](./payment-billing-requirements.md) | Student Registration → [student-registration-requirements.md](./student-registration-requirements.md)

---

## GRAD-001: Apply for Graduation

**As a** Student
**I want** to submit a graduation application when I believe I am close to completing my degree requirements
**So that** the Registrar can review my record and confirm my eligibility to graduate

### Acceptance Criteria
- [ ] A graduation application link is accessible from the student dashboard and academic records page when the student is within a configurable credit threshold of completion (e.g., within 30 credits)
- [ ] The application captures: intended graduation term, declared program, and any notes for the Registrar
- [ ] Submitting the application triggers an automatic pre-clearance degree audit (GRAD-003) and attaches the result to the application for staff review
- [ ] Students with active financial holds (REG-006) are blocked from submitting until the hold is resolved
- [ ] Students receive a confirmation notification upon submission with an expected review timeline (see [notifications-requirements.md](./notifications-requirements.md))
- [ ] Only one pending graduation application per student is allowed at a time

---

## GRAD-002: Review and Process Graduation Applications

**As a** Registrar
**I want** to review graduation applications and record a clearance decision
**So that** only students who have met all degree requirements are approved to graduate

### Acceptance Criteria
- [ ] Registrars and Administrators can view a queue of pending graduation applications filterable by term, program, and status (Pending / Under Review / Approved / Denied)
- [ ] Each application displays the student's degree audit (REC-006), GPA, academic standing (REC-005), outstanding holds, and any in-progress courses that may satisfy remaining requirements
- [ ] Registrars can approve or deny an application with a required decision note; the student is notified of the outcome either way
- [ ] A denied application includes specific reasons (e.g., "3 credits outstanding in CSCI electives") that the student can view
- [ ] Approved students are marked with a "Graduation Approved" status on their record; this status is reflected in the degree audit
- [ ] Registrars can revoke an approval if new information surfaces (e.g., a grade correction causes a requirement to be unmet); the student is notified immediately

---

## GRAD-003: Run a Pre-Graduation Degree Audit Clearance

**As a** Registrar
**I want** the system to automatically run a degree audit against graduation requirements when an application is submitted
**So that** I have an objective starting point for my review and common issues are surfaced immediately

### Acceptance Criteria
- [ ] Upon graduation application submission, the system runs a full degree audit (REC-006) and flags any unsatisfied requirements
- [ ] In-progress courses (current term enrollments) are shown separately and labeled "In Progress — counts toward requirement if passed"
- [ ] The audit report attached to the application is a point-in-time snapshot; it does not auto-update after submission (Registrars can trigger a re-audit manually)
- [ ] If the audit shows all requirements met, the application is flagged as "Audit Clear" for expedited review
- [ ] If the audit shows outstanding requirements, each gap is listed with the specific category and credit shortfall

---

## GRAD-004: Register for Commencement Ceremony

**As a** Student
**I want** to register for the commencement ceremony
**So that** the university can plan seating, programs, and logistics for the event

### Acceptance Criteria
- [ ] Commencement registration is available only to students with an approved graduation application (GRAD-002)
- [ ] Students select their preferred ceremony (if multiple are offered, e.g., by college or program) and indicate the number of guest tickets requested (subject to a configurable per-student maximum)
- [ ] Students indicate their name pronunciation for the announcement script; the field accepts a phonetic spelling of up to 100 characters
- [ ] Students can update their registration up to 14 days before the ceremony; after that, changes require Registrar assistance
- [ ] Students receive a confirmation notification with ceremony details (date, time, location, arrival instructions) upon registration

---

## GRAD-005: Order a Diploma

**As a** Student
**I want** to specify my diploma delivery preferences after graduation is approved
**So that** I receive my official degree credential in the format and at the address I choose

### Acceptance Criteria
- [ ] Diploma ordering is available after graduation is approved (GRAD-002) and final grades are posted for the graduation term
- [ ] Students select a diploma format (standard, framed) and delivery method (pickup at Registrar's office, domestic mail, international mail)
- [ ] Students provide or confirm the mailing address for delivery; address changes after submission require Registrar approval
- [ ] Any diploma fees are calculated and added to the student's billing account (PAY-001) at time of order
- [ ] Students receive a notification when the diploma has been mailed or is ready for pickup, including a tracking reference where applicable

---

## GRAD-006: View Graduation Status

**As a** Student
**I want** to track the status of my graduation application and clearance process
**So that** I always know where I stand and what action (if any) is needed from me

### Acceptance Criteria
- [ ] A graduation status page is accessible from the student dashboard showing: application status, audit clearance result, Registrar decision (with notes if denied), commencement registration status, and diploma order status
- [ ] Each status stage is displayed as a step indicator (e.g., Applied → Audit Clear → Registrar Approved → Ceremony Registered → Diploma Ordered)
- [ ] Students receive a notification whenever any status stage changes
- [ ] Advisors and Administrators can view a student's graduation status from the student's profile
