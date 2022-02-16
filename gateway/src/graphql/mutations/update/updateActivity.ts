import { gql } from 'apollo-server';
import { Context } from '../../../entities';
import { updateActivity } from '../../../operations/activityOperations';


export const typeDefs = gql`
  input UpdateActivityInput {
    name: String
  }
  extend type Mutation {
    updateActivity(id: ID!, data: UpdateActivityInput): String
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
    updateActivity: async (_obj: null, args: Args, { authService }: Context) => {
      const authorizedUser = await authService.getAuthorizedUserOrFail();
      return await updateActivity(args.id, args.data, authorizedUser);
    }
  }
};

export default {
  typeDefs,
  resolvers,
};