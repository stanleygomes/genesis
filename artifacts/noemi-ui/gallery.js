// Galeria noemi-ui: tema, playground de cores, demos e animações sob demanda.
const root = document.documentElement;
const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
const reduced = matchMedia("(prefers-reduced-motion: reduce)");

function store(key, value) {
  try {
    if (value === undefined) return JSON.parse(localStorage.getItem(key) || "null");
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    return null;
  }
  return null;
}

// Reinicia uma animação de classe (só roda quando alguém pede).
function replayClass(el, cls) {
  el.classList.remove(cls);
  void el.offsetWidth;
  el.classList.add(cls);
  // Espera a última animação (filhos também animam, ex.: linhas do telegrama).
  const done = () => {
    if (el.getAnimations({ subtree: true }).some((a) => a.playState === "running")) return;
    el.classList.remove(cls);
    el.removeEventListener("animationend", done);
  };
  el.addEventListener("animationend", done);
}

/* ---------- contorno fervendo: só enquanto algo acontece ---------- */
const boil = $("#boil");
let boiling = 0;
function startBoil() {
  if (reduced.matches) return;
  if (boiling++ === 0) boil.beginElement();
}
function stopBoil() {
  boiling = Math.max(0, boiling - 1);
  if (boiling === 0) boil.endElement();
}
$$(".tk__btn").forEach((btn) => {
  btn.addEventListener("pointerenter", () => { if (!btn.disabled) startBoil(); });
  btn.addEventListener("pointerleave", () => { if (!btn.disabled) stopBoil(); });
});

/* ---------- tema: claro por padrão, o botão alterna ---------- */
const themeBtn = $("#theme");
function setTheme(theme) {
  root.dataset.theme = theme;
  themeBtn.textContent = theme === "light" ? "Tema escuro" : "Tema claro";
  store("noemi-theme", theme);
  applyTokens();
  paintGrain();
}
themeBtn.addEventListener("click", () => setTheme(root.dataset.theme === "light" ? "dark" : "light"));

/* ---------- playground de cores ---------- */
const swatches = $$("[data-token]");
const DEFAULTS = { light: {}, dark: {} };
const overrides = { light: {}, dark: {}, ...store("noemi-tokens") };

function toHex(rgb) {
  const [r, g, b] = rgb.match(/\d+/g).map(Number);
  return `#${[r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}
// light-dark() só resolve dentro de um elemento: mede a cor num probe.
function readDefaults() {
  const probe = document.createElement("span");
  probe.style.position = "absolute";
  document.body.append(probe);
  for (const scheme of ["light", "dark"]) {
    probe.style.colorScheme = scheme;
    swatches.forEach((input) => {
      probe.style.color = `var(${input.dataset.token})`;
      DEFAULTS[scheme][input.dataset.token] = toHex(getComputedStyle(probe).color);
    });
  }
  probe.remove();
}
function applyTokens() {
  const theme = root.dataset.theme;
  swatches.forEach((input) => {
    const token = input.dataset.token;
    const value = overrides[theme][token];
    if (value) root.style.setProperty(token, value);
    else root.style.removeProperty(token);
    input.value = (value || DEFAULTS[theme][token] || "#000000").toLowerCase();
  });
}
swatches.forEach((input) => {
  input.addEventListener("input", () => {
    overrides[root.dataset.theme][input.dataset.token] = input.value.toUpperCase();
    store("noemi-tokens", overrides);
    applyTokens();
  });
});
$("#tok-reset").addEventListener("click", () => {
  overrides[root.dataset.theme] = {};
  store("noemi-tokens", overrides);
  applyTokens();
  $("#tok-status").textContent = "Tema restaurado.";
});
$("#tok-copy").addEventListener("click", async () => {
  const lines = swatches.map((input) => {
    const t = input.dataset.token;
    const light = overrides.light[t] || DEFAULTS.light[t];
    const dark = overrides.dark[t] || DEFAULTS.dark[t];
    return light === dark ? `  ${t}: ${light};` : `  ${t}: light-dark(${light}, ${dark});`;
  });
  const css = `:root {\n${lines.join("\n")}\n}`;
  const out = $("#tok-out");
  out.textContent = css;
  out.hidden = false;
  try {
    await navigator.clipboard.writeText(css);
    $("#tok-status").textContent = "Copiado.";
  } catch {
    $("#tok-status").textContent = "Selecione o bloco abaixo e copie.";
  }
});

/* ---------- demos ---------- */
$$('[data-demo="load"]').forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.getAttribute("aria-busy") === "true") return;
    btn.style.width = `${btn.offsetWidth}px`;
    btn.setAttribute("aria-busy", "true");
    if (btn.classList.contains("tk__btn")) startBoil();
    setTimeout(() => {
      btn.removeAttribute("aria-busy");
      btn.style.width = "";
      if (btn.classList.contains("tk__btn")) stopBoil();
    }, 2000);
  });
});
$$('[data-demo="toggle"]').forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.setAttribute("aria-pressed", String(btn.getAttribute("aria-pressed") !== "true"));
  });
});
$$('[data-demo="switch"]').forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.setAttribute("aria-checked", String(btn.getAttribute("aria-checked") !== "true"));
  });
});
$("#ind").indeterminate = true;

$('[data-demo="validate"]').addEventListener("click", () => {
  const input = $("#f-cep");
  const help = $("#f-cep-help");
  const ok = input.value.replace(/\D/g, "").length === 8;
  input.setAttribute("aria-invalid", String(!ok));
  input.setAttribute("aria-describedby", "f-cep-help");
  help.textContent = ok ? "CEP válido." : "Use 8 dígitos, só números.";
  if (!ok && !reduced.matches) replayClass(input, "is-shake");
});

const dlg = $("#dlg-demo");
$('[data-demo="dialog"]').addEventListener("click", () => dlg.showModal());
$$("[data-close]", dlg).forEach((b) => b.addEventListener("click", () => dlg.close()));

$('[data-demo="copy"]').addEventListener("click", async (e) => {
  const btn = e.currentTarget;
  try {
    await navigator.clipboard.writeText($("#code-demo").textContent);
    btn.textContent = "Copiado";
  } catch {
    btn.textContent = "Selecione e copie";
  }
  setTimeout(() => { btn.textContent = "Copiar"; }, 2000);
});

// Tabs: setas, Home e End.
$$(".tabs").forEach((tabs) => {
  const list = $$('[role="tab"]', tabs);
  function select(tab) {
    list.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      $(`#${t.getAttribute("aria-controls")}`).hidden = !on;
    });
    tab.focus();
  }
  list.forEach((tab, i) => {
    tab.addEventListener("click", () => select(tab));
    tab.addEventListener("keydown", (e) => {
      const n = list.length;
      const next = { ArrowRight: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
      if (next === undefined) return;
      e.preventDefault();
      select(list[next]);
    });
  });
});

/* ---------- animações sob demanda ---------- */
function countUp(el) {
  const target = Number(el.dataset.count);
  const accent = $(".giant__accent", el);
  const steps = reduced.matches ? 1 : 12;
  let i = 0;
  const tick = () => {
    i += 1;
    const text = Math.round((target * i) / steps).toLocaleString("pt-BR").padStart(2, "0");
    el.firstChild.textContent = `R$ ${text.slice(0, -2)}`;
    accent.textContent = text.slice(-2);
    if (i < steps) setTimeout(tick, 60);
  };
  tick();
}

let toastN = 0;
function toast() {
  const box = document.createElement("div");
  box.className = "toast is-in";
  const wrap = document.createElement("div");
  const kicker = document.createElement("span");
  kicker.className = "toast__kicker";
  kicker.textContent = "salvo";
  const title = document.createElement("span");
  title.className = "toast__title";
  title.textContent = `Gasto #${++toastN} adicionado`;
  wrap.append(kicker, title);
  box.append(wrap);
  const stack = $("#toasts");
  stack.prepend(box);
  while (stack.children.length > 3) stack.lastChild.remove();
  setTimeout(() => {
    if (reduced.matches) return box.remove();
    box.classList.add("is-out");
    box.addEventListener("animationend", () => box.remove(), { once: true });
  }, 4000);
}

function showAlert() {
  const slot = $("#alert-slot");
  const copy = $("#alert .alert--warn").cloneNode(true);
  slot.replaceChildren(copy);
  replayClass(copy, "is-in");
  $(".alert__close", copy).addEventListener("click", () => copy.remove());
}

let progress = 10;
function advance() {
  const bar = $("#prog-demo");
  progress = progress >= 100 ? 10 : Math.min(progress + 30, 100);
  bar.style.setProperty("--v", `${progress}%`);
  bar.setAttribute("aria-valuenow", progress);
  $(".progress__label", bar).textContent = `${progress}%`;
}
function work() {
  const bar = $("#indet-demo");
  if (bar.classList.contains("is-busy")) return;
  bar.classList.add("is-busy");
  setTimeout(() => bar.classList.remove("is-busy"), 2000);
}

const LINES = [["noemi", "Mercado ficou em R$ 1.240 este mês."], ["você", "Tá dentro do orçamento?"], ["noemi", "Tá: sobram R$ 160."]];
let lineN = 0;
function chat() {
  const [who, text] = LINES[lineN++ % LINES.length];
  const p = document.createElement("p");
  p.className = `balloon sk${who === "você" ? " balloon--user" : ""}`;
  const name = document.createElement("span");
  name.className = "balloon__who";
  name.textContent = `${who} · agora`;
  p.append(name, text);
  $("#chat-demo").append(p);
  replayClass(p, "is-pop");
}

let viewB = false;
function swapView() {
  viewB = !viewB;
  const view = document.createElement("div");
  view.className = `stage__view${viewB ? " stage__view--b" : ""}`;
  view.textContent = viewB ? "Tela B" : "Tela A";
  $("#stage").replaceChildren(view);
  replayClass(view, "is-in");
}
function iris() {
  if (reduced.matches) return swapView();
  const hole = document.createElement("div");
  hole.className = "iris is-close";
  $("#stage").append(hole);
  hole.addEventListener("animationend", () => {
    swapView();
    const open = document.createElement("div");
    open.className = "iris is-open";
    $("#stage").append(open);
    open.addEventListener("animationend", () => open.remove(), { once: true });
  }, { once: true });
}

const REPLAY = {
  count: () => countUp($("[data-count]")),
  stamp: () => replayClass($("#stamp-demo"), "is-thunk"),
  alert: showAlert,
  telegram: () => replayClass($("#tg-demo"), "is-typing"),
  toast,
  progress: advance,
  indet: work,
  chat,
  swap: swapView,
  iris,
};
$$("[data-replay]").forEach((btn) => {
  btn.addEventListener("click", () => REPLAY[btn.dataset.replay]?.());
});
// O telegrama datilografa uma vez quando entra na tela pela primeira vez.
new IntersectionObserver((entries, obs) => {
  if (!entries[0].isIntersecting) return;
  if (!reduced.matches) replayClass($("#tg-demo"), "is-typing");
  obs.disconnect();
}).observe($("#tg-demo"));

/* ---------- textura de filme: pinta uma vez (e na troca de tema) ---------- */
function paintGrain() {
  const canvas = $("#grain");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = getComputedStyle($(".film")).color;
  for (let i = 0; i < 2600; i++) {
    ctx.globalAlpha = Math.random() * 0.12;
    ctx.fillRect(Math.random() * 320, Math.random() * 200, 1, 1);
  }
}

/* ---------- realce do CSS base (nós, sem innerHTML) ---------- */
function span(cls, text) {
  const el = document.createElement("span");
  el.className = cls;
  el.textContent = text;
  return el;
}
const TOKEN = /(\/\*.*?\*\/)|("[^"]*")|(-?\d*\.?\d+(?:px|ms|deg|%|em|s|vmax)?)|([^"/\d-]+|.)/g;
function paintValue(out, text) {
  for (const [, c, q, n, rest] of text.matchAll(TOKEN)) {
    if (c) out.append(span("c", c));
    else if (q) out.append(span("q", q));
    else if (n) out.append(span("n", n));
    else out.append(rest);
  }
}
$$("code.css").forEach((code) => {
  const lines = code.textContent.split("\n");
  code.textContent = "";
  lines.forEach((line, i) => {
    const prop = line.match(/^(\s+)([a-z-]+)(:)(.*)$/);
    if (/^\s*\/\*.*\*\/\s*$/.test(line)) code.append(span("c", line));
    else if (prop) {
      code.append(prop[1], span("k", prop[2]), prop[3]);
      paintValue(code, prop[4]);
    } else if (line.includes("{")) {
      const [sel, ...rest] = line.split("{");
      code.append(span("s", sel.trimEnd()), " {");
      paintValue(code, rest.join("{"));
    } else paintValue(code, line);
    if (i < lines.length - 1) code.append("\n");
  });
});

