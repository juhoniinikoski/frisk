import { gql } from 'apollo-server';
import { Event } from '../../entities';
import { getActivity } from '../../operations/activityOperations';
import { getEvent } from '../../operations/eventOperations';
import { getLocation } from '../../operations/locationOperations';

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
  Event: {
    location: async (obj: Event) => await getLocation(obj.locationId)
  }
};

export default {
  typeDefs,
  resolvers,
};