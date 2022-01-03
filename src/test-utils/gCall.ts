import { graphql, GraphQLSchema } from "graphql"
import { buildSchema, Maybe} from 'type-graphql'
import {RegisterResolver} from '../models/user/register'
import {logoutResolver} from '../models/user/logout'
import {forgotPasswordResolver} from '../models/user/forgotPassword'
import {ChangePasswordResolver} from '../models/user/changePassword'
import {confirmUserResolver} from '../models/user/confirmUser'
import {LoginResolver} from '../models/user/login'
import {MeResolver} from '../models/user/me'

interface Options{
    source:string;
    variableValues?:Maybe<{
        [key: string]: any;
    }>;
    userId?:number;
    userType?:string;
}

let schema:GraphQLSchema
export const gCall=async ({source,variableValues,userId,userType}:Options)=>{
    if(!schema)
    schema = await buildSchema({
        resolvers: [
          RegisterResolver,
          LoginResolver,
          MeResolver,
          confirmUserResolver,
          forgotPasswordResolver,
          ChangePasswordResolver,
          logoutResolver
        ],
        // automatically create `schema.gql` file with schema definition in project's working directory
        emitSchemaFile: true,
        // authChecker:customAuthChecker
      });
    return graphql({
        schema,
        source,
        variableValues,
        contextValue:{
            req:{
               session:{userId,userType}
            },
            res:{
               clearCookier:jest.fn()
            }
        }
    })
}