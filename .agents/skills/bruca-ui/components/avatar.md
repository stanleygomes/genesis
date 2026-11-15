# Avatar

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober** by default; 🎬 `cameo` variant is cartoon.

## When
- A person (or account) next to their name: lists, comments, sidebar foot, shared budgets.
- 🎬 `cameo`: the one portrait of a profile or "about" page header. Never in lists.

## Visual (sober)
| Property | Value |
| --- | --- |
| Element | `<img alt="Name">` when there is a photo; otherwise a `<span role="img" aria-label="Name">` with initials |
| Shape | square with `radii-sm` (no perfect circle), `overflow: hidden` |
| Sizes | `24` · `32` · `40` (default) · `56` · `80px` |
| Outline | `3px solid` `outline` (`2px` at 24/32) |
| Shadow | `3px 3px 0` `outline` at 56/80 only |
| Initials | 2 letters (first + last name), Bevan uppercase, size 40% of the box, `+0.04em` |
| Color | picked from the name (stable hash): `mustard` + `on-mustard`, `teal` + `bg`, or `text` + `bg`; never `red` |
| Photo | `object-fit: cover`; on load error falls back to initials |
| Status (optional) | `10px` square bottom-right, `2px` `outline`, `teal` online / `text-soft` away, plus the word in `aria-label` |

## Variants
- `group`: stack, overlap `-6px`, each with a `3px` `bg` ring (`box-shadow: 0 0 0 3px bg`) between, initials at 34% so they stay readable; max 4 shown, then a `+N` box (bg `card`, Courier Prime bold); `aria-label` on the group lists everyone.
- 🎬 `cameo`: oval portrait frame (`50% / 46% 54%`), sketched outline (`#sketch`), inner `1px` `outline` ring at `-6px` (like a [stamp](stamp.md)), shadow `6px 7px 0`, size `96–120px`, initials Limelight in `mustard` with `2px` `outline` stroke; optional name plate below: Special Elite `12px` uppercase on `text`/`bg` band.

## States
| State | What changes |
| --- | --- |
| inside a link/button | the parent lifts; the avatar itself has no hover |
| focus-visible (when it is the control) | `3px` `teal` outline, `3px` offset |
| loading photo | initials shown until the image loads; no skeleton |

## Motion
| Event | Animation |
| --- | --- |
| sober | none |
| 🎬 `cameo` appears | iris opens (`clip-path` circle `0 → 75%`) `250ms steps(5)`, once, on first view |
| `prefers-reduced-motion` | no animation, final state at once |

## Behavior
- Decorative next to the visible name: `alt=""` / `aria-hidden="true"`; alone: the name is the accessible label.
- No image requests from third parties (Gravatar etc.) unless the project already uses them.

## Never
- Perfect circles in the sober kind, colored by status, more than 4 in a stack, a cameo in a list or more than one per screen, tilted avatars.
