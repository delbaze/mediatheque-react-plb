import BarreRecherche from "../composants/BarreRecherche";
import ListeAdherents from "./ListeAdherents";
import { useState } from "react";
import useApi from "../api/useApi";
import {
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { lireJson } from "../api/client";
function PageAdherents() {
  const queryClient = useQueryClient();

  const [recherche, setRecherche] = useState("");
  const [statut, setStatut] = useState("");
  const parametres = new URLSearchParams();
  if (recherche) parametres.set("q", recherche);
  if (statut) parametres.set("actif", statut === "actifs" ? true : false);

  const cleAdherents = ["adherents", { recherche, statut }]; // ["adherents, {recherche: 'vei', statut: 'actifs'}"]
  const cleEmprunt = ["emprunts", { enCours: true }];
  // const cleEmpruntFalse = ["emprunts", { enCours: false}]; // ["adherents, {recherche: 'vei', statut: 'actifs'}"]
  const {
    data: adherents = [],
    isFetching,
    error,
  } = useQuery({
    queryKey: cleAdherents,
    queryFn: ({ signal }) => lireJson(`/api/adherents?${parametres}`, signal),
    placeholderData: keepPreviousData,
    // staleTime: Infinity
  });
  // const { donnees: adherents, setDonnees: setAdherents } = useApi(
  //   `/api/adherents?${parametres}`,
  // );
  // const { donnees: emprunts } = useApi(`/api/emprunts?enCours=true`);
  const {
    data: emprunts = [],
    isFetching: empruntFetching,
    error: empruntError,
  } = useQuery({
    queryKey: cleEmprunt,
    queryFn: ({ signal }) => lireJson(`/api/emprunts?enCours=true`, signal),
    placeholderData: keepPreviousData,
    // staleTime: Infinity
  });

  const handleSelect = (e) => {
    setStatut(e.target.value);
  };

  const basculerActif = (id) => {
    queryClient.setQueryData(cleAdherents, (actuels) =>
      actuels.map((adherent) =>
        adherent.id === id ? { ...adherent, actif: !adherent.actif } : adherent,
      ),
    ); // ça modifie l'apparence à l'écran mais il faudrait le compléter avec une mutation vers l'api, puis 
    // l'invalidation du cache avec invalidateQueries({ queryKey: cleAdherents})
    // setAdherents((actuels) =>
    // actuels.map((adherent) =>
    //   adherent.id === id ? { ...adherent, actif: !adherent.actif } : adherent,
    // ),
    // );
  };

  return (
    <div>
      <div className="barre">
        <BarreRecherche
          placeholder="Nom de l'adhérent"
          valeur={recherche}
          onChange={setRecherche}
        />
        <select value={statut} onChange={handleSelect}>
          <option value="">Tous</option>
          <option value="actifs">Actifs</option>
          <option value="inactifs">Inactifs</option>
        </select>
        <span className="discret">
          {isFetching
            ? "Chargement en cours"
            : `${adherents.length} adhérent(s)`}
        </span>
      </div>
      {/* <span className="discret">{[...  ].length} adhérents(s)</span> */}

      <ListeAdherents
        adherents={adherents}
        emprunts={emprunts}
        onBasculerActif={basculerActif}
      />
    </div>
  );
}

export default PageAdherents;
