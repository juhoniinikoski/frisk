import { gql } from 'apollo-server';
import { deleteLocation } from '../../../operations/locationOperations';

export const typeDefs = gql`
  extend type Mutation {
    """
    Deletes the location which has the given id, if it is created by the authorized user.
    """
    deleteLocation(id: ID!): Boolean
  }
`;


interface Args {
  id: string | number
}

export const resolvers = {
  Mutation: {
    deleteLocation: async (_obj: null, args: Args) => await deleteLocation(args.id)
  }
};

export default {
  typeDefs,
  resolvers,
};