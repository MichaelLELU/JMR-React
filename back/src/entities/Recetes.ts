import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from "typeorm";
import { Ingredients } from "./Ingredients";

@Entity()
@ObjectType()
export class Recetes extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  globalTime!: string;

  @Field()
  @Column()
  picture!: string;

  @Field()
  @Column()
  instructions!: string;

  @Field(() => [Ingredients])
  @ManyToMany(() => Ingredients, (ingredients) => ingredients.recetes)
  @JoinTable()
  ingredients!: Ingredients[];
}
