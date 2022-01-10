import { gql } from 'apollo-server'
import Location from '../../models/Location'

export const typeDefs = gql`
type Sport {
  id: ID!
  name: String!
  locations(first: Int after: String): LocationConnection!
  events: EventConnection!
}
`

interface Args {
  id: string | number
}

interface LocationArgs {
  first?: number
  after?: string
}

export const resolvers = {
  // Sport: {
  //   locations: async ({id}: Args, args: LocationArgs) => {
  //     const result = await Location.query().whereJsonIsArray('sportId')
  //     console.log(result)
  //   }
  // }
}

export default {
  typeDefs,
  resolvers,
}