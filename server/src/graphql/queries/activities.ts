import { gql } from 'apollo-server';
import { getActivities } from '../../services/activity/activityService';

export const typeDefs = gql`
  extend type Query {
    """
    Returns array of activities.
    """
    activities(
      first: Int
      after: String
      searchKeyword: String
      locationId: ID
      savedBy: ID
    ): [Activity]!
  }
`;

// const getLikeFilter = (value: string) => `%${value}%`;

interface Args {
  first: number
  after: string
  searchKeyword: string
  locationId: string | number
  savedBy: string | number
  orderBy: string
}

export const resolvers = {
  Query: {
    activities: async (_obj: null, args: Args) => await getActivities(args)
  }
};

export default {
  typeDefs,
  resolvers,
};