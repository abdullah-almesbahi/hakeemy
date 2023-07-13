import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialCommunityIconFont from "react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialIconFont from "react-native-vector-icons/Fonts/MaterialIcons.ttf";

export { MaterialCommunityIcons, MaterialIcons };

const iconStyles = [
  `@font-face { src:url(${MaterialCommunityIconFont});font-family: MaterialCommunityIcons; }
   @font-face { src:url(${MaterialIconFont});font-family: MaterialIcons; }`
].join("\n");

const style = document.createElement("style");
style.type = "text/css";

if ((style as any).styleSheet) {
  (style as any).styleSheet.cssText = iconStyles;
} else {
  style.appendChild(document.createTextNode(iconStyles));
}

if (document.head) document.head.appendChild(style);
