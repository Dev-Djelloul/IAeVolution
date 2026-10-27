import sourceCatalog from "./sources.json";
import { getSuggestedAnswer } from "./assistant-locales.js";
import { getLocalizedText, initializeTranslation, translateText, translateToFrench } from "./translation.js";

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
    target: "dossier-ia-generative",
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
    target: "dossier-agents-ia",
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
    target: "dossier-modeles-ouverts",
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
    target: "dossier-ia-responsable",
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
    target: "dossier-ia-quotidien",
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
    target: "dossier-prospective",
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
    target: "dossier-data-centres",
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

function renderTopics(queryValue = searchInput.value) {
  const locale = document.documentElement.lang || "fr";
  const query = queryValue.trim().toLocaleLowerCase(locale);
  const visibleTopics = topics.filter((topic) => {
    const matchesFilter = activeFilter === "all" || topic.filter === activeFilter;
    const searchableText = [
      topic.title,
      topic.description,
      topic.category,
      ...topic.tags,
      getLocalizedText(topic.title, locale),
      getLocalizedText(topic.description, locale),
      getLocalizedText(topic.category, locale),
      ...topic.tags.map((tag) => getLocalizedText(tag, locale)),
    ].join(" ").toLocaleLowerCase(locale);
    return matchesFilter && searchableText.includes(query);
  });

  grid.innerHTML = visibleTopics.map((topic) => `
    <a class="topic-card topic-card-${topic.color}" data-topic-id="${topic.id}" href="#${topic.target}" aria-label="Ouvrir le dossier : ${topic.title}">
      <div class="card-topline">
        <span class="card-number">${topic.number} <span>/ ${String(topics.length).padStart(2, "0")}</span></span>
        <span class="card-icon icon-${topic.color}" aria-hidden="true">${topic.icon}</span>
      </div>
      <p class="card-category">${topic.category}</p>
      <h3>${topic.title}</h3>
      <p class="card-description">${topic.description}</p>
      <div class="card-bottom">
        <div class="tag-list">${topic.tags.map((tag) => `<span class="topic-tag">${tag}</span>`).join("")}</div>
        <span class="card-link" aria-hidden="true">↗</span>
      </div>
    </a>
  `).join("");

  const count = String(visibleTopics.length).padStart(2, "0");
  const countLabel = getLocalizedText(visibleTopics.length > 1 ? "sujets" : "sujet", locale);
  resultsLabel.textContent = `${count} ${countLabel}`;
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
const sceneCanvas = document.querySelector(".scene-canvas");
const datacenterScene = document.querySelector("#datacenter-scene");
const datacenterStage = document.querySelector(".datacenter-stage");
const datacenterWorld = document.querySelector("#datacenter-world");
const dataCenterZones = [...document.querySelectorAll(".datacenter-hotspot[data-zone]")];
const cameraTurnButtons = [...document.querySelectorAll("[data-camera-turn]")];
const cameraResetButton = document.querySelector("[data-camera-reset]");
const toggleSceneViewButton = document.querySelector("#toggle-scene-view");
const robotZones = [...document.querySelectorAll(".robot-hotspot[data-robot-zone]")];
const actPlayer = document.querySelector(".act-player");
const tourStartButton = document.querySelector("[data-tour-start]");
const tourVoiceButton = document.querySelector("[data-tour-voice]");
const tourPauseButton = document.querySelector("[data-tour-pause]");
const tourPreviousButton = document.querySelector("[data-tour-previous]");
const tourNextButton = document.querySelector("[data-tour-next]");
const tourStopButton = document.querySelector("[data-tour-stop]");
const tourStatus = document.querySelector("[data-tour-status]");
const tourDossierLink = document.querySelector("[data-tour-dossier]");
const tourSteps = [...document.querySelectorAll("[data-tour-step]")];
const tourStepKicker = document.querySelector("#act-step-kicker");
const tourStepTitle = document.querySelector("#act-step-title");
const tourStepSummary = document.querySelector("#act-step-summary");
const tourFactValue = document.querySelector("#act-fact-value");
const tourFactNote = document.querySelector("#act-fact-note");
const tourNarrationText = document.querySelector("#act-narration-text");
const tourSource = document.querySelector("#act-source");
const sceneExplorer = document.querySelector(".scene-explorer");
const heroSection = document.querySelector(".hero");
const dataCenterZoneDetails = {
  compute: {
    title: "Le calcul",
    description: "Les serveurs hébergent les accélérateurs, la mémoire et le stockage utilisés par les services d'IA.",
    contextTitle: "SERVEURS",
    contextDetail: "Calcul · mémoire · stockage",
    stat: "LE COEUR DU CALCUL",
    sourceName: "OCDE · Infrastructure IA",
    sourceUrl: "https://www.oecd.org/en/publications/competition-in-artificial-intelligence-infrastructure_623d1874-en/full-report.html",
  },
  energy: {
    title: "L'alimentation électrique",
    description: "Le site dépend d'une puissance disponible, de systèmes de conversion et de solutions de secours adaptées.",
    contextTitle: "ÉNERGIE",
    contextDetail: "Réseau · conversion · secours",
    stat: "ALIMENTER LE CALCUL",
    sourceName: "AIE · Energy and AI",
    sourceUrl: "https://www.iea.org/reports/energy-and-ai",
  },
  cooling: {
    title: "Le refroidissement",
    description: "Évacuer la chaleur des équipements demande des choix techniques qui dépendent aussi du climat et des ressources locales.",
    contextTitle: "REFROIDISSEMENT",
    contextDetail: "Chaleur · air · eau",
    stat: "MAÎTRISER LA CHALEUR",
    sourceName: "AIE · Energy and AI",
    sourceUrl: "https://www.iea.org/reports/energy-and-ai",
  },
  network: {
    title: "Le réseau & le stockage",
    description: "Les réseaux et le stockage relient les machines, les données et les services aux utilisateurs.",
    contextTitle: "INTERCONNEXION",
    contextDetail: "Réseaux · données · échanges",
    stat: "RELIER LES SYSTÈMES",
    sourceName: "OCDE · Infrastructure IA",
    sourceUrl: "https://www.oecd.org/en/publications/competition-in-artificial-intelligence-infrastructure_623d1874-en/full-report.html",
  },
};
const robotZoneDetails = {
  perception: {
    title: "Percevoir le monde",
    description: "Caméras, lidar et autres capteurs transforment un environnement incomplet en mesures. Les algorithmes en tirent une représentation, toujours soumise à l'incertitude.",
    contextTitle: "PERCEPTION",
    contextDetail: "Capteurs · mesures · incertitude",
    stat: "OBSERVER AVANT D'AGIR",
    sourceName: "NIST · Perception des robots",
    sourceUrl: "https://www.nist.gov/programs-projects/perception-performance-robotic-systems",
  },
  control: {
    title: "Décider et contrôler",
    description: "Le système combine ses observations avec un objectif et des contraintes pour choisir une action. Une partie du contrôle peut rester déterministe : toute robotique n'est pas pilotée par un modèle génératif.",
    contextTitle: "DÉCISION & CONTRÔLE",
    contextDetail: "Objectif · planification · commande",
    stat: "TRADUIRE UN OBJECTIF",
    sourceName: "NIST · Robotique",
    sourceUrl: "https://www.nist.gov/programs-projects/robotics",
  },
  action: {
    title: "Agir dans le monde",
    description: "Les moteurs et actionneurs convertissent des commandes en mouvement : saisir, déplacer ou se réorienter. Le résultat dépend aussi des limites mécaniques et de la calibration.",
    contextTitle: "ACTION",
    contextDetail: "Commandes · moteurs · mouvement",
    stat: "TRANSFORMER LE SIGNAL",
    sourceName: "NIST · Robotique",
    sourceUrl: "https://www.nist.gov/programs-projects/robotics",
  },
  safety: {
    title: "Partager l'espace en sécurité",
    description: "La vitesse, les forces, les distances d'arrêt et la présence de personnes comptent dans le déploiement. La sécurité repose sur la conception et l'évaluation de tout le système, pas sur l'IA seule.",
    contextTitle: "SÉCURITÉ",
    contextDetail: "Personnes · limites · validation",
    stat: "SÉCURISER L'USAGE",
    sourceName: "OSHA · Sécurité robotique",
    sourceUrl: "https://www.osha.gov/robotics",
  },
};
const scenes = {
  infrastructure: {
    title: dataCenterZoneDetails.compute.title,
    description: dataCenterZoneDetails.compute.description,
    contextTitle: "INFRASTRUCTURES",
    contextDetail: "Énergie · calcul · réseau",
    stat: dataCenterZoneDetails.compute.stat,
    link: "#dossier-data-centres",
    sourceName: dataCenterZoneDetails.compute.sourceName,
    sourceUrl: dataCenterZoneDetails.compute.sourceUrl,
  },
  robotique: {
    ...robotZoneDetails.perception,
    link: "#explorer",
  },
  reseaux: {
    title: "Les réseaux",
    description: "Des modèles, des données et des machines reliés à l'échelle du monde.",
    contextTitle: "SYSTÈMES CONNECTÉS",
    contextDetail: "Données · modèles · usages",
    stat: "UN ÉCOSYSTÈME RELIÉ",
    link: "#explorer",
    sourceName: "OCDE · Infrastructure IA",
    sourceUrl: "https://www.oecd.org/en/publications/competition-in-artificial-intelligence-infrastructure_623d1874-en/full-report.html",
  },
};
const sceneOrder = Object.keys(scenes);
let cameraYaw = -36;

const guidedTourSteps = [
  {
    beat: "energy",
    zone: "energy",
    name: "Électricité",
    title: "Tout commence par le courant",
    summary: "Avant de produire une réponse, une IA a besoin de machines alimentées en électricité.",
    factValue: "≈ 415 TWh",
    factNote: "d'électricité consommés par les centres de données dans le monde en 2024 — pas par l'IA seule.",
    narration: "Une réponse d'intelligence artificielle paraît immatérielle. Pourtant, avant l'écran, il faut d'abord alimenter des machines. En 2024, les centres de données dans le monde ont consommé environ 415 térawattheures. Ce chiffre englobe tous les centres de données, pas seulement ceux dédiés à l'intelligence artificielle.",
    sourceName: "AIE · Energy and AI",
    sourceUrl: "https://www.iea.org/reports/energy-and-ai",
  },
  {
    beat: "compute",
    zone: "compute",
    name: "Machines",
    title: "Des puces calculent dans des serveurs",
    summary: "Les serveurs rassemblent des puces spécialisées, de la mémoire et du stockage pour exécuter les modèles.",
    factValue: "Puces · mémoire · stockage",
    factNote: "Les composants travaillent ensemble ; aucun ne suffit à lui seul à faire fonctionner un service d'IA.",
    narration: "L'électricité arrive dans un centre de données. À l'intérieur, des serveurs regroupent les composants informatiques. Des puces spécialisées effectuent les calculs ; la mémoire et le stockage gardent les données nécessaires au service.",
    sourceName: "OCDE · Infrastructure IA",
    sourceUrl: "https://www.oecd.org/en/publications/competition-in-artificial-intelligence-infrastructure_623d1874-en/full-report.html",
  },
  {
    beat: "heat",
    zone: "cooling",
    name: "Chaleur",
    title: "Le calcul produit aussi de la chaleur",
    summary: "Alimenter, refroidir et relier les machines fait partie du fonctionnement d'un centre de données.",
    factValue: "Énergie → calcul → chaleur",
    factNote: "L'emplacement, le climat et les choix de refroidissement influencent les besoins du site.",
    narration: "Quand les puces calculent, elles consomment de l'électricité et dégagent de la chaleur. Le centre doit donc aussi évacuer cette chaleur et relier ses machines aux réseaux. L'énergie, le refroidissement et la connectivité font partie de l'infrastructure de l'IA.",
    sourceName: "AIE · Energy and AI",
    sourceUrl: "https://www.iea.org/reports/energy-and-ai",
  },
];
let tourIndex = 0;
let tourState = "ready";
let tourVoiceEnabled = true;
let tourUtterance = null;
let tourTimer = null;
let tourDeadline = 0;
let tourRemainingMs = 0;
let tourWaitingForAdvance = false;
const tourMotionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

function renderSceneDetails(details) {
  sceneTitle.textContent = details.title;
  sceneDescription.textContent = details.description;
  sceneContextTitle.textContent = details.contextTitle;
  sceneContextDetail.textContent = details.contextDetail;
  sceneStatLabel.textContent = details.stat;
  sceneSource.textContent = `Source : ${details.sourceName} ↗`;
  sceneSource.href = details.sourceUrl;
}

function setCameraYaw(nextYaw) {
  cameraYaw = ((nextYaw + 180) % 360 + 360) % 360 - 180;
  datacenterWorld.style.setProperty("--camera-yaw", `${cameraYaw}deg`);
}

const sceneSource = document.querySelector("#scene-source");

function selectDataCenterZone(button) {
  const details = dataCenterZoneDetails[button.dataset.zone];
  if (!details) return;
  dataCenterZones.forEach((zone) => {
    const isSelected = zone === button;
    zone.classList.toggle("is-active", isSelected);
    zone.setAttribute("aria-pressed", String(isSelected));
  });
  datacenterWorld.dataset.zone = button.dataset.zone;
  renderSceneDetails(details);
}

function selectRobotZone(button) {
  const details = robotZoneDetails[button.dataset.robotZone];
  if (!details) return;
  robotZones.forEach((zone) => {
    const isSelected = zone === button;
    zone.classList.toggle("is-active", isSelected);
    zone.setAttribute("aria-pressed", String(isSelected));
  });
  visualExperience.dataset.robotZone = button.dataset.robotZone;
  renderSceneDetails(details);
}

dataCenterZones.forEach((button) => {
  button.addEventListener("click", () => selectDataCenterZone(button));
});

robotZones.forEach((button) => {
  button.addEventListener("click", () => selectRobotZone(button));
});

cameraTurnButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setCameraYaw(cameraYaw + Number(button.dataset.cameraTurn) * 22);
  });
});

