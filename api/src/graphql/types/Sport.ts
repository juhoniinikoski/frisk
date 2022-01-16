import { gql } from 'apollo-server';
import Location from '../../models/Location';
import { Event } from '../../models/Event';


export const typeDefs = gql`
type Sport {
  id: ID!
  name: String!
  locations(first: Int after: String): [Location]!
  events(first: Int after: String): [Event]!
}
`;

interface Args {
  id: string
}

interface LocationArgs {
  first?: number
  after?: string
}

type EventArgs = LocationArgs;

export const resolvers = {
  Sport: {
    locations: async ({ id }: Args, args: LocationArgs) => 
      await Location.query().where('sportId', '@>', [id])
        .cursorPaginate({
          orderBy: [{ column: 'createdAt', order: 'desc' }, 'id'],
          first: args.first,
          after: args.after
        }),
    events: async ({ id }: Args, args: EventArgs) => 
      await Event.query().where({sportId: id})
        .cursorPaginate({
          orderBy: [{ column: 'createdAt', order: 'desc' }, 'id'],
          first: args.first,
          after: args.after
        }),
  }
};

export default {
  typeDefs,
  resolvers,
};