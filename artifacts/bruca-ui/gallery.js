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

document.querySelectorAll(".tk__btn").forEach((btn) => {
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

document.querySelector('[data-demo="load"]').addEventListener("click", (e) => {
  const btn = e.currentTarget;
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

document.querySelector('[data-demo="toggle"]').addEventListener("click", (e) => {
  const btn = e.currentTarget;
  btn.setAttribute("aria-pressed", String(btn.getAttribute("aria-pressed") !== "true"));
});