cameraResetButton.addEventListener("click", () => setCameraYaw(-36));

toggleSceneViewButton.addEventListener("click", () => {
  const showIllustration = sceneCanvas.dataset.illustrated !== "true";
  datacenterStage.hidden = showIllustration;
  datacenterStage.inert = showIllustration;
  datacenterStage.setAttribute("aria-hidden", String(showIllustration));
  sceneCanvas.dataset.illustrated = String(showIllustration);
  toggleSceneViewButton.textContent = showIllustration ? "Vue 3D" : "Vue illustrée";
  toggleSceneViewButton.setAttribute("aria-label", showIllustration ? "Revenir à la vue 3D" : "Basculer vers la vue illustrée");
});

function clearTourTimer() {
  if (tourTimer !== null) {
    window.clearTimeout(tourTimer);
    tourTimer = null;
  }
}

function cancelTourSpeech() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  tourUtterance = null;
}

function setTourState(nextState) {
  tourState = nextState;
  actPlayer.dataset.tourState = nextState;
  visualExperience.dataset.tourState = nextState;
  tourStartButton.hidden = nextState === "playing" || nextState === "paused";
  tourPauseButton.hidden = nextState !== "playing" && nextState !== "paused";
  tourPreviousButton.hidden = nextState !== "playing" && nextState !== "paused";
  tourNextButton.hidden = nextState !== "playing" && nextState !== "paused";
  tourStopButton.hidden = nextState !== "playing" && nextState !== "paused";
  tourDossierLink.hidden = nextState !== "complete";
  tourPauseButton.textContent = nextState === "paused" ? "Reprendre" : "Pause";
  tourStartButton.childNodes[0].textContent = nextState === "complete" ? "Revoir l’acte " : "Lancer la visite ";
  tourStartButton.querySelector("span").textContent = nextState === "complete" ? "↻" : "▶";
  if (nextState === "complete") {
    clearTourTimer();
    cancelTourSpeech();
  }
}

