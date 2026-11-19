import { useState } from "react";
import { ContexteAuth } from "./auth";
import { seConnecter } from "../api/client";

const CLE = "mediatheque.session";

function lireSession() {
  try {
    return JSON.parse(localStorage.getItem(CLE));
  } catch {
    return null;
  }
}
function FournisseurAuth({ children }) {
  const [session, setSession] = useState(lireSession);

  async function connecter(email, motDePasse) {
    const nouvelle = await seConnecter(email, motDePasse);
    localStorage.setItem(CLE, JSON.stringify(nouvelle));
    setSession(nouvelle);
  }

  function deconnecter() {
    localStorage.removeItem(CLE);
    setSession(null);
  }

  const valeur = {
    utilisateur: session?.utilisateur ?? null,
    connecter,
    deconnecter,
  };

  return <ContexteAuth value={valeur}>{children}</ContexteAuth>;
}

export default FournisseurAuth;
