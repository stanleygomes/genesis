# Accordion

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.** Also covers the single **collapsible** (one disclosure on its own).

## When
- Long secondary content the reader scans by title: FAQ, settings groups, month-by-month details.
- `collapsible`: one block that hides optional detail ("ver detalhes", advanced filters).
- Not for content everyone needs (just show it) or for switching views of the same thing ([tabs](tabs.md)).

## Visual
| Property | Value |
| --- | --- |
| Element | heading (`h3`) wrapping a native `<button>` with `aria-expanded` + `aria-controls`; panel `role="region"` + `aria-labelledby` (skip the role with more than 6 items) |
| Frame | `3px solid` `outline`, radius `0` (it is layout), bg `card`; items split by `3px solid` `outline` |
| Header | full width, min height `52px`, padding `14px 16px`, Bevan `14px` uppercase `+0.06em`, color `text`, left aligned |
| Marker | `+` on the right, `14px`, two `3px` bars in `outline`; open hides the vertical bar (reads `−`) |
| Meta (optional) | Special Elite `13px` `text-soft`, right of the title before the marker (count, total) |
| Open header | bg `mustard` 18%, `3px` bottom line in `outline` 25% |
| Panel | Alegreya `17px/1.55`, padding `4px 16px 16px`, max `68ch` |
| `collapsible` | no frame: header is a `flat` neutral small [button](button.md) with the marker on the left; panel below with a `3px` `outline` left line, padding-left `16px` |

## Variants
- `single`: opening one closes the others (FAQ). Default.
- `multi`: any number open (settings, details).
- `collapsible`: one header + one panel, no frame.

## States
| State | What changes |
| --- | --- |
| hover | header bg `outline` 8% (open: stays `mustard` 18% + `outline` 8%) |
| focus-visible | `3px` `teal` outline, `-6px` offset (inside the frame) |
| open | marker reads `−`, header bg `mustard` 18%, panel shown |
| disabled | header `text-soft`, no hover, `aria-disabled="true"` |

## Motion
| Event | Animation |
| --- | --- |
| open | panel drops in from `-6px` with opacity, `150ms steps(3)`, once |
| close | panel hides at once (`hidden`) |
| marker | bar swap in `120ms steps(2)` |
| `prefers-reduced-motion` | no animation, final state at once |

No height tweening (no smooth slide), no bounce.

## Behavior
- Enter and Space toggle (native button). Tab moves header to header and into open panels.
- Optional: Up/Down move between headers, Home/End to the first/last.
- Closed panel uses `hidden` (or `hidden="until-found"` so find-in-page still reaches it).
- Deep link (`#id` of a panel) opens it.

## Never
- Accordion in accordion, all items open by default, the whole header as a `div` with a click handler.
- Chevrons that spin a full turn, smooth height animation, icons without the title.
