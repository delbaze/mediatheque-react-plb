import { useState } from "react";
import { FavorisContexte } from "./FavorisContexte";

function FournisseurFavoris({ children }) {
  const [favoris, setFavoris] = useState(() => {
    return JSON.parse(localStorage.getItem("favoris")) || [];
  });
  console.log("favoris", favoris);
  const basculerFavori = (id) => {
    setFavoris((actuels) => {
      const resultat = actuels.includes(id)
        ? actuels.filter((f) => f !== id)
        : [...actuels, id];
      localStorage.setItem("favoris", JSON.stringify(resultat));
      return resultat;
    });
  };
  return (
    <FavorisContexte value={{ favoris, setFavoris, basculerFavori }}>
      {children}
    </FavorisContexte>
  );
}

export default FournisseurFavoris;
