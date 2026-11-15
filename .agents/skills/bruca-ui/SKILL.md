---
name: bruca-ui
description: bruca-ui design system (by Noemi; BRUtalism + CArtoon) — website style merging neobrutalism with 1930s rubber-hose cartoons (straight-line grid and color blocks, hand-drawn components, stamps, balloons, telegrams, film grain), with exact fonts, colors, sizes and components, plus optional CRT tube and analog glitch modules that require asking the user first. Use when creating, styling or reviewing a retro, vintage, neobrutalist, cartoon or rubber-hose interface. For clean modern UI, use bento-design.
---

# Skill: bruca-ui (neobrutalism × 1930s cartoon)

**Sober neobrutalist base, cartoon as seasoning.** For websites and apps. Everyday components are straight and quiet; a few cartoon components give the screen its character. Text meant to be read is never under an effect.

## 0. Before anything
- **Check the project first.** Look for existing design rules or colors: AGENTS.md/CLAUDE.md/README, theme or token files (`:root` vars, `tailwind.config`, `theme.*`), a design doc, an existing stylesheet. What the project defines **wins**; this skill only fills the gaps. Conflict? Ask before overriding.
- **Say you are using it.** Tell the user, in one short block, that `bruca-ui` is in use and what was decided: what came from the project, which optional modules were chosen or left out, and what is still pending their answer.

## 1. Ask first (decision points)
Sections 2–7 always apply. **Before using anything in [OPTIONS.md](OPTIONS.md), ask the user**, in one message: list only the options that fit the screen, one line each, with your recommendation first. Never add them by default; never ask again for what was already decided in this project (check its AGENTS.md/README).
- **CRT tube** (where: intro, celebration, sign boards) · **Analog glitch** (which events)
- Also ask: mascot? sound? showcase page (animated film allowed) or app used all day (everything still)?

## 2. Two kinds of component
| Kind | Look | Examples | Budget |
| --- | --- | --- | --- |
| **Sober** (default) | neobrutalist: straight `3px` `outline`, small uneven radii (`radii-sm`), hard shadow, **no** sketch filter, no tilt | button, input, choice, card, tabs, table, badge, alert, toast, dialog, progress, nav, code, layout | unlimited |
| **Cartoon** (seasoning) | 1930s cartoon: hand-drawn outline (`#sketch`), big uneven radii, period props, may tilt | ticket button, stamp, balloon, telegram, ribbon alert, film-reel progress, program nav, tilted card, mascot | **max 2 cartoon component types per screen** (a chat full of balloons counts as one) |

Layout (grid, dividers, color blocks, giant number) is always straight. When in doubt, pick the sober one. Borrow the **era** (Fleischer, early studio shorts), never a specific game or show (no characters, art or screens from Cuphead or any other title).

## 3. Fonts (self-hosted `@fontsource/*`, never a CDN)
- Title `Limelight` (stroke `2px` `outline` + `4px 4px 0` `outline` shadow, fill `mustard`).
- Labels, buttons, giant number `Bevan` · body `Alegreya` 400/700 (italic for taglines).
- Meta, caption tags, badges, telegrams `Special Elite` (typewriter, short text only).
- Code, JSON, logs, data tables `Courier Prime` 400/700 (readable mono of the same era).

## 4. Tokens (`light-dark()`: light cream / dark old-cinema)
- `bg` `#EFE2C4`/`#17110C` · `card` `#F8EFD9`/`#241A13` · `balloon` `#FFF8E8`/`#2E2219`
- `text` `#24170F`/`#F1E4C6` · `text-soft` `#6A5442`/`#B9A588` · `outline` `#24170F`/`#E9DABA` (borders and hard shadows)
- `red` `#B5322A`/`#E0574A` · `mustard` `#D49A2E`/`#E8B34A` · `teal` `#2F6F6B`/`#5FA8A1`
- One meaning per accent (`red` danger/error, `mustard` action/highlight, `teal` ok/info), max 3 per screen. Mustard text only on dark, or as a fill behind dark text: text on `mustard` is always `on-mustard` `#24170F`, in both themes.
- Background: `bg` + two faint watercolor washes (mustard top-left, teal bottom-right, `radial-gradient` ≤18% alpha). No dots, no patterns.

