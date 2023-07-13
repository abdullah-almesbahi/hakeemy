import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    // borderWidth: 1,
    // borderColor: 'red',
    // minHeight: '100%',
    flex: 1,
    // flex: 'inherit',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, .3)'
  },
  imageBackground: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 26,
    alignItems: 'center',
    width: undefined,
    height: undefined
  },
  bodyContainer: {
    alignItems: 'center',
    // minHeight: '100%'
    flex: 1
  },
  logoSection: {
    // borderWidth: 1,
    // borderColor: 'green',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  userTypeSection: {
    flex: 3,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  patientButton: {
    backgroundColor: '#4ba4d8',
    marginLeft: 5,
    marginRight: 5
  },
  hospitalButton: {
    backgroundColor: '#6fda44',
    marginLeft: 5,
    marginRight: 5
  },
  languageSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
