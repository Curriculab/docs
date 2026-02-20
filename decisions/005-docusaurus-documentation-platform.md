---
sidebar_label: "ADR-005: Docusaurus"
description: "Decision to use Docusaurus 3 as the documentation platform for Curriculab."
---

# ADR-005: Docusaurus as the Documentation Platform

**Date:** 2026-02-19
**Status:** Accepted

## Context

`Curriculab/docs` is a documentation-only repository containing requirements (122 user stories across 23 feature areas), architecture references (57-entity data model, non-functional requirements), planning documents (story map, MoSCoW prioritization), and Architecture Decision Records.

The documentation needs:

- **Public site** — the docs should be browsable online, not just readable in a GitHub repo viewer.
- **Search** — contributors and practitioners need to find a specific story, entity, or decision quickly across ~30 Markdown files today and a growing number over time.
- **Zero migration cost** — existing Markdown files must render without rewriting; relative links between documents must continue to work.
- **Developer-audience fit** — the target audience is engineers and technical contributors; the site should feel like a developer portal, not a wiki.
- **Future extensibility** — as implementation repos mature, the docs site should be able to host interactive content (e.g., an OpenAPI spec viewer, an interactive story status dashboard) without a platform change.
- **Open-source hosting** — the site must be free to host; GitHub Pages is the target.
- **Docs-as-code workflow** — all changes go through pull requests; the build and deploy must be automated via CI.

## Decision

**Docusaurus 3** (maintained by Meta, MIT licence) is the documentation platform for `Curriculab/docs`.

The configuration uses:
- `path: '.'` with `include` patterns scoped to `requirements/`, `architecture/`, `planning/`, and `decisions/` — existing Markdown files remain in place with only front matter additions.
- `routeBasePath: '/'` — docs are served at the GitHub Pages project root (`curriculab.github.io/docs/`), avoiding a double `/docs/docs/` URL path.
- A custom React homepage (`src/pages/index.js`) at the site root introduces Curriculab and links to each section.
- GitHub Actions deploy workflow (`.github/workflows/deploy.yml`) builds and publishes to the `gh-pages` branch on every push to `main`.

## Consequences

**Positive**
- Existing Markdown files required only front matter (`sidebar_label`, `description`) — no content was rewritten.
- Native versioning (`mike` plugin or Docusaurus's built-in version snapshot) is available when the platform ships releases.
- MDX support allows React components to be embedded in Markdown pages (e.g., a live story status table, an interactive ERD viewer) without a platform change.
- Docusaurus 3.9 introduced Algolia DocSearch v4 with AI-powered search; this is available to open-source projects at no cost.
- The custom homepage is a full React page — not constrained to Markdown — enabling a richer entry point as the project grows.
- The GitHub Actions workflow builds on every pull request (catching broken links and MDX errors) and deploys only on merge to `main`.

**Negative**
- Requires Node.js toolchain. Contributors unfamiliar with JavaScript/Node need to install Node 20+ and run `npm install` to build locally. (`npm start` is the only command needed for day-to-day editing.)
- Advanced customization (swizzling theme components) requires React knowledge.
- The `path: '.'` configuration is non-standard; contributors must understand that the Docusaurus root is the repo root, not a `docs/` subdirectory.

**Neutral**
- Deployment target is GitHub Pages (`curriculab.github.io/docs/`). A custom domain (e.g., `docs.curriculab.dev`) can be configured by adding a `CNAME` file to `static/` and updating `url` and `baseUrl` in `docusaurus.config.js`.

## Alternatives Considered

**MkDocs + Material for MkDocs**
Python-based, YAML-configured, minimal setup. The Material theme is arguably the best-looking documentation theme available and is widely used in the API/backend ecosystem. The main limitations are a lower ceiling for customization (no native component embedding), no built-in versioning without the `mike` plugin, and a weaker story for eventually building a multi-repo developer portal. Remains the strongest alternative; should be reconsidered if the Node.js toolchain proves a barrier to contribution.

**VitePress**
Vue-powered static site generator. Very fast builds, minimal configuration, clean default theme. Smaller ecosystem than Docusaurus; versioning is less mature. A good choice for a Vue-centric project but adds no advantage here.

**GitHub's built-in Markdown rendering**
Zero setup. No search, no navigation sidebar, no versioning, no custom homepage. Suitable for small single-file READMEs, not for a 30+ file documentation portal. Rejected.

**Confluence / Notion / GitBook (hosted)**
Add cost and an external service dependency. Diverge from the docs-as-code principle (changes happen outside Git pull requests). Rejected.
