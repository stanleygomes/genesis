# Image card

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.** A [card](card.md) whose main content is a picture: image on top, caption below.

## When
- A photo or illustration that needs a caption: listing photo, book cover, chart snapshot.
- Not for decoration (that is a plain image) and not for avatars.

## Visual
| Property | Value |
| --- | --- |
| Element | `<figure>` with `<img alt>` (or inline SVG `role="img"` + `aria-label`) and `<figcaption>` |
| Box | bg `card`, `3px solid` `outline`, `radii-sm`, shadow `4px 4px 0`, `overflow: hidden`, max width `320px` |
| Media | full bleed, `aspect-ratio` fixed (default `4 / 3`), `object-fit: cover`, `3px` bottom line `outline` |
| Caption | padding `12px 16px`; title Bevan `15px`; text Alegreya `16px` |
| Meta | Special Elite `13px` `text-soft` (source, date, price) |
| Tag | optional [badge](badge.md) top-left over the media, `8px` inset |

## Variants
| Variant | Change |
| --- | --- |
| ratio | `4 / 3` (default), `1 / 1` (covers, products), `16 / 9` (video, wide photos) |
| `clickable` | the whole figure is one link; lifts like a button |
| `side` | media left `40%`, caption right, `3px` right line instead of bottom; for lists on wide screens |

## States
| State | What changes |
| --- | --- |
| loading | media area is a [skeleton](skeleton.md) block with the same ratio (no layout jump) |
| broken / missing | media bg `card` with `outline` `12%` diagonal hatch (`6px` lines), centered picture icon `28px` `text-soft` + Special Elite `12px` `imagem indisponível` |
| hover (clickable) | lift `translate(-2px,-2px)`, shadow `6px 6px 0` |
| focus-visible | `3px` `teal` outline, `3px` offset |

## Motion
| Event | Animation |
| --- | --- |
| image loaded | appears `opacity` `0 → 1`, `steps(2)` `120ms` |
| hover (clickable) | lift, `120ms` `steps(2)` |
| `prefers-reduced-motion` | no animation, final state at once |

## Behavior
- `alt` describes the picture; the caption is not a repeat of it. Decorative media: `alt=""`.
- Ratio reserved before load (width/height or `aspect-ratio`) so nothing jumps.

## Never
- Caption over the photo, rounded or circle crops, filters/sepia on the photo, sketch filter or tilt (that is the 🎬 tilted [card](card.md)).
