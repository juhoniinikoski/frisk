import { ApolloError, gql } from 'apollo-server';
import { Context } from '../../../entities';
import { User } from '../../../models/User';
import { UserUser } from '../../../models/UserUser';

export const typeDefs = gql`
  extend type Mutation {
    followUser(followedId: ID!): Boolean
  }
`;

interface Args {
  followedId: string | number
}

interface User {
  id?: string
}

export const resolvers = {
  Mutation: {
    followUser: async (_obj: Args, args: Args, { authService }: Context) => {
      
      const authorizedUser: User = await authService.getAuthorizedUserOrFail();

      const userToFollow = await User.query().findById(args.followedId);

      if (!userToFollow) {
        throw new ApolloError('User to follow not found');
      }

      const alreadyFollow = await UserUser.query().where({
        followerId: authorizedUser.id,
        followingId: args.followedId,
      });

      // Delete the follow
      if (alreadyFollow.length !== 0) {
        await UserUser.query()
          .where({
            followerId: authorizedUser.id,
            followingId: args.followedId,
          })
          .delete();

        return true;
      }

      await UserUser.query().insertAndFetch({
        follower_id: authorizedUser.id,
        following_id: args.followedId
      });

      return true;
    },
  },
};

export default {
  typeDefs,
  resolvers,
};