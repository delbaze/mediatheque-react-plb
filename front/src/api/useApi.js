import { useState, useEffect } from "react";
import { lireJson } from "./client";

function useApi(url) {
  const [erreur, setErreur] = useState(null);
  const [donnees, setDonnees] = useState([]); // liste des genres depuis l'api
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    const controleur = new AbortController();
    async function charger() {
      setChargement(true);
      try {
        const donnees = await lireJson(url, controleur.signal);
        setDonnees(donnees);
        setErreur(null);
      } catch (e) {
        if (controleur.signal.aborted) return;
        setErreur(e.message);
      } finally {
        if (!controleur.signal.aborted) setChargement(false);
      }
    }

    charger();

    return () => {
      controleur.abort();
    }; //cleanup
  }, [url]);

  return { donnees, setDonnees, erreur, chargement };
}

export default useApi;
