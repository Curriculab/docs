---
sidebar_label: "Authentication"
description: "Login, password recovery, 2FA, session timeout, RBAC, and audit logging."
---

# User Authentication & Authorization Requirements

**Story Prefix:** AUTH
**Feature Area:** User Authentication & Authorization
**System Overview:** [university-reg-features.md](./university-reg-features.md)
**Related docs:** Admin User Management (user provisioning) → [admin-user-management-requirements.md](./admin-user-management-requirements.md) | Academic Advising (enrollment overrides) → [academic-advising-requirements.md](./academic-advising-requirements.md) (ADV-006)

---

## AUTH-001: Login with Credentials

**As a** user (Student, Instructor, Academic Staff, Advisor, Registrar, or Administrator)
**I want** to log in to the system with my university credentials
**So that** I can securely access the features available to my role

### Acceptance Criteria
- [ ] The login page accepts a username (or email) and password
- [ ] Successful authentication redirects the user to their role-appropriate dashboard
- [ ] Failed authentication displays a generic error message (does not reveal whether username or password was incorrect)
- [ ] Accounts are locked after 5 consecutive failed login attempts and require admin unlock or self-service recovery

---

## AUTH-002: Password Recovery

**As a** user
**I want** to recover or reset my password when I cannot log in
**So that** I can regain access to my account without contacting support

### Acceptance Criteria
- [ ] A "Forgot password" link is available on the login page
- [ ] Entering a registered email address sends a time-limited (1-hour) reset link to that address
- [ ] The reset link allows the user to set a new password that meets complexity requirements (min 12 chars, at least one uppercase, one digit, one special character)
- [ ] Used or expired reset links are rejected
- [ ] Password reset invalidates all existing active sessions for that user

---

## AUTH-003: Two-Factor Authentication

**As a** user
**I want** to enable two-factor authentication (2FA) on my account
**So that** my account is protected even if my password is compromised

### Acceptance Criteria
- [ ] Users can enroll in 2FA via account settings using an authenticator app (TOTP) or SMS
- [ ] After correct password entry, 2FA-enrolled users are prompted for their one-time code before gaining access
- [ ] Invalid or expired codes are rejected with a clear error
- [ ] Administrators can mandate 2FA for specific roles (e.g., Administrator, Registrar)
- [ ] Users can generate backup codes to use if their primary 2FA method is unavailable

---

## AUTH-004: Session Timeout

**As a** system
**I want** to automatically expire idle user sessions
**So that** unattended sessions do not expose sensitive data

### Acceptance Criteria
- [ ] Sessions expire after 30 minutes of inactivity (configurable by Administrator)
- [ ] Users are warned with a countdown dialog 5 minutes before session expiry
- [ ] Users can extend their session by clicking "Stay logged in" before the timeout
- [ ] After expiry, users are redirected to the login page; unsaved form data is not persisted
- [ ] Absolute session duration is capped at 8 hours regardless of activity

---

## AUTH-005: Role-Based Access Control

**As an** Administrator
**I want** users to only access features appropriate to their assigned role
**So that** sensitive data and administrative functions are protected

### Acceptance Criteria
- [ ] Each user account has exactly one primary role assigned
- [ ] Navigation menus and available actions are filtered to the user's role
- [ ] Attempting to access a URL or API endpoint outside the user's role returns a 403 Forbidden response
- [ ] Role assignments can only be created or changed by an Administrator
- [ ] Role changes take effect on the user's next login

---

## AUTH-006: Course Registration Authorization Checks

**As a** Student
**I want** the system to verify my eligibility before I complete a registration
**So that** I cannot enroll in courses for which I do not qualify

### Acceptance Criteria
- [ ] The system checks that the student has completed all required prerequisites before confirming enrollment
- [ ] The system checks that the requested course does not conflict with already-registered courses (time/day overlap)
- [ ] The system checks that adding the course does not exceed the student's maximum credit-hour limit for the term
- [ ] If any check fails, registration is blocked and the student receives a specific explanation of which check failed
- [ ] Advisors can grant explicit exceptions that bypass prerequisite checks

---

## AUTH-007: Data Modification Restrictions by Role

**As an** Administrator
**I want** data modification capabilities to be restricted by role
**So that** only authorized users can alter sensitive records

### Acceptance Criteria
- [ ] Only Academic Staff and Administrators can create, edit, or retire course catalogue entries
- [ ] Only Instructors (for their own sections) and Administrators can submit or modify grades
- [ ] Only Students can update their own personal contact information
- [ ] Only Administrators can manage user accounts (create, deactivate, change roles)
- [ ] Attempts to perform unauthorized modifications are rejected and logged

---

## AUTH-008: Restricted Report Access

**As an** Administrator
**I want** sensitive reports to be accessible only to authorized roles
**So that** student and institutional data is not exposed to unauthorized users

### Acceptance Criteria
- [ ] Enrollment, grade-distribution, and demographic reports are accessible only to Administrators, Academic Staff, and Registrars
- [ ] Transcript data is accessible only to the individual Student and authorized Administrators/Advisors
- [ ] Financial reports are accessible only to Administrators
- [ ] Unauthorized report requests are rejected with a 403 response and logged

---

## AUTH-009: Payment & Billing Access Restriction

**As an** Administrator
**I want** payment and billing information to be accessible only to the account holder and authorized staff
**So that** financial data remains private and secure

### Acceptance Criteria
- [ ] Students can view and pay only their own billing balance
- [ ] Administrators can view and manage billing for any student account
- [ ] Instructors and Academic Staff have no access to student billing information
- [ ] All payment-related pages are served over HTTPS with no caching of sensitive data in the browser

---

## AUTH-010: Activity Audit Logging

**As an** Administrator
**I want** significant system actions to be recorded in an audit log
**So that** I can investigate security incidents and ensure accountability

### Acceptance Criteria
- [ ] The following events are logged: login, logout, failed login, password reset, role change, course enrollment/drop, grade submission, data export, report access
- [ ] Each log entry captures: timestamp (UTC), user ID, role, action type, affected resource, and IP address
- [ ] Audit logs are immutable — no user (including Administrators) can edit or delete log entries
- [ ] Administrators can search and filter audit logs by date range, user, and action type
- [ ] Logs are retained for a minimum of 7 years per compliance requirements
