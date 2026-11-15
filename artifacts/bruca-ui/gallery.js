// Galeria bruca-ui: tema, playground de cores, demos e animações sob demanda.
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
  store("bruca-theme", theme);
  applyTokens();
  paintGrain();
}
themeBtn.addEventListener("click", () => setTheme(root.dataset.theme === "light" ? "dark" : "light"));

/* ---------- playground de cores ---------- */
const swatches = $$("[data-token]");
const DEFAULTS = { light: {}, dark: {} };
const overrides = { light: {}, dark: {}, ...store("bruca-tokens") };

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
    store("bruca-tokens", overrides);
    applyTokens();
  });
});
$("#tok-reset").addEventListener("click", () => {
  overrides[root.dataset.theme] = {};
  store("bruca-tokens", overrides);
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

/* ---------- início ---------- */
readDefaults();
setTheme(store("bruca-theme") || "light");
countUp($("[data-count]"));
