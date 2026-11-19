import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "./contextes/auth";

function PageConnexion() {
  const { connecter } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: "", motDePasse: "" } });

  const soumettre = async ({ email, motDePasse }) => {
    try {
      await connecter(email, motDePasse);
      navigate(location.state?.depuis ?? "/livres", { replace: true });
    } catch (e) {
      setError("root.serveur", { message: e.message });
    }
  };

  return (
    <form className="carte" onSubmit={handleSubmit(soumettre)} noValidate>
      <h2>Connexion</h2>
      <div className="champ">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register("email", { required: "L'email est obligatoire" })} />
        {errors.email && <span className="erreur">{errors.email.message}</span>}
      </div>
      <div className="champ">
        <label htmlFor="motDePasse">Mot de passe</label>
        <input
          id="motDePasse"
          type="password"
          {...register("motDePasse", { required: "Le mot de passe est obligatoire" })}
        />
        {errors.motDePasse && <span className="erreur">{errors.motDePasse.message}</span>}
      </div>
      {errors.root?.serveur && <p className="erreur-globale">{errors.root.serveur.message}</p>}
      <button type="submit" className="principal" disabled={isSubmitting}>
        {isSubmitting ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}

export default PageConnexion;