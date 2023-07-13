import React from 'react';
import PropTypes from 'prop-types';
import {
  APP_LAYOUT_BREAKPOINTS,
  getLayoutConsumerState
} from '../../hooks/LayoutContext';
import { useDimensions } from '../../hooks/use-dimensions';

interface ResponsiveProps {
  small?: any;
  medium?: any;
  large?: any;
  xlarge?: any;
  xxlarge?: any;
  largest?: any;
}

export const Responsive: React.SFC<ResponsiveProps> = ({
  small,
  medium,
  large,
  xlarge,
  xxlarge,
  largest,
  ...rest
}) => {
  const { sizename } = getLayoutConsumerState();
  // console.log('APP_LAYOUT_BREAKPOINTS', APP_LAYOUT_BREAKPOINTS);

  const { width: windowWidth } = useDimensions('width');
  // console.log('eee', windowWidth);

  let element;
  switch (sizename) {
    case 'small':
      element =
        typeof small !== 'undefined'
          ? small
          : typeof medium !== 'undefined'
          ? medium
          : typeof large !== 'undefined'
          ? large
          : typeof xlarge !== 'undefined'
          ? xlarge
          : typeof xxlarge !== 'undefined'
          ? xxlarge
          : largest;

      break;
    case 'medium':
      element =
        typeof medium !== 'undefined'
          ? medium
          : typeof large !== 'undefined'
          ? large
          : typeof xlarge !== 'undefined'
          ? xlarge
          : typeof xxlarge !== 'undefined'
          ? xxlarge
          : typeof largest !== 'undefined'
          ? largest
          : small;
      break;
    case 'large':
      element =
        typeof large !== 'undefined'
          ? large
          : typeof xlarge !== 'undefined'
          ? xlarge
          : typeof xxlarge !== 'undefined'
          ? xxlarge
          : typeof medium !== 'undefined'
          ? medium
          : small;

      break;
    case 'x-large':
      element =
        typeof xlarge !== 'undefined'
          ? xlarge
          : typeof large !== 'undefined'
          ? large
          : typeof medium !== 'undefined'
          ? medium
          : small;

      break;
    case 'xx-large':
      element =
        typeof xxlarge !== 'undefined'
          ? xxlarge
          : typeof xlarge !== 'undefined'
          ? xlarge
          : typeof large !== 'undefined'
          ? large
          : typeof medium !== 'undefined'
          ? medium
          : small;
      break;
    case 'largest':
      element =
        typeof largest !== 'undefined'
          ? largest
          : typeof xxlarge !== 'undefined'
          ? xxlarge
          : typeof xlarge !== 'undefined'
          ? xlarge
          : typeof large !== 'undefined'
          ? large
          : typeof medium !== 'undefined'
          ? medium
          : small;
      break;
    default:
      throw new Error(`Unknown sizename ${sizename}`);
  }

  return element ? React.cloneElement(element, rest) : null;
};

export default Responsive;
