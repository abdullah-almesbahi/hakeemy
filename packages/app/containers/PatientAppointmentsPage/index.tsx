/**
 *
 * MyAppointmentsPage
 *
 */

import React, { memo } from 'react';
import { View, ScrollView, I18nManager } from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';
// import { useInjectReducer } from 'utils/injectReducer';
import reducer, {
  loadMyAppointments,
  makeSelectMyAppointmentsPage
} from './ducks';
import { MyAppointmentsPageProps } from './types';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { ROUTE_DOCTOR_PROFILE } from '../../utils/constants';

import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

import styles from './styles';
import { List, Surface, Avatar, IconButton, Button } from 'react-native-paper';
import { MaterialCommunityIcons, Helmet } from '../../components';
import { makeSelectUser } from '../User/ducks';
import { useEffect } from 'react';
import LoadingIndicator from '../../components/LoadingIndicator';
import SafeAreaView from 'react-native-safe-area-view';
import NoRecords from '../../components/NoRecords';
import Text from '../../components/Text';
import moment from 'moment';
import makeGrid from '../../components/Grid';
import AppbarTitle from '../../components/AppbarTitle';
import { getSiteName, getLocalizeRoute } from '../../utils/helper';
import PatientBottomNavigation from '../../components/PatientBottomNavigation';

const Grid = makeGrid(16); // gutter size

