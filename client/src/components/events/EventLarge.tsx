import { StyleSheet, Pressable, View } from 'react-native'
import * as React from 'react'
import { Event } from '../../entities'
import HeaderText from '../common/HeaderText'
import BodyText from '../common/BodyText'
import LocationButton from '../common/LocationButton'
import LikeButton from '../common/LikeButton'

const styles = StyleSheet.create({
  eventContainer: {
    flex: 1,
    height: 285,
    backgroundColor: 'white',
    marginVertical: 8,
    borderRadius: 20
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
    justifyContent: 'space-between'
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
    shadowOffset: {width: 0, height: 4},
    shadowColor: 'rgba(228, 218, 207, 0.4)',
    shadowRadius: 4,
    shadowOpacity: 1.0
  },
  likeButton: {

  }
})

type Props = {
  event: Event
}

const EventLarge = ({ event }: Props) => {

  const handlePress = () => {
    console.log('Click')
  }

  return (
    <Pressable onPress={handlePress} style={styles.eventContainer}>
      <View style={styles.imageContainer}></View>
      <View style={{marginHorizontal: 16}}>
        <View style={styles.buttonContainer}>
          <LocationButton name={event.location.name}/>
          <LikeButton type='event'/>
        </View>
        <HeaderText textType='small'>{event.name}</HeaderText>
      </View>
    </Pressable>
  )
}

export default EventLarge
