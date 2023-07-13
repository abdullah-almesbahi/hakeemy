import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import styles from "./styles";

const H2 = props => (
  <Text
    style={[styles.size, props.style, props.light ? styles.light : styles.dark]}
  >
    {props.children}
  </Text>
);

H2.propTypes = {
  // style: PropTypes.object,
  light: PropTypes.bool
};

export default H2;
