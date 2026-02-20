---
sidebar_label: "ADR-008: Degree Audit Snapshot"
description: "Decision to store degree audit results as an immutable jsonb snapshot rather than a relational result structure."
---

# ADR-008: Immutable JSONB Blob for Degree Audit Snapshots

**Date:** 2026-02-19
**Status:** Accepted

## Context

A degree audit evaluates whether a student has satisfied all requirements of their declared program and is eligible to graduate. The audit result depends on:

- The **program's requirements** at a specific catalog year (requirement categories, credit minimums, course mappings).
- The **student's completed coursework** (grades, credits, transfer credit decisions) at the moment of audit.

Both inputs can change over time: programs are revised, catalog years are superseded, and transfer credit decisions are appealed. This creates a core tension — the graduation clearance decision must be permanently defensible, but the data it was based on may change after the fact.

Additionally, when a student's graduation application is approved, that approval constitutes a legal and academic commitment. It must be reproducible and auditable even if the curriculum changes significantly years later.

## Decision

`DegreeAuditSnapshot.audit_data` stores the **full audit result as a `jsonb` blob** at the moment the audit is executed. The blob captures every requirement category, every slot evaluation, which courses satisfied which requirements, credit counts, and the overall pass/fail conclusion — everything needed to understand and defend the clearance decision.

The blob is **written once and never mutated**. The `is_graduation_clearance` flag marks the specific snapshot used as the canonical clearance for a graduation application. `cleared_by` and `cleared_at` record who approved the clearance and when.

Multiple snapshots may exist per student/program pair (e.g., a preliminary audit run months before graduation, then the final clearance snapshot). Only the row with `is_graduation_clearance = true` is authoritative for graduation processing.

## Consequences

**Positive**
- Retroactive curriculum changes — retiring a course, modifying credit requirements, updating a catalog year — cannot invalidate an approved graduation clearance. The snapshot preserves the exact state evaluated at clearance time.
- The full audit context is self-contained in one record. No joins to program, course, or enrollment tables are needed to understand what was evaluated; the blob includes everything.
- FERPA compliance: the clearance decision and its complete factual basis are permanently auditable.
- Generating a human-readable audit report from the snapshot requires only deserializing the blob — no database queries needed.

**Negative**
- The structure of `audit_data` is enforced by the application, not the database. A schema change to the audit output format must be handled carefully — old snapshots will have the old shape; the application must support reading both.
- Querying aggregate statistics across snapshots (e.g., "how many students satisfied the Core Requirements via transfer credit?") requires `jsonb` operators (`->>`, `@>`) rather than standard SQL column references, and cannot easily use B-tree indexes.
- Large programs with many requirements produce large blobs. A GIN index on `audit_data` is possible but should be added only for specific query patterns.

**Neutral**
- The `DegreeAuditSnapshot` table is not the live degree audit engine — it is the record of a completed audit run. The audit computation itself lives in the application layer and is stateless.

## Alternatives Considered

**Relational audit result tables (AuditResult, RequirementResult, CourseMatch)**
Fully typed and queryable with standard SQL. Requires a schema that mirrors the program requirement structure — any change to how requirements are modelled requires a migration to this result schema as well. Crucially, reconstructing "what did the program requirements look like at the time of this audit" still requires snapshotting the program data separately. Rejected because the added queryability does not outweigh the complexity of maintaining a parallel result schema and the curriculum-snapshotting problem it does not solve.

**No snapshot — recompute the audit on demand**
Always compute the degree audit live from current program and enrollment data. Fast and always up-to-date. Fundamentally cannot reconstruct what was true at the time of a historical clearance decision after curriculum changes. Not FERPA-compliant for the graduation clearance use case. Rejected.

**Reference a versioned program snapshot instead of storing the full audit data**
Store a FK to a program version record rather than duplicating requirement data in the blob. Requires a full program versioning system (ProgramVersion, RequirementCategoryVersion, etc.) that does not exist in the current data model. Adds significant schema complexity to solve a problem that the jsonb blob addresses directly. Rejected; can be revisited if program versioning becomes a requirement in its own right.
