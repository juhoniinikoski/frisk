import { gql } from 'apollo-server';

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

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};