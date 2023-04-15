import {StyleSheet} from 'react-native';
import {COLORS} from '../config/variables';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  activeBar: {
    height: 5,
  },
  tab: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 5,
    flexDirection: 'row',
  },
  tabTitle: {
    color: COLORS.WHITE,
    textAlign: 'center',
  },
  icon: {
    color: COLORS.WHITE,
  },
});
