what ---
sidebar_label: "API Tech Decisions"
description: "Open technical choices to resolve before or during the Curriculab/api scaffold."
---

# Curriculab/api — Open Technical Decisions

The following choices need to be made before or during the api repo scaffold.
PostgreSQL (ADR-001) and NestJS are already decided.

---

## High Priority (shape the most code)

### ORM / Database Layer

**Options:** TypeORM · Prisma · Drizzle

Affects migrations, query patterns, and how key ADRs are implemented:
- Joined-table inheritance for `User` / `Student` (ADR-003)
- Optimistic concurrency on enrollment `INSERT` (ADR-004)
- Append-only `AuditLog` and `GradeCorrection` (ADR-006)

### Authentication Strategy

**Options:** JWT (stateless) · Database-backed sessions

The data model includes a `Session` entity, which implies DB-backed sessions,
but the mechanism still needs to be pinned down. Also covers Passport.js
integration strategy.

---

## Medium Priority

### Background Jobs / Queuing

**Options:** BullMQ (Redis-backed) · @nestjs/schedule (cron only)

Required for:
- Waitlist promotion (ADR-007)
- Notification delivery (NOTIF stories)
- Payment webhooks

BullMQ is the standard NestJS choice and requires Redis.

### Caching

**Options:** Redis · In-memory (@nestjs/cache-manager)

If BullMQ is chosen, Redis is already in the stack — cache-manager can point
at the same Redis instance.

### Validation

**Options:** class-validator + class-transformer (NestJS default) · Zod

### Logging

**Options:** Pino · Winston

Pino is faster and produces structured JSON by default; better fit for
container environments.

---

## Lower Priority (can be deferred to first feature milestone)

### API Documentation

**Options:** @nestjs/swagger (OpenAPI) · none at scaffold stage

@nestjs/swagger is the obvious NestJS choice; generating the OpenAPI spec
from decorators aligns with how NestJS structures controllers.

### File Storage

**Options:** S3 / S3-compatible (R2, MinIO) · Local filesystem

The `DOC` feature area implies document uploads. Local storage is fine for
development; S3-compatible is the production answer.

### Payment Gateway

**Options:** Stripe · Others

ADR-010 is gateway-agnostic on token storage — only the gateway provider
needs to be chosen.

### Package Manager

**Options:** npm · pnpm · yarn

### API Versioning

**Options:** URL path (`/v1/`) · Header-based (`Accept-Version`)

URL path versioning is simpler to document, test, and proxy.
