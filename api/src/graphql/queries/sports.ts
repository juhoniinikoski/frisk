import { gql } from 'apollo-server'
import * as yup from 'yup'
import Sport from '../../models/Sport'

export const typeDefs = gql`
  extend type Query {
    """
    Returns paginated users.
    """
    sports(
      first: Int
      after: String
      searchKeyword: String
    ): SportConnection!
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
    sports: async (_obj: any, args: Args) => {
      const { first, after, searchKeyword } = await argsSchema.validate(args)

      let query: any = Sport.query()

      if (searchKeyword) {
        const likeFilter = getLikeFilter(searchKeyword)

        query = query.where((qb: any) => {
          return qb.where('name', 'like', likeFilter)
        })
      }

      return query.cursorPaginate({
        orderBy: [{ column: 'name', order: 'asc' }, 'id'],
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