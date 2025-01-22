import { Mutation, Field, InputType, Query, Resolver, Arg } from "type-graphql";
import { In } from "typeorm";
import { Recetes } from "../entities/Recetes";
import { Ingredients } from "../entities/Ingredients";

@InputType()
export class RecetesInput {
  @Field()
  name!: string;

  @Field()
  globalTime!: string;

  @Field()
  picture!: string;

  @Field()
  instructions!: string;

  @Field(() => [String])
  ingredients!: string[];
}

@Resolver(Recetes)
export class RecetesResolver {
  @Query(() => [Recetes])
  async getRecetes() {
    const recetes = await Recetes.find();
    return recetes;
  }

  @Mutation(() => Recetes)
  async createRecete(@Arg("data") data: RecetesInput) {
    const recete = new Recetes();
    recete.name = data.name;
    recete.globalTime = data.globalTime;
    recete.instructions = data.instructions;
    recete.picture = data.picture;

    const ingredientEntities = await Ingredients.findBy({
      name: In(data.ingredients),
    });
    recete.ingredients = ingredientEntities;
    console.log(recete);
    await recete.save();
    return recete;
  }
}
