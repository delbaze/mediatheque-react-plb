import { adherents, emprunts } from "../donnees.js";
import {
  nomComplet,
  adherentsActifs,
  trouverAdherent,
  desactiverAdherent,
  empruntsEnCours,
  nombreEmpruntsEnCoursParAdherent,
  creerGenerateurNumeroCarte,
} from "./adherents.js";

console.log("1.", nomComplet(adherents[0]));
console.log('2.', adherentsActifs(adherents).map(nomComplet))
console.log('3.', trouverAdherent(adherents, 3)?.email, trouverAdherent(adherents, 42))
const apres = desactiverAdherent(adherents, 2)
console.log('4.', trouverAdherent(apres, 2).actif, trouverAdherent(adherents, 2).actif, apres === adherents)
console.log('5.', empruntsEnCours(emprunts, 1).map((e) => e.livreId))
console.log('6.', nombreEmpruntsEnCoursParAdherent(emprunts))
const numeroCarte = creerGenerateurNumeroCarte('MED') //0
const autreNumero = creerGenerateurNumeroCarte('ANNEXE') //0
console.log('7.', numeroCarte(), numeroCarte(), autreNumero(), numeroCarte())
