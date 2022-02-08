import { gql } from 'apollo-server';
import { Context } from '../../../entities';
import { deleteSport } from '../../../operations/sportOperations';

export const typeDefs = gql`
  extend type Mutation {
    """
    Deletes the sport which has the given id, if it is created by the authorized user.
    """
    deleteSport(id: ID!): Boolean
  }
`;


interface Args {
  id: string | number
}

export const resolvers = {
  Mutation: {
    deleteSport: async (_obj: null, args: Args, { authService }: Context) => {
      const authorizedUser = await authService.getAuthorizedUserOrFail();
      return await deleteSport(args.id, authorizedUser);
    }
  }
};

export default {
  typeDefs,
  resolvers,
};