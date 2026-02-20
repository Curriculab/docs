---
sidebar_label: "ADR-004: Enrollment Concurrency"
description: "Decision to use INSERT plus a DB constraint for safe concurrent section enrollment."
---

# ADR-004: Database Constraint Enforcement for Section Enrollment Concurrency

**Date:** 2026-02-19
**Status:** Accepted

## Context

During peak registration windows, many students simultaneously attempt to enroll in popular course sections. `Section.capacity` must never be exceeded — over-enrollment is a correctness failure with direct consequences for students and instructors.

A naive application-level approach reads the current `enrolled_count`, compares it to `capacity`, and then inserts an `Enrollment` row if space is available. This is a classic **time-of-check / time-of-use (TOCTOU)** race condition: two concurrent requests can both read `enrolled_count = 24` against a `capacity = 25`, both conclude a seat is available, and both INSERT — resulting in 26 enrolled students.

The solution must be correct under concurrent load without introducing excessive lock contention that degrades performance during the registration peak.

## Decision

Capacity enforcement is delegated to the **database layer** via a `CHECK` constraint or `AFTER INSERT` trigger on `Enrollment`.

The implementation approach for `Curriculab/db`:

1. `Section.enrolled_count` is a **derived integer** maintained by a trigger (or computed via a subquery in a `CHECK`). It is not a raw writeable column.
2. An `AFTER INSERT` trigger on `Enrollment` increments `enrolled_count` on the parent `Section` row **within the same transaction**.
3. A `CHECK` constraint (or the trigger itself) validates `enrolled_count <= capacity` and raises an exception if the constraint is violated.
4. PostgreSQL's MVCC ensures that two concurrent transactions incrementing `enrolled_count` on the same `Section` row will serialize — one will see the committed value from the other and either succeed or fail the constraint cleanly.
5. The API layer catches the constraint violation exception and returns an HTTP 409 (Conflict) with a user-facing "section is full" message — not a generic 500 error.

The `UNIQUE (student_id, section_id)` constraint on `Enrollment` independently prevents duplicate enrollments.

## Consequences

**Positive**
- Correctness guaranteed at the database layer regardless of application server count or deployment topology.
- No explicit application-level locks or coordination required.
- Scales naturally: each concurrent INSERT either commits or fails; there is no shared in-memory lock to contend over.
- The constraint failure is a clear, catchable exception with a specific error code — easy for the API to translate into a business-logic response.
- `SELECT ... FOR UPDATE` remains available as an escalation path (see Alternatives) if the trigger-based approach shows contention under profiling.

**Negative**
- Constraint violations must be handled as expected business events in the API layer, not just error conditions. All enrollment code paths must catch and translate the specific PostgreSQL exception.
- Testing correctness requires concurrent load simulation — unit tests that run serially will not expose race conditions.
- If `enrolled_count` is stored (not purely calculated on read), the trigger must be carefully tested to ensure it fires correctly on INSERT, on DELETE (drop), and on status changes (e.g., `Enrollment.completion_status` changing from `enrolled` to `withdrawn`).

**Neutral**
- The `UNIQUE (student_id, section_id)` constraint on `Enrollment` handles the duplicate-registration case independently and does not interact with capacity enforcement.

## Alternatives Considered

**Naive check-then-insert (application layer)**
Read `enrolled_count`, compare to `capacity`, insert if space available. Subject to TOCTOU race conditions under any concurrency. **Do not use.**

**`SELECT ... FOR UPDATE` on the Section row**
The API acquires a row-level exclusive lock on `Section` before checking capacity and inserting `Enrollment`. Guarantees correctness by serializing all concurrent enrollments for a given section. The tradeoff: the lock is held for the duration of the transaction, meaning all concurrent enrollment attempts for the same section queue behind each other. Under peak registration for a high-demand section, this can create a lock-wait queue. This approach is retained as a **fallback** if the constraint-based approach proves insufficient under profiling.

**Distributed lock (e.g., Redis `SETNX`)**
Acquire an external lock keyed on `section_id` before enrolling. Adds a Redis dependency and distributed lock complexity (lock expiry, crash recovery). Rejected as overengineering when the database can enforce the constraint directly.

**Serializable transaction isolation**
Run all enrollment transactions at `ISOLATION LEVEL SERIALIZABLE`. PostgreSQL's SSI would detect the write-write conflict and abort one of the concurrent transactions. Correct, but applies globally and adds overhead to all transactions, not just enrollment. Rejected in favour of targeted constraint enforcement.

**Application-layer semaphore / in-process lock**
Acquire a per-section semaphore in the API process. Correct only for single-server deployments; fails when multiple API server instances run concurrently. Rejected.