/* ---------- sidebar marca a seção visível ---------- */
const links = new Map($$(".toc a").map((a) => [a.hash.slice(1), a]));
const seen = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    links.forEach((a) => a.removeAttribute("aria-current"));
    links.get(e.target.id)?.setAttribute("aria-current", "true");
  });
}, { rootMargin: "-20% 0px -70% 0px" });
$$(".comp").forEach((s) => seen.observe(s));

/* ===== dropdown-menu ===== */
/* ---------- menus (dropdown, context menu, menubar): teclado WAI-ARIA ---------- */
// Compartilhado: context-menu.js e menubar.js usam bMenuNav e bMenuOpen.
const bFold = (s) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
function bMenuItems(menu) {
  return $$('[role^="menuitem"]', menu);
}
function bMenuOpen(menu, which = "first") {
  menu.hidden = false;
  if (!reduced.matches) replayClass(menu, "is-in");
  const items = bMenuItems(menu);
  items[which === "last" ? items.length - 1 : 0]?.focus();
}
// close(voltaFoco), pick(item), side(+1|-1) para o menubar
function bMenuNav(menu, { close, pick, side }) {
  bMenuItems(menu).forEach((item) => { item.tabIndex = -1; });
  function activate(item) {
    if (!item || item.getAttribute("aria-disabled") === "true") return;
    const role = item.getAttribute("role");
    if (role === "menuitemcheckbox") {
      item.setAttribute("aria-checked", String(item.getAttribute("aria-checked") !== "true"));
      return pick?.(item);
    }
    if (role === "menuitemradio") {
      const group = item.closest('[role="group"]') || menu;
      $$('[role="menuitemradio"]', group).forEach((r) => r.setAttribute("aria-checked", String(r === item)));
      return pick?.(item);
    }
    pick?.(item);
    close(true);
  }
  menu.addEventListener("keydown", (e) => {
    const items = bMenuItems(menu);
    const n = items.length;
    const i = items.indexOf(document.activeElement);
    const go = (j) => { e.preventDefault(); items[(j + n) % n].focus(); };
    if (e.key === "ArrowDown") return go(i + 1);
    if (e.key === "ArrowUp") return go(i - 1);
    if (e.key === "Home") return go(0);
    if (e.key === "End") return go(n - 1);
    if (e.key === "Tab") return close(false);
    if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); return close(true); }
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); return activate(items[i]); }
    if ((e.key === "ArrowLeft" || e.key === "ArrowRight") && side) {
      e.preventDefault();
      return side(e.key === "ArrowRight" ? 1 : -1);
    }
    if (e.key.length === 1 && /\S/.test(e.key) && !e.ctrlKey && !e.metaKey) {
      const k = bFold(e.key);
      for (let s = 1; s <= n; s++) {
        const item = items[(i + s) % n];
        if (bFold(item.textContent.trim()).startsWith(k)) return go(items.indexOf(item));
      }
    }
  });
  menu.addEventListener("click", (e) => activate(e.target.closest('[role^="menuitem"]')));
  // hover = foco: um destaque só
  menu.addEventListener("pointermove", (e) => {
    const item = e.target.closest('[role^="menuitem"]');
    if (item && item !== document.activeElement) item.focus();
  });
}

{
  const sec = $("#dropdown-menu");
  const status = sec && $("[data-dd-status]", sec);
  sec && $$(".dd", sec).forEach((dd) => {
    const trigger = $("[aria-haspopup]", dd);
    const menu = $(".menu", dd);
    if (!trigger || !menu) return;
    const close = (back) => {
      if (menu.hidden) return;
      menu.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
      if (back) trigger.focus();
    };
    const open = (which) => {
      trigger.setAttribute("aria-expanded", "true");
      bMenuOpen(menu, which);
    };
    bMenuNav(menu, {
      close,
      pick: (item) => {
        const label = $(".menu__text", item)?.textContent || item.textContent.trim();
        const on = item.hasAttribute("aria-checked") ? (item.getAttribute("aria-checked") === "true" ? " (ligado)" : " (desligado)") : "";
        if (status) status.textContent = `Escolhido: ${label}${on}`;
      },
    });
    trigger.addEventListener("click", () => (menu.hidden ? open("first") : close(true)));
    trigger.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      e.preventDefault();
      open(e.key === "ArrowUp" ? "last" : "first");
    });
    document.addEventListener("pointerdown", (e) => { if (!dd.contains(e.target)) close(false); });
  });
}

/* ===== pagination ===== */
/* ---------- pagination: no máximo 7 caixas, foco fica no controle usado ---------- */
// Reusada pela data-table: desenha a paginação de `total` páginas em `list`.
function pagerPages(page, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const set = new Set([1, total, page - 1, page, page + 1].filter((p) => p >= 1 && p <= total));
  if (page <= 3) [2, 3, 4].forEach((p) => set.add(p));
  if (page >= total - 2) [total - 3, total - 2, total - 1].forEach((p) => set.add(p));
  const out = [];
  [...set].sort((a, b) => a - b).forEach((p, i, arr) => {
    if (i && p - arr[i - 1] > 1) out.push(null);
    out.push(p);
  });
  return out;
}
function renderPager(list, page, total, go) {
  const had = list.contains(document.activeElement) ? document.activeElement.dataset.go : null;
  const make = (label, target, opts = {}) => {
    const li = document.createElement("li");
    const b = document.createElement("button");
    b.type = "button";
    b.className = `pager__btn${opts.edge ? " pager__btn--edge" : ""}`;
    const arrow = document.createElement("span");
    arrow.className = "pager__arrow";
    arrow.setAttribute("aria-hidden", "true");
    if (opts.key === "prev") { arrow.textContent = "←"; b.append(arrow, label); }
    else if (opts.key === "next") { arrow.textContent = "→"; b.append(label, arrow); }
    else b.textContent = label;
    b.dataset.go = opts.key || String(target);
    b.setAttribute("aria-label", opts.name || `Página ${target}`);
    if (opts.current) b.setAttribute("aria-current", "page");
    if (opts.off) b.setAttribute("aria-disabled", "true");
    b.addEventListener("click", () => { if (!opts.off && !opts.current) go(target); });
    li.append(b);
    return li;
  };
  const items = [make("Anterior", page - 1, { edge: true, key: "prev", name: "Página anterior", off: page === 1 })];
  pagerPages(page, total).forEach((p) => {
    if (p === null) {
      const li = document.createElement("li");
      li.className = "pager__gap";
      li.setAttribute("aria-hidden", "true");
      li.textContent = "…";
      items.push(li);
    } else items.push(make(String(p), p, { current: p === page }));
  });
  items.push(make("Próxima", page + 1, { edge: true, key: "next", name: "Próxima página", off: page === total }));
  list.replaceChildren(...items);
  if (had) (list.querySelector(`[data-go="${had}"]`) || list.querySelector("[aria-current]"))?.focus();
}
{
  const nav = $("#pager-demo");
  if (nav) {
    const TOTAL = 12;
    const go = (page) => {
      renderPager($("ul", nav), page, TOTAL, go);
      $(".pager__sum", nav).textContent = `${(page - 1) * 20 + 1}–${Math.min(page * 20, 231)} de 231`;
    };
    go(1);
  }
}

/* ===== calendar ===== */
/* ---------- calendar: grade do mês (domingo primeiro), padrão grid do WAI-ARIA ---------- */
// Declaração de função de topo: içada, o date-picker pode chamar mesmo vindo antes.
function noemiCalendar(el, opts = {}) {
  const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  const DIAS = [["D", "domingo"], ["S", "segunda"], ["T", "terça"], ["Q", "quarta"], ["Q", "quinta"], ["S", "sexta"], ["S", "sábado"]];
  const day0 = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const same = (a, b) => Boolean(a && b) && iso(a) === iso(b);
  const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  const addMonths = (d, n) => {
    const t = new Date(d.getFullYear(), d.getMonth() + n, 1);
    const last = new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate();
    return new Date(t.getFullYear(), t.getMonth(), Math.min(d.getDate(), last));
  };
  const today = day0(new Date());
  const marks = opts.marks || {};
  let sel = opts.selected || null;
  let start = opts.start || null;
  let end = opts.end || null;
  let focusDate = sel || start || opts.month || today;
  let view = new Date(focusDate.getFullYear(), focusDate.getMonth(), 1);
  const blocked = (d) => (opts.min && d < opts.min) || (opts.max && d > opts.max);

  const uid = `cal-${Math.random().toString(36).slice(2, 8)}`;
  el.setAttribute("role", "group");
  const head = document.createElement("div");
  head.className = "cal__head";
  const arrow = (label, path) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "btn btn--neutral btn--sm btn--icon btn--flat";
    b.setAttribute("aria-label", label);
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 20 20");
    svg.setAttribute("aria-hidden", "true");
    const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    p.setAttribute("d", path);
    p.setAttribute("fill", "none");
    p.setAttribute("stroke", "currentColor");
    p.setAttribute("stroke-width", "3");
    svg.append(p);
    b.append(svg);
    return b;
  };
  const prev = arrow("Mês anterior", "M12 4l-6 6 6 6");
  const next = arrow("Próximo mês", "M8 4l6 6-6 6");
  const title = document.createElement("h3");
  title.className = "cal__title";
  title.id = `${uid}-t`;
  title.setAttribute("aria-live", "polite");
  head.append(prev, title, next);

  const table = document.createElement("table");
  table.className = "cal__grid";
  table.setAttribute("role", "grid");
  table.setAttribute("aria-labelledby", title.id);
  const thead = document.createElement("thead");
  const hr = document.createElement("tr");
  DIAS.forEach(([short, long]) => {
    const th = document.createElement("th");
    th.scope = "col";
    const abbr = document.createElement("abbr");
    abbr.title = long;
    abbr.textContent = short;
    th.append(abbr);
    hr.append(th);
  });
  thead.append(hr);
  const tbody = document.createElement("tbody");
  table.append(thead, tbody);
  el.replaceChildren(head, table);

  function render(dir = 0) {
    title.textContent = `${MESES[view.getMonth()][0].toUpperCase()}${MESES[view.getMonth()].slice(1)} ${view.getFullYear()}`;
    const first = addDays(view, -view.getDay());
    const rows = [];
    // Sempre 6 semanas: o calendário não muda de altura entre meses.
    for (let w = 0; w < 6; w++) {
      const tr = document.createElement("tr");
      for (let i = 0; i < 7; i++) {
        const d = addDays(first, w * 7 + i);
        const td = document.createElement("td");
        const b = document.createElement("button");
        b.type = "button";
        b.className = "cal__day";
        b.dataset.date = iso(d);
        b.textContent = d.getDate();
        b.tabIndex = same(d, focusDate) ? 0 : -1;
        b.setAttribute("aria-label", `${d.getDate()} de ${MESES[d.getMonth()]} de ${d.getFullYear()}, ${DIAS[d.getDay()][1]}`);
        if (d.getMonth() !== view.getMonth()) b.classList.add("is-out");
        if (same(d, today)) b.setAttribute("aria-current", "date");
        if (marks[iso(d)]) b.dataset.mark = marks[iso(d)];
        if (blocked(d)) b.disabled = true;
        const picked = same(d, sel) || same(d, start) || same(d, end);
        if (same(d, sel)) b.classList.add("is-sel");
        if (same(d, start)) b.classList.add("is-start");
        if (same(d, end)) b.classList.add("is-end");
        if (start && end && d > start && d < end) b.classList.add("is-range");
        td.setAttribute("aria-selected", String(picked || b.classList.contains("is-range")));
        td.append(b);
        tr.append(td);
      }
      rows.push(tr);
    }
    tbody.replaceChildren(...rows);
    if (dir && !reduced.matches) replayClass(table, dir > 0 ? "is-in" : "is-in-back");
  }
  function moveTo(d) {
    if (blocked(d)) return;
    const dir = d.getFullYear() * 12 + d.getMonth() - (view.getFullYear() * 12 + view.getMonth());
    focusDate = d;
    if (dir) view = new Date(d.getFullYear(), d.getMonth(), 1);
    render(Math.sign(dir));
    $(`[data-date="${iso(d)}"]`, tbody).focus();
  }
  function pick(d) {
    if (opts.range) {
      if (!start || end || d < start) { start = d; end = null; } else end = d;
    } else sel = d;
    focusDate = d;
    const dir = d.getMonth() !== view.getMonth() ? Math.sign(d - view) : 0;
    if (dir) view = new Date(d.getFullYear(), d.getMonth(), 1);
    render(dir);
    const b = $(`[data-date="${iso(d)}"]`, tbody);
    b.focus();
    if (!reduced.matches) replayClass(b, "is-pick");
    opts.onSelect?.(opts.range ? { start, end } : sel);
  }
  prev.addEventListener("click", () => { view = addMonths(view, -1); focusDate = addMonths(focusDate, -1); render(-1); });
  next.addEventListener("click", () => { view = addMonths(view, 1); focusDate = addMonths(focusDate, 1); render(1); });
  tbody.addEventListener("click", (e) => {
    const b = e.target.closest(".cal__day");
    if (b && !b.disabled) pick(new Date(`${b.dataset.date}T00:00`));
  });
  tbody.addEventListener("keydown", (e) => {
    const b = e.target.closest(".cal__day");
    if (!b) return;
    const d = new Date(`${b.dataset.date}T00:00`);
    const to = {
      ArrowLeft: () => addDays(d, -1), ArrowRight: () => addDays(d, 1),
      ArrowUp: () => addDays(d, -7), ArrowDown: () => addDays(d, 7),
      Home: () => addDays(d, -d.getDay()), End: () => addDays(d, 6 - d.getDay()),
      PageUp: () => addMonths(d, e.shiftKey ? -12 : -1), PageDown: () => addMonths(d, e.shiftKey ? 12 : 1),
    }[e.key];
    if (!to) return;
    e.preventDefault();
    moveTo(to());
  });
  render();
  return {
    focus: () => $('.cal__day[tabindex="0"]', tbody)?.focus(),
    set(value) {
      if (opts.range) ({ start, end } = value);
      else sel = value;
      focusDate = (opts.range ? start : sel) || today;
      view = new Date(focusDate.getFullYear(), focusDate.getMonth(), 1);
      render();
    },
  };
}
{
  const parse = (s) => (s ? new Date(`${s}T00:00`) : null);
  const br = (d) => d.toLocaleDateString("pt-BR");
  $$("#calendar [data-cal]").forEach((el) => {
    const marks = Object.fromEntries((el.dataset.marks || "").split(",").filter(Boolean).map((m) => m.split(":")));
    const [y, m] = (el.dataset.month || "").split("-").map(Number);
    const out = $("#cal-b-out");
    noemiCalendar(el, {
      range: el.dataset.cal === "range",
      month: y ? new Date(y, m - 1, 1) : null,
      selected: parse(el.dataset.selected),
      start: parse(el.dataset.start),
      end: parse(el.dataset.end),
      min: parse(el.dataset.min),
      marks,
      onSelect: (v) => {
        if (el.dataset.cal !== "range") return;
        out.textContent = v.end ? `${br(v.start)} a ${br(v.end)}` : `${br(v.start)} a …  (escolha o fim)`;
      },
    });
  });
}

