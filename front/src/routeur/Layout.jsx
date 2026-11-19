import { NavLink, Outlet } from "react-router";

import { useTheme } from "../contextes/theme";
import { useAuth } from "../contextes/auth";
function Layout() {
  const { theme, basculerTheme } = useTheme();
  const { utilisateur, deconnecter } = useAuth();

  return (
    <>
      <nav>
        <strong>Mediathèque</strong>
        <NavLink to="/livres">Livres</NavLink>
        <NavLink to="/adherents">Adhérents</NavLink>

        <button onClick={basculerTheme}>
          {theme === "clair" ? "Mode sombre" : "Mode clair"}
        </button>

        {utilisateur ? (
          <>
            <span>{utilisateur.nom}</span>
            <button onClick={deconnecter}>Déconnexion</button>
          </>
        ) : (
          <NavLink to="connexion">Connexion</NavLink>
        )}
      </nav>
      <main className="page">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
