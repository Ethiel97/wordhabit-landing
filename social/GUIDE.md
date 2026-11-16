# Guide éditorial : page Facebook Wordhabit

La page apprend l’anglais aux francophones, en français, une publication par
jour. Les semaines sont rédigées et programmées sans relecture humaine : la
personne qui rédige est aussi la seule relectrice. Ce guide est son contrat.

## Cible et ton

- Francophones, d’Afrique de l’Ouest d’abord, qui veulent un anglais plus
  juste et plus précis, à l’oral comme au travail.
- La promesse de Wordhabit : un mot par jour, appris en profondeur, retenu
  pour la vie. Le contenu donne envie de progresser, il ne fait jamais honte.
  « Dis-le mieux », jamais « tu as l’air ignorant ».
- Tutoiement. Phrases courtes. Émojis sobres (un à trois par légende).

## Une semaine

Sept publications, du mardi au lundi, à 13:00 UTC (`startDate` = mardi de la
semaine, sept jours après la précédente).

| Jour | Format | Contenu |
|---|---|---|
| 1 | carrousel | série A |
| 2 | quiz | image unique |
| 3 | carrousel | série B |
| 4 | quiz | image unique |
| 5 | carrousel | série C |
| 6 | quiz | image unique |
| 7 | mot de la semaine | image unique |

- La réponse d’un quiz (champ `answer`) ouvre automatiquement la légende du
  lendemain : « Réponse du quiz d’hier : B, … » suivie d’une explication
  d’une phrase qui apprend quelque chose (le sens des mauvaises réponses).
- Le jour 7 n’est jamais un quiz, sa réponse ne serait jamais publiée.
- Un carrousel compte 6 à 9 images : couverture, 4 à 6 images de contenu,
  une image « À toi », puis l’image Ara (`{ "type": "cta" }`, toujours la
  dernière).

### Séries de carrousels

Trois séries différentes par semaine, en rotation d’une semaine à l’autre.

- **Erreurs fréquentes** : « Arrête de dire « … » ». Une erreur typique des
  francophones (*I am agree*, *depend of*, *explain me*, *since three years*,
  *I have 25 years*…), la règle (type `fix`), puis 4 formulations naturelles.
- **Faux amis** : 5 faux amis par carrousel (type `falsefriend`), slug
  numéroté (`faux-amis-2`, `faux-amis-3`…).
- **Anglais au travail** : une situation par carrousel (réunion, e-mail,
  entretien d’embauche, appel, négociation, présentation, relance), 5 à 6
  phrases (type `phrase`).
- **Vocabulaire précis** : remplacer un mot passe-partout (*very good*,
  *bad*, *nice*, *thing*) ou nommer précisément (caractères, émotions,
  objets du quotidien), 5 mots ou expressions.
- **Expressions idiomatiques** : 5 expressions, leur sens, un exemple, et
  l’équivalent français quand il existe.

### Quiz

Trois options A, B, C ; une seule est juste, les deux autres sont plausibles
pour un francophone (faux ami, calque du français, mot voisin). Trois formes
en rotation : « Comment dit-on … en anglais ? », « Laquelle est correcte ? »,
« Que veut dire … ? ».

### Mot de la semaine

Un mot utile de niveau B1 à C1, que l’on peut réemployer cette semaine. IPA
au format Cambridge (britannique), nature (adjectif, verbe, nom…), sens,
exemple traduit, un piège réel (orthographe, faux ami, prononciation), et une
invitation à écrire une phrase en commentaire.

## Exactitude

Chaque élément en anglais passe cette liste avant le rendu. Au moindre doute,
on remplace l’élément au lieu de le défendre.

1. Le sens correspond à celui d’un dictionnaire de référence (Cambridge,
   Oxford, Merriam-Webster).
2. L’exemple est naturel : un anglophone le dirait tel quel. Grammaire,
   prépositions et collocations vérifiées.
3. La traduction française est juste et naturelle, pas mot à mot.
4. Pour un faux ami, les deux sens (anglais et français) sont vérifiés.
5. Un quiz a une seule bonne réponse, y compris entre anglais britannique et
   américain ; si les deux usages divergent, on choisit une autre question.
6. Aucun mot, aucune expression, aucun slug déjà utilisé dans une semaine
   précédente (`weeks/*.json`).
7. Rien de politique, religieux, médical, de marque, ni de personne réelle.
8. Les prénoms des exemples varient et incluent des prénoms d’Afrique de
   l’Ouest (Amina, Kofi, Fatou, Yao, Awa, Koffi…).

## Typographie

- Apostrophe typographique ’ et guillemets « » ; le gabarit ajoute les
  espaces insécables.
- Aucun tiret cadratin. La marque s’écrit Wordhabit.
- Dans les textes d’images : `*mot*` colore en vert (l’anglais au milieu du
  français), `~mot~` en rouge (la forme fautive).
- Légendes en texte brut : une accroche, une explication courte, une
  question qui appelle un commentaire. Pas de lien (le script ajoute
  l’appel à l’action et le lien). Hashtags : `#anglais`, deux thématiques,
  `#wordhabit`.
- Repères de longueur (le rendu échoue de toute façon si le texte déborde) :
  titre de couverture 60 caractères, expression 45, sens 60, exemple 80,
  traduction 90, option de quiz 32.

## Ara

`curious` pour les couvertures et les quiz, `pleased` pour le mot de la
semaine (l’image finale des carrousels le pose seule). `idle` reste possible,
`celebrate` est réservé aux moments rares. Ara ne se moque jamais d’une
erreur.

## Ce qu’on ne fait pas

Pas d’accroche mensongère (« le mot 4 va te surprendre »), pas d’urgence, pas
de culpabilité, pas de contenu repris d’une autre page, pas d’image ni de
musique de tiers.

## Fichier d’une semaine

`weeks/week-NN.json`, sur le modèle de `weeks/week-01.json` :

| Champ | Contenu |
|---|---|
| `week`, `campaign` | numéro de semaine, `anglais_fr` |
| `startDate`, `publishTimeUtc` | mardi `YYYY-MM-DD`, `13:00` |
| `linkPlacement` | `caption` (lien dans la légende) ou `page` |
| `posts[]` | `day`, `slug`, `series`, `caption`, `hashtags`, `slides[]`, `answer` pour un quiz |

| Type d’image | Champs |
|---|---|
| `cover` | `kicker`, `title`, `subtitle`, `ara` |
| `fix` | `label`, `wrong`, `right`, `note` |
| `phrase` | `phrase`, `meaning`, `example`, `translation` |
| `falsefriend` | `word`, `notWord`, `meaning`, `trap`, `example`, `translation` |
| `prompt` | `kicker`, `title`, `body`, `footer` |
| `quiz` | `kicker`, `question`, `options` (3), `footer`, `ara` |
| `word` | `kicker`, `word`, `phonetic`, `pos`, `meaning`, `example`, `translation`, `trap`, `prompt`, `ara` |
| `cta` | aucun |
