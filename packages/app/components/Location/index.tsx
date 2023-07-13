/**
 *
 * Location
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { View } from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';
// import { useInjectReducer } from '../../utils/injectReducer';
import reducer, {
  makeSelectLocationPage,
  updateLocation,
  suggestLocation,
  updateLocationOption,
  loadLocationSuccess
} from './ducks';
import { LocationPageProps } from './types';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';
import Geolocation from '@react-native-community/geolocation';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

import {
  Appbar,
  Searchbar,
  List,
  Surface,
  IconButton
} from 'react-native-paper';
import { DrawerContext } from '../../hooks/useDrawerContext';
import Helmet from '../../components/Helmet';
import { Button } from '../../components';
// import MapView from 'react-native-maps';
import MapView from './Maps';

import styles from './styles';
import LoadingIndicator from '../../components/LoadingIndicator';
import { themeHospital } from '../../containers/App/themes';
import geoCoder from '../../utils/geoCoder';
import { makeSelectLocale } from '../../containers/LanguagePage/ducks';
import Marker from '../../components/Marker';
import Overlay from '../../components/Overlay';
import { Platform } from '../../components/Platform';

const Location: React.SFC<LocationPageProps> = props => {
  const [state, setState] = useState({
    latitude: 0,
    longitude: 0,
    address: ''
  });
  // useInjectReducer({ key: 'locationPage', reducer });
  useInjectSaga({ key: 'locationPage', saga });

  // useEffect(() => {
  //   if (props.location.loaded) {
  //     updateWithGeoCoderPosition(
  //       props.location.data.latitude,
  //       props.location.data.longitude
  //     );
  //   }
  // }, [props.location.loaded]);

  useEffect(() => {
    if (Platform.OS != 'web') {
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse'
      });

      Geolocation.getCurrentPosition(
        position => {
          setState({
            ...state,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          updateWithGeoCoderPosition(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        error => {
          console.warn('No GPS', error);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }
  }, []);

  const updateWithGeoCoderPosition = (latitude: number, longitude: number) => {
    geoCoder
      .geocodePosition(
        {
          latitude,
          longitude
        },
        props.language
      )
      .then(res => {
        const country = res[0].address_components.find(
          (row: any) => row.types.indexOf('country') >= 0
        );
        const city = res[0].address_components.find(
          (row: any) => row.types.indexOf('administrative_area_level_1') >= 0
        );
        const postal_code = res[0].address_components.find(
          (row: any) => row.types.indexOf('postal_code') >= 0
        );
        props.loadLocationSuccess({
          address: res[0].formatted_address,
          country_name: country.long_name,
          city: city.long_name,
          postal_code:
            postal_code && postal_code.long_name
              ? postal_code.long_name
              : '11111',
          latitude: res[0].geometry.location.lat,
          longitude: res[0].geometry.location.lng
        });
      });
  };

  const updateWithGeoCoderAddress = (address: string) => {
    geoCoder.geocodeAddress(address, props.language).then(res => {
      const country = res[0].address_components.find(
        (row: any) => row.types.indexOf('country') >= 0
      );
      const city = res[0].address_components.find(
        (row: any) => row.types.indexOf('administrative_area_level_1') >= 0
      );
      const postal_code = res[0].address_components.find(
        (row: any) => row.types.indexOf('postal_code') >= 0
      );

      props.loadLocationSuccess({
        address: res[0].formatted_address,
        country_name: country.long_name,
        city: city.long_name,
        postal_code:
          postal_code && postal_code.long_name
            ? postal_code.long_name
            : '11111',
        latitude: res[0].geometry.location.lat,
        longitude: res[0].geometry.location.lng
      });
    });
  };

  const getPixelPositionOffset = (width: number, height: number) => ({
    x: -(width / 2),
    y: -(height / 2)
  });

  // const openDrawer: any = React.useContext(DrawerContext);

  return (
    <View style={styles.container}>
      <Helmet titleTemplate='LOCATION' defaultTitle='Description of LOCATION' />

      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            props.onBack();
          }}
          color='black'
        />
        {/* <Appbar.Action icon="menu" onPress={() => props.navigation.openDrawer()} color="black" /> */}
        <Appbar.Content
          title={<FormattedMessage {...messages.location} />}
          color='black'
        />
      </Appbar.Header>

      {state.latitude === 0 ? (
        <LoadingIndicator />
      ) : (
        <View style={styles.mapMainContainer}>
          <MapView location={props.location} currentLocation={state}>
            {Platform.OS === 'web' ? (
              <Overlay
                position={{
                  lat: props.location.data.latitude,
                  lng: props.location.data.longitude
                }}
                // bounds={[
                //   [props.location.data.latitude, props.location.data.longitude]
                // ]}
                mapPaneName={Overlay.OVERLAY_LAYER}
                getPixelPositionOffset={getPixelPositionOffset}
              >
                <View
                  style={{
                    backgroundColor: 'rgba(111, 218, 68,0.5)',
                    borderWidth: 1,
                    borderColor: themeHospital.colors.primary,
                    borderRadius: 80,
                    width: 160,
                    height: 160
                  }}
                />
              </Overlay>
            ) : null}
            <Marker
              coordinate={{
                latitude:
                  props.location.data.latitude > 0
                    ? props.location.data.latitude
                    : state.latitude,
                longitude:
                  props.location.data.longitude > 0
                    ? props.location.data.longitude
                    : state.longitude
              }}
              image={require('../../images/marker.png')}
            />
          </MapView>

          <Searchbar
            style={styles.search}
            placeholder={props.intl.formatMessage(messages.search)}
            onChangeText={(address: any) => {
              props.suggestLocation(address);
              setState({ ...state, address });
            }}
            value={state.address}
          />
          {props.location.showSuggest && props.location.suggest.length > 0 ? (
            <Surface style={styles.searchSuggest}>
              {props.location.suggest.map((d: any) => (
                <List.Item
                  key={d.id}
                  left={props => <List.Icon {...props} icon='map-marker' />}
                  title={d.terms[0].value}
                  description={d.description}
                  onPress={() => {
                    setState({
                      ...state,
                      address: d.description
                    });
                    props.updateLocationOption('showSuggest', false);
                    updateWithGeoCoderAddress(d.description);
                  }}
                  style={styles.searchSuggestList}
                />
              ))}
            </Surface>
          ) : null}

          {state.latitude > 0 && state.longitude > 0 ? (
            <Surface style={styles.currentLocation}>
              <IconButton
                style={{ padding: 0, margin: 6 }}
                icon='crosshairs'
                size={20}
                onPress={() => {
                  updateWithGeoCoderPosition(state.latitude, state.longitude);
                }}
              />
            </Surface>
          ) : null}
          <Button
            uppercase={false}
            style={styles.setLocationStyle}
            contentStyle={styles.setLocationContentStyle}
            onPress={() => {
              // console.log('props.location.data', props.location.data);
              props.onSetLocation(
                `${props.location.data.latitude},${
                  props.location.data.longitude
                }`,
                props.location.data.address
              );
            }}
          >
            <FormattedMessage {...messages.setLocation} />
          </Button>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocationPage(),
  language: makeSelectLocale()
});

function mapDispatchToProps(dispatch: any) {
  return {
    updateLocation: (data: any) => dispatch(updateLocation(data)),
    loadLocationSuccess: (data: any) => dispatch(loadLocationSuccess(data)),
    suggestLocation: (text: string) => dispatch(suggestLocation(text)),
    updateLocationOption: (key: any, value: any) =>
      dispatch(updateLocationOption(key, value))
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
)(Location);
