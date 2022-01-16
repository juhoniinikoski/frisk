import { gql } from 'apollo-server';
import { loaders } from '../../services/loaders/dataloaders';

export const typeDefs = gql`
  extend type Query {
    """
    Returns a location by an id.
    """
    location(id: ID!): Location
  }
`;

interface Args {
  id: number | string
}

export const resolvers = {
  Query: {
    location: async (_obj: null, args: Args) => loaders.location.load(args.id)
  }
};

export default {
  typeDefs,
  resolvers,
};