function setTourStep(index, { speak = tourState === "playing" } = {}) {
  tourIndex = Math.max(0, Math.min(index, guidedTourSteps.length - 1));
  tourWaitingForAdvance = false;
  const step = guidedTourSteps[tourIndex];
  tourStepKicker.textContent = `ÉTAPE ${tourIndex + 1} / ${guidedTourSteps.length} · ${step.name.toLocaleUpperCase("fr")}`;
  tourStepTitle.textContent = step.title;
  tourStepSummary.textContent = step.summary;
  tourFactValue.textContent = step.factValue;
  tourFactNote.textContent = step.factNote;
  tourNarrationText.textContent = `« ${step.narration} »`;
  tourSource.textContent = `Source : ${step.sourceName} ↗`;
  tourSource.href = step.sourceUrl;
  visualExperience.dataset.storyBeat = step.beat;
  datacenterWorld.dataset.zone = step.zone;
  tourSteps.forEach((button, buttonIndex) => {
    if (buttonIndex === tourIndex) {
      button.classList.add("is-current");
      button.setAttribute("aria-current", "step");
    } else {
      button.classList.remove("is-current");
      button.removeAttribute("aria-current");
    }
  });
  tourPreviousButton.disabled = tourIndex === 0;
  tourNextButton.disabled = false;
  tourNextButton.setAttribute("aria-label", tourIndex === guidedTourSteps.length - 1 ? "Terminer l'acte" : "Passer à l'étape suivante");
  if (tourState === "paused") {
    clearTourTimer();
    cancelTourSpeech();
  } else if (speak) {
    speakTourStep();
  }
}

