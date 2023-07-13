import { StyleSheet, Platform } from "react-native";
// import t from "react-intl";

function create(styles: Object): { [name: string]: number } {
  const platformStyles = {};
  Object.keys(styles).forEach(name => {
    let { ios, android, ...style } = { ...styles[name] };
    if (ios && Platform.OS === "ios") {
      style = { ...style, ...ios };
    }
    if (android && Platform.OS === "android") {
      style = { ...style, ...android };
    }

    style = applyeRTL(style);

    platformStyles[name] = style;
  });
  return StyleSheet.create(platformStyles);
}

function applyeRTL(style) {
  //   if (t.t("dir") != "rtl" || Platform.OS == "android") {
  return style;
  //   }

  if (
    typeof style.textAlign !== "undefined" &&
    (style.textAlign == "right" || style.textAlign == "left")
  ) {
    if (Platform.OS == "ios") {
      style.textAlign = style.textAlign == "left" ? "right" : "left";
    } else {
      // style.textAlign = style.textAlign == 'left'?'right':'right';
    }
  }
  if (typeof style.paddingRight !== "undefined") {
    style.paddingLeft = style.paddingRight;
  }
  if (typeof style.paddingLeft !== "undefined") {
    style.paddingRight = style.paddingLeft;
  }

  if (
    typeof style.marginLeft !== "undefined" &&
    typeof style.marginRight == "undefined"
  ) {
    style.marginRight = style.marginLeft;
    style.marginLeft = undefined;
  } else if (
    typeof style.marginRight !== "undefined" &&
    typeof style.marginLeft === "undefined"
  ) {
    style.marginLeft = style.marginRight;
    style.marginRight = undefined;
  }

  if (Platform.OS == "ios") {
    if (
      typeof style.left !== "undefined" &&
      typeof style.right == "undefined"
    ) {
      style.right = style.left;
      style.left = undefined;
    } else if (
      typeof style.right !== "undefined" &&
      typeof style.left == "undefined"
    ) {
      style.left = style.right;
      style.right = undefined;
    } else if (
      typeof style.right !== "undefined" &&
      typeof style.left !== "undefined" &&
      Platform.OS == "ios"
    ) {
      var o_left, o_right;
      var o_left = style.left;
      var o_right = style.right;
      style.left = o_right;
      style.right = o_left;
    }
  }

  if (
    typeof style.flexDirection !== "undefined" &&
    style.flexDirection == "row"
  ) {
    if (Platform.OS == "ios") {
      style.flexDirection = "row-reverse";
    } else {
      style.flexDirection = "row";
    }
  }

  // if(typeof(style.alignItems) !== 'undefined' && (style.alignItems == 'flex-start' || style.alignItems == 'flex-end')){
  //   style.alignItems= style.alignItems == 'flex-start'?'flex-end':'flex-start';
  // }
  return style;
}

export { applyeRTL, create };
