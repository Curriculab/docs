# Non-Functional Requirements

**System Overview:** [university-reg-features.md](../requirements/university-reg-features.md)

> **Scope:** This document covers non-functional requirements (NFRs) not already addressed by dedicated feature docs. Security NFRs (encryption, backups, compliance) are in [security-privacy-requirements.md](../requirements/security-privacy-requirements.md). Accessibility NFRs (WCAG, keyboard, responsive) are in [accessibility-requirements.md](../requirements/accessibility-requirements.md).

---

## Performance

### NFR-PERF-001: Page Load Time

**Target:** All authenticated pages render in ≤ 2 seconds at the 95th percentile under normal load.

**Acceptance Criteria**
- [ ] Course catalogue browse (CAT-001) renders within 2 s for up to 500 results
- [ ] Degree audit (REC-006) renders within 5 s (complex calculation exempted from the 2 s general target)
- [ ] Registration summary (REG-004) renders within 2 s
- [ ] Performance targets are measured with browser-side synthetic monitoring; baselines are established before go-live

---

### NFR-PERF-002: Search Response Time

**Target:** Course search (CAT-002) returns results in ≤ 1 second at the 95th percentile.

**Acceptance Criteria**
- [ ] Keyword search across title, code, description, and instructor returns results within 1 s for a catalogue of up to 10,000 active courses
- [ ] Search with active filters (CAT-003) returns results within 1 s
- [ ] Search indexes are rebuilt within 5 minutes of a catalogue change (CAT-005)

---

### NFR-PERF-003: Enrollment Transaction Throughput

**Target:** The system must sustain peak registration throughput without degradation or data errors.

**Acceptance Criteria**
- [ ] The system processes at least 500 concurrent enrollment submissions per minute without errors or race conditions
- [ ] Enrollment and capacity count updates are atomic — no two students can claim the same last seat
- [ ] Under sustained peak load, 99th-percentile enrollment transaction time remains ≤ 5 seconds

---

## Scalability

### NFR-SCALE-001: Concurrent User Capacity

**Target:** The system supports the institution's full active user population accessing the system simultaneously during peak registration periods.

**Acceptance Criteria**
- [ ] The system is load-tested to support at least 5,000 concurrent authenticated sessions without performance degradation below NFR-PERF-001 targets
- [ ] Horizontal scaling (adding application server instances) is possible without downtime or configuration changes
- [ ] Auto-scaling triggers are configured to add capacity when CPU or memory exceed 70% for more than 2 minutes

---

### NFR-SCALE-002: Data Volume

**Target:** The system handles growth in students, courses, and historical records without architectural changes.

**Acceptance Criteria**
- [ ] The system is designed to support up to 50,000 active student records, 5,000 course catalogue entries, and 10 years of enrollment history without query performance degradation
- [ ] Database indexes are reviewed and tuned before go-live; a query performance review is included in the annual maintenance cycle
- [ ] Report generation (RPT-001 – RPT-003) for a full academic year of data completes within 30 seconds for standard filtered queries

---

## Availability

### NFR-AVAIL-001: Uptime SLA

**Target:** 99.9% availability during the academic year, measured monthly (≤ 44 minutes unplanned downtime per month).

**Acceptance Criteria**
- [ ] Planned maintenance windows are scheduled outside peak registration hours and communicated to users at least 72 hours in advance via NOTIF-004
- [ ] The system is monitored 24/7 with automated alerting to on-call operations staff for any availability incident
- [ ] Uptime is reported monthly to Administrators in the admin dashboard
- [ ] Reduced SLA of 99.5% applies during non-academic periods (summer, winter break)

---

### NFR-AVAIL-002: Graceful Degradation

**Target:** If a non-core subsystem is unavailable, the rest of the system remains functional.

**Acceptance Criteria**
- [ ] If the email/SMS notification service is unavailable, core registration transactions (enroll, drop) still complete; notifications are queued and sent when the service recovers
- [ ] If an external integration (INT-001 – INT-003) is unavailable, Curriculab displays a clear "data currently unavailable" message in the affected area without crashing or blocking unrelated workflows
- [ ] If the payment gateway (PAY-002) is unavailable, students can still view their balance and access all non-payment features

---

## Maintainability

### NFR-MAINT-001: Deployment Pipeline

**Target:** Code changes can be deployed to production with zero downtime.

**Acceptance Criteria**
- [ ] The deployment pipeline uses blue-green or rolling deployment strategies; no downtime is required for application updates
- [ ] Database schema migrations are backward-compatible with the running application version to support zero-downtime deploys
- [ ] A deployment can be rolled back to the previous version within 15 minutes if a critical defect is detected post-deploy

---

### NFR-MAINT-002: Logging and Observability

**Target:** Sufficient operational visibility to diagnose production issues within 30 minutes.

**Acceptance Criteria**
- [ ] Application logs capture: request ID, user ID (redacted for non-admin log consumers), endpoint, HTTP status, and response time for every request
- [ ] Error logs include full stack traces and are centrally aggregated and searchable
- [ ] Dashboards display: active sessions, request rate, error rate, response time percentiles, and database connection pool utilization
- [ ] Log retention for operational logs is at least 90 days; audit logs follow the 7-year retention defined in SEC-005 and AUTH-010

---

## Localization

### NFR-L10N-001: Language Support

**Target:** The system is built to support multiple languages, with English as the default for v1.

**Acceptance Criteria**
- [ ] All user-facing strings are externalized into resource files; no hard-coded English text exists in UI templates
- [ ] Date, time, and number formats respect the user's configured locale
- [ ] v1 ships in English only; adding a second language requires no code changes, only new resource file translations
- [ ] Right-to-left (RTL) layout support is considered in the front-end CSS architecture even if not activated in v1

---

### NFR-L10N-002: Timezone Handling

**Target:** All date/time values are stored and transmitted in UTC; display uses the user's configured timezone.

**Acceptance Criteria**
- [ ] All timestamps in the database are stored in UTC
- [ ] Administrators can configure the institution's default display timezone (e.g., America/Chicago)
- [ ] Users can override the display timezone in their account settings
- [ ] Registration deadlines, session timeouts, and scheduled notifications fire based on UTC and are displayed in the user's local time with the timezone offset shown (e.g., "11:59 PM CT (UTC-6)")
