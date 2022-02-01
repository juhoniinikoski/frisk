import { gql } from 'apollo-server';
import { fetch } from '../../services/fetch';

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
    users: async () => {
      const result = await fetch("http://localhost:9030/users");
      const data = result.json();
      return data;
    }
  }
};

export default {
  typeDefs,
  resolvers,
};