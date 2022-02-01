import { gql } from 'apollo-server';

export const typeDefs = gql`
  extend type Mutation {
    """
    Deletes the event which has the given id, if it is created by the authorized user.
    """
    deleteEvent(id: ID!): Boolean
  }
`;

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};