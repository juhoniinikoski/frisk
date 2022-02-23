import { StyleSheet, Pressable, ViewStyle } from 'react-native';
import * as React from 'react';

const styles = StyleSheet.create({
  filterButton: {
    height: 38,
    width: 38,
    backgroundColor: '#f1f2f4',
    borderRadius: 50,
    shadowColor: 'rgba(228, 218, 207, 0.4)',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1.0,
  },
});

interface Props {
  style?: ViewStyle | ViewStyle[];
}

const FilterButton = ({style}: Props) => {
  return <Pressable style={[styles.filterButton, style]} />;
};

export default FilterButton;
