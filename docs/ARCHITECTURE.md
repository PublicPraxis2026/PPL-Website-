# Architecture

## Intended stack

- Astro
- TypeScript
- static output
- CSS / scoped Astro styles
- minimal JavaScript

## Principles

The website is a collection of content documents and reusable presentation components, not a web application.

Prefer:

- semantic HTML
- Astro components
- CSS
- native browser behaviour
- progressive enhancement

Avoid:

- frontend SPA frameworks
- state-management libraries
- heavyweight component libraries
- animation libraries
- runtime APIs where static content suffices
- premature abstraction

## Expected broad source structure

```text
src/
├── assets/
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── sections/
│   └── ui/
├── content/
├── data/
├── layouts/
├── pages/
└── styles/
```

This is a direction, not permission to scaffold it before the relevant implementation stage.

## Likely reusable primitives

Potential components include:

- Container
- Section
- SectionHeading
- Button
- ContentCard
- ImageCard
- ResponsiveImage
- QuoteCard
- SiteHeader
- SiteFooter

Do not create abstractions merely because they appear on this list.
Implement abstractions when real repetition justifies them.

## Client-side JavaScript

Aim for effectively zero client-side JS except where behaviour genuinely requires it, such as responsive navigation.
No framework hydration merely for convenience.

## Content

Long-form/editable content should not be buried inside complex layout components.
Use file-based content structures and Astro Content Collections where appropriate.

## Dependencies

Prefer Astro, CSS and native browser capabilities. Assess whether a dependency is necessary, adds client JavaScript, and materially improves maintainability. Do not add React, Vue, Svelte, Tailwind, Bootstrap, component libraries, animation libraries or state management without a specific approved reason.
