import { gql } from 'apollo-server';
import { deleteEvent } from '../../../operations/eventOperations';

export const typeDefs = gql`
  extend type Mutation {
    """
    Deletes the event which has the given id, if it is created by the authorized user.
    """
    deleteEvent(id: ID!): Boolean
  }
`;

interface Args {
  id: string | number
}

export const resolvers = {
  Mutation: {
    deleteEvent: async (_obj: null, args: Args) => await deleteEvent(args.id)
  }
};

export default {
  typeDefs,
  resolvers,
};