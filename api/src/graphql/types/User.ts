import { gql } from 'apollo-server'
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
    followed: async ({ id }: Args, args: FollowedArgs) => 
      await User.relatedQuery('following').for(id).cursorPaginate({
        orderBy: [{ column: 'createdAt', order: 'desc' }, 'id'],
          first: args.first,
          after: args.after
      }),

    upcoming: async ({ id }: Args, args: FollowedArgs) => 
      await User.relatedQuery('events').for(id).cursorPaginate({
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