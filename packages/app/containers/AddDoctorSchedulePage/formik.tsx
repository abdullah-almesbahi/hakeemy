import React, { useState } from 'react';
import { Formik, FieldArray } from 'formik';
import * as yup from 'yup';
import messages from './messages';
import { FormattedMessage } from 'react-intl';
import { FormAddDoctorSchedulePageProps } from './types';
import Header from '../../components/Header';
import {
  HelperText,
  Button as Buttonx,
  Appbar,
  IconButton,
  TouchableRipple
} from 'react-native-paper';
import styles from './styles';
import { View, ScrollView } from 'react-native';
import { ROUTE_HOSPITAL_SCHEDULES } from '../../utils/constants';
import MultiSelect from '../../components/MultiSelect';
import '../../components/DayPicker';
import MultiDatePicker from '../../components/MultiDatePicker';
import 'date-fns';
import { createMuiTheme } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import TimePicker2 from '../../components/TimePicker2';
import TimePicker3 from '../../components/TimePicker3';
import { themeHospital } from '../App/themes';
import moment from 'moment';
import { Platform } from '../../components/Platform';

import makeGrid from '../../components/Grid';
import { getLocalizeRoute } from '../../utils/helper';

const Grid = makeGrid(16); // gutter size

const FormAddDoctorSchedulePage: React.SFC<FormAddDoctorSchedulePageProps> = ({
  intl,
  onSubmit,
  push,
  ...props
}) => {
  const [enable, setEnable] = useState(false);

  const DefaultFields = {
    doctors: '',
    date: '',
    time: [],
    api_key: props.api_key
  };
  const Schema = yup.object().shape({
    doctors: yup
      .string()
      .required(intl.formatMessage(messages.selectDoctorRequired)),
    date: yup.string().required(intl.formatMessage(messages.dateRequired)),
    time: yup.string().required(intl.formatMessage(messages.timeRequired))
  });

  return (
    <Formik
      initialValues={DefaultFields}
      validationSchema={Schema}
      render={({
        values,
        errors,
        error,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        ...other
      }) => {
        {
          // console.log('valuesdddddd', values);
        }

        return (
          <>
            <Header
              style={{
                backgroundColor: themeHospital.colors.primary
              }}
              push={push}
              title={intl.formatMessage(messages.addScheduleTitle)}
              left={
                <Appbar.BackAction
                  // color='white'
                  onPress={() =>
                    push(getLocalizeRoute(ROUTE_HOSPITAL_SCHEDULES))
                  }
                />
              }
              right={
                <Appbar.Action
                  icon='check'
                  // color='white'
                  onPress={() => {
                    handleSubmit();
                  }}
                />
              }
            />

            <ScrollView>
              <Grid.Container>
                <Grid.Row>
                  <Grid.Col>
                    <View style={styles.bodyContainer}>
                      <MultiSelect
                        // leftIcon="clear"
                        // rightIcon=""check""
                        // iconColor="white"
                        style={{
                          backgroundColor: themeHospital.colors.primary
                        }}
                        title={
                          <FormattedMessage
                            {...messages.addScheduleMultiSelectTitle}
                          />
                        }
                        label={<FormattedMessage {...messages.selectDoctor} />}
                        mode='outlined'
                        theme={{
                          colors: {
                            background: 'white'
                          }
                        }}
                        options={
                          props.doctors && props.doctors.length > 0
                            ? props.doctors.map(d => ({
                                label: d.name,
                                value: d.id
                              }))
                            : null
                        }
                        onSubmit={setFieldValue}
                        value={'doctors'}
                        selectCheckbox={props.selectCheckbox}
                        unselectCheckbox={props.unselectCheckbox}
                        selectedCheckedbox={props.selectedCheckedbox}
                      />
                      <HelperText
                        type='error'
                        visible={
                          errors.doctors && touched.doctors ? true : false
                        }
                      >
                        {errors.doctors}
                      </HelperText>
                      <MultiDatePicker
                        label={<FormattedMessage {...messages.date} />}
                        color={themeHospital.colors.primary}
                        mode='outlined'
                        theme={{
                          colors: {
                            background: 'white'
                          }
                        }}
                        style={{
                          backgroundColor: themeHospital.colors.primary
                        }}
                        setFieldValue={setFieldValue}
                        value='date'
                      />
                      <HelperText
                        type='error'
                        visible={errors.date && touched.date ? true : false}
                      >
                        {errors.date}
                      </HelperText>
                      <FieldArray
                        name='time'
                        render={arrayHelpers => (
                          <>
                            <TimePicker2
                              onChange={data => {
                                // console.log('object', data);
                                // console.log('data', data);
                                // console.log('111111', arrayHelpers);
                                setEnable(true);
                                arrayHelpers.replace(
                                  0,
                                  Platform.OS == 'web'
                                    ? data
                                    : moment(data).format('hh:mm A')
                                );
                                // arrayHelpers.replace(0, data.getTime());
                                // console.log('eee', arrayHelpers);
                              }}
                              value={values.time[0]}
                              style={{ marginTop: 8 }}
                              setFieldValue={setFieldValue}
                            />

                            {values.time.length > 1 ? (
                              <>
                                {values.time.slice(1).map((p, index) => (
                                  <View style={styles.timeContainer}>
                                    <TimePicker2
                                      onChange={data => {
                                        arrayHelpers.replace(
                                          index + 1,
                                          Platform.OS == 'web'
                                            ? data
                                            : moment(data).format('hh:mm A')
                                        );
                                      }}
                                      value={values.time[index + 1]}
                                    />
                                    <View style={styles.time}>
                                      <IconButton
                                        icon='close'
                                        color='gray'
                                        size={23}
                                        onPress={() =>
                                          arrayHelpers.remove(index + 1)
                                        }
                                      />
                                    </View>
                                  </View>
                                ))}
                              </>
                            ) : null}
                            {!enable ? null : (
                              <TouchableRipple
                                onPress={() => {
                                  arrayHelpers.insert(
                                    values.time.length,
                                    new Date()
                                  );
                                }}
                                style={{
                                  height: 52,
                                  marginTop: 15
                                }}
                              >
                                <Buttonx
                                  // style={styles.button}
                                  contentStyle={styles.contentStyleButton}
                                  mode='contained'
                                  onPress={() => {
                                    arrayHelpers.insert(
                                      values.time.length,
                                      new Date()
                                    );
                                  }}
                                >
                                  <FormattedMessage
                                    {...messages.addMoreTimesButton}
                                  />
                                </Buttonx>
                              </TouchableRipple>
                            )}
                          </>
                        )}
                      />
                      {/* this FieldArray developed fot web */}
                      {/* <FieldArray
                  name='time'
                  render={arrayHelpers => (
                    <>
                      <TimePicker2
                        onChange={data => {
                          setEnable(true);
                          arrayHelpers.replace(0, data.getTime());
                        }}
                        value={values.time[0]}
                        style={{ marginTop: 8 }}
                        setFieldValue={setFieldValue}
                      />

                      {values.time.length > 1 ? (
                        <>
                          {values.time.slice(1).map((p, index) => (
                            <View style={styles.timeContainer}>
                              <TimePicker2
                                onChange={data => {
                                  arrayHelpers.replace(
                                    index + 1,
                                    data.getTime()
                                  );
                                }}
                                value={values.time[index + 1]}
                              />
                              <View style={styles.time}>
                                <IconButton
                                  icon='close'
                                  color='gray'
                                  size={23}
                                  onPress={() => arrayHelpers.remove(index + 1)}
                                />
                              </View>
                            </View>
                          ))}
                        </>
                      ) : null}
                      {!enable ? null : (
                        <TouchableRipple
                          onPress={() => {
                            arrayHelpers.insert(values.time.length, new Date());
                          }}
                          style={{
                            height: 52,
                            marginTop: 15
                          }}
                        >
                          <Buttonx
                            style={styles.button}
                            contentStyle={styles.contentStyleButton}
                            mode='contained'
                            onPress={() => {
                              arrayHelpers.insert(
                                values.time.length,
                                new Date()
                              );
                            }}
                            dark={true}
                          >
                            <FormattedMessage
                              {...messages.addMoreTimesButton}
                            />
                          </Buttonx>
                        </TouchableRipple>
                      )}
                    </>
                  )}
                /> */}
                      <HelperText
                        type='error'
                        visible={errors.time && touched.time ? true : false}
                      >
                        {errors.time}
                      </HelperText>
                    </View>
                  </Grid.Col>
                </Grid.Row>
              </Grid.Container>
            </ScrollView>
          </>
        );
      }}
      onSubmit={onSubmit}
    />
  );
};

export default FormAddDoctorSchedulePage;
