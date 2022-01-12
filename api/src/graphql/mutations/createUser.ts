import { gql, ApolloError } from 'apollo-server'
import * as yup from 'yup'
import { v4 as uuid } from 'uuid'
import bcrypt from 'bcrypt'
import User from '../../models/User'

export const typeDefs = gql`
  input CreateUserInput {
    username: String!
    password: String!
  }
  extend type Mutation {
    """
    Creates a new user, if the provided username does not already exist.
    """
    createUser(user: CreateUserInput): User
  }
`

interface Properties {
  username: string
}

class UsernameTakenError extends ApolloError {
  constructor(message: string, properties: Properties) {
    console.log(properties)
    super(message, 'USERNAME_TAKEN', properties)
  }

  static fromUsername(username: string) {
    return new UsernameTakenError(
      `Username ${username} is already taken. Choose another username`,
      { username },
    )
  }
}

const argsSchema = yup.object().shape({
  user: yup.object().shape({
    username: yup.string().min(1).max(30).lowercase().trim(),
    password: yup.string().min(5).max(50).trim(),
  }),
})

const createPasswordHash = (password: string) => bcrypt.hash(password, 10)

export const resolvers = {
  Mutation: {
    createUser: async (_obj: any, args: any) => {
      const {
        user: { password, username, ...user },
      } = await argsSchema.validate(args, {
        stripUnknown: true,
      })

      const passwordHash = await createPasswordHash(password)

      const existingUser = await User.query().findOne({
        username,
      })

      if (existingUser) {
        throw UsernameTakenError.fromUsername(username)
      }

      return User.query().insertAndFetch({
        ...user,
        username,
        password: passwordHash,
        id: uuid(),
      })
    },
  },
}

export default {
  typeDefs,
  resolvers,
}