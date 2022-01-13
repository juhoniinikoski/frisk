import { gql } from 'apollo-server'
import * as yup from 'yup'
import { User } from '../../models/User'

export const typeDefs = gql`
  extend type Query {
    """
    Returns paginated users.
    """
    users(first: Int, after: String): [User]!
  }
`

const argsSchema = yup.object({
  after: yup.string(),
  first: yup
    .number()
    .min(1)
    .max(30)
    .default(30),
})

interface Args {
  first: number
  after: string
}

export const resolvers = {
  Query: {
    users: async (_obj: any, args: Args) => {

      const { first, after } = await argsSchema.validate(args)

      return User.query().cursorPaginate({
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