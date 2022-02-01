import { gql } from 'apollo-server';

export const typeDefs = gql`
  extend type Mutation {
    followUser(followedId: ID!): Boolean
  }
`;

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};