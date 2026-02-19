// @ts-check

const { themes: prismThemes } = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Curriculab',
  tagline:
    'A free, open-source reference platform for real-world developer practice on a production-grade university registration system.',
  favicon: 'img/favicon.ico',

  // GitHub Pages deployment config.
  // Change these to match your GitHub org and repo.
  url: 'https://curriculab.github.io',
  baseUrl: '/docs/',
  organizationName: 'Curriculab',
  projectName: 'docs',
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'warn',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // Serve docs from the repo root, scoped to specific subdirectories.
          path: '.',
          // Serve docs at the site root (baseUrl), not under /docs/docs/.
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          include: [
            'requirements/**/*.{md,mdx}',
            'architecture/**/*.{md,mdx}',
            'planning/**/*.{md,mdx}',
            'decisions/**/*.{md,mdx}',
          ],
          editUrl: 'https://github.com/Curriculab/docs/edit/main/',
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Curriculab',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'requirementsSidebar',
            position: 'left',
            label: 'Requirements',
          },
          {
            type: 'docSidebar',
            sidebarId: 'architectureSidebar',
            position: 'left',
            label: 'Architecture',
          },
          {
            type: 'docSidebar',
            sidebarId: 'planningSidebar',
            position: 'left',
            label: 'Planning',
          },
          {
            type: 'docSidebar',
            sidebarId: 'decisionsSidebar',
            position: 'left',
            label: 'ADRs',
          },
          {
            href: 'https://github.com/Curriculab/docs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              { label: 'Requirements', to: '/requirements/' },
              { label: 'Architecture', to: '/architecture/data-model' },
              { label: 'Planning', to: '/planning/story-map' },
              { label: 'ADRs', to: '/decisions/' },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub Org',
                href: 'https://github.com/Curriculab',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Curriculab. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'sql', 'yaml', 'json'],
      },
    }),
};

module.exports = config;
