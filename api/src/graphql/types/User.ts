import { gql } from 'apollo-server';
import { User } from '../../models/User';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: DateTime!
    upcoming(first: Int, after: String): [Event]!
    followed(first: Int, after: String): [User]!
    favorites(first: Int, after: String): [Sport]!
    saved(first: Int, after: String): [Event]!
  }
`;

interface Args {
  id: string
}

export const resolvers = {
  User: {
    followed: async ({ id }: Args) => await User.relatedQuery('following').for(id),
    upcoming: async ({ id }: Args) => await User.relatedQuery('events').for(id)
  }
};

export default {
  typeDefs,
  resolvers,
};