/* ===== resizable ===== */
/* ---------- resizable: separator com ponteiro e teclado ---------- */
{
  $$("#resizable [data-split]").forEach((split) => {
    const handle = $(".split__handle", split);
    const col = split.classList.contains("split--col");
    const min = Number(handle.getAttribute("aria-valuemin"));
    const max = Number(handle.getAttribute("aria-valuemax"));
    const initial = Number(handle.getAttribute("aria-valuenow"));
    let last = initial;
    const set = (v, snap = false) => {
      const val = v === 0 ? 0 : Math.round(Math.min(max, Math.max(min, v)));
      if (snap && !reduced.matches) {
        split.classList.add("is-snap");
        setTimeout(() => split.classList.remove("is-snap"), 150);
      }
      split.style.setProperty("--split", `${val}%`);
      handle.setAttribute("aria-valuenow", String(val));
    };
    const now = () => Number(handle.getAttribute("aria-valuenow"));

    handle.addEventListener("pointerdown", (e) => {
      handle.setPointerCapture(e.pointerId);
      split.classList.add("is-drag");
    });
    handle.addEventListener("pointermove", (e) => {
      if (!handle.hasPointerCapture(e.pointerId)) return;
      const box = split.getBoundingClientRect();
      set(col ? ((e.clientY - box.top) / box.height) * 100 : ((e.clientX - box.left) / box.width) * 100);
    });
    const end = () => split.classList.remove("is-drag");
    handle.addEventListener("pointerup", end);
    handle.addEventListener("lostpointercapture", end);
    handle.addEventListener("dblclick", () => set(initial, true));

    handle.addEventListener("keydown", (e) => {
      const step = e.shiftKey ? 20 : 5;
      const back = col ? "ArrowUp" : "ArrowLeft";
      const fwd = col ? "ArrowDown" : "ArrowRight";
      if (e.key === back) set(now() - step);
      else if (e.key === fwd) set(now() + step);
      else if (e.key === "Home") set(min);
      else if (e.key === "End") set(max);
      else if (e.key === "Enter") {
        if (now() === 0) set(last, true);
        else { last = now(); set(0, true); }
      } else return;
      e.preventDefault();
    });
  });
}

/* ===== breadcrumb ===== */
/* ---------- breadcrumb: o "…" mostra o caminho inteiro ---------- */
{
  const more = $("#crumbs-demo .crumbs__more");
  more?.addEventListener("click", () => {
    const li = more.closest("li");
    const hidden = $$("li[hidden]", li.parentElement);
    hidden.forEach((h) => { h.hidden = false; });
    li.remove();
    $("a", hidden[0])?.focus();
  });
}

/* ===== sidebar ===== */
/* ---------- sidebar: recolhe pra ícones, lembra a escolha ---------- */
{
  const bar = $("#sbar-demo");
  const btn = $("[data-sbar=toggle]", bar || document);
  if (bar && btn) {
    const set = (collapsed) => {
      bar.classList.toggle("is-collapsed", collapsed);
      btn.setAttribute("aria-expanded", String(!collapsed));
      btn.setAttribute("aria-label", collapsed ? "Expandir menu" : "Recolher menu");
    };
    set(store("noemi-sbar") === true);
    btn.addEventListener("click", () => {
      const collapsed = !bar.classList.contains("is-collapsed");
      set(collapsed);
      store("noemi-sbar", collapsed);
    });
  }
}

/* ===== menubar ===== */
/* ---------- menubar (usa bMenuNav/bMenuOpen do dropdown-menu.js) ---------- */
{
  const bar = $("#menubar .mbar[role=\"menubar\"]");
  if (bar) {
    const tops = $$(".mbar__top", bar);
    const menus = tops.map((t) => $(`#${t.getAttribute("aria-controls")}`));
    const status = $("[data-mbar-status]", bar.closest("section"));
    let current = -1;
    const roving = (i) => tops.forEach((t, j) => { t.tabIndex = j === i ? 0 : -1; });
    const shut = () => {
      if (current < 0) return;
      menus[current].hidden = true;
      tops[current].setAttribute("aria-expanded", "false");
      current = -1;
    };
    const open = (i, which, intoMenu = true) => {
      const first = current < 0;
      shut();
      current = i;
      roving(i);
      tops[i].setAttribute("aria-expanded", "true");
      if (intoMenu) bMenuOpen(menus[i], which);
      else menus[i].hidden = false;
      if (first && !reduced.matches) replayClass(menus[i], "is-in");
      else menus[i].classList.remove("is-in");
      if (!intoMenu) tops[i].focus();
    };
    tops.forEach((top, i) => {
      bMenuNav(menus[i], {
        close: (back) => { shut(); if (back) top.focus(); },
        side: (dir) => open((i + dir + tops.length) % tops.length, "first"),
        pick: (item) => {
          const on = item.hasAttribute("aria-checked") ? ` → ${item.getAttribute("aria-checked") === "true" ? "sim" : "não"}` : "";
          if (status) status.textContent = `${top.textContent} › ${$(".menu__text", item).textContent}${on}`;
        },
      });
      top.addEventListener("click", () => (current === i ? shut() : open(i, "first")));
      top.addEventListener("pointerenter", () => { if (current >= 0 && current !== i) open(i, "first", false); });
      top.addEventListener("keydown", (e) => {
        const n = tops.length;
        const move = { ArrowRight: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
        if (move !== undefined) {
          e.preventDefault();
          if (current >= 0) return open(move, "first");
          roving(move);
          return tops[move].focus();
        }
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault();
          open(i, e.key === "ArrowUp" ? "last" : "first");
        }
        if (e.key === "Escape") shut();
      });
    });
    roving(0);
    document.addEventListener("pointerdown", (e) => { if (!bar.contains(e.target)) shut(); });
  }
}

/* ===== button-group ===== */
/* ---------- button-group: split button com menu (setas, Esc, clique fora) ---------- */
{
  const wrap = $("#button-group #bgrp-split");
  const caret = $(".bgrp__caret", wrap);
  const menu = $(".bgrp__menu", wrap);
  const items = $$('[role="menuitem"]', menu);
  const status = $("#button-group #bgrp-status");

  function open(first = 0) {
    menu.hidden = false;
    caret.setAttribute("aria-expanded", "true");
    if (!reduced.matches) replayClass(menu, "is-in");
    items.at(first).focus();
  }
  function close(focusBack = true) {
    if (menu.hidden) return;
    menu.hidden = true;
    caret.setAttribute("aria-expanded", "false");
    if (focusBack) caret.focus();
  }
  caret.addEventListener("click", () => (menu.hidden ? open() : close()));
  caret.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      open(e.key === "ArrowDown" ? 0 : -1);
    }
  });
  items.forEach((item, i) => {
    item.addEventListener("keydown", (e) => {
      const n = items.length;
      const to = { ArrowDown: (i + 1) % n, ArrowUp: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
      if (to !== undefined) {
        e.preventDefault();
        items[to].focus();
      } else if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "Tab") close(false);
    });
    item.addEventListener("click", () => {
      status.textContent = `${item.textContent}: feito.`;
      close();
    });
  });
  $("#button-group #bgrp-save").addEventListener("click", () => { status.textContent = "Gasto salvo."; });
  document.addEventListener("pointerdown", (e) => {
    if (!wrap.contains(e.target)) close(false);
  });
}

/* ===== toggle ===== */
/* ---------- toggle: liga/desliga; grupo com roving tabindex ---------- */
{
  $$("#toggle [data-tgl]").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("aria-pressed") !== "true"));
    });
  });
  $$("#toggle [data-tgg]").forEach((group) => {
    const items = $$(".tgg__item", group);
    const single = group.dataset.tgg === "single";
    function focusItem(item) {
      items.forEach((it) => { it.tabIndex = it === item ? 0 : -1; });
      item.focus();
    }
    function choose(item) {
      if (single) items.forEach((it) => it.setAttribute("aria-checked", String(it === item)));
      else item.setAttribute("aria-pressed", String(item.getAttribute("aria-pressed") !== "true"));
    }
    items.forEach((item, i) => {
      item.addEventListener("click", () => { choose(item); focusItem(item); });
      item.addEventListener("keydown", (e) => {
        const n = items.length;
        const to = { ArrowRight: (i + 1) % n, ArrowDown: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, ArrowUp: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
        if (to === undefined) return;
        e.preventDefault();
        focusItem(items[to]);
        // Escolha única segue o padrão radio: andar = escolher. Várias: andar só move o foco.
        if (single) choose(items[to]);
      });
    });
  });
}

