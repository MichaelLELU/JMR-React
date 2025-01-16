import { DataSource } from "typeorm";
import { Ingredients } from "../entities/Ingredients";
import { Recetes } from "../entities/Recetes";
import { Users } from "../entities/Users";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./BDD.sqlite",
  entities: [Ingredients, Recetes, Users],
  synchronize: true,
});
