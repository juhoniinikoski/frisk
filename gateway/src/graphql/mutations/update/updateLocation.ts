import { gql } from 'apollo-server';
import { Context } from '../../../entities';
import { updateLocation } from '../../../operations/locationOperations';


export const typeDefs = gql`
  input UpdateLocationInput {
    name: String
    description: String
    street: String
    zipcode: String
    city: String
    country: String
  }
  extend type Mutation {
    updateLocation(id: ID!, data: UpdateLocationInput): String
  }
`;

interface Args {
  id: string | number
  data: {
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
    updateLocation: async (_obj: null, args: Args, { authService }: Context) => {
      const authorizedUser = await authService.getAuthorizedUserOrFail();
      console.log(authorizedUser);
      return await updateLocation(args.id, args.data, authorizedUser);
    }
  }
};

export default {
  typeDefs,
  resolvers,
};