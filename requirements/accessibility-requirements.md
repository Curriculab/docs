# Accessibility Requirements

**Story Prefix:** ACC
**Feature Area:** Accessibility
**System Overview:** [university-reg-features.md](./university-reg-features.md)

---

## ACC-001: Access the System on Desktop, Tablet, and Mobile

**As a** Student
**I want** to use the registration system on any device I own
**So that** I can manage my registration from wherever I am

### Acceptance Criteria
- [ ] The interface is fully functional on current-generation desktop browsers, tablets (portrait and landscape), and mobile phones (minimum viewport width 320 px)
- [ ] All core registration workflows (browse catalogue, enroll, drop, view summary) are completable on a mobile device without horizontal scrolling
- [ ] Touch targets are at least 44 × 44 CSS pixels on touch-enabled devices
- [ ] The layout adjusts responsively via CSS (no separate mobile site required)

---

## ACC-002: Navigate the System Using Keyboard Only

**As a** user with a motor disability
**I want** to navigate and operate the system entirely with a keyboard
**So that** I can use all features without a mouse or touch input

### Acceptance Criteria
- [ ] All interactive elements (links, buttons, form fields, dropdowns, modals) are reachable and operable via keyboard (Tab, Shift+Tab, Enter, Space, arrow keys)
- [ ] Focus order follows a logical reading sequence on every page
- [ ] Keyboard focus is always visually indicated with a clearly visible outline (minimum 3:1 contrast ratio between focused and unfocused states)
- [ ] No keyboard trap exists — users can always navigate away from any component using only the keyboard
- [ ] Modal dialogs trap focus within the dialog while open and restore focus to the triggering element when closed

---

## ACC-003: Use the System with a Screen Reader (WCAG 2.1 AA)

**As a** user who is blind or has low vision
**I want** the system to be fully compatible with screen readers
**So that** I can access all information and complete all workflows independently

### Acceptance Criteria
- [ ] All pages comply with WCAG 2.1 Level AA
- [ ] All images, icons, and non-text controls have descriptive alt text or ARIA labels
- [ ] All form fields have programmatically associated labels (not just placeholder text)
- [ ] Status messages (enrollment confirmations, errors, waitlist notifications) are announced by screen readers via ARIA live regions
- [ ] Data tables use proper `<thead>`, `<th scope>`, and caption markup
- [ ] The system is tested against and passes with NVDA + Chrome and VoiceOver + Safari

---

## ACC-004: Switch to High-Contrast or Large-Text Mode

**As a** user with low vision or light sensitivity
**I want** to enable a high-contrast theme or increase the base text size
**So that** I can read the interface comfortably

### Acceptance Criteria
- [ ] A high-contrast theme option is available in user account settings; the preference is persisted across sessions
- [ ] The high-contrast theme meets WCAG 2.1 AA contrast ratio requirements (minimum 4.5:1 for normal text, 3:1 for large text and UI components)
- [ ] The system respects the operating system / browser "prefers-color-scheme: dark" and "prefers-contrast: more" media queries by default
- [ ] All content remains fully functional and readable when browser text size is increased to 200%
- [ ] No content or functionality is lost or clipped when zoom is applied up to 400%

---

## ACC-005: View the System in Supported Browsers

**As a** user
**I want** the system to work correctly in current mainstream browsers
**So that** I do not need to install a specific browser to use the system

### Acceptance Criteria
- [ ] The system is tested and fully functional in the latest two major versions of: Chrome, Firefox, Safari, and Edge
- [ ] A browser compatibility notice is displayed to users on unsupported browsers, listing the supported options
- [ ] No browser-specific plugins (e.g., Flash, Silverlight) are required
- [ ] JavaScript is required; users with JavaScript disabled see a graceful degradation message directing them to enable it