/* ===== field ===== */
/* ---------- field: validação no envio, resumo com links, erro por campo ---------- */
{
  const form = $("#field #fm-demo");
  const summary = $(".fm__summary", form);
  const RULES = {
    desc: (v) => (v.trim() ? "" : "Diga o que é a conta (ex.: Internet)."),
    valor: (v) => (/^\d{1,3}(\.?\d{3})*(,\d{2})?$/.test(v.trim()) ? "" : "Use números com vírgula: 189,90."),
    venc: (v) => {
      const m = v.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
      if (!m) return "Use dd/mm/aaaa, ex.: 20/11/2026.";
      const d = new Date(+m[3], m[2] - 1, +m[1]);
      return d.getDate() === +m[1] && d.getMonth() === m[2] - 1 ? "" : "Essa data não existe.";
    },
  };
  function setError(input, msg) {
    const field = input.closest(".field");
    const err = $(".field__error", field);
    input.setAttribute("aria-invalid", String(Boolean(msg)));
    err.textContent = msg;
    err.hidden = !msg;
    if (msg && !reduced.matches) replayClass(field, "is-err-in");
  }
  function check(input) {
    const msg = RULES[input.name]?.(input.value) || "";
    setError(input, msg);
    return msg;
  }
  // Depois do primeiro erro, o campo se corrige ao sair dele (nunca enquanto digita).
  Object.keys(RULES).forEach((name) => {
    const input = form.elements[name];
    input.addEventListener("blur", () => {
      if (input.getAttribute("aria-invalid") === "true") check(input);
    });
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const bad = Object.keys(RULES).map((n) => form.elements[n]).filter((input) => check(input));
    const list = $("ul", summary);
    list.replaceChildren();
    if (!bad.length) {
      summary.hidden = true;
      const btn = $('[type="submit"]', form);
      btn.textContent = "Salvo";
      setTimeout(() => { btn.textContent = "Salvar conta"; }, 1500);
      return;
    }
    bad.forEach((input) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `#${input.id}`;
      a.textContent = `${$(`label[for="${input.id}"]`, form).firstChild.textContent.trim()}: ${$(".field__error", input.closest(".field")).textContent}`;
      a.addEventListener("click", (ev) => { ev.preventDefault(); input.focus(); });
      li.append(a);
      list.append(li);
    });
    $("h3", summary).textContent = bad.length === 1 ? "Corrija 1 campo" : `Corrija ${bad.length} campos`;
    summary.hidden = false;
    summary.focus();
    if (!reduced.matches) {
      replayClass(summary, "is-in");
      bad.forEach((input) => replayClass(input, "fm__shake"));
    }
  });
  form.addEventListener("reset", () => {
    summary.hidden = true;
    Object.keys(RULES).forEach((n) => setError(form.elements[n], ""));
  });
}

/* ===== input-group ===== */
/* ---------- input-group: cupom com botão embutido ---------- */
{
  const input = $("#input-group #ig-demo");
  const msg = $("#input-group #ig-demo-msg");
  function apply() {
    const code = input.value.trim().toUpperCase();
    const ok = code === "MERCADO10";
    input.setAttribute("aria-invalid", String(!ok));
    msg.className = ok ? "field__ok" : "field__error";
    msg.textContent = ok ? "Cupom aplicado: 10% no mercado." : code ? "Cupom não existe ou venceu." : "Digite um cupom.";
    if (!ok && !reduced.matches) replayClass(input.closest(".ig"), "is-shake");
  }
  $("#input-group #ig-demo-btn").addEventListener("click", apply);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") apply(); });
}

/* ===== input-otp ===== */
/* ---------- input-otp: avança sozinho, Backspace volta, colar preenche tudo ---------- */
{
  const box = $("#input-otp #otp-demo");
  const cells = $$(".otp__cell", box);
  const msg = $("#otp-msg", box);
  const HELP = msg.textContent;
  const CODE = "482915";
  let tries = 3;

  function setState(state, text) {
    box.classList.toggle("is-error", state === "error");
    box.classList.toggle("is-ok", state === "ok");
    cells.forEach((c) => c.setAttribute("aria-invalid", String(state === "error")));
    msg.textContent = text;
  }
  function verify() {
    const code = cells.map((c) => c.value).join("");
    if (code.length < cells.length) return;
    if (code === CODE) {
      setState("ok", "Pronto, conta confirmada.");
      cells.forEach((c) => { c.disabled = true; });
      return;
    }
    tries -= 1;
    setState("error", tries > 0 ? `Código não confere. Restam ${tries} tentativas.` : "Acabaram as tentativas. Peça outro código.");
    if (!reduced.matches) replayClass(box, "is-shake");
    if (tries <= 0) cells.forEach((c) => { c.disabled = true; });
  }
  function fill(from, digits) {
    let i = from;
    for (const d of digits) {
      if (i >= cells.length) break;
      cells[i].value = d;
      if (!reduced.matches) replayClass(cells[i], "is-pop");
      i += 1;
    }
    cells[Math.min(i, cells.length - 1)].focus();
    verify();
  }
  cells.forEach((cell, i) => {
    cell.addEventListener("focus", () => cell.select());
    cell.addEventListener("input", (e) => {
      // Digitou: vale o caractere novo (e.data); autocompletar do SMS: o valor todo.
      const digits = (e.data ?? cell.value).replace(/\D/g, "");
      cell.value = "";
      if (box.classList.contains("is-error")) setState("", HELP);
      if (digits) fill(i, digits);
    });
    cell.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !cell.value && i > 0) {
        e.preventDefault();
        cells[i - 1].value = "";
        cells[i - 1].focus();
      } else if (e.key === "ArrowLeft" && i > 0) {
        e.preventDefault();
        cells[i - 1].focus();
      } else if (e.key === "ArrowRight" && i < cells.length - 1) {
        e.preventDefault();
        cells[i + 1].focus();
      } else if (e.key === "Home" || e.key === "End") {
        e.preventDefault();
        cells[e.key === "Home" ? 0 : cells.length - 1].focus();
      }
    });
    cell.addEventListener("paste", (e) => {
      e.preventDefault();
      const digits = (e.clipboardData?.getData("text") || "").replace(/\D/g, "");
      if (!digits) return;
      if (box.classList.contains("is-error")) setState("", HELP);
      fill(digits.length >= cells.length ? 0 : i, digits);
    });
  });
  $("#otp-reset", box).addEventListener("click", () => {
    tries = 3;
    cells.forEach((c) => { c.disabled = false; c.value = ""; });
    setState("", "Código novo enviado para (34) •••••-1234.");
    cells[0].focus();
  });
}

/* ===== select ===== */
/* ---------- select custom: combobox só-seleção (foco fica no botão) ---------- */
{
  const sec = $("#select");
  const bFoldSel = (s) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
  sec && $$(".sel[data-live]", sec).forEach((sel) => {
    const btn = $(".sel__btn", sel);
    const list = $(".lbx", sel);
    const hidden = $("input[type=hidden]", sel);
    const opts = $$('[role="option"]', list).filter((o) => o.getAttribute("aria-disabled") !== "true");
    let active = -1;
    const isOpen = () => !list.hidden;
    const selectedIndex = () => opts.findIndex((o) => o.getAttribute("aria-selected") === "true");
    const setActive = (i) => {
      active = Math.max(0, Math.min(opts.length - 1, i));
      opts.forEach((o, j) => o.classList.toggle("is-focus", j === active));
      btn.setAttribute("aria-activedescendant", opts[active].id);
      opts[active].scrollIntoView({ block: "nearest" });
    };
    const open = () => {
      if (isOpen()) return;
      list.hidden = false;
      btn.setAttribute("aria-expanded", "true");
      if (!reduced.matches) replayClass(list, "is-in");
      setActive(Math.max(0, selectedIndex()));
    };
    const close = () => {
      list.hidden = true;
      btn.setAttribute("aria-expanded", "false");
      btn.removeAttribute("aria-activedescendant");
    };
    const choose = (i) => {
      const opt = opts[i];
      opts.forEach((o) => o.setAttribute("aria-selected", String(o === opt)));
      const dot = $(".lbx__dot", opt)?.cloneNode(true);
      const text = document.createElement("span");
      text.textContent = $(".sel__text", opt).textContent;
      btn.replaceChildren(...(dot ? [dot, text] : [text]));
      if (hidden) hidden.value = opt.dataset.value;
    };
    const typeahead = (key) => {
      const k = bFoldSel(key);
      const from = isOpen() ? active : selectedIndex();
      for (let s = 1; s <= opts.length; s++) {
        const i = (from + s) % opts.length;
        if (bFoldSel(opts[i].textContent.trim()).startsWith(k)) return i;
      }
      return -1;
    };
    btn.addEventListener("click", () => (isOpen() ? close() : open()));
    btn.addEventListener("keydown", (e) => {
      const k = e.key;
      if (!isOpen()) {
        if (k === "ArrowDown" || k === "ArrowUp" || k === "Enter" || k === " ") { e.preventDefault(); open(); }
        else if (k.length === 1 && /\S/.test(k)) { const i = typeahead(k); if (i >= 0) choose(i); }
        return;
      }
      const move = { ArrowDown: active + 1, ArrowUp: active - 1, Home: 0, End: opts.length - 1, PageDown: active + 5, PageUp: active - 5 }[k];
      if (move !== undefined) { e.preventDefault(); return setActive(move); }
      if (k === "Enter" || k === " ") { e.preventDefault(); choose(active); return close(); }
      if (k === "Escape") { e.preventDefault(); return close(); }
      if (k === "Tab") { choose(active); return close(); }
      if (k.length === 1 && /\S/.test(k)) { const i = typeahead(k); if (i >= 0) setActive(i); }
    });
    opts.forEach((o, i) => {
      o.addEventListener("pointerdown", (e) => e.preventDefault()); // foco fica no botão
      o.addEventListener("pointermove", () => { if (active !== i) setActive(i); });
      o.addEventListener("click", () => { choose(i); close(); btn.focus(); });
    });
    btn.addEventListener("blur", close);
  });
}

