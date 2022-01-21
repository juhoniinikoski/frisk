import { gql, ApolloError } from 'apollo-server';
import * as yup from 'yup';
import { Context } from '../../../entities';
import { User } from '../../../models/User';

export const typeDefs = gql`
  input UpdateUserInput {
    id: ID!
    username: String!
    email: String!
  }
  extend type Mutation {
    """
    Creates a new user, if the provided username does not already exist.
    """
    updateUser(user: UpdateUserInput): Boolean
  }
`;

interface Properties {
  username?: string
  email?: string
}

interface Args {
  user: {
    username: string
    email: string
    id: string | number
  }
}

interface User {
  id?: string | number
  username?: string
  email?: string
}

class UsernameTakenError extends ApolloError {
  constructor(message: string, properties: Properties) {
    super(message, 'USERNAME_TAKEN', properties);
  }

  static fromUsername(username: string) {
    return new UsernameTakenError(
      `Username ${username} is already taken. Choose another username`,
      { username },
    );
  }
}

class EmailTakenError extends ApolloError {
  constructor(message: string, properties: Properties) {
    super(message, 'EMAIL_TAKEN', properties);
  }

  static fromEmail(email: string) {
    return new EmailTakenError(
      `Email ${email} is already taken.`,
      { email },
    );
  }
}

const argsSchema = yup.object().shape({
  user: yup.object().shape({
    username: yup.string().min(1).max(30).lowercase().trim()
  }),
});

export const resolvers = {
  Mutation: {
    updateUser: async (_obj: null, args: Args, { authService }: Context) => {
      const {
        user: { username },
      } = await argsSchema.validate(args, {
        stripUnknown: true,
      });

      const authorizedUser: User = await authService.getAuthorizedUserOrFail();

      const existingUsername = await User.query().findOne({
        username,
      });

      const existingEmail = await User.query().findOne({
        email: args.user.email,
      });

      if (existingUsername && existingUsername.id !== authorizedUser.id) {
        throw UsernameTakenError.fromUsername(username);
      }

      if (existingEmail && existingEmail.id !== authorizedUser.id) {
        throw EmailTakenError.fromEmail(args.user.email);
      }

      await User.query().patchAndFetchById(args.user.id, {
        username,
        email: args.user.email
      });

      return true;
    },
  },
};

export default {
  typeDefs,
  resolvers,
};