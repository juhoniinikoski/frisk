import { gql } from 'apollo-server';
import * as yup from 'yup';
import { fetch } from '../../services/fetch';

export const typeDefs = gql`
  extend type Query {
    """
    Returns paginated locations.
    """
    locations(
      first: Int
      after: String
      searchKeyword: String
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
}

export const resolvers = {
  Query: {
    locations: async () => {
      const result = await fetch("http://localhost:9020/locations");
      const data = result.json();
      return data;
    }
  }
};

export default {
  typeDefs,
  resolvers,
};