import { gql } from 'apollo-server';
import { Sport } from '../../entities';
import { getEvents } from '../../operations/eventOperations';
import { getLocations } from '../../operations/locationOperations';
import { getSport } from '../../operations/sportOperations';

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
    sport: async (_obj: null, args: Args) => await getSport(args.id)
  },
  Sport: {
    events: async (obj: Sport) => await getEvents({ sport: obj.id }),
    locations: async (obj: Sport) => await getLocations({ sport: obj.id }),
  }
};

export default {
  typeDefs,
  resolvers,
};