import { createBrowserRouter, data } from "react-router";
import Catalogue from "../livres/Catalogue";
import Accueil from "./Accueil";
import Layout from "./Layout";
import PageNouveauLivre from "../livres/PageNouveauLivre";
import PageModifierLivre from "../livres/PageModifierLivre";
import PageAdherents from "../adherents/PageAdherents";
import PageErreur from "./PageErreur";
import PageConnexion from "../PageConnexion";
import RouteProtegee from "../RouteProtegee";

export const routeur = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        errorElement: <PageErreur />,
        children: [
          {
            index: true,
            element: <Accueil />,
          },
          {
            path: "connexion",
            element: <PageConnexion />,
          },
          {
            path: "livres",
            // element: <LayoutLivres />,
            children: [
              {
                index: true,
                element: (
                  <RouteProtegee>
                    <Catalogue />
                  </RouteProtegee>
                ),
              },
              {
                path: "nouveau",
                element: <PageNouveauLivre />,
              },
              //   {
              //     path: ":id",
              //     element: <FicheLivre />,
              //   },
              {
                path: ":id/modifier", // livres/1/modifier
                element: <PageModifierLivre />,
              },
            ],
          },
          { path: "adherents", element: <PageAdherents /> },
          {
            path: "*",
            loader: () => {
              throw data("Cette page n'existe pas", { status: 404 });
            },
          },
        ],
        //   { path: "*", element: <NotFound />}
      },
    ],
  },
]);
