# Combined implementation review — Stages 1–18

Reviewed: 2026-09-29

## Result and scope

Reviewed the current implementation, generated output, project requirements and previous review reports across all implemented stages. The site builds cleanly and retains the agreed static architecture and placeholder policy. One confirmed implementation defect and two verification/documentation findings remain below. This is not final acceptance or a new visual approval.

This session is review-only. No application code, content, dependency, configuration or public asset was changed. No Stage 19–21 work was started. Earlier visual checks in `REVIEW_STAGES_5_8.md` and `REVIEW_STAGES_9_11.md` are historical evidence, not fresh checks of today's whole site.

## Findings

### R18-01 — P2: Active-page navigation fails on secondary routes

Location: `src/components/navigation/SiteHeader.astro:6–7` and its current-page CSS selector.

`isCurrent` compares the generated pathname directly with slashless strings such as `/about`. The static build supplies `/about/`, so the comparison fails. Fresh inspection of generated HTML confirms that all twelve secondary routes represented in primary navigation have no `aria-current="page"`; only the homepage home link receives it. This prevents the new current-page announcement and top-level visual indicator from working on secondary pages.

Normalize trailing slashes on both sides while preserving `/`, and verify the emitted current link on every header destination. Also provide the intended visible active styling for submenu links: the existing current-page CSS selector only covers direct top-level anchors. The links themselves resolve correctly; this finding concerns page-location feedback, not route availability.

Status: open; no implementation fix made during this review.

### R18-02 — P2: Stage 15 completion is not supported by its verification

Location at review start: `docs/STATUS.md:7,17–18,26`; requirements: `docs/IMPLEMENTATION_PLAN.md`, Stage 15.

The incoming status marked Stages 15–18 complete while deferring rendered responsive inspection, keyboard interaction, zoom/reflow and browser accessibility testing. Static markup checks do not establish those behaviours. Earlier targeted homepage reviews also do not cover the later secondary-page system and navigation changes.

The isolated browser attempt failed with `Browser is not available: iab`, and browser-provider discovery returned an empty list in this session. Consequently no fresh rendered check, keyboard interaction, 200% zoom test, axe, screen-reader, cross-browser or Lighthouse run was possible. This is an evidence gap, not a demonstrated rendering or WCAG failure.

Keep Stage 15 verification open until the specified widths (320, 375, 430, 768, 1024 and 1280+ CSS px), keyboard/focus/menu behaviour, 200% zoom/reflow, contrast, touch targets and suitable automated accessibility checks have been exercised in a working browser. Include JavaScript-disabled navigation and representative secondary pages. Local or private-preview testing can complete this before public deployment; only real Cloudflare response-header verification needs that environment.

Status: completion wording corrected in STATUS/HANDOFF; browser verification remains open.

### R18-03 — P3: README describes the obsolete Stage 2 implementation

Location: `README.md:3,29–38`.

The README says full navigation and detailed page layouts belong to later stages, omits the content collection and secondary-page template, and claims the build has no client-side JavaScript. The current build has sixteen HTML routes and a 1,179-byte inline navigation module. These statements can mislead a maintainer about where content lives and which interactions need testing.

Correct the current-state summary and structure when this finding is addressed. This narrow correction does not require beginning the full Stage 20 documentation programme.

Status: open; README unchanged during this review.

## Stage coverage

