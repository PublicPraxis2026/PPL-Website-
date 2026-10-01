# Approval-Gated Implementation Plan

Only the explicitly authorised stage may be implemented.

---

## Stage 0 — Project memory, scope and guardrails

Deliver:

- `AGENTS.md`
- project documentation
- decision log
- status/handoff mechanism
- design-reference directory
- supplied screenshots stored where possible

NO website implementation.

Approval gate:
User confirms scope and working process.

---

## Stage 1 — Project scaffold and architecture

Deliver:

- Astro project
- TypeScript strict mode
- minimal dependency set
- sensible source structure
- initial global stylesheet
- empty/base layout
- basic header/footer shell
- placeholder routes where appropriate
- initial package scripts
- Astro configuration
- README development instructions

Do not perform detailed visual implementation.

Checks:

- dependency installation
- Astro check
- production build

Approval gate:
Architecture/dependencies/file structure.

---

## Stage 2 — Design system

Implement foundational visual language only.

Deliver:

- final colour tokens
- typography
- spacing scale
- radius tokens
- container widths
- link styling
- buttons
- focus styling
- section/container primitives
- card primitives where justified
- responsive image primitive if appropriate
- self-hosted font configuration
- reduced-motion baseline
- temporary `/style-guide` route

Approval gate:
Visual vocabulary before it propagates through the site.

---

## Stage 3 — Header and navigation

Desktop navigation:

- About
- Services
- Insights
- Work with us
- Contact

Services submenu:

- Corporate
- Non-corporate
- Case studies

Insights submenu:

- Reports & briefings
- Practical guides
- Podcast
- Journal

Mobile:

- accessible menu button
- robust expandable navigation
- keyboard support
- correct focus behaviour
- Escape support where appropriate
- no hover-only interaction

No Members item.

Approval gate:
Desktop/mobile navigation and accessibility.

---

## Stage 4 — Homepage structural skeleton

Create the homepage layout without detailed visual polish.

Sections:

1. Hero
2. About
3. Our Approach
4. Hybrid Model
5. Capability/editorial section
6. Who We Are
7. Testimonials / Case Studies
8. Final CTA

Focus on:

- section order
- widths
- page rhythm
- dark/light alternation
- rough media placement
- responsive stacking

Approval gate:
Overall page composition.

---

## Stage 5 — Hero

Implement closely from client direction.

Required headline:

Better Decisions.
Better Systems.
Better Futures.

Include:

- introductory text
- Corporate Services CTA
- Non-Corporate Services CTA
- dark editorial panel
- prominent photography

Desktop:
strong split composition.

Mobile:
clean stacked composition.

Approval gate:
Hero visual design.

---

## Stage 6 — About and Our Approach

### About

Implement:

- dark section
- prominent heading
- asymmetric/overlapping image treatment
- concise content
- CTA

### Our Approach

Implement:

- light section
- strong heading
- dark content card
- editorial photograph
- two core principles
- CTA where appropriate

Approval gate:
Composition and responsive behaviour.

---

## Stage 7 — Hybrid Model

Represent:

- Think Tank
- Consultancy
- Strategy Lab

Do not simply recreate Canva chevrons.

Develop one strong responsive web-native treatment.

Desktop:
may be horizontal.

Mobile:
stack vertically.

Approval gate:
Clarity and visual treatment.

---

## Stage 8 — Capability/editorial composition

Implement detailed content areas for:

- Think Tank
- Consultancy
- Strategy Lab

Use the client references for:

- navy blocks
- white cards
- asymmetrical placement
- offset/overlapping photography
- generous whitespace

Desktop overlap is acceptable.

Tablet/mobile must simplify.

Avoid fragile arbitrary positioning.

Approval gate:
Editorial composition.

---

## Stage 9 — Who We Are

Implement media-oriented section.

Until final media exists:

- accessible placeholder
- responsive media container
- poster support
- future caption/transcript structure

No autoplay with sound.

Approval gate:
Media treatment.

---

## Stage 10 — Testimonials and Case Studies

Implement static responsive content.

Do not create an auto-rotating carousel.

Potential components:

- QuoteCard
- CaseStudyPreview

Do not fabricate real testimonials.

CTA:

