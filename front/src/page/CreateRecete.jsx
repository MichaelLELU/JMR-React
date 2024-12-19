import gql from 'graphql-tag';
import CreatableSelect from 'react-select/creatable';



export default function CreateRecete() {  
    const GET_INGREDIENTS = gql`
query GetIngredients {
  getIngredients {
    name
    id
  }
}`



const options = [

]



    return (
    <> 
        <h1>Créer une nouvelle recette</h1>
        <form>
            <label name="name">Nom de la recette</label>
            <input type="text" id="name" name="name" required></input>
            <label name="instructions">Description</label>
            <textarea type="textArea" id="instructions" name="instructions" required></textarea>
            <label name="ingredients">Ingrédients</label>
            <CreatableSelect isMulti options={colourOptions} />
            <label name="globalTime">Temps Globale</label>
            <input type="text" id="globalTime" name="globalTime" required></input>
            <button type="submit">Créer</button>
        </form>
    </>
    )
}