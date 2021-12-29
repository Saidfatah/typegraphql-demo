import { Field, ID, ObjectType, Root } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@ObjectType()
@Entity("User")
export class User extends BaseEntity {

    @Field(()=>ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    name(@Root() parent:User):String{
      return  parent.firstName +"_"+ parent.lastName;
    }
   
 

    @Field()
    @Column()
    password: string;

    @Column("text",{unique:true})
    email: string;


}