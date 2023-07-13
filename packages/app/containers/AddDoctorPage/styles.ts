import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  loadingContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    minHeight: '100%',
    width: '100%',
    backgroundColor: 'white'
  },
  bodyContainer: {
    flex: 1,
    marginHorizontal: 10,
    paddingTop: 20
  },
  inputTitle: {
    color: '#2a2a2a',
    textAlign: 'left'
  },
  buttonSection: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center'
  },
  buttonBody: {
    flex: 1
  },
  leftButtonUnselected: {
    marginTop: 7,
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0
  },
  leftButtonSelected: {
    marginTop: 7,
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0,
    borderColor: '#73d84e',
    borderWidth: 1
  },
  rightButtonUnselected: {
    marginTop: 7,
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0
  },
  rightButtonSelected: {
    marginTop: 7,
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,
    borderColor: '#73d84e',
    borderWidth: 1
  },
  iconContainer: {
    position: 'relative'
  },
  icon: {
    position: 'absolute',
    top: 11,
    left: 0,
    right: 3,
    bottom: 0,
    alignItems: 'flex-end'
  }
});
