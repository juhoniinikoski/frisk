import { gql } from 'apollo-server';
import { Context } from '../../../entities';
import { User } from '../../../models/User';

export const typeDefs = gql`
  extend type Mutation {
    """
    Deletes the user which has the given id, if it is the current authorized user.
    """
    deleteUser(id: ID!): Boolean
  }
`;

interface UserType {
  id?: string
}

interface Args {
  id: string
}

export const resolvers = {
  Mutation: {
    deleteUser: async (_obj: null, args: Args, { authService }: Context) => {

      const authorizedUser: UserType = await authService.getAuthorizedUserOrFail();

      await User.query().findById(authorizedUser.id).delete();

      return true;
    },
  },
};

export default {
  typeDefs,
  resolvers,
};