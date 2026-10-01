# Decision Log

Durable decisions that future agents must respect.

---

## D001 — Static Astro architecture

Status: Accepted

Decision:
Use Astro + TypeScript with static generation and minimal client-side JavaScript.

Reason:
The MVP is a content-oriented consultancy site and does not require application infrastructure.

---

## D002 — No members area in MVP

Status: Accepted

Decision:
Remove the previously proposed Members Area from the MVP.

Reason:
A meaningful members implementation would require authentication and likely database-backed state, which is outside current scope.

---

## D003 — No database or authentication

Status: Accepted

Decision:
Do not introduce a database, login system, authentication provider or user accounts.

---

## D004 — No analytics or tracking initially

Status: Accepted

Decision:
The initial site will contain no analytics, behavioural tracking or tracking cookies.

---

## D005 — Approval-gated implementation

Status: Accepted

Decision:
Implementation proceeds one documented stage at a time and stops after each stage for user review.

---

## D006 — Repository documentation is durable agent memory

Status: Accepted

Decision:
Agents must record lasting requirements, decisions, status and hand-off notes in repository markdown rather than relying on chat history.

---

## D007 — Client screenshots define direction, not pixel-perfect layout

Status: Accepted

Decision:
The supplied Canva screenshots establish visual language and composition direction.

They must be translated into robust responsive web layouts rather than reproduced pixel-for-pixel.

## Maintaining this log

Append new decisions using sequential IDs. Do not rewrite accepted history or record trivial implementation details. If a decision changes, append a superseding entry referencing the earlier decision.

---

## D008 — Stage 1 toolchain baseline

Status: Accepted for Stage 1 review

Decision:
Use Node.js 24 LTS with npm, Astro 7.3.5 static output, Astro's strict TypeScript preset, TypeScript 6.0.2 and `@astrojs/check` 0.9.10. Keep exact direct dependency versions and an npm lockfile for repeatable installs.

Reason:
Node 24 satisfies Astro's supported Node range. The selected TypeScript version satisfies `@astrojs/check`'s declared peer range, while TypeScript 7 does not. This baseline passed clean installation, check and build on 2026-09-25.

---

## D009 — Stage 2 visual foundations

Status: Accepted for Stage 2 review

Decision:
Use primary navy `#0b2b40`, deep navy `#082235`, slate `#486171`, ink `#152d3c`, soft white `#f4f7f8` and white `#ffffff`. Use self-hosted variable Manrope for headings and body copy, a 4 px based spacing scale, 16 px card radius and pill actions. The temporary `/style-guide` route displays the vocabulary for approval.

Reason:
These choices follow the eight supplied Canva references while keeping a small, accessible CSS system that works across dark and light sections. A single self-hosted font avoids third-party runtime requests and an additional font dependency.

---

## D010 — Native navigation disclosures

Status: Accepted for Stage 3 review

Decision:
Use native `<details>` and `<summary>` for the Services and Insights submenus. Use a small script for the responsive menu button, Escape handling and focus return. Keep the navigation visible when JavaScript is unavailable.

Reason:
This gives keyboard and touch access without a framework or hover-dependent interaction, while keeping the site navigable if enhancement fails.

---

## D011 — File-based secondary-page collection

Status: Accepted for Stages 12–14 review

Decision:
Use one Astro Content Collection named `pages` for the approved secondary routes. Each Markdown file owns a route's editable heading, introduction, body and only the optional presentation data actually used by the shared editorial template: placeholder media, callout and CTA note. Generate the static routes from the document IDs with one catch-all page.

Reason:
The fourteen route documents share an editorial presentation but need copy to remain replaceable without editing layout code. A single bounded collection avoids prematurely modelling unpublished case studies, insights, people or media while retaining a straightforward path-based authoring workflow.

---

## D012 — Static-site metadata and browser policy configuration

Status: Accepted for Stages 15–18 review

Decision:
Keep canonical URLs and sitemap locations conditional on the `SITE_URL` build environment variable rather than guessing a production hostname. Supply robots and sitemap as static Astro endpoints. Deploy the Cloudflare Pages `_headers` file with a restrictive same-origin policy, including `frame-ancestors 'none'` and no form submissions or network connections. The CSP permits inline script and style because Astro currently emits the navigation enhancement and component styles inline; no third-party origin is allowed.

Reason:
The public origin has not been supplied, so hard-coding one would create incorrect canonical and sitemap entries. The static build has no data collection or runtime network requirements, while the emitted HTML needs the carefully bounded inline CSP allowance.

---

## D012 follow-up — CSP tightening

Status: Accepted for second-pass review fixes

Decision:
Removed `data:` from `img-src` (no `data:` URI exists in source or output) and dropped `media-src`, `manifest-src` and `worker-src`, which duplicated `default-src 'self'`. The inline script and style allowances are unchanged. `autoplay=()` in Permissions-Policy is deliberate and unchanged.

---

## D013 — Early `has-js` class via inline head script

Status: Accepted for second-pass review fixes

Decision:
Set the `has-js` class on `<html>` with a one-line classic inline script at the start of `<head>` in `BaseLayout.astro`, instead of from the deferred navigation module. The module keeps all menu behaviour (D010) and its 61.99rem breakpoint still matches the CSS 62rem breakpoint. Without JavaScript the class is never set, so the navigation stays visible (D010 fallback).

Reason:
The module ran after first paint, so narrow viewports briefly showed the expanded no-JS navigation and then collapsed it, causing layout shift. The CSP already allows inline script (D012), so no policy change is needed.

---

## D014 — Trailing-slash policy

Status: Accepted for second-pass review fixes

Decision:
Set `trailingSlash: 'always'` in `astro.config.mjs`. All internal page links (header, footer, Markdown body) are slash-terminated, matching the emitted `dir/index.html` routes, canonical URLs and sitemap entries. Files such as `/favicon.svg`, `/robots.txt` and `/sitemap.xml` are not slash-terminated.

Reason:
Cloudflare Pages serves `dir/index.html` at a slashed URL and redirects slashless requests. Slash-terminated links avoid that redirect and keep links, canonicals and sitemap consistent. Cloudflare redirect behaviour was not verified locally.
