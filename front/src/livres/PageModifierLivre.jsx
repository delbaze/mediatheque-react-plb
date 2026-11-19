import { useParams, useNavigate } from "react-router";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import FormulaireLivre from "./FormulaireLivre";
import { lireJson, modifierLivre } from "../api/client";

function PageModifierLivre() {
  const { id } = useParams();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: livre,
    isPending,
    isFetching,
    isError: isErrorQuery,
    error: errorQuery,
  } = useQuery({
    queryKey: ["livres", Number(id)],
    queryFn: ({ signal }) => lireJson(`/api/livres/${id}`, signal),

  });


  const { mutateAsync, isError, error } = useMutation({
    // mutationFn: modifierLivre,
    mutationFn: (valeurs) => modifierLivre(id, valeurs),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["livres"],
      });
      queryClient.invalidateQueries({
        queryKey: ["livres", Number(id)],
      });
      queryClient.invalidateQueries({ queryKey: ["genres"] });
      navigate("/livres");
    },
  });
  const handleSubmit = async (valeurs) => {
    await mutateAsync(valeurs);
  };
  if (isPending) return <p>Chargement ...</p>;
  if (isErrorQuery) return <p className="erreur">{errorQuery}</p>;
  return (
    <div>
      <FormulaireLivre
        livre={livre}
        onEnregistrer={handleSubmit}
        isError={isError}
        error={error}
        labelBouton="Modifier"
        titreFormulaire="Modifier un livre"
        isFetching={isFetching}
      />
    </div>
  );
}

export default PageModifierLivre;
