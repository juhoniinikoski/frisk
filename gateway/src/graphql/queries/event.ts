import { gql } from 'apollo-server';
import { getEvent } from '../../operations/eventOperations';

export const typeDefs = gql`
  extend type Query {
    """
    Returns an event by an id.
    """
    event(id: ID!): Event
  }
`;

interface Args {
  id: number | string
}


export const resolvers = {
  Query: {
    event: async (_obj: null, args: Args) => await getEvent(args.id)
  },
};

export default {
  typeDefs,
  resolvers,
};