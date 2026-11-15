# Breadcrumb

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.**

## When
- Pages 3+ levels deep (account → category → transaction). Shows where you are and the way back up.
- Not for steps of a flow (that is [progress](progress.md) `segmented`) or for a flat site (just [nav](nav.md)).

## Visual
| Property | Value |
| --- | --- |
| Element | `<nav aria-label="Trilha">` with an `<ol>`; the last item is plain text with `aria-current="page"` |
| Items | Bevan `12px` uppercase `+0.06em`, line-height `1.2`, gap `8px` |
| Links | color `text-soft`, no underline; hit area padding `6px 2px` |
| Current | color `text`, not a link |
| Separator | `/` in Courier Prime `14px` `text-soft`, drawn by CSS between items, `aria-hidden` |
| Position | top of the page content, above the page title, margin-bottom `12px` |

## Variants
- `collapsed` (more than 4 levels): first + `…` + last two. The `…` is a `flat` small neutral [button](button.md) (`aria-label="Mostrar caminho completo"`) that expands in place.
- `back` (phones < `600px`): only the parent, as `← Parent`.

## States
| State | What changes |
| --- | --- |
| hover | link color `text`, `2px` `outline` underline (`inset 0 -2px`) |
| focus-visible | `3px` `teal` outline, `2px` offset |
| current | `text`, no hover |

## Motion
| Event | Animation |
| --- | --- |
| hover | none (color swap) |
| expand `…` | hidden items appear at once |
| `prefers-reduced-motion` | nothing to remove |

## Behavior
- Plain links: Tab goes through them, Enter follows. The current page is not focusable.
- Long labels truncate with ellipsis at `24ch` with the full text in `title`.

## Never
- Breadcrumb as the only navigation, current page as a link, `>` arrows drawn as icons, more than one line.
