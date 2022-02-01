import { gql } from 'apollo-server';
import { Sport } from '../../entities';
import { fetch } from '../../services/fetch';

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
    sport: async (_obj: null, args: Args) => {
      const result = await fetch(`http://localhost:9040/sports/${args.id}`);
      const data = result.json();
      return data;
    }
  },
  Sport: {
    events: async (obj: Sport) => {
      const result = await fetch(`http://localhost:9010/events?sport=${obj.id}`);
      const data = result.json();
      return data;
    },
    locations: async (obj: Sport) => {
      const result = await fetch(`http://localhost:9020/locations?sport=${obj.id}`);
      const data = result.json();
      return data;
    },
  }
};

export default {
  typeDefs,
  resolvers,
};