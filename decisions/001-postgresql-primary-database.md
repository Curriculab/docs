---
sidebar_label: "ADR-001: PostgreSQL"
description: "Decision to use PostgreSQL as the primary database for Curriculab."
---

# ADR-001: PostgreSQL as the Primary Database

**Date:** 2026-02-19
**Status:** Accepted

## Context

Curriculab requires a relational database capable of supporting a 57-entity data model with strong referential integrity, complex reporting queries, and FERPA-mandated audit guarantees. Several features of the data model drive specific database capability requirements:

- **Semi-structured data** — `DegreeAuditSnapshot.audit_data`, `ReservedSeatGroup.criteria`, `Payment.applied_charges`, and `AuditLog.metadata` hold variable-shape data that benefits from a native document type.
- **Array columns** — `Room.features`, `ApiConsumer.scopes`, and `ScheduledReport.recipient_emails` are modelled as arrays to avoid unnecessary join tables for simple lists.
- **Network address types** — `Session.ip_address` and `AuditLog.ip_address` use a structured IP type for CIDR comparisons and indexing.
- **Calculated aggregates** — `Student.cumulative_gpa` and `Student.total_credit_hours_completed` are candidates for materialized views refreshed on grade-change events.
- **Concurrency enforcement** — Section enrollment capacity is enforced via a DB-level `CHECK` constraint or trigger that fires on `INSERT INTO Enrollment` (see [ADR-004](./004-optimistic-concurrency-enrollment.md)).
- **Audit immutability** — `AuditLog` must be append-only; row-level security or trigger-based write guards are needed.
- **All timestamps in UTC** — the database must store `timestamptz` natively so UTC is preserved regardless of server locale.

## Decision

**PostgreSQL (v15 or later)** is the primary database for all Curriculab implementation repos.

## Consequences

**Positive**
- `jsonb` with GIN indexing satisfies the semi-structured data requirements (`audit_data`, `criteria`, `parameters`) without a separate document store.
- `text[]` arrays eliminate join tables for simple list attributes (`features`, `scopes`), keeping the schema flatter.
- The `inet` type stores and indexes IP addresses correctly and supports CIDR containment operators.
- Materialized views (`REFRESH MATERIALIZED VIEW CONCURRENTLY`) provide an efficient GPA recalculation path without blocking reads.
- `CHECK` constraints and `AFTER INSERT` triggers provide database-enforced capacity and ordering rules (enrollment concurrency, waitlist position).
- Row-level security is available for multi-tenant extensions.
- `timestamptz` stores UTC natively; session time zone never affects stored values.
- Mature ecosystem: `pg_dump`, logical replication, `pgAdmin`, excellent ORM support across all target implementation languages.

**Negative**
- PostgreSQL-specific features (`jsonb`, `text[]`, `inet`, materialized views) create a hard dependency on PostgreSQL; migrating to another RDBMS would require schema changes.
- Schema migrations are DDL changes that require careful planning and downtime or online migration tooling (e.g., `pg-osc`, `sqitch`).
- Horizontal write scaling requires read replicas or Citus; built-in sharding is not as seamless as distributed-native databases.

**Neutral**
- All implementation repos (`Curriculab/api`, `Curriculab/db`) must target PostgreSQL. Developers running Curriculab locally need a PostgreSQL instance (Docker Compose is the recommended local setup).

## Alternatives Considered

**MySQL / MariaDB**
Lacks native `jsonb` (JSON column is unindexable in the same way), no built-in `inet` type, limited materialized view support. Dropped in favour of PostgreSQL's richer type system.

**MongoDB**
A document model does not fit a highly normalized 57-entity relational schema; JOINs are not native. Weaker multi-document ACID guarantees. Would require a separate relational store for referential integrity. Rejected.

**CockroachDB**
PostgreSQL-compatible wire protocol with built-in distributed writes. Adds distributed systems complexity (clock skew, serializable isolation overhead) not warranted at this scale. Some PostgreSQL extensions are unsupported. Can be revisited if horizontal write scaling becomes a bottleneck.

**SQLite**
Not suitable for a multi-user application with concurrent writes from multiple API server instances. Rejected.
