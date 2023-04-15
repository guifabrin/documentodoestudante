import {StyleSheet} from 'react-native';
import {COLORS} from './src/config/variables';

export default StyleSheet.create({
  container: {
    height: '100%',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: COLORS.PRIMARY,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  logo: {
    marginLeft: 10,
    width: 25,
    height: 35,
  },
  title: {
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
    color: '#fff',
  },
  contentContainer: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: COLORS.PRIMARY,
    borderTopColor: '#bbb',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
