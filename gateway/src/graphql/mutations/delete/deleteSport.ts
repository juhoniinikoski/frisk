import { gql } from 'apollo-server';
import { deleteSport } from '../../../operations/sportOperations';

export const typeDefs = gql`
  extend type Mutation {
    """
    Deletes the sport which has the given id, if it is created by the authorized user.
    """
    deleteSport(id: ID!): Boolean
  }
`;


interface Args {
  id: string | number
}

export const resolvers = {
  Mutation: {
    deleteSport: async (_obj: null, args: Args) => await deleteSport(args.id)
  }
};

export default {
  typeDefs,
  resolvers,
};