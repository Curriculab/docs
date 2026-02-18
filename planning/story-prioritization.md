# Story Prioritization — MoSCoW

This document assigns a MoSCoW priority to every user story across all feature docs. Priorities reflect what is needed to deliver a functional v1 University Registration System versus what can be deferred.

**Legend**
- **M — Must Have:** System cannot go live without this. Core registration flow, security, legal compliance.
- **S — Should Have:** High value; included in v1 unless timeline forces deferral.
- **C — Could Have:** Useful enhancement; deferred to v2 without significant impact to users.
- **W — Won't Have (this release):** Explicitly out of scope for v1; acknowledged for backlog.

---

## User Authentication & Authorization (AUTH)

| Story ID | Title | Priority | Notes |
|---|---|---|---|
| AUTH-001 | Login with credentials | M | |
| AUTH-002 | Password recovery | M | |
| AUTH-003 | Two-factor authentication | S | Mandate for admin roles in v1; optional for students |
| AUTH-004 | Session timeout | M | |
| AUTH-005 | Role-based access control | M | |
| AUTH-006 | Course registration authorization checks | M | |
| AUTH-007 | Data modification restrictions by role | M | |
| AUTH-008 | Restricted report access | M | |
| AUTH-009 | Payment & billing access restriction | M | |
| AUTH-010 | Activity audit logging | M | Legal/compliance requirement |

---

## Course Catalogue (CAT)

| Story ID | Title | Priority | Notes |
|---|---|---|---|
| CAT-001 | Browse course catalogue | M | |
| CAT-002 | Search courses by keyword | M | |
| CAT-003 | Filter courses | S | |
| CAT-004 | View course detail page | M | |
| CAT-005 | Create/update/retire catalogue entries | M | |

---

## Course Management (COURSE)

| Story ID | Title | Priority | Notes |
|---|---|---|---|
| COURSE-001 | Create a course | M | |
| COURSE-002 | Update course details | M | |
| COURSE-003 | Retire a course | M | |
| COURSE-004 | Schedule course sections per semester | M | |
| COURSE-005 | Manage prerequisites and corequisites | M | |
| COURSE-006 | Detect registration schedule conflicts | M | |
| COURSE-007 | Upload course materials | S | LMS integration may cover this in v2 |
| COURSE-008 | Send course announcements | S | |
| COURSE-009 | Submit and view course ratings & feedback | C | |

---

## Course Capacity (CAP)

| Story ID | Title | Priority | Notes |
|---|---|---|---|
| CAP-001 | Set section capacity | M | |
| CAP-002 | View real-time enrollment count | M | |
| CAP-003 | Enforce capacity at enrollment | M | |
| CAP-004 | Reserve seats for priority groups | S | |
| CAP-005 | Over-enrollment override | S | |
| CAP-006 | Enrollment reports | S | |

---

## Course Waitlists (WAIT)

| Story ID | Title | Priority | Notes |
|---|---|---|---|
| WAIT-001 | Join a waitlist | M | |
| WAIT-002 | View waitlist position and likelihood estimate | M | |
| WAIT-003 | Automatic enrollment from waitlist | M | |
| WAIT-004 | Decline a waitlist spot | M | |
| WAIT-005 | Leave the waitlist voluntarily | M | |
| WAIT-006 | Waitlist enrollment deadline | M | |
| WAIT-007 | Priority waitlist rules | S | |
| WAIT-008 | Waitlist reports | S | |

---

## Student Registration (REG)

| Story ID | Title | Priority | Notes |
|---|---|---|---|
| REG-001 | Register for courses in an open semester | M | |
| REG-002 | Add a course during add/drop period | M | |
| REG-003 | Drop a course during add/drop period | M | |
| REG-004 | View current semester registration summary | M | |
| REG-005 | Receive registration confirmation (email) | M | |
| REG-006 | View registration holds on account | M | |

---

## Semester & Session Management (SEM)

