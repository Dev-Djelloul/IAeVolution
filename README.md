# IAeVolution

**Observer l'intelligence artificielle. Comprendre ce qui change. Anticiper ce qui vient.**

IAeVolution est le point de départ d'un observatoire de l'IA conçu pour rendre un sujet
complexe plus lisible, utile et accessible. Ce prototype front-end propose une exploration
thématique et un premier dossier sur les centres de données, avec des angles géographiques,
économiques, historiques et techniques. Le volet géographique compare trois exemples
régionaux documentés ; le volet économique visualise les couches de la chaîne de valeur
de l'IA ; le volet historique relie des jalons de l'informatique, du cloud et de l'IA ;
le volet technique distingue entraînement, inférence, infrastructure et évaluation.
Un registre éditorial présente un premier ensemble de sources institutionnelles,
scientifiques, sectorielles et techniques, avec une méthode de vérification et des
rythmes de relecture proposés. Ces rythmes ne sont pas automatisés.
Les contenus ne constituent pas une veille en temps réel. Un assistant documentaire
permet aussi de retrouver localement quelques réponses éditorialisées et leurs sources,
sur les centres de données et les premiers repères de l'IA générative. Il n'utilise pas de
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

## Cap proposé

- **Suivre** les avancées, acteurs, modèles et usages de l'IA, avec des sources datées.
- **Comprendre** les concepts grâce à des explications adaptées à différents niveaux.
- **Comparer** les outils selon leurs usages, leur accessibilité et leurs limites.
- **Garder du recul** sur les enjeux de fiabilité, de vie privée, d'énergie et de société.

Les contenus et le registre actuellement affichés sont éditoriaux et statiques : les
sources ne sont pas surveillées automatiquement et aucune date de dernière vérification
n'est enregistrée. Une prochaine étape pourra structurer ces métadonnées et concevoir la
collecte, la validation et l'historique nécessaires à une véritable veille.
