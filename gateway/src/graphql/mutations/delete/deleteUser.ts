import { gql } from 'apollo-server';
import { Context } from '../../../entities';
import { deleteUser } from '../../../operations/userOperations';

export const typeDefs = gql`
  extend type Mutation {
    """
    Deletes the user which has the given id, if it is the current authorized user.
    """
    deleteUser(id: ID!): Boolean
  }
`;

interface Args {
  id: string | number
}

export const resolvers = {
  Mutation: {
    deleteUser: async (_obj: null, args: Args, { authService }: Context) => {
      const authorizedUser = await authService.getAuthorizedUserOrFail();
      return await deleteUser(args.id, authorizedUser);
    }
  }
};

export default {
  typeDefs,
  resolvers,
};