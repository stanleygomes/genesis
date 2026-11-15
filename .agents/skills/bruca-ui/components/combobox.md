# Combobox

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.** Field from [input](input.md), list from [select](select.md).

## When
- Choosing one value from a long list by typing (category, merchant, city), optionally creating a new one. Short list without typing: native `<select>` or [select](select.md). Searching commands: [command](command.md).

## Visual
| Property | Value |
| --- | --- |
| Field | the [input](input.md) (`balloon`, `3px`, `radii-sm`, shadow `3px 3px 0`), padding right `40px` for the toggle |
| Toggle | small arrow (same two triangles as select) on the right, `tabindex="-1"`, `aria-label` |
| Listbox | the select's listbox: bg `card`, `3px solid` `outline`, `radii-sm`, shadow `4px 4px 0`, `6px` below the field, field width, max height `264px` |
| Option | as in select; the typed part shown in weight `700` |
| Empty | one line, Alegreya italic `text-soft`, padding `8px 10px` ("Nada encontrado pra “xyz”") |
| Create option | optional last option "Criar “xyz”", prefixed with a `+` icon |

## States
| State | What changes |
| --- | --- |
| focus | input focus (teal border and shadow) |
| open | `aria-expanded="true"`, listbox shown, toggle arrow flipped |
| option active | bg `mustard`, text `on-mustard` (driven by `aria-activedescendant`) |
| selected | `✓` on the right, weight `700` |
| invalid | input invalid look; error says what to do ("Escolha uma categoria da lista") |

## Motion
| Event | Animation |
| --- | --- |
| open | listbox drops from `-6px`, `steps(2)` `120ms` (only the first open, not on every keystroke) |
| filtering | list updates at once |
| `prefers-reduced-motion` | no animation, final state at once |

## Behavior
- WAI-ARIA editable combobox with list autocomplete: `<input role="combobox" aria-autocomplete="list" aria-expanded aria-controls>`, list `role="listbox"`, options `role="option"` with `id`s; DOM focus stays in the input, the active option is `aria-activedescendant`.
- Typing filters (case- and accent-insensitive), opens and makes the first match active (Enter takes it); ArrowDown/Up move (open if closed), Enter picks the active option, Esc closes (second Esc clears), Alt+ArrowDown opens without moving. Clicking an option picks it and keeps focus in the input.
- Blur with text that matches nothing: keep the text, mark invalid on submit (never while typing). A polite live region can announce the count ("4 resultados").

## Never
- Auto-picking the first match on blur, filtering that needs an exact case or accent, more than ~50 rendered options (cap and say "refine a busca"), the listbox covering the field.
