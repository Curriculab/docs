# Degree Programs & Curriculum Management Requirements

**Story Prefix:** DEG
**Feature Area:** Degree Programs & Curriculum Management
**System Overview:** [university-reg-features.md](./university-reg-features.md)
**Related docs:** Academic Records (degree audit) → [academic-records-requirements.md](./academic-records-requirements.md) | Course Catalogue → [course-catalogue-requirements.md](./course-catalogue-requirements.md) | Student Profile (program declaration) → [student-profile-requirements.md](./student-profile-requirements.md) | Transfer Credit (equivalency mapping) → [transfer-credit-requirements.md](./transfer-credit-requirements.md) (XFER-002, XFER-005) | Graduation (pre-grad audit) → [graduation-commencement-requirements.md](./graduation-commencement-requirements.md) (GRAD-003)

---

## DEG-001: Create a Degree Program

**As an** Academic Staff member
**I want** to create a new degree program in the system
**So that** students can declare it and the degree audit engine has a complete requirement set to evaluate against

### Acceptance Criteria
- [ ] Academic Staff and Administrators can create a degree program with: program name, degree type (B.A., B.S., M.A., M.S., Ph.D., Certificate, etc.), department/college, total credit hours required, and expected completion terms
- [ ] Program codes must be unique; duplicate codes are rejected with an error
- [ ] A new program defaults to "Draft" status and is not available for student declaration until published by an Administrator
- [ ] Publishing a program makes it available in the student profile program selector (PROF-004)

---

## DEG-002: Update Degree Requirements

**As an** Academic Staff member
**I want** to update the requirements for an existing degree program
**So that** the program reflects current curriculum decisions and accreditation standards

### Acceptance Criteria
- [ ] Academic Staff and Administrators can add, edit, or remove requirement categories and individual course requirements (DEG-004)
- [ ] Each change is saved with a timestamped change history entry (who changed it, what changed, when)
- [ ] Requirement changes are versioned: students declared under an earlier catalog year are evaluated against the requirements in effect at their declaration date, not the current version
- [ ] Advisors are notified when a program they advise students in has been updated

---

## DEG-003: Retire a Degree Program

**As an** Academic Staff member
**I want** to retire a degree program that is no longer offered
**So that** new students cannot declare it while existing students are not disrupted

### Acceptance Criteria
- [ ] Academic Staff and Administrators can set a program status to "Retired"
- [ ] Retired programs are hidden from the student-facing program selector (PROF-004) but remain fully accessible for existing declared students' degree audits (REC-006)
- [ ] Retiring a program with active declared students requires an Administrator confirmation step
- [ ] Administrators are shown a count of currently enrolled students with that declared program before confirming retirement
- [ ] Affected students and their Advisors receive a notification when a program is retired, directing them to consult with their Advisor about alternatives

---

## DEG-004: Define Requirement Categories

**As an** Academic Staff member
**I want** to organize a degree program's requirements into named categories
**So that** students and advisors can clearly see which obligations belong to core requirements, electives, concentrations, and general education

### Acceptance Criteria
- [ ] Each degree program can contain multiple named requirement categories (e.g., "Core Requirements", "Technical Electives", "General Education", "Capstone")
- [ ] Each category specifies: a name, a minimum credit-hour total to satisfy it, and whether it is required or optional (e.g., a concentration track)
- [ ] Categories can be reordered for display purposes without affecting requirement logic
- [ ] The degree audit (REC-006) groups results by category and shows fulfilled vs. outstanding credit hours per category
- [ ] A category can be shared across multiple programs (e.g., a common General Education block)

---

## DEG-005: Map Courses and Equivalencies to Requirements

**As an** Academic Staff member
**I want** to specify which courses satisfy each degree requirement
**So that** the degree audit engine can automatically match a student's completed courses to their remaining obligations

### Acceptance Criteria
- [ ] Academic Staff can map one or more catalogue courses (CAT-001) to each requirement slot
- [ ] Equivalency rules can be defined: a course at another institution (transfer credit) can be marked as equivalent to a specific Curriculab course for audit purposes
- [ ] A single course can satisfy requirements in multiple categories if the program rules allow it (double-counting); programs can restrict double-counting per category
- [ ] "Elective" slots can be defined with constraints (e.g., "any 3-credit CSCI course at the 300 level or above") rather than specific course codes
- [ ] Changes to course mappings are versioned consistent with DEG-002 catalog-year rules

---

## DEG-006: View Catalog Year for a Student's Program

**As an** Advisor
**I want** to see which catalog year governs a student's degree requirements
**So that** I can advise them accurately using the correct version of the program requirements

### Acceptance Criteria
- [ ] The student's declared program record displays the catalog year under which they are evaluated (defaulting to the academic year of their program declaration — PROF-004)
- [ ] Advisors and Administrators can change a student's catalog year with a required reason note; the change is logged and the student is notified
- [ ] The degree audit (REC-006) clearly states the catalog year in use at the top of the report
- [ ] Students can view their own catalog year on their profile page but cannot change it without advisor action
