import { gql } from 'apollo-server';

export const typeDefs = gql`
  extend type Mutation {
    """
    Deletes the location which has the given id, if it is created by the authorized user.
    """
    deleteLocation(id: ID!): Boolean
  }
`;


export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};