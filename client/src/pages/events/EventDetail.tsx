import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Layout from '../../components/layout/Layout';
import HeaderText from '../../components/common/HeaderText';
import { EventsStackParamList } from '../../navigation/EventStack';
import LocationButton from '../../components/common/LocationButton';
import LikeButton from '../../components/common/LikeButton';
import { event } from '../../content/testContent';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import BodyText from '../../components/common/BodyText';
import { textContentFI } from '../../content/textContent';
import { getDate, getDuration, getTime } from '../../services/dateService/dateService';

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: 'blue',
    height: 300,
    marginHorizontal: -16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  buttonContainer: {
    height: 52,
    top: -32,
    marginBottom: -8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeDate: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
});

type Props = NativeStackScreenProps<EventsStackParamList, 'EventDetail'>;

const EventDetail = ({ route }: Props) => {

  const date = getDate(Date.parse(event.start));
  const { weekdays } = textContentFI;
  const [start, end] = getTime(Date.parse(event.start), Date.parse(event.end));
  const duration = getDuration(Date.parse(event.start), Date.parse(event.end));
  const price = event.price === 0 ? textContentFI.common.free : event.price;

  return (
    <Layout>
      <ScrollView style={{paddingHorizontal: 16}}>
        <View style={styles.imageContainer}></View>
        <View style={styles.buttonContainer}>
          <LocationButton name={event.location.name} />
          <LikeButton />
        </View>
        <View style={styles.timeDate}>
            <MaterialCommunityIcons
              name="calendar-month"
              size={17}
              color="black"
              style={{ marginRight: 8 }}
            />
            <BodyText style={{ marginRight: 16 }}>
              {weekdays[date[0]]} {date[1]}
            </BodyText>
            <Ionicons
              name="ios-time"
              size={17}
              style={{ marginRight: 8 }}
              color="black"
            />
            <BodyText style={{ marginRight: 8 }}>
              {start} - {end}
            </BodyText>
          </View>
        <HeaderText>{event.name}</HeaderText>
        <BodyText style={{ marginTop: 4 }}>
          {event.activity.name} · {duration} · {price}
        </BodyText>
      </ScrollView>
    </Layout>
  );
};

export default EventDetail;
