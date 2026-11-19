
function Panneau({titre, children}){

    return (
        <section className="page">
            <h2>{titre}</h2>
            {children}
        </section>
    )
}



export default Panneau;



//    <section>
//         <h2>Catalogue</h2>
//         <ListeLivre />
//     </section>
   
   
   
//    <section>
//         <h2>Adhérents</h2>
//         <ListeAdherents />
//     </section>