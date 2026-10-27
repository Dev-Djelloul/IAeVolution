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
