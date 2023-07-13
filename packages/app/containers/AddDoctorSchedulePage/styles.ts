import { StyleSheet } from 'react-native';
import { themeHospital } from '../App/themes';
export default StyleSheet.create({
  loadingIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    // flex: 1,
    minHeight: '100%',
    width: '100%',
    backgroundColor: 'white'
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20
  },
  timeContainer: {
    position: 'relative',
    marginTop: 13,
    flex: 1
  },
  time: {
    position: 'absolute',
    right: 3,
    bottom: 4,
    alignItems: 'flex-end',
    zIndex: 1
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: themeHospital.colors.primary
  },
  contentStyleButton: {
    width: '100%',
    height: 45,
    backgroundColor: themeHospital.colors.primary
  }
});
