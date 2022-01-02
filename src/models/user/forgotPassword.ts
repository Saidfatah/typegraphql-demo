import {Resolver, Mutation, Arg} from 'type-graphql'
import { redis } from '../../redis';
import { User } from '../../entity/User';
import { sendEmail } from '../../utils/sendMail';
import { v4 } from 'uuid';
import { forgotPrefix } from '../../constants/redisPrefixes';

@Resolver()
export class forgotPasswordResolver {
  @Mutation(() =>Boolean)
  async forgotPassword(@Arg('email') email:string):Promise<Boolean> {
    const user=await User.findOne({where:{email}})
    
    if(!user) return true;

    const token = v4()
    await redis.set(forgotPrefix+token,user.id,"ex",60*60*24)
    
    await sendEmail(user.email,`http://localhost:9080/user/change-password/${token}`)
    return true;
  }
}