## 5. Sizes
- Body `17px/1.55` · code `14px` · labels Bevan `13px` uppercase `+0.06em` · title `clamp(44px, 10vw, 96px)` · giant number `clamp(44px, 8vw, 92px)`.
- Outline `3px` · `radii-sm` `8px 10px 7px 9px / 9px 7px 10px 8px` (sober) · `radii` `16px 20px 14px 18px / 18px 14px 20px 16px` (cartoon) · layout radius `0`.
- Shadow `4px 4px 0` sober components (`3px 3px 0` small), `6px 7px 0` cartoon, none on layout.
- Spacing `8/12/16/20/28/32px` · `max-width: 1160px` · gutter `16px`.

## 6. Hand-drawn outline (cartoon components only)
- Borders drawn on a `::before` with a **still** SVG `filter: url(#sketch)` (`feTurbulence` fractalNoise `0.035`, fixed seed, `feDisplacementMap scale≈1.2`, filter region `-10%/120%`). Never on text.
- "Boiling" outline (seed cycling with `<animate calcMode=discrete>`) only on small elements and only while something happens (hover, agent working). Never looping, never on panels or paragraphs.

## 7. Rules (learned the hard way)
- States: clickable things lift on hover `translate(-2px,-2px)` + bigger shadow; active sinks onto its shadow with no shadow; `focus-visible` `3px` `teal` outline, `3px` offset. Contrast AA.
- Tilt only on cartoon components (stamps, tilted cards). Nothing else tilted.
- **Motion is part of each component** (see its Motion section): stepped (`steps(n)`), `≤ 1.8s`, finite, tied to a real event (appear, change, finish). View change: [transitions.md](components/transitions.md). All off under `prefers-reduced-motion` (also remove SVG `<animate>`).
- **Performance:** no `infinite` animation anywhere in an app. In WebKit (Wails/Tauri on Linux) any looping animation repaints the window and re-runs the SVG filters on every large `.sketched` panel: measured ~90% CPU vs 0–5% with everything still.
- Errors never take the full screen; celebrations may. Header clean. One loud element per screen (one loud stamp, one giant number, one color block in view).
- CSS/SVG/canvas only: no image requests, no `innerHTML`.
- Grain/vignette overlay: fixed, `pointer-events: none`, painted once (see [film-texture.md](components/film-texture.md)).
- Never: heavy grain, flicker, scratches or boil at full strength (reads as broken), digital glitch (datamosh, pixel sorting), neon or garish palettes, synthwave/cyberpunk, pixel fonts, everything tilted or overlapping, "ugly on purpose", system fonts.

## 8. References (borrow, never copy)
1930s rubber-hose shorts (era only) · neobrutalist websites (bare grids, color blocks, hard shadows) · old cinema posters and programs, telegrams, rubber stamps, tickets, film reels (as UI metaphors).

## 9. Components
One file per component in `components/`: open only the ones the screen needs. Each gives visual (property → value/token), variants, states, motion and behavior. **Rebuild the look and the states; never paste code** (there is none to paste). 🎬 = cartoon (counts toward the budget).

| Group | Components |
| --- | --- |
| Layout | [grid](components/grid.md) · [color block](components/color-block.md) · [giant number](components/giant-number.md) · [nav](components/nav.md) (🎬 program variant) |
| Actions | [button](components/button.md) · 🎬 [ticket button](components/ticket-button.md) |
| Forms | [input](components/input.md) · [choice](components/choice.md) (checkbox, radio, switch) |
| Feedback | [badge](components/badge.md) · 🎬 [stamp](components/stamp.md) · [alert](components/alert.md) (🎬 ribbon variant) · 🎬 [telegram](components/telegram.md) · [toast](components/toast.md) · [progress](components/progress.md) (🎬 film-reel variant) · [dialog](components/dialog.md) |
| Content | [card](components/card.md) (🎬 tilted variant) · [tabs](components/tabs.md) · [table](components/table.md) · [code](components/code.md) · 🎬 [balloon](components/balloon.md) · [scrollbar](components/scrollbar.md) |
| Effects | [transitions](components/transitions.md) (🎬 iris) · 🎬 [film texture](components/film-texture.md) · 🎬 [mascot](components/mascot.md) |

Optional modules: [OPTIONS.md](OPTIONS.md).
