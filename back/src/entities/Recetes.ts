import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Ingredients } from "./Ingredients";
import { Users } from "./Users";

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

  @Field(() => [Users])
  @OneToMany(() => Users, (users) => users.recetes)
  users!: Users[];

  @Field(() => [Ingredients])
  @ManyToMany(() => Ingredients, (ingredients) => ingredients.recetes)
  @JoinTable()
  ingredients!: Ingredients[];
}
