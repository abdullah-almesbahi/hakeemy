/**
 *
 * TestPage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';
// import { useInjectReducer } from '../../utils/injectReducer';
import reducer, {
  makeSelectHospitalDoctorsSchedulePage,
  loadDoctorsSchedules,
  schedule,
  createSchedule,
  times,
  deleteSchedule
} from './ducks';
import { HospitalDoctorsSchedulePageProps } from './types';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';

import { injectIntl, FormattedMessage } from 'react-intl';
import messages from './messages';

import styles from './styles';
import {
  Appbar,
  IconButton,
  Surface,
  List,
  Chip,
  FAB,
  Portal,
  Dialog,
  Button,
  Avatar,
  Paragraph
} from 'react-native-paper';
import { ROUTE_ADD_DOCTOR_SCHEDULE } from '../../utils/constants';
import SingleDatePicker from '../../components/SingleDatePicker';
import { makeSelectUser } from '../User/ducks';
import LoadingIndicator from '../../components/LoadingIndicator';
import SafeAreaView from 'react-native-safe-area-view';
import { themeHospital } from '../App/themes';
import TimePicker3 from '../../components/TimePicker3';
import moment from 'moment';

import makeGrid from '../../components/Grid';
import AppbarTitle from '../../components/AppbarTitle';
import { Helmet } from '../../components';
import { getSiteName, getLocalizeRoute } from '../../utils/helper';
import HospitalBottomNavigation from '../../components/HospitalBottomNavigation';

const Grid = makeGrid(16); // gutter size

const HospitalDoctorsSchedulePage: React.SFC<
  HospitalDoctorsSchedulePageProps
> = props => {
  // useInjectReducer({ key: 'hospitalDoctorsSchedulePage', reducer });
  useInjectSaga({ key: 'hospitalDoctorsSchedulePage', saga });
  const [dialog, setDialog] = useState(false);
  const _showDialog = () => setDialog(true);
  const _hideDialog = () => setDialog(false);

  const [state, setState] = useState({
    timePicker: '',
    isTimePickerVisible: false,
    selectedTime: '',
    deleteId: 0
  });

  useEffect(() => {
    props.loadDoctorsSchedules(props.user.api_key);
  }, [props.schedulespage.reload]);

  // Random colors for avatar
  const stringToColor = string => {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    return color;
  };

  const header = () => (
    <AppbarTitle title={props.intl.formatMessage(messages.schedules)} />
  );

  // console.log('props', props);
  const content = () =>
    (props.schedulespage.data &&
      props.schedulespage.data.length == 0 &&
      props.schedulespage.error == '') ||
    props.schedulespage.loading ? (
      <>
        {header()}
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <LoadingIndicator />
        </View>
      </>
    ) : props.schedulespage.data &&
      props.schedulespage.data.length === 0 &&
      props.schedulespage.error == 'no schedule exist' ? (
      <>
        {header()}
        <Helmet
          titleTemplate={getSiteName()}
          title={props.intl.formatMessage(messages.schedules)}
        />
        <View
          style={{
            // minHeight: '100%',

            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text>
            <FormattedMessage {...messages.noScheduleExist} />
          </Text>
        </View>
        <FAB
          style={[
            { backgroundColor: themeHospital.colors.primary },
            styles.fab
          ]}
          icon='plus'
          onPress={() => {
            props.push(getLocalizeRoute(ROUTE_ADD_DOCTOR_SCHEDULE));
          }}
          // color='white'
        />
      </>
    ) : (
      <View style={styles.container}>
        {header()}
        <Grid.Container
          style={{
            flex: 1
          }}
        >
          <Grid.Row style={{ flex: 1 }}>
            <Grid.Col
              style={{
                flex: 1,
                // borderWidth: 1,
                // borderColor: 'red',
                // minHeight: '100%',
                position: 'relative'
              }}
            >
              <ScrollView>
                <View style={styles.bodyContainer}>
                  {props.schedulespage.data.map(d =>
                    d.schedule_time && d.schedule_time.length > 0 ? (
                      <Surface
                        key={d.id}
                        style={{
                          elevation: 1,
                          marginTop: 1
                          // borderRadius: 3
                        }}
                      >
                        <List.Item
                          key={d.id}
                          title={
                            <Text style={{ fontSize: 20, marginBottom: 10 }}>
                              {d.name}
                            </Text>
                          }
                          left={() => [
                            <View>
                              {/* <Avatar.Text
                        label={d.name.slice(0, 1).toLocaleUpperCase()}
                        color={'#ffffff'}
                        size={45}
                        style={{
                          backgroundColor: stringToColor(d.name)
                        }}
                      /> */}
                              {d.picture != null ? (
                                <Avatar.Image
                                  source={{
                                    uri: `https://old.hakeemy.com/uploads/doctor_image/${
                                      d.picture
                                    }`
                                  }}
                                />
                              ) : d.gender == 'male' ? (
                                <Avatar.Image
                                  source={require('../../images/male_dr.jpg')}
                                />
                              ) : (
                                <Avatar.Image
                                  source={require('../../images/female_dr.jpg')}
                                />
                              )}
                            </View>
                          ]}
                          description={moment(d.date).format('YYYY-MM-DD')}
                          right={() => (
                            <IconButton
                              style={{ alignSelf: 'center' }}
                              icon='plus-circle'
                              color='#6c6c6c'
                              size={30}
                              onPress={() => {
                                setState({
                                  ...state,
                                  isTimePickerVisible: true
                                });
                                props.schedule([
                                  d.doctor_id,
                                  moment(d.date).format('YYYY-MM-DD'),
                                  props.user.api_key
                                ]);
                              }}
                            />
                          )}
                        />
                        <View
                          style={{
                            marginBottom: 15,
                            marginHorizontal: 15,
                            flexDirection: 'row',
                            alignItems: 'center'
                          }}
                        >
                          <ScrollView horizontal={true}>
                            {d.schedule_time.map(t => (
                              <Chip
                                key={t.id}
                                onClose={() => {
                                  _showDialog();
                                  setState({ ...state, deleteId: t.id });
                                }}
                                style={{ marginRight: 8 }}
                              >
                                {t.shedule_time}
                              </Chip>
                            ))}
                          </ScrollView>
                        </View>
                      </Surface>
                    ) : null
                  )}
                </View>
              </ScrollView>
              {state.isTimePickerVisible ? (
                <TimePicker3
                  onConfirm={time => {
                    // console.log('time', time);
                    setState({
                      ...state,
                      selectedTime: time,
                      isTimePickerVisible: false
                    });
                    props.SelectedTime(time);
                    props.createSchedule();
                  }}
                  onCancel={() => {
                    setState({
                      ...state,
                      isTimePickerVisible: false
                    });
                  }}
                />
              ) : // web
              // <TimePicker3
              //   onChange={time => {
              //     setState({
              //       ...state,
              //       selectedTime: time
              //     });
              //     props.timeSelected(time);
              //   }}
              //   onClose={() => {
              //     setState({
              //       ...state,
              //       isTimePickerVisible: false
              //     });
              //     props.createSchedule();
              //   }}
              // />
              null}
              <FAB
                style={[
                  { backgroundColor: themeHospital.colors.primary },
                  styles.fab
                ]}
                icon='plus'
                onPress={() => {
                  props.push(getLocalizeRoute(ROUTE_ADD_DOCTOR_SCHEDULE));
                }}
              />
            </Grid.Col>
          </Grid.Row>
        </Grid.Container>
        <Portal>
          <Dialog
            visible={dialog}
            onDismiss={_hideDialog}
            style={{ maxWidth: 500, marginHorizontal: 'auto' }}
          >
            <Dialog.Title>
              {props.intl.formatMessage(messages.confirmDeleteTitle)}
            </Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                {props.intl.formatMessage(messages.confirmDelete)}
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={_hideDialog}>
                {props.intl.formatMessage(messages.cancel)}
              </Button>
              <Button
                onPress={() => {
                  // props.showSnackbar(
                  //   props.intl.formatMessage(messages.successfullySignedOut)
                  // );
                  // props.push(ROUTE_LAUNCHER);
                  props.deleteSchedule({
                    schedule_id: state.deleteId,
                    api_key: props.user.api_key
                  });
                  _hideDialog();
                }}
                mode='contained'
              >
                {props.intl.formatMessage(messages.delete)}
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );

  return (
    <HospitalBottomNavigation tab='schedules'>
      {content()}
    </HospitalBottomNavigation>
  );
};

const mapStateToProps = createStructuredSelector({
  schedulespage: makeSelectHospitalDoctorsSchedulePage(),
  user: makeSelectUser()
});

function mapDispatchToProps(dispatch) {
  return {
    push: page => dispatch(push(page)),
    loadDoctorsSchedules: api_key => dispatch(loadDoctorsSchedules(api_key)),
    schedule: data => dispatch(schedule(data)),
    SelectedTime: time => dispatch(times(time)),
    createSchedule: () => dispatch(createSchedule()),
    deleteSchedule: data => dispatch(deleteSchedule(data))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  injectIntl,
  memo
)(HospitalDoctorsSchedulePage);
