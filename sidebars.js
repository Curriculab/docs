// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  requirementsSidebar: [
    'requirements/README',
    'requirements/university-reg-features',
    {
      type: 'category',
      label: 'Feature Requirements',
      collapsible: true,
      collapsed: false,
      items: [
        'requirements/user-authentication-requirements',
        'requirements/course-catalogue-requirements',
        'requirements/course-management-requirements',
        'requirements/course-capacity-requirements',
        'requirements/course-waitlists-requirements',
        'requirements/student-registration-requirements',
        'requirements/semester-session-requirements',
        'requirements/academic-records-requirements',
        'requirements/payment-billing-requirements',
        'requirements/reporting-requirements',
        'requirements/integration-requirements',
        'requirements/accessibility-requirements',
        'requirements/security-privacy-requirements',
        'requirements/notifications-requirements',
        'requirements/support-help-requirements',
        'requirements/student-profile-requirements',
        'requirements/degree-programs-requirements',
        'requirements/room-facility-requirements',
        'requirements/admin-user-management-requirements',
        'requirements/academic-advising-requirements',
        'requirements/graduation-commencement-requirements',
        'requirements/transfer-credit-requirements',
        'requirements/document-management-requirements',
      ],
    },
  ],

  architectureSidebar: [
    'architecture/data-model',
    'architecture/non-functional-requirements',
  ],

  planningSidebar: [
    'planning/story-map',
    'planning/story-prioritization',
  ],

  decisionsSidebar: [
    'decisions/README',
  ],
};

module.exports = sidebars;
