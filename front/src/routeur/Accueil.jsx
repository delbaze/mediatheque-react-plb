import { Link } from "react-router";

function Accueil() {
  return (
    <div>
      <h2>Bienvenue</h2>
      <p>
        Gérez le catalogue, les adhérents et les emprunts de la médiatheques
      </p>
      <Link to="/livres">Voir le catalogue</Link>
    </div>
  );
}

export default Accueil;
