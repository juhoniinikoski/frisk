import { ApolloError, gql } from 'apollo-server';
import * as yup from 'yup';
import { createEvent } from '../../../operations/eventOperations';


export const typeDefs = gql`
  input CreateEventInput {
    name: String!
    description: String
    locationId: ID!
    sportId: ID!
    start: Int!
    end: Int!
    free: Boolean!
    repetition: Repetition!
    price: Float!
  }
  extend type Mutation {
    createEvent(event: CreateEventInput): Boolean
  }
`;

const argsSchema = yup.object().shape({
  event: yup.object().shape({
    name: yup
      .string()
      .max(200)
      .trim(),
  }),
});

interface Args {
  event: {
    name: string
    description: string
    locationId: string | number
    sportId: string | number
    price: number
    repetition: string
    free: boolean
    start: number
    end: number
  }
}

interface User {
  id?: string
}

const authorizedUser = {
  username: "juhoniinikoski",
  id: "bbe42984-051b-4a01-b45d-b8d29c32200c"
};

export const resolvers = {
  Mutation: {
    createEvent: async (_obj: null, args: Args) => await createEvent(args.event)
  }
};

export default {
  typeDefs,
  resolvers,
};