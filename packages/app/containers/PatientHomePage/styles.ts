import { StyleSheet } from "react-native";
export default StyleSheet.create({
  // Search Page
  mainContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
    backgroundColor: "white"
  },
  welecomeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  welecomeText: {
    fontSize: 25,
    marginBottom: 10
  },
  searchDescriptionText: {
    fontSize: 13,
    color: "gray",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 20
  },

  searchContainer: {
    flex: 4
  },
  languageContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white"
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20
  },
  container1: {
    flex: 1,
    backgroundColor: "transparent",
    padding: 26,
    alignItems: "center",
    // Image's source contains explicit size, but we want
    // it to prefer flex: 1
    width: undefined,
    height: undefined
  },
  textInput: {
    borderWidth: 2,
    borderColor: "red"
  },
  errorText: {
    marginBottom: 10,
    color: "red"
  },
  contentStyleButton: {
    width: "100%",
    // flex: 1,
    height: 50
    // borderWidth: 1,
    // borderColor: "red"
  },
  button: {
    // borderWidth: 1,
    // borderColor: "red",
    width: "100%"
    // justifyContent: "center",
    // alignItems: "center"
    // height: 50
  },
  // languageContainer: {
  //   flex: 1,
  //   flexDirection: "row",
  //   justifyContent: "space-evenly",
  //   alignItems: "center"
  // },
  languageTopBadding: {
    flex: 1
  },
  textWhite: {
    color: "white"
  },
  section1: {
    flex: 3,
    alignItems: "center",
    justifyContent: "flex-end",
    width: 250,
    height: 250
  },
  section2: {
    flex: 3,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around"
  },
  logo: {
    height: "100%",
    width: "100%"
  }
});
