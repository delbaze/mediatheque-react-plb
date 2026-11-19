import LivreCarte from "./LivreCarte";
import { FavorisContexte } from "../contextes/FavorisContexte";
import { useContext } from "react";

// import { livres } from "./donnees";

function ListeLivres({ livres }) {
  const {favoris, basculerFavori} = useContext(FavorisContexte);

  if (livres.length === 0) {
    return <p className="discret">Aucun livre</p>;
  }
  return (
    <div className="grille">
      {livres.map((livre) => (
        <LivreCarte
          key={livre.id}
          {...livre}
          favori={favoris.includes(livre.id)}
          onBasculerFavori={basculerFavori}
        />
        // <LivreCarte
        //   titre={livre.titre}
        //   auteur={livre.auteur}
        //   annee={livre.annee}
        //   genre={livre.genre}
        //   exemplaires={livre.exemplaires}
        // />
      ))}
      {/* <button onClick={() => {onBasculerFavori(1); onBasculerFavori(3)}}>Démo</button> */}
    </div>
  );
}

export default ListeLivres;
