// import Panneau from "./composants/Panneau";
// import ListeAdherents from "./adherents/ListeAdherents";
// import PageAdherents from "./adherents/PageAdherents";
// import { adherents, emprunts } from "./donnees";
// import Catalogue from "./livres/Catalogue";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import PageNouveauLivre from "./livres/PageNouveauLivre";
import { routeur } from "./routeur/router";
import { RouterProvider } from "react-router/dom";
import FournisseurFavoris from "./contextes/FournisseurFavoris";
import FournisseurTheme from "./contextes/FournisseurTheme";
import FournisseurAuth from "./contextes/FournisseurAuth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
    },
  },
});

window.__TANSTACK_QUERY_CLIENT__ = queryClient;

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <FournisseurTheme>
          <FournisseurAuth>
            <FournisseurFavoris>
              <RouterProvider router={routeur} />
            </FournisseurFavoris>
          </FournisseurAuth>
        </FournisseurTheme>
      </QueryClientProvider>
    </>
  );
}

export default App;
