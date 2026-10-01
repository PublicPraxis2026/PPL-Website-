# Accessibility Requirements

Target: WCAG 2.2 AA.

## Baseline requirements

- semantic document structure
- correct landmark elements
- logical heading hierarchy
- keyboard operability
- visible focus indicators
- skip-to-content link
- sufficient colour contrast
- meaningful alt text
- empty alt text for appropriate decorative images
- usable at 200% zoom
- sensible text reflow
- no horizontal overflow at supported widths
- accessible mobile navigation
- interactions cannot depend solely on hover
- interaction meaning cannot depend solely on colour
- reasonable touch target sizes
- `prefers-reduced-motion`
- logical DOM order regardless of visual composition

## Media

If video is introduced:

- no autoplay with sound
- captions where speech exists
- transcript support where appropriate
- accessible controls

## Carousels

Avoid carousels unless there is a strong requirement.

Testimonials should initially use a static responsive layout.

## Testing

Automated tooling is supplementary.

The accessibility stage must also manually inspect:

- keyboard navigation
- focus order
- focus visibility
- zoom/reflow
- heading hierarchy
- labels/accessible names
- menu behaviour
