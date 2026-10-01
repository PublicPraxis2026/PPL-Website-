# Implementation review — Stages 9–11

Reviewed: 2026-09-29

## Result and scope

Reviewed all completed stages still awaiting agent review: Stage 9 (Who We Are), Stage 10 (Testimonials and Case Studies) and Stage 11 (Final CTA and Footer). STATUS.md and HANDOFF.md identify these stages as implemented; Stages 5–8 already have a combined review report. Stage 12 is absent and remains unauthorised.

The user's request to review all unreviewed stages supersedes the earlier plan to defer review until Stage 12. This session performs the review now without authorising another implementation stage.

The initial review found two Stage 9 defects; both were fixed and verified after the user authorised corrections. See the correction follow-up below. No actionable implementation defects were found in Stages 10 or 11. User visual/content approval and final acceptance remain pending.

## Findings

### R9-01 — Medium: implement the required poster support — resolved

Original location: `src/pages/index.astro:163`; requirement: `docs/IMPLEMENTATION_PLAN.md:263`. The description below records the initial finding before correction.

Stage 9 explicitly requires poster support before final media exists. The current media region always renders a text-only `div`. There is no optional poster source, image rendering branch or video poster attribute anywhere in the section. Mentioning a poster in its label reserves space but does not implement support: supplying an image still requires changing the presentation markup.

Recommended correction: allow an optional supplied local poster to render responsively in the existing media region, retaining the named placeholder when absent. Do not invent an image or add an empty/broken player. Preserve the caption/transcript structure and revisit real video controls and captions when a video is supplied.

Verification after correction: check both the no-poster fallback and a temporary local image fixture at narrow and wide widths; confirm the image has an appropriate accessible description and creates no overflow. No final asset is required to implement or exercise the branch.

### R9-02 — Low: correct the figure caption position — resolved

Original location: `src/pages/index.astro:166`. The description below records the initial finding before correction.

The figure's children are media placeholder, `figcaption`, then transcript `section`. A `figcaption` must be the first or last child of its figure. The current middle position is non-conforming HTML. See the [HTML Standard](https://html.spec.whatwg.org/multipage/grouping-content.html#the-figcaption-element).

Recommended correction: put the transcript after the figure in a shared wrapper, leaving the caption as the figure's last child and preserving media → caption → transcript reading order. Moving the caption to the figure's first or last position is another conforming option if the intended reading order remains clear.

Astro check/build do not diagnose this content-model issue. No screen-reader malfunction or WCAG failure was demonstrated; this is a confirmed markup defect.

## Stage assessments

| Stage | Assessment | Remaining acceptance items |
| --- | --- | --- |
| 9 — Who We Are | Dark media-oriented composition; named responsive placeholder; optional poster rendering; conforming figure caption; transcript follows the figure; logical h2/h3 order; no player or autoplay. R9-01 and R9-02 resolved. | Approved people/organisation copy, poster/media, caption and speech transcript; real controls/caption tracks when video exists; user visual approval. |
| 10 — Testimonials / Case Studies | Three static white testimonial cards beside a case-study preview on navy; stacked mobile layout; exact “Explore our case studies” label; no carousel or fabricated quotes, clients or outcomes. | Approved quotes/attributions, case-study narrative/media and destination; user approval of card treatment/content density. Pending action is visibly labelled and non-interactive. |
| 11 — Final CTA / Footer | Dark closing panel followed by soft footer; identity, labelled navigation, contact, Privacy, Accessibility, social status and copyright placeholders; one column below 768 px, four footer columns from 768 px. No invented contact details or social links. | Approved closing copy/destination, footer introduction, destinations, contact/legal/copyright details and any real social profiles; user visual approval. |

## Initial review verification

