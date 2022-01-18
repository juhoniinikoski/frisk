import { gql } from 'apollo-server';
import { Event } from '../../models/Event';

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
    event: async (_obj: null, args: Args) => 
      await Event.query().findById(args.id).withGraphFetched('[attendants, sport, location, createdBy]')
  },
};

export default {
  typeDefs,
  resolvers,
};