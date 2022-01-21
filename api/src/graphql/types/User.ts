import { gql } from 'apollo-server';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: DateTime!
    upcomingEvents(first: Int, after: String): [Event]
    followedUsers(first: Int, after: String): [User]
    savedLocations(first: Int, after: String): [Location]
    savedSports(first: Int, after: String): [Sport]
    savedEvents(first: Int, after: String): [Event]
  }
`;

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};