import { gql } from 'apollo-server';
import { Context } from '../../../entities';
import { createEvent } from '../../../operations/eventOperations';


export const typeDefs = gql`
  input CreateEventInput {
    name: String!
    description: String
    locationId: ID!
    sportId: ID!
    start: DateTime!
    end: DateTime!
    free: Boolean!
    repetition: Repetition!
    price: Float!
  }
  extend type Mutation {
    createEvent(event: CreateEventInput): String
  }
`;

interface Args {
  event: {
    name: string
    description: string
    locationId: string | number
    sportId: string | number
    price: number
    repetition: string
    free: boolean
    start: number
    end: number
  }
}

export const resolvers = {
  Mutation: {
    createEvent: async (_obj: null, args: Args, { authService }: Context) => {
      const authorizedUser = await authService.getAuthorizedUserOrFail();
      return await createEvent(args.event, authorizedUser);
    }
  }
};

export default {
  typeDefs,
  resolvers,
};