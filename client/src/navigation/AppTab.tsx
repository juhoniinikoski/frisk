import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EventStack from './EventStack';
import LocationStack from './LocationStack';
import SearchStack from './SearchStack';
import ProfileStack from './ProfileStack';
import { textContentFI } from '../content/textContent';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

const { events, locations, search, profile } = textContentFI.tabNav;

const PlaceHolderIcon = () => {
  return (
    <View style={{height: 28, width: 28, backgroundColor: '#f1f2f4', borderRadius: 50}}></View>
  )
}

const AppTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarIcon: () => <PlaceHolderIcon />
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
