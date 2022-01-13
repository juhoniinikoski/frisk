import { gql } from 'apollo-server'
import DataLoader from 'dataloader'
import { loaders } from '../../services/loaders/dataloaders'
import { Event } from '../../models/Event'

export const typeDefs = gql`
type Event {
  id: ID!
  eventTitle: String!
  description: String
  location: Location!
  sport: Sport!
  attendants: [User]!
  free: Boolean!
  price: Float!
  createdBy: User!
  createdAt: DateTime!
  start: DateTime!
  end: DateTime!
  repetition: Repetition!
}
`

interface Args {
  userId?: string | number
  locationId?: string | number
  sportId?: any
  id?: string
  first?: number
  after?: string
}

interface Loader {
  dataLoaders: {
    userLoader?: DataLoader<number | string, any[]>
    locationLoader?: DataLoader<number | string, any[]>
    sportLoader?: DataLoader<number | string, any[]>
  }
}

export const resolvers = {
  Event: {
    createdBy: async ({ userId }: Args, _args: Args) => await loaders.user.load(userId),
    location: async ({ locationId }: Args, _args: Args) => await loaders.location.load(locationId),
    sport: async ({ sportId }: Args, _args: Args) => await loaders.sport.load(sportId),
    attendants: async ({ id }: Args) => await Event.relatedQuery('attendants').for(id)
  },
}

export default {
  typeDefs,
  resolvers,
}