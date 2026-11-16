# Publications Facebook

Une semaine de publications pour la page Facebook Wordhabit, de la rédaction
à la programmation. Les règles de contenu sont dans [GUIDE.md](GUIDE.md).

```
social/
├── weeks/week-NN.json            source d’une semaine (rédigée)
├── weeks/week-NN.schedule.json   produit : ce qui est programmé
├── render.mjs                    rendu et vérifications
├── template.html                 gabarit 1080 × 1350
└── assets/                       logo et poses d’Ara (copiés du dépôt de l’app)
public/social/en/week-NN/         images publiées, servies par wordhabit.app
```

## Rendu

```sh
pnpm social:render week-02    # ou node social/render.mjs (dernière semaine)
```

Chrome sans interface rend chaque image (`CHROME` pour un autre chemin) ; les
polices viennent de Google Fonts. Le script refuse la semaine, sans rien
publier, quand :

- le texte d’une image déborde, ou que Fraunces et Plus Jakarta Sans ne se
  sont pas chargées ;
- un slug a déjà servi, cette semaine ou une précédente ;
- la semaine n’a pas exactement les jours 1 à 7, qu’un quiz tombe le jour 7
  ou n’a pas de réponse, qu’un carrousel ne finit pas par l’image Ara ;
- la copie contient un tiret cadratin, la graphie « WordHabit », un champ
  vide ou un lien dans la légende.

Il écrit les PNG dans `public/social/en/week-NN/`, le manifeste
`weeks/week-NN.schedule.json` (heure UTC, URL et texte alternatif des images,
légende complète avec la réponse du quiz de la veille, l’appel à l’action et
le lien), et une planche de relecture dans `social/.out/week-NN/` (ignorée
par git).

## Publication

Buffer, page « Wordhabit » (organisation `6261408935e9be5f9eed597e`, canal
`6afb63d0ece6dfde5fea61f6`). L’offre gratuite limite la file à 10
publications programmées et n’autorise pas de premier commentaire : le lien
est donc dans la légende (`linkPlacement: caption`). Si Meta limite les
publications avec lien pour la Page (test lancé en décembre 2025 : deux par
mois), Buffer signale l’échec et la semaine suivante passe en `page`.

Le lien `wordhabit.app/app/fb/<slug>?utm_source=facebook` passe par la route
`server/routes/app/[...path].ts` : Android part vers Play avec la source
dans le `referrer` (`utm_content` vaut `app_link/fb/<slug>` dans la Play
Console), iPhone vers l’App Store, un ordinateur vers l’accueil.

## Automatisation

Une tâche planifiée de l’application Claude, `wordhabit-facebook-weekly`, sur
le Mac d’Ethiel, chaque vendredi à 9:00 (heure du Mac). Elle travaille dans
la copie `wordhabit-landing-social` et reprend là où la semaine en cours
s’est arrêtée :

1. la dernière semaine est déjà dans Buffer : elle rédige la suivante selon
   le guide, se relit, rend, ouvre la PR et la fusionne quand Cloudflare
   Pages est vert ;
2. elle attend que wordhabit.app serve exactement les nouvelles images ;
3. elle programme les sept publications dans Buffer, si la file le permet ;
4. elle rend compte : semaine programmée, PR, et résultats de la semaine
   écoulée.

Le vendredi après 13:00 UTC, la file contient encore les trois publications
du samedi au lundi : sept de plus font dix, la limite. Si l’application
était fermée, la tâche part au lancement suivant ; si une heure de
publication est déjà passée, elle décale la semaine au prochain jour.

Pour arrêter : désactiver la tâche dans l’application (Tâches planifiées),
et supprimer dans Buffer les publications à venir.
