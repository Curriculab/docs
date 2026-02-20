---
sidebar_label: "ADR-007: Waitlist Position"
description: "Decision to manage waitlist position as an application-maintained integer rather than a database sequence."
---

# ADR-007: Application-Managed Waitlist Position

**Date:** 2026-02-19
**Status:** Accepted

## Context

When a course section is full, students may join a waitlist. Waitlist position determines the order in which students are offered seats as they become available. Several requirements complicate a naive "first-in, first-out" ordering:

- **Priority rules** may override strict FIFO — reserved seat groups (e.g., Honors students, specific programs) can take precedence over general waitlist position.
- **Position compaction** — when a student leaves the waitlist (declines an offer, withdraws, or lets their offer expire), the positions behind them should shift to fill the gap so that displayed positions are always contiguous and accurate.
- **Display clarity** — students are told "You are #3 on the waitlist." Gaps in position numbers (e.g., positions 1, 2, 4 after a departure) are confusing.
- **Duplicate prevention** — a student must not appear on the same section's waitlist more than once.

## Decision

`Waitlist.position` is a plain **integer column maintained by the application layer**, not a database sequence or auto-increment. Position 1 means next-in-line.

The database enforces `UNIQUE (student_id, section_id)` to prevent duplicate waitlist entries for the same student and section.

When a student's waitlist entry is removed or transitions out of the `waiting` state, the application **re-numbers all remaining `waiting` entries** for that section (decrement positions greater than the departed position by 1) **within a single transaction**. Priority rule overrides are implemented at the application layer when a new student joins — the application calculates the correct insertion position based on configurable rules before writing the row.

## Consequences

**Positive**
- Position numbers are always contiguous and accurate; students always see a meaningful queue position.
- Priority rules (reserved seats, academic standing, registration date) can be arbitrarily complex and changed without a schema migration.
- The `UNIQUE (student_id, section_id)` constraint catches the common bug of a student joining the same waitlist twice.
- Position is a simple integer — easy to sort, display, and test.

**Negative**
- When a student leaves a popular waitlist, the application must execute an `UPDATE` on all lower-priority rows in the same transaction. On a section with hundreds of waitlist entries, this is a non-trivial write operation.
- The application bears full responsibility for position integrity; a bug in waitlist manipulation code could corrupt positions. This must be covered by integration tests that exercise concurrent joins and departures.
- There is no DB-enforced constraint that positions within a section are contiguous or start at 1 — the application enforces this invariant.

**Neutral**
- The `status` column on `Waitlist` (`waiting`, `offered`, `declined`, `expired`, `enrolled`) captures lifecycle state independently of position. Only rows with `status = 'waiting'` participate in active queue ordering; offered/declined/expired rows retain their historical position value for audit purposes.

## Alternatives Considered

**Database sequence per section**
Use `SERIAL` or `nextval()` to assign monotonically increasing position numbers. Sequences never decrement, so positions develop gaps when students leave. A student who joins after a departure could see "You are #47 on the waitlist" when only 12 students are ahead of them. Rejected because gap-free display positions are a product requirement.

**ORDER BY `joined_at` timestamp (no explicit position column)**
Derive queue order from the timestamp of waitlist entry. Simple — no position maintenance needed. Fails when priority rules require inserting a new student ahead of earlier arrivals. Timestamp ordering cannot represent priority overrides without schema changes. Rejected.

**Priority queue in application memory (e.g., Redis sorted set)**
Fast reads and writes; natural support for priority-based ordering. Adds a Redis infrastructure dependency. Waitlist state must be persisted back to the database to survive restarts and be queryable via SQL. Creates a dual-write problem (Redis + PostgreSQL). Rejected in favour of keeping the authoritative state in a single store.

**Position managed by a DB trigger**
A trigger automatically re-numbers positions on DELETE or status change. Correct, but moves complex business logic (priority rules) into the database layer where it is harder to test, version-control, and change. Rejected in favour of application-layer management with thorough integration testing.
