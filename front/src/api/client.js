export async function lireJson(url, signal) {
  const reponse = await fetch(url, { signal });
  if (!reponse.ok) {
    const { message } = await reponse.json();
    throw new Error(message);
  }
  return reponse.json();
}

export async function ajouterLivre(data) {
  const reponse = await fetch("/api/livres", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!reponse.ok) {
    const { message } = await reponse.json();
    throw new Error(message);
  }

  return reponse.json();
}
export async function modifierLivre(id, livre) {
  const reponse = await fetch(`/api/livres/${id}`, {
    method: "PUT",
    body: JSON.stringify(livre),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!reponse.ok) {
    const { message } = await reponse.json();
    throw new Error(message);
  }

  return reponse.json();
}

export async function seConnecter(email, motDePasse) {
  const response = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ email, motDePasse }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }
  return response.json();
}
