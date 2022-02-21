import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Locations from '../pages/locations/Locations';

const Stack = createNativeStackNavigator();

const LocationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Locations" component={Locations} />
    </Stack.Navigator>
  );
};

export default LocationStack;
