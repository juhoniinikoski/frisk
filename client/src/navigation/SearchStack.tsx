import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from '../pages/search/Search';

const Stack = createNativeStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};

export default SearchStack;
