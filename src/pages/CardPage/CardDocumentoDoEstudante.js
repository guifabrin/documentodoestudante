import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';

const window = Dimensions.get('window');
const {width, height} = window;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height - 100,
  },
  rotatedContainer: {
    transform: [{rotate: '90deg'}],
    height: width,
    width: height - 100,
    justifyContent: 'center',
  },
  image: {
    width: height - 100,
    height: width,
    resizeMode: 'contain',
  },
});

export default ({card}) => {
  return (
    <View style={styles.container}>
      <View style={styles.rotatedContainer}>
        <Image
          style={styles.image}
          source={{uri: card.replace(/(\r\n|\n|\r)/gm, '')}}
        />
      </View>
    </View>
  );
};
