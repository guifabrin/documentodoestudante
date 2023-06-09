import {Dimensions, StyleSheet} from 'react-native';

const window = Dimensions.get('window');
const {width, height} = window;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height - 100,
  },
  svgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{rotate: '90deg'}],
    width: height - 100,
    height: width,
  },
  svgImage: {
    width: height - 20,
    height: width - 20,
  },
});

export default styles;
