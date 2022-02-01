import { gql } from 'apollo-server';

export const typeDefs = gql`
  input AddSportInput {
    sportId: ID!
    locationId: ID!
  }
  extend type Mutation {
    addSport(add: AddSportInput): Boolean
  }
`;  

interface Args {
  add: {
    locationId: string | number
    sportId: string | number
  }
}

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};