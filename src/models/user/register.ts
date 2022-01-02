import {Resolver, Mutation, Arg, Query, UseMiddleware} from 'type-graphql'
import bcrypt from 'bcryptjs'
import { User } from '../../entity/User';
import { RegisterInput } from './register/RegisterInput';
import { sendEmail } from '../../utils/sendMail';
import { createConfirmationUrl } from '../../utils/createConfirmationUrl';

@Resolver(User)
export class RegisterResolver {
 
  @Query(() =>String,{nullable:true,description:"returns a greeting"} )
  @UseMiddleware()
  async hello() {
    return "hello world";
  }
 
  
  //this approach is when you need to fetch and do some asynchronous work 
  // @FieldResolver()
  // async name(@Root() parent:User) {
  //   return parent.firstName + parent.lastName;
  // }
  
  @Mutation(() =>User)
  async register(
    @Arg('input') {email,firstName,lastName,password,type}:RegisterInput,
  ):Promise<User> {
    console.log('resolver called')
      const hasshedPass = await bcrypt.hash(password,12);
      const user=await User.create({firstName,lastName,email,password:hasshedPass,type}).save()
      sendEmail(user.email,await createConfirmationUrl(user.id))
      return user;
  }
}
