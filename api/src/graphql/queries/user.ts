import { gql } from 'apollo-server';
import { User } from '../../models/User';
import { User as UserType, Event as EventType } from '../../entities';
import { Event } from '../../models/Event';

export const typeDefs = gql`
  extend type Query {
    """
    Returns an user by an id.
    """
    user(id: ID!): User
  }
`;

interface Args {
  id: number | string
}

export const resolvers = {
  Query: {
    user: async (_obj: null, args: Args) =>
      await User.query().findById(args.id).withGraphFetched('[followedUsers, savedEvents, savedLocations, savedSports]')
  },
  User: {
    savedEvents: async (user: UserType) => {
      const ids = user.savedEvents.map((saved: EventType) => saved.id);
      return await Event.query().findByIds(ids).withGraphFetched('[createdBy, location, sport]');
    }
  }
};

export default {
  typeDefs,
  resolvers,
};