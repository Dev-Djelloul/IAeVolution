import { initFitTitles } from "./fit-titles.js";
import { initializeTranslation } from "./translation.js";
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

const listenButton = document.querySelector("[data-listen-map]");
const speechVoiceKey = "iaevolution:speech-voice";
let listenToken = 0;
let listenPrevious = "";

const setListening = (on) => {
  listenButton.setAttribute("aria-pressed", String(on));
  listenButton.classList.toggle("is-active", on);
  listenButton.querySelector("[data-listen-label]").hidden = on;
  listenButton.querySelector("[data-unlisten-label]").hidden = !on;
};

const stopListening = () => {
  if (listenButton.getAttribute("aria-pressed") !== "true") return;
  listenToken += 1;
  window.speechSynthesis.cancel();
  showCorridor(listenPrevious);
  setListening(false);
};

const readable = (element) => {
  const parts = element.children.length ? [...element.children].map((child) => child.textContent) : [element.textContent];
  return parts.map((part) => part.trim().replace(/\s+/g, " ").replace(/[.!?…。]+$/, "")).filter(Boolean).join(". ") + ".";
};

const pickVoice = async (lang) => {
  const synthesis = window.speechSynthesis;
  let voices = synthesis.getVoices();
  if (!voices.length) {
    voices = await new Promise((resolve) => {
      const timeout = window.setTimeout(() => resolve(synthesis.getVoices()), 1500);
      synthesis.addEventListener("voiceschanged", () => {
        window.clearTimeout(timeout);
        resolve(synthesis.getVoices());
      }, { once: true });
    });
  }
  const prefix = lang.toLocaleLowerCase().split("-")[0];
  const candidates = voices.filter((voice) => voice.lang.toLocaleLowerCase().startsWith(prefix));
  const saved = localStorage.getItem(speechVoiceKey) || "";
  const preferred = candidates.find((voice) => `${voice.voiceURI}\u0000${voice.lang}\u0000${voice.name}` === saved);
  if (preferred) return preferred;
  const score = (voice) => {
    const details = `${voice.name} ${voice.voiceURI}`.toLocaleLowerCase();
    return (voice.localService ? 2 : 0)
      + ["natural", "neural", "premium", "enhanced"].reduce((total, marker) => total + (details.includes(marker) ? 2 : 0), 0)
      - ["compact", "basic", "legacy"].reduce((total, marker) => total + (details.includes(marker) ? 2 : 0), 0);
  };
  return candidates.sort((left, right) => score(right) - score(left))[0];
};

const speakSegment = (text, lang, voice) => new Promise((resolve) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = voice?.lang || lang;
  if (voice) utterance.voice = voice;
  utterance.onend = () => resolve(true);
  utterance.onerror = () => resolve(false);
  window.speechSynthesis.speak(utterance);
});

if (listenButton && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window) {
  listenButton.addEventListener("click", async () => {
    if (listenButton.getAttribute("aria-pressed") === "true") return stopListening();
    const token = ++listenToken;
    window.speechSynthesis.cancel();
    listenPrevious = map.dataset.focus || "";
    setListening(true);
    const lang = document.documentElement.lang || "fr";
    const voice = await pickVoice(lang);
    if (token !== listenToken) return undefined;
    const queue = [
      { name: "", text: mapCaption.textContent.trim() },
      ...corridorButtons.map((button) => ({
        name: button.dataset.corridor,
        text: [...corridorDetails
          .find((detail) => detail.dataset.corridorDetail === button.dataset.corridor)
          .querySelectorAll("h3, p")]
          .map(readable)
          .join(" "),
      })),
    ];
    for (const item of queue) {
      if (token !== listenToken) return undefined;
      showCorridor(item.name);
      const spoken = await speakSegment(item.text, lang, voice);
      if (!spoken && token === listenToken) break;
      await new Promise((resolve) => window.setTimeout(resolve, 500));
    }
    if (token === listenToken) {
      showCorridor(listenPrevious);
      setListening(false);
    }
    return undefined;
  });
  document.addEventListener("iaevolution:languagechange", stopListening);
  window.addEventListener("pagehide", () => window.speechSynthesis.cancel());
} else if (listenButton) {
  listenButton.hidden = true;
}

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

initializeTranslation();
