# Field (label, help, error, form)

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.** One field = label + control + help + error; a form = fields, groups, a validation summary and actions. The control itself is [input.md](input.md), [input-group.md](input-group.md), [choice.md](choice.md) or another form component.

## When
- Every form control. Never a control without a visible label.
- Form layout for anything with more than one field: settings, new expense, sign-up.

## Visual
| Property | Value |
| --- | --- |
| Field | grid, gap `8px`, max width `360px` (`560px` in a form row) |
| Label | `<label for>` Bevan `13px` uppercase `+0.06em`, above the control |
| Optional mark | `(opcional)` after the label, Alegreya italic `14px` `text-soft`, no caps. Required is the default: mark the optional ones, not the required |
| Help | Alegreya `15px` `text-soft`, below the control, linked with `aria-describedby` |
| Error | Alegreya `15px` `red`, below the control, with an `18px` `red` square holding a `bg` Bevan `!` (color is never the only signal) |
| Ok (server-checked only) | Alegreya `15px` `teal`: "Disponível." |
| Form | grid, gap `20px`, max width `560px` |
| Row | fields side by side, `repeat(auto-fit, minmax(180px, 1fr))`, gap `20px 16px`, top-aligned |
| Group | `<fieldset>`: no box, `3px` `outline` rule on top, padding-top `16px`, legend Bevan `15px` |
| Actions | flex right-aligned, gap `12px`, `3px` `outline` rule on top, padding-top `20px`; `primary` last |
| Summary | alert box: bg `card`, `3px` `outline`, `radii-sm`, shadow `4px 4px 0`, `8px` `red` left bar; title Bevan `15px` "Corrija 2 campos"; list of links "Campo: o que fazer", each link focuses its field |

## Variants
| Variant | Use |
| --- | --- |
| stacked (default) | label above control |
| `inline` | label left in a `160px` column, control and help right; settings pages. Stacks under `560px` |
| row | two or three short fields on one line (valor + vencimento) |

## States
| State | What changes |
| --- | --- |
| default | as in Visual |
| invalid | control `aria-invalid="true"` (red border/shadow from the control), error line shown and added to `aria-describedby`; help stays |
| ok | ok line in `teal`; only after a real check (server, availability) |
| disabled | control disabled, label `text-soft` |
| summary | shown on submit with errors, gets focus (`tabindex="-1"`, `role="alert"`) |

## Motion
| Event | Animation |
| --- | --- |
| error line appears | drops from `-6px`, `120ms steps(2)` |
| submit with errors | summary drops in `120ms steps(2)`; each invalid control shakes once `±4px` `0.3s steps(4)` |
| `prefers-reduced-motion` | no animation, final state at once |

## Behavior
- Validate on submit; after a field has failed, re-check it on blur. Never red while typing, never before the user left the field.
- Error text says the fix ("Use dd/mm/aaaa, ex.: 20/11/2026"), not the rule broken.
- Submit with errors: summary appears and takes focus; its links jump to each field.
- `novalidate` on the form: own messages, not the browser bubbles.

## Never
- Placeholder as label, floating labels, red asterisks as the only required mark, errors only in a toast, disabling submit instead of explaining what is missing, a summary with no links.
