import { gql } from 'apollo-server';
import { Location } from '../../entities';
import { getEvents } from '../../operations/eventOperations';
import { getLocation } from '../../operations/locationOperations';
import { getSports } from '../../operations/sportOperations';

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
    location: async (_obj: null, args: Args) => await getLocation(args.id)
  },
  Location: {
    events: async (obj: Location) => await getEvents({ location: obj.id }),
    sports: async (obj: Location) => await getSports({ location: obj.id }),
  }
};

export default {
  typeDefs,
  resolvers,
};