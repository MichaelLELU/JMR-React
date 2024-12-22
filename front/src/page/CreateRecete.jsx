import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { gql, useMutation, useQuery } from "@apollo/client";

const GET_INGREDIENTS = gql`
  query GetIngredients {
    getIngredients {
      name
    }
  }
`;

const CREATE_RECETE = gql`
  mutation Mutation($data: RecetesInput!) {
    createRecete(data: $data) {
      name
    }
  }
`;

const CREATE_INGREDIENT = gql`
  mutation Mutation($data: ingredientInput!) {
    createIngredients(data: $data) {
      name
    }
  }
`;

export default function CreateRecete() {
  const { loading, error, data } = useQuery(GET_INGREDIENTS);
  const [
    createRecete,
    { data: dataSub, loading: subLoading, error: subError },
  ] = useMutation(CREATE_RECETE);

  const [createIngredients] = useMutation(CREATE_INGREDIENT);

  // État local pour les ingrédients sélectionnés
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const hSubmit = async (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const formData = new FormData(form);

    // Récupération des données du formulaire
    const formJson = Object.fromEntries(formData.entries());

    try {
      // Étape 1 : Créer les nouveaux ingrédients
      const ingredientPromises = selectedIngredients.map(async (ingredient) => {
        const isExistingIngredient = data.getIngredients.some(
          (ing) => ing.name === ingredient.label
        );

        if (!isExistingIngredient) {
          // Si l'ingrédient n'existe pas encore, on le crée
          const { data: newIngredient } = await createIngredients({
            variables: { data: { name: ingredient.label } },
          });

          return newIngredient.createIngredients.name; // Retourne le nom de l'ingrédient créé
        }
        return ingredient.label; // Retourne le nom de l'ingrédient existant
      });

      // Attendre que tous les ingrédients soient créés ou récupérés
      const resolvedIngredients = await Promise.all(ingredientPromises);

      // Étape 2 : Préparer les données pour la mutation createRecete
      const dataToSend = {
        name: formJson.name,
        instructions: formJson.instructions,
        globalTime: formJson.globalTime,
        ingredients: resolvedIngredients, // Utilise les noms des ingrédients
        picture: formJson.picture || "", // Optionnel, ajout de l'image si présente
      };

      console.log("Données envoyées à createRecete :", dataToSend);

      const { data: newRecete } = await createRecete({
        variables: { data: dataToSend }, // Correction ici
      });

      console.log("Recette créée avec succès :", newRecete);
    } catch (error) {
      console.error(
        "Erreur lors de la création de la recette ou des ingrédients :",
        newRecete,
        error
      );
    }
  };

  if (error || subError) return <>Error!</>;
  if (loading) return <>Loading...</>;

  return (
    <>
      <h1>Créer une nouvelle recette</h1>
      <form onSubmit={hSubmit}>
        <label htmlFor="name">Nom de la recette</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="instructions">Description</label>
        <textarea id="instructions" name="instructions" required></textarea>

        <label htmlFor="ingredients">Ingrédients</label>
        <CreatableSelect
          isMulti
          options={data.getIngredients.map((apiI) => ({
            value: apiI.name,
            label: apiI.name,
          }))}
          value={selectedIngredients}
          onChange={(newValue) => setSelectedIngredients(newValue || [])}
        />

        <label htmlFor="globalTime">Temps Globale</label>
        <input type="text" id="globalTime" name="globalTime" required />

        <label htmlFor="picture">Image</label>
        <input type="text" id="picture" name="picture" />

        <button type="submit" disabled={subLoading}>
          Créer
        </button>
      </form>
    </>
  );
}
