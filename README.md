# Curriculab

> **[curriculab.github.io/docs →](https://curriculab.github.io/docs/)**

**Curriculab** is a free, open-source reference platform built to give developers real-world practice on a production-grade system — without the constraints of a toy tutorial app.

The platform is a fully realized university registration and management system. Its scope intentionally spans the full technology stack so that engineers across every discipline have something meaningful to work against: API design, web and mobile front-ends, DevOps and infrastructure, database architecture, security, automation testing, and more.

All functional requirements are written as **user stories** with acceptance criteria.

---

## This Repo

`Curriculab/docs` is a documentation and planning repository — it contains no implementation code.

| Repo | Status | Purpose |
|---|---|---|
| `Curriculab/docs` | ✅ Active | Requirements, architecture, planning, ADRs (this repo) |
| `Curriculab/api` | Planned | REST API implementation |
| `Curriculab/web` | Planned | Web front-end |
| `Curriculab/mobile` | Planned | Mobile app |
| `Curriculab/infra` | Planned | Infrastructure as code, CI/CD, containers |
| `Curriculab/db` | Planned | Database migrations and seed data |

---

## Contributing

Browse the full documentation at **[curriculab.github.io/docs](https://curriculab.github.io/docs/)** — requirements, architecture, planning, and ADRs are all there.

To propose a new user story or ADR, [open an issue](https://github.com/Curriculab/docs/issues/new/choose) — templates are provided for both.

For conventions (naming rules, story format, link style, deduplication rules), see [CLAUDE.md](./CLAUDE.md).

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

User roles and all story prefixes (AUTH, REG, WAIT, …) are defined in the
[System Overview](./requirements/university-reg-features.md).

---

## Deduplication Rules

These are load-bearing conventions — violating them creates conflicting sources of truth.

| Topic | Single source of truth | Other docs must |
|---|---|---|
| Waitlist behavior | `requirements/course-waitlists-requirements.md` | Cross-reference by story ID; don't restate |
| Notification delivery rules | `requirements/notifications-requirements.md` | Cross-reference with `(see notifications-requirements.md NOTIF-NNN)` |
| Authentication, RBAC, audit logging | `requirements/user-authentication-requirements.md` | Cross-reference |
| Encryption, FERPA/GDPR, backups | `requirements/security-privacy-requirements.md` | Cross-reference |
| Accessibility (WCAG, keyboard, responsive) | `requirements/accessibility-requirements.md` | Cross-reference |
