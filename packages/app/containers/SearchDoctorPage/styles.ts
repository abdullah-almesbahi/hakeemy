import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  mainContainer: {
    // flex: 1,
    paddingHorizontal: 10
    // paddingTop: 50
  },
  cnteredContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    // marginTop: -30,
    marginBottom: 30
  },
  containerBackground: {
    // minHeight: '100%',
    flex: 1,
    width: undefined,
    height: undefined,
    zIndex: 2,
    backgroundColor: 'white'
  },
  welecomeContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  welecomeText: {
    fontSize: 25,
    marginBottom: 10,
    textAlign: 'center',
    paddingHorizontal: 20
  },
  searchDescriptionText: {
    fontSize: 13,
    color: 'black',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20
  },
  searchContainer: {
    // flex: 1
    zIndex: 10
  },
  languageContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  container: {
    flex: 1,
    width: '100%'
    // backgroundColor: "white"
  },
  contentStyleButton: {
    width: '100%',
    height: 50
  },
  button: {
    width: '100%',
    marginVertical: 20
  },
  //////
  container2: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    padding: 16,
    marginTop: 40
  },
  autocompleteContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2
  },
  infoText: {
    textAlign: 'center',
    fontSize: 16
  }
});
