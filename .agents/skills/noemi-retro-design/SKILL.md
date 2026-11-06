---
name: noemi-retro-design
description: Noemi's retro design system — 80s arcade and vintage game UI with exact fonts, colors, sizes, buttons, inputs, components, backgrounds and old references to borrow from. Use when creating, styling or reviewing a retro, arcade, 8-bit, pixel or vintage interface.
---

# Skill: Noemi — Retro Design

Arcade cabinet meets vintage print: flat colors, thick ink borders, hard offset shadows, pixel type for game bits only. Fun in the details, calm in the layout. For clean modern UI, use `bento-design` instead.

## 1. Fonts (self-hosted via `@fontsource/*`, never a CDN link)
- **Display / titles:** `"Bungee Shade"` (hero only), `"Bungee"` (buttons, labels, h2).
- **Body:** `"Overpass"` `400`/`700` — highway-sign sans, very legible.
- **Code / data:** `"Overpass Mono"` `400`.
- **Typewriter (nav, menus, tags, status lines):** `"Courier Prime"` `700`, uppercase, `+0.15em`, `13–14px`.
- **Game bits:** `"Press Start 2P"` — scores, HUD, toasts, verdicts. Never for paragraphs.

## 2. Color Tokens (`light-dark()`; light = paper, dark = cabinet)
- `bg`: `#F2E8D5` / `#14121A` · `panel`: `#FFFBF2` / `#1E1B26`
- `ink`: `#1B1B1F` / `#F2E8D5` · `muted`: `#6B6355` / `#A39BB0`
- `edge` (borders): `#1B1B1F` / `#4A4458` · `shadow`: `#1B1B1F` / `#050407`
- `red`: `#E4352B` / `#FF5A4E` · `blue`: `#1F5FAF` / `#4D8DFF` · `green`: `#1E9E5A` / `#2FD483`
- `coin` (accent, buttons): `#F7B500` / `#FFC93C` — bg only, never text on paper.
- `ok-bg`: `#147A44` / `#2FD483` (text `#FFF` / `#0E0D12`) · `bad`: `#C42A20` / `#FF5A4E`
- `board` (LED/CRT, both themes): `#0E0D12` · `led` (amber text): `#FFB000`
- Max 3 accent hues per screen; `red/blue/green` map to one meaning each, reused everywhere.

## 3. Sizes
- Body `17px/1.55` · code `14px` · label/h2 `13px` Bungee uppercase `+0.08em` · hero `clamp(46px, 11vw, 100px)`.
- Pixel font: `9–12px` (it renders huge); verdict `clamp(26px, 7vw, 76px)`.
- Border `3px solid edge` · radius `10px` (panels), `6px` (tabs/select), `999px` (buttons).
- Hard shadow `5px 5px 0 shadow` (panels), `0 5px 0` (buttons). No blur, ever.
- Spacing: `8 / 12 / 16 / 20 / 28 / 32px`. Page `max-width: 1160px`, gutter `16px`.

## 4. Rules
- Flat fills. Gradients only as patterns (dots, stripes, stars), never as shading.
- Every interactive element: idle, hover (`brightness(1.06)`), active (press down), `focus-visible` (`3px` blue outline, `4px` offset).
- Motion is stepped (`steps(n)`), short (`≤ 1.8s`), and stops under `prefers-reduced-motion`.
- Intros/splash `≤ 1s`, once per day max. Errors never take the full screen; celebrations may.
- Keep the header clean: no ticker or HUD strips under it. One loud element per screen.
- Everything in CSS (sprites via `box-shadow`, patterns via `conic-gradient`): no image requests, no `innerHTML`.
- Contrast AA. Yellow/amber text only on dark (`board`).

## 5. Backgrounds
- **Light:** tile grid — 2px dot every 16px: `conic-gradient(at 2px 2px, transparent 75%, rgb(27 27 31 / .11) 0) 0 0 / 16px 16px`.
- **Dark:** starfield — 4 layers of 2–3px pixel stars (cream, amber, blue at `.3–.45`), prime sizes (`97×89`, `151×163`, `233×211`, `307×283`) so it never visibly repeats; one extra fixed layer twinkles (`opacity .15`, `steps(1)`).
- **Floor:** pixel ground strip (`5px` grass + `10px` checkered dirt) for mascots to walk on.

## 6. Components
Specs in [REFERENCE.md](REFERENCE.md): nav bar, button, tabs, input/textarea, select, LED board, status, HUD, life bar, toast, stage map, verdict, pixel sprite, notice panel.

## 7. Old References (borrow, never copy)
- **Arcade 80s:** Pac-Man, Galaga, Space Invaders (attract mode, INSERT COIN, 1UP/HI).
- **Fighting games:** Street Fighter II life bars, K.O., segmented HP.
- **Overworld maps:** Super Mario World / Bros. 3 dotted paths and numbered stages.
- **NES title screens:** `© YEAR` line, blinking PRESS START, Konami code (`↑↑↓↓←→←→BA`).
- **Solari split-flap boards** and amber dot-matrix LED signs.
- **70s print:** enamel signs, hazard stripes, Bungee-style signage lettering.
