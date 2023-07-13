/**
 *
 * NoRecords
 *
 */

import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import { FormattedMessage } from "react-intl";
import messages from "./messages";
import H2 from "../H2";

import styles from "./styles";

function NoRecords(props) {
  return (
    <View style={styles.noRecordContainder}>
      {props.children ? (
        props.children
      ) : (
        <H2>
          <FormattedMessage {...messages.noRecords} />
        </H2>
      )}
    </View>
  );
}

NoRecords.propTypes = {
  // content: PropTypes.func
};

export default NoRecords;
