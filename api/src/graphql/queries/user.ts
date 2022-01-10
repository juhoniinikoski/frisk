import { gql } from 'apollo-server'
import { loaders } from '../../services/loaders/dataloaders'

export const typeDefs = gql`
  extend type Query {
    """
    Returns user by an id.
    """
    user(id: ID!): User
  }
`

interface Args {
  id: number | string
}

export const resolvers = {
  Query: {
    user: async (_obj: any, args: Args) =>
      loaders.user.load(args.id),
  },
}

export default {
  typeDefs,
  resolvers,
}