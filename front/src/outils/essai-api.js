import { nomComplet } from './adherents.js'

const API = 'http://localhost:4001/api'

async function lireJson(url) {
  const reponse = await fetch(url)
  if (!reponse.ok) {
    const { message } = await reponse.json()
    throw new Error(message)
  }
  return reponse.json()
}

async function chargerFicheAdherent(id) {
  const [adherent, emprunts] = await Promise.all([
    lireJson(`${API}/adherents/${id}`),
    lireJson(`${API}/emprunts?adherentId=${id}`),
  ])
  return { adherent, emprunts }
}

try {
  const { adherent, emprunts } = await chargerFicheAdherent(1)
  console.log(`${nomComplet(adherent)} a ${emprunts.length} emprunt(s) au total`)
  await chargerFicheAdherent(42)
} catch (erreur) {
  console.log(`Erreur attrapée : ${erreur.message}`)
}
