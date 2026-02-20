---
sidebar_label: "ADR Index"
description: "Index of Architecture Decision Records for Curriculab."
---

# Architecture Decision Records (ADRs)

This folder records significant architectural decisions made during the design of Curriculab. Each ADR explains what was decided, why, and what alternatives were considered.

## Format

```markdown
# ADR-NNN: Title

**Date:** YYYY-MM-DD
**Status:** Proposed | Accepted | Deprecated | Superseded by ADR-NNN

## Context
What situation or problem prompted this decision?

## Decision
What was decided?

## Consequences
What are the results of this decision — positive, negative, and neutral?

## Alternatives Considered
What other options were evaluated and why were they rejected?
```

## Index

| ADR | Title | Status |
|---|---|---|
| [ADR-001](./001-postgresql-primary-database.md) | PostgreSQL as the Primary Database | Accepted |
| [ADR-002](./002-uuid-v4-primary-keys.md) | UUID v4 as Primary Keys for All Entities | Accepted |
| [ADR-003](./003-user-student-joined-table-inheritance.md) | Single User Table with Joined-Table Inheritance for Student | Accepted |
| [ADR-004](./004-optimistic-concurrency-enrollment.md) | Database Constraint Enforcement for Section Enrollment Concurrency | Accepted |
| [ADR-005](./005-docusaurus-documentation-platform.md) | Docusaurus as the Documentation Platform | Accepted |
| [ADR-006](./006-grade-correction-audit-trail.md) | Grade on Enrollment with GradeCorrection as the Audit Trail | Accepted |
| [ADR-007](./007-application-managed-waitlist-position.md) | Application-Managed Waitlist Position | Accepted |
| [ADR-008](./008-immutable-degree-audit-snapshot.md) | Immutable JSONB Blob for Degree Audit Snapshots | Accepted |
| [ADR-009](./009-field-level-course-change-history.md) | Field-Level Diff for Course Change History | Accepted |
| [ADR-010](./010-payment-gateway-token-storage.md) | Payment Gateway Token Storage — No Raw Card Data | Accepted |

---

> ADRs are append-only. To reverse a decision, create a new ADR with status **Supersedes ADR-NNN** rather than editing the original.
