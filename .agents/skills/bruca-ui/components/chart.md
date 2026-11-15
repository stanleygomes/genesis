# Chart

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.** Bar, line and donut, drawn as inline SVG (no library, no canvas, no image).

## When
- Bar: compare amounts between categories or months (gasto por mês).
- Line: change over time, one or two series (saldo, este ano × ano passado).
- Donut: parts of one whole, 2 to 5 slices (onde foi o dinheiro). More than 5: bar sorted desc.
- A single number: [giant number](giant-number.md), not a chart.

## Visual (all)
| Property | Value |
| --- | --- |
| Element | `<figure>` with title + subtitle in `<figcaption>`; `<svg role="img">` with `aria-label` summarizing the takeaway; a "Ver tabela" [collapsible](accordion.md) with the same data as a [table](table.md) |
| Frame | bg `card`, `3px solid` `outline`, `radii-sm`, shadow `4px 4px 0`, padding `16px 20px` |
| Title | Bevan `15px`; subtitle Special Elite `13px` `text-soft` (period, unit) |
| Axis labels, ticks, values | Courier Prime `12px` `text-soft`, `tabular-nums`; money `R$ 1,2 mil` style, comma decimals |
| Grid | horizontal only, `1px` `outline` 18%, max 4 lines; no vertical grid |
| Baseline | `2px` `outline` at zero |
| Series colors | 1st `teal`, 2nd `mustard`, 3rd `text`, 4th `text-soft`, 5th hatch (`outline` 45° lines on `card`). Fixed order, follows the entity; `red` only for over-budget/danger, never as "series 3" |
| Fills | flat, `2px` `outline` stroke around every bar and slice (the tokens are muted: the outline carries the contrast) |
| Labels | direct: value on the highlighted/last bar, series name at the end of each line, values next to the donut legend. Never a number on every point |
| Legend | for 2+ series: row above the plot, `12px` swatch with `2px` `outline`, Special Elite `13px` |

## Variants
| Variant | Rules |
| --- | --- |
| `bar` | starts at zero always; bar width ≥ gap; `radii` `3px 3px 0 0` on the top only; one bar may be highlighted (`mustard`) to carry the point |
| `line` | `2px` (main `3px`) stroke, square joins (`stroke-linejoin: miter`), markers `8px` squares only on the last point; 2nd series may be dashed `6 4` for print |
| `donut` | ring thickness 28% of the radius, `2px` `card` gap between slices, start at 12 o'clock clockwise, largest first; total in the hole in Bevan `22px` + Special Elite caption |

## States
| State | What changes |
| --- | --- |
| mark hover / focus | mark gets `3px` `outline` stroke; tooltip shows label + value; others unchanged (no dimming) |
| tooltip | bg `text`, color `bg`, `3px solid` `outline`, `radii-sm`, shadow `3px 3px 0`, Courier Prime `13px`; above the mark, kept inside the frame |
| no data | frame with Alegreya italic `text-soft` message centered, no empty axes |
| loading | frame with `aria-busy="true"` and the axes only; no shimmer |

## Motion
| Event | Animation |
| --- | --- |
| first time in view | bars grow from the baseline `steps(4)` `320ms`; line draws `steps(6)` `400ms`; donut slices appear `steps(5)` `300ms`; once |
| data changes | new shapes at once |
| hover | tooltip appears at once |
| `prefers-reduced-motion` | no animation, final state at once |

## Behavior
- Each mark is reachable: `tabindex="0"` with `aria-label="Nov: R$ 8.150,00"`; focus shows the same tooltip as hover. Arrow keys optional.
- The table view is the accessible source of truth: the same numbers, same order.
- Hit area bigger than the mark (full column height for bars, nearest point for lines).
- Light/dark: colors come from tokens, so the chart follows the theme; check the dark mustard and teal on the dark `card`.

## Never
- 3D, shadows on marks, gradients, pie without a hole, more than 5 slices.
- Bars not starting at zero, dual y-axes, smooth curves (`monotone`) that invent values.
- Rainbow palettes, colors outside the tokens, legend as the only way to tell series apart.
- Looping or replaying animation on every hover.
