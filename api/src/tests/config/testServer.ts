import { ApolloServer } from 'apollo-server';
import schema from '../../graphql/schema';
import AuthService from '../../services/authentication/authService';

const testServer = new ApolloServer({ 
  schema,
  context: () => {
    return {
      authService: new AuthService({ accessToken: process.env.TEST_TOKEN }),
    };
  },
});

export default testServer