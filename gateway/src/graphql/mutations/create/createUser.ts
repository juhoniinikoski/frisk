import { gql, ApolloError } from 'apollo-server';

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
    createUser(user: CreateUserInput): User
  }
`;

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};