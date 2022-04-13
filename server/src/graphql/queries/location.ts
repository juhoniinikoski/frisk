import { gql } from 'apollo-server';
import { getLocation } from '../../services/location/locationService';

export const typeDefs = gql`
  extend type Query {
    """
    Returns a location by an id.
    """
    location(id: ID!): Location
  }
`;

interface Args {
  id: number | string
}

export const resolvers = {
  Query: {
    location: async (_obj: null, args: Args) => await getLocation(args.id)
  }
};

export default {
  typeDefs,
  resolvers,
};