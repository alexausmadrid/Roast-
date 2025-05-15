import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface AvatarProps {
  uri: string;
  size?: number;
  borderColor?: string;
}

const Avatar: React.FC<AvatarProps> = ({ uri, size = 40, borderColor }) => {
  return (
    <View style={[
      styles.container, 
      { 
        width: size, 
        height: size, 
        borderRadius: size / 2,
        borderColor: borderColor || 'transparent',
        borderWidth: borderColor ? 2 : 0,
      }
    ]}>
      <Image
        source={{ uri }}
        style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Avatar;