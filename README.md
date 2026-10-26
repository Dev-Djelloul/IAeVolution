# IAeVolution

**Observer l'intelligence artificielle. Comprendre ce qui change. Anticiper ce qui vient.**

IAeVolution est le point de départ d'un observatoire de l'IA conçu pour rendre un sujet
complexe plus lisible, utile et accessible. L'ambition est d'en faire une expérience
visuelle et immersive — images, 3D, robotique et esthétique technologique — soutenue par
des contenus éditoriaux sourcés et, à terme, un assistant vocal capable de guider
l'exploration du corpus IAeVolution et de ressources accessibles sur le Web. Ce prototype
front-end propose une exploration thématique et un premier dossier sur les centres de
données, avec des angles géographiques, économiques, historiques et techniques. Le volet
géographique compare trois exemples régionaux documentés ; le volet économique visualise
les couches de la chaîne de valeur de l'IA ; le volet historique relie des jalons de
l'informatique, du cloud et de l'IA ; le volet technique distingue entraînement, inférence,
infrastructure et évaluation. L'accueil propose une maquette de centre de données en CSS
3D, que l'on peut faire tourner et explorer par zones sourcées, avec une vue illustrée de
repli. Les angles robotique et réseaux restent des scènes SVG interactives. La maquette est
pédagogique, non à l'échelle, et n'utilise ni WebGL ni bibliothèque 3D.
Un registre éditorial structuré présente un premier ensemble de sources institutionnelles,
scientifiques, sectorielles et techniques ; il peut être recherché et filtré par famille.
Ses fiches sont maintenues dans `sources.json` : chaque source porte un identifiant stable,
des thèmes, une cadence de relecture proposée et un champ `lastReviewedAt` (date ISO `YYYY-MM-DD`
ou `null` si aucune revue éditoriale n'a été consignée). L'interface rend visibles les dates
absentes et les thèmes ; cette métadonnée ne constitue pas un contrôle automatique des liens.
Le registre inclut aussi une méthode de vérification et des rythmes proposés, non automatisés.
Les contenus ne constituent pas une veille en temps réel ni une couverture exhaustive du Web.
Un assistant documentaire permet aussi de retrouver localement quelques réponses
éditorialisées et leurs sources sur les centres de données et les premiers repères de l'IA
générative. Il n'utilise pas de
modèle génératif, n'envoie pas les questions à un service externe et répond qu'il ne sait
pas lorsque le corpus indexé ne couvre pas la question.

## Environnement de développement

Prérequis : Node.js 22.12 ou supérieur et npm.

```sh
npm install
npm run dev
```

Vite affiche l'adresse locale à ouvrir dans le navigateur. Pour vérifier la version de
production, utilisez `npm run build`, puis `npm run preview`.

Le prototype ne dépend pas encore d'un backend, d'une base de données ou d'une clé API.

## Cadrage technique

La prochaine étape est de faire tester la maquette sur différents appareils et de vérifier
son accessibilité et ses performances avant d'envisager un moteur 3D temps réel ou d'étendre
la scène. L'architecture cible est progressive et indépendante d'un fournisseur :
expérience visuelle, données traçables, recherche séparée dans le corpus éditorial et sur
le Web, puis assistant vocal et génération éventuelle sous contrôle. Le schéma, les flux,
les garde-fous et les décisions ouvertes sont détaillés dans [le cadrage technique](docs/architecture-technique.md).

## Cap proposé

- **Explorer** l'IA par des images, des scènes, des objets et des visualisations accessibles.
- **Suivre** les avancées, acteurs, modèles et usages de l'IA, avec des sources datées.
- **Comprendre** les concepts grâce à des explications adaptées à différents niveaux.
- **Comparer** les outils selon leurs usages, leur accessibilité et leurs limites.
- **Garder du recul** sur les enjeux de fiabilité, de vie privée, d'énergie et de société.

Les contenus et le registre actuellement affichés sont éditoriaux et statiques : les
sources ne sont pas surveillées automatiquement et aucune revue éditoriale n'est encore
datée dans le catalogue. Une prochaine étape pourra concevoir la collecte, la validation
et l'historique nécessaires à une véritable veille. L'assistant actuel est une recherche
locale limitée, pas un assistant vocal ou un moteur de recherche Web.
