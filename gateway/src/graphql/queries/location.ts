import { gql } from 'apollo-server';
import { Location } from '../../entities';
import { fetch } from '../../services/fetch';

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
    location: async (_obj: null, args: Args) => {
      const result = await fetch(`http://localhost:9020/locations/${args.id}`);
      const data = result.json();
      return data
    }
  },
  Location: {
    events: async (obj: Location) => {
      const result = await fetch(`http://localhost:9010/events?location=${obj.id}`);
      const data = result.json();
      return data
    },
    sports: async (obj: Location) => {
      const result = await fetch(`http://localhost:9040/sports?location=${obj.id}`);
      const data = result.json();
      return data
    }
  }
};

export default {
  typeDefs,
  resolvers,
};