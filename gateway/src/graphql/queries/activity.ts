import { gql } from 'apollo-server';
import { Activity } from '../../entities';
import { getEvents } from '../../operations/eventOperations';
import { getLocations } from '../../operations/locationOperations';
import { getActivity } from '../../operations/activityOperations';

export const typeDefs = gql`
  extend type Query {
    """
    Returns a activity by an id.
    """
    activity(id: ID!): Activity
  }
`;

interface Args {
  id: number | string
}

export const resolvers = {
  Query: {
    activity: async (_obj: null, args: Args) => await getActivity(args.id)
  },
  Activity: {
    events: async (obj: Activity) => await getEvents({ activity: obj.id }),
    locations: async (obj: Activity) => await getLocations({ activity: obj.id }),
  }
};

export default {
  typeDefs,
  resolvers,
};