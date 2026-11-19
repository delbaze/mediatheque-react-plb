// import mesFonctions, {libelleLivre} from "./livres";
// mesFonctions.
// import maFonction2, {libelleLivre as monLibelleLivre} from "./livres";{ libelleLivre } from "./livres";
import { libelleLivre, creerCompteurConsultations } from "./livres.js";
import { livres } from "../donnees.js";
let maVariable = [50, 40, 10];
const maVariable2 = { nom: "Toto", age: 50 };
// var
console.log("maVariable", maVariable);
console.log("maVariable2", maVariable2);
maVariable2.nom = "Tata";
console.log("maVariable2", maVariable2);
// maVariable2 = { nom: "Tata", age: 50};

const maVariable3 = [10, 20, 30];
maVariable3.push(40);
console.log("maVariable3", maVariable3);

const titre = "Mon Titre";
const disponibles = 0;

console.log(`${titre}: ${disponibles > 0 ? "disponible" : "indisponible"}`); // Mon titre : indisponible

// condition && <div></div>
// condition ? <div></div> : <p></p>
// condition || "mavaleur"
// condition ?? "mavaleur"

console.log(doubler(30));
function doubler(n) {
  // this
  console.log("arguments", arguments);
  return n * 2;
} // hoisting
// const doublerFleche = (n) => { return n * 2};
const doublerFleche = (n) => n * 2;
console.log(doublerFleche(30));

const livre = (titre) => ({ titre, exemplaires: 1 });
// const livre = (titre) => { return { titre, exemplaires: 1 }}
// const livre = (titre) => { return {info: titre, exemplaires: 1}}
// const livre = (titre) => { return {titre: titre, exemplaires: 1}}
const nouveauLivre = livre("Mon titre");
console.log(nouveauLivre);

// const livre2 = { id: 4, titre: "Dune", auteur: "Franck Herbert", annee: 1965, genre: undefined };
const livre2 = { id: 4, titre: "Dune", auteur: "Franck Herbert", annee: 1965 };

console.log(livre2.annee);
console.log(livre2.auteur);
console.log(livre2.id);
console.log(livre2.titre);
const { auteur, annee, titre: monTitre, genre = "Non classé" } = livre2; // destructuration
// const { auteur, annee, ...autresValeurs } = livre2; // destructuration
// ...  = spread operator
console.log(annee);
console.log(auteur);
console.log(titre);
console.log(monTitre);
console.log(genre);
// console.log(id);
// console.log(titre);
// const mesTitres = ['Dune', 'Fondation', '1984'];
// const premier = mesTitres[0]
// const deuxieme = mesTitres[1]
// const troisieme = mesTitres[2]
const [premier, deuxieme, troisieme] = ["Dune", "Fondation", "1984"];
// console.log(mesTitres[0]);
// console.log(mesTitres[1]);
// console.log(mesTitres[2]);
console.log(premier);
console.log(deuxieme);
console.log(troisieme);

console.log(libelleLivre(livre2));
console.log(libelleLivre(livres[0]));
console.log(libelleLivre(livres[1]));
console.log(libelleLivre(livres[2]));

// map
// reduce
const monTableau1 = [10, 20, 30, 40];

const result = monTableau1.reduce((accumulateur, elementCourant) => {
  return accumulateur + elementCourant; // 0 + 10 => 10, 10 + 20 => 30, 30 + 30 => 60, 60 + 40 = 100
}, 0);

console.log(result);

const resultMapEtFiltre = livres
   .values() // lazy (paresseuse)
   .filter((l) => l.exemplaires > 2)
   .map((l) => ({ id: l.id, titre: l.titre, exemplaires: l.exemplaires }))
   .toArray();

console.log(resultMapEtFiltre);



class Document {
    constructor(titre, annee) {
        this.titre = titre;
        this.annee = annee;
    }

    description() {
        return `${this.titre} (${this.annee})`
    }
}

class Dvd extends Document {
    constructor(titre, annee, duree) {
        super(titre, annee)
        this.duree = duree;
    }
}
const doc = new Document("Mon titre", 1950)
console.log(doc.description());
const dvd = new Dvd("Mon dvd", 1999, 180);
console.log(dvd);
console.log(dvd.description());


// closures
const compteur = creerCompteurConsultations();
console.log(compteur())
console.log(compteur())
console.log(compteur())
console.log(compteur())
console.log(compteur())
console.log(compteur())
console.log(compteur())
console.log(compteur())

// function afficherCatalogue(nombreDeLivres) {
// //   console.log(`Le catalogue compte ${nombreDeLivres} livres`)
//   return () => console.log(`Le catalogue compte ${nombreDeLivres} livres`)
// }

// const annoncePremierAffichage = afficherCatalogue(6);
// const annonceSecondAffichage = afficherCatalogue(10);
// annoncePremierAffichage();
// annonceSecondAffichage();


const API = "http://localhost:4001/api"

async function lireJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        // je lèverai une erreur
        const { message } = await response.json();
        console.log("message", message);
        throw new Error(message)
    }

    return response.json();
}
const result2 = await lireJson(`${API}/livres`);  // http://localhost:4001/api/livres
console.log(result2);


async function chargerFicheLivre(id) {
  const [livre, emprunts] = await Promise.all([
    lireJson(`${API}/livres/${id}`),
    lireJson(`${API}/emprunts?livreId=${id}`),
  ])
  return { livre, emprunts }
}

try {
  const { livre, emprunts } = await chargerFicheLivre(4)
  console.log(`${livre.titre} : ${emprunts.length} emprunt(s) au total`)
  await chargerFicheLivre(999)
} catch (erreur) {
  console.log(`Erreur attrapée : ${erreur.message}`)
}