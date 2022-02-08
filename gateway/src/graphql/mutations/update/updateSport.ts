import { gql } from 'apollo-server';
import { updateSport } from '../../../operations/sportOperations';


export const typeDefs = gql`
  input UpdateSportInput {
    name: String
  }
  extend type Mutation {
    updateSport(id: ID!, data: UpdateSportInput): String
  }
`;

interface Args {
  id: string | number
  data: {
    name: string
  }
}

export const resolvers = {
  Mutation: {
    updateSport: async (_obj: null, args: Args) => await updateSport(args.id, args.data)
  }
};

export default {
  typeDefs,
  resolvers,
};