import { gql } from 'apollo-server';
import { Location } from '../../models/Location';

export const typeDefs = gql`
type Location {
  id: ID!
  name: String!
  description: String
  events(first: Int, after: String): [Event]!
  sports: [Sport]!
  address: Address
}
`;

interface Args {
  id: string | number
  locationId: string | number
}

export const resolvers = {
  Location: {
    sports: async ({ id }: Args) => await Location.relatedQuery('sports').for(id),
    events: async ({ id }: Args) => await Location.relatedQuery('events').for(id)
  },
};

export default {
  typeDefs,
  resolvers,
};