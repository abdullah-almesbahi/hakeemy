import React, { useState, useEffect, memo } from 'react';
import { Animated, Image, Keyboard, Platform } from 'react-native';
import PropTypes from 'prop-types';
import styles, { IMAGE_HEIGHT_SMALL, IMAGE_HEIGHT } from './styles';
import { HOSPITAL_TYPE } from '../../utils/constants';
import { borderColor } from '@material-ui/system';

// import console = require("console");

let keyboardWillShowSub: any;
let keyboardWillHideSub: any;

interface IProps {
  type?: number;
}

const Logo: React.SFC<IProps> = props => {
  let imageHeight = new Animated.Value(IMAGE_HEIGHT);
  const initialState = {
    anim: new Animated.Value(0)
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    Animated.timing(state.anim, { toValue: 3000, duration: 3000 }).start();
    if (Platform.OS == 'ios') {
      keyboardWillShowSub = Keyboard.addListener(
        'keyboardWillShow',
        keyboardWillShow
      );
      keyboardWillHideSub = Keyboard.addListener(
        'keyboardWillHide',
        keyboardWillHide
      );
    } else {
      keyboardWillShowSub = Keyboard.addListener(
        'keyboardDidShow',
        keyboardDidShow
      );
      keyboardWillHideSub = Keyboard.addListener(
        'keyboardDidHide',
        keyboardDidHide
      );
    }

    return () => {
      keyboardWillShowSub.remove();
      keyboardWillHideSub.remove();
    };
  }, []);

  const keyboardWillShow = event => {
    Animated.timing(imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT_SMALL
    }).start();
  };

  const keyboardWillHide = event => {
    Animated.timing(imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT
    }).start();
  };

  const keyboardDidShow = event => {
    Animated.timing(imageHeight, {
      toValue: IMAGE_HEIGHT_SMALL
    }).start();
  };

  const keyboardDidHide = event => {
    Animated.timing(imageHeight, {
      toValue: IMAGE_HEIGHT
    }).start();
  };

  const fadeIn = (delay, from = 0) => {
    const { anim } = state;
    return {
      opacity: anim.interpolate({
        inputRange: [delay, Math.min(delay + 500, 3000)],
        outputRange: [0, 1],
        extrapolate: 'clamp'
      }),
      transform: [
        {
          translateY: anim.interpolate({
            inputRange: [delay, Math.min(delay + 500, 3000)],
            outputRange: [from, 0],
            extrapolate: 'clamp'
          })
        }
      ]
    };
  };
  if (props.type === HOSPITAL_TYPE) {
    return (
      <Image
        // resizeMode='contain'
        style={[styles.logo]}
        source={require('../../images/hakeemy-icon-hospital.png')}
      />
    );
  } else {
    return (
      <Image
        // resizeMode='contain'
        style={[styles.logo]}
        // style={[
        //   fadeIn(0),
        //   styles.logo
        //   // {
        //   //   width: 130,
        //   //   hight: 130
        //   // }
        // ]}
        // style={{ borderColor: 'red', borderWidth: 1 }}
        source={require('../../images/hakeemy-icon-patient.png')}
      />
    );
  }
};

// Logo.propTypes = {
//   type: PropTypes.string.isRequired
// };

export default memo(Logo);
