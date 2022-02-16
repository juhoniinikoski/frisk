import { gql } from 'apollo-server';
import { getEvents } from '../../operations/eventOperations';

export const typeDefs = gql`
  extend type Query {
    """
    Returns array of users.
    """
    events(
      first: Int
      after: String
      searchKeyword: String
      location: ID
      user: ID
      activity: ID
      savedBy: ID
    ): [Event]
  }
`;

// const getLikeFilter = (value: string) => `%${value}%`;

interface Args {
  first: number
  after: string
  searchKeyword: string
  location: string | number
  user: string | number
  activity: string | number
  savedBy: string | number
}

export const resolvers = {
  Query: {
    events: async (_obj: null, args: Args) => await getEvents(args)
  }
};

export default {
  typeDefs,
  resolvers,
};