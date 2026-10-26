import sourceCatalog from "./sources.json";

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
  {
    id: "data-centres",
    category: "Comprendre",
    filter: "comprendre",
    number: "07",
    title: "Centres de données & IA",
    description: "Les lieux, les coûts, l'histoire et les machines qui rendent l'IA possible.",
    tags: ["Géographie", "Infrastructure"],
    icon: "▦",
    color: "cyan",
    dossier: true,
  },
];

const assistantKnowledge = [
  {
    title: "La demande électrique mondiale",
    answer: "L'AIE estime la consommation électrique des centres de données à environ 415 TWh en 2024, soit près de 1,5 % de l'électricité mondiale. Dans son scénario de base, elle projette environ 945 TWh en 2030. Cette projection porte sur l'ensemble des centres de données, pas uniquement sur les charges d'IA.",
    keywords: ["electricite", "energie", "consommation", "centre", "donnee", "twh", "2030", "2024", "aie", "iea", "mondiale", "projection"],
    source: { name: "AIE · Energy and AI", url: "https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai" },
  },
  {
    title: "Pourquoi la Virginie du Nord concentre des centres de données",
    answer: "L'étude de la commission législative de Virginie cite plusieurs facteurs : un réseau fibre solide, un accès à une énergie fiable, des terrains disponibles, la proximité des grands clients nationaux et des incitations fiscales. Selon le périmètre de l'étude, la région représente 13 % de la capacité opérationnelle mondiale recensée.",
    keywords: ["virginie", "nord", "northern", "geographie", "fibre", "terrain", "energie", "clients", "marche", "capacite", "13", "pourcent"],
    source: { name: "JLARC · Data Centers in Virginia", url: "https://rga.lis.virginia.gov/Published/2025/RD206" },
  },
  {
    title: "Les principaux marchés européens",
    answer: "Le rapport 2025 de l'association européenne EUDCA désigne les marchés FLAP-D — Francfort, Londres, Amsterdam, Paris et Dublin — parmi les grands hubs européens. Il décrit aussi une extension vers des régions nordiques et méridionales. Il s'agit d'une vue sectorielle, pas d'un inventaire exhaustif des sites.",
    keywords: ["europe", "europeen", "flap", "francfort", "londres", "amsterdam", "paris", "dublin", "nordique", "sud", "regions", "hub", "marche"],
    source: { name: "EUDCA · State of European Data Centres 2025", url: "https://www.eudca.org/state-of-european-data-centres-2025" },
  },
  {
    title: "La stratégie de Singapour",
    answer: "La feuille de route Green Data Centre de 2024 prévoit au moins 300 MW de capacité supplémentaire à court terme, avec une capacité potentiellement accrue si davantage d'énergie verte est mobilisée. Les projets sont associés à des exigences de durabilité : ce chiffre n'est pas une capacité déjà construite.",
    keywords: ["singapour", "singapore", "asie", "300", "mw", "capacite", "verte", "durable", "roadmap", "feuille", "route"],
    source: { name: "IMDA · Green Data Centre Roadmap", url: "https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/factsheets/2024/charting-green-growth-for-data-centres-in-sg" },
  },
  {
    title: "Les étapes de la chaîne de valeur",
    answer: "Le dossier distingue cinq couches interdépendantes : ressources physiques, semi-conducteurs, centres de données et cloud, données et modèles, puis produits et usages. C'est un schéma de lecture, pas une mesure du partage des revenus. L'OCDE étudie les enjeux de concurrence autour de ces infrastructures.",
    keywords: ["chaine", "valeur", "economique", "economie", "semi", "conducteur", "puce", "cloud", "modele", "revenu", "acteurs", "concurrence", "ocde", "industrie"],
    source: { name: "OCDE · Competition in AI Infrastructure", url: "https://www.oecd.org/en/publications/competition-in-artificial-intelligence-infrastructure_623d1874-en/full-report.html" },
  },
  {
    title: "Entraînement et inférence",
    answer: "L'entraînement ajuste les paramètres d'un modèle à partir d'exemples. L'inférence désigne son exécution pour traiter une requête et produire une sortie ; pour un modèle de langage, celle-ci est souvent générée token par token. Les deux phases utilisent du calcul, mais répondent à des besoins d'usage différents.",
    keywords: ["entrainement", "entrainer", "apprentissage", "inference", "repondre", "reponse", "difference", "modele", "token", "requete", "generation"],
    source: { name: "Google AI · tokens et tokenisation", url: "https://ai.google.dev/gemini-api/docs/tokens" },
  },
  {
    title: "Le PUE d'un centre de données",
    answer: "Le PUE est le rapport entre l'énergie totale consommée par le site et celle utilisée par les équipements informatiques. Plus il est proche de 1, plus la part d'énergie supplémentaire du site est faible. Il ne mesure pas à lui seul les émissions de carbone, l'eau consommée ou l'efficacité d'un modèle.",
    keywords: ["pue", "efficacite", "energie", "refroidissement", "centre", "donnee", "carbone", "eau", "mesurer", "mesure"],
    source: { name: "Uptime Institute · Global PUEs", url: "https://journal.uptimeinstitute.com/global-pues-are-they-going-anywhere/" },
  },
  {
    title: "Le rôle du Transformer",
    answer: "L'article « Attention Is All You Need » (2017) propose une architecture appelée Transformer, fondée sur des mécanismes d'attention plutôt que sur la récurrence ou les convolutions. Les auteurs soulignent notamment sa parallélisabilité pour les tâches de traduction étudiées.",
    keywords: ["transformer", "attention", "architecture", "2017", "neurips", "reseau", "parallele"],
    source: { name: "NeurIPS · Attention Is All You Need", url: "https://proceedings.neurips.cc/paper/7181-attention-is-all-you-need" },
  },
  {
    title: "Ce que désigne l'IA générative",
    answer: "L'IA générative désigne des systèmes capables de produire du contenu — par exemple du texte, des images, de l'audio ou du code — à partir de régularités apprises dans des données. Le résultat est une génération du modèle, pas une garantie que chaque élément soit exact ou vérifié.",
    keywords: ["generative", "generatif", "generer", "creation", "creer", "produire", "contenu", "texte", "image", "audio", "video", "definition", "fonctionne"],
    source: { name: "NIST · Generative AI Profile", url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf" },
  },
  {
    title: "Tokens et traitement du texte",
    answer: "Les modèles de langage ne traitent pas directement les phrases comme des mots entiers : un texte est découpé en tokens, qui peuvent correspondre à un mot, une partie de mot ou un caractère. La tokenisation influence la façon dont le modèle reçoit et génère le texte, ainsi que le comptage de son entrée et de sa sortie.",
    keywords: ["token", "tokens", "tokenisation", "tokenization", "mot", "mots", "texte", "decoupage", "langage", "compter", "limite", "contexte"],
    source: { name: "Google AI · tokens et tokenisation", url: "https://ai.google.dev/gemini-api/docs/tokens" },
  },
  {
    title: "Pourquoi un modèle peut produire une information fausse",
    answer: "Un modèle génératif peut produire une réponse plausible mais inexacte, parfois appelée hallucination ou confabulation. La fluidité d'une réponse ne prouve donc pas sa véracité : pour un fait important, il faut vérifier les affirmations et leurs sources.",
    keywords: ["hallucination", "hallucinations", "confabulation", "erreur", "faux", "fausse", "inexact", "fiabilite", "verite", "verifier", "verification", "plausible", "inventer", "invente", "reponse"],
    source: { name: "NIST · Generative AI Profile", url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf" },
  },
  {
    title: "Évaluer les risques d'un système d'IA générative",
    answer: "Le profil du NIST recommande d'intégrer la gestion des risques tout au long du cycle de vie : définir le contexte d'usage, mesurer et documenter les résultats, tester les limites, puis suivre le système après son déploiement. Une seule note ou démonstration ne suffit pas à établir qu'un système est fiable dans tous les contextes.",
    keywords: ["evaluation", "evaluer", "risque", "risques", "tester", "test", "mesurer", "deploiement", "suivi", "responsable", "nist", "fiabilite"],
    source: { name: "NIST · AI Risk Management Framework: Generative AI Profile", url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf" },
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
        <span class="card-number">${topic.number} <span>/ ${String(topics.length).padStart(2, "0")}</span></span>
        <span class="card-icon icon-${topic.color}" aria-hidden="true">${topic.icon}</span>
      </div>
      <p class="card-category">${topic.category}</p>
      <h3>${topic.title}</h3>
      <p class="card-description">${topic.description}</p>
      <div class="card-bottom">
        <div class="tag-list">${topic.tags.map((tag) => `<span class="topic-tag">${tag}</span>`).join("")}</div>
        ${topic.dossier
    ? `<a class="card-link" href="#dossier-data-centres" aria-label="Ouvrir le dossier : ${topic.title}">↗</a>`
    : '<span class="card-link" aria-hidden="true">↗</span>'}
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

const assistantForm = document.querySelector("#assistant-form");
const assistantQuery = document.querySelector("#assistant-query");
const assistantResults = document.querySelector("#assistant-results");
const suggestedQuestions = [...document.querySelectorAll("[data-assistant-prompt]")];
const backToTop = document.querySelector("#back-to-top");
const sourceRegister = document.querySelector("#source-register");
const sourceSearchInput = document.querySelector("#source-search-input");
const sourceCount = document.querySelector("#source-count");
const sourceReviewStatus = document.querySelector("#sources-review-status");
const sourceEmpty = document.querySelector("#source-empty");
const sourceFilterButtons = [...document.querySelectorAll("[data-source-filter]")];
let activeSourceFilter = "all";

const visualExperience = document.querySelector("#visual-experience");
const sceneChoices = [...document.querySelectorAll("[data-scene-choice]")];
const sceneTitle = document.querySelector("#scene-title");
const sceneDescription = document.querySelector("#scene-description");
const sceneLink = document.querySelector("#scene-link");
const sceneContextTitle = document.querySelector("#scene-context-title");
const sceneContextDetail = document.querySelector("#scene-context-detail");
const sceneStatLabel = document.querySelector("#scene-stat-label");
const sceneIndex = document.querySelector("#scene-index");
const scenes = {
  infrastructure: {
    title: "L'infrastructure",
    description: "Des bâtiments et des machines qui rendent l'IA possible.",
    contextTitle: "INFRASTRUCTURES",
    contextDetail: "Énergie · calcul · réseau",
    stat: "LE SOCLE MATÉRIEL",
    link: "#dossier-data-centres",
  },
  robotique: {
    title: "La robotique",
    description: "Quand les modèles quittent l'écran pour agir dans le monde physique.",
    contextTitle: "ROBOTIQUE",
    contextDetail: "Perception · mouvement · action",
    stat: "L'IA DANS LE MONDE RÉEL",
    link: "#explorer",
  },
  reseaux: {
    title: "Les réseaux",
    description: "Des modèles, des données et des machines reliés à l'échelle du monde.",
    contextTitle: "SYSTÈMES CONNECTÉS",
    contextDetail: "Données · modèles · usages",
    stat: "UN ÉCOSYSTÈME RELIÉ",
    link: "#explorer",
  },
};
const sceneOrder = Object.keys(scenes);

sceneChoices.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedScene = button.dataset.sceneChoice;
    const scene = scenes[selectedScene];
    if (!scene) return;

    visualExperience.dataset.activeScene = selectedScene;
    sceneChoices.forEach((choice) => {
      const isSelected = choice === button;
      choice.classList.toggle("is-active", isSelected);
      choice.setAttribute("aria-pressed", String(isSelected));
    });
    sceneTitle.textContent = scene.title;
    sceneDescription.textContent = scene.description;
    sceneContextTitle.textContent = scene.contextTitle;
    sceneContextDetail.textContent = scene.contextDetail;
    sceneStatLabel.textContent = scene.stat;
    sceneLink.href = scene.link;
    sceneIndex.textContent = `${String(sceneOrder.indexOf(selectedScene) + 1).padStart(2, "0")} / ${String(sceneOrder.length).padStart(2, "0")}`;
  });
});

const assistantStopWords = new Set([
  "avec", "dans", "des", "elle", "elles", "est", "et", "la", "le", "les",
  "leur", "leurs", "mais", "mon", "ou", "pour", "pourquoi", "que", "quel",
  "quelle", "quels", "quelles", "qui", "sont", "sur", "un", "une", "entre",
  "combien", "comment", "du", "au", "aux", "en", "ce", "ces", "fait",
]);
const assistantGenericTerms = new Set(["centre", "donnee", "modele"]);

function normalizeText(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("fr");
}

function renderSourceCatalog() {
  const query = normalizeText(sourceSearchInput.value.trim());
  const unreviewedCount = sourceCatalog.filter((source) => !source.lastReviewedAt).length;
  sourceReviewStatus.textContent = `${String(unreviewedCount).padStart(2, "0")} fiches sans revue datée`;
  const visibleSources = sourceCatalog.filter((source) => {
    const matchesFilter = activeSourceFilter === "all" || source.family === activeSourceFilter;
    const searchableText = normalizeText([
      source.name,
      source.domain,
      source.publisherType,
      source.description,
      source.reviewCadence,
      source.linkLabel,
      source.topics.join(" "),
    ].join(" "));
    return matchesFilter && searchableText.includes(query);
  });

  sourceRegister.replaceChildren();
  visibleSources.forEach((source) => {
    const card = document.createElement("article");
    card.className = "source-card";

    const metadata = document.createElement("div");
    metadata.className = "source-card-meta";
    const domain = document.createElement("span");
    domain.textContent = source.domain;
    const publisherType = document.createElement("span");
    publisherType.textContent = source.publisherType;
    metadata.append(domain, publisherType);

    const title = document.createElement("h3");
    title.textContent = source.name;

    const description = document.createElement("p");
    description.textContent = source.description;

    const topics = document.createElement("ul");
    topics.className = "source-topics";
    topics.setAttribute("aria-label", "Thèmes couverts");
    source.topics.forEach((topic) => {
      const topicTag = document.createElement("li");
      topicTag.textContent = topic;
      topics.append(topicTag);
    });

    const footer = document.createElement("div");
    footer.className = "source-card-footer";
    const schedule = document.createElement("span");
    schedule.textContent = `Relecture proposée : ${source.reviewCadence}`;
    const lastReviewed = document.createElement("span");
    if (source.lastReviewedAt) {
      const reviewedDate = new Date(`${source.lastReviewedAt}T00:00:00`);
      lastReviewed.textContent = `Dernière revue éditoriale : ${reviewedDate.toLocaleDateString("fr-FR")}`;
    } else {
      lastReviewed.textContent = "Dernière revue éditoriale : non renseignée";
    }
    lastReviewed.className = source.lastReviewedAt ? "source-review-date" : "source-review-date is-unreviewed";

    const link = document.createElement("a");
    link.href = source.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.append(document.createTextNode(source.linkLabel));
    const externalIcon = document.createElement("span");
    externalIcon.setAttribute("aria-hidden", "true");
    externalIcon.textContent = "↗";
    link.append(externalIcon);

    footer.append(schedule, lastReviewed, link);
    card.append(metadata, title, description, topics, footer);
    sourceRegister.append(card);
  });

  const count = String(visibleSources.length).padStart(2, "0");
  sourceCount.textContent = `${count} ${visibleSources.length > 1 || visibleSources.length === 0 ? "sources" : "source"}`;
  sourceEmpty.hidden = visibleSources.length > 0;
  sourceRegister.hidden = visibleSources.length === 0;
}

function createCitationLink(source) {
  const link = document.createElement("a");
  link.href = source.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = `Lire la source : ${source.name} ↗`;
  return link;
}

function renderAssistantResults(question) {
  const queryTerms = [...new Set(
    normalizeText(question)
      .split(/[^a-z0-9]+/)
      .filter((term) => term.length >= 3
        && !assistantStopWords.has(term)
        && !assistantGenericTerms.has(term.replace(/s$/, ""))),
  )];

  assistantResults.replaceChildren();
  const heading = document.createElement("p");
  heading.className = "assistant-results-heading";
  heading.textContent = "REPÈRES RETROUVÉS DANS LE CORPUS";
  assistantResults.append(heading);

  const matches = assistantKnowledge
    .map((item) => {
      const matchedTerms = queryTerms.filter((term) => item.keywords.some((keyword) => {
        const normalizedKeyword = normalizeText(keyword);
        return normalizedKeyword === term
          || (term.length >= 4 && normalizedKeyword.startsWith(term))
          || (normalizedKeyword.length >= 4 && term.startsWith(normalizedKeyword));
      }));
      return { item, score: matchedTerms.length };
    })
    .filter((match) => match.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 3);

  if (matches.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "assistant-empty";
    emptyMessage.textContent = "Je n'ai pas trouvé de réponse dans les sources actuellement indexées. Essaie une question sur l'énergie, les régions, le cloud, le PUE, l'IA générative, les tokens ou la fiabilité des modèles.";
    assistantResults.append(emptyMessage);
    return;
  }

  const answerList = document.createElement("div");
  answerList.className = "assistant-answer-list";

  matches.forEach(({ item }) => {
    const card = document.createElement("article");
    card.className = "assistant-answer";

    const title = document.createElement("h3");
    title.textContent = item.title;

    const answer = document.createElement("p");
    answer.textContent = item.answer;

    const citation = document.createElement("div");
    citation.className = "assistant-citation";
    citation.append(createCitationLink(item.source));

    card.append(title, answer, citation);
    answerList.append(card);
  });

  assistantResults.append(answerList);
}

assistantForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = assistantQuery.value.trim();
  if (question) renderAssistantResults(question);
});

