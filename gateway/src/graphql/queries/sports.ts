import { gql } from 'apollo-server';
import { getSports } from '../../operations/sportOperations';

export const typeDefs = gql`
  extend type Query {
    """
    Returns paginated users.
    """
    sports(
      first: Int
      after: String
      searchKeyword: String
      location: ID
      savedBy: ID
    ): [Sport]!
  }
`;

// const getLikeFilter = (value: string) => `%${value}%`;

interface Args {
  first: number
  after: string
  searchKeyword: string
  location: string | number
  savedBy: string | number
}

export const resolvers = {
  Query: {
    sports: async (_obj: null, args: Args) => await getSports(args)
  }
};

export default {
  typeDefs,
  resolvers,
};