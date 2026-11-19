import Badge from "../composants/Badge";
import { nomComplet } from "../outils/adherents";

function AdherentCarte({ adherent, empruntsEnCours, onBasculerActif }) {
  const { prenom, nom, email, actif } = adherent;
  return (
    <article className="carte">
      <h3>{nomComplet({ nom, prenom })}</h3>
      <p className="discret">{email}</p>
      <p>{empruntsEnCours} emprunt(s) en cours</p>
      {actif ? (
        <Badge variante="succes">Actif</Badge>
      ) : (
        <Badge variante="alerte">Inactif</Badge>
      )}
      <div className="barre">
        <button onClick={() => onBasculerActif(adherent.id)}>{adherent.actif ? "Désactiver" : "Réactiver"}</button>
      </div>
    </article>
  );
}

export default AdherentCarte;
