/**
 *
 * NearHospitalPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';
// import { useInjectReducer } from 'utils/injectReducer';
import reducer, { makeSelectNearHospitalPage, loadNearHospital } from './ducks';
import { NearHospitalPageProps } from './types';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

import Helmet from '../../components/Helmet';

import styles from './styles';
import Geolocation from '@react-native-community/geolocation';
import LoadingIndicator from '../../components/LoadingIndicator';
import NoRecords from '../../components/NoRecords';
import _has from 'lodash/has';
import Hospital from '../../components/Hospital';
import SafeAreaView from 'react-native-safe-area-view';

const NearHospitalPage: React.SFC<NearHospitalPageProps> = props => {
  // useInjectReducer({ key: 'nearHospitalPage', reducer });
  useInjectSaga({ key: 'nearHospitalPage', saga });
  const [state, setState] = useState({
    latitude: 0,
    longitude: 0
  });

  useEffect(() => {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: 'whenInUse'
    });

    // Geolocation.requestAuthorization();

    Geolocation.getCurrentPosition(
      position => {
        // props.loadNearHospital(`21.498452,39.237217`, 20, 0);
        props.loadNearHospital(
          `${position.coords.latitude},${position.coords.longitude}`,
          20,
          0
        );
        // console.log('position', position);
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

  const filterRecords = data => {
    let _data = [];
    data.map(d => (d.status == 1 ? _data.push(d) : null));
    return _data;
  };

  return (
    <View style={styles.container}>
      <Helmet
        titleTemplate='NearHospitalPage'
        defaultTitle='Description of NearHospitalPage'
      />

      {props.nearHospital.loading ? (
        <LoadingIndicator />
      ) : props.nearHospital.data.length === 0 ? (
        <NoRecords />
      ) : (
        <SafeAreaView>
          <ScrollView>
            <View style={styles.bodyContainer}>
              <FlatList
                data={filterRecords(props.nearHospital.data)}
                numColumns={1}
                ListFooterComponent={() =>
                  props.nearHospital.loading ? (
                    <LoadingIndicator
                      style={{ backgroundColor: '#141414', marginVertical: 50 }}
                    />
                  ) : null
                }
                keyExtractor={(data, index) => data.id.toString()}
                renderItem={({ item, separators }) => {
                  return (
                    <Hospital data={item} push={props.push} intl={props.intl} />
                  );
                }}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  nearHospital: makeSelectNearHospitalPage()
});

function mapDispatchToProps(dispatch) {
  return {
    push: page => dispatch(push(page)),
    loadNearHospital: (lat_long: string, limit: number, offset: number) =>
      dispatch(loadNearHospital(lat_long, limit, offset))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(NearHospitalPage);
