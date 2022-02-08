import { gql } from 'apollo-server';

export const typeDefs = gql`
type Address {
  street: String!
  zipcode: String
  city: String!
  country: String
}
`;

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};