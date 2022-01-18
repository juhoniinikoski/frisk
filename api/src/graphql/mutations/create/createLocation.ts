import { gql } from 'apollo-server';
import * as yup from 'yup';
import { v4 as uuid } from 'uuid';
import { Location } from '../../../models/Location';
import { Context } from '../../../entities';

export const typeDefs = gql`
  input CreateLocationInput {
    name: String!
    description: String
    sports: [String]
  }
  extend type Mutation {
    createLocation(location: CreateLocationInput): Boolean
  }
`;

const argsSchema = yup.object().shape({
  location: yup.object().shape({
    name: yup
      .string()
      .max(200)
      .trim(),
  }),
});

interface Args {
  location: {
    name: string
    description: string
    sports: string[]
  }
}

export const resolvers = {
  Mutation: {
    createLocation: async (_obj: Args, args: Args, { authService }: Context) => {
      
      await authService.getAuthorizedUserOrFail();

      const { location } = await argsSchema.validate(args, {
        stripUnknown: true,
      });

      const id = uuid();

      await Location.query().insertAndFetch({
        id: id,
        name: location.name,
        description: args.location.description
      });

      return true;
    },
  },
};

export default {
  typeDefs,
  resolvers,
};