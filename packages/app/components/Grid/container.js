import React from 'react';
import PropType from 'prop-types';
import { Platform } from '../Platform';
import { View, ViewPropTypes, Dimensions } from 'react-native';
const DEVICE = Dimensions.get('screen');

const WIDTH_XXL = 1706;
const WIDTH_XL = 1365;
const WIDTH_LG = 1024;
const WIDTH_MD = 757;
const WIDTH_SM = 548;
const WIDTH_XS = 546;

export default (container, containerFluid) =>
  class Container extends React.PureComponent {
    static propTypes = {
      children: PropType.oneOfType([
        PropType.element,
        PropType.arrayOf(PropType.element)
      ]).isRequired,

      style: ViewPropTypes.style,
      fluid: PropType.bool
    };

    static defaultProps = {
      style: {},
      fluid: false
    };

    getContainerStyle = () => {
      let style = {};
      if (DEVICE.width >= WIDTH_XL) {
        style = { width: '100%', maxWidth: WIDTH_XL, marginHorizontal: 'auto' };
      } else if (DEVICE.width >= WIDTH_LG) {
        style = { width: '100%', maxWidth: WIDTH_LG, marginHorizontal: 'auto' };
      } else if (DEVICE.width >= WIDTH_MD) {
        style = { width: '100%', maxWidth: WIDTH_MD, marginHorizontal: 'auto' };
      } else if (DEVICE.width >= WIDTH_SM) {
        style = { width: '100%', maxWidth: WIDTH_SM, marginHorizontal: 'auto' };
      } else if (DEVICE.width <= WIDTH_XS) {
        style = { width: '100%', maxWidth: WIDTH_XS, marginHorizontal: 'auto' };
      }
      return style;
    };

    render() {
      if (Platform.OS != 'web') {
        // return <View style={{ flex: 1 }}>{this.props.children}</View>;
        return this.props.children;
      }

      return (
        <View
          style={[
            // container,
            this.getContainerStyle(),
            this.props.style,
            this.props.fluid && containerFluid
          ]}
        >
          {this.props.children}
        </View>
      );
    }
  };
