# Public Praxis Lab

Static Astro + TypeScript website for Public Praxis Lab. The implementation covers Stages 1–18: the homepage, responsive navigation and footer, fourteen secondary pages, metadata and production header configuration. Final content and assets remain labelled placeholders. Cloudflare Pages is the intended deployment target, and WCAG 2.2 AA is the accessibility target. 

## Prerequisites

- Node.js 24.x LTS (`.nvmrc`; verified with 24.21.0). Astro 7.3.5 supports Node 22.12.0 or newer; this project selects Node 24 for a consistent development version.
- npm 11 (verified with 11.19.0, bundled with the tested Node archive).

Install Node 24 using your preferred Node version manager or the official Node.js distribution, then from this directory:

```sh
npm ci
npm run dev
```

The development server prints its local URL. Other commands:

```sh
npm run check    # Astro and TypeScript diagnostics
npm run build    # Static output in dist/
npm run preview  # Preview the built site locally
```

Astro's CLI may create a local telemetry preference. In a restricted environment, prefix a command with `ASTRO_TELEMETRY_DISABLED=1` to avoid that write. This does not change the built website.

## Current structure

```text
astro.config.mjs          Static output and optional SITE_URL configuration
src/layouts/             Shared HTML shell, metadata, footer and skip link
src/components/          Navigation and shared editorial page template
src/content/pages/       Fourteen editable secondary-page Markdown files
src/content.config.ts    Typed pages collection schema
src/data/                Optional Who We Are poster configuration
src/pages/               Homepage, collection routes, style guide, robots and sitemap
src/styles/              Global tokens and reusable visual primitives
public/                  Local favicon, fonts/licence and Cloudflare _headers
docs/                    Brief, decisions, stage plan, reviews and handoff
```

The build produces sixteen HTML routes: the homepage, fourteen secondary pages and the temporary, non-indexable `/style-guide`. Secondary-page copy lives in `src/content/pages/`; homepage copy remains in `src/pages/index.astro` and footer copy in `src/layouts/BaseLayout.astro`. Keep missing content visibly labelled until approved replacements are supplied.

Native navigation disclosures have one small inline JavaScript module for mobile-menu behaviour, Escape handling and focus return. Navigation remains available without JavaScript. Fonts and other assets are self-hosted; the site has no forms, analytics, tracking or backend.

Set the build environment variable `SITE_URL` to the confirmed public HTTPS origin to generate absolute canonical URLs, sitemap locations and the robots sitemap directive. Without it, the build intentionally omits host-specific values. Cloudflare security headers (Workers static assets `_headers`) are configured in `public/_headers`; their deployed enforcement still requires verification.

# PPL-Website-
