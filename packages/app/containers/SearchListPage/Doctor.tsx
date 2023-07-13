import * as React from 'react';
import { Surface, List, IconButton, Avatar } from 'react-native-paper';
import { View, Linking } from 'react-native';
import { Text, MaterialCommunityIcons, H2, Small } from '../../components';
import StarRating from '../../components/StartRating';
import { push } from 'connected-react-router';
import { ROUTE_DOCTOR_PROFILE } from '../../utils/constants';
import _has from 'lodash/has';
import messages from './messages';
import { getTranslator } from '../../components/Translator';
import { I18nManager } from 'react-native';
import { selectedDataType } from '../SearchDoctorPage/types';
import Responsive from '../../components/Responsive';
import { Platform } from '../../components/Platform';
import { getLocalizeRoute } from '../../utils/helper';

interface DoctorProps {
  data: any;
  push: typeof push;
  mapList: boolean;
  intl: any;
  currentLocation?: selectedDataType;
}

const Doctor: React.SFC<DoctorProps> = ({ data, ...props }) => {
  const [rate, setRate] = React.useState({ starCount: 5 });

  const openURL = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don't know how to open URI: ${url}`);
      }
    });
  };

  const onStarRatingPress = rating => {
    setRate({
      starCount: rating
    });
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  };

  const deg2rad = deg => {
    return deg * (Math.PI / 180);
  };

  const getDistance = (latitude: number, longitude: number) => {
    // console.log('props', data);
    if (
      latitude > 0 &&
      longitude > 0 &&
      props.currentLocation.latitude > 0 &&
      props.currentLocation.longitude > 0 &&
      props.currentLocation.country == 1
    ) {
      const c = getDistanceFromLatLonInKm(
        props.currentLocation.latitude,
        props.currentLocation.longitude,
        latitude,
        longitude
      );
      return (
        <Text style={{ fontSize: 16, color: 'gray' }}>
          {` (${c.toFixed(1)} ${props.intl.formatMessage(messages.km)})`}
        </Text>
      );
    }
    return null;
  };

  return (
    <Surface
      key={data.id}
      style={{
        elevation: props.mapList ? 0 : 3,
        marginTop: 1,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#f2f2f2'
      }}
    >
      <List.Item
        title={
          <Text style={{ fontSize: 20 }}>
            {getTranslator('name', data, 'Arabic')}
            {}
            {_has(data, 'hospital[0].latitude')
              ? getDistance(
                  parseFloat(data.hospital[0].latitude),
                  parseFloat(data.hospital[0].longitude)
                )
              : null}
          </Text>
        }
        description={p => (
          <View>
            {_has(data, 'hospital[0].hospital') ? (
              <H2
                dark
                style={{
                  marginTop: 5,
                  textAlign: 'left'
                }}
              >
                {getTranslator('hospital', data.hospital[0], 'Arabic')}
              </H2>
            ) : null}
            {_has(data, 'specialities.speciality') ? (
              <Text
                style={{
                  color: 'gray',
                  marginTop: 5,
                  textAlign: 'left'
                }}
              >
                {getTranslator('speciality', data.specialities, 'Arabic')}
              </Text>
            ) : null}

            {}
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
              {_has(data, 'hospital[0].location') ? (
                <Text
                  style={{
                    color: 'gray',
                    marginLeft: 5,
                    fontSize: 12,
                    textAlign: 'left'
                  }}
                >
                  {I18nManager.isRTL
                    ? data.hospital[0].location
                    : data.hospital[0].address}
                </Text>
              ) : null}
            </View>
            {}
          </View>
        )}
        // onBlur={() => {
        //   console.log('onBlur');
        // }}
        // onAccessibilityTap={() => {
        //   console.log('onAccessibilityTap');
        // }}
        // onMagicTap={() => {
        //   console.log('onMagicTap');
        // }}
        // onPressIn={() => {
        //   console.log('onPressIn');
        // }}
        // onPressOut={() => {
        //   console.log('onPressOut');
        // }}
        onFocus={() => {
          if (Platform.OS == 'web') {
            props.push(
              getLocalizeRoute(ROUTE_DOCTOR_PROFILE + `/${data.id}/1`)
            );
          }
          console.log('focus');
        }}
        // onLongPress={() => {
        //   console.log('long press');
        // }}
        onPress={() => {
          if (Platform.OS != 'web') {
            props.push('DoctorProfilePage', { id: data.id });
          }
          console.log(' press');
          // <Responsive
          //   small={props.push('DoctorProfilePage', { id: data.id })}
          //   large={props.push(ROUTE_DOCTOR_PROFILE + `/${data.id}`)}
          // />;
        }}
        left={() => (
          <View>
            {data.picture != '' && data.picture != null ? (
              <Avatar.Image
                source={{
                  uri: `https://old.hakeemy.com/uploads/doctor_image/${
                    //old.hakeemy.com/uploads/doctor_image/${
                    //old.hakeemy.com/uploads/doctor_image/${
                    //old.hakeemy.com/uploads/doctor_image/${
                    data.picture
                  }`
                }}
              />
            ) : null}

            {(data.picture == '' || data.picture == null) &&
            data.gender == 'male' ? (
              <Avatar.Image source={require('../../images/male_dr.jpg')} />
            ) : null}
            {(data.picture == '' || data.picture == null) &&
            data.gender == 'female' ? (
              <Avatar.Image source={require('../../images/female_dr.jpg')} />
            ) : null}
            <View
              style={{
                backgroundColor: '#4fa5d6',
                borderRadius: 50,
                marginTop: 7
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 11,
                  // color: 'white',
                  marginVertical: 2,
                  marginHorizontal: 5
                }}
              >
                {data.designation === 'specialist'
                  ? props.intl.formatMessage(messages.specialist)
                  : props.intl.formatMessage(messages.consultant)}
              </Text>
            </View>
          </View>
        )}
        right={() =>
          props.mapList ? null : (
            <IconButton
              icon='phone'
              color='gray'
              size={23}
              onPress={() => openURL('tel:' + data.phone)}
            />
          )
        }
      />
    </Surface>
  );
};

export default Doctor;
