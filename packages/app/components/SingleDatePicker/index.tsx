/**
 *
 * SingleDatePicker
 *
 */

import React, { memo, useState } from 'react';
import { View } from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { makeSelectSingleDatePicker } from './ducks';
import { SingleDatePickerProps } from './types';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';
import { Portal, Dialog, Button, Appbar, IconButton } from 'react-native-paper';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import moment from 'moment';
import styles from './styles';
import { injectIntl } from 'react-intl';
import messages from './messages';
import 'date-fns';

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
const date = new Date();

const SingleDatePicker = (props: SingleDatePickerProps) => {
  useInjectSaga({ key: 'multiSelect', saga });

  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2020-03-30T21:11:54')
  );

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  // Show & Hide SingleDatePickerPage
  const [showDate, setShowDate] = useState({ visible: false });
  const _showSingleDatePicker = () => setShowDate({ visible: true });
  const _hideSingleDatePicker = () => setShowDate({ visible: false });

  const [datePicker, setDatePicker] = useState({ selectedDay: date });
  const handleDayClick = (day, cc) => {
    const nowDate = moment();
    const newDate = moment(day);
    const diff = newDate.diff(nowDate, 'days');
    setState(diff + 1);
    setDatePicker({
      selectedDay: day
    });
  };

  const Weekday = ({ weekday, className, localeUtils, locale }) => {
    const weekdayName = localeUtils.formatWeekdayLong(weekday, locale);
    return (
      <div className={className} title={weekdayName}>
        {weekday} {weekdayName.slice(0, 1)}
      </div>
    );
  };

  const [state, setState] = useState(1);

  props.selectedDate(datePicker.selectedDay);

  return (
    <View>
      {/* {console.log('props', props.selectedDate(datePicker.selectedDay))} */}
      {/* <Appbar.Header
        style={{ backgroundColor: 'white', borderColor: 'red', borderWidth: 1 }}
      >
        <Appbar.Action
          icon="keyboard-arrow-left"
          size={30}
          onPress={() => {
            if (state >= 0) {
              setDatePicker({ selectedDay: date.addDays(state - 1) });
              setState(state - 1);
            }
          }}
          disabled={state >= 0 ? false : true}
        />
        <Appbar.Content
          title={datePicker.selectedDay.toLocaleDateString()}
          titleStyle={{ textAlign: 'center' }}
          onPress={_showSingleDatePicker}
        />
        <Appbar.Action
          icon="keyboard-arrow-right"
          size={30}
          onPress={() => {
            setDatePicker({ selectedDay: date.addDays(state + 1) });
            setState(state + 1);
          }}
          disabled={state > 178 ? true : false}
        />
      </Appbar.Header> */}
      <View
        style={{
          height: 55,
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1
        }}
      >
        <View
          style={{
            flex: 1,
            paddingLeft: 5
          }}
        >
          <IconButton
            icon="chevron-left"
            size={30}
            onPress={() => {
              if (state >= 0) {
                setDatePicker({ selectedDay: date.addDays(state - 1) });
                setState(state - 1);
              }
            }}
            disabled={state > 1 ? false : true}
          />
        </View>
        <View
          style={{
            flex: 4
          }}
        >
          <Button
            Type="text"
            children={datePicker.selectedDay.toLocaleDateString()}
            onPress={_showSingleDatePicker}
            labelStyle={{ textAlign: 'center', color: 'black', fontSize: 18 }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            paddingRight: 5
          }}
        >
          <Appbar.Action
            icon="chevron-right"
            color="black"
            size={30}
            onPress={() => {
              setDatePicker({ selectedDay: date.addDays(state + 1) });
              setState(state + 1);
            }}
            disabled={state > 178 ? true : false}
          />
        </View>
      </View>

      <Portal>
        <Dialog
          style={styles.popup}
          visible={showDate.visible}
          onDismiss={_hideSingleDatePicker}
        >
          <Dialog.Content>
            <DayPicker
              disabledDays={{
                before: date,
                after: date.addDays(180)
              }}
              selectedDays={datePicker.selectedDay}
              onDayClick={handleDayClick}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              style={{ marginRight: 20, marginBottom: 7 }}
              onPress={_hideSingleDatePicker}
            >
              {props.intl.formatMessage(messages.done)}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  memo,
  injectIntl
)(SingleDatePicker);
