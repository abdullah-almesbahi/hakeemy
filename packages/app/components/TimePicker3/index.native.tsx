/**
 *
 * TimePicker3
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

const TimePicker3 = props => {
  return (
    <View>
      <DateTimePicker
        isVisible={true}
        onConfirm={a => props[0].onConfirm(a)}
        onCancel={() => props[0].onCancel()}
        mode='time'
      />
    </View>
  );
};

export default TimePicker3;
