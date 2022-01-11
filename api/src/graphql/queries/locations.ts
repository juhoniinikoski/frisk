import { gql } from 'apollo-server'
import { Model } from 'objection';
import * as yup from 'yup'
import { BaseQueryBuilder } from '../../models/BaseModel';
import Location from '../../models/Location'

export const typeDefs = gql`
  extend type Query {
    """
    Returns paginated locations.
    """
    locations(
      first: Int
      after: String
      searchKeyword: String
    ): LocationConnection!
  }
`;

const getLikeFilter = (value: string) => `%${value}%`

const argsSchema = yup.object({
  after: yup.string(),
  first: yup.number().min(1).max(30).default(30),
  searchKeyword: yup.string().trim(),
})

interface Args {
  first: number
  after: string
  searchKeyword: string
}

export const resolvers = {
  Query: {
    locations: async (_obj: any, args: Args) => {
      const { first, after, searchKeyword } = await argsSchema.validate(args)

      let query: BaseQueryBuilder<Model, Model[]> = Location.query()

      if (searchKeyword) {
        const likeFilter = getLikeFilter(searchKeyword)

        query = query.where((qb: BaseQueryBuilder<Model, Model[]>) => {
          return qb.where('locationTitle', 'like', likeFilter)
        })
      }

      return query.cursorPaginate({
        orderBy: [{ column: 'createdAt', order: 'desc' }, 'id'],
        first,
        after,
      })
    },
  },
}

export default {
  typeDefs,
  resolvers,
}