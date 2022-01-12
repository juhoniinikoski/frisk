import { gql } from 'apollo-server'
import FollowedUsers from '../../models/FollowedUsers'
import User from '../../models/User'

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: DateTime!
    upcoming(first: Int, after: String): EventConnection!
    followed(first: Int, after: String): UserConnection!
    favorites(first: Int, after: String): SportConnection!
    saved(first: Int, after: String): EventConnection!
  }
`

interface Args {
  id: string
}

interface FollowedArgs {
  first: number
  after: string
}

export const resolvers = {
  User: {
    followed: async ({ id }: Args, args: FollowedArgs) => {

      const ids = await FollowedUsers.query()
        .where({followerId: id})
        .select('followingId')
        .then(items => items.map((it: any) => it.followingId))

      return await User.query().findByIds(ids).cursorPaginate({
        orderBy: [{ column: 'createdAt', order: 'desc' }, 'id'],
          first: args.first,
          after: args.after
      })
    }
  }
}

export default {
  typeDefs,
  resolvers,
}