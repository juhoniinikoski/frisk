import { gql } from 'apollo-server';

export const typeDefs = gql`
  input CreateSportInput {
    name: String!
    locations: [String]
  }
  extend type Mutation {
    createSport(sport: CreateSportInput): Boolean
  }
`;

// const argsSchema = yup.object().shape({
//   sport: yup.object().shape({
//     name: yup
//       .string()
//       .max(200)
//       .trim(),
//   }),
// });

// interface Args {
//   sport: {
//     name: string
//     locations: string[]
//   }
// }

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};