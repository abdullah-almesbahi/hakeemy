/**
 *
 * DoctorProfilePage
 *
 */

import React, { memo, useEffect, useState, useRef, useContext } from 'react';
import { View, ScrollView, Image, Linking, I18nManager } from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  makeSelectDoctorProfilePage,
  loadDoctorProfile,
  bookAppointment,
  confirmSms
} from './ducks';
import { DoctorProfilePageProps } from './types';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';
import { makeSelectUserType, makeSelectUser } from '../User/ducks';
import { Appbar, TouchableRipple } from 'react-native-paper';
import { FormattedMessage, injectIntl } from 'react-intl';
import styles from './styles';
import {
  ROUTE_SEARCH_LIST,
  ROUTE_PATIENT_LOGIN,
  ROUTE_HOSPITAL_LOGIN,
  ROUTE_LAUNCHER,
  ROUTE_DOCTOR_PROFILE
} from '../../utils/constants';
import StarRating from '../../components/StartRating';
import { themePatient, themeHospital } from '../App/themes';
import SingleDatePicker from '../../components/SingleDatePicker';
import moment from 'moment';
import LoadingIndicator from '../../components/LoadingIndicator';
import FormDoctorProfilePage from './Formik';
import FormconfirmSmsPage from './confirmSms';
import Header from '../../components/Header';
import messages from './messages';
import { style } from '@material-ui/system';
import { HOSPITAL_TYPE, PATIENT_TYPE } from '../../utils/constants';

import { Button, H2, H1, Text, Helmet } from '../../components';
import MapView from 'react-native-maps';
import Marker from '../../components/Marker';
import Pulse from '../../components/Pulse';
import { DEFAULT_MAP_PADDING } from '../../utils/constants';
import { Platform } from '../../components/Platform';
import _has from 'lodash/has';
import Geolocation from '@react-native-community/geolocation';
import { getTranslator } from '../../components/Translator';
import { setUserType } from '../User/ducks';
import { ThemeContext } from '../../hooks/useThemeContext';
import ShareButton from '../../components/ShareButton';
import { getSiteName, getLocalizeRoute } from '../../utils/helper';
import Share from '../../components/Share';

