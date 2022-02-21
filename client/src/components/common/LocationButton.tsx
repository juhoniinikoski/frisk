import { Pressable, StyleSheet, Text, View } from 'react-native'
import * as React from 'react'
import BodyText from './BodyText'
import { MaterialIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
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
  }
})

const LocationButton = ( {name}: {name: string} ) => {

  const handleLocationPress = () => {
    console.log('location press')
  }

  return (
    <Pressable style={styles.locationButton} onPress={handleLocationPress}>
      <MaterialIcons name="location-pin" size={24} color="black" style={{marginRight: 4}} />
      <BodyText textType='semi-bold'>{name}</BodyText>
    </Pressable>
  )
}

export default LocationButton
