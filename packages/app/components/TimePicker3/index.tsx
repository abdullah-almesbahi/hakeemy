/**
 *
 * TimePicker2
 *
 */

import React, { memo, useState, Fragment } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { View } from 'react-native';
import { TimePicker, KeyboardTimePicker } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/styles';
import purple from '@material-ui/core/colors/indigo';
import { createMuiTheme } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Text } from 'react-native';
import Modal from '../Modal';
import { Button } from 'react-native-paper';

const TimePicker3 = props => {
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

  const [selectedDate, handleDateChange] = useState(new Date());
  const [time, changeTime] = useState(new Date());

  return (
    <View>
      <Modal
        visible={true}
        transparent={true}
        animationType='fade'
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
          margin: 0
        }}
      >
        <Fragment>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ThemeProvider theme={defaultMaterialTheme}>
              <KeyboardTimePicker
                // autoOk
                // label='12 hours'
                variant='static'
                // openTo='hours'
                value={time}
                KeyboardButtonProps={{
                  'aria-label': 'change time'
                }}
                id='time-picker'
                label='Time picker'
                autoOk={false}
                // ampm={false}
                onAccept={() => {
                  console.log('wooo');
                  // props.onConfirm(time);
                }}
                orientation='landscape'
                onChange={time => {
                  // console.log('ggg', time);
                  changeTime(time);

                  // console.log('ddddddd', time);
                }}
                // onAccept={props.onAccept}
                onClose={props.onClose}
              />
              <View
                style={{
                  backgroundColor: 'white',
                  maxWidth: 492,
                  width: '100%'
                }}
              >
                <Button
                  mode='contained'
                  onPress={() => {
                    props.onConfirm(time);
                  }}
                >
                  Add
                </Button>
              </View>
            </ThemeProvider>
          </MuiPickersUtilsProvider>
        </Fragment>
      </Modal>
    </View>
  );
};

export default TimePicker3;
