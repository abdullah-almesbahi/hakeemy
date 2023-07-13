import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  container: {
    // minHeight: '100%',
    flex: 1,
    width: '100%',
    backgroundColor: 'white'
  },
  bodyContainer: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'red',
    // paddingHorizontal: 10,
    paddingTop: 20
  },
  textInput: {
    backgroundColor: 'white'
  },
  errorText: {
    marginBottom: 10,
    color: 'red'
  },
  contentStyleButton: {
    width: '100%',
    height: 50
  },
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0
  },

  termsContainer: {
    // borderColor: "yellow",
    // borderWidth: 1,

    flex: 2,
    // width: 100,
    // justifyContent: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
