# Independent second-pass review — Stages 1–18

Reviewed: 2026-09-30. Read-only review; no source, config or other docs changed. Stage 19+ not touched. `docs/REVIEW_STAGES_1_18.md` was treated as a prior opinion to verify.

## Summary verdict

The tree I reviewed is in better shape than the prior review and STATUS/HANDOFF describe: R18-01 and R18-03 did not reproduce, because both files were modified after those documents were written. No P1 or P2 defect was found in routing, collections, metadata/canonical/sitemap/robots logic, security headers, or the header script. The remaining issues are P3 and mostly about docs drift, deployment hygiene and CSP tightness. R18-02 (no browser verification) stands, and I could not close it either. Keyboard, rendered, zoom and axe behaviour are unverified in this review.

## Verification of R18-01 / R18-02 / R18-03

**R18-01 — not reproduced (already fixed in the current source).**
- [SiteHeader.astro:7-8](../src/components/navigation/SiteHeader.astro#L7-L8) now defines `normalizePath` (strips trailing slashes, keeps `/`) and applies it to both sides of `isCurrent`.
- [SiteHeader.astro:133](../src/components/navigation/SiteHeader.astro#L133) styles `.nav-sublist a[aria-current="page"]` as well as top-level anchors, so the submenu-styling half of the finding is also fixed.
- Fresh `dist/` output: each of the twelve header destinations (about, services, services/corporate, services/non-corporate, services/case-studies, insights, insights/reports, insights/guides, insights/podcast, insights/journal, work-with-us, contact) contains exactly one `aria-current="page"`, on its own link. The homepage marks only the site-name link. `/privacy`, `/accessibility` and `/style-guide` have none, which is correct because they are not header destinations.
- The prior review's account was likely accurate when written. `SiteHeader.astro` has mtime 2026-09-30 10:10, whereas STATUS, HANDOFF and the review were written 2026-09-29 14:48. See R2-01 for the resulting docs drift.
- Not verified: the visible rendering of the current-page underline, since there is no browser.

**R18-02 — confirmed, still open.**
- This session did not exercise a browser. No browser tooling was available to me or attempted, so nothing here supplies rendered, keyboard, 200% zoom, axe, screen-reader or no-JS evidence. STATUS.md:15 still correctly discloses this.
- Source-level checks I did make: the JS breakpoint in [SiteHeader.astro:60](../src/components/navigation/SiteHeader.astro#L60) (61.99rem) matches the CSS breakpoints at lines 137 and 148. Touch-target minimums are 3rem (top-level) and 2.75rem (submenu). Footer links are about 22px tall but spaced 8px apart, which I calculate satisfies WCAG 2.5.8's spacing exception. Focus styling is a 3px white outline plus a 6px `#b74118` ring ([global.css:78-82](../src/styles/global.css#L78-L82)). I computed the ring at 5.55:1 on white. On navy it is only 2.64:1, but the white outline supplies contrast there. Placeholder text/background token pairs I computed all exceed 5:1. None of this replaces a browser check.

**R18-03 — not reproduced against the current README.**
- [README.md:3](../README.md#L3) says Stages 1–18 are implemented. The structure list names the content collection, the editorial component and the sixteen routes.
- [README.md:38](../README.md#L38) accurately describes the single small inline navigation module and drops the "no client-side JavaScript" claim. The README mtime (2026-09-29 15:37) is after the review docs, so it was probably corrected after the review.
- Only trivial residue: [README.md:47](../README.md#L47) ends with "No commits or Git initialisation were part of Stage 1", which is still true but stale in tone. It is not worth a finding.

## New findings (most severe first)

### R2-01 — P3 — Status/handoff/review docs are stale relative to the source
- Location: [STATUS.md:15-18](STATUS.md), [HANDOFF.md:14-20,26](HANDOFF.md), [REVIEW_STAGES_1_18.md](REVIEW_STAGES_1_18.md) findings R18-01 and R18-03.
- Problem: these documents present R18-01 and R18-03 as open and assert "SHA-256 comparison confirms source/public/configuration files unchanged". `SiteHeader.astro`, `index.astro` (mtime 2026-09-30 10:07) and `README.md` have since changed. The docs record no session that made those changes. There is no Git history to reconstruct who did what.
- Failure scenario: the next agent follows HANDOFF and re-implements the trailing-slash fix on already-fixed code, or does not know that `index.astro` changed after the last reviewed state. AGENTS.md requires STATUS/HANDOFF to be current.
- Suggested fix: on the user's instruction, update STATUS/HANDOFF to close R18-01 and R18-03 with the evidence above. Record what changed in `index.astro` after the review baseline, since I could not tell from the tree.

### R2-02 — P3 — Internal links and canonical/sitemap URLs disagree on trailing slashes
- Location: nav hrefs [SiteHeader.astro:22-47](../src/components/navigation/SiteHeader.astro#L22-L47) and footer hrefs [BaseLayout.astro:55-75](../src/layouts/BaseLayout.astro#L55-L75) are slashless (`/about`). Canonical [BaseLayout.astro:12](../src/layouts/BaseLayout.astro#L12) comes from `Astro.url.pathname` and sitemap [sitemap.xml.ts:10](../src/pages/sitemap.xml.ts#L10) uses `/${id}/`. Both carry the trailing slash, as do the emitted directory routes. `astro.config.mjs` sets no `trailingSlash`.
- Problem: every internal link points at a non-canonical variant of its target. Canonical and sitemap are internally consistent with each other, so this is not a metadata bug.
- Failure scenario (unconfirmed, needs live Cloudflare Pages): I expect Pages to redirect `/about` to `/about/`, adding a redirect hop to each navigation. Link and canonical signals also disagree.
- Suggested fix: set `trailingSlash: 'always'` in the Astro config and use slash-terminated hrefs, keeping `normalizePath` for comparison. Alternatively, keep slashless links and deliberately document the redirect. Check the behaviour on a real Pages preview.

### R2-03 — P3 — Mobile navigation flashes open before the script collapses it
- Location: [SiteHeader.astro:54](../src/components/navigation/SiteHeader.astro#L54) adds `.has-js` at script run time. The collapsing rules at [lines 134-135](../src/components/navigation/SiteHeader.astro#L134-L135) depend on it. Built output has the script as `<script type="module">` (16 pages, one each).
- Problem: module scripts are deferred, so the first paint on narrow viewports shows the fully expanded nav (no-JS fallback). It then collapses when `has-js` is set.
- Failure scenario: on a phone, the page loads with the tall nav visible and content pushed down. The nav then collapses and content jumps. This is a layout shift on every page view and a possible CLS hit.
- Suggested fix, described only: set `has-js` from a tiny classic inline script in `<head>`, or hide the nav with CSS and reveal it under `noscript`. This must stay consistent with D010's no-JS fallback requirement. Confirm in a browser before and after. I did not observe the flash and infer it from load order, so it is unconfirmed as a visible effect.

### R2-04 — P3 — Internal `/style-guide` page ships to the production output
- Location: [style-guide.astro:6-10](../src/pages/style-guide.astro#L6-L10). It is in `dist/style-guide/index.html` and is not blocked in [robots.txt.ts](../src/pages/robots.txt.ts).
- Problem: the page is `noindex` and excluded from the sitemap (correct). But it is publicly reachable and displays "Stage 2 · temporary review route" copy. The plan describes the route as temporary ([IMPLEMENTATION_PLAN.md:73](IMPLEMENTATION_PLAN.md)) without a stage at which it is removed or gated.
- Failure scenario: the production site launches with a working, publicly reachable internal design-review page containing unfinished-project wording.
- Suggested fix: decide when to drop it. Options are to exclude it from production builds, delete it after Stage 2 approval, or record an explicit decision to keep it. This falls in Stage 19–21 scope, so it is a flag only.

### R2-05 — P3 — CSP is looser than the built site requires
- Location: [_headers:2](../public/_headers#L2).
- Problem: `img-src ... data:` is unused. I found no `data:` in the built HTML or the two CSS files. `media-src`, `manifest-src` and `worker-src` are redundant with `default-src 'self'` and reference nothing that exists. SECURITY.md says the CSP "must reflect actual site requirements rather than being cargo-culted".
- Not a defect: `script-src 'unsafe-inline'` is a documented compromise (D012) for the 1.2 kB inline module. `style-src 'unsafe-inline'` is justified because secondary pages emit one inline `<style>`; I confirmed one in `dist/about/index.html`. All external requests are absent: the only URLs in src/dist/public are the licence text, the SVG and sitemap namespaces, and a licence link.
- Failure scenario: `data:` image sources would be accepted if some future markup or Markdown introduced one, without anyone deciding to allow it.
- Suggested fix: drop `data:` from `img-src` unless a real need appears. Optionally replace `'unsafe-inline'` for scripts with a hash; that would mean regenerating it per build, so weigh the maintenance cost.

## Checked and found sound (no finding)

- `pages` collection, catch-all route, sitemap and robots logic. Canonical, `og:url` and sitemap are all conditional on `SITE_URL`. No invented origin. Robots adds the `Sitemap:` directive only when `SITE_URL` is set.
- Skip link, `lang="en-GB"`, landmarks (banner, primary and footer nav, main, contentinfo), and one h1 per page. The homepage h1's block spans form one heading. Markdown content starts at h2.
- Heading order on the homepage is h1, h2, then h3 nested under h2. Editorial callout and CTA headings have unique IDs per page.
- No raw HTML in the Markdown files, so unsafe HTML rendering is not currently a risk. No cookies, storage, analytics, forms, embeds or third-party requests in `src/`. JavaScript is limited to the one inline nav module.
- Placeholders remain visibly labelled. No invented organisation or service claims. Privacy and accessibility pages state no conformance or legal claims. No Canva or browser-chrome annotations were reproduced in the UI.
- `prefers-reduced-motion` baseline exists. There are no animations to suppress.

## Checks run and results

- `npm run check` (Node 24.21.0): 12 files, 0 errors, 0 warnings, 0 hints.
- `npm run build`: success, 16 pages plus robots and sitemap. This regenerated `dist/`, whose output equals the prior state apart from the current-page markup. `dist/_headers` is byte-identical to `public/_headers`.
- Static inspection of built HTML: `aria-current` per header destination (twelve of twelve), inline script/style inventory, `data:` and external-URL search, hex colour contrast calculation for token pairs.
- Not run and not claimed: any browser rendering, keyboard/focus/menu interaction, no-JS test, 200% zoom or reflow, axe or Lighthouse, screen-reader test, cross-browser check, live Cloudflare headers or redirects, or a `SITE_URL` build. I did not repeat the prior review's example-origin build; I read the conditional logic only.
