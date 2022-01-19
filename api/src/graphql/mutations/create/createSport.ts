import { gql } from 'apollo-server';
import * as yup from 'yup';
import { v4 as uuid } from 'uuid';
import { Context } from '../../../entities';
import { LocationSport } from '../../../models/LocationSport';
import { Sport } from '../../../models/Sport';

export const typeDefs = gql`
  input CreateSportInput {
    name: String!
    locations: [String]
  }
  extend type Mutation {
    createSport(sport: CreateSportInput): Boolean
  }
`;

const argsSchema = yup.object().shape({
  sport: yup.object().shape({
    name: yup
      .string()
      .max(200)
      .trim(),
  }),
});

interface Args {
  sport: {
    name: string
    locations: string[]
  }
}

export const resolvers = {
  Mutation: {
    createSport: async (_obj: Args, args: Args, { authService }: Context) => {
      
      await authService.getAuthorizedUserOrFail();

      const { sport } = await argsSchema.validate(args, {
        stripUnknown: true,
      });

      const id = uuid();

      const relationData = args.sport.locations.map((location: string) => {
        return {
          sportId: id,
          locationId: location
        };
      });

      await Sport.query().insertAndFetch({
        id: id,
        name: sport.name,
      });

      await LocationSport.query().insert(relationData);

      return true;
    },
  },
};

export default {
  typeDefs,
  resolvers,
};