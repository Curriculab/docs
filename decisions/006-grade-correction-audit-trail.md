---
sidebar_label: "ADR-006: Grade Correction Trail"
description: "Decision to store the current grade on Enrollment and use GradeCorrection as an immutable audit trail."
---

# ADR-006: Grade on Enrollment with GradeCorrection as the Audit Trail

**Date:** 2026-02-19
**Status:** Accepted

## Context

Instructors submit grades for students at the end of a term. After submission, grades sometimes require correction — data entry errors, successful appeals, or administrative adjustments.

Several constraints drive the design:

- **FERPA** requires an auditable record of every grade change: what the grade was, what it became, who requested the change, who approved it, and when.
- **Transcript generation** must always reflect the current authoritative grade without reconstructing history.
- **Approval workflow** — grade corrections at many institutions require a second party (e.g., Registrar or Department Chair) to approve the change before it takes effect.
- **Immutability of the correction record** — once a grade correction is submitted, the record of that submission must not be editable, even if the correction itself is later rejected.

## Decision

`Enrollment.grade` holds the **current authoritative grade** at all times. It is the single value used for transcript generation, GPA calculation, and degree audits.

Any post-submission change to a grade creates a new **`GradeCorrection`** row recording `old_grade`, `new_grade`, `reason`, `submitted_by`, `approved_by`, and `status` (`pending`, `approved`, `rejected`). The `GradeCorrection` table is append-only — rows are never updated or deleted. When a correction is approved, the application updates `Enrollment.grade` to the new value and sets `GradeCorrection.approved_by`, `approved_at`, and `status = 'approved'` in the same transaction.

## Consequences

**Positive**
- Transcript and GPA logic reads a single column (`Enrollment.grade`) — no history reconstruction needed at read time.
- Full FERPA-compliant audit trail: every grade change is documented with the original value, replacement value, justification, submitter, approver, and timestamps.
- The approval workflow is modelled as data (`status`, `approved_by`, `approved_at`) rather than process state held only in the application — the record survives restarts and is queryable.
- Multiple corrections on the same enrollment are supported naturally; each produces an independent `GradeCorrection` row.

**Negative**
- Displaying a student's full grade history requires a JOIN to `GradeCorrection`.
- The update to `Enrollment.grade` and the creation of the `GradeCorrection` approval record must occur in a single transaction; the application must enforce this atomicity.
- A rejected correction does not update `Enrollment.grade`, so the application must distinguish between "the grade was corrected" (approved) and "a correction was requested but denied" (rejected) when querying history.

**Neutral**
- The initial grade submission (instructor posting grades for the first time) is not a correction — it is a direct write to `Enrollment.grade`. `GradeCorrection` is only created for subsequent changes.

## Alternatives Considered

**Event sourcing — grade as an event stream**
The current grade is reconstructed by replaying a stream of grade events. Correct and auditable, but significantly more complex to implement and query. Transcript generation requires replaying the stream to find the terminal value. Rejected as over-engineering for a use case where a simple mutable column plus an audit table is sufficient.

**GradeHistory table with no writeable grade on Enrollment**
The current grade is always the most recent history row. Transcript generation requires `SELECT ... ORDER BY created_at DESC LIMIT 1`. Slightly more complex reads than a direct column; adds latency and complexity to the highest-frequency query path. Rejected in favour of storing the current value explicitly.

**Mutable Enrollment row with no audit trail**
Update `Enrollment.grade` in place; no history kept. Simple to implement but violates FERPA: there is no record of who changed a grade or what it was before the change. Rejected.
