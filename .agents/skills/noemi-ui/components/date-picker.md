# Date picker

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.** A text field for dd/mm/aaaa ([input-group](input-group.md) with a calendar button) that opens a [calendar](calendar.md) in a popover.

## When
- Any date field where the month context helps (due date, statement period). Typing must always work too.

## Visual
| Property | Value |
| --- | --- |
| Field | input group: text input + `neutral` icon button (`20px` calendar icon), label above, help below |
| Text | Courier Prime `16px` `tabular-nums`; placeholder `dd/mm/aaaa` (Alegreya italic) |
| Help | format or instruction: "dd/mm/aaaa", "Primeiro clique: início. Segundo: fim." |
| Popover | `role="dialog"` `aria-modal="false"` with `aria-label`, absolute below the field (`8px` gap), left-aligned, `z-index` above content; holds a calendar (its own box and shadow) |
| Width | single max `300px`; range max `360px` |

## Variants
| Variant | Value |
| --- | --- |
| single | `20/11/2026` |
| range | one input `01/11/2026 – 15/11/2026`, calendar in range mode; closes after the end is picked |

## States
| State | What changes |
| --- | --- |
| focus | group `teal` (from input-group) |
| open | button `aria-expanded="true"`, popover shown |
| invalid | group `red`, help becomes the error with the fix ("Fevereiro não tem dia 31.", "Data inválida. Use dd/mm/aaaa.") |
| disabled | input and button disabled, group `text-soft` |

## Motion
| Event | Animation |
| --- | --- |
| popover opens | drops from `-6px`, `120ms steps(2)` |
| closes | instant |
| `prefers-reduced-motion` | no animation, final state at once |

## Behavior
- Typing: digits only, slashes inserted automatically (`20112026` → `20/11/2026`; range adds ` – `). Validated on blur: real date, end after start. Empty is not an error (required is the form's job).
- Button (or Alt+ArrowDown in the input) opens; focus goes to the selected day (or today). Calendar keys as in [calendar.md](calendar.md).
- Picking a day fills the input, closes, focus returns to the button. Escape closes and returns focus to the button. Click outside closes.
- Opening again syncs the calendar with what was typed.

## Never
- Read-only input that forces the calendar, native `type="date"` mixed with this look, US format, a modal backdrop for a date, popover covering its own field.
