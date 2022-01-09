import { gql } from 'apollo-server'

export const typeDefs = gql`
  type LocationEdge {
    cursor: String!
    node: Location!
  }
  type LocationConnection {
    totalCount: Int!
    pageInfo: PageInfo!
    edges: [LocationEdge!]!
  }
`

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
}