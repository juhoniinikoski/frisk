import { gql } from 'apollo-server';
import { createUser } from '../../../operations/userOperations';

export const typeDefs = gql`
  input CreateUserInput {
    username: String!
    password: String!
    email: String!
  }
  extend type Mutation {
    """
    Creates a new user, if the provided username does not already exist.
    """
    createUser(user: CreateUserInput): String
  }
`;

interface Args {
  user: {
    username: string
    password: string
    email: string
  }
}

export const resolvers = {
  Mutation: {
    createUser: async (_obj: null, args: Args) => await createUser(args.user)
  }
};

export default {
  typeDefs,
  resolvers,
};