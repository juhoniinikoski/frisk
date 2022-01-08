import { gql } from 'apollo-server'

export const typeDefs = gql`
type Address {
  id: ID!
  street: String!
  zipcode: String!
  city: String!
}
`

export const resolvers = {}

export default {
  typeDefs,
  resolvers,
}