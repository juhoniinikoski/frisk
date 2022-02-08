import { gql } from 'apollo-server';
import { Context } from '../../../entities';
import { createSport } from '../../../operations/sportOperations';

export const typeDefs = gql`
  input CreateSportInput {
    name: String!
  }
  extend type Mutation {
    createSport(sport: CreateSportInput): String
  }
`;

interface Args {
  sport: {
    name: string
  }
}

export const resolvers = {
  Mutation: {
    createSport: async (_obj: null, args: Args, { authService }: Context) => {
      const authorizedUser = await authService.getAuthorizedUserOrFail();
      return await createSport(args.sport, authorizedUser);
    }
  }
};

export default {
  typeDefs,
  resolvers,
};