import { gql } from 'apollo-server';
import { User } from '../../entities';
import { getEvents } from '../../operations/eventOperations';
import { getLocations } from '../../operations/locationOperations';
import { getSports } from '../../operations/sportOperations';
import { getUser } from '../../operations/userOperations';

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
    user: async (_obj: null, args: Args) => await getUser(args.id)
  },
  User: {
    savedEvents: async (obj: User) => await getEvents({ savedBy: obj.id }),
    savedLocations: async (obj: User) => await getLocations({ savedBy: obj.id }),
    savedSports: async (obj: User) => await getSports({ savedBy: obj.id })
  }
};

export default {
  typeDefs,
  resolvers,
};