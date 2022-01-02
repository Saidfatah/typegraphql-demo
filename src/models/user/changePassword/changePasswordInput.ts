import { PasswordInput } from '../../../shared/passwordInput';
import { Field, InputType } from 'type-graphql';

@InputType()
export class changePasswordInput extends PasswordInput {
    @Field() 
    token:string;
}