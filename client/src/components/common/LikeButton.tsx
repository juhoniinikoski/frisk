import { Pressable, StyleSheet } from 'react-native';
import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  likeButton: {
    height: 52,
    width: 52,
    backgroundColor: 'white',
    borderRadius: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowColor: 'rgba(228, 218, 207, 0.4)',
    shadowRadius: 4,
    shadowOpacity: 1.0,
    borderWidth: 1,
    borderColor: '#e4e5e5'
  },
});

const LikeButton = () => {
  const handleLike = () => {
    console.log('like');
  };

  return (
    <Pressable style={styles.likeButton} onPress={handleLike}>
      <Ionicons name="ios-heart-outline" size={24} color="black" />
    </Pressable>
  );
};

export default LikeButton;
