// import t from 'react-native-i18n';
import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    // minHeight: '100%',
    // borderWidth: 1,
    // borderColor: 'green',
    flex: 1,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    // flex: 4,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  formContainer: {
    // flex: 6,
    justifyContent: 'center',
    width: '100%',
    marginHorizontal: 'auto',
    minWidth: 300,
    maxWidth: 500
    // alignItems: 'center'
  },
  creatAndSignUpContainer: {
    // flex: 5,
    paddingVertical: 20,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  textWhite: {
    color: 'white'
  },
  icon: {
    width: 30,
    height: 30
  },
  header: {
    backgroundColor: 'rgba(255, 255, 255,0.8)'
  },

  label: {
    color: 'white',
    lineHeight: 20
  },
  h1: {
    backgroundColor: 'white',
    borderColor: '#d7df23',
    borderRightWidth: 4,
    borderLeftWidth: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    width: 200,
    height: 30,
    flex: 8,
    alignItems: 'center'
  },
  belowTextInput: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  boxHeading: {
    position: 'absolute',
    top: 0,
    left: 10
  },
  buttonWrapper: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: { borderWidth: 0 }
});
