import { gql } from 'apollo-server';


export const typeDefs = gql`
type Activity {
  id: ID!
  name: String!
  locations(first: Int after: String): [Location]!
  events(first: Int after: String): [Event]!
}
`;

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};