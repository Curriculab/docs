# Story Map — User Journeys

A story map arranges user stories along real end-to-end journeys. Reading left-to-right shows the sequence of activities; reading top-to-bottom within a column shows the full depth of that step (must-have at the top, enhancements below).

Five key journeys are mapped below. Stories are referenced by ID; full acceptance criteria are in the individual feature docs.

---

## Journey 1: Student Registers for a Semester

**Actor:** Student | **Goal:** Enroll in the right courses before the registration deadline

```
DISCOVER         →  VERIFY ELIGIBILITY  →  ENROLL           →  CONFIRM          →  MANAGE
─────────────────────────────────────────────────────────────────────────────────────────
CAT-001 Browse   →  AUTH-006 Prereq      →  REG-001 Register →  REG-005 Email    →  REG-004 Summary
CAT-002 Search      checks               →  CAP-003 Capacity    confirm          →  REG-003 Drop
CAT-003 Filter   →  REG-006 Check holds  →  WAIT-001 Waitlist →  NOTIF-003 In-   →  REG-002 Add
CAT-004 Detail                              if full              system notif     →  WAIT-005 Leave
                                         →  COURSE-006 Conflict                     waitlist
                                            detection
```

**Supporting stories (referenced mid-journey):**
- SEM-002 — Registration window must be open
- SEM-003 — Add/drop deadline governs REG-002/REG-003
- WAIT-002 — Student monitors waitlist position
- WAIT-003 — Auto-enrollment fires when a seat opens
- WAIT-004 — Student declines waitlist spot

**Gaps this journey exposed in earlier docs:** None — all steps have owning stories.

---

## Journey 2: Academic Staff Opens a New Semester

**Actor:** Academic Staff / Registrar | **Goal:** Stand up a new term so students can register

```
CREATE TERM    →  BUILD CATALOGUE  →  SCHEDULE SECTIONS  →  SET WINDOWS      →  PUBLISH
───────────────────────────────────────────────────────────────────────────────────────
SEM-001 Create →  CAT-005 Create   →  COURSE-004 Schedule →  SEM-002 Reg open →  SEM-001 Publish
term              entries          →  ROOM-003 Check room    / close dates        term (draft →
               →  DEG-001 Confirm     availability        →  SEM-003 Add/drop     published)
                  programs active  →  ROOM-004 Conflict       deadline
                                      check               →  CAP-004 Reserve
                                   →  CAP-001 Set             seats
                                      capacity            →  WAIT-007 Priority
                                   →  COURSE-005             waitlist rules
                                      Set prereqs
```

**Supporting stories:**
- ROOM-001, ROOM-002 — Rooms must exist before ROOM-003 can find them
- USR-001/USR-003 — Student and instructor accounts must be provisioned before sections can be assigned
- NOTIF-004 — Announce registration opening to students

---

## Journey 3: Instructor Manages a Course Section

**Actor:** Instructor | **Goal:** Prepare for, run, and close out a course section each term

```
PRE-TERM       →  TERM OPENS     →  DURING TERM        →  END OF TERM
──────────────────────────────────────────────────────────────────────
COURSE-007     →  CAP-002 View   →  COURSE-007 Post    →  REC-007 Submit
Upload          enrollment          materials              grades
syllabus        count            →  COURSE-008 Send
               →  ADV-003 Roster    announcements
                  (Advisor view) →  NOTIF-004 Urgent
                                    announcement
                                    if needed

                                                        →  COURSE-009
                                                           Students rate
                                                           course (after
                                                           grades post)
```

**Supporting stories:**
- AUTH-007 — Only the assigned instructor can submit grades for their own section
- REC-008 — Students see grades as soon as submitted

---

## Journey 4: Student Completes Degree and Graduates

**Actor:** Student + Advisor + Registrar | **Goal:** Confirm degree completion and process graduation

```
PLAN          →  MONITOR         →  APPLY             →  CLEARANCE        →  CEREMONY
────────────────────────────────────────────────────────────────────────────────────────
ADV-005       →  REC-006 Degree  →  GRAD-001 Apply    →  GRAD-003 Auto    →  GRAD-004
Academic         audit              for graduation       audit clearance      Register
plan                             →  GRAD-002           →  GRAD-002         →  GRAD-005
              →  PROF-004           Registrar             Registrar           Order
                 Declare program    reviews               approves/            diploma
              →  XFER-005        →  GRAD-006 Status       denies           →  GRAD-006
                 Transfer credits   tracking           →  GRAD-006            Final
                 applied                                  Status update        status
```

**Supporting stories:**
- DEG-004, DEG-005 — Requirement categories and mappings power the degree audit
- DEG-006 — Catalog year determines which requirements apply
- PAY-001, PAY-002 — Any outstanding balance blocks GRAD-001 (via REG-006 hold)
- REC-004 — Official transcript often requested alongside graduation

---

## Journey 5: Administrator Onboards a New Student Cohort

**Actor:** Administrator | **Goal:** Get a new cohort of students into the system and ready to register

```
PROVISION      →  CONFIGURE       →  COMMUNICATE      →  SUPPORT
───────────────────────────────────────────────────────────────────
USR-003 Bulk   →  PROF-004 Assign →  NOTIF-004 Send   →  SUP-001
import             program            welcome             Help docs
               →  ADV-003 Assign     announcement         available
                  advisor to      →  SEM-002 Confirm  →  SUP-002/003
                  each student       reg window open     Ticket system
               →  REG-006 Clear  →  NOTIF-001 Reg        ready
                  holds if any       confirmation
               →  PAY-001 Term       emails fire on
                  billing            first enrollment
                  generated
```

**Supporting stories:**
- USR-004 — SSO provisioning may replace USR-003 bulk import if IdP is in place
- AUTH-005 — Role is set at account creation; determines what each student can access
- ACC-001 — Onboarding communications should link to accessible system (mobile-friendly)

---

## Cross-Journey Observations

| Observation | Affected Journeys | Implication |
|---|---|---|
| Degree audit (REC-006) is central to both student registration and graduation | 1, 4 | REC-006 must be performant; it runs on every degree audit page load and at graduation |
| Holds (REG-006) are a gateway that blocks journeys 1 and 4 | 1, 4 | Hold creation and removal must be near-real-time; see NOTIF-001 |
| Room availability (ROOM-003, ROOM-004) must be resolved before sections go live | 2 | ROOM stories are blocked by COURSE-004 in sequencing — implement ROOM before scheduling opens |
| Advisor approval gates program changes (PROF-004) and enrollment overrides (ADV-006) | 1, 4 | Advisor notification latency directly impacts student journeys |
| Bulk import (USR-003) must complete before registration opens (SEM-002) | 2, 5 | Hard dependency on sequencing in the admin onboarding journey |
