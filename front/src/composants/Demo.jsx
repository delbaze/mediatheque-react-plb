import { useEffect, useState } from "react";

function Demo() {
  const [compteur, setCompteur] = useState(0);
  const [maintenant, setMaintenant] = useState(new Date().toISOString());
  const handleIncrement = () => {
    setCompteur((compteur) => compteur + 1);
  };

//   useEffect(() => {
//     console.log("Je suis rendu");
//     const minuteur = setInterval(() => {
//       setMaintenant(new Date().toISOString());
//       console.log("Minuteur en cours");
//     }, 1000);

//     return () => {
//       console.log("Je suis déchargé");
//       clearInterval(minuteur);
//     }; // cleanup
//   }, []); // avec un tableau de dépendances vide, vous tomber dans le useEffect 1 fois au chargement du composant

  useEffect(() => {
    console.log(
      `Je suis le deuxieme useEffect qui se déclenche lorsque compteur change (ou que sa valeur est assignée) => ${compteur}`,
    );
  }, [compteur]);

//   useEffect(() => {
//     console.log("Je suis toujours là")
//   });
  return (
    <div>
      Demo ({compteur})<button onClick={handleIncrement}>Incrémenter</button>
      <p>Date : {maintenant}</p>
    </div>
  );
}

export default Demo;
