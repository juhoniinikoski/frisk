import { gql } from 'apollo-server';
import { fetch } from '../../services/fetch';

export const typeDefs = gql`
  extend type Query {
    """
    Returns an event by an id.
    """
    event(id: ID!): Event
  }
`;

interface Args {
  id: number | string
  createdById?: string | number
  createdByName?: string
  sportId?: string | number
  sportName?: string
  locationId?: string | number
  locationName?: string
}


export const resolvers = {
  Query: {
    event: async (_obj: null, args: Args) => { 
      const result = await fetch(`http://localhost:9010/events/${args.id}`);
      const data = result.json();
      return data;
    }
  },
};

export default {
  typeDefs,
  resolvers,
};