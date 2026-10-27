# IAeVolution

**Observer l'intelligence artificielle. Comprendre ce qui change. Anticiper ce qui vient.**

IAeVolution est un observatoire éditorial de l'IA, conçu pour rendre le sujet plus lisible,
utile et accessible. Le site propose une visite guidée, une boussole à cinq angles, sept
dossiers thématiques, un registre de sources et une page dédiée aux réseaux mondiaux.
Les contenus sont éditorialisés et sourcés ; l'assistant documentaire effectue une recherche
locale dans un corpus restreint, avec une commande vocale facultative fournie par le
navigateur. Il ne fait pas appel à un modèle génératif.

La reconnaissance vocale ne démarre qu'après une action sur le bouton du micro. Selon le
navigateur, l'audio peut être traité par son fournisseur ; IAeVolution ne conserve ni
l'audio ni les transcriptions. La recherche et les réponses restent limitées au corpus
éditorial du site, et la lecture vocale utilise la synthèse du navigateur. Les commandes
vocales ne sont pas disponibles dans tous les navigateurs ; la saisie texte reste accessible.
L'assistant et la visite guidée partagent un sélecteur de voix locale, avec un choix
automatique par défaut ; le choix manuel est conservé dans le navigateur sur cet appareil.
Les voix proposées dépendent du navigateur. Une voix personnelle macOS peut nécessiter
l'autorisation des apps et ne pas être accessible aux sites web.

L'interface propose douze langues : français, anglais, espagnol, néerlandais, allemand,
chinois simplifié, portugais, arabe, hindi, japonais, russe et italien. Les traductions
disponibles sont intégrées localement au projet : aucune clé API, aucun compte cloud et
aucun service de traduction externe ne sont nécessaires. Les textes absents du catalogue
restent en français ; les requêtes de recherche ne sont pas traduites automatiquement.

## Environnement de développement

Prérequis : Node.js 22.12 ou supérieur et npm.

```sh
npm install
npm run dev
```

Vite affiche l'adresse locale dans le terminal. Les deux pages (`index.html` et
`reseaux-mondiaux.html`) sont construites avec :

```sh
npm run build
npm run preview
```

`npm start` démarre l'aperçu de production après le build.

## Déploiement Cloudflare

Le site est servi comme un site statique par **Cloudflare Workers Static Assets** ;
aucun serveur applicatif ni ressource Cloudflare supplémentaire n'est requis.
La configuration de déploiement est définie dans `wrangler.jsonc`.

Wrangler est installé comme dépendance du projet. Authentifiez-vous une seule fois sur votre compte Cloudflare :

```sh
npx wrangler login
```

Pour vérifier l'empaquetage sans publier, puis déployer sur l'URL `workers.dev` du Worker :

```sh
npm run build
npx wrangler deploy --dry-run
npx wrangler deploy
```

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

Les contenus et le registre affichés sont éditoriaux et statiques : les sources ne sont pas
surveillées automatiquement et aucune revue éditoriale n'est encore datée dans le catalogue.
Une prochaine étape pourra concevoir la collecte, la validation et l'historique nécessaires
à une véritable veille.
