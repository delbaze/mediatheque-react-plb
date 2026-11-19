import { isRouteErrorResponse, Link, useRouteError } from "react-router";
function PageErreur() {
  const erreur = useRouteError();
  const introuvable = isRouteErrorResponse(erreur) && erreur.status === 404;
  const message = isRouteErrorResponse(erreur) ? erreur.data : erreur.message;
  return (
    <>
      <div>{introuvable ? "Page introuvable" : "Une erreur est survenue "}</div>
      <p>{message}</p>
      <Link to="/">Revenir à l'accueil</Link>
    </>
  );
}

export default PageErreur;
