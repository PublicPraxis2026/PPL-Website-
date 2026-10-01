# Public Praxis Lab Website

## Purpose

Create the first production-quality website for Public Praxis Lab.

Public Praxis Lab presents itself as a hybrid:

- think tank
- consultancy
- strategy lab

The site should communicate that proposition clearly while remaining accessible, fast, maintainable and deliberately simple technically.

## Character

The site should feel:

- serious without being institutional
- contemporary without resembling a generic SaaS landing page
- people-centred
- editorial
- confident
- spacious
- professional
- visually distinctive without unnecessary ornamentation

## Technical scope

- Astro
- TypeScript
- static generation
- plain/scoped CSS
- minimal client-side JavaScript
- Cloudflare Pages deployment target

## Explicit MVP non-goals

The following are OUT OF SCOPE unless the user later changes the requirements:

- database
- authentication
- login
- members area
- CMS/admin area
- contact form
- newsletter signup
- analytics
- tracking
- cookies
- personalised content
- user accounts
- ecommerce
- server-side application functionality

The previous concept of a Members Area has deliberately been removed from the MVP because it would introduce authentication/database requirements outside the agreed scope.

## Accessibility

Target:

WCAG 2.2 AA.

Accessibility is part of the design and implementation process rather than a final patch.

## Deployment

Target hosting:

Cloudflare Pages.

Repository-driven deployment is preferred.

## Content editing

Initial content should be file-based.

Markdown/Astro Content Collections should be used where they improve maintainability.

The architecture should make a lightweight CMS possible later without requiring one now.
