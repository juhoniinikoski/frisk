import { gql } from 'apollo-server';
import { Context } from '../../../entities';
import { updateSport } from '../../../operations/sportOperations';


export const typeDefs = gql`
  input UpdateSportInput {
    name: String
  }
  extend type Mutation {
    updateSport(id: ID!, data: UpdateSportInput): String
  }
`;

interface Args {
  id: string | number
  data: {
    name: string
  }
}

export const resolvers = {
  Mutation: {
    updateSport: async (_obj: null, args: Args, { authService }: Context) => {
      const authorizedUser = await authService.getAuthorizedUserOrFail();
      return await updateSport(args.id, args.data, authorizedUser);
    }
  }
};

export default {
  typeDefs,
  resolvers,
};