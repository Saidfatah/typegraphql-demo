import { MyContext } from 'src/types/MyContext';
import {Ctx, Mutation, Resolver} from 'type-graphql'

@Resolver()
export class logoutResolver {
  @Mutation(()=>Boolean)
  async logout( @Ctx() context:MyContext):Promise<Boolean> {
        return new Promise((res,rej)=>{
            context.req.session!.destroy((err)=>{
                if(err){
                    console.log(err)
                    return rej(false)
                }

                context.res.clearCookie('qid')
                console.log('session destroyed')
                res(true)
            })
        })
  }
}