function scheduleTourAdvance(delay) {
  clearTourTimer();
  tourWaitingForAdvance = true;
  tourRemainingMs = delay;
  tourDeadline = Date.now() + delay;
  if (tourMotionPreference.matches || tourState !== "playing") return;
  tourTimer = window.setTimeout(() => {
    tourTimer = null;
    advanceTour();
  }, delay);
}

function finishTourStepWithoutVoice() {
  const estimatedReadTime = Math.max(9000, guidedTourSteps[tourIndex].narration.split(/\s+/).length * 390);
  if (tourMotionPreference.matches) {
    tourStatus.textContent = "Narration indisponible · utilisez les flèches pour avancer à votre rythme.";
    return;
  }
  scheduleTourAdvance(estimatedReadTime);
}

async function speakTourStep() {
  clearTourTimer();
  cancelTourSpeech();
  tourWaitingForAdvance = false;
  const step = guidedTourSteps[tourIndex];
  if (!tourVoiceEnabled || !window.speechSynthesis || !("SpeechSynthesisUtterance" in window)) {
    finishTourStepWithoutVoice();
    return;
  }

  const locale = document.documentElement.lang || "fr";
  let narration = step.narration;
  let narrationLocale = locale;
  narration = await translateText(step.narration, locale);
  if (narration === step.narration) narrationLocale = "fr";
  if (!tourVoiceEnabled || tourState !== "playing" || guidedTourSteps[tourIndex] !== step) return;
  const utterance = new SpeechSynthesisUtterance(narration);
  utterance.lang = narrationLocale;
  utterance.rate = 0.94;
  const localePrefix = narrationLocale.toLocaleLowerCase().split("-")[0];
  const languageVoice = window.speechSynthesis.getVoices().find((voice) => voice.lang.toLocaleLowerCase().startsWith(localePrefix));
  if (languageVoice) utterance.voice = languageVoice;
  tourUtterance = utterance;
  utterance.onend = () => {
    if (tourUtterance !== utterance || tourState !== "playing") return;
    tourUtterance = null;
    tourWaitingForAdvance = true;
    if (tourMotionPreference.matches) {
      tourStatus.textContent = "Étape terminée · avancez quand vous le souhaitez.";
      return;
    }
    scheduleTourAdvance(3500);
  };
  utterance.onerror = () => {
    if (tourUtterance !== utterance || tourState !== "playing") return;
    tourUtterance = null;
    tourStatus.textContent = "Voix indisponible · la visite continue avec le texte à l'écran.";
    finishTourStepWithoutVoice();
  };
  tourStatus.textContent = "Écoutez la narration · vous pouvez mettre la visite en pause.";
  try {
    window.speechSynthesis.speak(utterance);
  } catch {
    tourUtterance = null;
    tourStatus.textContent = "Voix indisponible · la visite continue avec le texte à l'écran.";
    finishTourStepWithoutVoice();
  }
}

