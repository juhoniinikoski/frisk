import { gql } from 'apollo-server';
import * as yup from 'yup';
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