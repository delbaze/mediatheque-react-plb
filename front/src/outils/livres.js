// ici il y aura nos fonctions JS

// function libelleLivre(livre) {
export function libelleLivre({ titre, auteur, annee }) {
  // const {titre, auteur, annee} = livre;
  return `${titre}, de ${auteur} (${annee})`;
}

export function ajouterLivre(livres, nouveauLivre) {
  // const copieLivres = [...livres];
  // copieLivres.push(nouveauLivre);

  // const copieLivres = [...livres, nouveauLivre];
  // return copieLivres;
  return [...livres, nouveauLivre];
}

export const titres = (livres) => livres.map((livre) => livre.titre);
export const livresDuGenre = (livres, genre) => livres.filter((livre) => livre.genre === genre);

// livresDuGenre(livres, "Science Fiction")
export const trouverLivre = (livres, id) => livres.find((livre) => livre.id === id) ?? null // ça renvoie la valeur de droite quand la valeur de gauche est null ou undefined
// ?? => null ou undefined
// || => null ou undefined + 0, "", ou false

export function creerCompteurConsultations() {
    let consultations = 0
    return () => {
        consultations = consultations + 1 
        // consultations += 1
        return consultations
    }
}
export function rechercherLivres(livres, texte) { 
  const recherche = texte.toLowerCase();// Hello => hello
  return livres.filter(({titre, auteur}) => titre.toLowerCase().includes(recherche) || auteur.toLowerCase().includes(recherche))
}
