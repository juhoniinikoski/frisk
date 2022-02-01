import { gql } from 'apollo-server';

export const typeDefs = gql`
  extend type Mutation {
    """
    Deletes the user which has the given id, if it is the current authorized user.
    """
    deleteUser(id: ID!): Boolean
  }
`;

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};