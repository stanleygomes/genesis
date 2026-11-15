# Attachment

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.** A file attached to a form or message: type, name, size, remove, upload progress.

## When
- Files picked for upload or already attached (receipt in an expense, PDF in a chat).
- Not for download lists of many files: that is a [table](table.md).

## Visual
| Property | Value |
| --- | --- |
| Box | inline-flex, gap `12px`, padding `8px 8px 8px 10px`, bg `card`, `3px solid` `outline`, `radii-sm`, shadow `3px 3px 0`, width `280–360px` |
| Type icon | `36×44px` sheet with a folded top-right corner, `2px solid` `outline`, bg `balloon`; extension in a band: Special Elite `11px` uppercase, bg `text`, color `bg` |
| Name | Alegreya `16px` 700, one line, ellipsis at the end (the type icon keeps the extension visible), full name in `title` |
| Size / status | Special Elite `12px` `text-soft`: `284 KB · PDF` |
| Remove | `neutral` `flat` `small` icon button (`32px`), `aria-label="Remover recibo.pdf"` |
| Upload bar | `6px` tall along the bottom inside the box, fill `teal`, `2px` top line `outline` |

## Variants
- `chip`: the box above; list of chips wraps with gap `12px`.
- `image`: type icon replaced by a `44×44px` thumbnail (`2px` `outline`, radius `4px`).
- `readonly`: no remove button, whole box is a download link (lifts on hover).

## States
| State | What changes |
| --- | --- |
| uploading | upload bar visible, status `enviando · 40%`, remove becomes cancel (`aria-label="Cancelar envio"`), `aria-busy="true"` |
| done | bar gone, status back to size · type |
| error | outline and shadow `red`, status `red` `falhou · acima de 10 MB`, flat `small` icon button ↻ before remove (`aria-label="Tentar enviar video.mp4 de novo"`) |
| hover (readonly) | lift `translate(-2px,-2px)`, shadow `5px 5px 0` |
| focus-visible | `3px` `teal` outline on the focused button |

## Motion
| Event | Animation |
| --- | --- |
| added | drops in from `-6px`, `steps(2)` `120ms` |
| progress | bar jumps to the new width `steps(5)` `250ms` (no fake progress: real bytes) |
| removed | gone at once; focus moves to the next chip, or to the "Anexar" button |
| `prefers-reduced-motion` | no animation, final state at once |

## Behavior
- The list is a `<ul>`; status changes are announced by one polite live region (`recibo.pdf enviado`).
- The picker is a real `<input type="file">` behind a `neutral` button; drop zones also accept the keyboard path.

## Never
- Icons only (always the name), removing without a way back on a sent message, progress bars that loop, colored type icons per extension.
