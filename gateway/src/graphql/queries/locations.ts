import { gql } from 'apollo-server';
import * as yup from 'yup';
import { getLocations } from '../../operations/locationOperations';

export const typeDefs = gql`
  extend type Query {
    """
    Returns paginated locations.
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

const getLikeFilter = (value: string) => `%${value}%`;

const argsSchema = yup.object({
  after: yup.string(),
  first: yup.number().min(1).max(30).default(30),
  searchKeyword: yup.string().trim(),
});

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