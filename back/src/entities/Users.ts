import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Recetes } from "./Recetes";

@Entity()
@ObjectType()
export class Users extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column({ unique: true })
  mail!: string;

  @Field()
  @Column()
  Hpassword!: string;

  @Field()
  @Column()
  roles!: string; // "USER", "ADMIN", "USER,PLAYER"

  @Field(() => [Recetes])
  @OneToMany(() => Recetes, (recetes) => recetes.users)
  recetes!: Recetes[];
}
