import { gql } from 'apollo-server';
import * as yup from 'yup';

export const typeDefs = gql`
  input CreateEventInput {
    eventTitle: String!
    description: String
    locationId: ID!
    sportId: ID!
    start: Int!
    end: Int!
  }
  extend type Mutation {
    createEvent(event: CreateEventInput): Boolean
  }
`;

// const argsSchema = yup.object().shape({
//   event: yup.object().shape({
//     eventTitle: yup
//       .string()
//       .max(200)
//       .trim(),
//   }),
// });

// interface Args {
//   event: {
//     eventTitle: string
//     description: string
//     locationId: string | number
//     sportId: string | number
//     start: number
//     end: number
//   }
// }

// interface User {
//   id?: string
// }

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};