---
sidebar_label: "Student Profile"
description: "Personal info, emergency contacts, enrollment status, program declaration, and photo."
---

# Student Profile & Account Management Requirements

**Story Prefix:** PROF
**Feature Area:** Student Profile & Account Management
**System Overview:** [university-reg-features.md](./university-reg-features.md)
**Related docs:** Authentication → [user-authentication-requirements.md](./user-authentication-requirements.md) | Academic Records → [academic-records-requirements.md](./academic-records-requirements.md) | Degree Programs → [degree-programs-requirements.md](./degree-programs-requirements.md) | Academic Advising → [academic-advising-requirements.md](./academic-advising-requirements.md) (ADV-001, ADV-003, ADV-005)

---

## PROF-001: View and Update Personal Contact Information

**As a** Student
**I want** to view and update my personal contact information
**So that** the university can reach me and my records stay accurate

### Acceptance Criteria
- [ ] Students can view and edit: preferred name, legal name (read-only; requires admin request to change), primary email, secondary email, phone number(s), and mailing/permanent address
- [ ] Changes to contact information take effect immediately and are reflected in all university communications
- [ ] Legal name and university-assigned email can only be changed by an Administrator
- [ ] Each update is timestamped and logged; the previous values are retained in a change history accessible to Administrators
- [ ] Students receive an email notification to their current address whenever contact information is changed (to detect unauthorized modifications)

---

## PROF-002: Manage Emergency Contacts

**As a** Student
**I want** to add and maintain emergency contact records on my profile
**So that** the university can reach the right person if there is an emergency

### Acceptance Criteria
- [ ] Students can add, edit, or remove emergency contacts; each contact requires: name, relationship, and at least one phone number
- [ ] A maximum of 3 emergency contacts can be stored per student
- [ ] Students are prompted to review emergency contacts at the start of each academic term (during registration)
- [ ] Emergency contact information is visible only to the student, their Advisor, and Administrators; it is not accessible to Instructors

---

## PROF-003: View Enrollment Status

**As a** Student
**I want** to see my current enrollment status on my profile
**So that** I know whether I am classified as full-time, part-time, or not enrolled for the current term

### Acceptance Criteria
- [ ] The profile page displays the student's enrollment status for the current term: Full-Time, Half-Time, Less Than Half-Time, or Not Enrolled
- [ ] Status is calculated automatically based on total enrolled credit hours and the institution's configured thresholds (set by Administrator)
- [ ] Historical enrollment status per term is accessible to the student and Advisors
- [ ] Students whose status changes mid-term (due to a drop that crosses a credit-hour threshold) are notified, as this may affect financial aid or insurance eligibility

---

## PROF-004: Declare or Change Academic Program

**As a** Student
**I want** to declare or change my major, minor, or concentration from my profile
**So that** my degree audit and academic records reflect my current academic goals

### Acceptance Criteria
- [ ] Students can select a declared program (major), up to one minor, and up to one concentration from the list of active degree programs (DEG-001)
- [ ] Program changes are submitted as a request; the assigned Advisor receives a notification and must approve or reject the change
- [ ] Approved changes are applied to the academic record and immediately reflected in the degree audit (REC-006)
- [ ] Rejected change requests include a required reason note from the Advisor, which is displayed to the student
- [ ] Program declaration history (all previous majors/minors with effective dates) is retained and viewable by Advisors and Administrators

---

## PROF-005: Upload a Profile Photo

**As a** Student
**I want** to upload a profile photo to my account
**So that** instructors, advisors, and staff can identify me in the system

### Acceptance Criteria
- [ ] Students can upload a photo in JPEG or PNG format, maximum 5 MB
- [ ] The system auto-crops and resizes the image to a standard square format (minimum 200 × 200 px)
- [ ] Administrators can remove a photo that violates the university's photo policy; the student is notified upon removal
- [ ] Profile photos are visible to Instructors (on their enrollment roster), Advisors, and Administrators; they are not shown in any public-facing view

---

## PROF-006: Request an Enrollment Verification Letter

**As a** Student
**I want** to generate an enrollment verification letter
**So that** I can prove my enrollment status to employers, insurance providers, or loan servicers

### Acceptance Criteria
- [ ] Students can request an enrollment verification letter for any term in which they were enrolled
- [ ] The letter is generated as a downloadable PDF and includes: student name, student ID, institution name, term, enrollment status (full-time/part-time), program of study, and expected graduation term
- [ ] The letter is date-stamped and includes a unique verification code that third parties can use to confirm authenticity via a public URL
- [ ] Letters can be generated immediately; no approval step is required unless the student has an active financial hold (REG-006)
- [ ] Administrators can generate verification letters on behalf of a student
