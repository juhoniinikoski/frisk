import { ApolloProvider } from '@apollo/client';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { AuthProvider } from './contexts/auth';
import Router from './navigation/Router';
import apolloClient from './utils/apolloClient';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
  },
});

const App = () => {
  return (
    <View style={styles.container}>
      <AuthProvider>
        <ApolloProvider client={apolloClient}>
          <Router />
        </ApolloProvider>
      </AuthProvider>
    </View>
  );
};

export default App;
