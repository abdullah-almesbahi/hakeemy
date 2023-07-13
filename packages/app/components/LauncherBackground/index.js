import React from 'react';
import { ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { HOSPITAL_TYPE } from '../../utils/constants';

const LauncherBackground = props => {
  if (props.type === HOSPITAL_TYPE) {
    return (
      <ImageBackground
        style={styles.containerBackground}
        source={require('../../images/hospitalBackground.jpg')}
      >
        {props.children}
      </ImageBackground>
    );
  } else {
    return (
      <ImageBackground
        style={styles.containerBackground}
        source={require('../../images/patientBackground.jpg')}
      >
        {props.children}
      </ImageBackground>
    );
  }
};

// LauncherBackground.propTypes = {
//   type: PropTypes.number.isRequired
// };

export default LauncherBackground;
