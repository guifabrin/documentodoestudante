import {StatusBar} from 'expo-status-bar';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import SvgImage from 'react-native-remote-svg';
import {CARD_TYPES} from '../config/variables';

export default ({cardType, card, photo}) => {
  const containerStyle = StyleSheet.create({
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  });
  const window = Dimensions.get('window');
  if (cardType === CARD_TYPES.ESTUDANTE_CC) {
    const cardStyle = StyleSheet.create({
      transform: [{rotate: '90deg'}],
      position: 'relative',
    });

    const cardImageStyle = StyleSheet.create({
      width: window.height - 40,
      height: window.width - 40,
      margin: 20,
    });

    const completeCard = card.replace(
      '<rect x="19.5" y="56.2" class="st7" width="59.5" height="59.5"/>',
      `<image href="${photo}" x="19.5" y="56.2" width="59.5" height="59.5" />`,
    );

    return (
      <View style={containerStyle}>
        <StatusBar></StatusBar>
        <View style={cardStyle}>
          <SvgImage source={{uri: completeCard}} style={cardImageStyle} />
        </View>
      </View>
    );
  }

  if (cardType === CARD_TYPES.DOCUMENTO_DO_ESTUDANTE) {
    const cardImageStyle = StyleSheet.create({
      width: window.height - 40,
      height: window.width - 40,
      transform: [{rotate: '90deg'}],
      margin: 20,
    });
    return (
      <View style={containerStyle}>
        <StatusBar></StatusBar>
        <Image
          resizeMode={'contain'}
          style={cardImageStyle}
          source={{uri: card}}
        />
      </View>
    );
  }

  return null;
};