| Story ID | Title | Priority | Notes |
|---|---|---|---|
| SEM-001 | Create a new academic term | M | |
| SEM-002 | Set registration open/close dates per term | M | |
| SEM-003 | Set add/drop deadline per term | M | |
| SEM-004 | Manage multiple concurrent academic sessions | S | |
| SEM-005 | Configure application deadlines for special programs | C | |
| SEM-006 | Archive a completed term | S | |

---

## Academic Records (REC)

| Story ID | Title | Priority | Notes |
|---|---|---|---|
| REC-001 | View current enrollment summary | M | |
| REC-002 | View enrollment history (past terms) | M | |
| REC-003 | View unofficial transcript | M | |
| REC-004 | Request official transcript | S | |
| REC-005 | View GPA and academic standing | M | |
| REC-006 | Run a degree audit | M | Required for advising and graduation |
| REC-007 | Faculty submit grades for a section | M | |
| REC-008 | Student view posted grades | M | |

---

## Payment & Billing (PAY)

| Story ID | Title | Priority | Notes |
|---|---|---|---|
| PAY-001 | View tuition and fee breakdown per term | M | |
| PAY-002 | Make an online payment | M | |
| PAY-003 | View payment history | M | |
| PAY-004 | Receive automated billing reminders | S | |
| PAY-005 | View financial aid applied to balance | S | Depends on INT-001 |
| PAY-006 | Generate a billing statement | S | |

---

## Reporting (RPT)

| Story ID | Title | Priority | Notes |
|---|---|---|---|
| RPT-001 | View enrollment report | S | |
| RPT-002 | View demographic report | C | |
| RPT-003 | View course completion and grade distribution report | S | |
| RPT-004 | Export any report as CSV | S | |
| RPT-005 | Schedule automated report delivery | C | |

---

## Integrations (INT)

| Story ID | Title | Priority | Notes |
|---|---|---|---|
| INT-001 | Sync student financial aid data | S | Required for PAY-005 |
| INT-002 | Sync student housing data | C | |
| INT-003 | Sync library account/access | C | |
| INT-004 | Expose REST API for third-party integrations | C | |
| INT-005 | Authenticate API consumers via OAuth 2.0 | C | Depends on INT-004 |

---

## Accessibility (ACC)

| Story ID | Title | Priority | Notes |
|---|---|---|---|
| ACC-001 | Access on desktop, tablet, and mobile | M | |
| ACC-002 | Navigate using keyboard only | M | Legal requirement in most jurisdictions |
| ACC-003 | Screen reader / WCAG 2.1 AA compliance | M | Legal requirement |
| ACC-004 | High-contrast or large-text mode | S | |
| ACC-005 | Supported browsers | M | |

---

## Security & Privacy (SEC)

| Story ID | Title | Priority | Notes |
|---|---|---|---|
| SEC-001 | Encrypt all sensitive data at rest and in transit | M | |
| SEC-002 | Comply with FERPA/GDPR | M | Legal requirement |
| SEC-003 | Automated daily data backups | M | |
| SEC-004 | Restore system from backup | M | |
| SEC-005 | Data retention and deletion policy | M | |

---

## Notifications (NOTIF)

| Story ID | Title | Priority | Notes |
|---|---|---|---|
| NOTIF-001 | Email notification for registration events | M | |
| NOTIF-002 | SMS notification (opt-in) | C | |
| NOTIF-003 | In-system notification center | S | |
| NOTIF-004 | Admin/instructor announcement | S | |
| NOTIF-005 | Personal notification preferences | S | |

---

## Support & Help (SUP)

| Story ID | Title | Priority | Notes |
|---|---|---|---|
| SUP-001 | Browse FAQ and help documentation | S | |
| SUP-002 | Submit a support ticket | S | |
| SUP-003 | Track status of a submitted ticket | S | |
| SUP-004 | Support staff view and respond to tickets | S | |
| SUP-005 | Admin view ticket volume and resolution metrics | C | |

---

## Student Profile & Account Management (PROF)

