# Design Direction

## Reference

Location of the eight supplied reference PNGs (visually reviewed during Stage 2):

`docs/design-reference/screenshots/`

They originate from a Canva website concept.

They are visual inspiration and should be treated as a strong expression of client preference.

They are NOT a requirement for pixel-perfect reproduction.

## Overall visual language

- very dark navy
- white/off-white
- restrained slate/grey
- large bold sans-serif headings
- clean sans-serif body text
- generous whitespace
- rounded rectangles
- editorial photography showing people working/interacting
- alternating dark and light sections
- asymmetric image/card compositions
- restrained ornamentation

Final Stage 2 navy and supporting colours:

```css
#0b2b40 /* primary navy */
#082235 /* deep navy */
#486171 /* slate */
#152d3c /* ink */
#f4f7f8 /* soft white */
#ffffff /* white */

```

Final values should be established during the design-system stage.

## Typography direction

Stage 2 uses Manrope throughout, self-hosted from `public/fonts/`, with Arial and sans-serif fallbacks. A single variable font keeps the type system and asset count small. No external font request is made at runtime.

## Important interpretation

The Canva concept contains some red text that represents design annotations such as links.
Do not treat annotation text as visible website UI.
Likewise, browser chrome visible in screenshots is not part of the website.

## Homepage visual direction


### Hero

Preserve strongly:

- dark content block left
- editorial image right
- strong headline

Headline:
Better Decisions.
Better Systems.
Better Futures.
Provide two clear service routes:

- Corporate Services
- Non-Corporate Services

### About

Preserve:

- dark section
- large heading
- asymmetric/overlapping photography
- concise content
- clear CTA

### Our Approach

Preserve:

- light background
- prominent heading
- dark content card
- large editorial photograph
- two core principles

### Hybrid Model

Communicate:

- Think Tank
- Consultancy
- Strategy Lab

Do not blindly reproduce the large Canva chevrons.
Create a responsive web-native visual relationship.

### Capability/editorial sections

Preserve the character of:

- large navy blocks
- white cards
- offset photographs
- overlapping compositions
- large whitespace

Desktop may use overlap.
Tablet/mobile should simplify rather than forcing desktop geometry.

### Who We Are

A dark media-oriented section exists in the concept.
Until final video/media is supplied:

- provide a robust media placeholder when this stage is authorised
- do not invent media
- no autoplay with sound

### Testimonials / Case Studies

Use static accessible layouts.
Do not implement an auto-rotating carousel.

## Navigation

Do not reproduce the Canva navigation literally.
Approved initial navigation architecture:

- About
- Services
- Insights
- Work with us
- Contact

Services:

- Corporate
- Non-corporate
- Case studies

Insights:

- Reports & briefings
- Practical guides
- Podcast
- Journal

No Members navigation item.

## Responsive philosophy

Avoid preserving Canva coordinates.
Maintain:

- hierarchy
- visual balance
- colour
- editorial character
- composition intent

Allow layouts to transform substantially where necessary for small screens.
DOM order must remain logical.

## Reference verification

The direction above comes from the written brief and visual inspection of all eight supplied images. See [reference inventory](design-reference/README.md). Stage 2 implements the palette, type and visual primitives at `/style-guide`; it does not implement the pictured page compositions.
