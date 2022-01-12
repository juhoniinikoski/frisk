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
  id: string
}

interface LocationArgs {
  first?: number
  after?: string
}

export const resolvers = {
  Sport: {
    locations: async ({ id }: Args, args: LocationArgs) => 
      await Location.query().where('sportId', '@>', [id])
        .cursorPaginate({
          orderBy: [{ column: 'createdAt', order: 'desc' }, 'id'],
          first: args.first,
          after: args.after
        })
  }
}

export default {
  typeDefs,
  resolvers,
}