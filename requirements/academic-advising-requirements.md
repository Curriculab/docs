---
sidebar_label: "Academic Advising"
description: "Advisor info, appointment scheduling, advising notes, academic plans, and overrides."
---

# Academic Advising Requirements

**Story Prefix:** ADV
**Feature Area:** Academic Advising
**System Overview:** [university-reg-features.md](./university-reg-features.md)
**Related docs:** Student Profile → [student-profile-requirements.md](./student-profile-requirements.md) | Academic Records → [academic-records-requirements.md](./academic-records-requirements.md) | Degree Programs → [degree-programs-requirements.md](./degree-programs-requirements.md) | Student Registration → [student-registration-requirements.md](./student-registration-requirements.md) | Authentication → [user-authentication-requirements.md](./user-authentication-requirements.md)

---

## ADV-001: View Assigned Advisor Information

**As a** Student
**I want** to see who my assigned academic advisor is
**So that** I know who to contact for academic guidance and can schedule a meeting with them

### Acceptance Criteria
- [ ] The student's profile and dashboard display their assigned advisor's name, title, department, email, phone number, and office location
- [ ] If no advisor has been assigned, the student sees a message directing them to their department office
- [ ] Students receive a notification (see [notifications-requirements.md](./notifications-requirements.md)) when their advisor assignment changes
- [ ] Advisors can view a list of all students currently assigned to them (ADV-003)

---

## ADV-002: Schedule an Advising Appointment

**As a** Student
**I want** to request an advising appointment with my assigned advisor
**So that** I can get guidance on course selection, degree progress, or academic issues

### Acceptance Criteria
- [ ] Students can view their advisor's available appointment slots and submit a booking request with a topic/reason
- [ ] The advisor receives a notification of the request and can confirm or decline it with an optional message
- [ ] Upon confirmation, both the student and advisor receive a calendar invite via email with the meeting details
- [ ] Students can cancel a confirmed appointment up to 24 hours in advance; later cancellations require contacting the advisor directly
- [ ] Students cannot book more than one future appointment with the same advisor at a time unless the previous appointment has been completed or cancelled

---

## ADV-003: View Advising Roster

**As an** Advisor
**I want** to see all students currently assigned to me
**So that** I can monitor their progress and proactively reach out to students who may need support

### Acceptance Criteria
- [ ] The advising roster lists all assigned students with: name, student ID, declared program, class year, enrollment status (PROF-003), GPA, and academic standing (REC-005)
- [ ] The roster can be sorted and filtered by class year, program, GPA range, and academic standing
- [ ] Students on academic probation or with active holds (REG-006) are visually flagged for priority attention
- [ ] Advisors can click any student to view their full profile (PROF-001), degree audit (REC-006), and enrollment history (REC-002)
- [ ] Administrators can reassign students between advisors; the affected student and both advisors receive a notification

---

## ADV-004: Record Advising Session Notes

**As an** Advisor
**I want** to record notes from an advising session
**So that** I have a documented history of the guidance given and any commitments made

### Acceptance Criteria
- [ ] Advisors can create, edit, and view notes for any advising session with a student on their roster
- [ ] Each note captures: date of session, meeting format (in-person / virtual / phone), topics discussed, action items, and free-text notes
- [ ] Notes are visible to the student's Advisor and to Administrators; they are not visible to the student by default
- [ ] Advisors can optionally mark a note as "Share with student," making it visible on the student's profile
- [ ] Notes cannot be deleted after 48 hours; correction requires adding a follow-up note with a reference to the original

---

## ADV-005: Create and Update a Student Academic Plan

**As an** Advisor
**I want** to build a multi-term academic plan for a student
**So that** we have a shared roadmap of which courses the student intends to take each term to meet their degree requirements

### Acceptance Criteria
- [ ] Advisors can create a term-by-term plan for a student, assigning specific courses (from the catalogue — CAT-001) to each future term
- [ ] The plan displays whether each planned course satisfies a degree requirement (linked to the degree audit — REC-006) and flags any prerequisite issues (COURSE-005)
- [ ] Students can view their academic plan in read-only mode from their profile
- [ ] Advisors can update the plan at any time; each saved version is retained in a history log with timestamp and advisor name
- [ ] The plan is advisory only and does not automatically register the student for courses

---

## ADV-006: Grant Enrollment Exceptions and Overrides

**As an** Advisor
**I want** to grant enrollment exceptions for students with special circumstances
**So that** legitimate needs are not blocked by system rules that don't account for individual situations

### Acceptance Criteria
- [ ] Advisors can grant the following overrides for a specific student and section: prerequisite waiver, schedule conflict override, and credit-hour limit increase
- [ ] Each override requires a mandatory reason note that is saved to the student's advising record
- [ ] Overrides are scoped to a single enrollment attempt; they do not permanently alter the student's record
- [ ] All overrides are logged in the audit trail (AUTH-010) with the advisor's identity, the affected student, the section, and the reason
- [ ] Students receive a notification when an override is granted on their behalf, including what was waived and for which section
