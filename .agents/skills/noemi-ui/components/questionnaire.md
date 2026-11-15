# Questionnaire

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober** by default; 🎬 `show` variant is cartoon. One question at a time with segmented progress: onboarding, profile, survey, quiz.

## When
- 3 to 8 questions where one-at-a-time helps focus. Short forms (≤ 3 fields) are a plain form ([field.md](field.md)).

## Visual (sober)
| Property | Value |
| --- | --- |
| Element | `<form novalidate>` labelled by the counter; each step a block with an `h3` question (`tabindex="-1"`) and a `fieldset` labelled by it |
| Card | bg `card`, `3px solid` `outline`, `radii-sm`, shadow `4px 4px 0`, max width `560px` |
| Head | padding `14px 20px`, `3px` rule below; counter Special Elite `13px` `text-soft` "Perfil de gastos · pergunta 2 de 4" (`aria-live="polite"`) |
| Progress | one segment per question, `10px` tall, `2px` `outline`, gap `4px`: done `teal`, current `mustard`, next `balloon` |
| Question | Bevan `20px/1.25`; optional help Alegreya `15px` `text-soft` |
| Options | full-width rows: bg `balloon`, `3px` `outline`, `radii-sm`, shadow `3px 3px 0`, padding `12px 14px`, native radio/checkbox ([choice.md](choice.md)) left, optional Special Elite `12px` note right; checked bg `26%` `mustard` |
| Other answers | any field: input group, slider, date picker |
| Error | Alegreya `15px` `red` under the options |
| Foot | `3px` rule on top, padding `14px 20px`: "Voltar" `neutral` left (hidden on step 1), "Próxima" `primary` right ("Concluir" on the last) |
| Done | badge `ok` + title Bevan `20px` + one line of what happens next + "Refazer" small `neutral` |

## Variants
| Variant | Use |
| --- | --- |
| sober | profile, settings onboarding, surveys |
| 🎬 `show` | quiz / game-show card for a landing or a playful onboarding: hand-drawn outline (`#sketch`), `radii`, shadow `6px 7px 0`; head is a dark band (bg `text`, counter Bevan `13px` uppercase `bg`); options lettered A/B/C in `32px` `3px` circles (Bevan `14px`; checked circle `mustard`) with the radio visually hidden; dashed foot rule; done centered with a [stamp](stamp.md) ("aprovado"). Counts toward the cartoon budget |

## States
| State | What changes |
| --- | --- |
| option hover | lifts `translate(-2px,-2px)`, shadow `5px 5px 0` |
| option focus-visible | `3px` `teal` ring around the whole row, `3px` offset |
| option checked | sober: bg `26%` `mustard`; show: letter circle `mustard` |
| unanswered on next | error line shown, focus to the first option |
| done | steps and foot hidden, all segments `teal` |

## Motion
| Event | Animation |
| --- | --- |
| next step | enters from `16px` right with fade, `150ms steps(3)` |
| back | enters from `-16px` left, same timing |
| unanswered | options shake once `±4px` `0.3s steps(4)` |
| progress | segment color swap `120ms steps(2)` |
| 🎬 done | stamp thunk `0.24s steps(3)`, once |
| `prefers-reduced-motion` | no animation, final state at once |

## Behavior
- Next = submit of the step: Enter works. Validate only the current step; answering hides the error at once.
- Focus moves to the new question heading; the counter announces "pergunta 2 de 4".
- Back keeps the answers. Restart resets the form and returns to step 1.
- Save on Concluir (or per step if the flow is long), never lose answers on Back.

## Never
- Several questions per step, progress without the "2 de 4" text, skipping validation silently, auto-advance on click (people misclick), `show` variant for serious forms (bank, health, legal).
