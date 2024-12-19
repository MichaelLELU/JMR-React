import { Mutation,Field,InputType, Query, Resolver, Arg, ID } from "type-graphql";
import { Ingredients } from "../entities/Ingredients";

@InputType()
class ingredientInput {
	@Field()
	name!: string;
}	

@Resolver(Ingredients)
export class IngredientsResolver {
	@Query(() => [Ingredients])
	async getIngredients() {
		const ingredients = await Ingredients.find();
		return ingredients;
	}
	
	@Mutation(() => Ingredients)
	async createIngredients(@Arg("data") data: ingredientInput) {
		let ingredient = new Ingredients()
		ingredient = Object.assign(ingredient, data);
		await ingredient.save()
		return ingredient;
	}
        
}