import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    // minHeight: window.innerWidth,
    // flex: 1,
    minHeight: '100%',
    width: '100%',
    backgroundColor: '#ffffff'
    // borderWidth: 1,
    // borderColor: 'red'
  },
  bodyContainer: {
    // borderWidth: 1,
    // borderColor: 'green',
    flex: 1,
    paddingHorizontal: 7,
    paddingTop: 20
  },
  textInput: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: 'transparent'
  },
  errorText: {
    marginBottom: 10,
    color: 'red'
  },
  contentStyleButton: {
    width: '100%',
    height: 45
  },
  button: {
    marginTop: 5,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },
  mapMainContainer: {
    flex: 1,
    width,
    position: 'relative'
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0
  }
});
