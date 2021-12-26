import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import {buildSchema,Resolver,Query} from 'type-graphql'
import 'reflect-metadata'

@Resolver()
class HelloResolver {
 
  @Query(() =>String,{nullable:true,description:"returns a greeting"} )
  async hello() {
    return "hello world";
  }
 
}


async function main() {
  // building the schema 
  const schema = await buildSchema({
    resolvers: [HelloResolver],
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
}


main()