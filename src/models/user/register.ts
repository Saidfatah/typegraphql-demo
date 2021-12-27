import {Resolver,Query, Mutation, Arg, FieldResolver, Root} from 'type-graphql'
import * as bcrypt from 'bcryptjs'
import { User } from '../../entity/User';

@Resolver(User)
export class RegisterResolver {
 
  @Query(() =>String,{nullable:true,description:"returns a greeting"} )
  async hello() {
    return "hello world";
  }
 
  
  @FieldResolver()
  async name(@Root() parent:User) {
    return parent.firstName + parent.lastName;
  }
  
  @Mutation(() =>User)
  async register(
    @Arg('firstName') firstName:string,
    @Arg('lastName') lastName:string,
    @Arg('email') email:string,
    @Arg('password') password:string
  ):Promise<User> {
      const hasshedPass = await bcrypt.hash(password,12);
      const user=await User.create({firstName,lastName,email,password:hasshedPass}).save()

      return user;
  }
}