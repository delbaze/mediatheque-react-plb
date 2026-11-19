import Badge from "./Badge";
import { Link } from "react-router";
//   { id: 1, titre: 'Le Petit Prince', auteur: 'Antoine de Saint-Exupéry', annee: 1943, genre: 'Conte', exemplaires: 3 },
function LivreCarte({
  id,
  titre,
  auteur,
  annee,
  genre,
  disponibles,
  exemplaires,
  favori,
  onBasculerFavori,
}) {
  return (
    <article className="carte">
      <h3>{titre}</h3>
      <p>
        {auteur}, {annee}
      </p>
      <p className="discret">{genre}</p>
      {exemplaires > 1 ? (
        <Badge variante="succes">{exemplaires} exemplaires</Badge>
      ) : (
        <Badge>Exemplaire Unique</Badge>
      )}
      {disponibles > 0 ? (
        <Badge variante="succes">{disponibles} disponible(s)</Badge>
      ) : (
        <Badge>Indisponible</Badge>
      )}
      <div className="barre">
        <button onClick={() => onBasculerFavori(id)}>
          {favori ? "Retirer des favoris" : "Ajouter aux favoris"}
        </button>
        <Link to={`/livres/${id}/modifier`}>
          <button>Modifier</button>
        </Link>
      </div>
    </article>
  );
}

export default LivreCarte;
