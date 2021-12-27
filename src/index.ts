import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import {buildSchema} from 'type-graphql'
import 'reflect-metadata'
import {createConnection} from  'typeorm';
import {RegisterResolver} from './models/user/register'




async function main() {
  try {
    // building the schema 
  await createConnection();//intialize db and create db connection
  const schema = await buildSchema({
    resolvers: [RegisterResolver],
    // automatically create `schema.gql` file with schema definition in project's working directory
    emitSchemaFile: true,
  });

  const app = express();
  const server = new ApolloServer({schema });
  await server.start();
  server.applyMiddleware({ app });
  app.listen(9080,()=>{
      console.log(`🚀 Server ready at http://localhost:9080`);
  })
  } catch (error) {
    console.log(error)
  }
}


main()