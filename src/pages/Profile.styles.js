import {StyleSheet} from 'react-native';
import {COLORS} from '../config/variables';

export default StyleSheet.create({
  card: {
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.BLACK,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 5,
    justifyContent: 'space-between',
  },
  rowQrCode: {
    flexDirection: 'row',
    paddingVertical: 5,
    justifyContent: 'center',
  },
  name: {
    fontSize: 36,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
  },
  image: {
    width: 150,
    height: 150,
  },
});