| Stages | Current assessment |
| --- | --- |
| 0–1: guardrails and scaffold | Required project documents, strict TypeScript, static Astro configuration, exact direct versions and lockfile exist. Local installed direct versions match the manifest. Check/build pass. No Git repository exists, so historical diff and approval-sequence verification were unavailable. |
| 2: design system | Self-hosted Manrope, documented colours, reusable primitives, focus rules and reduced-motion rules remain present. Style guide is now non-indexable. Fresh rendered visual/contrast verification remains open. |
| 3: navigation | Required header destinations and native disclosure structure exist; source includes mobile enhancement, Escape/focus return and no-JavaScript fallback. All link destinations exist. R18-01 affects active-page feedback; fresh interaction verification remains open. |
| 4–8: homepage and compositions | Required section and DOM order, exact hero headline, three Hybrid Model areas and responsive Grid treatments remain in source. Assessed against written design direction; this session did not repeat screenshot comparisons or browser rendering. |
| 9–11: media, stories, CTA and footer | Optional typed poster branch remains available. Figure caption is last within its figure and transcript follows it. Testimonials remain static placeholders; footer routes resolve. Earlier Stage 9 corrections remain in source. Actual poster/video content is absent and was not re-fixtured in this review. |
| 12–14: secondary pages and content | Fourteen Markdown pages share a typed collection and editorial template, yielding all approved routes without `/members`. Secondary copy is separate from layout. Homepage/footer copy remains in Astro; the collection decision D011 covers secondary pages. No speculative publication or case-study models were introduced. |
| 15: responsive/accessibility | Static structural checks pass, with R18-01 and R18-02 outstanding. Full behaviour and accessibility acceptance remain open. |
| 16: performance | Build assets are measured below. No production raster/media assets exist yet. Browser rendering metrics, layout shift and final-asset performance remain unmeasured. |
| 17: metadata | Page titles/descriptions, Open Graph/Twitter metadata, favicon and conditional canonical/sitemap/robots output are present. Both default and configured-origin cases pass checks. Real origin and final metadata/content remain pending. |
| 18: privacy/security | Source/build inspection finds local assets, no forms, embeds, analytics or tracking code. Header file is copied to output. Actual requests, cookies and applied Cloudflare response headers were not observed live; no current vulnerability-database audit was performed. |

## Fresh checks

- Node 24 `npm run check`: zero errors, warnings and hints across twelve checked files.
- Node 24 `npm run build`: success; sixteen HTML routes plus static robots and sitemap endpoints.
- Local `npm ls --depth=0`: Astro 7.3.5, `@astrojs/check` 0.9.10, TypeScript 6.0.2, with no reported direct dependency mismatch. No clean reinstall was performed.
- Standard-library HTML parser checks on all sixteen generated pages: one main and h1, no skipped heading levels, unique IDs, skip-link target, image/placeholder names, named anchors, valid figure-caption placement, nonempty description/Open Graph title/description. No missing internal link/fragment or local asset target; no form/iframe elements. These are bounded static checks, not axe or a full HTML/WCAG validator.
- Active-page assertion failed on all twelve secondary header destinations, establishing R18-01.
- Build with temporary command-scoped `SITE_URL=https://example.invalid`: all sixteen canonical and Open Graph URLs match generated paths; sitemap contains exactly fifteen public routes; style guide is excluded and has `noindex, nofollow`; robots points to that sitemap.
- Normal build restored afterward: no example origin remains in generated HTML; default sitemap intentionally contains no locations. Production requires the confirmed `SITE_URL` and a rebuild.
- `dist/_headers` is byte-identical to `public/_headers`. This verifies copying, not deployment enforcement.
- Uncompressed output: 29,132 B CSS, 164,700 B font, 19,795 B homepage HTML. The homepage has one 1,179 B inline module and no external JavaScript files. Inline script bytes are already included in the HTML total.
- SHA-256 comparison confirms source, public assets, package manifest/lockfile, Astro config and TypeScript config were unchanged during the review.

## Known completion items and limits

Final copy, imagery, service claims, people information, testimonials, case-study evidence, publications, contact/legal/copyright details, social profiles and final CTA decisions remain pending. The homepage's non-interactive CTA placeholders were already documented as pending; route existence alone was not treated as authority to activate them. Review their destinations when completing content.

Visual design cannot receive fresh acceptance from this source review. Final content lengths and real images will need another density, wrapping, crop, alternative-text, performance and CSP review. Privacy/accessibility pages remain clearly labelled placeholders. No live deployment or external data transmission was performed.

## Changed files and boundary

- `docs/REVIEW_STAGES_1_18.md`
- `docs/STATUS.md`
- `docs/HANDOFF.md`

No durable architecture/design decision changed; `docs/DECISIONS.md` remains unchanged. No commit was made. Await user review of these findings. Stage 19 and later stages require explicit authorisation.
