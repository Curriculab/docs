# Administrative User Management Requirements

**Story Prefix:** USR
**Feature Area:** Administrative User Management
**System Overview:** [university-reg-features.md](./university-reg-features.md)
**Related docs:** Authentication & RBAC → [user-authentication-requirements.md](./user-authentication-requirements.md) | Security & Privacy → [security-privacy-requirements.md](./security-privacy-requirements.md)

---

## USR-001: Create a User Account

**As an** Administrator
**I want** to create individual user accounts
**So that** new students, faculty, and staff can access the system with the correct role and permissions

### Acceptance Criteria
- [ ] Administrators can create an account with: legal name, university-assigned username, primary email address, assigned role (Student, Instructor, Academic Staff, Advisor, Registrar, Administrator), and optional department affiliation
- [ ] Usernames and primary email addresses must be unique across the system; duplicates are rejected with an error
- [ ] Upon account creation, the new user receives a welcome email with instructions to set their initial password via the password recovery flow (AUTH-002)
- [ ] Account creation is logged in the audit trail (AUTH-010) with the creating Administrator's identity
- [ ] Accounts created for students are automatically linked to a new student profile (PROF-001)

---

## USR-002: Deactivate and Reactivate a User Account

**As an** Administrator
**I want** to deactivate accounts for users who are no longer active
**So that** former students, graduated alumni, or departed staff cannot access the system while their records are preserved

### Acceptance Criteria
- [ ] Administrators can deactivate any account with a mandatory reason note (Graduated, Withdrawn, Employment Ended, Policy Violation, Other)
- [ ] Deactivated accounts are immediately invalidated: active sessions are terminated and future login attempts are rejected with a "Account inactive" message
- [ ] Deactivated accounts and all associated records are retained in the system (not deleted); the account is excluded from active user lists and reports
- [ ] Administrators can reactivate a deactivated account; the user must reset their password on next login
- [ ] All deactivation and reactivation events are logged in the audit trail (AUTH-010)

---

## USR-003: Bulk Import Users

**As an** Administrator
**I want** to import multiple user accounts at once from a CSV file
**So that** I can provision a new cohort of students or a new semester's faculty roster efficiently

### Acceptance Criteria
- [ ] Administrators can upload a CSV file with columns: legal name, username, email, role, and optional department
- [ ] A preview step shows the first 20 rows and a summary (total records, detected errors) before the import is confirmed
- [ ] Rows with validation errors (duplicate username/email, invalid role, missing required fields) are flagged; valid rows can be imported while invalid rows are skipped
- [ ] After import, a results report is displayed and downloadable showing: accounts created, accounts skipped, and the reason for each skip
- [ ] Bulk-imported users receive the same welcome email as individually created accounts (USR-001)
- [ ] The import action and results summary are logged in the audit trail (AUTH-010)

---

## USR-004: Provision Users via SSO / Directory Integration

**As an** Administrator
**I want** the system to provision and authenticate users through the university's identity provider
**So that** staff and students use a single set of credentials and accounts stay in sync with HR and student information systems

### Acceptance Criteria
- [ ] The system supports SAML 2.0 and/or OIDC for SSO authentication with the university's identity provider (IdP)
- [ ] On first SSO login, the system auto-provisions an account using attributes from the IdP assertion (name, email, role/group mapping)
- [ ] Role assignment is driven by IdP group membership; when a user's group changes in the IdP, their role in the URS is updated on their next login
- [ ] Accounts for users removed from the IdP are automatically deactivated in the URS within 24 hours (via directory sync or on the next login attempt)
- [ ] Administrators can view the SSO/directory sync status of each account (IdP-linked vs. local-only) in the user management interface
- [ ] SSO configuration (IdP metadata, attribute mappings) is managed by Administrators in a protected settings area

---

## USR-005: Manage Role Assignments

**As an** Administrator
**I want** to change a user's assigned role
**So that** their access level accurately reflects their current relationship with the university

### Acceptance Criteria
- [ ] Administrators can change any user's role from the user detail page; the change takes effect on the user's next login (AUTH-005)
- [ ] Downgrading a role (e.g., Administrator → Student) requires a confirmation step and a mandatory reason note
- [ ] Role change history is retained on the user record: previous role, new role, changed by, and timestamp
- [ ] The affected user receives a notification informing them their role has changed and what access they now have
- [ ] An Administrator cannot remove the Administrator role from the last active Administrator account in the system

---

## USR-006: Search and Filter User Accounts

**As an** Administrator
**I want** to search and filter user accounts
**So that** I can quickly locate a specific account for review, editing, or troubleshooting

### Acceptance Criteria
- [ ] Administrators can search by: name (partial match), username, email address, and student ID
- [ ] Results can be filtered by: role, account status (active / deactivated), department, and last login date range
- [ ] Search results display: name, username, email, role, status, and last login timestamp
- [ ] Clicking a result opens the full user detail page showing profile, role history, active sessions, and recent audit log entries for that user
- [ ] Bulk actions (deactivate selected, export selected as CSV) are available on the search results page for Administrator efficiency
