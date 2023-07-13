import React from 'react';
import PropType from 'prop-types';
import { Platform } from '../Platform';
import { View, ViewPropTypes } from 'react-native';

export default col =>
  class Col extends React.PureComponent {
    static propTypes = {
      children: PropType.oneOfType([
        PropType.element,
        PropType.arrayOf(PropType.element)
      ]),

      style: ViewPropTypes.style,
      proportion: PropType.number,
      offset: PropType.number
    };

    static defaultProps = {
      children: null,
      style: {},
      proportion: 1,
      offset: null
    };

    render() {
      if (Platform.OS != 'web') {
        return this.props.children;
        // return <View style={{ flex: 1 }}>{this.props.children}</View>;
      }
      const { proportion, offset } = this.props;

      return (
        <View
          style={[
            col,
            {
              flex: offset === null ? proportion : offset
            },
            this.props.style
          ]}
        >
          {offset === null ? this.props.children : null}
        </View>
      );
    }
  };