/* ===== combobox ===== */
/* ---------- combobox: digita, filtra (sem acento), aria-activedescendant ---------- */
{
  const box = $("#combobox .cbx[data-live]");
  if (box) {
    const input = $("input", box);
    const toggle = $(".cbx__toggle", box);
    const list = $(".lbx", box);
    const live = $("[data-cbx-live]", box);
    const fold = (s) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
    const items = ["Mercado", "Farmácia", "Padaria", "Restaurante", "Transporte", "Combustível",
      "Aluguel", "Condomínio", "Energia", "Água", "Internet", "Saúde", "Educação", "Lazer",
      "Assinaturas", "Presentes", "Viagem", "Pets"];
    let chosen = "";
    let shown = [];
    let active = -1;
    const isOpen = () => !list.hidden;
    const option = (id, text, q) => {
      const li = document.createElement("li");
      li.id = id;
      li.className = "lbx__opt";
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", String(text === chosen));
      const at = q ? [...text].map(fold).join("").indexOf(q) : -1;
      const label = document.createElement("span");
      if (at < 0) label.textContent = text;
      else {
        const mark = document.createElement("mark");
        mark.textContent = text.slice(at, at + q.length);
        label.append(text.slice(0, at), mark, text.slice(at + q.length));
      }
      li.append(label);
      return li;
    };
    const setActive = (i) => {
      active = i;
      $$(".lbx__opt", list).forEach((o, j) => o.classList.toggle("is-focus", j === i));
      const cur = $$(".lbx__opt", list)[i];
      if (cur) { input.setAttribute("aria-activedescendant", cur.id); cur.scrollIntoView({ block: "nearest" }); }
      else input.removeAttribute("aria-activedescendant");
    };
    const render = (first) => {
      const raw = input.value.trim();
      const q = fold(raw);
      const hits = items.filter((t) => fold(t).includes(q)).slice(0, 50);
      shown = hits.map((t) => ({ text: t }));
      const nodes = hits.map((t, i) => option(`cbx-o${i}`, t, q));
      if (raw && !items.some((t) => fold(t) === q)) {
        const li = document.createElement("li");
        li.id = "cbx-new";
        li.className = "lbx__opt";
        li.setAttribute("role", "option");
        li.setAttribute("aria-selected", "false");
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 20 20");
        svg.setAttribute("class", "cbx__plus");
        svg.setAttribute("aria-hidden", "true");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M10 3v14M3 10h14");
        path.setAttribute("stroke", "currentColor");
        path.setAttribute("stroke-width", "3");
        svg.append(path);
        const t = document.createElement("span");
        t.textContent = `Criar “${raw}”`;
        li.append(svg, t);
        nodes.push(li);
        shown.push({ text: raw, create: true });
      }
      if (!hits.length) {
        const empty = document.createElement("li");
        empty.className = "lbx__empty";
        empty.setAttribute("role", "presentation");
        empty.textContent = `Nada encontrado pra “${raw}”`;
        nodes.unshift(empty);
      }
      list.replaceChildren(...nodes);
      if (live) live.textContent = `${hits.length} resultado${hits.length === 1 ? "" : "s"}`;
      setActive(first && shown.length ? 0 : -1);
    };
    const open = (first) => {
      render(first);
      if (isOpen()) return;
      list.hidden = false;
      input.setAttribute("aria-expanded", "true");
      if (!reduced.matches) replayClass(list, "is-in");
    };
    const close = () => {
      list.hidden = true;
      input.setAttribute("aria-expanded", "false");
      setActive(-1);
    };
    const pick = (i) => {
      const it = shown[i];
      if (!it) return;
      if (it.create) items.push(it.text);
      chosen = it.text;
      input.value = it.text;
      input.removeAttribute("aria-invalid");
      close();
    };
    input.addEventListener("input", () => open(true));
    input.addEventListener("keydown", (e) => {
      const k = e.key;
      if (k === "ArrowDown" || k === "ArrowUp") {
        e.preventDefault();
        if (!isOpen()) return open(!e.altKey && k === "ArrowDown");
        if (e.altKey) return;
        const n = shown.length;
        if (!n) return;
        setActive(k === "ArrowDown" ? Math.min(active + 1, n - 1) : Math.max(active - 1, 0));
      } else if (k === "Enter" && isOpen() && active >= 0) {
        e.preventDefault();
        pick(active);
      } else if (k === "Escape") {
        e.preventDefault();
        if (isOpen()) close();
        else { input.value = ""; chosen = ""; }
      }
    });
    list.addEventListener("pointerdown", (e) => e.preventDefault()); // foco fica no campo
    list.addEventListener("click", (e) => {
      const o = e.target.closest(".lbx__opt");
      if (o) pick($$(".lbx__opt", list).indexOf(o));
    });
    list.addEventListener("pointermove", (e) => {
      const o = e.target.closest(".lbx__opt");
      const i = o ? $$(".lbx__opt", list).indexOf(o) : -1;
      if (o && i !== active) setActive(i);
    });
    toggle.addEventListener("pointerdown", (e) => e.preventDefault());
    toggle.addEventListener("click", () => { input.focus(); isOpen() ? close() : open(false); });
    input.addEventListener("blur", close);
  }
}

/* ===== slider ===== */
/* ---------- slider: um valor ou faixa; setas, PageUp/Down, Home/End, arrastar ---------- */
{
  const brl = (n) => `R$ ${n.toLocaleString("pt-BR")}`;
  $$("#slider [data-sl]").forEach((sl) => {
    const min = Number(sl.dataset.min);
    const max = Number(sl.dataset.max);
    const step = Number(sl.dataset.step);
    const track = $(".sl__track", sl);
    const thumbs = $$(".sl__thumb", sl);
    const out = $(".sl__out", sl);
    const values = thumbs.map((t) => Number(t.getAttribute("aria-valuenow")));
    const pct = (v) => ((v - min) / (max - min)) * 100;

    function render() {
      thumbs.forEach((t, i) => {
        t.style.setProperty("--sl-p", pct(values[i]));
        t.setAttribute("aria-valuenow", values[i]);
        t.setAttribute("aria-valuetext", brl(values[i]));
      });
      // Faixa: cada pegador não passa do outro.
      if (thumbs.length === 2) {
        thumbs[0].setAttribute("aria-valuemax", values[1]);
        thumbs[1].setAttribute("aria-valuemin", values[0]);
      }
      track.style.setProperty("--sl-a", thumbs.length === 2 ? pct(values[0]) : 0);
      track.style.setProperty("--sl-b", pct(values.at(-1)));
      out.textContent = values.map(brl).join(" – ");
    }
    function set(i, v) {
      const lo = i === 1 ? values[0] : min;
      const hi = i === 0 && thumbs.length === 2 ? values[1] : max;
      values[i] = Math.min(hi, Math.max(lo, Math.round(v / step) * step));
      render();
    }
    function fromPointer(e) {
      const r = track.getBoundingClientRect();
      const thumb = thumbs[0].offsetWidth;
      const x = (e.clientX - r.left - thumb / 2) / (r.width - thumb);
      return min + Math.min(1, Math.max(0, x)) * (max - min);
    }

    thumbs.forEach((t, i) => {
      t.addEventListener("keydown", (e) => {
        const big = step * 10;
        const next = {
          ArrowRight: values[i] + step, ArrowUp: values[i] + step,
          ArrowLeft: values[i] - step, ArrowDown: values[i] - step,
          PageUp: values[i] + big, PageDown: values[i] - big,
          Home: min, End: max,
        }[e.key];
        if (next === undefined) return;
        e.preventDefault();
        set(i, next);
      });
    });

    let active = -1;
    track.addEventListener("pointerdown", (e) => {
      if (sl.classList.contains("is-disabled")) return;
      const v = fromPointer(e);
      // Clique no trilho: move o pegador mais perto (na faixa).
      active = thumbs.length === 2 && Math.abs(v - values[1]) < Math.abs(v - values[0]) ? 1 : 0;
      // Pegadores empilhados: pega o que ainda tem pra onde ir.
      if (thumbs.length === 2 && values[0] === values[1]) active = values[0] === max || v < values[0] ? 0 : 1;
      else if (thumbs.includes(e.target)) active = thumbs.indexOf(e.target);
      if (!thumbs.includes(e.target)) set(active, v);
      track.setPointerCapture(e.pointerId);
      sl.classList.add("is-drag");
      thumbs[active].classList.add("is-active");
      thumbs[active].focus();
      e.preventDefault();
    });
    track.addEventListener("pointermove", (e) => {
      if (active >= 0) set(active, fromPointer(e));
    });
    const end = () => {
      if (active < 0) return;
      thumbs[active].classList.remove("is-active");
      sl.classList.remove("is-drag");
      active = -1;
    };
    track.addEventListener("pointerup", end);
    track.addEventListener("pointercancel", end);
    render();
  });
}

/* ===== date-picker ===== */
/* ---------- date-picker: digitar com máscara ou escolher no popover (usa noemiCalendar) ---------- */
{
  const br = (d) => d.toLocaleDateString("pt-BR");
  function parseBr(s) {
    const m = s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!m) return null;
    const d = new Date(+m[3], m[2] - 1, +m[1]);
    return d.getDate() === +m[1] && d.getMonth() === m[2] - 1 ? d : null;
  }
  // 20112026 -> 20/11/2026 (e duas datas na faixa).
  function mask(digits) {
    const one = (s) => [s.slice(0, 2), s.slice(2, 4), s.slice(4, 8)].filter(Boolean).join("/");
    return digits.length > 8 ? `${one(digits.slice(0, 8))} – ${one(digits.slice(8, 16))}` : one(digits);
  }
  $$("#date-picker [data-dp]").forEach((dp) => {
    const range = dp.dataset.dp === "range";
    const input = $(".input", dp);
    const btn = $(".ig .btn", dp);
    const pop = $(".dp__pop", dp);
    const help = $(".field__help", dp);
    const HELP = help.textContent;
    let cal = null;

    function read() {
      if (!range) return parseBr(input.value);
      const [a, b] = input.value.split(" – ");
      const start = parseBr(a || "");
      const end = parseBr(b || "");
      return start && end && end >= start ? { start, end } : null;
    }
    function validate() {
      const ok = !input.value || Boolean(read());
      input.setAttribute("aria-invalid", String(!ok));
      help.className = ok ? "field__help" : "field__error";
      help.textContent = ok ? HELP : range ? "Use dd/mm/aaaa – dd/mm/aaaa, fim depois do início." : "Data inválida. Use dd/mm/aaaa.";
      return ok;
    }
    function open() {
      const value = read();
      if (!cal) {
        cal = noemiCalendar($(".cal", pop), {
          range,
          selected: range ? null : value,
          start: range ? value?.start : null,
          end: range ? value?.end : null,
          onSelect: (v) => {
            if (range && !v.end) return;
            input.value = range ? `${br(v.start)} – ${br(v.end)}` : br(v);
            validate();
            close();
          },
        });
      } else if (value) cal.set(value);
      pop.hidden = false;
      btn.setAttribute("aria-expanded", "true");
      if (!reduced.matches) replayClass(pop, "is-in");
      cal.focus();
    }
    function close(focusBack = true) {
      if (pop.hidden) return;
      pop.hidden = true;
      btn.setAttribute("aria-expanded", "false");
      if (focusBack) btn.focus();
    }
    btn.addEventListener("click", () => (pop.hidden ? open() : close()));
    pop.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    });
    document.addEventListener("pointerdown", (e) => {
      if (!dp.contains(e.target)) close(false);
    });
    input.addEventListener("input", () => {
      const pos = input.selectionStart === input.value.length;
      input.value = mask(input.value.replace(/\D/g, "").slice(0, range ? 16 : 8));
      if (pos) input.setSelectionRange(input.value.length, input.value.length);
    });
    input.addEventListener("blur", validate);
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" && e.altKey) {
        e.preventDefault();
        open();
      }
    });
  });
}

/* ===== questionnaire ===== */
/* ---------- questionnaire: uma pergunta por vez, valida ao avançar, foco no título ---------- */
{
  $$("#questionnaire [data-qz]").forEach((form, n) => {
    const steps = $$(".qz__step", form);
    const bars = $$(".qz__bar li", form);
    const count = $(".qz__count", form);
    const back = $("[data-qz-back]", form);
    const next = $("[data-qz-next]", form);
    const foot = $(".qz__foot", form);
    const done = $(".qz__done", form);
    let at = 0;
    steps.forEach((step, i) => {
      const q = $(".qz__q", step);
      q.id = `qz-${n}-q${i}`;
      $(".qz__opts", step)?.setAttribute("aria-labelledby", q.id);
    });

    function answered(step) {
      const inputs = $$("input", step);
      return inputs.some((i) => ((i.type === "radio" || i.type === "checkbox") ? i.checked : i.value.trim()));
    }
    function go(i, dir = 1) {
      steps[at].hidden = true;
      at = i;
      const step = steps[at];
      step.hidden = false;
      $(".qz__err", step).hidden = true;
      if (!reduced.matches) replayClass(step, dir > 0 ? "is-in" : "is-in-back");
      bars.forEach((b, k) => {
        b.classList.toggle("is-done", k < at);
        if (k === at) b.setAttribute("aria-current", "step");
        else b.removeAttribute("aria-current");
      });
      count.textContent = count.textContent.replace(/\d+ de \d+/, `${at + 1} de ${steps.length}`);
      back.hidden = at === 0;
      next.textContent = at === steps.length - 1 ? "Concluir" : "Próxima";
      $(".qz__q", step).focus();
    }
    function finish() {
      steps[at].hidden = true;
      foot.hidden = true;
      bars.forEach((b) => { b.classList.add("is-done"); b.removeAttribute("aria-current"); });
      count.textContent = count.textContent.replace(/\d+ de \d+/, `${steps.length} de ${steps.length}`);
      done.hidden = false;
      done.focus();
      const stamp = $("[data-qz-stamp]", done);
      if (stamp && !reduced.matches) replayClass(stamp, "is-thunk");
    }
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const step = steps[at];
      if (!answered(step)) {
        $(".qz__err", step).hidden = false;
        if (!reduced.matches) replayClass(form, "is-shake");
        $("input", step).focus();
        return;
      }
      if (at === steps.length - 1) finish();
      else go(at + 1, 1);
    });
    back.addEventListener("click", () => go(at - 1, -1));
    // Respondeu: o erro some na hora.
    form.addEventListener("input", () => { $(".qz__err", steps[at]).hidden = true; });
    $("[data-qz-restart]", done).addEventListener("click", () => {
      form.reset();
      done.hidden = true;
      foot.hidden = false;
      steps[at].hidden = true;
      at = 0;
      go(0, -1);
    });
  });
}

