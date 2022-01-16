import { gql } from 'apollo-server';

export const typeDefs = gql`
  type SportEdge {
    cursor: String!
    node: Sport!
  }
  type SportConnection {
    totalCount: Int!
    pageInfo: PageInfo!
    edges: [SportEdge!]!
  }
`;

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};