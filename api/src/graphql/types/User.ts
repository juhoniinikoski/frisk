import { gql } from 'apollo-server';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: DateTime!
    upcoming(first: Int, after: String): [Event]
    following(first: Int, after: String): [User]
    favorites(first: Int, after: String): [Sport]
    saved(first: Int, after: String): [Event]
  }
`;

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};