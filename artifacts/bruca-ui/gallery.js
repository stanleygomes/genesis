// Galeria bruca-ui: tema, contorno fervendo só durante hover/loading, demos.
const boil = document.getElementById("boil");
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
let boiling = 0;

function startBoil() {
  if (reduced.matches) return;
  if (boiling++ === 0) boil.beginElement();
}
function stopBoil() {
  boiling = Math.max(0, boiling - 1);
  if (boiling === 0) boil.endElement();
}

document.querySelectorAll(".tk__btn, .btn").forEach((btn) => {
  btn.addEventListener("pointerenter", () => { if (!btn.disabled) startBoil(); });
  btn.addEventListener("pointerleave", () => { if (!btn.disabled) stopBoil(); });
});

document.getElementById("theme").addEventListener("click", () => {
  const root = document.documentElement;
  const dark = root.dataset.theme
    ? root.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = dark ? "light" : "dark";
});

document.querySelectorAll('[data-demo="load"]').forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.getAttribute("aria-busy") === "true") return;
    btn.style.width = `${btn.offsetWidth}px`;
    btn.setAttribute("aria-busy", "true");
    startBoil();
    setTimeout(() => {
      btn.removeAttribute("aria-busy");
      btn.style.width = "";
      stopBoil();
    }, 2000);
  });
});

document.querySelectorAll('[data-demo="toggle"]').forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.setAttribute("aria-pressed", String(btn.getAttribute("aria-pressed") !== "true"));
  });
});

// Realce do CSS base, montando nós (sem innerHTML).
function span(cls, text) {
  const el = document.createElement("span");
  el.className = cls;
  el.textContent = text;
  return el;
}
const TOKEN = /(\/\*.*?\*\/)|("[^"]*")|(-?\d*\.?\d+(?:px|ms|deg|%|em|s)?)|([^"\/\d-]+|.)/g;
function paintValue(out, text) {
  for (const [, c, q, n, rest] of text.matchAll(TOKEN)) {
    if (c) out.append(span("c", c));
    else if (q) out.append(span("q", q));
    else if (n) out.append(span("n", n));
    else out.append(rest);
  }
}
document.querySelectorAll("code.css").forEach((code) => {
  const lines = code.textContent.split("\n");
  code.textContent = "";
  lines.forEach((line, i) => {
    const prop = line.match(/^(\s+)([a-z-]+)(:)(.*)$/);
    if (/^\s*\/\*.*\*\/\s*$/.test(line)) code.append(span("c", line));
    else if (prop) {
      code.append(prop[1], span("k", prop[2]), prop[3]);
      paintValue(code, prop[4]);
    } else if (/\{\s*$/.test(line)) {
      code.append(span("s", line.replace(/\s*\{\s*$/, "")), " {");
    } else paintValue(code, line);
    if (i < lines.length - 1) code.append("\n");
  });
});

// Sidebar marca a seção visível.
const links = new Map(
  [...document.querySelectorAll(".toc a")].map((a) => [a.hash.slice(1), a]),
);
const seen = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    links.forEach((a) => a.removeAttribute("aria-current"));
    links.get(e.target.id)?.setAttribute("aria-current", "true");
  });
}, { rootMargin: "-20% 0px -70% 0px" });
document.querySelectorAll(".comp").forEach((s) => seen.observe(s));
