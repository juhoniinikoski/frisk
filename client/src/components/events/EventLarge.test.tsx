import * as React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EventLarge from './EventLarge';
import { NavigationContainer } from '@react-navigation/native';

const event = {
  name: 'Pihapelit',
  id: 'juhoniinikoski.Pihapelit',
  location: {
    name: 'Nordis',
    latitude: 60.188969,
    longitude: 24.919491,
  },
  activity: {
    name: 'Sähly',
  },
  createdBy: {
    username: 'juhoniinikoski',
    id: 'bbe42984-051b-4a01-b45d-b8d29c32200c',
  },
  price: 0,
  start: '2022-02-16T18:49:33.802Z',
  end: '2022-02-16T20:49:33.802Z',
  attendants: {
    current: 8,
    max: 12,
  },
};

describe('large events component render tests', () => {
  test('should render a component', () => {
    render(
      <NavigationContainer>
        <EventLarge event={event} />
      </NavigationContainer>
    );
  });

  test('should render a name of a location', () => {
    const { getByText } = render(
      <NavigationContainer>
        <EventLarge event={event} />
      </NavigationContainer>
    );
    getByText('Nordis');
  });

  test('should render a name of an event', () => {
    const { getByText } = render(
      <NavigationContainer>
        <EventLarge event={event} />
      </NavigationContainer>
    );
    getByText('Pihapelit');
  });

  test('should render a name of an activity, duration and price', () => {
    const { getByText } = render(
      <NavigationContainer>
        <EventLarge event={event} />
      </NavigationContainer>
    );
    getByText('Sähly · 120 min · ilmainen');
  });

  test('should render a date and weekday', () => {
    const { getByText } = render(
      <NavigationContainer>
        <EventLarge event={event} />
      </NavigationContainer>
    );
    getByText('keskiviikko 16.2.2022');
  });

  test('should render a event time', () => {
    const { getByText } = render(
      <NavigationContainer>
        <EventLarge event={event} />
      </NavigationContainer>
    );
    getByText('20.49 - 22.49');
  });

  // test('should navigate to an event details page', async () => {
  //   const { findByText } = render(
  //     <NavigationContainer>
  //       <EventLarge event={event} />
  //     </NavigationContainer>
  //   );
  //   const toClick = await findByText('Pihapelit');
  //   fireEvent(toClick, 'press');
  // });
});
