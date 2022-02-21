import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EventStack from './EventStack';
import LocationStack from './LocationStack';
import SearchStack from './SearchStack';
import ProfileStack from './ProfileStack';
import { textContentFI } from '../content/textContent';

const Tab = createBottomTabNavigator();

const { events, locations, search, profile } = textContentFI.tabNav;

const AppTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="EventStack"
        component={EventStack}
        options={{ title: events }}
      />
      <Tab.Screen
        name="LocationStack"
        component={LocationStack}
        options={{ title: locations }}
      />
      <Tab.Screen
        name="SearchStack"
        component={SearchStack}
        options={{ title: search }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{ title: profile }}
      />
    </Tab.Navigator>
  );
};

export default AppTab;
