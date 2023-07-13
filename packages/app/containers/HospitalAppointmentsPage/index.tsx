/**
 *
 * HospitalAppointmentsPage
 *
 */

import React, { useEffect, useState } from 'react';
import { View, ScrollView, I18nManager, Linking } from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  makeSelectHospitalAppointmentsPage,
  loadAppointmentsList,
  approveAppointment,
  deleteAppointment
} from './ducks';
import { HospitalAppointmentsPageProps } from './types';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

import styles from './styles';
import { makeSelectUser } from '../User/ducks';
import SafeAreaView from 'react-native-safe-area-view';
import { showSnackbar } from '../Snackbar/ducks';
import moment from 'moment';
import { themeHospital } from '../App/themes';

// Components
import LoadingIndicator from '../../components/LoadingIndicator';
import { Surface, List, IconButton, Avatar, Button } from 'react-native-paper';
import { MaterialCommunityIcons, Text, Helmet } from '../../components';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import HospitalBottomNavigation from '../../components/HospitalBottomNavigation';
import makeGrid from '../../components/Grid';
import AppbarTitle from '../../components/AppbarTitle';
import _has from 'lodash/has';

import { getSiteName } from '../../utils/helper';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const Grid = makeGrid(16); // gutter size

export const QueryAppointments = gql`
  query QueryAppointments(
    $where1: AppointmentWhereInput
    $where2: AppointmentWhereInput
  ) {
    current: appointments(where: $where1, orderBy: id_DESC, first: 50) {
      id
      doctorName
      doctorArabic
      apointmentDate
      apointmentTime
      status
      patientId {
        id
        name
        mobile
      }
      doctorId {
        id
        picture
        gender
      }
    }
    previous: appointments(where: $where2, orderBy: id_DESC, first: 50) {
      id
      doctorName
      doctorArabic
      apointmentDate
      apointmentTime
      status
      patientId {
        id
        name
        mobile
      }
      doctorId {
        id
        picture
        gender
      }
    }
  }
`;

