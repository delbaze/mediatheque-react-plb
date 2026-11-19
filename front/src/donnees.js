export const livres = [
  { id: 1, titre: 'Le Petit Prince', auteur: 'Antoine de Saint-Exupéry', annee: 1943, genre: 'Conte', exemplaires: 3 },
  { id: 3, titre: 'Fondation', auteur: 'Isaac Asimov', annee: 1951, genre: 'Science-fiction', exemplaires: 2 },
  { id: 4, titre: 'Dune', auteur: 'Frank Herbert', annee: 1965, genre: 'Science-fiction', exemplaires: 1 },
  { id: 6, titre: 'Le Nom de la rose', auteur: 'Umberto Eco', annee: 1980, genre: 'Policier', exemplaires: 1 },
  { id: 8, titre: 'Le Seigneur des anneaux', auteur: 'J. R. R. Tolkien', annee: 1954, genre: 'Fantasy', exemplaires: 2 },
  { id: 9, titre: '1984', auteur: 'George Orwell', annee: 1949, genre: 'Science-fiction', exemplaires: 3 },
]

export const adherents = [
  { id: 1, prenom: 'Marie', nom: 'Curie', email: 'marie.curie@exemple.fr', actif: true },
  { id: 2, prenom: 'Louis', nom: 'Pasteur', email: 'louis.pasteur@exemple.fr', actif: true },
  { id: 3, prenom: 'Simone', nom: 'Veil', email: 'simone.veil@exemple.fr', actif: true },
  { id: 4, prenom: 'Victor', nom: 'Schoelcher', email: 'victor.schoelcher@exemple.fr', actif: false },
  { id: 5, prenom: 'Olympe', nom: 'de Gouges', email: 'olympe.degouges@exemple.fr', actif: true },
]

export const emprunts = [
  { id: 1, livreId: 4, adherentId: 1, dateEmprunt: '2026-10-01', dateRetour: null },
  { id: 2, livreId: 3, adherentId: 1, dateEmprunt: '2026-10-25', dateRetour: null },
  { id: 3, livreId: 1, adherentId: 2, dateEmprunt: '2026-09-10', dateRetour: '2026-09-28' },
  { id: 4, livreId: 6, adherentId: 3, dateEmprunt: '2026-11-02', dateRetour: null },
  { id: 5, livreId: 9, adherentId: 5, dateEmprunt: '2026-10-12', dateRetour: null },
  { id: 6, livreId: 8, adherentId: 1, dateEmprunt: '2026-08-01', dateRetour: '2026-08-20' },
]