import { gql } from 'apollo-server';

export const typeDefs = gql`
  extend type Mutation {
    saveActivity(activityId: ID!): Boolean
  }
`;

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};