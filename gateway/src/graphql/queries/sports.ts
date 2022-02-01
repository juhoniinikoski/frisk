import { gql } from 'apollo-server';
import * as yup from 'yup';
import { fetch } from '../../services/fetch';

export const typeDefs = gql`
  extend type Query {
    """
    Returns paginated users.
    """
    sports(
      first: Int
      after: String
      searchKeyword: String
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
}

export const resolvers = {
  Query: {
    sports: async () => {
      const result = await fetch("http://localhost:9040/sports");
      const data = result.json();
      return data;
    }
  }
};

export default {
  typeDefs,
  resolvers,
};