import { gql } from 'apollo-server'

export const typeDefs = gql`
type Sport {
  id: ID!
  name: String!
}
`

export const resolvers = {}

export default {
  typeDefs,
  resolvers,
}