/**
 *
 * HospitalProfilePage
 *
 */

import React, { memo, useEffect, useState, useRef } from 'react';
import { View, ScrollView, Image, Linking } from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { makeSelectHospitalProfilePage, loadHospitalProfile } from './ducks';
import { HospitalProfilePageProps } from './types';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';
import { makeSelectUserType, makeSelectUser } from '../User/ducks';
import { Appbar, TouchableRipple } from 'react-native-paper';
import { FormattedMessage, injectIntl } from 'react-intl';
import styles from './styles';
import { ROUTE_SEARCH_LIST, ROUTE_LAUNCHER } from '../../utils/constants';
import { themePatient, themeHospital } from '../App/themes';
import LoadingIndicator from '../../components/LoadingIndicator';
import Header from '../../components/Header';
import messages from './messages';
import { HOSPITAL_TYPE } from '../../utils/constants';

import { Button, Text, Helmet } from '../../components';
import MapView from 'react-native-maps';
import Marker from '../../components/Marker';
import Pulse from '../../components/Pulse';
import { DEFAULT_MAP_PADDING } from '../../utils/constants';
import { Platform } from '../../components/Platform';
import _has from 'lodash/has';
import Geolocation from '@react-native-community/geolocation';
import { getTranslator } from '../../components/Translator';
import { getSiteName, getLocalizeRoute } from '../../utils/helper';

/**
 * 
 * @param props 
 *address: "محمد فدا , حي الثغر, جدة "
address_arabic: " Al-Thaghr Mohammed Fida Street, Jeddah 22331 Saudi Arabia"
api_key: "7c5273fbb9cd5231ae22cff3f4e64f8b"
city: "Jeddah"
city_arabic: "جدة"
city_id: 58
country_id: 2
created_date: "2017-04-11 09:44:43"
email: "info@almostaqbalhosp.com"
hospital: "AlMostakbal"
hospital_arabic: "المستقبل "
id: 376
language: "arabi"
latitude: "21.482143552321247"
location: "7222 Mohammed Fida, حي الثغر، Jeddah 22331 4283, Saudi Arabia"
logo: "376_logo.jpg"
longitude: "39.2296028137207"
offer: null
password: "123456"
phone: "+966126875255"
phone1: ""
status: 1
type: "Hospital"
uniqe_id: "58ec7b5ba3a02"
updatedAt: "1970-01-01 00:00:00"
 */

const HospitalProfilePage: React.SFC<HospitalProfilePageProps> = props => {
  useInjectSaga({ key: 'hospitalProfilePage', saga });
  const [state, setState] = useState({
    latitude: 0,
    longitude: 0
  });

  const test = 10;

  const mapRef: any = useRef(null);
  useEffect(() => {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: 'whenInUse'
    });

    // Geolocation.requestAuthorization();

    Geolocation.getCurrentPosition(
      position => {
        setState({
          ...state,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        // }
      },
      error => {
        console.warn('No GPS', error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);
  useEffect(() => {
    props.loadHospitalProfile(props.match.params.id);
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

  const { data } = props.hospitalProfile;

  return (
    <View style={styles.container}>
      {props.hospitalProfile.data && props.hospitalProfile.data.id > 0 ? (
        <>
          <Helmet
            titleTemplate={getSiteName()}
            title={props.intl.formatMessage(messages.hospitalProfileTitle)}
          />
          <Header
            push={push}
            title={props.intl.formatMessage(messages.hospitalProfileTitle)}
            right={
              <>
                <Appbar.Action
                  icon='email'
                  // color='white'
                  onPress={() => {
                    openURL('mailto:' + props.hospitalProfile.data.email);
                  }}
                />
                <Appbar.Action
                  icon='phone'
                  // color='white'
                  onPress={() => {
                    openURL('tel:' + props.hospitalProfile.data.phone);
                  }}
                />
              </>
            }
            left={
              <Appbar.BackAction
                // color='white'
                onPress={() => props.push(getLocalizeRoute(ROUTE_LAUNCHER))}
              />
            }
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
                {/* <Image source={props.hospitalProfile.data.picture} /> */}
                <Image
                  style={styles.image}
                  // source={{ uri: props.hospitalProfile.data.picture }}
                  // source={require(props.hospitalProfile.data.picture)}
                  source={{
                    uri: `https://old.hakeemy.com/uploads/hospital_image/${
                      data.logo
                    }`
                  }}
                  // source={require(props.hospitalProfile.data.picture)}
                />
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                paddingHorizontal: 10
              }}
            >
              <Text
                style={{
                  marginTop: 80,
                  fontSize: 25
                }}
              >
                {getTranslator('hospital', data, '_arabic')}
              </Text>
              <Text gray style={{ textAlign: 'left' }}>
                {getTranslator('address', data, '_arabic')}
              </Text>
            </View>
            <View style={styles.space} />
          </View>

          <View style={styles.mapMainContainer}>
            <MapView
              provider='google'
              style={{ flex: 1 }}
              initialRegion={{
                // latitude: parseFloat(props.lesson.latitude),
                latitude: parseFloat(data.latitude),
                // longitude: parseFloat(props.lesson.longitude),
                longitude: parseFloat(data.longitude),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
              onMapReady={() => {
                if (Platform.OS === 'web') {
                  // mapRef.current.fitBounds(circleRef.current.getBounds());
                } else {
                  // mapRef.current.fitToSuppliedMarkers(
                  //   ['Marker1', 'Marker2'],
                  //   {
                  //     edgePadding: DEFAULT_MAP_PADDING,
                  //     animated: true
                  //   }
                  // );
                }
              }}
              ref={mapRef}
              showsMyLocationButton={true}
              showsUserLocation={true}
            >
              {Platform.OS === 'web' ? (
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
              ) : null}
              <Marker
                identifier='Marker1'
                coordinate={{
                  latitude: parseFloat(data.latitude),

                  longitude: parseFloat(data.longitude)
                }}
                image={require('../../images/marker.png')}
              />
            </MapView>
            <Button
              uppercase={false}
              style={styles.viewDirection}
              contentStyle={styles.bookYourLessonContent}
              dark={true}
              onPress={() => {
                openGoogleDirection(
                  state.latitude + ',' + state.longitude,
                  parseFloat(data.latitude) + ',' + parseFloat(data.longitude)
                );
              }}
            >
              <FormattedMessage {...messages.viewDirection} />
            </Button>
          </View>
        </>
      ) : (
        <View style={styles.LoadingIndicatorContainer}>
          <LoadingIndicator />
        </View>
      )}
    </View>
  );
};
const mapStateToProps = createStructuredSelector({
  hospitalProfile: makeSelectHospitalProfilePage(),
  userType: makeSelectUserType(),
  user: makeSelectUser()
});

function mapDispatchToProps(dispatch) {
  return {
    push: page => dispatch(push(page)),
    loadHospitalProfile: api_key => dispatch(loadHospitalProfile(api_key))
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
)(HospitalProfilePage);
