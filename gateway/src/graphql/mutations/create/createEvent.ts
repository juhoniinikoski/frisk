import { ApolloError, gql } from 'apollo-server';
import * as yup from 'yup';
// import { createEvent } from '../../../operations/event/eventOperations';


export const typeDefs = gql`
  input CreateEventInput {
    name: String!
    description: String
    locationId: ID!
    locationName: String
    sportId: ID!
    sportName: String
    start: Int!
    end: Int!
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
  // Mutation: {
  //   createEvent: async (_obj: null, args: Args) => {

  //     const { event } = args;
  //     const res = createEvent(event)

  //     return true;

  //   }
  // }
};

export default {
  typeDefs,
  resolvers,
};