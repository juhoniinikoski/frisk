import { gql } from 'apollo-server'

export const typeDefs = gql`
  extend type Query {
    """
    Returns paginated collections.
    """
    collections: String
  }
`

export const resolvers = {
  Query: {
    collections:  () => "testi2"
  },
}

export default {
  typeDefs,
  resolvers,
}