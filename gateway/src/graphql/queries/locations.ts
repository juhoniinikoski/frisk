import { gql } from 'apollo-server';
import { getLocations } from '../../operations/locationOperations';

export const typeDefs = gql`
  extend type Query {
    """
    Returns array of locations.
    """
    locations(
      first: Int
      after: String
      searchKeyword: String
      sport: ID
      savedBy: ID
    ): [Location]!
  }
`;

// const getLikeFilter = (value: string) => `%${value}%`;

interface Args {
  first: number
  after: string
  searchKeyword: string
  sport: string | number
  savedBy: string | number
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