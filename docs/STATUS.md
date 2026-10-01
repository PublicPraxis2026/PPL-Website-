# Project Status

Last updated: 2026-09-30

## Current stage

Stages 1–18 implemented and reviewed; second-pass fixes R2-01, R2-02, R2-03 and R2-05 applied. Stage 15 browser verification (R18-02) and the R2-04 decision remain open. Stage 19 is not authorised.

## State

The static site has its homepage, fourteen secondary Markdown pages, shared editorial template, metadata, conditional canonical/sitemap support, favicon, robots endpoint and Cloudflare Pages security headers. Missing content and assets remain labelled placeholders. No Stage 19–21 work has started.

`SiteHeader.astro`, `index.astro` and `README.md` changed after the first-review baseline (R18-01 and R18-03 are fixed in source). The exact content of the `index.astro` change is unrecorded. The `has-js` class is now set by an inline head script in `BaseLayout.astro` (D013); the CSP `img-src` no longer allows `data:` (D012 follow-up).

## Latest verification

- Node 24 check: zero errors, warnings and hints. Production build: sixteen HTML routes plus robots and sitemap.
- Static dist assertions passed: each of the twelve header destinations has exactly one `aria-current="page"`; `/` marks only the site name; one h1 and one main per page; the `has-js` inline script appears once, in `<head>` right after the charset meta. `dist/_headers` is byte-identical to `public/_headers`.
- R2-02 applied (D014): `trailingSlash: 'always'`; all internal header, footer and Markdown links are slash-terminated. Dist check: no slashless internal page hrefs; aria-current assertions still pass.
- No browser provider was available. No rendered, keyboard, zoom, axe, screen-reader, cross-browser, Lighthouse or Cloudflare test was run. The mobile nav flash fix is verified by built HTML order only, not visually.

## Open items

See [second-pass review](REVIEW_STAGES_1_18_SECOND_PASS.md).

- **R18-02, P2:** Stage 15 browser verification incomplete.
- **R2-04:** `/style-guide` shipping to production awaiting decision.
- **R2-02 follow-up:** Cloudflare redirect/slash behaviour unverified until deployment (D014).

## Remaining acceptance/deployment items

- Supply approved copy, images/media, captions/alt text, case-study/publication material, contact/legal/copyright details, social links and final CTA decisions. Privacy/accessibility pages are placeholders, not final notices or conformance statements.
- Complete local/private-preview responsive, keyboard, zoom and accessibility checks before accepting Stage 15; measure browser performance where practical.
- Set `SITE_URL` to the confirmed HTTPS public origin and rebuild before deployment. Verify actual Cloudflare response headers after deployment.
- Review new imagery/media for responsive sizing, dimensions, alternative text, CSP and performance. No Git repository is present.
