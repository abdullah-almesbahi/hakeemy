/**
 *
 * MultiDatePicker
 *
 */

import React, { memo, useState } from 'react';
import { View } from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { makeSelectMultiDatePicker } from './ducks';
import { MultiDatePickerProps } from './types';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';

import { Portal, Dialog, Button, TextInput } from 'react-native-paper';
// import { DrawerContext } from '../../hooks/useDrawerContext';

import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import moment from 'moment';
import 'moment/locale/it';

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
const date = new Date();

const MultiDatePicker = (props: MultiDatePickerProps) => {
  useInjectSaga({ key: 'multiSelect', saga });
  // const openDrawer = React.useContext(DrawerContext);

  // Show & Hide MultiDatePickerPage
  const [showDate, setShowDate] = useState({ visible: false });
  const _showMultiDatePicker = () => setShowDate({ visible: true });
  const _hideMultiDatePicker = () => setShowDate({ visible: false });

  const [handleDay, setHandleDay] = useState({ selectDays: [] });

  const handleDayClick = (day, c) => {
    const { selectDays } = handleDay;

    if (c.selected) {
      const selectedIndex = selectDays.findIndex(selectedDay => {
        return DateUtils.isSameDay(selectedDay, day);
      });
      selectDays.splice(selectedIndex, 1);
    } else {
      if (!c.disabled) {
        selectDays.push(day);
      }
    }
    setHandleDay({ selectDays });
  };

  return (
    <View>
      <TextInput
        mode={props.mode}
        label={props.label}
        onFocus={() => _showMultiDatePicker()}
        value={
          handleDay.selectDays &&
          handleDay.selectDays.map(c => ' ' + c.value) == ''
            ? ''
            : handleDay.selectDays.map(c => {
                return moment(c.getTime()).format(' DD/MM/YYYY');
              })
        }
        theme={props.theme}
      />
      <Portal>
        <Dialog
          visible={showDate.visible}
          onDismiss={() => {}}
          style={{
            maxWidth: 500,
            marginRight: 'auto',
            marginLeft: 'auto'
          }}
        >
          <Dialog.Content
            style={{
              paddingBottom: -20
            }}
          >
            <DayPicker
              disabledDays={{
                before: date,
                after: date.addDays(180)
              }}
              selectedDays={handleDay.selectDays}
              onDayClick={handleDayClick}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              style={{ marginRight: 20, marginBottom: 7 }}
              // onPress={_hideMultiDatePicker}
              onPress={() => {
                props.setFieldValue(
                  `${props.value}`,
                  handleDay.selectDays.map(c => ' ' + c.value) == ''
                    ? ''
                    : handleDay.selectDays.map(c => {
                        return moment(c.getTime()).format('YYYY/MM/DD');
                      })
                );
                _hideMultiDatePicker();
              }}
            >
              Select
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
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
