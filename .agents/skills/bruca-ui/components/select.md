# Select (custom listbox)

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.** Owns the **listbox** look that [combobox](combobox.md) reuses.

## When
- **Default: the native `<select>` from [input.md](input.md).** It is free on accessibility, phones and forms.
- Custom only when an option needs more than plain text (color dot, icon, a second line like a balance) **and** the list is short (≤ ~12, no search). Long list or typing to find: [combobox](combobox.md). Actions: [dropdown menu](dropdown-menu.md).

## Visual
| Property | Value |
| --- | --- |
| Trigger | looks like the input: bg `balloon`, `3px solid` `outline`, `radii-sm`, shadow `3px 3px 0`, min height `44px`, padding `10px 40px 10px 12px`, Alegreya `17px`, same two-triangle arrow on the right; shows the chosen option's dot/icon + label |
| Placeholder | Alegreya italic `text-soft` ("Escolha a conta") |
| Listbox | bg `card`, `3px solid` `outline`, `radii-sm`, shadow `4px 4px 0`, padding `6px`, `6px` below the trigger, same width as it, max height `264px` (scrolls with the [scrollbar](scrollbar.md)) |
| Option | min height `40px`, padding `8px 10px`, radius `4px`, Alegreya `16px/1.3`; optional lead (dot `12px` with `2px` `outline` ring, or icon `16px`) and right meta in Courier Prime `13px` `text-soft` |
| Selected option | `✓` `14px` at the right end, text weight `700` |
| Group label | Special Elite `12px` uppercase `text-soft`, padding `8px 10px 4px` |

## States
| State | What changes |
| --- | --- |
| trigger focus / open | like input focus: border and shadow `teal`, shadow `4px 4px 0` |
| invalid | border and shadow `red` + help text, as in input |
| disabled | as input disabled |
| option active (keyboard/hover) | bg `mustard`, text and meta `on-mustard` |
| option disabled | text `text-soft`, skipped by the arrows |

## Motion
| Event | Animation |
| --- | --- |
| open | listbox drops from `-6px`, `steps(2)` `120ms` |
| close | instant |
| `prefers-reduced-motion` | no animation, final state at once |

## Behavior
- WAI-ARIA select-only combobox: trigger `<button role="combobox" aria-haspopup="listbox" aria-expanded aria-controls aria-labelledby>` (label above, like input); list `role="listbox"`, options `role="option"` + `aria-selected`; the trigger keeps focus and points at the active option with `aria-activedescendant`.
- Closed: Enter, Space, ArrowDown/Up open on the selected option; a letter selects the next option starting with it.
- Open: ArrowUp/Down move (no wrap), Home/End, letters jump, Enter/Space choose and close, Esc closes without changing, Tab chooses and moves on. Outside click closes. Active option is scrolled into view.
- Keep a hidden native `<input>` with the value when it lives in a `<form>`.

## Never
- Custom select for plain text options, multi-select in this component (use checkboxes), search inside (that is the combobox), a listbox wider than the screen.
