import { StyleSheet } from "react-native";
import { GRAY_BACKGROUND } from "../../utils/constants";
export default StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: GRAY_BACKGROUND
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  formContainer: {
    // borderColor: "yellow",
    // borderWidth: 1

    flex: 3
  },
});
