import { ApolloServer } from 'apollo-server'
import schema from './graphql/schema'
import createDataLoaders from './services/loaders/createDataLoaders';

const server = new ApolloServer({ 
  schema,
  context: ({ req }) => {
    // const authorization = req.get('authorization');

    // const accessToken = authorization ? authorization.split(' ')[1] : undefined;
    const dataLoaders = createDataLoaders();

    return {
      // authService: new AuthService({
      //   accessToken,
      //   dataLoaders,
      // }),
      dataLoaders,
    };
  },
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}graphql`)
})