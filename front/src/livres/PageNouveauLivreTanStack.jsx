import { ajouterLivre } from "../api/client";
import { useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
function PageNouveauLivre() {
  const queryClient = useQueryClient();
  const titreRef = useRef(null);

  useEffect(() => {
    titreRef.current.focus();
  }, []);

  const { mutate, isError, error, isSuccess, data, isPending  } = useMutation({
    mutationFn: ajouterLivre,
    onSuccess: () => {
      console.log("je vais pouvoir agir une fois le livre ajouté en base");
      // on pourra invalider la liste des livres pour qu'elle se mette à jour côté front
      queryClient.invalidateQueries({
        queryKey: [
          "livres",
          // {
          //   recherche: "",
          //   genre: "",
          // },
        ],
        // exact: true
      });
      queryClient.invalidateQueries({ queryKey: ["genres"] });
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault(); // ici on court circuite le comportement de base d'un formulaire (on lui évite de se rendre sur l'action déduite)
    const formulaire = event.target;
    const valeurs = Object.fromEntries(new FormData(formulaire));
    mutate({
      ...valeurs,
      annee: Number(valeurs.annee),
      exemplaires: Number(valeurs.exemplaires),
    });
  };

  return (
    <div>
      <form className="carte" onSubmit={handleSubmit}>
        <h3>Ajouter un livre</h3>
        {isError && (
          <div className="erreur">
            <p>{error.message}</p>
          </div>
        )}
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
        {isSuccess && <p>{data.titre} a été ajouté</p>}
        <button type="submit" className="principal" disabled={isPending}>
          {isPending ? "Enregistrement..." : "Ajouter"}
        </button>
      </form>
    </div>
  );
}

export default PageNouveauLivre;
