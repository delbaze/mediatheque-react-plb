import { useForm } from "react-hook-form";
import { useEffect } from "react";
import ButtonAnnulation from "../composants/ButtonAnnulation";

const DEFAULT_VALUES = {
  titre: "",
  auteur: "",
  annee: "",
  genre: "",
  exemplaires: 1,
};

function FormulaireLivre({
  onEnregistrer,
  isError,
  error,
  labelBouton,
  livre = DEFAULT_VALUES,
  titreFormulaire,
  isFetching = false,
}) {
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    setValues,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: livre, mode: "onTouched" });

  useEffect(() => {
    setFocus("titre");
  }, [setFocus]);

  // on veut mettre à jour le formulaire quand les données du useQuery seront arrivées
  useEffect(() => {
    setValues(livre);
  }, [livre, setValues]);

  const soumettre = async (valeurs) => {
    try {
      await onEnregistrer(valeurs);
    } catch (e) {
      console.log(e);
      setError("root.serveur", { message: e.message });
    }
  };

  return (
    <div>
      {isFetching ? (
        <div>Récupération des données en cours </div>
      ) : (
        <form className="carte" onSubmit={handleSubmit(soumettre)} noValidate>
          <h3>{titreFormulaire}</h3>
          {isError && (
            <div className="erreur">
              <p>{error.message}</p>
            </div>
          )}
          <div className="champ">
            <label htmlFor="titre">Titre</label>
            <input
              id="titre"
              name="titre"
              {...register("titre", { required: "Le titre est obligatoire" })}
            />
            {errors.titre && (
              <span className="erreur">{errors.titre.message}</span>
            )}
          </div>
          <div className="champ">
            <label htmlFor="auteur">Auteur</label>
            <input
              id="auteur"
              name="auteur"
              {...register("auteur", { required: "L'auteur est obligatoire" })}
            />
            {errors.auteur && (
              <span className="erreur">{errors.auteur.message}</span>
            )}
          </div>
          <div className="champ">
            <label htmlFor="annee">Année</label>
            <input
              id="annee"
              name="annee"
              type="number"
              {...register("annee", {
                valueAsNumber: true,
                validate: (annee) =>
                  (Number.isInteger(annee) &&
                    annee <= new Date().getFullYear()) ||
                  "L'année doit être un entier, pas dans le futur",
              })}
            />
            {errors.annee && (
              <span className="erreur">{errors.annee.message}</span>
            )}
          </div>
          <div className="champ">
            <label htmlFor="genre">Genre</label>
            <input
              id="genre"
              name="genre"
              {...register("genre", { required: "Le genre est obligatoire" })}
            />
            {errors.genre && (
              <span className="erreur">{errors.genre.message}</span>
            )}
          </div>
          <div className="champ">
            <label htmlFor="exemplaires">Exemplaires</label>
            <input
              id="exemplaires"
              name="exemplaires"
              type="number"
              defaultValue="1"
              {...register("exemplaires", {
                valueAsNumber: true,
                min: { value: 1, message: "Il faut au moins un exemplaire" },
                max: { value: 1000, message: "Maximum 1000 exemplaires" },
              })}
            />
            {errors.exemplaires && (
              <span className="erreur">{errors.exemplaires.message}</span>
            )}
          </div>
          {errors.root?.serveur && (
            <p className="erreur-globale">{errors.root.serveur.message}</p>
          )}
          <button type="submit" className="principal" disabled={isSubmitting}>
            {isSubmitting ? "Enregistrement..." : labelBouton}
          </button>
          <ButtonAnnulation titre="Annuler" url="/livres" />
        </form>
      )}
    </div>
  );
}

export default FormulaireLivre;
