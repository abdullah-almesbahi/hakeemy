import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import styles from './styles';

interface IProps {
  light?: Boolean;
  dark?: Boolean;
  gray?: Boolean;
  style?: any;
  children?: React.ReactNode;
}

const _Text = (props: IProps) => {
  let fontStyles = [];
  fontStyles.push(styles.text);
  if (props.light) {
    fontStyles.push(styles.light);
  } else if (props.dark) {
    fontStyles.push(styles.dark);
  } else if (props.gray) {
    fontStyles.push(styles.gray);
  }

  if (props.style !== undefined) {
    fontStyles.push(props.style);
  }

  return <Text style={fontStyles}>{props.children}</Text>;
};

export default _Text;
