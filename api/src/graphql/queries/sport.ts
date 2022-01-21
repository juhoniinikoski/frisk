import { gql } from 'apollo-server';
import { Sport } from '../../models/Sport';
import { Event } from '../../models/Event';

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
  },
  Sport: {
    events: async (obj: Args) =>
      await Event.query().where('sportId', obj.id).withGraphFetched('[location, createdBy]')
  }
};

export default {
  typeDefs,
  resolvers,
};