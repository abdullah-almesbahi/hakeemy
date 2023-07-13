import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  container: {
    // minHeight: '100%',
    flex: 1,
    width: '100%',
    backgroundColor: 'white'
  },
  bodyContainer: {
    paddingTop: 1
  },
  Surface: {
    elevation: 3,
    borderRadius: 3
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
  }
});
