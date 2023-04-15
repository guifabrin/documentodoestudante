import {View} from 'react-native';
import SvgImage from 'react-native-remote-svg';
import React from 'react';
import styles from './CardEstudanteCC.styles';

export default function Card({card, photo}) {
  const rect = `<rect x="-2.7" y="-2.8" class="st0" width="258" height="167.2"/>`;
  const completeCard = card.replace(
    rect,
    `${rect} <image href="${photo}" x="19.5" y="56.2" width="59.5" height="59.5" />`,
  );

  return (
    <View style={styles.container}>
      <View style={styles.svgContainer}>
        <SvgImage source={{uri: completeCard}} style={styles.svgImage} />
      </View>
    </View>
  );
}
