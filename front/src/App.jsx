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
import { persistor, store } from "./store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

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
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <FournisseurTheme>
              <FournisseurAuth>
                <FournisseurFavoris>
                  <RouterProvider router={routeur} />
                </FournisseurFavoris>
              </FournisseurAuth>
            </FournisseurTheme>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