/* ===== drawer ===== */
/* ---------- drawer / sheet: <dialog> modal, fecha deslizando de volta ---------- */
{
  const sec = $("#drawer");
  sec && $$("[data-drawer]", sec).forEach((opener) => {
    const dr = $(`#${opener.dataset.drawer}`);
    if (!dr) return;
    const shut = () => {
      if (!dr.open || dr.classList.contains("is-out")) return;
      if (reduced.matches) return dr.close();
      dr.classList.add("is-out");
      dr.addEventListener("animationend", () => { dr.classList.remove("is-out"); dr.close(); }, { once: true });
    };
    opener.addEventListener("click", () => {
      dr.showModal();
      document.documentElement.style.overflow = "hidden";
    });
    dr.addEventListener("close", () => {
      document.documentElement.style.overflow = "";
      opener.focus();
    });
    dr.addEventListener("cancel", (e) => { e.preventDefault(); shut(); });
    dr.addEventListener("click", (e) => { if (e.target === dr) shut(); });
    $$("[data-close]", dr).forEach((b) => b.addEventListener("click", shut));
  });
}

/* ===== popover ===== */
/* ---------- popover: um aberto por vez, Esc e clique fora fecham ---------- */
{
  const sec = $("#popover");
  let openPop = null;
  sec && $$(".pop", sec).forEach((pop) => {
    const trigger = $("[aria-controls]", pop);
    const panel = $(`#${trigger.getAttribute("aria-controls")}`);
    const close = (back) => {
      if (panel.hidden) return;
      panel.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
      if (openPop === close) openPop = null;
      if (back) trigger.focus();
    };
    const open = () => {
      openPop?.(false);
      openPop = close;
      panel.hidden = false;
      trigger.setAttribute("aria-expanded", "true");
      if (!reduced.matches) replayClass(panel, "is-in");
      const first = $("input, select, textarea, [data-pop-first]", panel);
      (first || panel).focus();
    };
    trigger.addEventListener("click", () => (panel.hidden ? open() : close(true)));
    pop.addEventListener("keydown", (e) => {
      if (e.key !== "Escape" || panel.hidden) return;
      e.preventDefault();
      close(true);
    });
    $$("[data-pop-close]", panel).forEach((b) => b.addEventListener("click", () => {
      const status = $("[data-pop-status]", pop.parentElement);
      if (status && b.dataset.popClose) status.textContent = b.dataset.popClose === "filtro"
        ? `Filtro: ${$$("input:checked", panel).map((c) => c.value).join(", ") || "nenhuma conta"}`
        : b.dataset.popClose;
      close(true);
    }));
    document.addEventListener("pointerdown", (e) => { if (!pop.contains(e.target)) close(false); });
  });
}

/* ===== tooltip ===== */
/* ---------- tooltip: 400ms no hover, na hora no foco; Esc esconde ---------- */
{
  const sec = $("#tooltip");
  let shown = null;
  let lastHide = 0;
  sec && $$(".tip", sec).forEach((tip) => {
    const trigger = $("button, a, [tabindex]", tip);
    const box = $(".tip__box", tip);
    let timer = 0;
    const show = () => {
      clearTimeout(timer);
      if (!box.hidden) return;
      shown?.();
      box.hidden = false;
      shown = hide;
      if (!reduced.matches) replayClass(box, "is-in");
    };
    const hide = () => {
      clearTimeout(timer);
      if (box.hidden) return;
      box.hidden = true;
      if (shown === hide) shown = null;
      lastHide = Date.now();
    };
    trigger.addEventListener("pointerenter", (e) => {
      if (e.pointerType === "touch") return;
      // de um gatilho pro vizinho: troca sem esperar
      if (shown || Date.now() - lastHide < 300) return show();
      timer = setTimeout(show, 400);
    });
    trigger.addEventListener("pointerleave", hide);
    trigger.addEventListener("focus", () => { if (trigger.matches(":focus-visible")) show(); });
    trigger.addEventListener("blur", hide);
    trigger.addEventListener("click", hide);
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") shown?.(); });
}

/* ===== hover-card ===== */
/* ---------- hover card: abre em 500ms, fica 300ms pra mão chegar no painel ---------- */
{
  const sec = $("#hover-card");
  sec && $$(".hc", sec).forEach((hc) => {
    const link = $(".hc__link", hc);
    const panel = $(".hc__panel", hc);
    let timer = 0;
    const show = () => {
      clearTimeout(timer);
      if (!panel.hidden) return;
      panel.hidden = false;
      if (!reduced.matches) replayClass(panel, "is-in");
    };
    const hide = () => { clearTimeout(timer); panel.hidden = true; };
    const later = (fn, ms) => { clearTimeout(timer); timer = setTimeout(fn, ms); };
    link.addEventListener("pointerenter", (e) => { if (e.pointerType !== "touch") later(show, 500); });
    link.addEventListener("pointerleave", () => later(hide, 300));
    panel.addEventListener("pointerenter", () => clearTimeout(timer));
    panel.addEventListener("pointerleave", () => later(hide, 300));
    link.addEventListener("focus", () => { if (link.matches(":focus-visible")) show(); });
    link.addEventListener("blur", hide);
    hc.addEventListener("keydown", (e) => { if (e.key === "Escape") hide(); });
  });
}

/* ===== context-menu ===== */
/* ---------- context menu (usa bMenuNav/bMenuOpen do dropdown-menu.js) ---------- */
{
  const area = $("#context-menu .ctx[data-live]");
  if (area) {
    const menu = $(".menu", area);
    const status = $("[data-ctx-status]", area.closest("section"));
    let row = null;
    let viaKeys = 0;
    const close = (back) => {
      if (menu.hidden) return;
      menu.hidden = true;
      row?.classList.remove("is-open");
      if (back) row?.focus();
    };
    const openAt = (target, x, y) => {
      close(false);
      row = target;
      row.classList.add("is-open");
      menu.style.left = "0px";
      menu.style.top = "0px";
      bMenuOpen(menu);
      // vira pra esquerda/cima quando sairia do container ou da janela
      const w = menu.offsetWidth;
      const h = menu.offsetHeight;
      const box = area.getBoundingClientRect();
      if (x + w > area.clientWidth - 8 && x - w >= 0) x -= w;
      if (box.top + y + h > innerHeight - 8 && y - h >= 0) y -= h;
      menu.style.left = `${Math.max(0, x)}px`;
      menu.style.top = `${y}px`;
    };
    bMenuNav(menu, {
      close,
      pick: (item) => {
        if (status) status.textContent = `${$(".menu__text", item).textContent}: ${$(".ctx__name", row).textContent}`;
      },
    });
    $$(".ctx__row", area).forEach((r) => {
      r.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        if (Date.now() - viaKeys < 300) return;
        const box = area.getBoundingClientRect();
        openAt(r, e.clientX - box.left, e.clientY - box.top);
      });
      r.addEventListener("keydown", (e) => {
        if (e.key !== "ContextMenu" && !(e.shiftKey && e.key === "F10")) return;
        e.preventDefault();
        viaKeys = Date.now();
        openAt(r, r.offsetLeft + 12, r.offsetTop + r.offsetHeight);
      });
    });
    document.addEventListener("pointerdown", (e) => { if (!menu.contains(e.target)) close(false); });
    addEventListener("scroll", () => close(false), { passive: true });
    addEventListener("blur", () => close(false));
  }
}

/* ===== command ===== */
/* ---------- command: Ctrl/⌘+K, filtra por grupo, aria-activedescendant ---------- */
{
  const dlgCmd = $("#cmd-demo");
  if (dlgCmd) {
    const input = $(".cmd__input", dlgCmd);
    const list = $(".cmd__list", dlgCmd);
    const status = $("[data-cmd-status]");
    const svgNS = "http://www.w3.org/2000/svg";
    const ICON = { go: "M4 10h11M11 5l5 5-5 5", add: "M10 3v14M3 10h14", doc: "M5 3h7l3 3v11H5zM8 9h5M8 13h5" };
    const GROUPS = [
      ["Ir para", [["Gastos do mês", "go", "G G"], ["Orçamento", "go", "G O"], ["Metas", "go", "G M"], ["Agenda da semana", "go", "G A"]]],
      ["Ações", [["Novo gasto", "add", "N"], ["Nova tarefa", "add", "T"], ["Importar extrato do Nubank", "doc", ""], ["Exportar CSV de novembro", "doc", ""]]],
    ];
    const fold = (s) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
    let opener = null;
    let items = [];
    let active = 0;
    const icon = (d) => {
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("viewBox", "0 0 20 20");
      svg.setAttribute("aria-hidden", "true");
      const p = document.createElementNS(svgNS, "path");
      p.setAttribute("d", d);
      p.setAttribute("fill", "none");
      p.setAttribute("stroke", "currentColor");
      p.setAttribute("stroke-width", "2.5");
      svg.append(p);
      return svg;
    };
    const setActive = (i) => {
      active = i;
      items.forEach((el, j) => el.classList.toggle("is-focus", j === i));
      if (items[i]) { input.setAttribute("aria-activedescendant", items[i].id); items[i].scrollIntoView({ block: "nearest" }); }
      else input.removeAttribute("aria-activedescendant");
    };
    const render = () => {
      const raw = input.value.trim();
      const q = fold(raw);
      const out = [];
      items = [];
      GROUPS.forEach(([name, rows], g) => {
        const hits = rows.filter(([label]) => fold(label).includes(q));
        if (!hits.length) return;
        const group = document.createElement("li");
        group.setAttribute("role", "presentation");
        const head = document.createElement("div");
        head.className = "cmd__label";
        head.id = `cmd-g${g}`;
        head.textContent = name;
        const ul = document.createElement("ul");
        ul.className = "cmd__group";
        ul.setAttribute("role", "group");
        ul.setAttribute("aria-labelledby", head.id);
        hits.forEach(([label, ic, key]) => {
          const li = document.createElement("li");
          li.className = "cmd__item";
          li.id = `cmd-i${items.length}`;
          li.setAttribute("role", "option");
          const text = document.createElement("span");
          const at = q ? [...label].map(fold).join("").indexOf(q) : -1;
          if (at < 0) text.textContent = label;
          else {
            const m = document.createElement("mark");
            m.textContent = label.slice(at, at + q.length);
            text.append(label.slice(0, at), m, label.slice(at + q.length));
          }
          li.append(icon(ICON[ic]), text);
          if (key) {
            const k = document.createElement("span");
            k.className = "cmd__key";
            k.textContent = key;
            li.append(k);
          }
          items.push(li);
          ul.append(li);
        });
        group.append(head, ul);
        out.push(group);
      });
      if (!items.length) {
        const empty = document.createElement("li");
        empty.className = "cmd__empty";
        empty.setAttribute("role", "presentation");
        empty.textContent = `Nada encontrado pra “${raw}”.`;
        out.push(empty);
      }
      list.replaceChildren(...out);
      setActive(items.length ? 0 : -1);
    };
    const show = () => {
      if (dlgCmd.open || document.querySelector("dialog[open]")) return;
      opener = document.activeElement;
      input.value = "";
      render();
      dlgCmd.showModal();
      input.focus();
    };
    const hide = () => { if (dlgCmd.open) dlgCmd.close(); };
    const run = (i) => {
      const el = items[i];
      if (!el) return;
      if (status) status.textContent = `Rodou: ${el.querySelector("span").textContent}`;
      hide();
    };
    dlgCmd.addEventListener("close", () => opener?.focus?.());
    $$("[data-cmd-open]").forEach((b) => b.addEventListener("click", show));
    document.addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() !== "k" || !(e.ctrlKey || e.metaKey) || e.altKey) return;
      e.preventDefault();
      dlgCmd.open ? hide() : show();
    });
    input.addEventListener("input", render);
    input.addEventListener("keydown", (e) => {
      const n = items.length;
      if (e.key === "ArrowDown" && n) { e.preventDefault(); setActive((active + 1) % n); }
      else if (e.key === "ArrowUp" && n) { e.preventDefault(); setActive((active - 1 + n) % n); }
      else if (e.key === "Enter") { e.preventDefault(); run(active); }
      else if (e.key === "Escape" && input.value) { e.preventDefault(); input.value = ""; render(); }
    });
    list.addEventListener("click", (e) => {
      const el = e.target.closest(".cmd__item");
      if (el) run(items.indexOf(el));
    });
    list.addEventListener("pointermove", (e) => {
      const el = e.target.closest(".cmd__item");
      if (el && items.indexOf(el) !== active) setActive(items.indexOf(el));
    });
    dlgCmd.addEventListener("click", (e) => { if (e.target === dlgCmd) hide(); });
  }
}

