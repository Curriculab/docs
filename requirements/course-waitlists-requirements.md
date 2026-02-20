---
sidebar_label: "Waitlists"
description: "Waitlist join, position tracking, auto-enrollment, priority rules, and reporting."
---

# Course Waitlist Requirements

**Story Prefix:** WAIT
**Feature Area:** Course Waitlists
**System Overview:** [university-reg-features.md](./university-reg-features.md)

> **Single source of truth:** All waitlist behavior is defined here. The course capacity doc (CAP-003) and course management doc reference this document rather than duplicating waitlist stories.

---

## WAIT-001: Join a Waitlist

**As a** Student
**I want** to join a waitlist when a section I want is full
**So that** I am considered for enrollment if a seat becomes available

### Acceptance Criteria
- [ ] When a section is at capacity, the "Enroll" button is replaced by a "Join Waitlist" button on the catalogue and registration pages
- [ ] A student can join the waitlist only if they meet the course prerequisites (AUTH-006) and have no schedule conflict with the waitlisted section
- [ ] A student cannot join the waitlist for a section they are already enrolled in or already waitlisted for
- [ ] Upon joining, the student receives a confirmation notification with their waitlist position (see [notifications-requirements.md](./notifications-requirements.md))

---

## WAIT-002: View Waitlist Position and Likelihood Estimate

**As a** Student
**I want** to see my current waitlist position and an estimate of my chances of getting a seat
**So that** I can decide whether to continue waiting or find an alternative course

### Acceptance Criteria
- [ ] Students can view their waitlist position (e.g., "Position 3 of 12") from their registration summary page (REG-004)
- [ ] The system displays a likelihood estimate based on historical drop rates for similar sections (e.g., "Low / Medium / High" or a percentage)
- [ ] Position and estimate update in real time as other students join or leave the waitlist
- [ ] Students are shown the deadline after which automatic enrollment from the waitlist will stop (WAIT-006)

---

## WAIT-003: Automatic Enrollment from Waitlist

**As a** Student on a waitlist
**I want** to be automatically enrolled when a seat opens up
**So that** I do not have to monitor the section and manually re-enroll

### Acceptance Criteria
- [ ] When an enrolled student drops a section, the system immediately offers the vacated seat to the first eligible student on the waitlist
- [ ] The waitlisted student is enrolled automatically if the waitlist deadline (WAIT-006) has not passed and the student remains eligible (no new conflicts, enrollment period still open)
- [ ] The newly enrolled student receives a notification within 15 minutes of the seat becoming available (see [notifications-requirements.md](./notifications-requirements.md))
- [ ] All remaining waitlisted students move up one position after the enrollment occurs
- [ ] If the first waitlisted student is no longer eligible (e.g., has since enrolled in a conflicting section), the offer passes to the next eligible student

---

## WAIT-004: Decline a Waitlist Spot

**As a** Student
**I want** to decline a waitlist enrollment offer if my circumstances have changed
**So that** the seat can be offered to the next student without delay

### Acceptance Criteria
- [ ] When automatically enrolled from the waitlist, the student has a configurable window (default: 24 hours) to decline the enrollment
- [ ] Declining removes the student from the section roster and offers the seat to the next student on the waitlist
- [ ] A student who declines is removed from the waitlist and must re-join from the bottom if they change their mind
- [ ] The student receives a notification confirming the decline and informing them they have been removed from the waitlist

---

## WAIT-005: Leave the Waitlist Voluntarily

**As a** Student
**I want** to remove myself from a waitlist at any time
**So that** I no longer receive offers for a section I am no longer interested in

### Acceptance Criteria
- [ ] A "Leave Waitlist" button is available on the registration summary page (REG-004) for any active waitlist entry
- [ ] Removing oneself from the waitlist does not affect other students' positions (remaining students do not shift up)
- [ ] The student receives a confirmation notification that they have been removed from the waitlist
- [ ] A student who leaves can re-join the waitlist; they are placed at the end of the current queue

---

## WAIT-006: Waitlist Enrollment Deadline

**As a** Registrar
**I want** to set a deadline after which automatic waitlist enrollments stop
**So that** students are not unexpectedly added to courses after classes have begun

### Acceptance Criteria
- [ ] Registrars and Administrators can configure a waitlist enrollment deadline per section (defaults to the add/drop deadline for the term — see SEM-003)
- [ ] After the deadline, automatic enrollment from the waitlist is suspended
- [ ] Students remaining on the waitlist after the deadline are notified that automatic enrollment has ended and instructed to contact the registrar if they still need the course
- [ ] The deadline is displayed to waitlisted students on their registration summary page (REG-004)

---

## WAIT-007: Priority Waitlist Rules

**As a** Registrar
**I want** to configure priority ordering rules for the waitlist
**So that** students with greater need (e.g., graduating seniors) are served before lower-priority students

### Acceptance Criteria
- [ ] Registrars and Administrators can define priority tiers (e.g., Seniors > Juniors > Sophomores > Freshmen, or Honors students first) per section or globally
- [ ] When a seat becomes available, the system offers it to the highest-priority eligible student regardless of join time within the same priority tier
- [ ] Within the same priority tier, position is determined by waitlist join time (first come, first served)
- [ ] Priority rules are displayed to students when they join the waitlist so they understand how ordering works
- [ ] Priority rule changes after students have joined the waitlist are applied prospectively and trigger notifications to affected students

---

## WAIT-008: Waitlist Reports

**As an** Administrator
**I want** to view reports on waitlist sizes, trends, and movement
**So that** I can make data-driven decisions about opening new sections or adjusting capacity

### Acceptance Criteria
- [ ] The report displays, per section: current waitlist size, total students who joined, total auto-enrollments, total declines, total voluntary departures, and average wait time to enrollment
- [ ] Reports can be filtered by term, department, and section
- [ ] Sections with waitlists longer than their enrollment capacity are flagged for review
- [ ] Reports can be exported as CSV (see [reporting-requirements.md](./reporting-requirements.md) RPT-004)
- [ ] Access is restricted to Administrators, Academic Staff, and Registrars
