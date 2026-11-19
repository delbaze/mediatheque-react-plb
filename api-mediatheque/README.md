# API de la médiathèque

Cette API sert de back au projet fil rouge. Elle ne demande aucune installation de paquet : seul Node.js est nécessaire.

```bash
npm start
```

L'API écoute sur `http://localhost:4001/api`. Les données sont gardées en mémoire : chaque redémarrage (ou un appel à `POST /api/reset`) les remet dans leur état initial, celui du fichier `data/seed.json`.

Chaque réponse arrive avec un délai artificiel de 300 ms, pour que les états de chargement soient visibles côté React. On peut le changer au lancement, par exemple `DELAI=1500 npm start` pour un réseau très lent, ou `DELAI=0 npm start` pour le supprimer.

## Routes

| Méthode | Route | Rôle |
|---|---|---|
| POST | `/api/login` | Connexion (`biblio@mediatheque.fr` / `react`), renvoie `{ token, utilisateur }` |
| GET | `/api/livres?q=&genre=` | Liste des livres, avec le champ calculé `disponibles` |
| GET | `/api/livres/:id` | Un livre |
| POST | `/api/livres` | Création (`titre`, `auteur`, `annee`, `genre`, `exemplaires`, `resume`) |
| PUT | `/api/livres/:id` | Modification |
| DELETE | `/api/livres/:id` | Suppression (refusée si le livre est emprunté) |
| GET | `/api/genres` | Liste des genres existants |
| GET | `/api/adherents?q=&actif=` | Liste des adhérents |
| GET | `/api/adherents/:id` | Un adhérent |
| POST | `/api/adherents` | Création (`prenom`, `nom`, `email`) |
| PUT | `/api/adherents/:id` | Modification (`prenom`, `nom`, `email`, `actif`) |
| DELETE | `/api/adherents/:id` | Suppression (refusée s'il a des emprunts en cours) |
| GET | `/api/emprunts?adherentId=&livreId=&enCours=` | Liste des emprunts |
| POST | `/api/emprunts` | Nouvel emprunt (`livreId`, `adherentId`) |
| PATCH | `/api/emprunts/:id/retour` | Enregistre le retour d'un livre |
| POST | `/api/reset` | Remet les données à l'état initial |

## Erreurs

Toutes les erreurs ont la même forme : `{ "message": "..." }`. Quand l'erreur vient d'une validation (statut 400), un objet `erreurs` précise le problème champ par champ, par exemple `{ "message": "Données invalides.", "erreurs": { "email": "Cet email est déjà utilisé." } }`. Les refus métier (livre indisponible, adhérent inactif, plus de 3 emprunts en cours) renvoient un statut 409.
