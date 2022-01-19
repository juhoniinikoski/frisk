import { gql, UserInputError, ForbiddenError } from 'apollo-server';
import { Location } from '../../../models/Location';
import { Context } from '../../../entities';

export const typeDefs = gql`
  extend type Mutation {
    """
    Deletes the location which has the given id, if it is created by the authorized user.
    """
    deleteLocation(id: ID!): Boolean
  }
`;

interface Args {
  id: string
}

interface User {
  id?: string
}

export const resolvers = {
  Mutation: {
    deleteLocation: async (_obj: null, args: Args, { authService }: Context) => {

      const authorizedUser: User = await authService.getAuthorizedUserOrFail();

      const location = await Location.query().findById(args.id);

      if (!location) {
        throw new UserInputError(`Location with id ${args.id} does not exist`);
      }

      if (location.createdById !== authorizedUser.id) {
        throw new ForbiddenError('User is not authorized to delete the location');
      }

      await Location.query().findById(args.id).delete();

      return true;
    },
  },
};

export default {
  typeDefs,
  resolvers,
};