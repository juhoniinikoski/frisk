import { gql } from 'apollo-server';
import { updateEvent } from '../../../operations/eventOperations';


export const typeDefs = gql`
  input UpdateEventInput {
    name: String
    description: String
    locationId: ID
    sportId: ID
    start: DateTime
    end: DateTime
    free: Boolean
    repetition: Repetition
    price: Float
  }
  extend type Mutation {
    updateEvent(id: ID!, data: UpdateEventInput): String
  }
`;

interface Args {
  id: string | number
  data: {
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

export const resolvers = {
  Mutation: {
    updateEvent: async (_obj: null, args: Args) => await updateEvent(args.id, args.data)
  }
};

export default {
  typeDefs,
  resolvers,
};