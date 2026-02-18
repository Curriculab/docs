# Course Management Requirements

**Story Prefix:** COURSE
**Feature Area:** Course Management
**System Overview:** [university-reg-features.md](./university-reg-features.md)
**Related docs:** Course capacity rules → [course-capacity-requirements.md](./course-capacity-requirements.md) | Waitlist behavior → [course-waitlists-requirements.md](./course-waitlists-requirements.md) | Room scheduling → [room-facility-requirements.md](./room-facility-requirements.md) (ROOM-001, ROOM-004)

---

## COURSE-001: Create a Course

**As an** Academic Staff member
**I want** to create a new course in the system
**So that** it can be scheduled and offered to students in upcoming terms

### Acceptance Criteria
- [ ] Academic Staff and Administrators can create a course by providing: title, unique course code, department, description, credit hours, format (lecture/lab/seminar/online/hybrid), and learning outcomes
- [ ] The system rejects duplicate course codes with a descriptive error
- [ ] A newly created course defaults to "Active" status and is visible in the catalogue (CAT-001)
- [ ] Creation is logged in the course change history

---

## COURSE-002: Update Course Details

**As an** Academic Staff member
**I want** to update the details of an existing course
**So that** the information students see is accurate and current

### Acceptance Criteria
- [ ] Academic Staff and Administrators can edit any field on an active course
- [ ] Each save creates a timestamped change-history entry recording what changed, who changed it, and when
- [ ] Students enrolled in a course section receive a notification (see [notifications-requirements.md](./notifications-requirements.md)) when the course description, schedule, or instructor changes materially
- [ ] Changes to prerequisites do not retroactively affect students already enrolled in the current term

---

## COURSE-003: Retire a Course

**As an** Academic Staff member
**I want** to retire a course that is no longer offered
**So that** students cannot enroll in it while historical records are preserved

### Acceptance Criteria
- [ ] Academic Staff and Administrators can set a course status to "Retired"
- [ ] Retiring a course with active enrollments in any open term requires an explicit Administrator confirmation step
- [ ] Retired courses are hidden from the student-facing catalogue but remain in historical records and transcripts
- [ ] Retired courses cannot be scheduled for future sections until reactivated by an Administrator

---

## COURSE-004: Schedule Course Sections per Semester

**As an** Academic Staff member
**I want** to schedule one or more sections of a course for a specific semester
**So that** students can enroll in specific meeting times and locations

### Acceptance Criteria
- [ ] A section requires: associated course, semester/term, instructor, meeting days/times, location (room or "online"), start and end dates, and section capacity (see [course-capacity-requirements.md](./course-capacity-requirements.md))
- [ ] The system prevents scheduling a section in a room that already has a confirmed booking for the same day/time
- [ ] The system prevents assigning an instructor to two sections with overlapping day/time
- [ ] Sections are visible in the course catalogue (CAT-001) once published by Academic Staff

---

## COURSE-005: Manage Prerequisites and Corequisites

**As an** Academic Staff member
**I want** to define prerequisites and corequisites for a course
**So that** students enroll in the correct sequence and the system enforces eligibility automatically

### Acceptance Criteria
- [ ] Academic Staff can add, edit, or remove prerequisites (courses that must be completed before enrollment) and corequisites (courses that must be taken concurrently)
- [ ] Prerequisites can specify a minimum grade requirement (e.g., "MATH-101 with grade C or higher")
- [ ] The registration system enforces prerequisite and corequisite rules at enrollment time (see AUTH-006)
- [ ] Changes to prerequisites are reflected in the catalogue detail page (CAT-004) immediately

---

## COURSE-006: Detect Registration Schedule Conflicts

**As a** Student
**I want** the system to detect and warn me about schedule conflicts during registration
**So that** I do not accidentally enroll in two courses with overlapping meeting times

### Acceptance Criteria
- [ ] When a student attempts to enroll in a section, the system checks all currently enrolled sections for that term for day/time overlap
- [ ] If a conflict is detected, enrollment is blocked and the student is shown which sections conflict
- [ ] Advisors can grant a conflict override for exceptional cases; overrides are logged
- [ ] The student's registration summary page (REG-004) clearly shows any pending conflict flags

---

## COURSE-007: Upload Course Materials

**As an** Instructor
**I want** to upload course materials to a section I am teaching
**So that** enrolled students can access syllabi, readings, and assignments in one place

### Acceptance Criteria
- [ ] Instructors can upload files (PDF, DOCX, PPTX, images, ZIP) up to 100 MB per file to their assigned sections
- [ ] Uploaded materials are visible only to students enrolled in that section and to Administrators
- [ ] Instructors can organize materials into folders (e.g., "Week 1", "Assignments")
- [ ] Instructors can update or delete materials; deletions are logged with the instructor's ID and timestamp
- [ ] Students receive an in-system notification (see [notifications-requirements.md](./notifications-requirements.md)) when new materials are posted

---

## COURSE-008: Send Course Announcements

**As an** Instructor
**I want** to send announcements to all students enrolled in my course section
**So that** students are promptly informed of important updates

### Acceptance Criteria
- [ ] Instructors can compose and send an announcement to all enrolled students in a section
- [ ] Announcements are delivered as in-system notifications and optionally via email (per student notification preferences — see [notifications-requirements.md](./notifications-requirements.md))
- [ ] Announcements are archived and visible to enrolled students in the course's announcement history
- [ ] Administrators can send announcements on behalf of an instructor if needed

---

## COURSE-009: Submit and View Course Ratings & Feedback

**As a** Student
**I want** to rate and provide feedback on a course I have completed
**So that** other students can make informed choices and faculty can improve course quality

### Acceptance Criteria
- [ ] Students can submit a rating (1–5 stars) and optional free-text feedback for a course section after the term ends (grade posting date or later)
- [ ] Ratings and feedback are anonymous to other students and instructors; only Administrators can associate a submission with a specific student
- [ ] Each student can submit feedback for a given section only once
- [ ] Instructors and Academic Staff can view aggregated ratings and anonymized feedback for sections they manage
- [ ] Aggregate ratings (average score, number of responses) are visible in the course catalogue detail page (CAT-004) after a minimum of 5 responses have been collected
