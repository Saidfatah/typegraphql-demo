import {Resolver, Mutation, Arg, Query} from 'type-graphql'
import { redis } from '../../redis';
import { User } from '../../entity/User';
import { confirmPrefix } from '../../constants/redisPrefixes';

@Resolver()
export class confirmUserResolver {
  @Query(() =>String,{nullable:true,description:"returns a greeting"} )
  async hello() {
    return "hello world";
  }
 
  
  @Mutation(() =>Boolean)
  async confirmUser(@Arg('token') token:string):Promise<Boolean> {
      const userId=await redis.get(confirmPrefix+token);

      if(!userId) return false

      await User.update({id:parseInt( userId)},{confirmed:true})
      await redis.del(confirmPrefix+token)

      return true;
  }
}
