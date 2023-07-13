import { StyleSheet } from "react-native";
/**
 * offsetLayer has transform:[{rotateZ: '-135deg'}] since
 * the offsetLayer rotation is fixed by us.
 **/
export default StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  baselayer: {
    position: "absolute"
  },
  firstProgressLayer: {
    position: "absolute",
    borderLeftColor: "transparent",
    borderBottomColor: "transparent"
  },
  secondProgressLayer: {
    position: "absolute",
    borderLeftColor: "transparent",
    borderBottomColor: "transparent"
  },
  offsetLayer: {
    position: "absolute",
    borderLeftColor: "transparent",
    borderBottomColor: "transparent"
  },
  display: {
    position: "absolute"
  }
});
