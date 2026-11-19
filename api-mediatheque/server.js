// API de la médiathèque, fournie pour la formation React.
// Aucune dépendance : seul Node.js (version 18 ou plus) est nécessaire.
// Les données sont gardées en mémoire et repartent de data/seed.json
// à chaque redémarrage (ou via POST /api/reset).

import http from 'node:http';
import { readFileSync } from 'node:fs';

const PORT = Number(process.env.PORT ?? 4001);
// Délai artificiel en millisecondes, pour voir les états de chargement côté React.
const DELAI = Number(process.env.DELAI ?? 300);
const DUREE_EMPRUNT_JOURS = 21;
const MAX_EMPRUNTS_EN_COURS = 3;

const seed = JSON.parse(readFileSync(new URL('./data/seed.json', import.meta.url), 'utf8'));
let db = structuredClone(seed);

// ---------------------------------------------------------------------------
// Outils
// ---------------------------------------------------------------------------

function envoyer(res, statut, corps) {
  res.writeHead(statut, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  });
  res.end(corps === undefined ? '' : JSON.stringify(corps));
}

function erreur(res, statut, message, erreurs) {
  envoyer(res, statut, erreurs ? { message, erreurs } : { message });
}

function lireCorps(req) {
  return new Promise((resolve, reject) => {
    let texte = '';
    req.on('data', (morceau) => (texte += morceau));
    req.on('end', () => {
      if (!texte) return resolve({});
      try {
        resolve(JSON.parse(texte));
      } catch {
        reject(new Error('JSON invalide'));
      }
    });
    req.on('error', reject);
  });
}

const aujourdhui = () => new Date().toISOString().slice(0, 10);

function ajouterJours(dateIso, jours) {
  const d = new Date(dateIso);
  d.setDate(d.getDate() + jours);
  return d.toISOString().slice(0, 10);
}

const prochainId = (liste) => liste.reduce((max, el) => Math.max(max, el.id), 0) + 1;
const empruntsEnCours = () => db.emprunts.filter((e) => e.dateRetour === null);

function avecDisponibilite(livre) {
  const sortis = empruntsEnCours().filter((e) => e.livreId === livre.id).length;
  return { ...livre, disponibles: livre.exemplaires - sortis };
}

function contient(texte, recherche) {
  return String(texte).toLowerCase().includes(recherche.toLowerCase());
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function validerLivre(donnees) {
  const erreurs = {};
  if (!donnees.titre?.trim()) erreurs.titre = 'Le titre est obligatoire.';
  if (!donnees.auteur?.trim()) erreurs.auteur = "L'auteur est obligatoire.";
  if (!Number.isInteger(Number(donnees.annee)) || Number(donnees.annee) < 0 || Number(donnees.annee) > new Date().getFullYear()) {
    erreurs.annee = "L'année doit être un entier valide, pas dans le futur.";
  }
  if (!donnees.genre?.trim()) erreurs.genre = 'Le genre est obligatoire.';
  if (!Number.isInteger(Number(donnees.exemplaires)) || Number(donnees.exemplaires) < 1) {
    erreurs.exemplaires = "Il faut au moins un exemplaire.";
  }
  return erreurs;
}

function validerAdherent(donnees, idExclu) {
  const erreurs = {};
  if (!donnees.prenom?.trim()) erreurs.prenom = 'Le prénom est obligatoire.';
  if (!donnees.nom?.trim()) erreurs.nom = 'Le nom est obligatoire.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donnees.email ?? '')) {
    erreurs.email = "L'email n'est pas valide.";
  } else if (db.adherents.some((a) => a.email === donnees.email && a.id !== idExclu)) {
    erreurs.email = 'Cet email est déjà utilisé.';
  }
  return erreurs;
}

const aDesErreurs = (erreurs) => Object.keys(erreurs).length > 0;

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

const routes = [];
const route = (methode, motif, gestionnaire) => {
  // "/api/livres/:id" devient une expression régulière qui capture l'id
  const regex = new RegExp('^' + motif.replace(/:(\w+)/g, '(?<$1>[^/]+)') + '/?$');
  routes.push({ methode, regex, gestionnaire });
};

// --- Authentification (volontairement simpliste) ---------------------------

route('POST', '/api/login', async ({ corps }, res) => {
  if (corps.email === 'biblio@mediatheque.fr' && corps.motDePasse === 'react') {
    return envoyer(res, 200, {
      token: 'jeton-de-demonstration',
      utilisateur: { email: corps.email, nom: 'Bibliothécaire', role: 'bibliothecaire' },
    });
  }
  erreur(res, 401, 'Email ou mot de passe incorrect.');
});

