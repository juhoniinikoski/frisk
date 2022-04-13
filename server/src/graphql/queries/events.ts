import { gql } from 'apollo-server';
import { getEvents } from '../../services/event/eventService';

export const typeDefs = gql`
  extend type Query {
    """
    Returns array of users.
    """
    events(
      first: Int
      after: String
      searchKeyword: String
      locationId: ID
      userId: ID
      activityId: ID
      savedBy: ID
      orderBy: String
    ): [Event]
  }
`;

// const getLikeFilter = (value: string) => `%${value}%`;

interface Args {
  first: number
  after: string
  searchKeyword: string
  locationId: string | number
  userId: string | number
  activityId: string | number
  savedBy: string | number
  orderBy: string
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