/* ===== spinner ===== */
/* ---------- spinner: aparece após 300ms, gira só enquanto ocupado ---------- */
(() => {
  const sec = $("#spinner");
  if (!sec) return;
  function busy(btn, spin, out, done) {
    if (btn.getAttribute("aria-busy") === "true") return;
    btn.setAttribute("aria-busy", "true");
    out.textContent = "";
    // resposta rápida nunca pisca o spinner
    const show = setTimeout(() => {
      spin.hidden = false;
      spin.classList.add("is-busy");
    }, 300);
    setTimeout(() => {
      clearTimeout(show);
      spin.classList.remove("is-busy");
      spin.hidden = true;
      btn.removeAttribute("aria-busy");
      out.textContent = done;
    }, 2200);
  }
  $('[data-spin="ring"]', sec).addEventListener("click", (e) => busy(e.currentTarget, $("#spin-demo"), $("#spin-out"), "12 vagas novas."));
  $('[data-spin="reel"]', sec).addEventListener("click", (e) => busy(e.currentTarget, $("#spin-reel"), $("#spin-reel-out"), "Relatório pronto."));
})();

/* ===== skeleton ===== */
/* ---------- skeleton: faixa só enquanto carrega, some quando o dado chega ---------- */
(() => {
  const box = $("#skel-demo");
  if (!box) return;
  const status = $("#skel-status");
  const btn = $('#skeleton [data-skel="load"]');
  function el(tag, cls, text) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text) node.textContent = text;
    return node;
  }
  function bones() {
    const row = el("div", "skel-row");
    const col = el("div");
    col.append(el("span", "skel skel--title"), el("span", "skel skel--line skel--short"));
    row.append(el("span", "skel skel--avatar"), col);
    const lines = el("div");
    lines.style.marginTop = "16px";
    lines.append(el("span", "skel skel--line"), el("span", "skel skel--line"), el("span", "skel skel--line skel--short"));
    return [row, lines];
  }
  function content() {
    const wrap = el("div", "skel-in");
    const title = el("h4", "", "Mercado Bretas");
    const meta = el("span", "b-meta", "12 compras · outubro");
    const text = el("p", "", "R$ 1.240 no mês, 8% a menos que setembro. A maior compra foi no dia 5.");
    wrap.append(title, meta, text);
    return wrap;
  }
  function load() {
    if (box.getAttribute("aria-busy") === "true") return;
    box.setAttribute("aria-busy", "true");
    status.textContent = "Carregando…";
    btn.disabled = true;
    box.replaceChildren(...bones());
    setTimeout(() => {
      box.removeAttribute("aria-busy");
      const node = content();
      box.replaceChildren(node);
      if (!reduced.matches) replayClass(node, "skel-in");
      else node.classList.remove("skel-in");
      status.textContent = "Carregado";
      btn.disabled = false;
    }, 1600);
  }
  btn.addEventListener("click", load);
  box.replaceChildren(content());
  $(".skel-in", box).classList.remove("skel-in");
})();

/* ===== item ===== */
/* ---------- item: switch da linha e linha nova entrando ---------- */
{
  const sec = $("#item");
  $$("[data-item=switch]", sec).forEach((sw) => {
    sw.addEventListener("click", () => sw.setAttribute("aria-checked", String(sw.getAttribute("aria-checked") !== "true")));
  });
  const NEW = [["Café", "hoje · lazer", "− R$ 9,50"], ["Estacionamento", "hoje · transporte", "− R$ 18,00"], ["Reembolso do plano", "hoje · saúde", "+ R$ 120,00"]];
  let n = 0;
  $("[data-item=add]", sec)?.addEventListener("click", () => {
    const [title, meta, value] = NEW[n++ % NEW.length];
    const li = document.createElement("li");
    li.className = "item";
    const lead = document.createElement("span");
    lead.className = "item__lead";
    lead.setAttribute("aria-hidden", "true");
    lead.textContent = "R$";
    const body = document.createElement("span");
    body.className = "item__body";
    const t = document.createElement("span");
    t.className = "item__title";
    t.textContent = title;
    const m = document.createElement("span");
    m.className = "item__meta";
    m.textContent = meta;
    body.append(t, m);
    const end = document.createElement("span");
    end.className = "item__end";
    const v = document.createElement("span");
    v.className = `item__value${value.startsWith("+") ? " item__value--in" : ""}`;
    v.textContent = value;
    end.append(v);
    li.append(lead, body, end);
    $("#item-demo").prepend(li);
    if (!reduced.matches) replayClass(li, "is-in");
  });
}

/* ===== avatar ===== */
/* ---------- avatar: o camafeu abre em íris uma vez, ao aparecer ---------- */
{
  const cameo = $("#cameo-demo");
  if (cameo) {
    const open = () => { if (!reduced.matches) replayClass(cameo, "is-in"); };
    new IntersectionObserver((entries, obs) => {
      if (!entries[0].isIntersecting) return;
      open();
      obs.disconnect();
    }).observe(cameo);
    $("[data-av=replay]", $("#avatar")).addEventListener("click", open);
  }
}

/* ===== accordion ===== */
/* ---------- accordion: Enter/Espaço abre, setas andam entre títulos ---------- */
{
  const sec = $("#accordion");
  $$("[data-acc]", sec).forEach((acc) => {
    const single = acc.dataset.acc === "single";
    const btns = $$(".acc__btn[aria-controls]", acc);
    const setOpen = (btn, open) => {
      const panel = $(`#${btn.getAttribute("aria-controls")}`);
      btn.setAttribute("aria-expanded", String(open));
      panel.hidden = !open;
      if (open && !reduced.matches) replayClass(panel, "is-in");
    };
    btns.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        if (btn.getAttribute("aria-disabled") === "true") return;
        const open = btn.getAttribute("aria-expanded") !== "true";
        if (single && open) btns.forEach((b) => b !== btn && setOpen(b, false));
        setOpen(btn, open);
      });
      btn.addEventListener("keydown", (e) => {
        const to = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: btns.length - 1 }[e.key];
        if (to === undefined || btns.length < 2) return;
        e.preventDefault();
        btns[(to + btns.length) % btns.length].focus();
      });
    });
  });
}

