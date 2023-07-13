import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  container: {
    minHeight: '100%',
    width: '100%',
    backgroundColor: 'white'
  },
  bodyContainer: {
    flex: 1
    // paddingHorizontal: 10,
    // paddingTop: 2
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0
  }
});
