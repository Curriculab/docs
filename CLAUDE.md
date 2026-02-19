# CLAUDE.md — Curriculab Docs

This file gives Claude Code the context needed to work effectively in this repo from the start of every session.

---

## What is Curriculab

**Curriculab** is a free, open-source reference platform that gives developers real-world practice on a production-grade system instead of basic tutorial apps. The platform is a fully realized university registration and management system, intentionally scoped to cover the full technology stack so that engineers across every discipline have something meaningful to work against:

- Automation / QA engineers
- API engineers
- Web and mobile front-end engineers
- DevOps / infrastructure engineers
- Database engineers
- Security engineers

**GitHub org:** `github.com/Curriculab`

---

## This Repo's Role

**`Curriculab/docs` is a documentation and planning repo only.** It contains no implementation code. All implementation lives in separate repos under the Curriculab org.

| Repo | Status | Purpose |
|---|---|---|
| `Curriculab/docs` | ✅ Active | Requirements, architecture, planning (this repo) |
| `Curriculab/api` | Planned | REST API implementation |
| `Curriculab/web` | Planned | Web front-end |
| `Curriculab/mobile` | Planned | Mobile app |
| `Curriculab/infra` | Planned | Infrastructure as code, CI/CD, containers |
| `Curriculab/db` | Planned | Database migrations and seed data |

**Do not create implementation code in this repo.** If a task requires code, note it belongs in one of the implementation repos.

---

## Repo Structure

```
docs/
├── CLAUDE.md                          ← this file
├── README.md                          ← entry point and full document index
│
├── requirements/                      ← 24 files: system overview + 23 feature docs
│   ├── README.md                      ← index table of all requirement docs
│   ├── university-reg-features.md     ← system overview, user roles, feature index
│   └── *-requirements.md × 23
│
├── architecture/                      ← system-wide technical decisions
│   ├── data-model.md                  ← canonical entity model (57 entities, 6 clusters)
│   └── non-functional-requirements.md ← performance, scalability, availability, etc.
│
├── planning/                          ← release and journey planning
│   ├── story-prioritization.md        ← MoSCoW table for all 122 stories
│   └── story-map.md                   ← 5 end-to-end user journeys
│
└── decisions/                         ← Architecture Decision Records (ADRs)
    └── README.md                      ← ADR format template and index
```

---

## Naming Rules

| Term | Correct | Never use |
|---|---|---|
| Platform name | **Curriculab** | University Registration System, URS, automation-university |
| System reference in prose | "Curriculab" | "the system", "the URS", "the platform" (first mention) |
| GitHub org | `Curriculab` | |

---

## Requirement Document Conventions

### User Story Format

Every story follows this exact structure:

```markdown
## PREFIX-NNN: Story Title

**As a** [role]
**I want** [goal]
**So that** [benefit]

### Acceptance Criteria
- [ ] ...
```

### Story Prefixes

| Prefix | Feature Area | Range |
|---|---|---|
| AUTH | User Authentication & Authorization | AUTH-001 – AUTH-010 |
| CAT | Course Catalogue | CAT-001 – CAT-005 |
| COURSE | Course Management | COURSE-001 – COURSE-009 |
| CAP | Course Capacity | CAP-001 – CAP-006 |
| WAIT | Course Waitlists | WAIT-001 – WAIT-008 |
| REG | Student Registration | REG-001 – REG-006 |
| SEM | Semester & Session Management | SEM-001 – SEM-006 |
| REC | Academic Records | REC-001 – REC-008 |
| PAY | Payment & Billing | PAY-001 – PAY-006 |
| RPT | Reporting | RPT-001 – RPT-005 |
| INT | Integrations | INT-001 – INT-005 |
| ACC | Accessibility | ACC-001 – ACC-005 |
| SEC | Security & Privacy | SEC-001 – SEC-005 |
| NOTIF | Notifications | NOTIF-001 – NOTIF-005 |
| SUP | Support & Help | SUP-001 – SUP-005 |
| PROF | Student Profile & Account Management | PROF-001 – PROF-006 |
| DEG | Degree Programs & Curriculum Management | DEG-001 – DEG-006 |
| ROOM | Room & Facility Management | ROOM-001 – ROOM-005 |
| USR | Administrative User Management | USR-001 – USR-006 |
| ADV | Academic Advising | ADV-001 – ADV-006 |
| GRAD | Graduation & Commencement | GRAD-001 – GRAD-006 |
| XFER | Transfer Credit Evaluation | XFER-001 – XFER-005 |
| DOC | Document Management | DOC-001 – DOC-005 |

**Total: 122 stories across 23 feature areas.**

When adding a new story, the next ID is the current highest number + 1 within that prefix. Check the relevant file first.

### Each Requirement File Header

Every `*-requirements.md` opens with:

```markdown
**Story Prefix:** PREFIX
**System Overview:** [university-reg-features.md](./university-reg-features.md)
**Related docs:** Label → [filename.md](./filename.md) (STORY-ID if specific)
```

---

## Link Conventions

All links are **relative** — never hardcode GitHub URLs.