function advanceTour() {
  if (tourState === "paused") {
    if (tourIndex === guidedTourSteps.length - 1) {
      setTourState("complete");
      tourStatus.textContent = "Fin de l'acte 1 · vous pouvez revoir le parcours ou explorer le dossier détaillé.";
      return;
    }
    setTourStep(tourIndex + 1, { speak: false });
    tourStatus.textContent = `En pause · étape ${tourIndex + 1} sélectionnée. Reprenez ou avancez à votre rythme.`;
    return;
  }
  if (tourState !== "playing") return;
  if (tourIndex === guidedTourSteps.length - 1) {
    clearTourTimer();
    cancelTourSpeech();
    setTourState("complete");
    tourStatus.textContent = "Fin de l'acte 1 · vous pouvez revoir le parcours ou explorer le dossier détaillé.";
    return;
  }
  setTourStep(tourIndex + 1);
}

tourSteps.forEach((button) => {
  button.addEventListener("click", () => {
    if (tourState === "complete") setTourState("ready");
    setTourStep(Number(button.dataset.tourStep));
    if (tourState !== "playing" && tourState !== "paused") {
      tourStatus.textContent = `Étape ${tourIndex + 1} sélectionnée · lancez la visite pour écouter la narration.`;
    }
  });
});

tourStartButton.addEventListener("click", () => {
  if (tourState === "paused") {
    tourPauseButton.click();
    return;
  }
  if (tourState === "complete") setTourStep(0, { speak: false });
  setTourState("playing");
  tourStatus.textContent = "La visite commence · la narration peut être mise en pause.";
  speakTourStep();
});

