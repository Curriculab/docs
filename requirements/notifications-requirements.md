---
sidebar_label: "Notifications"
description: "Email and SMS events, in-system notification center, and preference settings."
---

# Notifications Requirements

**Story Prefix:** NOTIF
**Feature Area:** Notifications
**System Overview:** [university-reg-features.md](./university-reg-features.md)

---

## NOTIF-001: Receive Email Notification for Registration Events

**As a** Student
**I want** to receive email notifications for key registration events
**So that** I have a timely, durable record of changes to my enrollment

### Acceptance Criteria
- [ ] Email notifications are sent for: successful course enrollment, course drop, joining a waitlist, automatic enrollment from a waitlist, declined waitlist spot, hold placed on account, and hold removed
- [ ] Each email includes: the event type, relevant course/section details, timestamp, and a link to the affected page in the system
- [ ] Emails are sent from a recognizable university sender address with a clear subject line (e.g., "Enrollment Confirmed — MATH-201 Spring 2026")
- [ ] Delivery failures are retried up to 3 times; undeliverable addresses are flagged in the student profile for administrator review
- [ ] Students cannot disable enrollment confirmation emails (they are transactional); other email notifications are configurable (NOTIF-005)

---

## NOTIF-002: Receive SMS Notification (Opt-In)

**As a** Student
**I want** to opt in to receiving SMS notifications for urgent events
**So that** I am alerted immediately even when I am not checking email

### Acceptance Criteria
- [ ] Students can add and verify a mobile phone number in their notification preferences (NOTIF-005)
- [ ] SMS notifications are sent for: automatic waitlist enrollment, billing due date reminders, and registration deadline reminders (when opted in)
- [ ] SMS messages are concise (≤ 160 characters) and include a short URL to the relevant page
- [ ] Students can opt out of SMS notifications at any time via account settings or by replying "STOP" to any SMS
- [ ] Phone numbers are stored securely and not shared with third parties; SMS delivery is handled via a GDPR-compliant SMS gateway

---

## NOTIF-003: View In-System Notification Center

**As a** Student
**I want** to view all my notifications in one place within the system
**So that** I can review past alerts without searching my email inbox

### Acceptance Criteria
- [ ] A notification center icon (with an unread badge count) is visible in the main navigation for all authenticated users
- [ ] The notification center lists all notifications in reverse chronological order with: icon/type, message, timestamp, and read/unread status
- [ ] Clicking a notification marks it as read and navigates to the relevant page
- [ ] Users can mark all notifications as read in a single action
- [ ] Notifications older than 90 days are automatically archived (no longer shown in the main list but accessible via an "Archived" tab)

---

## NOTIF-004: Admin/Instructor Sends a System-Wide or Course-Level Announcement

**As an** Administrator or Instructor
**I want** to send an announcement to all system users or to students in a specific course
**So that** I can communicate important information quickly and reliably

### Acceptance Criteria
- [ ] Administrators can send a system-wide announcement that is delivered to all active user accounts
- [ ] Instructors can send a course-level announcement to all students enrolled in their section(s) (COURSE-008)
- [ ] Announcements are delivered as in-system notifications and optionally as email (respecting per-user preferences in NOTIF-005, except for urgent system-wide messages which are always emailed)
- [ ] Announcements marked "Urgent" by the sender bypass user email preferences and are always emailed and displayed as in-system banners
- [ ] All sent announcements are archived and viewable in the admin interface for 1 year

---

## NOTIF-005: Configure Personal Notification Preferences

**As a** Student
**I want** to control which non-mandatory notifications I receive and how
**So that** I am not overwhelmed with alerts and can choose my preferred communication channel

### Acceptance Criteria
- [ ] Users can access notification preferences from their account settings page
- [ ] Configurable notification categories include (at minimum): billing reminders, academic deadline reminders, grade postings, waitlist position updates, and course announcements
- [ ] For each category, users can select their delivery channel: email only, SMS only, in-system only, all channels, or off (if the category is non-mandatory)
- [ ] Mandatory transactional notifications (enrollment confirmations, hold notices, system security alerts) are not configurable and always delivered via email and in-system
- [ ] Preference changes take effect immediately for future notifications
