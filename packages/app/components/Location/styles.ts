import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

// console.log('width', width / 2 - 292 / 2);
// console.log('xwidth', width);
export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white'
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 10,
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
    // borderWidth: 1,
    // borderColor: 'red',
    flex: 1,
    width,
    position: 'relative'
    // position: 'absolute',
    // top: 60,
    // left: 0,
    // right: 0,
    // bottom: 0
  },
  setLocationStyle: {
    position: 'absolute',
    bottom: 30,
    right: width / 2 - 100
    // width: 300
  },
  setLocationContentStyle: {
    width: 200
  },
  search: {
    position: 'absolute',
    top: 30,
    width: 292,
    right: width / 2 - 292 / 2
  },
  searchSuggest: {
    position: 'absolute',
    top: 78,
    right: width / 2 - 292 / 2,
    backgroundColor: 'white',
    width: 292,
    elevation: 4
  },
  currentLocation: {
    position: 'absolute',
    bottom: 130,
    right: 10,
    elevation: 4,
    backgroundColor: 'white'
  },
  searchSuggestList: {
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1
  }
});