tourVoiceButton.addEventListener("click", () => {
  tourVoiceEnabled = !tourVoiceEnabled;
  tourVoiceButton.setAttribute("aria-pressed", String(tourVoiceEnabled));
  tourVoiceButton.classList.toggle("is-enabled", tourVoiceEnabled);
  tourVoiceButton.textContent = tourVoiceEnabled ? "Voix activée" : "Voix désactivée";
  if (tourState === "ready" || tourState === "complete") {
    tourStatus.textContent = tourVoiceEnabled
      ? "Voix activée · la narration démarre lorsque vous lancez la visite."
      : "Voix désactivée · le texte affiché guide la visite.";
  }
  if (tourState === "playing") {
    if (tourVoiceEnabled) {
      speakTourStep();
    } else {
      cancelTourSpeech();
      tourStatus.textContent = "Voix désactivée · le texte reste affiché et la visite continue.";
      finishTourStepWithoutVoice();
    }
  } else if (tourState === "paused") {
    if (tourVoiceEnabled) {
      tourWaitingForAdvance = false;
    } else {
      cancelTourSpeech();
      tourWaitingForAdvance = true;
      tourRemainingMs = 9000;
    }
  }
});

tourPauseButton.addEventListener("click", () => {
  if (tourState === "playing") {
    tourRemainingMs = Math.max(0, tourDeadline - Date.now());
    clearTourTimer();
    if (tourUtterance && window.speechSynthesis) window.speechSynthesis.pause();
    setTourState("paused");
    tourStatus.textContent = "Visite en pause · reprenez ou avancez manuellement.";
  } else if (tourState === "paused") {
    setTourState("playing");
    if (tourUtterance && window.speechSynthesis) {
      window.speechSynthesis.resume();
      tourStatus.textContent = "La narration reprend.";
    } else if (tourWaitingForAdvance) {
      if (!tourMotionPreference.matches) scheduleTourAdvance(tourRemainingMs || 1000);
      tourStatus.textContent = tourMotionPreference.matches
        ? "La narration est terminée · avancez avec la flèche quand vous le souhaitez."
        : "La visite reprend · utilisez pause à tout moment.";
    } else {
      speakTourStep();
    }
  }
});

