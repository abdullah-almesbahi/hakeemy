/**
 *
 * TimePicker2
 *
 */

import React, { useState, useRef } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';
import { View } from 'react-native';
import { compose } from 'redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { TextInput } from 'react-native-paper';

const TimePicker2 = props => {
  const [state, setState] = useState({
    timePicker: '',
    isTimePickerVisible: false
  });

  const timeInputRef = useRef(null);

  return (
    <View>
      <TextInput
        label={<FormattedMessage {...messages.time} />}
        mode="outlined"
        name="time"
        value={props.value}
        onFocus={() => {
          setState({
            ...state,
            isTimePickerVisible: true
          });

          if (timeInputRef.current && timeInputRef.current.root) {
            timeInputRef.current.root.blur();
          }
          // timeInputRef.current._root.blur();
        }}
        theme={{
          colors: {
            background: 'white'
          }
        }}
        ref={timeInputRef}
      />
      <DateTimePicker
        isVisible={state.isTimePickerVisible}
        titleIOS={props.intl.formatMessage(messages.pickTime)}
        onConfirm={(time: any) => {
          setState({
            ...state,
            isTimePickerVisible: false
          });
          props.onChange(time);
        }}
        onCancel={() => {
          setState({
            ...state,
            isTimePickerVisible: false
          });
        }}
        mode="time"
      />
    </View>
  );
};

export default compose(injectIntl)(TimePicker2);
