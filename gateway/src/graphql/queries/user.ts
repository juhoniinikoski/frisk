import { gql } from 'apollo-server';
import { User } from '../../entities';
import { fetch } from '../../services/fetch';

export const typeDefs = gql`
  extend type Query {
    """
    Returns an user by an id.
    """
    user(id: ID!): User
  }
`;

interface Args {
  id: number | string
}

export const resolvers = {
  Query: {
    user: async (_obj: null, args: Args) => {
      const result = await fetch(`http://localhost:9030/users/${args.id}`);
      const data = result.json();
      return data;
    }
  },
  User: {
    savedEvents: async (obj: User) => {
      const result = await fetch(`http://localhost:9010/events?savedBy=${obj.id}`);
      const data = result.json();
      return data;
    },
    savedLocations: async (obj: User) => {
      const result = await fetch(`http://localhost:9020/locations?savedBy=${obj.id}`);
      const data = result.json();
      return data;
    },
    savedSports: async (obj: User) => {
      const result = await fetch(`http://localhost:9040/sports?savedBy=${obj.id}`);
      const data = result.json();
      return data;
    }
  }
};

export default {
  typeDefs,
  resolvers,
};