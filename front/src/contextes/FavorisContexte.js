import { createContext } from "react";
export const FavorisContexte = createContext({
  favoris: [],
  setFavoris: () => {},
  basculerFavori: () => {},
});