// --- Livres -----------------------------------------------------------------

route('GET', '/api/livres', ({ query }, res) => {
  let livres = db.livres;
  const q = query.get('q');
  const genre = query.get('genre');
  if (q) livres = livres.filter((l) => contient(l.titre, q) || contient(l.auteur, q));
  if (genre) livres = livres.filter((l) => l.genre === genre);
  envoyer(res, 200, livres.map(avecDisponibilite));
});

route('GET', '/api/genres', (_, res) => {
  envoyer(res, 200, [...new Set(db.livres.map((l) => l.genre))].sort());
});

route('GET', '/api/livres/:id', ({ params }, res) => {
  const livre = db.livres.find((l) => l.id === Number(params.id));
  if (!livre) return erreur(res, 404, 'Livre introuvable.');
  envoyer(res, 200, avecDisponibilite(livre));
});

route('POST', '/api/livres', ({ corps }, res) => {
  const erreurs = validerLivre(corps);
  if (aDesErreurs(erreurs)) return erreur(res, 400, 'Données invalides.', erreurs);
  const livre = {
    id: prochainId(db.livres),
    titre: corps.titre.trim(),
    auteur: corps.auteur.trim(),
    annee: Number(corps.annee),
    genre: corps.genre.trim(),
    exemplaires: Number(corps.exemplaires),
    resume: corps.resume?.trim() ?? '',
  };
  db.livres.push(livre);
  envoyer(res, 201, avecDisponibilite(livre));
});

route('PUT', '/api/livres/:id', ({ params, corps }, res) => {
  const index = db.livres.findIndex((l) => l.id === Number(params.id));
  if (index === -1) return erreur(res, 404, 'Livre introuvable.');
  const erreurs = validerLivre(corps);
  if (aDesErreurs(erreurs)) return erreur(res, 400, 'Données invalides.', erreurs);
  db.livres[index] = {
    ...db.livres[index],
    titre: corps.titre.trim(),
    auteur: corps.auteur.trim(),
    annee: Number(corps.annee),
    genre: corps.genre.trim(),
    exemplaires: Number(corps.exemplaires),
    resume: corps.resume?.trim() ?? '',
  };
  envoyer(res, 200, avecDisponibilite(db.livres[index]));
});

route('DELETE', '/api/livres/:id', ({ params }, res) => {
  const id = Number(params.id);
  if (!db.livres.some((l) => l.id === id)) return erreur(res, 404, 'Livre introuvable.');
  if (empruntsEnCours().some((e) => e.livreId === id)) {
    return erreur(res, 409, 'Impossible de supprimer un livre actuellement emprunté.');
  }
  db.livres = db.livres.filter((l) => l.id !== id);
  envoyer(res, 204);
});

// --- Adhérents --------------------------------------------------------------

route('GET', '/api/adherents', ({ query }, res) => {
  let adherents = db.adherents;
  const q = query.get('q');
  const actif = query.get('actif');
  if (q) adherents = adherents.filter((a) => contient(`${a.prenom} ${a.nom} ${a.email}`, q));
  if (actif !== null) adherents = adherents.filter((a) => a.actif === (actif === 'true'));
  envoyer(res, 200, adherents);
});

route('GET', '/api/adherents/:id', ({ params }, res) => {
  const adherent = db.adherents.find((a) => a.id === Number(params.id));
  if (!adherent) return erreur(res, 404, 'Adhérent introuvable.');
  envoyer(res, 200, adherent);
});

route('POST', '/api/adherents', ({ corps }, res) => {
  const erreurs = validerAdherent(corps);
  if (aDesErreurs(erreurs)) return erreur(res, 400, 'Données invalides.', erreurs);
  const adherent = {
    id: prochainId(db.adherents),
    prenom: corps.prenom.trim(),
    nom: corps.nom.trim(),
    email: corps.email.trim(),
    dateInscription: aujourdhui(),
    actif: true,
  };
  db.adherents.push(adherent);
  envoyer(res, 201, adherent);
});

route('PUT', '/api/adherents/:id', ({ params, corps }, res) => {
  const id = Number(params.id);
  const index = db.adherents.findIndex((a) => a.id === id);
  if (index === -1) return erreur(res, 404, 'Adhérent introuvable.');
  const erreurs = validerAdherent(corps, id);
  if (aDesErreurs(erreurs)) return erreur(res, 400, 'Données invalides.', erreurs);
  db.adherents[index] = {
    ...db.adherents[index],
    prenom: corps.prenom.trim(),
    nom: corps.nom.trim(),
    email: corps.email.trim(),
    actif: corps.actif ?? db.adherents[index].actif,
  };
  envoyer(res, 200, db.adherents[index]);
});

