import { gql } from 'apollo-server';
import LocationClass from '../../models/Location';

export const typeDefs = gql`
type Location {
  id: ID!
  name: String!
  description: String
  events(first: Int, after: String): [Event]!
  activities: [Activity]!
  createdById: String!
  address: Address
}
`;

export const resolvers = {
  Location: {
    address: (obj: LocationClass) => {
      return {
        street: obj.street,
        zipcode: obj.zipcode,
        city: obj.city,
        country: obj.country
      };
    },
  }
};

export default {
  typeDefs,
  resolvers,
};