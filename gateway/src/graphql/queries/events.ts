import { gql } from 'apollo-server';
import * as yup from 'yup';
import { getEvents } from '../../operations/eventOperations';

export const typeDefs = gql`
  extend type Query {
    """
    Returns paginated users.
    """
    events(
      first: Int
      after: String
      searchKeyword: String
      location: ID
      user: ID
      sport: ID
      savedBy: ID
    ): [Event]
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
  user: string | number
  sport: string | number
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