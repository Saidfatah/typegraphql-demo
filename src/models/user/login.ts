import {Resolver, Mutation, Arg,Ctx} from 'type-graphql'
import bcrypt from 'bcryptjs'
import { User } from '../../entity/User';
import { MyContext } from 'src/types/MyContext';


declare module 'express-session' {
  export interface SessionData {
      userId: number;
      userType: string;
  }
}

@Resolver(User)
export class LoginResolver {
  @Mutation(() =>User,{nullable:true})
  async login(
    @Arg('email') email:string,
    @Arg('password') password:string,
    @Ctx() context:MyContext,
  ):Promise<User | null> {
      const user=await User.findOne({where:{email}})

      if(!user) return null;

      const valid = await bcrypt.compare(password,user.password);

      if(!valid) return null;
      
      context.req.session.userId=user.id
      context.req.session.userType=user.type
   

      return user;
  }
}
