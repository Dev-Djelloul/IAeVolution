const topics = [
  {
    id: "generative-ai",
    category: "Comprendre",
    filter: "comprendre",
    number: "01",
    title: "L'IA générative",
    description: "Comment des modèles créent du texte, des images ou du code — et ce qu'ils ne savent pas faire.",
    tags: ["Modèles", "Repères"],
    icon: "✳",
    color: "violet",
  },
  {
    id: "ai-agents",
    category: "Explorer",
    filter: "explorer",
    number: "02",
    title: "Les agents IA",
    description: "Des systèmes qui enchaînent des actions et des outils pour accomplir une tâche.",
    tags: ["Usages", "En exploration"],
    icon: "⌘",
    color: "blue",
  },
  {
    id: "open-models",
    category: "Explorer",
    filter: "explorer",
    number: "03",
    title: "Les modèles ouverts",
    description: "Poids ouverts, modèles propriétaires : comprendre les différences et leurs conséquences.",
    tags: ["Écosystème", "Modèles"],
    icon: "◈",
    color: "mint",
  },
  {
    id: "responsible-ai",
    category: "Anticiper",
    filter: "anticiper",
    number: "04",
    title: "IA responsable",
    description: "Fiabilité, biais, vie privée : les questions à poser avant de déployer une IA.",
    tags: ["Éthique", "Société"],
    icon: "◎",
    color: "amber",
  },
  {
    id: "ai-at-work",
    category: "Comprendre",
    filter: "comprendre",
    number: "05",
    title: "L'IA au quotidien",
    description: "Des cas d'usage concrets pour travailler, apprendre et créer avec discernement.",
    tags: ["Pratique", "Débuter"],
    icon: "↗",
    color: "rose",
  },
  {
    id: "ai-outlook",
    category: "Anticiper",
    filter: "anticiper",
    number: "06",
    title: "La suite de l'IA",
    description: "Repérer les signaux émergents et distinguer les tendances durables du bruit.",
    tags: ["Tendances", "Prospective"],
    icon: "⌁",
    color: "cyan",
  },
];

const grid = document.querySelector("#topic-grid");
const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector("#search-input");
const resultsLabel = document.querySelector("#results-label");
const emptyState = document.querySelector("#empty-state");
const filterButtons = [...document.querySelectorAll(".filter-chip")];
let activeFilter = "all";

function renderTopics() {
  const query = searchInput.value.trim().toLocaleLowerCase("fr");
  const visibleTopics = topics.filter((topic) => {
    const matchesFilter = activeFilter === "all" || topic.filter === activeFilter;
    const searchableText = `${topic.title} ${topic.description} ${topic.category} ${topic.tags.join(" ")}`.toLocaleLowerCase("fr");
    return matchesFilter && searchableText.includes(query);
  });

  grid.innerHTML = visibleTopics.map((topic) => `
    <article class="topic-card">
      <div class="card-topline">
        <span class="card-number">${topic.number} <span>/ 06</span></span>
        <span class="card-icon icon-${topic.color}" aria-hidden="true">${topic.icon}</span>
      </div>
      <p class="card-category">${topic.category}</p>
      <h3>${topic.title}</h3>
      <p class="card-description">${topic.description}</p>
      <div class="card-bottom">
        <div class="tag-list">${topic.tags.map((tag) => `<span class="topic-tag">${tag}</span>`).join("")}</div>
        <span class="card-link" aria-hidden="true">↗</span>
      </div>
    </article>
  `).join("");

  const count = String(visibleTopics.length).padStart(2, "0");
  resultsLabel.textContent = `${count} ${visibleTopics.length > 1 ? "sujets" : "sujet"}`;
  emptyState.hidden = visibleTopics.length > 0;
  grid.hidden = visibleTopics.length === 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const isSelected = item === button;
      item.classList.toggle("is-selected", isSelected);
      item.setAttribute("aria-pressed", String(isSelected));
    });
    renderTopics();
  });
});

searchInput.addEventListener("input", renderTopics);
searchForm.addEventListener("submit", (event) => event.preventDefault());

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
  }
});

renderTopics();
