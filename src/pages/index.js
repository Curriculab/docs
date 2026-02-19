import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const SECTIONS = [
  {
    title: 'Requirements',
    href: '/requirements/',
    description:
      '122 user stories across 23 feature areas — from authentication and registration to graduation and document management.',
  },
  {
    title: 'Architecture',
    href: '/architecture/data-model',
    description:
      'Canonical data model with 57 entities across 6 domain clusters, plus non-functional requirements.',
  },
  {
    title: 'Planning',
    href: '/planning/story-map',
    description:
      '5 end-to-end user journeys and a full MoSCoW prioritization table for all 122 stories.',
  },
  {
    title: 'ADRs',
    href: '/decisions/',
    description:
      'Architecture Decision Records documenting the key design choices made for Curriculab.',
  },
];

const ROLES = [
  { label: 'Automation / QA', icon: '🧪' },
  { label: 'API Engineering', icon: '⚙️' },
  { label: 'Web & Mobile', icon: '💻' },
  { label: 'DevOps / Infra', icon: '🚀' },
  { label: 'Database', icon: '🗄️' },
  { label: 'Security', icon: '🔐' },
];

function SectionCard({ title, href, description }) {
  return (
    <div className={clsx('col col--3', styles.sectionCard)}>
      <h3>
        <Link to={href}>{title} →</Link>
      </h3>
      <p>{description}</p>
    </div>
  );
}

function RolePill({ label, icon }) {
  return (
    <span className={styles.rolePill}>
      {icon} {label}
    </span>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <header className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
          <p className={styles.heroTagline}>{siteConfig.tagline}</p>
          <div className={styles.heroCta}>
            <Link
              className="button button--primary button--lg"
              to="/requirements/university-reg-features"
            >
              Browse Requirements
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/architecture/data-model"
            >
              View Data Model
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.sectionsRow}>
          <div className="container">
            <div className="row">
              {SECTIONS.map((s) => (
                <SectionCard key={s.title} {...s} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.rolesRow}>
          <div className="container">
            <h2>Built for every discipline</h2>
            <p>
              Curriculab is intentionally scoped to span the full technology stack so
              engineers across every role have something meaningful to work against.
            </p>
            <div className={styles.rolePills}>
              {ROLES.map((r) => (
                <RolePill key={r.label} {...r} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
