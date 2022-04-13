import { gql } from 'apollo-server';

export const typeDefs = gql`
  type ActivityEdge {
    cursor: String!
    node: Activity!
  }
  type ActivityConnection {
    totalCount: Int!
    pageInfo: PageInfo!
    edges: [ActivityEdge!]!
  }
`;

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};