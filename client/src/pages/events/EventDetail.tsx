import { StyleSheet } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Layout from '../../components/layout/Layout';
import HeaderText from '../../components/common/HeaderText';
import { EventsStackParamList } from '../../navigation/EventStack';

const styles = StyleSheet.create({});

type Props = NativeStackScreenProps<EventsStackParamList, 'EventDetail'>;

const EventDetail = ({ route }: Props) => {
  console.log(route.params.eventId);
  return (
    <Layout>
      <HeaderText>Event</HeaderText>
    </Layout>
  );
};

export default EventDetail;
