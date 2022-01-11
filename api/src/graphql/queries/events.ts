import { gql } from 'apollo-server'
import { Model } from 'objection'
import * as yup from 'yup'
import { BaseQueryBuilder } from '../../models/BaseModel'
import Event from '../../models/Event'

export const typeDefs = gql`
  extend type Query {
    """
    Returns paginated users.
    """
    events(
      first: Int
      after: String
      searchKeyword: String
    ): EventConnection!
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
    events: async (_obj: any, args: Args) => {

      const { first, after, searchKeyword } = await argsSchema.validate(args)

      let query: BaseQueryBuilder<Model, Model[]> = Event.query()

      if (searchKeyword) {
        const likeFilter = getLikeFilter(searchKeyword)

        query = query.where((qb: BaseQueryBuilder<Model, Model[]>) => {
          return qb.where('eventTitle', 'like', likeFilter)
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