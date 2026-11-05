const AUTO_DELAY = 4500;

export function initJourneys() {
  const tabs = [...document.querySelectorAll("[data-journey-tab]")];
  const panels = [...document.querySelectorAll("[data-journey]")];
  if (!tabs.length || !panels.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const controllers = new Map();

  panels.forEach((panel) => {
    const steps = [...panel.querySelectorAll(".journey-step")];
    const track = panel.querySelector(".journey-track");
    const counter = panel.querySelector("[data-journey-current]");
    const playButton = panel.querySelector("[data-journey-play]");
    const stage = document.createElement("div");
    stage.className = "journey-stage";
    stage.setAttribute("aria-live", "polite");
    track.after(stage);

    let current = 0;
    let timer = null;

    const render = () => {
      steps.forEach((step, index) => {
        step.classList.toggle("is-active", index === current);
        step.classList.toggle("is-done", index < current);
        const node = step.querySelector(".journey-node");
        if (index === current) node.setAttribute("aria-current", "step");
        else node.removeAttribute("aria-current");
      });
      track.style.setProperty("--progress", steps.length > 1 ? current / (steps.length - 1) : 0);
      counter.textContent = String(current + 1);
      stage.innerHTML = steps[current].querySelector(".journey-detail").innerHTML;
      stage.style.animation = "none";
      void stage.offsetWidth;
      stage.style.animation = "";
    };

    const stop = () => {
      window.clearInterval(timer);
      timer = null;
      playButton.setAttribute("aria-pressed", "false");
      playButton.querySelector("[data-play-label]").hidden = false;
      playButton.querySelector("[data-pause-label]").hidden = true;
    };

    const start = () => {
      if (reduceMotion.matches) return;
      playButton.setAttribute("aria-pressed", "true");
      playButton.querySelector("[data-play-label]").hidden = true;
      playButton.querySelector("[data-pause-label]").hidden = false;
      timer = window.setInterval(() => {
        current = (current + 1) % steps.length;
        render();
      }, AUTO_DELAY);
    };

    const go = (index) => {
      stop();
      current = (index + steps.length) % steps.length;
      render();
    };

    steps.forEach((step, index) => step.querySelector(".journey-node").addEventListener("click", () => go(index)));
    panel.querySelector("[data-journey-prev]").addEventListener("click", () => go(current - 1));
    panel.querySelector("[data-journey-next]").addEventListener("click", () => go(current + 1));
    playButton.addEventListener("click", () => (timer ? stop() : start()));

    render();
    controllers.set(panel.id, stop);
  });

  const select = (tab, focus) => {
    const target = tab.dataset.journeyTab;
    controllers.forEach((stop) => stop());
    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
      item.tabIndex = active ? 0 : -1;
    });
    panels.forEach((panel) => {
      panel.hidden = panel.id !== target;
    });
    if (focus) tab.focus();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => select(tab, false));
    tab.addEventListener("keydown", (event) => {
      const keys = { ArrowRight: 1, ArrowLeft: -1 };
      if (event.key === "Home") select(tabs[0], true);
      else if (event.key === "End") select(tabs[tabs.length - 1], true);
      else if (keys[event.key]) {
        event.preventDefault();
        select(tabs[(index + keys[event.key] + tabs.length) % tabs.length], true);
      }
    });
  });
}
