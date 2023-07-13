/**
 *
 * SingleDatePicker
 *
 */

import React, { memo, useState } from 'react';
import { View, Text, Modal, Platform, I18nManager } from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { makeSelectSingleDatePicker } from './ducks';
import { SingleDatePickerProps } from './types';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';

import {
  Portal,
  Dialog,
  Paragraph,
  Button,
  Appbar,
  IconButton,
  Surface
} from 'react-native-paper';

import DayPicker from 'react-day-picker';

import moment from 'moment';
import styles from './styles';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { store } from '../../App';

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
const date = new Date();
// const lang = store.getState().language.locale;
// console.log('lang', lang);
const SingleDatePicker = (props: SingleDatePickerProps) => {
  useInjectSaga({ key: 'multiSelect', saga });

  const [datePicker, setDatePicker] = useState({ selectedDay: date });
  const [isDateTimePickerVisible, setDateTimePickerVisible] = useState({
    visible: false
  });
  const [state, setState] = useState(1);

  const showDateTimePicker = () => {
    setDateTimePickerVisible({ visible: true });
  };

  const hideDateTimePicker = () => {
    setDateTimePickerVisible({ visible: false });
  };

  const handleDatePicked = date => {
    setDatePicker({ selectedDay: date });
    const nowDate = moment();
    const newDate = moment(date);
    const diff = newDate.diff(nowDate, 'days');
    setState(diff + 1);
    hideDateTimePicker();
  };

  props.selectedDate(datePicker.selectedDay);

  return (
    <View>
      <View
        style={{
          height: 55,
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
          marginTop: 20
        }}
      >
        <View
          style={{
            flex: 1,
            paddingLeft: 5
            // borderWidth: 1,
            // borderColor: 'green'
          }}
        >
          <IconButton
            icon={I18nManager.isRTL ? 'chevron-right' : 'chevron-left'}
            // icon="chevron-left"
            size={30}
            onPress={() => {
              if (state >= 0) {
                setDatePicker({
                  selectedDay: datePicker.selectedDay.addDays(-1)
                });
                setState(state - 1);
              }
            }}
            disabled={state > 1 ? false : true}
          />
        </View>
        <View
          style={{
            flex: 4
            // borderWidth: 1,
            // borderColor: 'red'
          }}
        >
          <View
            style={{
              height: 25,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Appbar.Content
              title={datePicker.selectedDay.toLocaleDateString()}
              color="gray"
              titleStyle={{ textAlign: 'center', fontSize: 21 }}
              onPress={showDateTimePicker}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            // justifyContent: 'flex-end',
            // alignItems: 'flex-end',
            paddingRight: 5
          }}
        >
          <Appbar.Action
            icon={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'}
            // icon="chevron-right"
            color="black"
            size={30}
            onPress={() => {
              setDatePicker({
                selectedDay: datePicker.selectedDay.addDays(+1)
              });
              setState(state + 1);
            }}
            disabled={state > 178 ? true : false}
          />
        </View>
      </View>
      <DateTimePicker
        isVisible={isDateTimePickerVisible.visible}
        onConfirm={handleDatePicked}
        onCancel={hideDateTimePicker}
        date={datePicker.selectedDay}
        minimumDate={new Date()}
        maximumDate={new Date().addDays(+179)}
      />
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  multiSelect: makeSelectSingleDatePicker()
});

function mapDispatchToProps(dispatch) {
  return {
    push: page => dispatch(push(page))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(SingleDatePicker);
