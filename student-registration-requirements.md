# Student Registration Requirements

**Story Prefix:** REG
**Feature Area:** Student Registration
**System Overview:** [university-reg-features.md](./university-reg-features.md)
**Related docs:** Course capacity → [course-capacity-requirements.md](./course-capacity-requirements.md) | Waitlists → [course-waitlists-requirements.md](./course-waitlists-requirements.md) | Notifications → [notifications-requirements.md](./notifications-requirements.md)

---

## REG-001: Register for Courses in an Open Semester

**As a** Student
**I want** to register for courses during an open registration window
**So that** I am enrolled in the courses I need for the upcoming semester

### Acceptance Criteria
- [ ] Registration is available only during the registration window defined for the term (SEM-002)
- [ ] Students can search and browse the course catalogue (CAT-001, CAT-002) and select sections to enroll in
- [ ] The system enforces prerequisite checks (AUTH-006), schedule conflict detection (COURSE-006), credit-hour limits, and capacity rules (CAP-003) before confirming enrollment
- [ ] A successful enrollment is confirmed immediately on screen and triggers a confirmation notification (REG-005)
- [ ] The enrolled section appears in the student's registration summary (REG-004) within 30 seconds

---

## REG-002: Add a Course During Add/Drop Period

**As a** Student
**I want** to add a course after initial registration, within the add/drop period
**So that** I can adjust my schedule to meet my academic needs

### Acceptance Criteria
- [ ] Course additions are permitted from the start of the term through the add/drop deadline (SEM-003)
- [ ] All standard enrollment checks (prerequisites, conflicts, capacity) apply to add requests
- [ ] Students can add courses that have available seats; full courses display the waitlist option (WAIT-001)
- [ ] A successful add triggers a confirmation notification (REG-005)

---

## REG-003: Drop a Course During Add/Drop Period

**As a** Student
**I want** to drop a course within the add/drop period without academic penalty
**So that** I can remove a course that no longer fits my plan

### Acceptance Criteria
- [ ] Course drops are permitted through the add/drop deadline (SEM-003); after the deadline, drops may incur a grade of "W" and require advisor approval
- [ ] Dropping a course instantly frees the seat, triggering automatic waitlist processing (WAIT-003)
- [ ] If dropping a course would violate a corequisite requirement for another enrolled course, the student is warned before confirming
- [ ] Dropping the last course in a term prompts a warning that the student will have zero credits for the term
- [ ] A successful drop triggers a confirmation notification (REG-005)

---

## REG-004: View Current Semester Registration Summary

**As a** Student
**I want** to see a summary of all my current registrations in one place
**So that** I can review my schedule, credit total, and any waitlist positions at a glance

### Acceptance Criteria
- [ ] The registration summary displays all enrolled sections for the current and upcoming terms: course title, section code, instructor, meeting days/times, location, credit hours, and enrollment status
- [ ] Waitlisted sections are shown separately with position and deadline information (WAIT-002)
- [ ] Total enrolled credit hours for the term are displayed prominently
- [ ] Registration holds (REG-006) are displayed as a banner with instructions for resolution
- [ ] Students can initiate a drop (REG-003) or waitlist departure (WAIT-005) directly from this page

---

## REG-005: Receive Registration Confirmation

**As a** Student
**I want** to receive an email confirmation for each registration event
**So that** I have a record of my enrollment, drop, or waitlist changes

### Acceptance Criteria
- [ ] A confirmation email is sent within 5 minutes of: successful enrollment, successful course drop, joining a waitlist, automatic enrollment from a waitlist, and a declined waitlist spot
- [ ] The email includes: student name, course title, section code, instructor, meeting schedule, term, and timestamp of the action
- [ ] Email delivery failures are logged and retried up to 3 times before flagging for administrator review
- [ ] Students can opt to also receive SMS confirmations (see [notifications-requirements.md](./notifications-requirements.md) NOTIF-002)

---

## REG-006: View Registration Holds on Account

**As a** Student
**I want** to view any holds placed on my account
**So that** I understand why I cannot register and what steps I need to take to resolve the hold

### Acceptance Criteria
- [ ] Holds are displayed on the registration summary page (REG-004) and on the main student dashboard
- [ ] Each hold entry shows: hold type (e.g., Financial, Academic, Administrative), the office that placed it, a description, and contact information for resolution
- [ ] A student with an active hold cannot complete new course enrollments; the enroll action is blocked with a link to the holds detail
- [ ] When a hold is removed by the responsible office, the student receives a notification and registration access is restored immediately
- [ ] Administrators and Advisors can view all holds on a student's account
