import { gql } from 'apollo-server'
import DataLoader from 'dataloader'
import Sport from '../../models/Sport'
import { loaders } from '../../services/loaders/dataloaders'

export const typeDefs = gql`
type Location {
  id: ID!
  name: String!
  description: String
  events: EventConnection!
  sports: [Sport]
  address: Address
}
`
interface Args {
  userId?: string | number
  locationId?: string | number
  sportId?: string[] | number[] | any
}

export const resolvers = {
  Location: {
    sports: async ({ sportId }: Args, _args: Args) => await loaders.sports.load(sportId.split(","))
  },
}

export default {
  typeDefs,
  resolvers,
}