| Scenario | Pattern |
|---|---|
| Within `requirements/` | `[text](./other-requirements.md)` |
| From `architecture/` to `requirements/` | `[text](../requirements/filename.md)` |
| From `planning/` to `requirements/` | `[text](../requirements/filename.md)` |
| From root `README.md` to any subfolder | `[text](./requirements/filename.md)` |

When you move or rename a file, search for all incoming links across the repo before and after.

---

## Deduplication Rules

These are load-bearing conventions — violating them creates conflicting sources of truth:

| Topic | Single source of truth | Other docs must |
|---|---|---|
| Waitlist behavior | `requirements/course-waitlists-requirements.md` | Cross-reference by story ID; don't restate |
| Notification delivery rules | `requirements/notifications-requirements.md` | Cross-reference with `(see notifications-requirements.md NOTIF-NNN)` |
| Authentication, RBAC, audit logging | `requirements/user-authentication-requirements.md` | Cross-reference |
| Encryption, FERPA/GDPR, backups | `requirements/security-privacy-requirements.md` | Cross-reference |
| Accessibility (WCAG, keyboard, responsive) | `requirements/accessibility-requirements.md` | Cross-reference |

---

## User Roles

| Role | Key permissions |
|---|---|
| **Student** | Register for courses, view records/grades, pay bills, manage preferences |
| **Instructor** | Upload materials, post announcements, submit grades, view rosters |
| **Academic Staff** | Create/update/retire courses and catalogue entries, manage schedules |
| **Advisor** | View student records, override enrollment restrictions, approve exceptions |
| **Registrar** | Define terms, set registration windows, add/drop dates, manage waitlist rules |
| **Administrator** | All of the above plus user management, system config, audit logs, backups |

---

## Data Model Summary

Defined in `architecture/data-model.md`. **57 entities** across **6 domain clusters**.

| Cluster | Entities | Key entities |
|---|---|---|
| 1 — Identity & Access | 6 | User, Session, AuditLog, ApiConsumer |
| 2 — Organizational Structure & Curriculum | 10 | College, Department, Program, Course, Room |
| 3 — Academic Calendar & Scheduling | 5 | Term, Section, SectionMeetingTime |
| 4 — Student Profile & Registration | 8 | Student, Enrollment, Waitlist, Hold |
| 5 — Advising, Records & Graduation | 11 | AdvisingNote, DegreeAuditSnapshot, GraduationApplication |
| 6 — Billing, Transfer Credit, Docs & Comms | 17 | Charge, Payment, Notification, SupportTicket |

### Data Model Conventions

- All PKs are `uuid` (v4)
- All timestamps are `timestamptz` in UTC
- `created_at` / `updated_at` are implied on every entity (omitted from tables)
- Attributes: `snake_case` — Entities: `PascalCase`
- Soft deletes via `status` enum; no physical deletion
- Calculated fields marked `[calculated]` — derived via app layer, trigger, or materialized view

### Key Architectural Decisions

| Decision | What was chosen |
|---|---|
| User model | Single `User` table for all roles; `Student` is a separate profile (joined-table inheritance, shared PK) |
| Grade history | `Enrollment.grade` is current grade; `GradeCorrection` is the immutable audit trail |
| Waitlist ordering | `position` integer managed by application; DB enforces `UNIQUE (student_id, section_id)` |
| Degree audit | `DegreeAuditSnapshot.audit_data` is a `jsonb` blob written once and never mutated |
| Enrollment concurrency | `INSERT` + DB constraint/trigger on `enrolled_count < capacity`; avoid race conditions at peak |
| GPA calculation | `cumulative_gpa` and `total_credit_hours_completed` are `[calculated]` — materialized view or trigger recommended |
| Change history | `CourseChangeHistory` stores one row per changed field (`field_name`, `old_value`, `new_value` as text) |
| Payment tokens | `SavedPaymentMethod.provider_token` is an opaque gateway token only — raw PAN never stored |

Full details and all entity attribute tables are in `architecture/data-model.md`.

---

## ADR Conventions

ADRs live in `decisions/`. See `decisions/README.md` for the format template.

- ADRs are **append-only** — never edit a published ADR
- To reverse a decision, write a new ADR with status `Supersedes ADR-NNN`
- Name files `decisions/NNN-short-title.md` (e.g., `decisions/001-postgres-over-mongodb.md`)

---

## How to Add New Content

### New user story
1. Open the relevant `requirements/*-requirements.md`
2. Check the highest existing story number for that prefix
3. Add the new story at the bottom using the standard format
4. If the story cross-references another feature area, link to the specific story ID
5. If it triggers notifications, cross-reference `notifications-requirements.md` rather than defining delivery behavior inline

### New requirement document (new feature area)
1. Create `requirements/new-feature-requirements.md` with the standard header
2. Choose the next available prefix (check `university-reg-features.md`)
3. Add the file to the Feature Area Index in `requirements/university-reg-features.md`
4. Add it to the Document Index table in `README.md` and `requirements/README.md`

### New architecture document
1. Create `architecture/new-doc.md`
2. Add it to the Planning & Architecture Docs table in `README.md`

### New ADR
1. Create `decisions/NNN-title.md`
2. Update the index table in `decisions/README.md`
