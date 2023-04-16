import {Dimensions, StyleSheet} from 'react-native';

const window = Dimensions.get('window');
const {width, height} = window;
export default StyleSheet.create({
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
    width: height - 120,
    height: width - 20,
    resizeMode: 'contain',
  },
});
