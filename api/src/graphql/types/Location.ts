import { gql } from 'apollo-server'
import { Location } from '../../models/Location'
import { loaders } from '../../services/loaders/dataloaders'

export const typeDefs = gql`
type Location {
  id: ID!
  name: String!
  description: String
  events(first: Int, after: String): [Event]!
  sports: [Sport]!
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
    sports: async ({ id }: Args) => await Location.relatedQuery('sports').for(id),
    events: async ({ id }: Args) => await Location.relatedQuery('events').for(id)
  },
}

export default {
  typeDefs,
  resolvers,
}