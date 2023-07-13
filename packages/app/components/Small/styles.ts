import * as StyleSheet from '../StyleSheet';
import { FONT } from '../../utils/constants';

export default StyleSheet.create({
  size: {
    fontSize: 11,
    fontFamily: FONT,
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'left'
  },
  dark: {
    color: '#303030'
  },
  light: {
    color: 'white'
  },
  gray: {
    color: 'gray'
  }
});
