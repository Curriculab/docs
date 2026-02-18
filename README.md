# automation-university-docs

Requirements documentation for a large-scale **University Registration System (URS)** simulation. All functional requirements are written as **user stories** with acceptance criteria to support test-driven development, stakeholder review, and automation testing exercises.

## User Story Format

Every story follows this structure:

```markdown
## XXXX-NNN: Story Title

**As a** [role]
**I want** [goal]
**So that** [benefit]

### Acceptance Criteria
- [ ] ...
```

User roles (Student, Instructor, Academic Staff, Advisor, Registrar, Administrator) are defined in the [System Overview](./university-reg-features.md).

---

## Document Index

| Document | Prefix | Stories | Description |
|---|---|---|---|
| [System Overview](./university-reg-features.md) | — | — | Purpose, scope, user roles, feature index, cross-cutting concerns |
| [User Authentication & Authorization](./user-authentication-requirements.md) | AUTH | AUTH-001 – AUTH-010 | Login, password recovery, 2FA, session timeout, RBAC, audit logging |
| [Course Catalogue](./course-catalogue-requirements.md) | CAT | CAT-001 – CAT-005 | Browse, search, filter, view course details, create/update/retire entries |
| [Course Management](./course-management-requirements.md) | COURSE | COURSE-001 – COURSE-009 | Course lifecycle, section scheduling, prerequisites, materials, announcements, ratings |
| [Course Capacity](./course-capacity-requirements.md) | CAP | CAP-001 – CAP-006 | Set capacity, real-time counts, enrollment enforcement, reserved seats, overrides, reports |
| [Course Waitlists](./course-waitlists-requirements.md) | WAIT | WAIT-001 – WAIT-008 | Join, view position, auto-enrollment, decline, leave, deadlines, priority rules, reports |
| [Student Registration](./student-registration-requirements.md) | REG | REG-001 – REG-006 | Register, add/drop, registration summary, email confirmation, holds |
| [Semester & Session Management](./semester-session-requirements.md) | SEM | SEM-001 – SEM-006 | Create terms, registration windows, add/drop deadlines, concurrent sessions, program deadlines, archiving |
| [Academic Records](./academic-records-requirements.md) | REC | REC-001 – REC-008 | Enrollment summary, history, unofficial/official transcripts, GPA, degree audit, grade submission |
| [Payment & Billing](./payment-billing-requirements.md) | PAY | PAY-001 – PAY-006 | Fee breakdown, online payment, history, billing reminders, financial aid display, statements |
| [Reporting](./reporting-requirements.md) | RPT | RPT-001 – RPT-005 | Enrollment, demographic, grade-distribution reports, CSV export, scheduled delivery |
| [Integrations](./integration-requirements.md) | INT | INT-001 – INT-005 | Financial aid, housing, library syncs; REST API; OAuth 2.0 consumer auth |
| [Accessibility](./accessibility-requirements.md) | ACC | ACC-001 – ACC-005 | Responsive design, keyboard navigation, WCAG 2.1 AA / screen reader, high-contrast, browser support |
| [Security & Privacy](./security-privacy-requirements.md) | SEC | SEC-001 – SEC-005 | Encryption, FERPA/GDPR compliance, daily backups, restore, data retention/deletion |
| [Notifications](./notifications-requirements.md) | NOTIF | NOTIF-001 – NOTIF-005 | Email and SMS events, in-system notification center, announcements, preference settings |
| [Support & Help](./support-help-requirements.md) | SUP | SUP-001 – SUP-005 | FAQ/help center, ticket submission, ticket tracking, staff response workflow, metrics |
| [Student Profile & Account Management](./student-profile-requirements.md) | PROF | PROF-001 – PROF-006 | Personal info, emergency contacts, enrollment status, program declaration, profile photo, verification letters |
| [Degree Programs & Curriculum Management](./degree-programs-requirements.md) | DEG | DEG-001 – DEG-006 | Create/update/retire programs, requirement categories, course mappings, catalog year management |
| [Room & Facility Management](./room-facility-requirements.md) | ROOM | ROOM-001 – ROOM-005 | Add/update rooms, view availability, conflict enforcement, block unavailable periods |
| [Administrative User Management](./admin-user-management-requirements.md) | USR | USR-001 – USR-006 | Create/deactivate accounts, bulk import, SSO/directory provisioning, role management, user search |
| [Academic Advising](./academic-advising-requirements.md) | ADV | ADV-001 – ADV-006 | Advisor info, appointment scheduling, advising roster, session notes, academic plans, enrollment overrides |
| [Graduation & Commencement](./graduation-commencement-requirements.md) | GRAD | GRAD-001 – GRAD-006 | Graduation application, Registrar clearance, pre-grad audit, ceremony registration, diploma ordering, status tracking |
| [Transfer Credit Evaluation](./transfer-credit-requirements.md) | XFER | XFER-001 – XFER-005 | Submit transfer courses, staff review and decision, student view, appeals, degree audit application |
| [Document Management](./document-management-requirements.md) | DOC | DOC-001 – DOC-005 | Submit official documents, staff review workflow, status tracking, generate university documents, retention rules |

---

## Planning & Architecture Docs

| Document | Description |
|---|---|
| [story-prioritization.md](./story-prioritization.md) | MoSCoW priority table for all 122 stories across every feature area |
| [story-map.md](./story-map.md) | Five end-to-end user journeys mapping stories in sequence, plus cross-journey observations |
| [non-functional-requirements.md](./non-functional-requirements.md) | Performance, scalability, availability, maintainability, and localization requirements |

---

## Deduplication Notes

- **Waitlist behavior** is the single source of truth in [`course-waitlists-requirements.md`](./course-waitlists-requirements.md). The course capacity (CAP-003) and course management docs cross-reference it rather than restating waitlist stories.
- **Notification delivery rules** are defined entirely in [`notifications-requirements.md`](./notifications-requirements.md). Other docs reference specific NOTIF stories instead of defining delivery behavior inline.
- **Security and access control** cross-cutting rules are split: authentication/RBAC/audit logging live in [`user-authentication-requirements.md`](./user-authentication-requirements.md); encryption, compliance, and backup/restore live in [`security-privacy-requirements.md`](./security-privacy-requirements.md).
