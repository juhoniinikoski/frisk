import { gql } from 'apollo-server';
import { Sport } from '../../models/Sport';

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
    sport: async (_obj: null, args: Args) => 
      await Sport.query().findById(args.id).withGraphFetched('[events, locations]')
  }
};

export default {
  typeDefs,
  resolvers,
};