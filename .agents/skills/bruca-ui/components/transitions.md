# Transitions (view change)

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober** by default; 🎬 `iris` is cartoon.

## Variants
| Variant | Animation | Use |
| --- | --- | --- |
| `swap` (default) | old view out `opacity 0` `steps(2)` `100ms`, new view in from `+8px` `steps(3)` `150ms` | any route/tab change |
| 🎬 `iris` | `box-shadow: 0 0 0 300vmax` `outline` around a circle hole: close `steps(6)`, swap, open `steps(7)`, ~`0.65s` total | big moments: entering the app, finishing an onboarding |

## Rules
- One transition per change; the next view is usable as soon as it shows.
- Never iris on every click, never chain transitions.
- `prefers-reduced-motion`: swap only, instant.
