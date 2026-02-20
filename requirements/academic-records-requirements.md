---
sidebar_label: "Academic Records"
description: "Enrollment history, transcripts, GPA, degree audit, and grade submission."
---

# Academic Records Requirements

**Story Prefix:** REC
**Feature Area:** Academic Records
**System Overview:** [university-reg-features.md](./university-reg-features.md)
**Related docs:** Graduation (pre-grad clearance audit) → [graduation-commencement-requirements.md](./graduation-commencement-requirements.md) (GRAD-002, GRAD-003) | Academic Advising (degree audit review) → [academic-advising-requirements.md](./academic-advising-requirements.md) (ADV-005) | Transfer Credit (credits applied to audit) → [transfer-credit-requirements.md](./transfer-credit-requirements.md) (XFER-005)

---

## REC-001: View Current Enrollment Summary

**As a** Student
**I want** to view my current term enrollment at a glance
**So that** I can confirm my schedule and credit load are correct

### Acceptance Criteria
- [ ] The enrollment summary shows all sections the student is enrolled in for the current and upcoming terms: course title, section code, instructor, schedule, credit hours, and status
- [ ] Total enrolled credit hours for each term are displayed
- [ ] The summary is accessible from the main student dashboard and from the registration summary page (REG-004)
- [ ] Advisors and Administrators can view any student's current enrollment summary with the student's consent or by administrator privilege

---

## REC-002: View Enrollment History (Past Terms)

**As a** Student
**I want** to view my enrollment history across past terms
**So that** I can reference courses I have taken and verify my academic progress

### Acceptance Criteria
- [ ] All past term enrollments are listed chronologically, grouped by term
- [ ] Each entry shows: course title, course code, credit hours, final grade (if posted), and term
- [ ] Withdrawn courses (grade "W") are included and clearly labeled
- [ ] Enrollment history is accessible to the student, their Advisor, and Administrators

---

## REC-003: View Unofficial Transcript

**As a** Student
**I want** to view my unofficial transcript
**So that** I can review my academic record for personal planning or advisor meetings

### Acceptance Criteria
- [ ] The unofficial transcript displays: all completed courses with grades, credit hours, term GPA, and cumulative GPA, organized chronologically by term
- [ ] The transcript is clearly watermarked "UNOFFICIAL" on every page
- [ ] Students can download the unofficial transcript as a PDF at any time
- [ ] The transcript is accessible to the student and their assigned Advisor

---

## REC-004: Request Official Transcript

**As a** Student
**I want** to request an official transcript
**So that** I can submit verified academic records to employers, graduate schools, or other institutions

### Acceptance Criteria
- [ ] Students can submit an official transcript request specifying: recipient name/address (or secure email), number of copies, and required delivery date
- [ ] Official transcripts cannot be requested if there is an active financial or administrative hold (REG-006)
- [ ] The student receives a confirmation notification with an estimated processing time upon submission
- [ ] Registrar staff can view, process, and mark requests as fulfilled within the admin interface
- [ ] Fulfilled requests are logged with the processing date and staff member's ID

---

## REC-005: View GPA and Academic Standing

**As a** Student
**I want** to view my current GPA and academic standing
**So that** I know where I stand academically and whether I am in good standing

### Acceptance Criteria
- [ ] The student dashboard displays: term GPA, cumulative GPA, total credit hours completed, and current academic standing (Good Standing / Academic Probation / Academic Suspension)
- [ ] Academic standing is calculated automatically after grade submission each term based on configurable GPA thresholds (set by Administrator)
- [ ] Students placed on probation or suspension receive a notification and are directed to contact their Advisor
- [ ] Advisors can view GPA and standing for all students on their advising roster

---

## REC-006: Run a Degree Audit

**As a** Student
**I want** to run a degree audit that shows my progress toward completing my degree requirements
**So that** I can plan my remaining coursework and ensure I am on track to graduate

### Acceptance Criteria
- [ ] The degree audit compares completed and in-progress courses against the student's declared program requirements
- [ ] The audit clearly shows: requirements met (with the fulfilling course), requirements in progress, and outstanding requirements
- [ ] Students can run the audit for a hypothetical program to evaluate the impact of changing their major
- [ ] Advisors can run and export degree audits for any advisee
- [ ] The audit reflects the most current grade postings and is recalculated each time it is viewed

---

## REC-007: Faculty Submit Grades for a Section

**As an** Instructor
**I want** to submit final grades for all students in my course section
**So that** the academic record is updated and students can see their results

### Acceptance Criteria
- [ ] Instructors can enter a letter grade (A, A-, B+, B, B-, C+, C, C-, D, F, W, I) for each enrolled student in their sections after the term ends
- [ ] Grade submission is available from the term end date through the grade submission deadline (configured by Registrar)
- [ ] Grades cannot be submitted until the term end date; early submission is blocked with a clear message
- [ ] After submission, grades are locked; corrections require an Administrator or Registrar to unlock the section for the specific student record
- [ ] The Registrar receives a notification when a section has outstanding (unsubmitted) grades past the submission deadline

---

## REC-008: Student View Posted Grades

**As a** Student
**I want** to view my posted grades as soon as they are available
**So that** I know my academic performance for the term

### Acceptance Criteria
- [ ] Grades are visible to students immediately upon posting by the Instructor
- [ ] The grades page shows: course title, section, credit hours, grade earned, and quality points (for GPA calculation)
- [ ] Students receive a notification when a new grade is posted for their account (see [notifications-requirements.md](./notifications-requirements.md))
- [ ] If a grade has been corrected, the current grade is displayed; grade history is accessible to Administrators and Registrars but not to students
