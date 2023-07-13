import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import styles from "./styles";

const XSmall = props => (
  <Text
    style={[styles.size, props.light ? styles.light : styles.dark, props.style]}
  >
    {props.children}
  </Text>
);

XSmall.propTypes = {
  // style: PropTypes.object,
  light: PropTypes.bool
};

export default XSmall;
