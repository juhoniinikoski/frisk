import { gql } from 'apollo-server'

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: DateTime!
    upcoming(first: Int, after: String): EventConnection!
    followed(first: Int, after: String): UserConnection!
    favorites(first: Int, after: String): SportConnection!
    saved(first: Int, after: String): EventConnection!
  }
`

export const resolvers = {}

export default {
  typeDefs,
  resolvers,
}