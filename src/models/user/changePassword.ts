import {Resolver, Mutation, Arg, Ctx} from 'type-graphql'
import { redis } from '../../redis';
import { User } from '../../entity/User';
import { forgotPrefix } from '../../constants/redisPrefixes';
import {changePasswordInput} from './changePassword/changePasswordInput'
import bcrypt from 'bcryptjs'
import { MyContext } from '../../types/MyContext';

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() =>User,{nullable:true})
  async changePassword(
    @Arg('data') {token,password}:changePasswordInput,
    @Ctx() ctx:MyContext,
    ):Promise<User | null > {
    const userId= await redis.get(forgotPrefix+token) 
    if(!userId) return null;
    
    const user=await User.findOne(userId)
    
    if(!user) return null;

    redis.del(forgotPrefix+token)
    user.password = await bcrypt.hash(password,12)

    await user.save()

    ctx.req.session.userId=user.id
    ctx.req.session.userType=user.type

    return user
  }
}
