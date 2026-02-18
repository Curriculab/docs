# Room & Facility Management Requirements

**Story Prefix:** ROOM
**Feature Area:** Room & Facility Management
**System Overview:** [university-reg-features.md](./university-reg-features.md)
**Related docs:** Course Management (section scheduling) → [course-management-requirements.md](./course-management-requirements.md) (COURSE-004) | Accessibility → [accessibility-requirements.md](./accessibility-requirements.md)

---

## ROOM-001: Add a Room or Facility

**As an** Academic Staff member
**I want** to add a room or facility to the system
**So that** it can be assigned to course sections and its availability can be tracked

### Acceptance Criteria
- [ ] Academic Staff and Administrators can create a room record with: building name, room number, campus (for multi-campus institutions), room type (classroom, lecture hall, lab, seminar room, online/virtual), seating capacity, and a list of available equipment/features (projector, whiteboard, video conferencing, lab benches, etc.)
- [ ] Room identifiers (building + room number) must be unique; duplicates are rejected with an error
- [ ] Accessibility attributes are recorded per room: wheelchair accessible, hearing loop, adjustable furniture (see [accessibility-requirements.md](./accessibility-requirements.md))
- [ ] A new room defaults to "Active" status and is immediately available for section scheduling (COURSE-004)

---

## ROOM-002: Update Room Attributes

**As an** Academic Staff member
**I want** to update a room's attributes
**So that** the scheduling system uses current and accurate information about capacity and equipment

### Acceptance Criteria
- [ ] Academic Staff and Administrators can edit any attribute of an existing room record
- [ ] Reducing a room's seating capacity below the enrollment count of any currently scheduled section triggers a warning listing the affected sections; the change can still be saved but the affected sections are flagged for review
- [ ] Each update is logged with the editor's identity and timestamp
- [ ] Instructors with sections assigned to a room receive a notification if that room's capacity or key equipment (e.g., lab equipment) changes materially

---

## ROOM-003: View Room Availability

**As an** Academic Staff member
**I want** to see a room's schedule for a given day or week
**So that** I can identify open time slots when assigning sections

### Acceptance Criteria
- [ ] A room detail page displays a weekly calendar view showing all confirmed section bookings and any blocked periods (ROOM-005)
- [ ] The view can be navigated forward/backward by week and can be filtered to any specific term
- [ ] Open time slots are visually distinct from booked and blocked slots
- [ ] Academic Staff can search for rooms available during a specified day/time range, optionally filtered by minimum capacity and required equipment
- [ ] Results from an availability search show each matching room with its capacity, equipment, and a direct link to assign it to a section

---

## ROOM-004: Enforce Room Scheduling Conflicts

**As an** Academic Staff member
**I want** the system to prevent me from scheduling two sections in the same room at the same time
**So that** room assignments are always valid and no double-bookings occur

### Acceptance Criteria
- [ ] When a section is assigned a room and time slot, the system checks all existing bookings for that room and term for day/time overlap
- [ ] If a conflict is detected, the assignment is rejected and the conflicting section(s) are identified in the error message
- [ ] The conflict check accounts for buffer time if a global or per-room buffer is configured (e.g., 10 minutes between classes for room turnover)
- [ ] Administrators can override a conflict with a mandatory reason note; the override is logged in the audit trail (AUTH-010)
- [ ] Online/virtual sections are not subject to room conflict checks

---

## ROOM-005: Mark a Room as Unavailable

**As an** Academic Staff member
**I want** to block a room for a specific date range
**So that** it cannot be scheduled for sections during maintenance, renovations, or special events

### Acceptance Criteria
- [ ] Academic Staff and Administrators can create a blocked period for a room with: start date/time, end date/time, and a reason (Maintenance / Renovation / Special Event / Other)
- [ ] Creating a blocked period that overlaps with an already-scheduled section displays a warning listing the affected sections; the block can be saved but affected sections are flagged as needing reassignment
- [ ] Instructors with sections in a newly blocked room receive a notification advising them that their room assignment requires attention
- [ ] Blocked periods are visible in the room's weekly calendar view (ROOM-003) and are visually distinguished from section bookings
- [ ] Blocking can be removed by Academic Staff or Administrators before the block start date; removal is logged
