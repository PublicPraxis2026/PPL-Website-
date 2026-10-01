# Agent Handoff — Second-pass review fixes

Prepared: 2026-09-30

## Approval boundary

Authorised and done: R2-01 (docs drift), R2-02 (trailing slashes, D014), R2-03 (mobile nav flash) and R2-05 (CSP tightening). Stage 19+ is not authorised. R2-04 was deliberately not implemented; await the user's decision. No Git repository exists; nothing was committed.

## Read next

AGENTS.md order, then `docs/REVIEW_STAGES_1_18_SECOND_PASS.md`. D012 follow-up and D013 are appended in DECISIONS.md.

## Changes

- `src/layouts/BaseLayout.astro`: inline `<script is:inline>` in `<head>` adds `has-js`.
- `src/components/navigation/SiteHeader.astro`: removed that line from the module; all other behaviour and the 61.99rem/62rem breakpoints unchanged.
- `public/_headers`: `img-src 'self'` (no `data:`); removed redundant `media-src`, `manifest-src`, `worker-src`. Inline script/style allowances and Permissions-Policy untouched.
- `astro.config.mjs`: `trailingSlash: 'always'`.
- `SiteHeader.astro`, `BaseLayout.astro` footer, `src/content/pages/services.md`, `insights.md`: internal hrefs slash-terminated.
- `docs/DECISIONS.md` (D014), `docs/STATUS.md`, `docs/HANDOFF.md`.

## Verification

Check: 0 errors/warnings/hints. Build: 16 pages plus robots/sitemap. Static dist assertions (aria-current, h1/main, script order, headers copy) passed. No browser was available, so the nav flash fix, keyboard behaviour, Escape/focus return and no-JS fallback are unverified in a rendered browser. No `SITE_URL` was supplied, so no example-origin build was run.

## Pending decisions for the user

- **R2-04 `/style-guide` in production:** options are exclude from production builds, delete after Stage 2 approval, or record a decision to keep it. Overlaps Stage 19–21.
- **R2-02 follow-up:** verify Cloudflare slash behaviour after deployment.
- **R18-02:** browser verification at 320–1280+ px, keyboard, no-JS, 200% zoom and axe remains open.

Content and deployment items in STATUS.md still apply (`SITE_URL`, placeholder content, live header check).
