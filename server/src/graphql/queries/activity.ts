import { gql } from 'apollo-server';
import { getActivity } from '../../services/activity/activityService';

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
};

export default {
  typeDefs,
  resolvers,
};