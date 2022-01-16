import { gql } from 'apollo-server';
import { User } from '../../models/User';

export const typeDefs = gql`
  extend type Query {
    """
    Returns paginated users.
    """
    users(first: Int, after: String): [User]!
  }
`;

export const resolvers = {
  Query: {
    users: async () => await User.query()
  },
};

export default {
  typeDefs,
  resolvers,
};