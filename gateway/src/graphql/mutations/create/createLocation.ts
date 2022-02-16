import { gql } from 'apollo-server';
import { Context } from '../../../entities';
import { createLocation } from '../../../operations/locationOperations';

export const typeDefs = gql`
  input CreateLocationInput {
    name: String!
    description: String
    street: String!
    zipcode: String
    city: String!
    country: String
    latitude: Float!
    longitude: Float!
  }
  extend type Mutation {
    createLocation(location: CreateLocationInput): String
  }
`;

interface Args {
  location: {
    name: string
    description: string
    street: string
    zipcode: string
    city: string
    country: string
  }
}

export const resolvers = {
  Mutation: {
    createLocation: async (_obj: null, args: Args, { authService }: Context) => {
      const authorizedUser = await authService.getAuthorizedUserOrFail();
      return await createLocation(args.location, authorizedUser);
    }
  }
};

export default {
  typeDefs,
  resolvers,
};