tourPreviousButton.addEventListener("click", () => {
  if (tourIndex === 0) return;
  if (tourState === "complete") setTourState("ready");
  setTourStep(tourIndex - 1);
});

tourNextButton.addEventListener("click", advanceTour);

tourStopButton.addEventListener("click", () => {
  clearTourTimer();
  cancelTourSpeech();
  setTourState("ready");
  tourStatus.textContent = "Visite arrêtée · relancez-la quand vous le souhaitez.";
});

sceneExplorer.addEventListener("toggle", () => {
  const isOpen = sceneExplorer.open;
  heroSection.dataset.exploration = isOpen ? "open" : "closed";
  datacenterStage.inert = !isOpen;
  datacenterStage.setAttribute("aria-hidden", String(!isOpen));
  dataCenterZones.forEach((button) => {
    button.tabIndex = isOpen ? 0 : -1;
  });
  cameraTurnButtons.forEach((button) => {
    button.tabIndex = isOpen ? 0 : -1;
  });
  cameraResetButton.tabIndex = isOpen ? 0 : -1;
  toggleSceneViewButton.tabIndex = isOpen ? 0 : -1;
});

tourMotionPreference.addEventListener("change", () => {
  if (tourState !== "playing") return;
  if (tourMotionPreference.matches) {
    tourRemainingMs = Math.max(0, tourDeadline - Date.now());
    clearTourTimer();
    tourStatus.textContent = "Réduction des animations activée · la narration continue, avancez entre les étapes avec les flèches.";
  } else if (tourWaitingForAdvance) {
    scheduleTourAdvance(tourRemainingMs || 1000);
  }
});

let dragStart = null;
datacenterStage.addEventListener("pointerdown", (event) => {
  if (event.target.closest("button")) return;
  dragStart = { x: event.clientX, yaw: cameraYaw, pointerId: event.pointerId };
  datacenterStage.setPointerCapture(event.pointerId);
});

datacenterStage.addEventListener("pointermove", (event) => {
  if (!dragStart || dragStart.pointerId !== event.pointerId) return;
  setCameraYaw(dragStart.yaw + (event.clientX - dragStart.x) * 0.55);
});

function finishSceneDrag(event) {
  if (dragStart?.pointerId === event.pointerId) dragStart = null;
}
datacenterStage.addEventListener("pointerup", finishSceneDrag);
datacenterStage.addEventListener("pointercancel", finishSceneDrag);

datacenterStage.addEventListener("keydown", (event) => {
  if (event.target.closest("button")) return;
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    setCameraYaw(cameraYaw + (event.key === "ArrowLeft" ? -22 : 22));
  } else if (event.key === "Home") {
    event.preventDefault();
    setCameraYaw(-36);
  }
});

sceneChoices.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedScene = button.dataset.sceneChoice;
    const scene = scenes[selectedScene];
    if (!scene) return;

    visualExperience.dataset.activeScene = selectedScene;
    const showDataCenter = selectedScene === "infrastructure";
    const showRobot = selectedScene === "robotique";
    const showIllustration = sceneCanvas.dataset.illustrated === "true";
    datacenterScene.hidden = !showDataCenter;
    datacenterScene.inert = !showDataCenter;
    datacenterScene.setAttribute("aria-hidden", String(!showDataCenter));
    datacenterStage.hidden = !showDataCenter || showIllustration;
    datacenterStage.inert = !showDataCenter || showIllustration;
    datacenterStage.setAttribute("aria-hidden", String(!showDataCenter || showIllustration));
    sceneSource.hidden = !showDataCenter && !showRobot;
    sceneChoices.forEach((choice) => {
      const isSelected = choice === button;
      choice.classList.toggle("is-active", isSelected);
      choice.setAttribute("aria-pressed", String(isSelected));
    });
    if (showDataCenter) {
      selectDataCenterZone(dataCenterZones.find((zone) => zone.dataset.zone === "compute"));
    } else if (showRobot) {
      selectRobotZone(robotZones.find((zone) => zone.dataset.robotZone === "perception"));
    } else {
      renderSceneDetails(scene);
    }
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

