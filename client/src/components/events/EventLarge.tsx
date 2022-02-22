import { StyleSheet, Pressable, View } from 'react-native';
import * as React from 'react';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Event } from '../../entities';
import HeaderText from '../common/HeaderText';
import BodyText from '../common/BodyText';
import LocationButton from '../common/LocationButton';
import LikeButton from '../common/LikeButton';
import {
  getDate,
  getDuration,
  getTime,
} from '../../services/dateService/dateService';
import { textContentFI } from '../../content/textContent';
import { EventsStackParamList } from '../../navigation/EventStack';

const styles = StyleSheet.create({
  eventContainer: {
    flex: 1,
    paddingBottom: 24,
    backgroundColor: 'white',
    marginVertical: 8,
    borderRadius: 20,
  },
  imageContainer: {
    height: 165,
    borderRadius: 20,
    backgroundColor: 'blue',
    display: 'flex',
  },
  buttonContainer: {
    height: 52,
    top: -32,
    marginBottom: -16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 24,
    height: '100%',
    backgroundColor: 'red',
    borderRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: 'rgba(228, 218, 207, 0.4)',
    shadowRadius: 4,
    shadowOpacity: 1.0,
  },
  timeDate: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  attendants: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
});

type Props = {
  event: Event;
};

type NavigationProps = NativeStackNavigationProp<EventsStackParamList>;

const EventLarge = ({ event }: Props) => {
  const navigation = useNavigation<NavigationProps>();

  const handlePress = () => {
    navigation.navigate('EventDetail', { eventId: event.id });
  };

  const date = getDate(Date.parse(event.start));
  const { weekdays } = textContentFI;
  const [start, end] = getTime(Date.parse(event.start), Date.parse(event.end));
  const duration = getDuration(Date.parse(event.start), Date.parse(event.end));
  const price = event.price === 0 ? textContentFI.common.free : event.price;

  return (
    <Pressable onPress={handlePress} style={styles.eventContainer}>
      <View style={styles.imageContainer} />
      <View style={{ marginHorizontal: 16 }}>
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
        <HeaderText textType="small">{event.name}</HeaderText>
        <BodyText style={{ marginTop: 4 }}>
          {event.activity.name} · {duration} · {price}
        </BodyText>
        <View style={styles.attendants}>
          <Ionicons
            name="ios-person"
            size={20}
            color="black"
            style={{ marginRight: 8 }}
          />
          {/* <BodyText>
            {event.attendants.current} / {event.attendants.max}{' '}
            {textContentFI.common.attendants}
          </BodyText> */}
        </View>
      </View>
    </Pressable>
  );
};

export default EventLarge;
