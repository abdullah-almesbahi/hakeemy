/**
 *
 * TimePicker2
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { View } from 'react-native';
import { TimePicker } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/styles';
import blue from '@material-ui/core/colors/blue';
import { createMuiTheme } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Text } from 'react-native';

const TimePicker2 = ({ ...props }) => {
  const defaultMaterialTheme = createMuiTheme({
    direction: 'rtl',
    palette: {
      primary: {
        main: '#6FDA44'
      },
      secondary: {
        main: '#6FDA44'
      }
    }
  });

  return (
    <View>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={defaultMaterialTheme}>
          <TimePicker
            inputVariant='outlined'
            autoOk
            fullWidth={true}
            orientation='landscape'
            label={<FormattedMessage {...messages.time} />}
            onChange={props.onChange}
            value={props.value == undefined ? null : props.value}
            style={props.style}
          />
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </View>
  );
};

export default TimePicker2;
