# Scrollbar

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.

**Sober.** Applies to the page and every scrolling area (sidebar, table, code, dialog).

## Visual
| Property | Value |
| --- | --- |
| Size | `14px` wide (vertical) / tall (horizontal) |
| Track | bg `card`, `3px solid` `outline` on the side facing the content |
| Thumb | bg `mustard`, `3px solid` `outline`, radii `4px 5px 4px 5px` |
| Arrows | none |
| Corner | bg `card` |
| Firefox | only `scrollbar-color: mustard card` (no pseudo-elements there) |

Use the `::-webkit-scrollbar` pseudo-elements (Blink and WebKitGTK, so Wails too). In Blink, setting `scrollbar-color` or `scrollbar-width` disables those pseudo-elements: set them only under `@supports not selector(::-webkit-scrollbar)`.

## States
| State | What changes |
| --- | --- |
| hover | thumb mixes `15%` of `outline` |
| active (dragging) | thumb `teal` |

## Motion
| Event | Animation |
| --- | --- |
| none | scrollbars never animate; no smooth-scroll hijacking |

## Never
- Hiding the scrollbar on scrolling areas, thin overlay bars that vanish, gradients, a thumb thinner than `8px` inside the border.
