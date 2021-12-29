import {Resolver ,Ctx, Query, UseMiddleware} from 'type-graphql'
import { User } from '../../entity/User';
import { MyContext } from 'src/types/MyContext';
import {isAuth} from '../middlewear/IsAuth'
import {isAuthorized} from '../middlewear/isAuthorized'
declare module 'express-session' {
    export interface SessionData {
        userId: number;
    }
  }

@Resolver(User)
export class MeResolver {
  @Query(() =>User,{nullable:true})
  @UseMiddleware(isAuth,isAuthorized("member"))
  async me(@Ctx() ctx:MyContext):Promise<User | undefined> {
      if(!ctx.req.session.userId)
      return undefined;
      return await User.findOne(ctx.req.session.userId)
  }

}
