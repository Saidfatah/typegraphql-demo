import {
    Length, IsEmail,IsEnum
  } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { IsEmailAlreadyUsed } from './IsEmailAlreadyUsed';

enum UserTypes {
  member,
  admin,
  moderator
} 

@InputType()
export class RegisterInput {
    @Field() 
    @Length(1,30)
    firstName:string;
    
    @Field() 
    @Length(1,30)
    lastName:string;

    @Field() 
    @IsEmail()
    @IsEmailAlreadyUsed({message:"email is already in use"})
    email:string;

    @Field() 
    password:string;

    @Field() 
    @IsEnum(UserTypes)
    type:string;
}