import BarreRecherche from "../composants/BarreRecherche";
import ListeLivres from "../composants/ListeLivres";
import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { lireJson } from "../api/client";
import { Link } from "react-router";

function Catalogue() {
  const [recherche, setRecherche] = useState(""); // ce qui est tapé
  const [rechercheDebounce, setRechercheDebounce] = useState(""); // q pour l'api
  const [genre, setGenre] = useState(""); // genre pour l'api

  useEffect(() => {
    const minuteur = setTimeout(() => setRechercheDebounce(recherche), 400);
    return () => clearTimeout(minuteur);
  }, [recherche]);

  const parametres = new URLSearchParams();
  if (rechercheDebounce) parametres.set("q", rechercheDebounce);
  if (genre) parametres.set("genre", genre);

  const {
    data: livres = [],
    error: livresErreur,
    isPending: livresChargement,
    isFetching: livresMiseAJour,
  } = useQuery({
    queryKey: ["livres", { recherche: rechercheDebounce, genre }],
    queryFn: ({ signal }) => lireJson(`/api/livres?${parametres}`, signal),
    placeholderData: keepPreviousData,
  });

  const { data: genres = [], error: genresErreur } = useQuery({
    queryKey: ["genres"],
    queryFn: ({ signal }) => lireJson("/api/genres", signal),
    staleTime: Infinity,
  });

  const handleSelect = (e) => {
    setGenre(e.target.value);
  };

  const erreur = livresErreur || genresErreur;

  return (
    <>
      <div className="barre">
        <BarreRecherche valeur={recherche} onChange={setRecherche} />
        <select value={genre} onChange={handleSelect}>
          <option value="">Tous les genres</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        {livresMiseAJour && !livresChargement && (
          <span className="discret">Mise à jour...</span>
        )}
      </div>
      <Link to="/livres/nouveau">Ajouter un livre</Link>
      {erreur && <span className="erreur">{erreur.message}</span>}
      {livresChargement ? (
        <div>
          <span className="discret">Chargement en cours</span>
        </div>
      ) : (
        <ListeLivres
          livres={livres}
        />
      )}
    </>
  );
}

export default Catalogue;