import { gql } from 'apollo-server';

export const typeDefs = gql`
  input AddActivityInput {
    activityId: ID!
    locationId: ID!
  }
  extend type Mutation {
    addActivity(add: AddActivityInput): Boolean
  }
`;

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};