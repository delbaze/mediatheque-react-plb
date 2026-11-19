import { ajouterLivre } from "../api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import FormulaireLivre from "./FormulaireLivre";

function PageNouveauLivre() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync, isError, error } = useMutation({
    mutationFn: ajouterLivre,
    // mutationFn: (valeurs) => ajouterLivre(valeurs),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["livres"],
      });
      queryClient.invalidateQueries({ queryKey: ["genres"] });
      navigate("/livres");
    },
  });
  const handleSubmit = async (valeurs) => {
    await mutateAsync(valeurs);
  };
  return (
    <div>
      <FormulaireLivre
        onEnregistrer={handleSubmit}
        isError={isError}
        error={error}
        labelBouton="Ajouter"
        titreFormulaire="Ajouter un livre"
      />
    </div>
  );
}

export default PageNouveauLivre;
