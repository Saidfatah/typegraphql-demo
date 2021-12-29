import { MiddlewareFn } from "type-graphql";

export function isAuthorized(userType:string):MiddlewareFn{
    return async ({ context}:any, next:Function) => {
        const cookierUserType=context.req.session.userType
        if (!cookierUserType) {
          throw new Error("access denied because user has no type");
        }
        if(userType !== cookierUserType)  throw new Error("you're not a "+ userType);
        return next(); 
    };
}