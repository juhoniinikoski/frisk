import { gql } from 'apollo-server';

export const typeDefs = gql`
  input AddSportInput {
    sportId: ID!
    locationId: ID!
  }
  extend type Mutation {
    addSport(add: AddSportInput): Boolean
  }
`;

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};