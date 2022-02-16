import { gql } from 'apollo-server';
import { Location } from '../../entities';

export const typeDefs = gql`
type Location {
  id: ID!
  name: String!
  description: String
  events(first: Int, after: String): [Event]!
  activities: [Activity]!
  city: String!
  createdById: String!
  latitude: Float!
  longitude: Float!
  zipcode: String
  country: String
  street: String!
  address: Address
}
`;

export const resolvers = {
  Location: {
    address: (obj: Location) => {
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