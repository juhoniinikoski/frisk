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

export const resolvers = {
  Query: {
    me: (_obj: null, _args: null, { authService }: Context) => {
      return authService.getAuthorizedUserRelations();
    },
  }
};

export default {
  typeDefs,
  resolvers,
};