- Read project status, handoff, decisions, stage requirements and design/content/architecture/accessibility/security documents; inspected current homepage, shared layout and global styles.
- Visually compared reference screenshots 07 and 08. Preserved dark media treatment, static white cards and editorial character; did not treat reference photographs or annotation text as supplied assets/content. No dedicated footer screenshot is supplied.
- `PATH=/private/tmp/node-v24.21.0-darwin-arm64/bin:$PATH ASTRO_TELEMETRY_DISABLED=1 npm run check`: 0 errors, 0 warnings, 0 hints.
- `PATH=/private/tmp/node-v24.21.0-darwin-arm64/bin:$PATH ASTRO_TELEMETRY_DISABLED=1 npm run build`: successful static output for `/` and `/style-guide`.
- Refreshed Chrome preview at `http://127.0.0.1:4325/`. Exact viewport fields worked using field paste; the earlier Stage 11 device-toolbar limitation was resolved for this review.
- At 320, 768, 1024 and 1280 CSS px, `document.documentElement.scrollWidth` equalled `innerWidth`. No nonzero-width descendants in the reviewed media, stories, CTA or footer layouts had scroll width more than 1 px greater than client width.
- Computed grids confirmed single-column reviewed layouts at 320 px, two-column media/stories/CTA and four-column footer at 768 px and above. Visually inspected all reviewed treatments at 320 and 768 px, the end-of-page layout at 1024 px, and media/stories at 1280 px.
- Native Chrome page zoom confirmed 200%. Visually inspected transcript text, testimonial cards, case-study media, final CTA and the full stacked footer without visible horizontal clipping; restored 100% afterward. This is separate from device-preview fit scaling.
- Chrome accessibility tree and source confirm Who We Are → media/caption/transcript → testimonials → case studies → closing CTA → footer reading order; named image placeholders; h2 sections and h3 subsections; labelled footer navigation and contact section. The reviewed areas contain no focusable pending actions.
- Source inspection found no scripts, carousel, media embed, form or tracking in these sections. Existing navigation enhancement remains the only interactive site feature.

## Limits and assumptions

Missing final content/assets and unbuilt destination routes remain documented staged dependencies; they are not evidence of invented content or broken pending footer actions. Recheck density, image crops and text wrapping with real content. The Stage 9 poster-rendering gap is distinct from the missing poster asset.

This review did not run cross-browser, screen-reader, automated accessibility, full keyboard-navigation, performance or privacy/network audits. Full accessibility work remains Stage 15. The initial passing checks did not resolve the findings; the correction follow-up did.

No Git repository is present, so historical diff review was unavailable. SHA-256 checks before and after the review confirm homepage, shared layout, global CSS and navigation source remained unchanged. No commit or durable architecture/design decision was made; DECISIONS.md is unchanged.

Initial review changed files: `docs/REVIEW_STAGES_9_11.md`, `docs/STATUS.md`, `docs/HANDOFF.md`.

## Correction follow-up — 2026-09-29

Authorisation: the user requested “fix those”, referring to R9-01 and R9-02. Only these Stage 9 corrections were implemented.

- **R9-01 resolved:** `src/data/who-media.ts` provides an optional typed poster record with `src`, `alt`, `width` and `height`. `src/pages/index.astro` renders a responsive image when configured and retains the original named placeholder when absent. Intrinsic dimensions and an explicit aspect ratio reserve image space; lazy loading and async decoding add no client-side JavaScript. The final record is empty because no approved poster is supplied.
- **R9-02 resolved:** the figure now contains only the media/image and a final `figcaption`. The transcript is the following sibling inside the existing grid wrapper. Media → caption → transcript order and the placeholder composition are preserved.
- Temporary 1600 × 900 local SVG fixture exercised the poster branch in the production build. Chrome confirmed a loaded image, the configured accessible name and preserved proportions: 288 × 162 rendered pixels at a 320 CSS px viewport; approximately 598 × 337 at 1280 CSS px.
- At 320 and 1280 CSS px, both fallback and poster states had page scroll width equal to viewport width and no Who We Are descendants overflowed their client width by more than 1 px. Visual inspection confirmed readable caption/transcript and narrow stacking/wide split layout.
- DOM checks in both states confirmed `FIGCAPTION` is the figure's last element child and the transcript's parent is the outer `who-media` wrapper. Chrome accessibility-tree inspection exposed the supplied test alt text and retained caption/transcript order.
- Chrome initially flagged a lazy-image sizing advisory despite intrinsic dimensions. Explicit aspect-ratio styling cleared it; the fixture build then reported no DevTools issues. This is a targeted check, not a full performance audit.
- Removed the temporary poster configuration and SVG from source/public assets; rebuilt and refreshed Chrome to confirm the final named fallback is restored with no poster. The fixture is also absent from `dist`.
- Final `npm run check`: 0 errors, 0 warnings, 0 hints. Final `npm run build`: successful static homepage and style-guide output.
- Source diff is confined to the new poster-data import, Who We Are media markup and two local media CSS rules. SHA-256 checks confirm shared layout, global CSS, navigation, package manifest and lockfile remain unchanged. No dependency, player, script, invented asset or later stage was added.

Correction changed files: `src/data/who-media.ts`, `src/pages/index.astro`, `docs/REVIEW_STAGES_9_11.md`, `docs/STATUS.md`, `docs/HANDOFF.md`. No new durable architecture/design decision; DECISIONS.md is unchanged. No Git repository or commit.

Stop here for user review. Stage 12 still requires explicit authorisation.
