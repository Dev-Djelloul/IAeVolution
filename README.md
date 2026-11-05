# IAeVolution

**Observer l'intelligence artificielle. Comprendre ce qui change. Anticiper ce qui vient.**

IAeVolution est un observatoire éditorial de l'IA, conçu pour rendre le sujet plus lisible,
utile et accessible. Le site propose une visite guidée, une boussole à cinq angles, sept
dossiers thématiques, une chronologie historique filtrable et sourcée, un tableau de bord
d'indicateurs datés et sourcés, un registre de sources et une page dédiée aux réseaux mondiaux.
Les contenus sont éditorialisés et sourcés. L'assistant repère d'abord des passages dans le
corpus local, puis demande à un modèle d'IA, via OpenRouter, de rédiger une réponse appuyée
sur ces repères. Chaque réponse indique le modèle réellement utilisé, son éditeur, son coût
estimé et son nombre de tokens. Le visiteur choisit le niveau (accessible ou expert), la
longueur et le modèle ; la réponse peut être lue à voix haute avec une barre de progression.
Une commande vocale facultative est fournie par le navigateur. Une réponse générée peut
contenir des erreurs : elle doit être vérifiée dans les sources.

**Confidentialité de l'assistant.** La question saisie (limitée à 600 caractères) et jusqu'à
trois extraits du corpus sont envoyés au Worker Cloudflare, puis à OpenRouter et au
fournisseur du modèle choisi. IAeVolution ne conserve ni les questions ni les réponses.
Les débits sont limités à 12 requêtes par minute et par adresse IP.

La reconnaissance vocale ne démarre qu'après une action sur le bouton du micro. Les
navigateurs compatibles utilisent d'abord un modèle vocal local installé ; sinon, l'audio
peut être traité par le fournisseur du navigateur. IAeVolution ne conserve ni l'audio ni les
transcriptions. La recherche et les réponses restent limitées au corpus
éditorial du site, et la lecture vocale utilise la synthèse du navigateur. Les commandes
vocales ne sont pas disponibles dans tous les navigateurs ; la saisie texte reste accessible.
L'assistant et la visite guidée partagent un sélecteur de voix locale, avec un choix
automatique par défaut ; le choix manuel est conservé dans le navigateur sur cet appareil.
Les voix proposées dépendent du navigateur. Une voix personnelle macOS peut nécessiter
l'autorisation des apps et ne pas être accessible aux sites web.

L'interface propose douze langues : français, anglais, espagnol, néerlandais, allemand,
chinois simplifié, portugais, arabe, hindi, japonais, russe et italien. Les traductions
éditoriales et le catalogue généré sont intégrés localement au projet. Les visiteurs ne
déclenchent aucune requête de traduction ; seuls les textes éditoriaux publics sont envoyés
à Google Cloud Translation lors d'une génération explicite. La clé reste locale et les
textes absents du catalogue restent en français. Les requêtes des visiteurs ne sont pas
traduites automatiquement.

Pour extraire les textes et consulter le volume avant toute génération :

```sh
npm run translations:extract
```

La génération nécessite l'API Cloud Translation activée et une clé API restreinte à cette
API. Fournissez `GOOGLE_TRANSLATE_API_KEY` dans l'environnement local, vérifiez la
tarification et le volume affiché, puis lancez explicitement :

```sh
npm run translations:generate -- --confirm-cost
```

