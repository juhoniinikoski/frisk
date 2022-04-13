import { gql } from 'apollo-server';


export const typeDefs = gql`
type Address {
  id: ID!
  lat: Float!
  lon: Float!
  zipcode: String
  country: String
  street: String!
  city: String!
  locations(first: Int after: String): [Location]
}
`;

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};