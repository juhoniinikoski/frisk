import { ApolloProvider } from '@apollo/client';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { AuthProvider } from './contexts/auth';
import Router from './navigation/Router';
import apolloClient from './utils/apolloClient';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const App = () => {
  return (
    <AuthProvider>
      <ApolloProvider client={apolloClient}>
        <Router />
      </ApolloProvider>
    </AuthProvider>
  );
};

export default App;
