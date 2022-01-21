import { gql } from 'apollo-server';
import { Location } from '../../models/Location';
import { Event } from '../../models/Event';

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
    location: async (_obj: null, args: Args) =>
      await Location.query().findById(args.id).withGraphFetched('[events, sports]')
  },
  Location: {
    events: async (obj: Args) =>
      await Event.query().where('locationId', obj.id).withGraphFetched('[createdBy, sport]')
  }
};

export default {
  typeDefs,
  resolvers,
};