const MyAppointmentsPage = (props: MyAppointmentsPageProps) => {
  // useInjectReducer({ key: 'myAppointmentsPage', reducer });
  useInjectSaga({ key: 'myAppointmentsPage', saga });

  useEffect(() => {
    props.loadMyAppointments(props.user.api_key);
  }, []);
  // console.log('props', props);
  const getAppointments = () => {
    let data = [];

    if (
      props.myAppointmentsPage.myAppointments.length > 0 &&
      props.myAppointmentsPage.myAppointments[0].doctor_id > 0
    ) {
      let appointments = props.myAppointmentsPage.myAppointments;

      for (let property in appointments) {
        if (appointments.hasOwnProperty(property)) {
          data[property] = (
            //---------------------
            <Surface
              key={appointments[property].id}
              style={{
                elevation: 1,
                marginBottom: 1,
                borderRadius: 3,
                borderWidth: 1,
                borderColor: '#f2f2f2'
              }}
            >
              <List.Item
                title={
                  <Text style={{ fontSize: 20 }}>
                    {I18nManager.isRTL
                      ? appointments[property].doctor_arabic
                      : appointments[property].doctor_name}
                  </Text>
                }
                onPress={() =>
                  props.push(
                    getLocalizeRoute(
                      ROUTE_DOCTOR_PROFILE +
                        `/${appointments[property].doctor_id}/1/?myAppintment`
                    )
                  )
                }
                description={p => (
                  <View>
                    {/* <Text
                        style={{
                          color: 'gray',
                          marginTop: 5
                        }}
                      >
                        speciality
                      </Text> */}
                    <Text
                      style={{
                        color: 'gray',
                        marginTop: 5
                      }}
                    >
                      {I18nManager.isRTL
                        ? appointments[property].name_arabic
                        : appointments[property].name}

                      {/* {d.doctor_address[0].hospital} */}
                    </Text>
                    <View>
                      {/* <StarRating
                        disabled={true}
                        maxStars={5}
                        halfStar="star-half"
                        emptyStar="star-outline"
                        rating={state.starCount}
                        selectedStar={rating => onStarRatingPress(rating)}
                        starSize={18}
                        starStyle={{
                          color: "gray",
                          marginTop: 5,
                          justifyContent: "flexEnd"
                        }}
                      /> */}
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 5
                      }}
                    >
                      <MaterialCommunityIcons
                        name='map-marker-outline'
                        color='gray'
                        size={23}
                      />
                      <Text
                        style={{
                          color: 'gray',
                          marginLeft: 5,
                          fontSize: 12,
                          textAlign: 'left'
                        }}
                      >
                        {I18nManager.isRTL
                          ? appointments[property].address_arabic
                          : appointments[property].address}

                        {/* {d.doctor_address[0].location} */}
                      </Text>
                    </View>
                  </View>
                  //----
                )}
                // onPress={() => {
                // props.push(ROUTE_DOCTOR_PROFILE + "/" + d.id);
                // }}
                left={() => (
                  <View>
                    {appointments[property].picture ? (
                      <Avatar.Image
                        source={{ uri: appointments[property].picture }}
                      />
                    ) : null}
                    {!appointments[property].picture &&
                    appointments[property].gender == 'male' ? (
                      <Avatar.Image
                        source={require('../../images/male_dr.jpg')}
                      />
                    ) : null}
                    {!appointments[property].picture &&
                    appointments[property].gender == 'female' ? (
                      <Avatar.Image
                        source={require('../../images/female_dr.jpg')}
                      />
                    ) : null}

                    {/* <View
                        style={{
                          backgroundColor: '#4fa5d6',
                          borderRadius: 50,
                          marginTop: 7
                        }}
                      >
                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: 9,
                            color: 'white',
                            marginVertical: 2,
                            marginHorizontal: 5
                          }}
                        >
                          designation
                    </Text>
                      </View> */}
                  </View>
                )}
                // right={() => (
                //   <Button
                //     onPress={() =>
                //       props.push(
                //         ROUTE_DOCTOR_PROFILE +
                //           `/${appointments[property].doctor_id}?myAppintment`
                //       )
                //     }
                //   >
                //     aaa
                //   </Button>
                // )}
                // })

                //   ROUTE_DOCTOR_PROFILE +
                // `/${doctorId}?appintmentTime=${appintmentTime}`

                // }
                //---------

                // right={props => (
                //   <IconButton
                //     icon="call"
                //     color="#4fa5d6"
                //     size={23}
                //     // onPress={() => openURL("tel:" + d.phone)}
                //   />
                // )}
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
                  marginTop: 13,
                  marginBottom: 15,
                  marginHorizontal: 15,
                  flexDirection: 'row',
                  alignItems: 'flex-end'
                }}
              >
                <View
                  style={{
                    alignItems: 'flex-start',
                    flex: 3
                  }}
                >
                  <View>
                    <Text style={{ color: 'gray' }}>
                      <FormattedMessage {...messages.dateTime} />
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 5
                    }}
                  >
                    <MaterialCommunityIcons name='calendar-range' size={15} />
                    <Text
                      style={{ marginLeft: 5, fontSize: 12, marginBottom: 2 }}
                    >
                      {appointments[property].apointment_date &&
                      appointments[property].apointment_date.length > 12
                        ? moment(appointments[property].date).format(
                            ' DD-MM-YYYY'
                          )
                        : appointments[property].apointment_date}
                    </Text>
                    <MaterialCommunityIcons
                      style={{ marginLeft: 10 }}
                      name='clock-outline'
                      size={15}
                    />
                    <Text
                      style={{ marginLeft: 5, fontSize: 12, marginBottom: 2 }}
                    >
                      {appointments[property].apointment_time}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    alignItems: 'flex-end',
                    flex: 2
                  }}
                >
                  <View>
                    <Text style={{ color: 'gray' }}>
                      <FormattedMessage {...messages.status} />
                    </Text>
                  </View>
                  <View style={{ marginTop: 5 }}>
                    <Text>
                      {appointments[property].status == 0 ? (
                        'a'
                      ) : appointments[property].status == 1 ? (
                        <FormattedMessage {...messages.approved} />
                      ) : appointments[property].status == 2 ? (
                        <FormattedMessage {...messages.pending} />
                      ) : appointments[property].status == 3 ? (
                        <FormattedMessage {...messages.rejected} />
                      ) : null}
                    </Text>
                  </View>
                </View>
              </View>
            </Surface>
          );
        }
      }
    }
    return data;
  };

  const content = () => (
    // <SafeAreaView style={styles.container}>
    <>
      <AppbarTitle title={props.intl.formatMessage(messages.title)} />
      <Helmet
        titleTemplate={getSiteName()}
        title={props.intl.formatMessage(messages.title)}
      />
      <Grid.Container>
        <Grid.Row>
          <Grid.Col>
            {props.myAppointmentsPage.loading ? (
              <LoadingIndicator />
            ) : props.myAppointmentsPage.myAppointments.length === 0 ? (
              <NoRecords />
            ) : (
              <ScrollView style={styles.bodyContainer}>
                {getAppointments()}
                <View style={{ marginBottom: 30 }} />
              </ScrollView>
            )}
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    </>
    // </SafeAreaView>
  );

  return (
    <PatientBottomNavigation tab='appointments'>
      {content()}
    </PatientBottomNavigation>
  );
};

const mapStateToProps = createStructuredSelector({
  myAppointmentsPage: makeSelectMyAppointmentsPage(),
  user: makeSelectUser()
});

function mapDispatchToProps(dispatch) {
  return {
    push: page => dispatch(push(page)),
    loadMyAppointments: api_key => dispatch(loadMyAppointments(api_key))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  injectIntl
)(MyAppointmentsPage);
