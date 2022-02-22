import { StyleSheet } from 'react-native';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    display: 'flex',
    flex: 1,
  },
});

const Layout: FunctionComponent = ({ children }) => {

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={{ ...styles.container }}
    >
      {children}
    </SafeAreaView>
  );
};

export default Layout;
