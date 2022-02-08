import { gql } from 'apollo-server';
import { updateUser } from '../../../operations/userOperations';

export const typeDefs = gql`
  input UpdateUserInput {
    id: ID
    username: String
    email: String
  }
  extend type Mutation {
    """
    Creates a new user, if the provided username does not already exist.
    """
    updateUser(id: ID!, data: UpdateSportInput): String
  }
`;

interface Args {
  id: string | number
  data: {
    username: string
    email: string
    id: string | number
  }
}

export const resolvers = {
  Mutation: {
    updateUser: async (_obj: null, args: Args) => await updateUser(args.id, args.data)
  }
};

export default {
  typeDefs,
  resolvers,
};