# Optional Modules: noemi-ui

**Ask the user before using any of these** (see SKILL.md §1). Each lists where it fits and what ruins it.

## CRT tube
- **Where:** dark full-screen moments only (intro, celebration, sign board), lasting seconds, then it switches off. Never over token, JSON, forms or paragraphs, never as the permanent look of a page.
- **What sells it:** the whole viewport is the tube (`position: fixed; inset: 1.5vmin`), period content (e.g. a fictional old TV broadcast or test card; `VT323` allowed only inside the tube), warm black `radial-gradient(#0C0608 → #000)`. An effect on a modern bright image looks fake.
- **Layers:** corners `4× radial-gradient(… rgb(0 0 0/.85) → transparent 55%)` · scanlines `repeating-linear-gradient(transparent 0 2px, rgb(0 0 0/.45) 3px 4px)` multiply, masked to fade at edges · bulge overlay (light center, dark rim) · glass reflection top-left.
- **Phosphor:** glow only on highlighted text: `0 0 1px` + `0 0 8px` + `0 0 22px` warm. Glow on everything + chroma = pink haze.
- **Chroma:** SVG filter splitting channels: red `feOffset dx=.6`, blue `dx=-.6`, recombined with `feBlend mode=screen`. Not colored `drop-shadow`s (looks like 3D glasses).
- **Grain:** WebGL (or small 2D canvas) noise in `mix-blend-mode: overlay`, ~12–24 fps.
- **Flicker:** rare and irregular (two short dips every ~7s), only while the moment lasts: grain and flicker stop with it (no `infinite`, see SKILL.md §7). Power on: line expands + brightness flash `steps(5)`.

## Analog glitch
- **Allowed:** horizontal tear (3–4 cloned slices, `clip-path` + `translateX`, ~180ms) · vertical hold (roll `steps(9)`, 0.7s) · jitter (1–2px, 0.26s) · static burst (grain up, brightness `.55`, 0.16s) · degauss (`hue-rotate` + `skewX` decaying, 1s) · VHS tracking (noise band at bottom, color bleed, 1.3s).
- **Tie to meaning:** invalid signature/error = tear + static; screen on/theme switch = degauss; session ended = vertical hold. Ambient at most every 12–20s, subtle ones only.
- **Never:** digital glitch, glitch over text being read, under `prefers-reduced-motion`.
