---
sidebar_label: "ADR-003: User/Student Inheritance"
description: "Decision to use a single User table with joined-table inheritance for the Student profile."
---

# ADR-003: Single User Table with Joined-Table Inheritance for Student

**Date:** 2026-02-19
**Status:** Accepted

## Context

Curriculab has six user roles: Student, Instructor, Advisor, Academic Staff, Registrar, and Administrator. All six must:

- Authenticate with a username/password or SSO credential.
- Generate `Session` and `AuditLog` records that reference a single user identity.
- Potentially own `ApiConsumer` records (for integration roles).
- Receive `Notification` records.

Students are unique in also carrying an extended profile: `student_number`, `cumulative_gpa`, `total_credit_hours_completed`, `enrollment_status`, `photo_url`, `admit_date`, and relationships to `EmergencyContact`, `StudentProgram`, `Enrollment`, `Waitlist`, and `Hold`. No other role has an equivalent extended profile in the current data model.

The question is how to represent the shared authentication identity and the student-specific profile in the same schema without redundancy or excessive nullable columns.

## Decision

**A single `User` table** holds all principals regardless of role. A `role` enum column (`student`, `instructor`, `advisor`, `academic_staff`, `registrar`, `administrator`) determines permissions. RBAC is enforced at the application layer by checking `User.role` on every request.

**`Student` is a separate profile table** whose `id` is both its PK and a FK to `User.id` (joined-table inheritance with a shared primary key). A `Student` row always has a corresponding `User` row with `role = 'student'`; this invariant is enforced by the application, not a DB constraint.

All cross-entity references that need a "person" (e.g., `AuditLog.user_id`, `Session.user_id`, `Notification.user_id`) reference `User.id`. References that need a student-specific entity (e.g., `Enrollment.student_id`, `Waitlist.student_id`) reference `Student.id`, which is the same UUID value.

## Consequences

**Positive**
- Single authentication path: login, session management, 2FA, and password reset operate on `User` without branching on role.
- `Session`, `AuditLog`, and `Notification` reference one table (`User`) without polymorphism or UNION queries.
- Student-specific columns are in their own table; `User` carries no nullable role-specific columns.
- The shared PK means `Student.id` and `User.id` are the same UUID — no separate join column needed; JOINs use `Student.id = User.id`.
- Adding a new role-specific profile table (e.g., `InstructorProfile`) in the future follows the same pattern without altering `User`.

**Negative**
- Every student data fetch requires a `JOIN User ON Student.id = User.id` to access email, name, or status.
- The invariant "a `Student` row implies a `User` row with `role = 'student'`" is enforced by the application layer, not a DB `CHECK` constraint. A bug in user creation code could leave an orphaned `Student` without the correct `User.role`. This should be caught by integration tests.
- RBAC is application-enforced, not database-enforced; a misconfigured API route could grant cross-role access.

**Neutral**
- Instructors, Advisors, and other roles do not have profile tables today. If they acquire extended profile needs, the same joined-table inheritance pattern applies without schema changes to `User`.

## Alternatives Considered

**Single table with nullable role-specific columns**
All user data in one `User` table, with `student_number`, `cumulative_gpa`, etc. as nullable columns. Simple queries, no JOINs. Rejected because it adds many nullable columns that are meaningless for non-student roles, makes the schema misleading, and creates a wide table that grows each time a role gains new attributes.

**Separate authentication table per role**
Each role has its own table (`Student`, `Instructor`, etc.) with its own credential columns. Rejected because it duplicates authentication logic across tables and forces `Session`, `AuditLog`, and `Notification` to use polymorphic foreign keys or UNION queries — significantly complicating the schema and every API layer that deals with identity.

**Class-table inheritance with a polymorphic base**
A `Person` base table (authentication only) with a `person_type` discriminator, and fully typed subclass tables. Functionally equivalent to the chosen approach but adds a third table level for the common case. The chosen design uses `User` as both the authentication table and the base — avoiding a separate `Person` table.

**Role profile as `jsonb` on `User`**
Store student-specific data in a `profile jsonb` column on `User`. Flexible, but loses type safety, queryability (no index on `student_number`), and schema clarity. Rejected.
