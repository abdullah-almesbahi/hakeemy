import { StyleSheet, Dimensions } from 'react-native';
import { themePatient } from '../App/themes';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  footerLight: {
    paddingVertical: 20,
    // alignItems: 'center',
    // marginHorizontal: '35%',
    // justifyContent: 'center',
    maxWidth: '90%',
    width: 350,
    alignSelf: 'center'
    // backgroundColor: 'red'
    // backgroundColor: 'rgba(0, 0, 0, 0)'
    // borderTopColor: '#e0e0e0',
    // borderTopWidth: 1
    // paddingHorizontal: 70,
    // borderVertical
    // borderBottomColor: '#e0e0e0',
    // borderBottomWidth: 1,
    // flexDirection: 'row',
    // borderWidth: 1,
    // borderColor: 'red',
    // justifyContent: 'space-between',
  },
  footerBar: {
    paddingVertical: 5,
    paddingHorizontal: 70,
    backgroundColor: '#edeef0',
    // backgroundColor: '#055382',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflowX: 'hidden'
  },
  space: {
    marginHorizontal: 10
  }
});
