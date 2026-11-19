import { Navigate, useLocation } from "react-router";
import { useAuth } from "./contextes/auth";

function RouteProtegee({ children }) {
  const { utilisateur } = useAuth();
  const location = useLocation();
  if (!utilisateur) {
    return (
      <Navigate to="/connexion" replace state={{ depuis: location.pathname }} />
    );
  }
  //   return <Outlet />
  return <>{children}</>;
}

export default RouteProtegee;
