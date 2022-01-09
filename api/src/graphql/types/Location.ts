import { gql } from 'apollo-server'
import DataLoader from 'dataloader'
import Sport from '../../models/Sport'
import { loaders } from '../../services/loaders/newDataloaders'

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

interface Loader {
  dataLoaders: {
    userLoader?: DataLoader<number | string, any[]>
    locationLoader?: DataLoader<number | string, any[]>
    sportLoader?: DataLoader<number[] | string[], any[]>
  }
}

export const resolvers = {
  Location: {
    // sports: async ({ sportId }: Args, _args: Args, { dataLoaders: { sportLoader } }: Loader) => {
    //   const ids = sportId.split(",")
    //   const test = await sportLoader.load(ids)
    //   console.log(test)
    //   return await Sport.query().findByIds(ids)
    // }
    sports: async ({ sportId }: Args, _args: Args) => await loaders.sport.load(sportId)
  },
}

export default {
  typeDefs,
  resolvers,
}