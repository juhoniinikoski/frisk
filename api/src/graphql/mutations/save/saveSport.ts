import { ApolloError, gql } from 'apollo-server';
import { Context } from '../../../entities';
import { Event } from '../../../models/Event';
import { Sport } from '../../../models/Sport';
import { User } from '../../../models/User';
import { UserEvent } from '../../../models/UserEvent';

export const typeDefs = gql`
  extend type Mutation {
    saveSport(sportId: ID!): Boolean
  }
`;

interface Args {
  sportId: string | number
}

interface User {
  id?: string
}

export const resolvers = {
  Mutation: {
    saveSport: async (_obj: Args, args: Args, { authService }: Context) => {
      
      const authorizedUser: User = await authService.getAuthorizedUserOrFail();

      

      const sportToFollow = await Sport.query().findById(args.sportId);

      if (!sportToFollow) {
        throw new ApolloError('Sport to follow not found');
      }

      // const alreadyFollow = await UserEvent.query().where({
      //   userId: authorizedUser.id,
      //   eventId: args.eventId,
      // });

      // // Delete the follow
      // if (alreadyFollow.length !== 0) {
      //   await UserEvent.query()
      //     .where({
      //       userId: authorizedUser.id,
      //       eventId: args.eventId,
      //     })
      //     .delete();

      //   return true;
      // }

      // await UserEvent.query().insertAndFetch({
      //   userId: authorizedUser.id,
      //   eventId: args.eventId,
      // });

      return true;
    },
  },
};

export default {
  typeDefs,
  resolvers,
};