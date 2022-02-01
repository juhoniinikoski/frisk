import { gql } from 'apollo-server';

export const typeDefs = gql`
  input CreateLocationInput {
    name: String!
    description: String
    sports: [String]
  }
  extend type Mutation {
    createLocation(location: CreateLocationInput): Boolean
  }
`;

// const argsSchema = yup.object().shape({
//   location: yup.object().shape({
//     name: yup
//       .string()
//       .max(200)
//       .trim(),
//   }),
// });

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};