const HospitalAppointmentsPage = (props: HospitalAppointmentsPageProps) => {
  useInjectSaga({ key: 'hospitalAppointmentsPage', saga });
  const { data, loading, error, refetch } = useQuery(QueryAppointments, {
    variables: {
      where1: {
        status_in: [1, 2]
        // apointmentDate_gte: new Date()
        //   .toISOString()
        //   .slice(0, 19)
        //   .replace('T', ' ')
      },
      where2: {
        status: 3
        // apointmentDate_gte: new Date()
        //   .toISOString()
        //   .slice(0, 19)
        //   .replace('T', ' ')
      }
    }
  });

  // const [state, setState] = useState({
  //   index: 0,
  //   routes: [
  //     {
  //       key: 'currentAppoitments',
  //       // title: props.intl.formatMessage(messages.currentAppoitments)
  //       title: 'eee'
  //     },
  //     {
  //       key: 'previousAppointments',
  //       title: 'eee'
  //       // title: props.intl.formatMessage(messages.previousAppointments)
  //     }
  //   ]
  // });

  // const [reLoad, setReLoad] = useState(0);

  // useEffect(() => {
  //   props.loadAppointmetsList(props.user.api_key);
  // }, [reLoad]);

  const openURL = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don't know how to open URI: ${url}`);
      }
    });
  };

  // Appointment Status discripton
  // case 0 waiting for SMS confirm
  // case 1: Approved
  // case 2: Pending
  // case 3: patiant did not confirm SMS OR canceled by hospital
  const getAppointments = data => {
    if (data.length > 0) {
      const _content = data.map(appointment => {
        // return (
        //   // <Surface style={styles.Surface} key={appointment.id}>
        //   <Text>sd</Text>
        //   // </Surface>
        // );
        return (
          <Surface style={styles.Surface} key={appointment.id}>
            <List.Item
              key={appointment.id}
              title={
                <Text style={{ fontSize: 20 }}>
                  {I18nManager.isRTL
                    ? appointment.nameArabic
                    : appointment.doctorName}
                </Text>
              }
              description={p => (
                <View>
                  {appointment.patientId != null &&
                  appointment.patientId.name ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 3
                      }}
                    >
                      <Button
                        icon='phone'
                        onPress={() => {
                          openURL('tel:' + appointment.patientId.mobile);
                        }}
                      >
                        {appointment.patientId.name}
                      </Button>
                    </View>
                  ) : null}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 5
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                      }}
                    >
                      <MaterialCommunityIcons name='calendar-range' size={15} />
                      <Text style={{ marginLeft: 5, fontSize: 12 }}>
                        {appointment.apointmentDate.length > 12
                          ? moment(appointment.apointmentDate).format(
                              ' DD-MM-YYYY'
                            )
                          : appointment.apointmentDate}
                      </Text>
                      <MaterialCommunityIcons
                        style={{ marginLeft: 10 }}
                        name='clock-outline'
                        size={15}
                      />
                      <Text style={{ marginLeft: 5, fontSize: 12 }}>
                        {appointment.apointmentTime}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
              left={() => [
                <View>
                  {appointment.doctorId != null &&
                  appointment.doctorId.picture != null ? (
                    <Avatar.Image
                      source={{
                        uri: `https://old.hakeemy.com/uploads/doctor_image/${
                          appointment.doctorId.picture
                        }`
                      }}
                    />
                  ) : appointment.doctorId != null &&
                    appointment.doctorId.gender == 'male' ? (
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
            />
            <View
              style={{
                borderTopColor: '#e3e3e3',
                borderTopWidth: 1,
                marginHorizontal: 15
              }}
            />
            <View
              style={{
                marginVertical: 10,
                marginHorizontal: 15,
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <View
                style={{
                  alignItems: 'flex-start',
                  flex: 3
                }}
              >
                <Text
                  style={{
                    marginTop: 5
                  }}
                >
                  {appointment.status == 1 ? (
                    <FormattedMessage {...messages.approved} />
                  ) : appointment.status == 2 ? (
                    <FormattedMessage {...messages.pending} />
                  ) : null}
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'flex-end',
                  marginHorizontal: 10
                }}
              >
                <Button
                  color='black'
                  mode='outlined'
                  onPress={() => {
                    props.deleteAppointment(appointment.id);
                    // setReLoad(reLoad + 1);
                    refetch();
                  }}
                >
                  <FormattedMessage {...messages.reject} />
                </Button>
              </View>
              {appointment.status == 2 ? (
                <View
                  style={{
                    alignItems: 'flex-end'
                  }}
                >
                  <Button
                    mode='contained'
                    color={themeHospital.colors.accent}
                    onPress={() => {
                      props.approveAppointment(appointment.id);
                      // setReLoad(reLoad + 1);
                      refetch();
                    }}
                    // icon="check"
                    theme={{ colors: { background: 'red' } }}
                  >
                    <FormattedMessage {...messages.accept} />
                  </Button>
                </View>
              ) : null}
            </View>
          </Surface>
        );
      });
      return (
        <Grid.Container style={{ flex: 1 }}>
          <Grid.Row style={{ flex: 1 }}>
            <Grid.Col style={{ flex: 1 }}>
              <ScrollView
                style={{
                  // marginTop: 15,
                  flex: 1
                }}
              >
                {/* <View style={styles.bodyContainer}>{_content} </View> */}
                {_content}
              </ScrollView>
            </Grid.Col>
          </Grid.Row>
        </Grid.Container>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text>{props.intl.formatMessage(messages.noAppointments)}</Text>
        </View>
      );
    }
  };

  return (
    // <SafeAreaView style={styles.container}>
    <View style={{ flex: 1 }}>
      <AppbarTitle title={props.intl.formatMessage(messages.appointments)} />
      <Helmet
        titleTemplate={getSiteName()}
        title={props.intl.formatMessage(messages.appointments)}
      />
      <HospitalBottomNavigation tab='appointments'>
        {loading ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <LoadingIndicator />
          </View>
        ) : (
          // get_Appointments()
          getAppointments(data.current)
        )}
      </HospitalBottomNavigation>
      {/* </SafeAreaView> */}
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  hospitalAppointmentsPage: makeSelectHospitalAppointmentsPage(),
  user: makeSelectUser(),
  appointmentsListPage: makeSelectHospitalAppointmentsPage()
});

function mapDispatchToProps(dispatch) {
  return {
    push: page => dispatch(push(page)),
    loadAppointmetsList: api_key => dispatch(loadAppointmentsList(api_key)),
    approveAppointment: appointment_id =>
      dispatch(approveAppointment(appointment_id)),
    deleteAppointment: appointment_id =>
      dispatch(deleteAppointment(appointment_id)),
    snackbar: message => dispatch(showSnackbar(message))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  injectIntl
)(HospitalAppointmentsPage);
