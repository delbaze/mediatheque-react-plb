import { ajouterLivre } from "../api/client";
import { useEffect, useRef } from "react";

function PageNouveauLivre() {
  const titreRef = useRef(null);
  const handleSubmit = async (event) => {
    event.preventDefault(); // ici on court circuite le comportement de base d'un formulaire (on lui évite de se rendre sur l'action déduite)
    const formulaire = event.target;
    const valeurs = Object.fromEntries(new FormData(formulaire));
    const resultat = await ajouterLivre({
      ...valeurs,
      annee: Number(valeurs.annee),
      exemplaires: Number(valeurs.exemplaires),
    });
    console.log("Resultat", resultat);
  };

  useEffect(() => {
    titreRef.current.focus();
  },[])
  return (
    <div>
      <form className="carte" onSubmit={handleSubmit}>
        <h3>Ajouter un livre</h3>
        <div className="champ">
          <label htmlFor="titre">Titre</label>
          <input id="titre" name="titre" ref={titreRef} />
        </div>
        <div className="champ">
          <label htmlFor="auteur">Auteur</label>
          <input id="auteur" name="auteur" />
        </div>
        <div className="champ">
          <label htmlFor="annee">Année</label>
          <input id="annee" name="annee" type="number" />
        </div>
        <div className="champ">
          <label htmlFor="genre">Genre</label>
          <input id="genre" name="genre" />
        </div>
        <div className="champ">
          <label htmlFor="exemplaires">Exemplaires</label>
          <input
            id="exemplaires"
            name="exemplaires"
            type="number"
            defaultValue="1"
          />
        </div>
        <button type="submit" className="principal">
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default PageNouveauLivre;
