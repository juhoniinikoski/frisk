import { gql } from 'apollo-server';

export const typeDefs = gql`
  input AuthorizeInput {
    username: String!
    password: String!
  }
  type AuthorizationPayload {
    user: User!
    accessToken: String!
    expiresAt: DateTime!
  }
  extend type Mutation {
    """
    Generates a new access token, if provided credentials (username and password) match any registered user.
    """
    authorize(credentials: AuthorizeInput): AuthorizationPayload
  }
`;

// const argsSchema = yup.object().shape({
//   credentials: yup.object().shape({
//     username: yup
//       .string()
//       .required()
//       .lowercase()
//       .trim(),
//     password: yup
//       .string()
//       .required()
//       .trim(),
//   }),
// });

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};