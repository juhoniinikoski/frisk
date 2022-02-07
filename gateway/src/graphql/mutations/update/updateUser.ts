import { gql } from 'apollo-server';

export const typeDefs = gql`
  input UpdateUserInput {
    id: ID!
    username: String!
    email: String!
  }
  extend type Mutation {
    """
    Creates a new user, if the provided username does not already exist.
    """
    updateUser(user: UpdateUserInput): Boolean
  }
`;

// interface Properties {
//   username?: string
//   email?: string
// }

// interface Args {
//   user: {
//     username: string
//     email: string
//     id: string | number
//   }
// }

// interface User {
//   id?: string | number
//   username?: string
//   email?: string
// }

// class UsernameTakenError extends ApolloError {
//   constructor(message: string, properties: Properties) {
//     super(message, 'USERNAME_TAKEN', properties);
//   }

//   static fromUsername(username: string) {
//     return new UsernameTakenError(
//       `Username ${username} is already taken. Choose another username`,
//       { username },
//     );
//   }
// }

// class EmailTakenError extends ApolloError {
//   constructor(message: string, properties: Properties) {
//     super(message, 'EMAIL_TAKEN', properties);
//   }

//   static fromEmail(email: string) {
//     return new EmailTakenError(
//       `Email ${email} is already taken.`,
//       { email },
//     );
//   }
// }

// const argsSchema = yup.object().shape({
//   user: yup.object().shape({
//     username: yup.string().min(1).max(30).lowercase().trim()
//   }),
// });

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};