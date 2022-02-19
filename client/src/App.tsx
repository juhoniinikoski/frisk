import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from './contexts/auth';
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
    <View style={styles.container}>
      <AuthProvider>
        <ApolloProvider client={apolloClient}>
          <Text>Testi</Text>
        </ApolloProvider>
      </AuthProvider>
    </View>
  );
};

export default App;
