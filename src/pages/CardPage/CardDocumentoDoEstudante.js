import React from 'react';
import {Image, View} from 'react-native';
import styles from './CardDocumentoDoEstudante.styles';

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
