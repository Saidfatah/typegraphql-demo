import {
    Length, IsEmail,IsEnum
  } from 'class-validator';
import { PasswordInput } from '../../../shared/passwordInput';
import { Field, InputType } from 'type-graphql';
import { IsEmailAlreadyUsed } from './IsEmailAlreadyUsed';

enum UserTypes {
  member,
  admin,
  moderator
} 

@InputType()
export class RegisterInput extends PasswordInput {
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
    @IsEnum(UserTypes)
    type:string;
}