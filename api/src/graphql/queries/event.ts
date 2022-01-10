import { gql } from 'apollo-server'
import { loaders } from '../../services/loaders/dataloaders'

export const typeDefs = gql`
  extend type Query {
    """
    Returns event by an id.
    """
    event(id: ID!): Event
  }
`

interface Args {
  id: number | string
}

export const resolvers = {
  Query: {
    event: async (_obj: any, args: Args) =>
      loaders.event.load(args.id),
  },
}

export default {
  typeDefs,
  resolvers,
}