---
sidebar_label: "Reporting"
description: "Enrollment, demographic, and grade distribution reports with CSV export."
---

# Reporting Requirements

**Story Prefix:** RPT
**Feature Area:** Reporting
**System Overview:** [university-reg-features.md](./university-reg-features.md)
**Related docs:** Access restrictions → [user-authentication-requirements.md](./user-authentication-requirements.md) (AUTH-008)

---

## RPT-001: View Enrollment Report by Term, Department, or Section

**As an** Administrator
**I want** to view detailed enrollment reports filtered by term, department, or individual section
**So that** I can monitor registration trends and course demand

### Acceptance Criteria
- [ ] The report displays: section code, course title, department, instructor, term, enrolled count, capacity, fill rate (%), waitlist size, and over-enrollment count
- [ ] Reports can be filtered by one or more of: term, department, delivery format, instructor, and enrollment status (open/full/over-enrolled)
- [ ] Summary totals (total enrolled students, total sections, average fill rate) are displayed at the top of the filtered result
- [ ] Data reflects the current state at the time the report is generated, with a timestamp shown on the report
- [ ] Access is restricted to Administrators, Academic Staff, and Registrars (AUTH-008)

---

## RPT-002: View Demographic Report

**As an** Administrator
**I want** to view demographic breakdowns of enrolled students
**So that** I can assess diversity, equity, and inclusion metrics across the institution

### Acceptance Criteria
- [ ] The report shows enrollment counts and percentages segmented by: academic program, class year (Freshman/Sophomore/Junior/Senior), enrollment status (full-time/part-time), and academic standing
- [ ] Reports can be filtered by term and department
- [ ] Individual student identities are not exposed; minimum cell size of 5 students is enforced before displaying a demographic breakdown to prevent re-identification
- [ ] Access is restricted to Administrators only (AUTH-008)

---

## RPT-003: View Course Completion and Grade Distribution Report

**As an** Administrator
**I want** to view course completion rates and grade distributions for each section
**So that** I can identify courses with unusually high failure or withdrawal rates for quality review

### Acceptance Criteria
- [ ] The report shows per section: number of students who completed, withdrew (grade W), received incomplete (grade I), and failed (grade F), plus the grade distribution (count and % of each letter grade)
- [ ] Reports can be filtered by term, department, course, and instructor
- [ ] Sections with a DFW rate (D, F, or W grades) above a configurable threshold are highlighted
- [ ] Access is restricted to Administrators, Academic Staff, and Registrars (AUTH-008)

---

## RPT-004: Export Any Report as CSV

**As an** Administrator
**I want** to export any system report as a CSV file
**So that** I can perform further analysis in spreadsheet or data analysis tools

### Acceptance Criteria
- [ ] Every report screen includes an "Export as CSV" button
- [ ] The exported CSV includes all columns visible in the report plus any additional detail columns available in the underlying data
- [ ] CSV column headers are human-readable labels
- [ ] Exports respect the active filters applied to the report at the time of export
- [ ] Large exports (> 10,000 rows) are generated asynchronously; the user is notified via email with a download link when the file is ready

---

## RPT-005: Schedule Automated Report Delivery

**As an** Administrator
**I want** to schedule reports to be generated and emailed to me or my team on a recurring basis
**So that** I receive up-to-date data without manual effort each reporting cycle

### Acceptance Criteria
- [ ] Administrators can configure a scheduled report by selecting: report type, filters, delivery frequency (daily / weekly / monthly), delivery day/time, and recipient email addresses
- [ ] Scheduled reports are generated and emailed as CSV attachments at the configured time
- [ ] Administrators can view, edit, pause, or delete any scheduled report configuration
- [ ] If a scheduled report generation fails, the system retries once and then notifies the requesting Administrator of the failure
- [ ] Access to scheduling is restricted to Administrators
