import { gql, UserInputError, ForbiddenError } from 'apollo-server';
import { Event } from '../../../models/Event';
import { Context } from '../../../entities';

export const typeDefs = gql`
  extend type Mutation {
    """
    Deletes the event which has the given id, if it is created by the authorized user.
    """
    deleteEvent(id: ID!): Boolean
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
    deleteEvent: async (_obj: null, args: Args, { authService }: Context) => {

      const authorizedUser: User = await authService.getAuthorizedUserOrFail();

      const event = await Event.query().findById(args.id);

      console.log(event);

      if (!event) {
        throw new UserInputError(`Event with id ${args.id} does not exist`);
      }

      if (event.userId !== authorizedUser.id) {
        throw new ForbiddenError('User is not authorized to delete the event');
      }

      await Event.query().findById(args.id).delete();

      return true;
    },
  },
};

export default {
  typeDefs,
  resolvers,
};