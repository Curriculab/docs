# Transfer Credit Evaluation Requirements

**Story Prefix:** XFER
**Feature Area:** Transfer Credit Evaluation
**System Overview:** [university-reg-features.md](./university-reg-features.md)
**Related docs:** Degree Programs (equivalency mapping) → [degree-programs-requirements.md](./degree-programs-requirements.md) | Academic Records → [academic-records-requirements.md](./academic-records-requirements.md) | Authentication → [user-authentication-requirements.md](./user-authentication-requirements.md) | Document Management → [document-management-requirements.md](./document-management-requirements.md)

---

## XFER-001: Submit a Transfer Credit Evaluation Request

**As a** Student
**I want** to submit courses from another institution for transfer credit evaluation
**So that** I can receive credit toward my degree for work I have already completed

### Acceptance Criteria
- [ ] Students can create a transfer credit request by providing: source institution name, course title, course code at the source institution, credit hours, grade earned, and the year/term completed
- [ ] Students must attach supporting documentation (official or unofficial transcript, course description, syllabus) for each submitted course; file upload follows Document Management rules (DOC-001)
- [ ] Multiple courses from the same or different institutions can be included in a single request
- [ ] Submission triggers a notification to the student confirming receipt and providing an expected review timeline (see [notifications-requirements.md](./notifications-requirements.md))
- [ ] Students cannot submit a duplicate request for a course already under review or already decided

---

## XFER-002: Review and Decide on Transfer Credit

**As an** Academic Staff member
**I want** to evaluate submitted transfer credit requests and record decisions
**So that** students receive accurate credit recognition for prior coursework

### Acceptance Criteria
- [ ] Academic Staff and Administrators see a review queue of pending transfer credit requests filterable by status, source institution, and submission date
- [ ] For each submitted course, reviewers can: approve as a direct equivalent to a URS course (with mapping to a specific catalogue entry — DEG-005), approve as general elective credit (with a category), or deny with a required reason
- [ ] Partial approval is supported: some courses in a request can be approved while others are denied or held pending more information
- [ ] Reviewers can request additional documentation from the student; the request pauses the clock on the review SLA and the student is notified
- [ ] All decisions are logged in the audit trail (AUTH-010) with the reviewer's identity and timestamp

---

## XFER-003: View Transfer Credit Decisions

**As a** Student
**I want** to see the outcome of my transfer credit evaluation
**So that** I know which courses were accepted and how they apply to my degree requirements

### Acceptance Criteria
- [ ] A transfer credit summary page lists all submitted courses with their decision status: Pending, Approved (with URS equivalent or elective category), Denied (with reason), or Additional Information Requested
- [ ] Approved transfer credits appear in the student's enrollment history (REC-002) and are reflected immediately in the degree audit (REC-006) with a "Transfer Credit" label
- [ ] Students receive a notification when a decision is made on any course in their request
- [ ] The transfer credit summary is accessible to the student, their Advisor, and Administrators

---

## XFER-004: Appeal a Transfer Credit Decision

**As a** Student
**I want** to appeal a denied transfer credit decision
**So that** I have a fair opportunity to present additional evidence if I believe the denial was incorrect

### Acceptance Criteria
- [ ] Students can submit one appeal per denied course, providing additional documentation and a written explanation
- [ ] Appeals are routed to a senior Academic Staff member or department chair (not the original reviewer) for a fresh evaluation
- [ ] The appeal process has a configurable SLA (default: 10 business days); the student is notified of the outcome and SLA deadline
- [ ] Appeal decisions are final; a second appeal on the same course is not permitted without new, material evidence approved for submission by an Administrator
- [ ] All appeal actions (submission, decision, SLA breach) are logged in the audit trail (AUTH-010)

---

## XFER-005: Apply Approved Transfer Credits to Degree Audit

**As an** Advisor
**I want** to confirm how approved transfer credits are applied to a student's degree requirements
**So that** the degree audit accurately reflects the student's remaining obligations

### Acceptance Criteria
- [ ] Approved transfer credits are automatically applied to the degree audit (REC-006) based on the equivalency mapping set during review (XFER-002)
- [ ] Advisors can adjust how a transfer credit is applied to a requirement category (e.g., move from "General Elective" to "Technical Elective") with a mandatory reason note; the change is logged
- [ ] The degree audit clearly distinguishes transfer credits from URS-completed courses (labeled "Transfer — [Source Institution]")
- [ ] Changes to an equivalency mapping (DEG-005) after a transfer credit has been applied trigger a recalculation of affected students' degree audits and notify their Advisors
