import React, { memo, useState } from 'react';
import { View, Modal } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import saga from './saga';
import { useInjectSaga } from '../../utils/injectSaga';
import { makeSelectMultiDatePicker } from './ducks';
import { MultiDatePickerProps } from './types';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
import { TextInput, Button, Surface } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { themeHospital } from '../../containers/App/themes';
import styles from './styles';
import messages from './messages';
import { FormattedMessage } from 'react-intl';

const MultiDatePicker = (props: MultiDatePickerProps) => {
  useInjectSaga({ key: 'multiSelect', saga });

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [handleDay, setHandleDay] = useState({});
  const dateInput = React.useRef(null);

  const showDatePicker = () => {
    dateInput.current.blur();
    setDatePickerVisible(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDatePicked = date => {
    // setHandleDay({ date });
    hideDatePicker();
  };

  Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  const handleDayClick = day => {
    if (handleDay.hasOwnProperty(day.dateString)) {
      const allSelected = { ...handleDay };
      delete allSelected[day.dateString];
      setHandleDay(allSelected);
    } else {
      setHandleDay({
        ...handleDay,
        [day.dateString]: {
          selected: true,
          selectedColor: themeHospital.colors.primary
        }
      });
    }
  };

  return (
    <>
      <TextInput
        mode={props.mode}
        label={props.label}
        onFocus={() => showDatePicker()}
        value={
          Object.keys(handleDay) == ''
            ? null
            : Object.keys(handleDay).join(', ')
        }
        theme={props.theme}
        ref={dateInput}
      />

      <Modal
        visible={isDatePickerVisible}
        transparent={true}
        animationType='fade'
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)'
          }}
        >
          <Surface style={styles.surface}>
            <Calendar
              minDate={new Date()}
              maxDate={new Date().addDays(180)}
              onDayPress={day => {
                handleDayClick(day);
              }}
              markedDates={handleDay}
              theme={{
                todayTextColor: themeHospital.colors.primary,
                arrowColor: themeHospital.colors.primary
              }}
            />
            <Button
              mode='text'
              style={{ alignItems: 'flex-end', paddingHorizontal: 15 }}
              color={props.color}
              onPress={() => {
                props.setFieldValue(
                  `${props.value}`,
                  Object.keys(handleDay).join(', ')
                );
                hideDatePicker();
              }}
            >
              {/* <FormattedMessage {...messages.hide} /> */}
              Select
            </Button>
          </Surface>
        </View>
      </Modal>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  multiSelect: makeSelectMultiDatePicker()
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
)(MultiDatePicker);
