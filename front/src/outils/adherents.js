export function nomComplet({ prenom, nom }) {
  return `${prenom} ${nom}`;
}

export const adherentsActifs = (adherents) =>
  adherents.filter((adherent) => adherent.actif);

export const trouverAdherent = (adherents, id) =>
  adherents.find((adherent) => adherent.id === id) ?? null;

export function desactiverAdherent(adherents, id) {
  return adherents.map((adherent) =>
    adherent.id === id ? { ...adherent, actif: false } : adherent
  );
}
export function desactiverAdherent0(adherents, id) {
  const copieAdherents = [...adherents];
  const adherent = trouverAdherent(copieAdherents, id);
  adherent.actif = false; // ici tu changes directement l'objet
  return copieAdherents;
}

export function empruntsEnCours(emprunts, adherentId) {
  return emprunts.filter(
    (emprunt) =>
      emprunt.adherentId === adherentId && emprunt.dateRetour === null
  );
}

export function nombreEmpruntsEnCoursParAdherent(emprunts) {
  return emprunts.reduce((compteurs, { adherentId, dateRetour }) => {
    if (dateRetour !== null) return compteurs;
    return { ...compteurs, [adherentId]: (compteurs[adherentId] ?? 0) + 1 };
  }, {});
}

export function creerGenerateurNumeroCarte(prefixe) {
  let numero = 0;
  return () => {
    numero = numero + 1;
    return `${prefixe}-${numero}`;
  };
}