suggestedQuestions.forEach((button) => {
  button.addEventListener("click", () => {
    assistantQuery.value = button.dataset.assistantPrompt;
    renderAssistantResults(assistantQuery.value);
    assistantQuery.focus();
  });
});

sourceFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeSourceFilter = button.dataset.sourceFilter;
    sourceFilterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;
      filterButton.classList.toggle("is-selected", isSelected);
      filterButton.setAttribute("aria-pressed", String(isSelected));
    });
    renderSourceCatalog();
  });
});

sourceSearchInput.addEventListener("input", renderSourceCatalog);
renderSourceCatalog();

function updateBackToTopVisibility() {
  backToTop.hidden = window.scrollY < 500;
}

window.addEventListener("scroll", updateBackToTopVisibility, { passive: true });
updateBackToTopVisibility();

const dossierTabs = [...document.querySelectorAll("[data-dossier-tab]")];
const dossierPanels = [...document.querySelectorAll("[data-dossier-panel]")];

function selectDossierTab(selectedTab, moveFocus = false) {
  dossierTabs.forEach((tab) => {
    const isSelected = tab === selectedTab;
    tab.setAttribute("aria-selected", String(isSelected));
    tab.tabIndex = isSelected ? 0 : -1;
    dossierPanels.find((panel) => panel.id === tab.getAttribute("aria-controls")).hidden = !isSelected;
  });

  if (moveFocus) selectedTab.focus();
}

dossierTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectDossierTab(tab));
  tab.addEventListener("keydown", (event) => {
    let nextIndex;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % dossierTabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + dossierTabs.length) % dossierTabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = dossierTabs.length - 1;
    if (nextIndex === undefined) return;

    event.preventDefault();
    selectDossierTab(dossierTabs[nextIndex], true);
  });
});

selectDossierTab(dossierTabs[0]);

searchInput.addEventListener("input", renderTopics);
searchForm.addEventListener("submit", (event) => event.preventDefault());

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
  }
});

renderTopics();
