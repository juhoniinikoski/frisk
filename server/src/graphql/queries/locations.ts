import { gql } from 'apollo-server';
import { getLocations } from '../../services/location/locationService';

export const typeDefs = gql`
  extend type Query {
    """
    Returns array of locations.
    """
    locations(
      first: Int
      after: String
      searchKeyword: String
      activityId: ID
      savedBy: ID
      orderBy: String
    ): [Location]!
  }
`;

// const getLikeFilter = (value: string) => `%${value}%`;

interface Args {
  first: number
  after: string
  searchKeyword: string
  activityId: string | number
  savedBy: string | number
  orderBy: string
}

export const resolvers = {
  Query: {
    locations: async (_obj: null, args: Args) => await getLocations(args)
  }
};

export default {
  typeDefs,
  resolvers,
};