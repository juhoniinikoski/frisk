import { StyleSheet, Pressable } from 'react-native';
import * as React from 'react';

const styles = StyleSheet.create({
  filterButton: {
    height: 42,
    width: 42,
    backgroundColor: 'white',
    borderRadius: 50,
    shadowColor: 'rgba(228, 218, 207, 0.4)',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1.0,
  },
});

const FilterButton = () => {
  return <Pressable style={styles.filterButton} />;
};

export default FilterButton;
