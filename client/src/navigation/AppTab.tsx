import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EventStack from './EventStack';
import LocationStack from './LocationStack';
import SearchStack from './SearchStack';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

const AppTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="EventStack" component={EventStack} />
      <Tab.Screen name="LocationStack" component={LocationStack} />
      <Tab.Screen name="SearchStack" component={SearchStack} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default AppTab;
