import { gql } from 'apollo-server'
import Event from '../../models/Event'
import { loaders } from '../../services/loaders/dataloaders'

export const typeDefs = gql`
type Location {
  id: ID!
  name: String!
  description: String
  events(first: Int, after: String): EventConnection!
  sports: [Sport]
  address: Address
}
`
interface Args {
  id?: string | number
  locationId?: string | number
  sportId?: string[] | number[] | any
}

interface EventArgs {
  first: number
  after?: string
}

export const resolvers = {
  Location: {
    sports: async ({ sportId }: Args, _args: Args) => await loaders.sports.load(sportId.split(",")),
    events: async ({ id }: Args, args: EventArgs) => {
      return Event.query()
        .where({ locationId: id })
        .cursorPaginate({
          orderBy: [{ column: 'createdAt', order: 'desc' }, 'id'],
          first: args.first,
          after: args.after
        })
    }
  },
}

export default {
  typeDefs,
  resolvers,
}