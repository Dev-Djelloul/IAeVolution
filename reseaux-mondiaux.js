import { initFitTitles } from "./fit-titles.js";
const map = document.querySelector(".network-map");
const mapModeButtons = [...document.querySelectorAll("[data-map-mode]")];
const mapCaption = document.querySelector("#network-map-caption");

const captions = {
  corridors: "Les échanges internationaux s’appuient sur un réseau dense de liaisons transocéaniques.",
  resilience: "La diversité des routes et des points d’interconnexion renforce la continuité des échanges.",
};

mapModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const mode = button.dataset.mapMode;
    map.dataset.mapMode = mode;
    mapCaption.textContent = captions[mode];
    mapModeButtons.forEach((modeButton) => {
      const isSelected = modeButton === button;
      modeButton.classList.toggle("is-active", isSelected);
      modeButton.setAttribute("aria-pressed", String(isSelected));
    });
  });
});
initFitTitles();

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const corridorButtons = [...document.querySelectorAll("[data-corridor]")];
const corridorDetails = [...document.querySelectorAll("[data-corridor-detail]")];
const showCorridor = (name) => {
  if (name) map.dataset.focus = name;
  else delete map.dataset.focus;
  corridorButtons.forEach((item) => {
    const active = item.dataset.corridor === name;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-pressed", String(active));
  });
  corridorDetails.forEach((detail) => {
    detail.hidden = detail.dataset.corridorDetail !== (name || "overview");
  });
};
corridorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showCorridor(button.classList.contains("is-active") ? "" : button.dataset.corridor);
  });
});

const cableArt = document.querySelector(".cable-art");
document.querySelectorAll(".cable-legend [data-layer]").forEach((item) => {
  const on = () => { cableArt.dataset.layer = item.dataset.layer; };
  const off = () => { delete cableArt.dataset.layer; };
  item.addEventListener("mouseenter", on);
  item.addEventListener("focus", on);
  item.addEventListener("mouseleave", off);
  item.addEventListener("blur", off);
});

const countUp = (element) => {
  const target = Number(element.dataset.count);
  const start = performance.now();
  const duration = 1400;
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    element.textContent = String(Math.round(target * (1 - (1 - progress) ** 3)));
    if (progress < 1) requestAnimationFrame(tick);
  };
  element.textContent = "0";
  requestAnimationFrame(tick);
};

const revealTargets = [
  ".network-corridor-card", ".network-corridor-detail", ".network-fact-card", ".cable-legend li",
  ".network-risks-grid article", ".network-flow article", ".network-latency", ".network-source-card",
];
if ("IntersectionObserver" in window && !reduceMotion.matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      entry.target.querySelectorAll?.("[data-count]").forEach(countUp);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(revealTargets.join(",")).forEach((element, index) => {
    element.classList.add("reveal");
    element.style.transitionDelay = `${(index % 4) * 70}ms`;
    observer.observe(element);
  });
  const heroStats = document.querySelector(".networks-hero-stats");
  if (heroStats) observer.observe(heroStats);
}
