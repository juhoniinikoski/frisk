import { gql } from 'apollo-server';
import { createLocation } from '../../../operations/locationOperations';

export const typeDefs = gql`
  input CreateLocationInput {
    name: String!
    description: String
    street: String!
    zipcode: String
    city: String!
    country: String
  }
  extend type Mutation {
    createLocation(location: CreateLocationInput): String
  }
`;

interface Args {
  location: {
    name: string
    description: string
    street: string
    zipcode: string
    city: string
    country: string
  }
}

export const resolvers = {
  Mutation: {
    createLocation: async (_obj: null, args: Args) => await createLocation(args.location)
  }
};

export default {
  typeDefs,
  resolvers,
};