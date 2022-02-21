import * as React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import FilterButton from '../../components/common/FilterButton';
import EventLarge from '../../components/events/EventLarge';
import Layout from '../../components/layout/Layout';
import HeaderText from '../../components/common/HeaderText';
import { events } from '../../content/testContent';

const styles = StyleSheet.create({
  header: {
    fontSize: 16,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

const Events = () => {

  return (
    <Layout>
      <View style={styles.headerContainer}>
        <HeaderText textType="large">Events</HeaderText>
        <FilterButton />
      </View>
      <FlatList
        data={events}
        renderItem={({ item }) => <EventLarge event={item} />}
        keyExtractor={item => item.id}
      />
    </Layout>
  );
};

export default Events;
