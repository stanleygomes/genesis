# Carousel

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.** One slide at a time, moved only by the user. Slides are usually [image cards](image-card.md).

## When
- A few (`3–8`) items of the same kind where only one needs to be seen at once: photos of a listing, steps of a tour.
- Not for important content (half the users never see slide 2) and not for long lists: that is a grid.

## Visual
| Property | Value |
| --- | --- |
| Element | `<section>` with `aria-roledescription="carousel"` + `aria-label`; each slide `role="group"` `aria-roledescription="slide"` `aria-label="2 de 4"` |
| Viewport | bg `card`, `3px solid` `outline`, `radii-sm`, shadow `4px 4px 0`, `overflow: hidden` |
| Slide | full viewport width, media on top (`3px` bottom line) + caption padding `12px 16px` |
| Caption | Alegreya `17px`; meta Special Elite `13px` `text-soft` |
| Controls | below the viewport, gap `12px`: prev / next = `neutral` `small` icon buttons (`32px`), counter Special Elite `13px` `2 / 4` `tabular-nums` between them |
| Dots | optional, right side: `12px` squares, radius `3px`, `2px solid` `outline`, bg `card`; current bg `mustard`; hit area `24px` |

## Variants
- `default`: one slide per view, controls below.
- `peek`: slide `85%` wide with `12px` gap, the next slide's edge shows (hint that there is more); no dots.

## States
| State | What changes |
| --- | --- |
| first / last slide | prev (or next) is `disabled`; no wrap-around |
| slide change | the counter is the live region (`aria-live="polite"`) and announces `2 / 4` |
| hidden slides | `aria-hidden="true"` + `inert` (links inside are not reachable) |
| focus-visible | `3px` `teal` outline on the button or dot |

## Motion
| Event | Animation |
| --- | --- |
| next / prev / dot | track slides one width, `transform` `240ms` `steps(4)` |
| autoplay | never |
| `prefers-reduced-motion` | jumps at once |

## Behavior
- Buttons, dots and Left/Right arrow keys (while focus is inside the carousel); Home/End go to the first/last slide.
- Swipe on touch may move one slide; never hijacks vertical scroll.
- Dots are `<button>`s with `aria-label="Foto 3"` and `aria-current="true"` on the current one.

## Never
- Autoplay, infinite loop, fade crossfades, controls only on hover, controls painted over the photo, more than `8` slides.
