---
sidebar_label: "ADR-009: Course Change History"
description: "Decision to record section changes as one row per changed field rather than a JSON-patch blob or full-row snapshot."
---

# ADR-009: Field-Level Diff for Course Change History

**Date:** 2026-02-19
**Status:** Accepted

## Context

Course sections can be modified after creation and after students have enrolled or waitlisted. Common changes include room reassignment, instructor change, capacity adjustment, delivery mode switch, and schedule modification.

These changes need to be captured for two distinct purposes:

1. **Notification** — enrolled students and waitlisted students must be informed of material changes (NOTIF stories). The notification system needs to know *what* changed to generate a meaningful message ("Your section has moved from SCI 201 to ENG 105").
2. **Audit** — administrators need a record of who changed what, when. Queries like "show me all capacity reductions across sections in Fall 2026" or "which sections had their instructor changed after registration opened?" should be answerable without JSON functions.

## Decision

`CourseChangeHistory` records **one row per changed field** per save operation. Each row stores:

- `section_id` — the section that was modified
- `changed_by` — the user who made the change
- `changed_at` — when the change occurred
- `field_name` — the name of the attribute that changed (e.g., `'capacity'`, `'room_id'`, `'instructor_user_id'`)
- `old_value` — the prior value serialised as text
- `new_value` — the new value serialised as text

An update that changes N fields on a section produces N `CourseChangeHistory` rows, all with the same `changed_by` and `changed_at` timestamp, making them groupable as a single logical change event.

The table is append-only by convention. The application never updates or deletes rows.

## Consequences

**Positive**
- Querying a specific field's history is a simple `WHERE field_name = 'capacity'` — no JSON operators or path expressions required.
- Cross-section queries ("all room changes in Fall 2026") are straightforward SQL and compatible with standard reporting tools and test automation frameworks.
- The notification layer can query `CourseChangeHistory` grouped by `(changed_by, changed_at)` to identify all fields that changed in a single save, then compose a multi-change notification.
- Each row is small and uniform; the table grows predictably and is easy to paginate and export.
- No schema change is required when a new field becomes change-tracked — the application simply starts emitting rows for the new `field_name`.

**Negative**
- A single multi-field update produces multiple rows; INSERT volume is proportional to the number of changed fields rather than the number of save operations.
- `old_value` and `new_value` are stored as `text` — type information is lost. The application must know that `capacity` values should be parsed as integers and `room_id` values are UUIDs. This is implicit knowledge that is not enforced by the schema.
- Reconstructing the full state of a section at an arbitrary point in time requires replaying all history rows from creation — this is rarely needed but worth noting.
- There is no DB-enforced immutability; the append-only invariant is an application convention.

**Neutral**
- `CourseChangeHistory` is distinct from `AuditLog`. `AuditLog` (Cluster 1) captures security-relevant events (login, permission checks, data access) with broad metadata. `CourseChangeHistory` captures structured field-level diffs for a specific domain object. Both exist and serve complementary purposes.

## Alternatives Considered

**JSON-patch blob per save event (one row per save)**
A single row per save operation stores the full diff as a JSON-patch document (`[{"op":"replace","path":"/capacity","from":30,"to":35}]`). More compact; preserves atomicity of multi-field changes naturally. Requires JSON path functions to query specific field changes across rows — less compatible with standard reporting tools and harder to index. Rejected in favour of field-level rows for queryability and simplicity.

**Full section row snapshot per save**
Store a complete copy of the Section row before each update. Fully queryable with standard SQL for any field. Storage-intensive: duplicates all unchanged fields on every save. A section with 10 attributes updated 20 times produces 200 attribute-values stored, of which most are identical across snapshots. Rejected.

**Rely on AuditLog.metadata**
`AuditLog` records the change event with metadata (old/new values in a jsonb blob). Correct for security auditing but not designed for structured field-level diffing or notification triggers. Using `AuditLog` for both purposes conflates security audit and domain change tracking. Rejected; both tables serve their own purpose.

**DB-level triggers writing to an audit shadow table**
A trigger on `Section` writes the old row to a `section_history` table on every UPDATE. Automatic — the application does not need to emit change records explicitly. Captures all changes including those made by direct SQL (migrations, admin patches). Tradeoff: the trigger writes the full old row (not just changed fields), and the trigger is harder to test, version, and tune than application-layer code. An option worth revisiting for compliance-sensitive fields.