const DoctorProfilePage = (props: DoctorProfilePageProps) => {
  useInjectSaga({ key: 'doctorProfilePage', saga });

  const theme = useContext(ThemeContext);
  const mapRef: any = useRef(null);

  useEffect(() => {
    if (props.navigation) {
      props.loadDoctorProfile(props.navigation.state.params.id);
    } else if (
      props.history.location.search &&
      props.history.location.search.includes('appintmentTime')
    ) {
      setVisible(true);
      setScheduleId(
        props.history.location.search.slice(
          props.history.location.search.indexOf('appintmentTime') + 15,
          props.history.location.search.indexOf('appintmentTime') + 21
        )
      );
    } else {
      props.loadDoctorProfile(props.match.params.id);
    }
  }, []);

  const [rate, setRate] = useState({ starCount: 5 });
  const [date, setDate] = useState('');
  const [visible, setVisible] = useState(false);
  const [smsVisibility, setSmsVisibility] = useState(false);
  const [scheduleId, setScheduleId] = useState(null);

  const selectedDate = a => {
    setDate(a);
  };

  const onStarRatingPress = rating => {
    setRate({
      starCount: rating
    });
  };

  const openURL = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don't know how to open URI: ${url}`);
      }
    });
  };

  let handleOnPress = id => {
    setVisible(true);
    setScheduleId(id);
  };

  // const gotLocation = state.latitude && state.latitude !== 0 ? true : false;

  const openGoogleDirection = (scoordinate: string, ecoordinate: string) => {
    if (Platform.OS == 'ios') {
      var urlLocation = `http://maps.apple.com/?saddr=${scoordinate}&daddr=${ecoordinate}`;
    } else {
      var urlLocation = `https://www.google.com/maps/dir/${scoordinate}/${ecoordinate}`;
    }
    Linking.canOpenURL(urlLocation).then(supported => {
      if (supported) {
        Linking.openURL(urlLocation);
      } else {
        console.log("Don't know how to open");
      }
    });
  };

  const hideConfirmNumber = () => setVisible(false);
  const showconfirmSms = () => setSmsVisibility(true);
  const hideconfirmSms = () => setSmsVisibility(false);
  const isExistsSchedule = data => {
    let _times = [];
    if (data !== '' && data.id > 0) {
      let _data =
        data.hospitals[0].doctor_schedule &&
        data.hospitals[0].doctor_schedule !== ''
          ? data.hospitals[0].doctor_schedule[moment(date).format('YYYY-MM-DD')]
          : [];
    }
    return false;
  };

  const isExistsLocation = data => {
    if (_has(data, 'hospitals.0.longitude')) {
      return true;
    }
    return false;
  };

  const getAllTimes = date => {
    let selectedDate = moment(date).format('YYYY-MM-DD 00:00:00');
    let _times = [];
    if (
      props.doctorProfile.data.hospitals[0].doctor_schedule[`${selectedDate}`]
    ) {
      // if (props.doctorProfile.data && props.doctorProfile.data.id > 0) {
      let data =
        props.doctorProfile.data.hospitals[0].doctor_schedule[
          `${selectedDate}`
        ] &&
        props.doctorProfile.data.hospitals[0].doctor_schedule[
          `${selectedDate}`
        ] !== ''
          ? props.doctorProfile.data.hospitals[0].doctor_schedule[
              `${selectedDate}`
            ]
          : null;
      for (let property in data) {
        if (data.hasOwnProperty(property)) {
          _times[`${property}`] = (
            <TouchableRipple
              key={data[property].schedule_time_id}
              onPress={() => {
                props.user.id && props.user.id > 0 ? (
                  handleOnPress(data[property].schedule_time_id)
                ) : (
                  <>
                    {props.setUserType(PATIENT_TYPE)}
                    {theme(PATIENT_TYPE)}
                    {handleOnPress(data[property].schedule_time_id)}
                    {setVisible(true)}
                  </>
                );
              }}
              style={styles.timesButtons2}
            >
              <Text style={styles.timesText2}>
                {data[`${property}`].shedule_time}
              </Text>
            </TouchableRipple>
          );
        }
      }
    }
    return _times;
  };

  const { data } = props.doctorProfile;
  // return null;

  return props.doctorProfile.data && props.doctorProfile.data.doctor_id > 0 ? (
    <ScrollView style={styles.container}>
      <Helmet
        titleTemplate={getSiteName()}
        title={getTranslator('name', props.doctorProfile.data, '_arabic')}
        schema={[
          {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
              '@content': 'http://schema.org',
              '@type': 'Physician',
              image: props.doctorProfile.data.picture,
              telephone: props.doctorProfile.data.phone,
              email: props.doctorProfile.data.email,
              name: getTranslator('name', props.doctorProfile.data, '_arabic'),
              medicalSpecialty: getTranslator(
                'speciality',
                props.doctorProfile.data,
                '_arabic'
              ),
              // aggregateRating: [
              //   {
              //     '@type': 'AggregateRating',
              //     ratingValue: props.doctorProfile.data.rating,
              //     reviewCount: rate.starCount
              //   }
              // ],
              address: [
                {
                  '@type': 'PostalAddress',
                  name: I18nManager.isRTL
                    ? props.doctorProfile.data.location
                    : props.doctorProfile.data.address
                }
              ]
            })
          }
        ]}
      />
      <Header
        push={push}
        title={props.intl.formatMessage(messages.doctorProfileTitle)}
        right={
          Platform.OS == 'web' ? (
            <Share
              // title={props.intl.formatMessage(messages.shareTitle)}
              title={props.intl.formatMessage(messages.pleaseCheckDoctor)}
              shareUrl={`https://www.hakeemy.com${ROUTE_DOCTOR_PROFILE}/${
                props.doctorProfile.data.doctor_id
              }/1`}
            />
          ) : (
            <>
              <Appbar.Action
                icon='share-variant'
                onPress={() => {
                  ShareButton.open({
                    message: props.intl.formatMessage(
                      messages.pleaseCheckDoctor
                    ),
                    url: `https://www.hakeemy.com/patient/viewdoctor/${
                      props.navigation.state.params.id
                        ? props.navigation.state.params.id
                        : scheduleId
                    }/1`
                  })
                    .then(res => {
                      console.log(res);
                    })
                    .catch(err => {
                      err && console.log(err);
                    });
                }}
              />

              <Appbar.Action
                icon='email'
                // color='white'
                onPress={() => {
                  openURL('mailto:' + props.doctorProfile.data.email);
                }}
              />
              <Appbar.Action
                icon='phone'
                // color='white'
                onPress={() => {
                  openURL('tel:' + props.doctorProfile.data.phone);
                }}
              />
            </>
          )
        }
        left={
          <Appbar.BackAction
            // color="white"
            onPress={() => {
              props.navigation
                ? props.navigation.goBack()
                : props.history.location.search &&
                  props.history.location.search.includes('myAppintment')
                ? props.push(
                    getLocalizeRoute(ROUTE_LAUNCHER + 'myAppointments')
                  )
                : props.push(getLocalizeRoute(ROUTE_SEARCH_LIST));
            }}
          />
        }
        style={{ elevation: 0 }}
      />
      <View style={styles.bodyContainer}>
        <View
          style={[
            styles.bottomHeader,
            {
              backgroundColor:
                props.userType === HOSPITAL_TYPE
                  ? themeHospital.colors.primary
                  : themePatient.colors.primary
            }
          ]}
        >
          <View style={styles.imageMargin}>
            {/* <Image source={props.doctorProfile.data.picture} /> */}
            <Image
              style={styles.image}
              // source={{ uri: props.doctorProfile.data.picture }}
              // source={require(props.doctorProfile.data.picture)}
              source={{ uri: props.doctorProfile.data.picture }}
              // source={require(props.doctorProfile.data.picture)}
            />
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            // borderWidth: 1,
            // borderColor: 'red',
            height: 250
          }}
        >
          <View
            style={{
              backgroundColor:
                props.userType === HOSPITAL_TYPE
                  ? themeHospital.colors.primary
                  : themePatient.colors.primary,
              borderRadius: 50,
              marginTop: 70
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                // marginTop: 80,
                // fontSize: 11,
                // color: 'white',
                marginVertical: 4,
                marginHorizontal: 10
              }}
            >
              {props.doctorProfile.data === 'specialist'
                ? props.intl.formatMessage(messages.specialist)
                : props.intl.formatMessage(messages.consultant)}
            </Text>
          </View>

          <Text
            style={{
              marginTop: 10,
              fontSize: 25
            }}
          >
            {getTranslator('name', props.doctorProfile.data, '_arabic')}
          </Text>
          <Text style={{ marginTop: 7, fontSize: 18, color: 'gray' }}>
            {getTranslator('speciality', props.doctorProfile.data, '_arabic')}
          </Text>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'green',
              flex: 1,
              flexDirection: 'row',
              paddingVertical: 20,
              paddingHorizontal: 10
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 15
              }}
            >
              <Text style={{ fontSize: 17 }}>
                {props.intl.formatMessage(messages.rating)}
              </Text>
              <StarRating
                disabled={true}
                maxStars={5}
                halfStar='star-half'
                emptyStar='star-outline'
                rating={
                  props.doctorProfile.data.rating == 0
                    ? rate.starCount
                    : props.doctorProfile.data.rating
                }
                // rating={rate.starCount}
                selectedStar={rating => onStarRatingPress(rating)}
                starSize={22}
                starStyle={{
                  marginTop: 8,
                  justifyContent: 'flex-end'
                }}
              />
            </View>
            <View style={{ width: 1, backgroundColor: 'gray' }} />
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 15
              }}
            >
              <Text style={{ fontSize: 17, marginBottom: 7 }}>
                {props.intl.formatMessage(messages.fees)}
              </Text>
              <Text style={{ fontSize: 17 }}>
                {props.doctorProfile.data.fees
                  ? `${
                      props.doctorProfile.data.fees
                    } ${props.intl.formatMessage(messages.sr)}`
                  : props.intl.formatMessage(messages.unknown)}
              </Text>
            </View>
            {Platform.OS == 'web' ? (
              <>
                {' '}
                <View style={{ width: 1, backgroundColor: 'gray' }} />
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 15
                  }}
                >
                  <Text style={{ fontSize: 17, marginBottom: 7 }}>
                    {props.intl.formatMessage(messages.phoneNumber)}
                  </Text>
                  <Text style={{ fontSize: 17 }}>
                    <Button
                      mode='text'
                      onPress={() => {
                        openURL('tel:' + props.doctorProfile.data.phone);
                      }}
                    >
                      {props.doctorProfile.data.phone}
                    </Button>
                  </Text>
                </View>
              </>
            ) : null}
          </View>
        </View>
        <View style={styles.space} />

        <View style={styles.bookAppointmentSection}>
          <Text style={styles.bookAppointmentText}>
            <FormattedMessage {...messages.bookAppointment} />
          </Text>
          <View style={styles.timesSection}>
            {<SingleDatePicker selectedDate={selectedDate} />}
          </View>
          <View
            style={[
              styles.timesSectionBody,
              {
                justifyContent: 'center',
                alignItems: 'center'
              }
            ]}
          >
            {props.doctorProfile.data.hospitals[0].doctor_schedule &&
            props.doctorProfile.data.hospitals[0].doctor_schedule[
              `${moment(date).format('YYYY-MM-DD 00:00:00')}`
            ] ? (
              // <ScrollView horizontal={true}><Text>ssss</Text></ScrollView>
              <ScrollView horizontal={true}>{getAllTimes(date)}</ScrollView>
            ) : (
              <View
                style={{
                  height: 100
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: 10
                  }}
                >
                  <Text style={{ color: 'red', fontSize: 18 }}>
                    <FormattedMessage {...messages.Noscheduledexist} />
                  </Text>
                  <Text style={{ color: 'red', fontSize: 18 }}>
                    <FormattedMessage {...messages.tryAnotherDate} />
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
      <View style={styles.space} />
      {isExistsLocation(data) ? (
        <View style={styles.mapMainContainer}>
          <View
            style={{
              backgroundColor: 'white',
              alignItems: 'center',
              paddingVertical: 10
            }}
          >
            <H1 style={[{ color: 'black' }]}>
              {getTranslator('hospital', data.hospitals[0], '_arabic')}
            </H1>
            <Text style={styles.timesText}>
              {I18nManager.isRTL
                ? props.doctorProfile.data.location
                : props.doctorProfile.data.address}
            </Text>
          </View>
          <MapView
            provider='google'
            style={{ flex: 1 }}
            initialRegion={{
              // latitude: parseFloat(props.lesson.latitude),
              latitude: parseFloat(data.hospitals[0].latitude),
              // longitude: parseFloat(props.lesson.longitude),
              longitude: parseFloat(data.hospitals[0].longitude),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
            onMapReady={() => {
              if (Platform.OS === 'web') {
                null;
              } else {
                null;
              }
            }}
            ref={mapRef}
            showsMyLocationButton={false}
            showsUserLocation={false}
          >
            {/* {Platform.OS === 'web' ? (
              <OverlayView
                position={{
                  lat: props.lesson.latitude,
                  lng: props.lesson.longitude
                }}
                mapPaneName={OverlayView.OVERLAY_LAYER}
                getPixelPositionOffset={getPixelPositionOffset}
              >
                <Pulse
                  color={themeStudent.colors.primary}
                  numPulses={1}
                  diameter={50}
                  speed={40}
                  duration={5000}
                />
              </OverlayView>
            ) : null} */}
            <Marker
              identifier='Marker1'
              coordinate={{
                latitude: parseFloat(data.hospitals[0].latitude),

                longitude: parseFloat(data.hospitals[0].longitude)
              }}
              image={require('../../images/marker.png')}
            />
          </MapView>
          {Platform.OS == 'ios' || Platform.OS == 'android' ? (
            <Button
              uppercase={false}
              style={styles.viewDirection}
              contentStyle={{
                width: I18nManager.isRTL ? null : 200
              }}
              onPress={() => {
                Geolocation.setRNConfiguration({
                  skipPermissionRequests: false,
                  authorizationLevel: 'whenInUse'
                });
                Geolocation.getCurrentPosition(
                  position => {
                    position.coords.latitude && position.coords.latitude !== 0
                      ? openGoogleDirection(
                          position.coords.latitude +
                            ',' +
                            position.coords.longitude,
                          parseFloat(data.hospitals[0].latitude) +
                            ',' +
                            parseFloat(data.hospitals[0].longitude)
                        )
                      : // console.log('after', position.coords.latitude))
                        null;
                  },
                  error => {
                    console.warn('No GPS', error);
                  },
                  {
                    enableHighAccuracy: true,
                    timeout: 20000,
                    maximumAge: 1000
                  }
                );
              }}
            >
              <FormattedMessage {...messages.viewDirection} />
            </Button>
          ) : null}
        </View>
      ) : null}
      <FormDoctorProfilePage
        intl={props.intl}
        visible={visible}
        mobile={props.user.mobile}
        isSignedIn={props.user.id}
        hide={hideConfirmNumber}
        onSubmit={(values, actions) => {
          props.onSubmit(
            {
              ...values,
              api_key: props.user.api_key ? props.user.api_key : null,
              doctor_id: props.doctorProfile.data.doctor_id,
              schedule: scheduleId
            },
            actions
          );
        }}
        show={showconfirmSms}
      />
      <FormconfirmSmsPage
        visible={smsVisibility}
        hide={hideConfirmNumber}
        onSubmit2={(values, actions) => {
          props.onSubmit2(
            {
              ...values,
              appointment_id: props.appointment_id
            },
            actions
          );
        }}
        hideconfirmSms={hideconfirmSms}
        user={props.user}
      />
    </ScrollView>
  ) : (
    <View style={styles.LoadingIndicatorContainer}>
      <LoadingIndicator />
    </View>
  );
};
const mapStateToProps = createStructuredSelector({
  doctorProfile: makeSelectDoctorProfilePage(),
  userType: makeSelectUserType(),
  user: makeSelectUser(),
  appointment_id: makeSelectDoctorProfilePage()
});

function mapDispatchToProps(dispatch) {
  return {
    push: page => dispatch(push(page)),
    onSubmit: (values, actions) => dispatch(bookAppointment(values, actions)),
    onSubmit2: (values, actions) => dispatch(confirmSms(values, actions)),
    loadDoctorProfile: api_key => dispatch(loadDoctorProfile(api_key)),
    setUserType: type => dispatch(setUserType(type))
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
)(DoctorProfilePage);
