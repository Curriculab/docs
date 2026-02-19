# Curriculab — System Overview

## Purpose and Scope

This document describes the scope of **Curriculab**, a comprehensive university registration and management platform that supports the full lifecycle of student registration, course management, academic records, billing, and institutional reporting.

Curriculab serves students, faculty, academic staff, advisors, registrars, and administrators. It integrates with external systems (financial aid, housing, library) and exposes a REST API for authorized third-party consumers.

All detailed functional requirements are captured as **user stories** in the documents listed in the Feature Area Index below.

---

## User Roles

| Role | Description | Key Permissions |
|---|---|---|
| **Student** | Enrolled learner | Register for courses, view records and grades, pay bills, manage personal preferences |
| **Instructor** | Faculty member teaching a section | Upload materials, post announcements, submit grades, view enrollment roster |
| **Academic Staff** | Department staff managing courses | Create/update/retire courses and catalogue entries, manage schedules and prerequisites |
| **Advisor** | Academic advisor | View student records, override enrollment restrictions, approve registration exceptions |
| **Registrar** | Manages registration windows and deadlines | Define academic terms, set registration open/close and add/drop dates, manage waitlist rules |
| **Administrator** | System/registrar admin with full access | All permissions above plus user management, system configuration, data backup/restore, audit logs |

---

## Feature Area Index

| # | Feature Area | Document | Story Prefix | Stories |
|---|---|---|---|---|
| 1 | User Authentication & Authorization | [user-authentication-requirements.md](./user-authentication-requirements.md) | AUTH | AUTH-001 – AUTH-010 |
| 2 | Course Catalogue | [course-catalogue-requirements.md](./course-catalogue-requirements.md) | CAT | CAT-001 – CAT-005 |
| 3 | Course Management | [course-management-requirements.md](./course-management-requirements.md) | COURSE | COURSE-001 – COURSE-009 |
| 4 | Course Capacity | [course-capacity-requirements.md](./course-capacity-requirements.md) | CAP | CAP-001 – CAP-006 |
| 5 | Course Waitlists | [course-waitlists-requirements.md](./course-waitlists-requirements.md) | WAIT | WAIT-001 – WAIT-008 |
| 6 | Student Registration | [student-registration-requirements.md](./student-registration-requirements.md) | REG | REG-001 – REG-006 |
| 7 | Semester & Session Management | [semester-session-requirements.md](./semester-session-requirements.md) | SEM | SEM-001 – SEM-006 |
| 8 | Academic Records | [academic-records-requirements.md](./academic-records-requirements.md) | REC | REC-001 – REC-008 |
| 9 | Payment & Billing | [payment-billing-requirements.md](./payment-billing-requirements.md) | PAY | PAY-001 – PAY-006 |
| 10 | Reporting | [reporting-requirements.md](./reporting-requirements.md) | RPT | RPT-001 – RPT-005 |
| 11 | Integrations | [integration-requirements.md](./integration-requirements.md) | INT | INT-001 – INT-005 |
| 12 | Accessibility | [accessibility-requirements.md](./accessibility-requirements.md) | ACC | ACC-001 – ACC-005 |
| 13 | Security & Privacy | [security-privacy-requirements.md](./security-privacy-requirements.md) | SEC | SEC-001 – SEC-005 |
| 14 | Notifications | [notifications-requirements.md](./notifications-requirements.md) | NOTIF | NOTIF-001 – NOTIF-005 |
| 15 | Support & Help | [support-help-requirements.md](./support-help-requirements.md) | SUP | SUP-001 – SUP-005 |
| 16 | Student Profile & Account Management | [student-profile-requirements.md](./student-profile-requirements.md) | PROF | PROF-001 – PROF-006 |
| 17 | Degree Programs & Curriculum Management | [degree-programs-requirements.md](./degree-programs-requirements.md) | DEG | DEG-001 – DEG-006 |
| 18 | Room & Facility Management | [room-facility-requirements.md](./room-facility-requirements.md) | ROOM | ROOM-001 – ROOM-005 |
| 19 | Administrative User Management | [admin-user-management-requirements.md](./admin-user-management-requirements.md) | USR | USR-001 – USR-006 |
| 20 | Academic Advising | [academic-advising-requirements.md](./academic-advising-requirements.md) | ADV | ADV-001 – ADV-006 |
| 21 | Graduation & Commencement | [graduation-commencement-requirements.md](./graduation-commencement-requirements.md) | GRAD | GRAD-001 – GRAD-006 |
| 22 | Transfer Credit Evaluation | [transfer-credit-requirements.md](./transfer-credit-requirements.md) | XFER | XFER-001 – XFER-005 |
| 23 | Document Management | [document-management-requirements.md](./document-management-requirements.md) | DOC | DOC-001 – DOC-005 |

---

## Cross-Cutting Concerns

The following concerns span multiple feature areas and are each owned by a dedicated requirements document:

- **Security & Privacy** — Data encryption, FERPA/GDPR compliance, backups, and retention policy are defined in [security-privacy-requirements.md](./security-privacy-requirements.md).
- **Accessibility** — WCAG 2.1 AA compliance, keyboard navigation, screen reader support, and responsive design are defined in [accessibility-requirements.md](./accessibility-requirements.md).
- **Notifications** — Email, SMS, and in-system notification rules are defined in [notifications-requirements.md](./notifications-requirements.md). Individual feature documents cross-reference this doc rather than defining notification behavior independently.
- **Deduplication** — Waitlist behavior is the single source of truth in [course-waitlists-requirements.md](./course-waitlists-requirements.md). The course capacity and course management docs cross-reference it rather than duplicating waitlist stories.
