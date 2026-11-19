// import { useRef } from "react";

function BarreRecherche({ valeur, onChange, placeholder = "Rechercher" }) {
//   const inputRef = useRef();
  const handleChange = (e) => {
    onChange(e.target.value);
  };
  // inputs contrôlés (piloté)
  // il existe des inputs non contrôlés
//   const handleVerif = () => {
//     console.log("recherche", valeur);
//     console.log("recherche : ", inputRef.current.value);
//   };
  return (
    <>
      <input
        type="search"
        placeholder={placeholder}
        onChange={handleChange}
        value={valeur}
      />
      {/* <input type="search" placeholder={placeholder} ref={inputRef}/> */}


      {/* <button onClick={handleVerif}>Vérification</button> */}
      {/* // <input type="search" placeholder={placeholder} onChange={(e) => handleChange(e)} /> */}
    </>
  );
}

export default BarreRecherche;
