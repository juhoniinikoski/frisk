import { gql } from 'apollo-server';
import { Context } from '../../../entities';
import { createActivity } from '../../../operations/activityOperations';

export const typeDefs = gql`
  input CreateActivityInput {
    name: String!
  }
  extend type Mutation {
    createActivity(activity: CreateActivityInput): String
  }
`;

interface Args {
  activity: {
    name: string
  }
}

export const resolvers = {
  Mutation: {
    createActivity: async (_obj: null, args: Args, { authService }: Context) => {
      const authorizedUser = await authService.getAuthorizedUserOrFail();
      return await createActivity(args.activity, authorizedUser);
    }
  }
};

export default {
  typeDefs,
  resolvers,
};