route('DELETE', '/api/adherents/:id', ({ params }, res) => {
  const id = Number(params.id);
  if (!db.adherents.some((a) => a.id === id)) return erreur(res, 404, 'Adhérent introuvable.');
  if (empruntsEnCours().some((e) => e.adherentId === id)) {
    return erreur(res, 409, 'Impossible de supprimer un adhérent qui a des emprunts en cours.');
  }
  db.adherents = db.adherents.filter((a) => a.id !== id);
  envoyer(res, 204);
});

// --- Emprunts ---------------------------------------------------------------

route('GET', '/api/emprunts', ({ query }, res) => {
  let emprunts = db.emprunts;
  const adherentId = query.get('adherentId');
  const livreId = query.get('livreId');
  const enCours = query.get('enCours');
  if (adherentId) emprunts = emprunts.filter((e) => e.adherentId === Number(adherentId));
  if (livreId) emprunts = emprunts.filter((e) => e.livreId === Number(livreId));
  if (enCours !== null) emprunts = emprunts.filter((e) => (e.dateRetour === null) === (enCours === 'true'));
  envoyer(res, 200, emprunts);
});

route('POST', '/api/emprunts', ({ corps }, res) => {
  const livre = db.livres.find((l) => l.id === Number(corps.livreId));
  const adherent = db.adherents.find((a) => a.id === Number(corps.adherentId));
  if (!livre) return erreur(res, 400, 'Livre introuvable.', { livreId: 'Livre introuvable.' });
  if (!adherent) return erreur(res, 400, 'Adhérent introuvable.', { adherentId: 'Adhérent introuvable.' });
  if (!adherent.actif) return erreur(res, 409, "Cet adhérent n'est pas actif.");
  if (avecDisponibilite(livre).disponibles < 1) return erreur(res, 409, "Aucun exemplaire de ce livre n'est disponible.");
  if (empruntsEnCours().filter((e) => e.adherentId === adherent.id).length >= MAX_EMPRUNTS_EN_COURS) {
    return erreur(res, 409, `Un adhérent ne peut pas avoir plus de ${MAX_EMPRUNTS_EN_COURS} emprunts en cours.`);
  }
  const debut = aujourdhui();
  const emprunt = {
    id: prochainId(db.emprunts),
    livreId: livre.id,
    adherentId: adherent.id,
    dateEmprunt: debut,
    dateRetourPrevue: ajouterJours(debut, DUREE_EMPRUNT_JOURS),
    dateRetour: null,
  };
  db.emprunts.push(emprunt);
  envoyer(res, 201, emprunt);
});

route('PATCH', '/api/emprunts/:id/retour', ({ params }, res) => {
  const emprunt = db.emprunts.find((e) => e.id === Number(params.id));
  if (!emprunt) return erreur(res, 404, 'Emprunt introuvable.');
  if (emprunt.dateRetour !== null) return erreur(res, 409, 'Ce livre a déjà été rendu.');
  emprunt.dateRetour = aujourdhui();
  envoyer(res, 200, emprunt);
});

// --- Remise à zéro ------------------------------------------------------------

route('POST', '/api/reset', (_, res) => {
  db = structuredClone(seed);
  envoyer(res, 200, { message: 'Données réinitialisées.' });
});

// ---------------------------------------------------------------------------
// Serveur
// ---------------------------------------------------------------------------

const serveur = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return envoyer(res, 204);

  const url = new URL(req.url, `http://${req.headers.host}`);
  const trouvee = routes
    .filter((r) => r.methode === req.method)
    .map((r) => ({ r, correspondance: url.pathname.match(r.regex) }))
    .find(({ correspondance }) => correspondance);

  if (!trouvee) return erreur(res, 404, `Route inconnue : ${req.method} ${url.pathname}`);

  try {
    const corps = ['POST', 'PUT', 'PATCH'].includes(req.method) ? await lireCorps(req) : {};
    await new Promise((resolve) => setTimeout(resolve, DELAI));
    await trouvee.r.gestionnaire(
      { params: trouvee.correspondance.groups ?? {}, query: url.searchParams, corps },
      res,
    );
  } catch (e) {
    erreur(res, 400, e.message);
  }
  console.log(`${req.method} ${url.pathname}${url.search} -> ${res.statusCode}`);
});

serveur.listen(PORT, () => {
  console.log(`API de la médiathèque sur http://localhost:${PORT}/api (délai simulé : ${DELAI} ms)`);
});
