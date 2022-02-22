import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Events from '../pages/events/Events';
import { Event } from '../entities';
import EventDetail from '../pages/events/EventDetail';

const Stack = createNativeStackNavigator();

const EventStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        title: '',
      }}
    >
      <Stack.Screen name="Events" component={Events} />
      <Stack.Screen name="EventDetail" component={EventDetail} />
    </Stack.Navigator>
  );
};

export type EventsStackParamList = {
  Events: undefined;
  EventDetail: { eventId: string };
};

export default EventStack;
