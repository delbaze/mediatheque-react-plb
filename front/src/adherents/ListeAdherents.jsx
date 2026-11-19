import AdherentCarte from "./AdherentCarte";
import { nombreEmpruntsEnCoursParAdherent } from "../outils/adherents";

function ListeAdherents({ adherents, emprunts, onBasculerActif }) {
//   if (adherents.length === 0) {
//     return <p className="discret">Aucun adhérents</p>;
//   }
  const compteurs = nombreEmpruntsEnCoursParAdherent(emprunts);
  return (
    <div className="grille">
      {adherents.length === 0 ? (
        <p className="discret">Aucun adhérents</p>
      ) : (
        adherents.map((adherent) => (
          <AdherentCarte
            key={adherent.id}
            adherent={adherent}
            empruntsEnCours={compteurs[adherent.id] ?? 0}
            onBasculerActif={onBasculerActif}
          />
        ))
      )}
    </div>
  );
}

export default ListeAdherents;
