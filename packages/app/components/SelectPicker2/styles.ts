import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const optionStyle = {
  flex: 0,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: 10,
  paddingHorizontal: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#eee'
};

const optionTextStyle = {
  flex: 1,
  textAlign: 'left',
  color: '#000',
  fontSize: 22
};

export default StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    flex: 1
    // borderWidth: 1,
    // borderColor: "blue"
  },
  overlay: {
    // borderWidth: 1,
    // borderColor: "red",
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white'
    // justifyContent: "center",
    // alignItems: "center"
  },
  titleTextStyle: {
    flex: 0,
    color: '#fff',
    fontSize: 20,
    marginBottom: 15
  },
  listContainer: {
    // borderColor: "red",
    // borderWidth: 1,
    flex: 1,
    // width: width * 0.8,
    // maxHeight: height * 0.7,
    // backgroundColor: "#fff",
    borderRadius: 0,
    marginBottom: 40
  },
  cancelContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cancelButton: {
    flex: 0,
    backgroundColor: '#999',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10
  },
  cancelButtonText: {
    textAlign: 'center',
    fontSize: 18
  },
  filterTextInputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#999'
  },
  filterTextInput: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 0,
    height: 50
  },
  categoryStyle: {
    ...optionStyle
  },
  categoryTextStyle: {
    ...optionTextStyle,
    color: '#999',
    fontStyle: 'italic',
    fontSize: 16
  },
  optionStyle: {
    ...optionStyle
  },
  optionStyleLastChild: {
    borderBottomWidth: 0
  },
  optionTextStyle: {
    ...optionTextStyle
  },
  selectedOptionStyle: {
    ...optionStyle
  },
  selectedOptionStyleLastChild: {
    borderBottomWidth: 0
  },
  selectedOptionTextStyle: {
    ...optionTextStyle,
    fontWeight: '700'
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red'
    // paddingVertical: 10,
    // paddingHorizontal: 10
  },
  noResultsText: {
    flex: 1,
    textAlign: 'center',
    color: '#ccc',
    fontStyle: 'italic',
    fontSize: 22
  },
  searchSection: {
    // borderWidth: 1,
    // borderColor: 'red',
    // height: 10,
    flex: 1,
    position: 'relative'
  },
  toggleDown: {
    // borderWidth: 1,
    // borderColor: "blue",
    // position: "absolute",
    // right: 0,
    // top: 5,
    // padding: 10
  }
});
