import { gql } from 'apollo-server';
import { Context } from '../../../entities';
import { deleteActivity } from '../../../operations/activityOperations';

export const typeDefs = gql`
  extend type Mutation {
    """
    Deletes the activity which has the given id, if it is created by the authorized user.
    """
    deleteActivity(id: ID!): Boolean
  }
`;


interface Args {
  id: string | number
}

export const resolvers = {
  Mutation: {
    deleteActivity: async (_obj: null, args: Args, { authService }: Context) => {
      const authorizedUser = await authService.getAuthorizedUserOrFail();
      return await deleteActivity(args.id, authorizedUser);
    }
  }
};

export default {
  typeDefs,
  resolvers,
};