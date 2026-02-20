---
sidebar_label: "Security & Privacy"
description: "Encryption, FERPA/GDPR compliance, backups, data retention, and deletion."
---

# Security & Privacy Requirements

**Story Prefix:** SEC
**Feature Area:** Security & Privacy
**System Overview:** [university-reg-features.md](./university-reg-features.md)
**Related docs:** Authentication & audit logging → [user-authentication-requirements.md](./user-authentication-requirements.md)

---

## SEC-001: Encrypt All Sensitive Data at Rest and in Transit

**As an** Administrator
**I want** all sensitive data to be encrypted at rest and in transit
**So that** unauthorized parties cannot read student or institutional data even if storage or network traffic is compromised

### Acceptance Criteria
- [ ] All data in transit is protected by TLS 1.2 or higher; HTTP requests are automatically redirected to HTTPS
- [ ] All database storage (including backups) uses AES-256 encryption at rest
- [ ] Passwords are hashed using a modern adaptive algorithm (bcrypt, Argon2, or PBKDF2) with an appropriate work factor; plaintext passwords are never stored or logged
- [ ] Encryption keys are managed in a dedicated key management service (KMS), separate from the data they protect
- [ ] TLS certificate validity is monitored; expiring certificates trigger an automated alert 30 days before expiry

---

## SEC-002: Comply with Applicable Data Privacy Laws

**As an** Administrator
**I want** the system to comply with FERPA and, where applicable, GDPR
**So that** the institution meets its legal obligations and students trust us with their data

### Acceptance Criteria
- [ ] Student education records are accessible only to the student and authorized university personnel as defined by FERPA
- [ ] The system supports a student's right to review their own education records within 45 days of a request
- [ ] For users subject to GDPR, the system supports: right of access, right to rectification, and right to erasure (where not in conflict with FERPA record retention obligations)
- [ ] A data processing register identifies what personal data is collected, the legal basis for processing, and retention periods
- [ ] Third-party integrations handling student data must have a data sharing agreement on file before data is shared (INT-004)

---

## SEC-003: Automated Daily Data Backups

**As an** Administrator
**I want** the system to automatically back up all data daily
**So that** we can recover from data loss events with minimal data loss

### Acceptance Criteria
- [ ] Full backups are performed daily; incremental backups are performed hourly
- [ ] Backups are stored in at least two geographically separate locations
- [ ] Backup completion status (success/failure and backup size) is logged and an alert is sent to the Administrator on any failure
- [ ] Backup data is encrypted at rest using the same standard as production data (SEC-001)
- [ ] Backup retention policy: daily backups retained for 30 days, weekly for 1 year, annual for 7 years

---

## SEC-004: Restore System from Backup

**As an** Administrator
**I want** to be able to restore the system from a backup in the event of data loss or system failure
**So that** operations can resume with minimal data loss

### Acceptance Criteria
- [ ] A documented and tested restore procedure is in place; restore drills are performed at least annually
- [ ] Restoration of a full backup can be completed within a Recovery Time Objective (RTO) of 4 hours
- [ ] Recovery Point Objective (RPO) is no more than 1 hour of data loss (aligned with hourly incremental backups)
- [ ] Restore operations are accessible only to Administrators and are logged in the audit trail (AUTH-010)
- [ ] After a restore, the Administrator receives a report confirming the restoration point and any data that could not be recovered

---

## SEC-005: Data Retention and Deletion Policy

**As an** Administrator
**I want** a defined data retention and deletion policy enforced by the system
**So that** we keep data only as long as legally required and reduce risk from holding stale personal data

### Acceptance Criteria
- [ ] Student academic records (transcripts, grades, enrollment history) are retained for a minimum of 7 years after the student's last enrollment
- [ ] Financial transaction records are retained for 7 years in compliance with tax and audit requirements
- [ ] Audit logs (AUTH-010) are retained for a minimum of 7 years
- [ ] Inactive student accounts with no enrollment activity for 5 years are flagged for deletion review; Administrators must confirm before deletion
- [ ] Data deletion requests (e.g., GDPR erasure) are reviewed against retention obligations; records required by law are retained in a restricted archive and removed from active use
- [ ] All deletion actions are logged with the responsible Administrator's identity and the legal basis for the decision
