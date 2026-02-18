# Semester & Session Management Requirements

**Story Prefix:** SEM
**Feature Area:** Semester & Session Management
**System Overview:** [university-reg-features.md](./university-reg-features.md)

---

## SEM-001: Create a New Academic Term

**As a** Registrar
**I want** to create a new academic term in the system
**So that** courses can be scheduled, sections offered, and students registered for that period

### Acceptance Criteria
- [ ] Registrars and Administrators can create a term with: name (e.g., "Fall 2026"), term type (semester/quarter/summer), start date, and end date
- [ ] Term names must be unique; duplicate names are rejected with an error
- [ ] A new term defaults to "Draft" status and is not visible to students until published
- [ ] Registrars can publish a term, making it visible in the catalogue and available for section scheduling

---

## SEM-002: Set Registration Open/Close Dates per Term

**As a** Registrar
**I want** to configure when registration opens and closes for each term
**So that** students can only register during the designated window

### Acceptance Criteria
- [ ] Registrars and Administrators can set a registration open date/time and a close date/time per term
- [ ] Registration is automatically enabled and disabled by the system at the configured dates/times without manual intervention
- [ ] Attempting to register outside the window displays a clear message stating when registration opens or closed
- [ ] Registrars can manually open or close registration early for exceptional circumstances, with the change logged in the audit trail (AUTH-010)
- [ ] Priority group registration windows (see CAP-004) are configurable as sub-windows within the overall registration window

---

## SEM-003: Set Add/Drop Deadline per Term

**As a** Registrar
**I want** to define the add/drop deadline for each term
**So that** students and staff know the last date for penalty-free schedule changes

### Acceptance Criteria
- [ ] Registrars and Administrators can set an add/drop deadline (date and time) per term
- [ ] The deadline is displayed prominently on the student registration summary (REG-004) and in the course catalogue
- [ ] After the deadline, course adds are blocked for students; drops are still possible but result in a "W" grade and may require advisor approval
- [ ] Automated reminders are sent to enrolled students 7 days and 1 day before the add/drop deadline (see [notifications-requirements.md](./notifications-requirements.md))

---

## SEM-004: Manage Multiple Concurrent Academic Sessions

**As a** Registrar
**I want** to run multiple academic sessions simultaneously
**So that** the university can offer standard semester, summer, and accelerated courses concurrently

### Acceptance Criteria
- [ ] The system supports multiple active terms at the same time (e.g., Spring 2026 and Summer 2026 can be open simultaneously)
- [ ] Each term has its own independent registration window, add/drop deadline, and course sections
- [ ] Students can view registrations across all active terms from their registration summary (REG-004)
- [ ] Section scheduling tools clearly indicate which term each section belongs to and prevent accidental assignment to the wrong term

---

## SEM-005: Configure Application Deadlines for Special Programs

**As a** Registrar
**I want** to set application deadlines for special programs (e.g., honors, scholarships, study abroad)
**So that** students are aware of and can meet program-specific requirements

### Acceptance Criteria
- [ ] Registrars and Administrators can create program deadline entries with: program name, application open date, application deadline, and a contact email/URL for more information
- [ ] Program deadlines are displayed on a student-facing "Deadlines" page and on the main student dashboard
- [ ] Automated reminders are sent to eligible students 14 days and 3 days before each program deadline (see [notifications-requirements.md](./notifications-requirements.md))
- [ ] Past deadlines are archived and visible to staff but hidden from the student-facing view

---

## SEM-006: Archive a Completed Term

**As a** Registrar
**I want** to archive a term once it is complete
**So that** historical data is preserved and the active term list remains uncluttered

### Acceptance Criteria
- [ ] A term can be archived only after its end date has passed and all grades have been submitted (REC-007)
- [ ] Archiving a term is reversible by an Administrator (terms can be unarchived for corrections)
- [ ] Archived terms are hidden from active registration views but remain fully accessible in academic records and reports
- [ ] Students can view archived term enrollment history in their academic records (REC-002)
