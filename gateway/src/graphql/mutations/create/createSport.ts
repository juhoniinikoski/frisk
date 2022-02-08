import { gql } from 'apollo-server';
import { createSport } from '../../../operations/sportOperations';

export const typeDefs = gql`
  input CreateSportInput {
    name: String!
  }
  extend type Mutation {
    createSport(sport: CreateSportInput): String
  }
`;

interface Args {
  sport: {
    name: string
  }
}

export const resolvers = {
  Mutation: {
    createSport: async (_obj: null, args: Args) => await createSport(args.sport)
  }
};

export default {
  typeDefs,
  resolvers,
};