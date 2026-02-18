# Course Capacity Requirements

**Story Prefix:** CAP
**Feature Area:** Course Capacity
**System Overview:** [university-reg-features.md](./university-reg-features.md)
**Related docs:** Waitlist behavior (when capacity is reached) → [course-waitlists-requirements.md](./course-waitlists-requirements.md)

---

## CAP-001: Set Section Capacity

**As an** Academic Staff member
**I want** to set a maximum enrollment capacity for each course section
**So that** the section does not exceed the physical or instructional limits of the room and instructor

### Acceptance Criteria
- [ ] Academic Staff and Administrators can set a numeric capacity (≥ 1) on a section at creation time or before the section's registration opens
- [ ] Capacity changes after registration opens are permitted only for Administrators and require a confirmation step
- [ ] Reducing capacity below current enrollment is rejected with an error message showing the current enrollment count
- [ ] The set capacity is displayed on the course catalogue detail page (CAT-004)

---

## CAP-002: View Real-Time Enrollment Count

**As an** Academic Staff member
**I want** to see the current enrollment count for each section in real time
**So that** I can monitor demand and make timely capacity decisions

### Acceptance Criteria
- [ ] The enrollment count (enrolled / capacity) is visible on the section management dashboard for Academic Staff, Registrars, and Administrators
- [ ] The count updates within 5 seconds of any enrollment or drop event
- [ ] Students see the enrollment status (Open / Waitlist / Full) on the catalogue but not the exact count unless the university opts to display it

---

## CAP-003: Enforce Capacity at Enrollment

**As a** Student
**I want** the system to clearly tell me when a section is full and offer me the waitlist option
**So that** I can decide whether to wait or choose a different section

### Acceptance Criteria
- [ ] When a student attempts to enroll in a section that has reached its capacity, the enrollment is blocked
- [ ] The student is immediately offered the option to join the waitlist (see [course-waitlists-requirements.md](./course-waitlists-requirements.md))
- [ ] The catalogue and section detail page update to show "Full" status in real time once capacity is reached
- [ ] No manual intervention by staff is required to enforce the capacity limit

---

## CAP-004: Reserve Seats for Priority Groups

**As a** Registrar
**I want** to reserve a portion of section seats for priority enrollment groups (e.g., seniors, honors students)
**So that** eligible students are guaranteed access before general registration opens

### Acceptance Criteria
- [ ] Registrars and Administrators can define one or more priority groups per section and specify the number of reserved seats for each group
- [ ] Reserved seats are only available to the designated priority group during their registration window
- [ ] Unreserved seats (total capacity minus reserved seats) are available to all eligible students during general registration
- [ ] If the priority window closes and reserved seats remain unfilled, those seats automatically become available to the general pool
- [ ] The catalogue shows total capacity but does not expose reserved seat breakdowns to students

---

## CAP-005: Over-Enrollment Override

**As an** Advisor
**I want** to override enrollment capacity in exceptional cases
**So that** a student with a legitimate need can be added to a full section

### Acceptance Criteria
- [ ] Advisors and Administrators can enroll a student in a section beyond its stated capacity limit
- [ ] The override requires a mandatory reason/note field that is saved to the enrollment record
- [ ] The over-enrolled section is flagged with an "Over capacity" indicator on the staff dashboard
- [ ] All capacity overrides are recorded in the audit log (AUTH-010) with the approver's identity and reason
- [ ] The section's displayed enrollment count reflects the actual number including over-enrolled students

---

## CAP-006: Enrollment Reports

**As an** Administrator
**I want** to view enrollment reports across sections, departments, and terms
**So that** I can make informed decisions about capacity planning and new section offerings

### Acceptance Criteria
- [ ] The report shows each section with: enrolled count, capacity, waitlist size, over-enrollment count, and percentage fill rate
- [ ] Reports can be filtered by term, department, and delivery format
- [ ] Sections below 50% capacity and sections with active waitlists are visually highlighted for easy identification
- [ ] Reports can be exported as CSV (see [reporting-requirements.md](./reporting-requirements.md) RPT-004)
- [ ] Access is restricted to Administrators, Academic Staff, and Registrars
