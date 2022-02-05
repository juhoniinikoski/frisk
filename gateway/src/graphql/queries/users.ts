import { gql } from 'apollo-server';
import { getUsers } from '../../operations/userOperations';

export const typeDefs = gql`
  extend type Query {
    """
    Returns paginated users.
    """
    users(first: Int, after: String, searchKeyword: String): [User]!
  }
`;

interface Args {
  first: number
  after: string
  searchKeyword: string
}

export const resolvers = {
  Query: {
    users: async (_obj: null, args: Args) => await getUsers(args)
  }
};

export default {
  typeDefs,
  resolvers,
};