| Story ID | Title | Priority | Notes |
|---|---|---|---|
| PROF-001 | View and update personal contact information | M | |
| PROF-002 | Manage emergency contacts | S | |
| PROF-003 | View enrollment status | M | |
| PROF-004 | Declare or change academic program | M | Required for degree audit |
| PROF-005 | Upload a profile photo | C | |
| PROF-006 | Request an enrollment verification letter | S | |

---

## Degree Programs & Curriculum Management (DEG)

| Story ID | Title | Priority | Notes |
|---|---|---|---|
| DEG-001 | Create a degree program | M | Required for degree audit and PROF-004 |
| DEG-002 | Update degree requirements | M | |
| DEG-003 | Retire a degree program | S | |
| DEG-004 | Define requirement categories | M | |
| DEG-005 | Map courses and equivalencies to requirements | M | |
| DEG-006 | View catalog year for a student's program | S | |

---

## Room & Facility Management (ROOM)

| Story ID | Title | Priority | Notes |
|---|---|---|---|
| ROOM-001 | Add a room or facility | M | Required for COURSE-004 |
| ROOM-002 | Update room attributes | M | |
| ROOM-003 | View room availability | M | |
| ROOM-004 | Enforce room scheduling conflicts | M | |
| ROOM-005 | Mark a room as unavailable | S | |

---

## Administrative User Management (USR)

| Story ID | Title | Priority | Notes |
|---|---|---|---|
| USR-001 | Create a user account | M | |
| USR-002 | Deactivate and reactivate a user account | M | |
| USR-003 | Bulk import users | S | |
| USR-004 | Provision users via SSO/directory | S | Many universities already have LDAP/AD |
| USR-005 | Manage role assignments | M | |
| USR-006 | Search and filter user accounts | S | |

---

## Academic Advising (ADV)

| Story ID | Title | Priority | Notes |
|---|---|---|---|
| ADV-001 | View assigned advisor information | S | |
| ADV-002 | Schedule an advising appointment | C | |
| ADV-003 | View advising roster | S | |
| ADV-004 | Record advising session notes | S | |
| ADV-005 | Create and update a student academic plan | C | |
| ADV-006 | Grant enrollment exceptions and overrides | S | Overrides referenced in AUTH-006 |

---

## Graduation & Commencement (GRAD)

| Story ID | Title | Priority | Notes |
|---|---|---|---|
| GRAD-001 | Apply for graduation | S | |
| GRAD-002 | Review and process graduation applications | S | |
| GRAD-003 | Run a pre-graduation degree audit clearance | S | |
| GRAD-004 | Register for commencement ceremony | C | |
| GRAD-005 | Order a diploma | C | |
| GRAD-006 | View graduation status | S | |

---

## Transfer Credit Evaluation (XFER)

| Story ID | Title | Priority | Notes |
|---|---|---|---|
| XFER-001 | Submit a transfer credit evaluation request | S | |
| XFER-002 | Review and decide on transfer credit | S | |
| XFER-003 | View transfer credit decisions | S | |
| XFER-004 | Appeal a transfer credit decision | C | |
| XFER-005 | Apply approved transfer credits to degree audit | S | |

---

## Document Management (DOC)

| Story ID | Title | Priority | Notes |
|---|---|---|---|
| DOC-001 | Submit an official document | S | Required for XFER-001 |
| DOC-002 | Review and process submitted documents | S | |
| DOC-003 | Track submitted document status | S | |
| DOC-004 | Generate and download official university documents | S | |
| DOC-005 | Configure document types and retention rules | C | |

---

## Summary Counts

| Priority | Count |
|---|---|
| **Must Have** | 64 |
| **Should Have** | 40 |
| **Could Have** | 18 |
| **Won't Have (v1)** | 0 |
| **Total** | 122 |

> **Note:** No stories are classified as Won't Have because all represent legitimate functionality for a university registration system. Prioritization reflects delivery phasing, not permanent exclusion.
