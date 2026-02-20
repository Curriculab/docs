---
sidebar_label: "Course Catalogue"
description: "Browse, search, filter, view course details, and manage catalogue entries."
---

# Course Catalogue Requirements

**Story Prefix:** CAT
**Feature Area:** Course Catalogue
**System Overview:** [university-reg-features.md](./university-reg-features.md)

---

## CAT-001: Browse Course Catalogue

**As a** Student
**I want** to browse the full course catalogue
**So that** I can discover courses available for the upcoming term

### Acceptance Criteria
- [ ] Any authenticated user can access the course catalogue without additional permissions
- [ ] The catalogue lists all active (non-retired) courses with title, course code, department, credit hours, and available sections
- [ ] Results are paginated (default 25 per page) with navigation controls
- [ ] Each catalogue entry links to the full course detail page (CAT-004)
- [ ] Courses marked "Full" display their status and a link to join the waitlist (see [course-waitlists-requirements.md](./course-waitlists-requirements.md))

---

## CAT-002: Search Courses by Keyword

**As a** Student
**I want** to search the catalogue by keyword
**So that** I can quickly find courses related to a topic of interest

### Acceptance Criteria
- [ ] A search bar is prominently displayed on the catalogue page
- [ ] Search matches against course title, course code, description, and instructor name
- [ ] Results update without a full page reload (or with a fast response ≤ 1 second)
- [ ] Searching with no results displays a helpful "No courses found" message with suggestions
- [ ] Search is case-insensitive and handles partial matches (e.g., "calc" matches "Calculus")

---

## CAT-003: Filter Courses

**As a** Student
**I want** to filter the catalogue by multiple criteria
**So that** I can narrow results to courses that fit my schedule, department, and needs

### Acceptance Criteria
- [ ] Available filters include: department, credit hours, course level (100/200/300/400), delivery format (in-person, online, hybrid), days offered, term/semester, and availability (open, waitlist, full)
- [ ] Multiple filters can be applied simultaneously
- [ ] Active filters are displayed as removable tags so users can clear individual filters
- [ ] Filter state is preserved if the user navigates away and returns (via browser back button or bookmarked URL)

---

## CAT-004: View Course Detail Page

**As a** Student
**I want** to view the full details of a specific course
**So that** I can make an informed decision before registering

### Acceptance Criteria
- [ ] The detail page displays: course title, course code, department, description, credit hours, prerequisites, corequisites, learning outcomes, course format, available sections (with instructor, schedule, room/location, and enrollment status), tuition/fees, and required materials
- [ ] Prerequisites and corequisites are displayed as clickable links to their respective catalogue entries
- [ ] An "Enroll" button is present for open sections; a "Join Waitlist" button is present for full sections
- [ ] The page is accessible to unauthenticated users in read-only mode (no enroll button)

---

## CAT-005: Create, Update, and Retire Catalogue Entries

**As an** Academic Staff member
**I want** to create, update, and retire course catalogue entries
**So that** the catalogue accurately reflects what the university offers each term

### Acceptance Criteria
- [ ] Academic Staff and Administrators can create a new catalogue entry with all required fields: title, code, department, description, credit hours, prerequisites, corequisites, learning outcomes, and format
- [ ] Course codes must be unique; the system rejects duplicate codes with an error message
- [ ] Existing entries can be updated; a change history is maintained and viewable by Academic Staff and Administrators
- [ ] A course can be marked "Retired" which hides it from the student-facing catalogue but retains it in historical records
- [ ] Retired courses cannot be enrolled in; active enrollments in a course being retired require administrator confirmation
- [ ] Students with read-only access cannot create, edit, or retire entries; attempts are rejected with a 403 response
