import { ApolloError, gql } from 'apollo-server';

export const typeDefs = gql`
  extend type Mutation {
    saveLocation(locationId: ID!): Boolean
  }
`;

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};