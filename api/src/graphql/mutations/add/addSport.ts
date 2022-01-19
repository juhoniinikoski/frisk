import { ApolloError, gql } from 'apollo-server';
import { Location } from '../../../models/Location';
import { LocationSport } from '../../../models/LocationSport';
import { Sport } from '../../../models/Sport';

export const typeDefs = gql`
  input AddSportInput {
    sportId: ID!
    locationId: ID!
  }
  extend type Mutation {
    addSport(add: AddSportInput): Boolean
  }
`;  

interface Args {
  add: {
    locationId: string | number
    sportId: string | number
  }
}

export const resolvers = {
  Mutation: {
    addSport: async (_obj: Args, args: Args) => {

      const location = await Location.query().findById(args.add.locationId);
      const sport = await Sport.query().findById(args.add.sportId);

      if (!location) {
        throw new ApolloError('Location not found');
      }

      if (!sport) {
        throw new ApolloError('Sport not found');
      }

      // sportin virheilmoitus puuttuu

      const alreadyAdded = await LocationSport.query().where({
        locationId: args.add.locationId,
        sportId: args.add.sportId,
      });

      // Delete the follow
      if (alreadyAdded.length !== 0) {
        await LocationSport.query()
          .where({
            locationId: args.add.locationId,
            sportId: args.add.sportId,
          })
          .delete();

        return true;
      }

      await LocationSport.query().insertAndFetch({
        locationId: args.add.locationId,
        sportId: args.add.sportId,
      });

      return true;
    },
  },
};

export default {
  typeDefs,
  resolvers,
};