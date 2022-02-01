import { gql } from 'apollo-server';

export const typeDefs = gql`
  extend type Mutation {
    saveEvent(eventId: ID!): Boolean
  }
`;

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};