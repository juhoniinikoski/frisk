import { ApolloError, gql } from 'apollo-server';
import { Context } from '../../../entities';
import { Location } from '../../../models/Location';
import { User } from '../../../models/User';
import { UserLocation } from '../../../models/UserLocation';

export const typeDefs = gql`
  extend type Mutation {
    saveLocation(locationId: ID!): Boolean
  }
`;

interface Args {
  locationId: string | number
}

interface User {
  id?: string
}

export const resolvers = {
  Mutation: {
    saveLocation: async (_obj: Args, args: Args, { authService }: Context) => {
      
      const authorizedUser: User = await authService.getAuthorizedUserOrFail();

      const locationToFollow = await Location.query().findById(args.locationId);

      if (!locationToFollow) {
        throw new ApolloError('Sport to follow not found');
      }

      const alreadyFollow = await UserLocation.query().where({
        userId: authorizedUser.id,
        locationId: args.locationId,
      });

      // Delete the follow
      if (alreadyFollow.length !== 0) {
        await UserLocation.query()
          .where({
            userId: authorizedUser.id,
            locationId: args.locationId,
          })
          .delete();

        return true;
      }

      await UserLocation.query().insertAndFetch({
        userId: authorizedUser.id,
        locationId: args.locationId,
      });

      return true;
    },
  },
};

export default {
  typeDefs,
  resolvers,
};