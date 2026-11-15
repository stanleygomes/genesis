# Kbd (keyboard key)

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.** A keyboard key for shortcuts, in running text or in a shortcut list.

## When
- Showing a shortcut: help text, menus, tooltips, a shortcuts dialog.
- Not for code (that is [code.md](code.md)) or for buttons.

## Visual
| Property | Value |
| --- | --- |
| Element | `<kbd>`; a combination is an outer `<kbd>` holding one `<kbd>` per key |
| Key | inline-flex, min `24×24px`, padding `0 6px`, bg `balloon`, `2px solid` `outline`, radius `4px 5px 4px 5px`, shadow `2px 2px 0` |
| Text | Courier Prime 700 `13px/1`; names as printed on the key (`Ctrl`, `Shift`, `Esc`, `Enter`, `⌘`, `←`), letters uppercase |
| Combination | keys with gap `4px` and a `+` between them in Courier Prime `13px` `text-soft`; sequences (`←` `→`) without `+` |
| Shortcut list | `<dl>` two columns: keys left, action (Alegreya `17px`) right, gap `10px 28px` |

## Variants
| Variant | Value |
| --- | --- |
| `sm` | `20px`, `12px` text, shadow `1px 1px 0`: inside paragraphs |
| default | `24px`: lists, menus |
| `lg` | `36px`, `15px` text, `3px` border, shadow `3px 3px 0`: help pages, onboarding |

## States
| State | What changes |
| --- | --- |
| default | as in Visual |
| pressed (only in a live demo/tutorial) | sinks onto its shadow (`translate(2px,2px)`, `lg` `3px`), no shadow, bg `mustard`, text `on-mustard` |

## Motion
| Event | Animation |
| --- | --- |
| press / release | `120ms steps(2)`, only while the real key is held |
| `prefers-reduced-motion` | no animation, final state at once |

## Behavior
- Static by default: no focus, no hover.
- Live demo listens only inside its own focusable area, never globally while the user types elsewhere.
- Show the platform's keys (`⌘` on Mac, `Ctrl` elsewhere) when known; otherwise the common one.

## Never
- Sketch filter or tilt, keys in Bevan or Special Elite, lowercase letters, keys as buttons, a whole sentence inside a key.
