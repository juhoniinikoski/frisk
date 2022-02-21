import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { useHeaderHeight } from '@react-navigation/elements';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    justifyContent: 'center',
    display: 'flex',
  },
});

const Layout: FunctionComponent = ({ children }) => {
  const headerHeight = useHeaderHeight();

  return (
    <View style={{ ...styles.container, marginTop: headerHeight }}>
      {children}
    </View>
  );
};

export default Layout;
