import { gql } from 'apollo-server'

export const typeDefs = gql`
type Location {
  id: ID!
  name: String!
  description: String
  events: EventConnection!
  sports: SportConnection!
  address: Address
}
`

export const resolvers = {}

export default {
  typeDefs,
  resolvers,
}