Explore our case studies

Approval gate:
Card treatment/content density.

---

## Stage 11 — Final CTA and Footer

Implement:

- final CTA
- footer navigation
- contact placeholders
- Privacy
- Accessibility
- copyright
- real social links only if supplied

Approval gate:
End-of-page experience.

---

## Stage 12 — Secondary page system

Implement ONE representative secondary page first, preferably `/about`.

Create reusable editorial patterns for:

- page heading/hero
- introduction
- rich text
- images
- sections
- callouts
- CTA

Do not build all secondary pages yet.

Approval gate:
Secondary-page design system.

---

## Stage 13 — Remaining secondary pages

Implement approved routes:

- `/services`
- `/services/corporate`
- `/services/non-corporate`
- `/services/case-studies`
- `/insights`
- `/insights/reports`
- `/insights/guides`
- `/insights/podcast`
- `/insights/journal`
- `/work-with-us`
- `/contact`
- `/privacy`
- `/accessibility`

No `/members`.

Approval gate:
Route coverage and consistency.

---

## Stage 14 — Content architecture

Move editable content into an appropriate file-based content model.

Consider Astro Content Collections where useful.

Possible collections:

- pages
- insights
- case studies

Define schemas only for real requirements.

Goal:
content editing should not require editing complex layout code.

Approval gate:
Editing workflow/content architecture.

---

## Stage 15 — Responsive and accessibility pass

Deliberately inspect approximately:

- 320px
- 375px
- 430px
- 768px
- 1024px
- 1280px+

Test:

- keyboard-only navigation
- visible focus
- 200% zoom
- heading order
- landmarks
- contrast
- touch targets
- menu semantics
- alt text
- reduced motion
- horizontal overflow
- DOM order
- text line lengths

Run suitable automated accessibility checks.

Produce findings and fixes.

Approval gate:
Accessibility/responsive behaviour.

---

## Stage 16 — Performance pass

Measure rather than merely claim optimisation.

Review:

- image formats
- responsive image sizing
- `srcset`
- dimensions/aspect ratios
- lazy loading
- fonts
- JS payload
- CSS payload
- layout shift
- render-blocking resources

Aim for essentially zero client-side JS except necessary interaction.

Run Lighthouse or equivalent where practical.

Approval gate:
Measured performance.

---

## Stage 17 — SEO and metadata

Implement:

- page-specific titles
- descriptions
- canonical support
- Open Graph metadata
- favicon
- sitemap
- robots.txt

Do not invent structured data unsupported by actual organisation/content facts.

Approval gate:
Metadata/search presentation.

---

## Stage 18 — Privacy and security

Review actual outgoing requests and dependencies.

Target:

- third-party tracking requests: 0
- cookies: 0
- analytics: 0
- user data collection: 0

Implement/document suitable production headers:

- Content-Security-Policy
- Referrer-Policy
- X-Content-Type-Options
- Permissions-Policy
- frame restrictions

Approval gate:
Privacy/security configuration.

---

## Stage 19 — CI/CD

Configure appropriate GitHub Actions.

PR checks should include, where configured:

- deterministic install
- formatting
- lint
- Astro/type check
- production build
- accessibility smoke test

Deployment target:

Cloudflare Pages.

Preferred conceptual flow:

feature/change
→ PR
→ CI
→ review
→ merge to main
→ deployment

Approval gate:
Pipeline works as documented.

---

## Stage 20 — Documentation and handoff

Complete maintainership documentation covering:

- prerequisites
- local development
- commands
- project structure
- content editing
- adding pages
- adding Insights
- adding Case Studies
- replacing images
- expected image dimensions
- design tokens
- accessibility conventions
- deployment
- security headers
- future CMS path

Explicitly document non-goals:

- authentication
- members area
- database
- forms
- analytics
- tracking

Approval gate:
A new maintainer can operate the project.

---

## Stage 21 — Final acceptance

Do not redesign anything.

Verify approved implementation against:

- design
- responsive behaviour
- keyboard usage
- accessibility findings
- clean build
- JS budget
- route correctness
- sitemap
- metadata
- privacy expectations
- security headers
- documentation

Produce final acceptance checklist.

Stop for final sign-off.
