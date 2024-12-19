import { Field, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	Entity,
	PrimaryGeneratedColumn,
	ManyToMany,
} from "typeorm";
import { Recetes } from "./Recetes";


@Entity()
@ObjectType()
export class Ingredients extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: string;

	@Field()
	@Column()
	name!: string;

	@Field( () => [Recetes])
	@ManyToMany(
		() => Recetes,
		(recetes) => recetes.ingredients,
	)
	recetes!: Recetes[];
}