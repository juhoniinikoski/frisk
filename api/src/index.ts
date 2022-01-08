import { ApolloServer } from 'apollo-server'
import schema from './graphql/schema'

const server = new ApolloServer({ schema })

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}graphql`)
})