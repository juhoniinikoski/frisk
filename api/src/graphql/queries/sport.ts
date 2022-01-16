import { gql } from 'apollo-server';
import { loaders } from '../../services/loaders/dataloaders';

export const typeDefs = gql`
  extend type Query {
    """
    Returns a sport by an id.
    """
    sport(id: ID!): Sport
  }
`;

interface Args {
  id: number | string
}

export const resolvers = {
  Query: {
    sport: async (_obj: null, args: Args) => loaders.sport.load(args.id)
  }
};

export default {
  typeDefs,
  resolvers,
};