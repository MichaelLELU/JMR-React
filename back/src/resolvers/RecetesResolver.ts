import { Mutation,Field,InputType, Query, Resolver, Arg, ID } from "type-graphql";
import { In } from "typeorm";
import { Recetes } from "../entities/Recetes";
import { Ingredients } from "../entities/Ingredients";

@InputType()
class RecetesInput {
    @Field()
    name!: string;
    @Field()
    globalTime!: string;
    @Field()
    picture!: string;
    @Field()
    instructions!: string;
    @Field(() => [ID])
    ingredients!: Ingredients[];
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
        let recete = new Recetes()
        recete = Object.assign(recete, data);
        const ingredients = await Ingredients.findBy({id: In(data.ingredients)})
        recete.ingredients = ingredients
        await recete.save()
        return recete;
    }
        
}