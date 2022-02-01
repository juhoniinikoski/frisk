import { gql } from 'apollo-server';
import { Context } from '../../entities';

export const typeDefs = gql`
  extend type Query {
    """
    Returns the authenticated user.
    """
    me: User
  }
`;

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};