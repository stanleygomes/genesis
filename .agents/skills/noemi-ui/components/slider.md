# Slider (single and range)

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.** A value or a range on a track, always with the number written next to it.

## When
- Approximate values in a known range: budget cap, price filter, volume.
- Not for exact values (money to the cent, dates): use an [input](input.md). Pair them when both are useful.

## Visual
| Property | Value |
| --- | --- |
| Element | `role="slider"` thumb(s) with `tabindex="0"`, `aria-valuemin/max/now`, `aria-valuetext` ("R$ 1.200") and a label (`aria-labelledby`); range: two thumbs, `aria-label` "Valor mínimo"/"Valor máximo" |
| Head | label (Bevan `13px`) left, value right in Courier Prime 700 `15px` `tabular-nums`; range "R$ 200 – R$ 1.500" |
| Track | height `16px`, bg `card`, `3px solid` `outline`, radius `4px 5px 4px 5px` |
| Fill | `mustard`, from start to thumb (range: between thumbs); no gradient |
| Thumb | `24×30px`, bg `balloon`, `3px` `outline`, `radii-sm`, shadow `2px 2px 0`, a `3×12px` `outline` grip line in the middle |
| Positions | thumb travels the track minus its own width, so it never overflows the ends |
| Scale | optional, Special Elite `12px` `text-soft`: min, mid, max |
| Width | `100%`, max `420px` |

## Variants
| Variant | Use |
| --- | --- |
| single | one value from min |
| range | two thumbs, fill between; thumbs never cross (each one's limit is the other's value) |

## States
| State | What changes |
| --- | --- |
| hover (thumb) | shadow `3px 3px 0` |
| focus-visible | `3px` `teal` outline on the thumb, `3px` offset |
| dragging | thumb sinks `translate(2px,2px)`, no shadow, cursor `grabbing` |
| disabled | track and thumb border `text-soft`, fill `text-soft`, no shadow, label and value `text-soft` |

## Motion
| Event | Animation |
| --- | --- |
| keyboard step / click on track | thumb and fill jump `120ms steps(2)` |
| dragging | no transition: follows the pointer |
| `prefers-reduced-motion` | no animation, final state at once |

## Behavior
- Arrows ±1 step (Right/Up up), PageUp/PageDown ±10 steps, Home/End min/max.
- Click on the track moves the nearest thumb there and starts dragging (pointer capture). Stacked range thumbs: the one that can still move is taken.
- Value text updates live; save on release or with the form, not on every pixel.

## Never
- Slider without a written value, smooth easing, a fill or thumb that leaves the track, crossing range thumbs, slider for exact money.
