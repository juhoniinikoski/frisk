import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Events from '../pages/events/Events';
import { Event } from '../entities';
import EventDetail from '../pages/events/EventDetail';
import { Text, View, StyleSheet } from 'react-native';
import HeaderText from '../components/common/HeaderText';
import FilterButton from '../components/common/FilterButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingBottom: 8,
    paddingHorizontal: 16
  }
})

const Header = () => {

  const insets = useSafeAreaInsets();
  return (
    <View style={{...styles.header, paddingTop: insets.top}}>
      <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
        <FilterButton />
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <HeaderText textType='small'>Tapahtumat</HeaderText>
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', display: 'flex', flexDirection: 'row'}}>
        <FilterButton style={{marginRight: 4}}/>
        <FilterButton />
      </View>
    </View>
  )
}

const EventStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Events"
        component={Events}
        options={{
          header: () => <Header />
        }}/>
      <Stack.Screen
        name="EventDetail"
        component={EventDetail}
      />
    </Stack.Navigator>
  );
};

export type EventsStackParamList = {
  Events: undefined;
  EventDetail: { eventId: string };
};

export default EventStack;