let sourceSearchFrenchQuery = "";

function renderSourceCatalog(queryValue = sourceSearchFrenchQuery) {
  const query = normalizeText(queryValue.trim());
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
      lastReviewed.textContent = `Dernière revue éditoriale : ${reviewedDate.toLocaleDateString(document.documentElement.lang)}`;
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
  link.textContent = `${getLocalizedText("Lire la source : ").trimEnd()} ${source.name} ↗`;
  return link;
}

let currentAssistantQuestion = "";

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

    const localizedAnswer = getSuggestedAnswer(item.title, document.documentElement.lang || "fr");
    const title = document.createElement("h3");
    title.textContent = localizedAnswer?.title ?? getLocalizedText(item.title);

    const answer = document.createElement("p");
    answer.textContent = localizedAnswer?.answer ?? getLocalizedText(item.answer);

    const citation = document.createElement("div");
    citation.className = "assistant-citation";
    citation.append(createCitationLink(item.source));

    card.append(title, answer, citation);
    answerList.append(card);
  });

  assistantResults.append(answerList);
}

assistantForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const question = assistantQuery.value.trim();
  if (!question) return;
  currentAssistantQuestion = await translateToFrench(question);
  renderAssistantResults(currentAssistantQuestion);
});

suggestedQuestions.forEach((button) => {
  button.addEventListener("click", async () => {
    assistantQuery.value = button.dataset.assistantPrompt;
    assistantQuery.focus();
    currentAssistantQuestion = await translateToFrench(assistantQuery.value);
    renderAssistantResults(currentAssistantQuestion);
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

let sourceSearchRequest = 0;
let sourceSearchTimer;
sourceSearchInput.addEventListener("input", () => {
  const request = ++sourceSearchRequest;
  window.clearTimeout(sourceSearchTimer);
  sourceSearchTimer = window.setTimeout(async () => {
    const query = await translateToFrench(sourceSearchInput.value);
    if (request !== sourceSearchRequest) return;
    sourceSearchFrenchQuery = query;
    renderSourceCatalog(query);
  }, 250);
});
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

document.querySelectorAll("[data-compass-tab]").forEach((link) => {
  link.addEventListener("click", () => {
    const targetTab = dossierTabs.find((tab) => tab.id === link.dataset.compassTab);
    if (targetTab) selectDossierTab(targetTab);
  });
});

selectDossierTab(dossierTabs[0]);

let topicSearchRequest = 0;
let topicSearchTimer;
searchInput.addEventListener("input", () => {
  const request = ++topicSearchRequest;
  window.clearTimeout(topicSearchTimer);
  topicSearchTimer = window.setTimeout(async () => {
    const query = await translateToFrench(searchInput.value);
    if (request === topicSearchRequest) renderTopics(query);
  }, 250);
});
searchForm.addEventListener("submit", (event) => event.preventDefault());

document.addEventListener("iaevolution:languagechange", async () => {
  if (currentAssistantQuestion) renderAssistantResults(currentAssistantQuestion);
  const topicRequest = ++topicSearchRequest;
  const sourceRequest = ++sourceSearchRequest;
  const [topicQuery, sourceQuery] = await Promise.all([
    translateToFrench(searchInput.value),
    translateToFrench(sourceSearchInput.value),
  ]);
  if (topicRequest === topicSearchRequest) renderTopics(topicQuery);
  if (sourceRequest === sourceSearchRequest) {
    sourceSearchFrenchQuery = sourceQuery;
    renderSourceCatalog(sourceQuery);
  }
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
  }
});

renderTopics();
initializeTranslation();
