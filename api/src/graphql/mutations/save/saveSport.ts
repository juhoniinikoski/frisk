import { ApolloError, gql } from 'apollo-server';
import { Context } from '../../../entities';
import { Sport } from '../../../models/Sport';
import { User } from '../../../models/User';
import { UserSport } from '../../../models/UserSport';

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

      const alreadyFollow = await UserSport.query().where({
        userId: authorizedUser.id,
        sportId: args.sportId,
      });

      // Delete the follow
      if (alreadyFollow.length !== 0) {
        await UserSport.query()
          .where({
            userId: authorizedUser.id,
            sportId: args.sportId,
          })
          .delete();

        return true;
      }

      await UserSport.query().insertAndFetch({
        userId: authorizedUser.id,
        sportId: args.sportId,
      });

      return true;
    },
  },
};

export default {
  typeDefs,
  resolvers,
};