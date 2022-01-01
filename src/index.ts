import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";
import  express from 'express';
import { buildSchema} from 'type-graphql'
import 'reflect-metadata'
import {createConnection} from  'typeorm';
import {RegisterResolver} from './models/user/register'
import {confirmUserResolver} from './models/user/confirmUser'
import {MeResolver} from './models/user/me'
import {LoginResolver} from './models/user/login'
import  session from 'express-session'
import  connectRedis from 'connect-redis'
import  cors from 'cors'
import {redis} from './redis'

declare module 'express-session' {
  export interface SessionData {
      userId: number;
      userType: string;
  }
}


//this is one way of implmneting authorization
// const customAuthChecker: AuthChecker<MyContext> = (
//   { context  }
// ) => {
//   return !!context.req.session.userId
// }

async function main() {
  try {
    // building the schema 
  await createConnection();//intialize db and create db connection
  const schema = await buildSchema({
    resolvers: [RegisterResolver,LoginResolver,MeResolver,confirmUserResolver],
    // automatically create `schema.gql` file with schema definition in project's working directory
    emitSchemaFile: true,
    // authChecker:customAuthChecker
  });

  const server = new ApolloServer({schema , context:({req}:any)=>({req}),plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(),
  ], });
  await server.start();


  const app = express();
  app.use(cors({
    credentials:true,
    origin:"https://studio.apollographql.com"
  }))


  const RedisStore= connectRedis(session)
  const SESSION_SECRET = process.env.SESSION_SECRET || "secret";
  const sessionOption: session.SessionOptions = {
    store: new RedisStore({
      client:redis as any,
    }),
    name: "qid",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
    },
  };
  app.use(session(sessionOption));



  server.applyMiddleware({ app });
  app.listen(9080,()=>{
      console.log(`🚀 Server ready at http://localhost:9080`);
  })
  } catch (error) {
    console.log(error)
  }
}


main()