/* ===== data-table ===== */
/* ---------- data table: busca, filtro, ordenação, seleção, páginas (usa renderPager) ---------- */
{
  const dt = $("#dt-demo");
  if (dt) {
    const ROWS = [
      ["2026-11-14", "Uber pro trabalho", "transporte", -23.9],
      ["2026-11-13", "Farmácia", "saúde", -58.7],
      ["2026-11-12", "Feira", "mercado", -186.4],
      ["2026-11-11", "Conta de luz", "casa", -243.1],
      ["2026-11-10", "Academia", "saúde", -119.9],
      ["2026-11-09", "Cinema", "lazer", -64],
      ["2026-11-08", "Uber da festa", "transporte", -31.5],
      ["2026-11-07", "Supermercado", "mercado", -412.85],
      ["2026-11-06", "Internet", "casa", -119.9],
      ["2026-11-05", "Pix da Ana (rateio)", "lazer", 64],
      ["2026-11-04", "Gasolina", "transporte", -250],
      ["2026-11-03", "Aluguel", "casa", -2300],
    ].map(([date, desc, cat, value], id) => ({ id, date, desc, cat, value }));
    const PER = 5;
    const BADGE = { casa: "badge--warn", saúde: "badge--ok" };
    const money = (v) => `${v < 0 ? "− " : "+ "}R$ ${Math.abs(v).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
    const fold = (s) => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
    const state = { q: "", cat: "", key: "date", dir: -1, page: 1, sel: new Set() };
    const tbody = $("tbody", dt);
    const all = $("thead .check", dt);
    const search = $(".dt__search", dt);
    const filter = $(".dt__filter", dt);

    const visible = () => ROWS
      .filter((r) => (!state.cat || r.cat === state.cat) && fold(r.desc).includes(fold(state.q)))
      .sort((a, b) => {
        const x = a[state.key], y = b[state.key];
        return state.dir * (typeof x === "number" ? x - y : x.localeCompare(y, "pt-BR"));
      });

    const cell = (text, cls) => {
      const td = document.createElement("td");
      if (cls) td.className = cls;
      if (text instanceof Node) td.append(text);
      else td.textContent = text;
      return td;
    };
    const rowNode = (r) => {
      const tr = document.createElement("tr");
      const ck = document.createElement("input");
      ck.type = "checkbox";
      ck.className = "check";
      ck.checked = state.sel.has(r.id);
      ck.setAttribute("aria-label", `Selecionar ${r.desc}`);
      ck.addEventListener("change", () => {
        ck.checked ? state.sel.add(r.id) : state.sel.delete(r.id);
        render();
      });
      const badge = document.createElement("span");
      badge.className = `badge ${BADGE[r.cat] || ""}`;
      badge.textContent = r.cat;
      const [, m, d] = r.date.split("-");
      tr.setAttribute("aria-selected", String(ck.checked));
      tr.append(cell(ck, "dt__ck"), cell(`${d}/${m}`), cell(r.desc), cell(badge), cell(money(r.value), "num"));
      return tr;
    };

    function render() {
      const rows = visible();
      const pages = Math.max(1, Math.ceil(rows.length / PER));
      state.page = Math.min(state.page, pages);
      const slice = rows.slice((state.page - 1) * PER, state.page * PER);
      if (slice.length) tbody.replaceChildren(...slice.map(rowNode));
      else {
        const td = cell("Nada com esse filtro.", "dt__empty");
        td.colSpan = 5;
        const clear = document.createElement("button");
        clear.type = "button";
        clear.className = "btn btn--neutral btn--flat btn--sm";
        clear.textContent = "Limpar filtros";
        clear.addEventListener("click", () => {
          state.q = ""; state.cat = ""; search.value = ""; filter.value = "";
          state.page = 1; render(); search.focus();
        });
        td.append(clear);
        const tr = document.createElement("tr");
        tr.append(td);
        tbody.replaceChildren(tr);
      }
      // selecionar todos: só os visíveis (filtrados)
      const picked = rows.filter((r) => state.sel.has(r.id)).length;
      all.checked = rows.length > 0 && picked === rows.length;
      all.indeterminate = picked > 0 && picked < rows.length;
      $(".dt__count", dt).textContent = `${rows.length} de ${ROWS.length}`;
      const start = rows.length ? (state.page - 1) * PER + 1 : 0;
      $("[data-dt=range]", dt).textContent = rows.length ? `${start}–${start + slice.length - 1} de ${rows.length}` : "0 de 0";
      renderPager($(".pager ul", dt), state.page, pages, (p) => { state.page = p; render(); });
      // barra de ações em lote troca com a de ferramentas
      const bulk = $("[data-dt=bulk]", dt);
      const wasHidden = bulk.hidden;
      bulk.hidden = state.sel.size === 0;
      $("[data-dt=tools]", dt).hidden = !bulk.hidden;
      $(".dt__bulk b", dt).textContent = `${state.sel.size} ${state.sel.size === 1 ? "selecionada" : "selecionadas"}`;
      if (wasHidden && !bulk.hidden && !reduced.matches) replayClass($(".dt__bulk", dt), "is-in");
    }

    $$(".dt__sort", dt).forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.key;
        state.dir = state.key === key ? -state.dir : (key === "desc" ? 1 : -1);
        state.key = key;
        state.page = 1;
        $$("thead th", dt).forEach((th) => th.removeAttribute("aria-sort"));
        btn.parentElement.setAttribute("aria-sort", state.dir === 1 ? "ascending" : "descending");
        render();
      });
    });
    let timer;
    search.addEventListener("input", () => {
      clearTimeout(timer);
      timer = setTimeout(() => { state.q = search.value; state.page = 1; render(); }, 150);
    });
    filter.addEventListener("change", () => { state.cat = filter.value; state.page = 1; render(); });
    all.addEventListener("change", () => {
      visible().forEach((r) => (all.checked ? state.sel.add(r.id) : state.sel.delete(r.id)));
      render();
    });
    $("[data-dt=clear]", dt).addEventListener("click", () => {
      state.sel.clear();
      render();
      all.focus();
    });
    render();
  }
}

/* ===== chart ===== */
/* ---------- chart: dica no hover/foco, entrada uma vez ao aparecer ---------- */
{
  const sec = $("#chart");
  if (sec) {
    const charts = $$("[data-chart]", sec);
    const tip = document.createElement("div");
    tip.className = "chart__tip";
    tip.setAttribute("role", "status");
    tip.hidden = true;
    const show = (mark) => {
      const fig = mark.closest("[data-chart]");
      const [head, ...lines] = mark.dataset.tip.split("|");
      const b = document.createElement("b");
      b.textContent = head;
      tip.replaceChildren(b, ...lines.flatMap((l, i) => (i ? [document.createElement("br"), l] : [l])));
      fig.append(tip);
      const f = fig.getBoundingClientRect();
      const m = mark.getBoundingClientRect();
      const bar = mark.classList.contains("chart__hit") ? mark.previousElementSibling.getBoundingClientRect() : m;
      tip.hidden = false;
      const half = tip.offsetWidth / 2 + 8;
      const x = Math.min(f.width - half, Math.max(half, m.left + m.width / 2 - f.left));
      tip.style.left = `${x}px`;
      tip.style.top = `${Math.max(tip.offsetHeight + 12, bar.top - f.top)}px`;
    };
    const hide = () => { tip.hidden = true; };
    $$("[data-tip]", sec).forEach((mark) => {
      mark.addEventListener("pointerenter", () => show(mark));
      mark.addEventListener("pointerleave", hide);
      mark.addEventListener("focus", () => show(mark));
      mark.addEventListener("blur", hide);
    });
    const draw = (fig) => { if (!reduced.matches) replayClass(fig, "is-in"); };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        draw(e.target);
        io.unobserve(e.target);
      });
    }, { threshold: 0.4 });
    charts.forEach((fig) => io.observe(fig));
    $("[data-chart-replay]", sec).addEventListener("click", () => charts.forEach(draw));
  }
}

/* ===== carousel ===== */
/* ---------- carousel: botões, pontos e setas; sem autoplay ---------- */
(() => {
  $$("#carousel .crs").forEach((crs) => {
    const track = $(".crs__track", crs);
    const slides = $$(".crs__slide", crs);
    const prev = $('[data-crs="prev"]', crs);
    const next = $('[data-crs="next"]', crs);
    const count = $(".crs__count", crs);
    const dots = $$(".crs__dot", crs);
    let i = 0;
    function go(n) {
      i = Math.max(0, Math.min(slides.length - 1, n));
      track.style.setProperty("--i", i);
      slides.forEach((s, k) => {
        s.inert = k !== i;
        s.setAttribute("aria-hidden", String(k !== i));
      });
      const lost = document.activeElement;
      prev.disabled = i === 0;
      next.disabled = i === slides.length - 1;
      // botão que ficou desabilitado não pode levar o foco embora
      if (lost?.disabled) (lost === prev ? next : prev).focus();
      count.textContent = `${i + 1} / ${slides.length}`;
      dots.forEach((d, k) => d.setAttribute("aria-current", String(k === i)));
    }
    prev.addEventListener("click", () => go(i - 1));
    next.addEventListener("click", () => go(i + 1));
    dots.forEach((d, k) => d.addEventListener("click", () => go(k)));
    crs.addEventListener("keydown", (e) => {
      const n = { ArrowLeft: i - 1, ArrowRight: i + 1, Home: 0, End: slides.length - 1 }[e.key];
      if (n === undefined) return;
      e.preventDefault();
      go(n);
    });
    go(0);
  });
})();

/* ===== attachment ===== */
/* ---------- attachment: anexar, enviar (progresso), remover ---------- */
(() => {
  const sec = $("#attachment");
  if (!sec) return;
  const list = $("#att-demo", sec);
  const status = $("#att-status", sec);
  const addBtn = $('[data-att="add"]', sec);
  const FILES = [["extrato-nubank-outubro.csv", "CSV", 48], ["foto-recibo-feira.jpg", "JPG", 1210], ["boleto-condominio-novembro.pdf", "PDF", 132]];
  let fileN = 0;
  const size = (kb) => (kb >= 1000 ? `${(kb / 1000).toFixed(1).replace(".", ",")} MB` : `${kb} KB`);
  function el(tag, cls, text) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text) node.textContent = text;
    return node;
  }
  function xIcon() {
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 20 20");
    svg.setAttribute("aria-hidden", "true");
    const path = document.createElementNS(ns, "path");
    path.setAttribute("d", "M5 5l10 10M15 5L5 15");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "3");
    path.setAttribute("stroke-linecap", "square");
    svg.append(path);
    return svg;
  }
  function remove(li, name) {
    clearTimeout(li._timer);
    const after = li.nextElementSibling || li.previousElementSibling;
    li.remove();
    status.textContent = `${name} removido`;
    (after ? $("button", after) : addBtn).focus();
  }
  // Os chips que já vieram no HTML também removem.
  $$(".att", list).forEach((li) => {
    $("button", li).addEventListener("click", () => remove(li, $(".att__name", li).textContent));
  });
  function add() {
    const [name, ext, kb] = FILES[fileN++ % FILES.length];
    const li = el("li", "att is-in");
    li.setAttribute("aria-busy", "true");
    const type = el("span", "att__type");
    type.setAttribute("aria-hidden", "true");
    type.append(el("span", "att__ext", ext));
    const info = el("span", "att__info");
    const label = el("span", "att__name", name);
    label.title = name;
    const meta = el("span", "att__meta", "enviando · 0%");
    info.append(label, meta);
    const btn = el("button", "btn btn--neutral btn--flat btn--sm btn--icon");
    btn.type = "button";
    btn.setAttribute("aria-label", `Cancelar envio de ${name}`);
    btn.append(xIcon());
    btn.addEventListener("click", () => remove(li, name));
    const bar = el("span", "att__bar");
    bar.setAttribute("aria-hidden", "true");
    const fill = el("i");
    bar.append(fill);
    li.append(type, info, btn, bar);
    list.append(li);
    if (reduced.matches) li.classList.remove("is-in");
    let v = 0;
    const tick = () => {
      v = Math.min(100, v + 18 + Math.round(Math.random() * 14));
      fill.style.setProperty("--v", `${v}%`);
      meta.textContent = `enviando · ${v}%`;
      if (v < 100) {
        li._timer = setTimeout(tick, 350);
        return;
      }
      li._timer = setTimeout(() => {
        li.removeAttribute("aria-busy");
        bar.remove();
        meta.textContent = `${size(kb)} · ${ext}`;
        btn.setAttribute("aria-label", `Remover ${name}`);
        status.textContent = `${name} enviado`;
      }, 300);
    };
    li._timer = setTimeout(tick, 200);
  }
  addBtn.addEventListener("click", add);
})();

/* ===== kbd ===== */
/* ---------- kbd: a tecla afunda enquanto está apertada (só dentro da área de teste) ---------- */
{
  const pad = $("#kbd #kbd-demo");
  const keys = (e) => $$(`[data-key="${e.key.toLowerCase()}"]`, pad);
  pad.addEventListener("keydown", (e) => {
    const hit = keys(e);
    if (!hit.length) return;
    if (e.key !== "Tab") e.preventDefault();
    hit.forEach((k) => k.classList.add("is-down"));
  });
  pad.addEventListener("keyup", (e) => keys(e).forEach((k) => k.classList.remove("is-down")));
  pad.addEventListener("blur", () => $$(".is-down", pad).forEach((k) => k.classList.remove("is-down")));
}

/* ===== marker ===== */
/* ---------- marker: risca de novo sob demanda ---------- */
(() => {
  const btn = $('#marker [data-mk="draw"]');
  if (!btn) return;
  btn.addEventListener("click", () => {
    if (reduced.matches) return;
    $$("#mk-live .mk").forEach((m) => replayClass(m, "is-draw"));
  });
})();

/* ===== message-scroller ===== */
/* ---------- message scroller: gruda no fim; rolou pra cima, aparece o pulo ---------- */
(() => {
  const box = $("#msc-demo");
  if (!box) return;
  const view = $(".msc__view", box);
  const list = $(".msc__list", box);
  const jump = $(".msc__jump", box);
  const label = $(".msc__count", jump);
  const IN = ["Chegou a fatura do Nubank: R$ 2.318.", "Mercado subiu 4% essa semana.", "Lembrete: conta de luz vence dia 20.", "Sobraram R$ 160 no orçamento."];
  const OUT = ["Valeu, depois eu vejo.", "Separa o mercado pra mim?", "Paga a luz no dia 18."];
  let inN = 0;
  let outN = 0;
  let unread = 0;
  const atEnd = () => view.scrollHeight - view.scrollTop - view.clientHeight < 48;
  const toEnd = () => { view.scrollTop = view.scrollHeight; }; // instantâneo, nunca smooth
  function setUnread(n) {
    unread = n;
    if (!n) {
      jump.hidden = true;
      return;
    }
    label.textContent = `${n} ${n === 1 ? "nova" : "novas"}`;
    if (jump.hidden) {
      jump.hidden = false;
      if (!reduced.matches) replayClass(jump, "is-in");
    }
  }
  function balloon(who, text) {
    const p = document.createElement("p");
    p.className = `balloon sk${who === "você" ? " balloon--user" : ""}`;
    const name = document.createElement("span");
    name.className = "balloon__who";
    name.textContent = `${who} · agora`;
    p.append(name, text);
    return p;
  }
  function receive() {
    const stick = atEnd();
    const p = balloon("noemi", IN[inN++ % IN.length]);
    if (!stick && !unread) {
      $(".msc__divider--new", list)?.remove();
      const div = document.createElement("div");
      div.className = "msc__divider msc__divider--new";
      div.textContent = "novas";
      list.append(div);
    }
    list.append(p);
    if (!reduced.matches) replayClass(p, "is-pop");
    if (stick) toEnd();
    else setUnread(unread + 1);
  }
  function send() {
    const p = balloon("você", OUT[outN++ % OUT.length]);
    list.append(p);
    if (!reduced.matches) replayClass(p, "is-pop");
    toEnd(); // a própria mensagem sempre leva ao fim
    setUnread(0);
  }
  view.addEventListener("scroll", () => { if (atEnd()) setUnread(0); });
  view.addEventListener("keydown", (e) => {
    if (e.key !== "End") return;
    e.preventDefault();
    toEnd();
  });
  jump.addEventListener("click", () => {
    toEnd();
    setUnread(0);
    view.focus();
  });
  $('#message-scroller [data-msc="receive"]').addEventListener("click", receive);
  $('#message-scroller [data-msc="send"]').addEventListener("click", send);
  toEnd();
})();

/* ===== marquee ===== */
/* ---------- marquee: lâmpadas correm 1,8s; ticker 2 voltas se não couber ---------- */
(() => {
  const sign = $("#mq-demo");
  const tick = $("#mq-tick");
  if (!sign || !tick) return;
  const chase = () => { if (!reduced.matches) replayClass(sign, "is-chase"); };
  function run() {
    const [group, copy] = $$(".mq-tick__group", tick);
    copy.hidden = true;
    if (group.scrollWidth <= tick.clientWidth) return; // cabe: fica parado
    copy.hidden = false;
    if (reduced.matches) return;
    const dur = group.getBoundingClientRect().width / 60; // ~60px/s
    tick.style.setProperty("--mq-dur", `${dur.toFixed(2)}s`);
    tick.style.setProperty("--mq-steps", Math.round(dur * 10)); // 10 quadros/s
    replayClass(tick, "is-run");
  }
  $('#marquee [data-mq="chase"]').addEventListener("click", chase);
  $('#marquee [data-mq="run"]').addEventListener("click", run);
  // O letreiro acende uma vez quando entra na tela pela primeira vez.
  new IntersectionObserver((entries, obs) => {
    if (!entries[0].isIntersecting) return;
    chase();
    obs.disconnect();
  }).observe(sign);
})();

/* ---------- início ---------- */
readDefaults();
setTheme(store("noemi-theme") || "light");
countUp($("[data-count]"));