Le résultat est enregistré dans `translation-catalog.generated.json` ; les traductions
éditoriales déjà présentes dans `translation.js` restent prioritaires. Ne placez jamais la
clé dans le dépôt. Voir la [tarification Google Cloud Translation](https://cloud.google.com/products/translate/pricing).

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

Le site est servi par **Cloudflare Workers Static Assets**, avec un Worker (`worker.js`)
qui expose uniquement `POST /api/assistant` et `GET /api/preview` et sert les fichiers statiques pour le reste.
La configuration de déploiement est définie dans `wrangler.jsonc`.

L'assistant exige le secret `OPENROUTER_API_KEY`, à déposer avec `npx wrangler secret put
OPENROUTER_API_KEY` (jamais dans le code ni dans Git). Les modèles par défaut peuvent être
remplacés par la variable `OPENROUTER_MODELS` (liste séparée par des virgules). Fixez une
limite de dépense dans votre compte OpenRouter.

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

### Assistant : streaming et mémoire de conversation

- La réponse IA est reçue en streaming (SSE) et affichée au fil de l'eau ; le coût et le modèle apparaissent à la fin.
- Les 3 derniers échanges sont renvoyés au modèle (champ `history`). Ils ne vivent qu'en mémoire de page, sans stockage ; le bouton « Nouvelle conversation » les efface. Ils sont transmis à OpenRouter avec la question.

### Assistant : sources survolables, historique et organisation

- Les renvois `[n]` ouvrent au survol une carte de source (logo, titre, description, URL, aperçu) alimentée par `GET /api/preview?url=` ; une liste « Sources » suit la réponse.
- Les 10 dernières questions sont gardées dans le `localStorage` du navigateur (clé `iaevolution-question-history`) et ne sont jamais envoyées à IAeVolution ; « Effacer l'historique » les supprime.
- Ordre de la section : question et réglages (niveau, longueur, modèle), panneau voix et confidentialité, suggestions, historique, résultats. La carte de réponse suit : titre et modèle, lecteur, texte, sources, détails du modèle, mise en garde.
- Les titres principaux tiennent sur une ligne (`fit-titles.js` réduit la police si nécessaire), sauf « Lire l'IA en mouvement ».

### Parcours visuels et scène du hero

- Six parcours de cinq étapes (une question, une puce, un modèle, énergie et chaleur, un mot, un robot) dans `#parcours-visuels` : onglets au clavier, étapes, lecture automatique, source et lien vers un dossier (`journeys.js`).
- Chaque étape a une illustration SVG animée sans texte (`journey-art.js`, 30 dessins) ; les animations sont figées avec `prefers-reduced-motion`.
- « Écouter ce parcours » lit les étapes avec la synthèse vocale locale du navigateur, dans la langue du site et avec la voix choisie dans les réglages de l'assistant ; rien n'est envoyé à un service.
- La scène du hero (maquette 3D CSS, vue illustrée SVG) porte des animations et des flux de données animés (`animateMotion`).
- Les cartes du site sont de vraies cartes (Natural Earth, projection de Miller, `scripts/build-world-map.mjs`) et le menu de navigation reste visible au défilement.

### Page « Réseaux mondiaux »

- Hero avec trois repères chiffrés animés (UIT, TeleGeography), carte de corridors avec hubs et paquets de données animés, bascule Corridors / Redondance.
- Quatre corridors cliquables (Atlantique, Pacifique, Sud global, Europe ↔ Asie) : le corridor est mis en avant sur la carte et son détail s'affiche.
- Sections « Anatomie d'un câble » (coupe SVG à six couches, légende survolable), « Ce qui peut couper un câble », bandeau de latence, sources (UIT, ICPC, TeleGeography).
- « Écouter la carte » lit la légende puis chaque corridor avec la synthèse vocale locale du navigateur (langue du site, voix choisie dans les réglages de l'assistant) ; rien n'est envoyé à un service.
- La page charge désormais `translation.js` : le sélecteur de langue y fonctionne. Animations coupées avec `prefers-reduced-motion`.

## Logo et favicon

Le logo (`public/favicon.svg`) reprend la marque du site : tuile sombre, anneau teal, arc lime et trois barres ascendantes. Le dossier `public/` est copié à la racine de `dist` : `favicon.svg`, `favicon.ico` (16/32/48), `favicon-48.png` (multiple de 48 px, recommandé par Google), `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` et `site.webmanifest`. Les balises `<link>` sont dans le `<head>` des deux pages.

Le logo remplace la marque de l'en-tête et du pied de page (`.brand-mark`, fond CSS). `public/og-image.png` (1200×630, généré par `node scripts/make-og-image.mjs`) sert à l'aperçu de partage (balises Open Graph / Twitter), et `public/sitemap.xml` + `public/robots.txt` aident l'indexation Google.
