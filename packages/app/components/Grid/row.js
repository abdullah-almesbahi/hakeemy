import React from 'react';
import PropType from 'prop-types';
import { Platform } from '../Platform';
import { View, ViewPropTypes } from 'react-native';

export default row =>
  class Row extends React.PureComponent {
    static propTypes = {
      children: PropType.oneOfType([
        PropType.element,
        PropType.arrayOf(PropType.element)
      ]).isRequired,

      style: ViewPropTypes.style
    };

    static defaultProps = {
      style: {}
    };

    render() {
      if (Platform.OS != 'web') {
        // return <View style={{ flex: 1 }}>{this.props.children}</View>;
        return this.props.children;
      }
      return <View style={[row, this.props.style]}>{this.props.children}</View>;
    }
  };
