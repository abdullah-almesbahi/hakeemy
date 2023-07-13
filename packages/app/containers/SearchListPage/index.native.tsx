/**
 *
 * SearchListPage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import { View, ScrollView, FlatList } from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';
// import { useInjectReducer } from "../../utils/injectReducer";
import { SearchListPageProps } from './types';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';
import { makeSelectSearchListPage, loadNearbyHospitals } from './ducks';
import { ROUTE_LAUNCHER } from '../../utils/constants';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

import { Appbar } from 'react-native-paper';
import Helmet from '../../components/Helmet';

import styles from './styles';
import { MaterialCommunityIcons, Text } from '../../components';

import { makeSelectSearchDoctorSelected } from '../SearchDoctorPage/ducks';
import LoadingIndicator from '../../components/LoadingIndicator';
import NoRecords from '../../components/NoRecords';
import { useQuery } from '@apollo/react-hooks';

import Doctor from './Doctor';
import { QuerySearchDoctor } from './graphql';
import _uniqBy from 'lodash/uniqBy';
import _has from 'lodash/has';
import MapList from './MapList';
import _merge from 'lodash/merge';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import DoctorProfilePage from '../DoctorProfilePage';

import makeGrid from '../../components/Grid';
import { getLocalizeRoute } from '../../utils/helper';

const Grid = makeGrid(16); // gutter size

let page = 0;
let loaded = false;
const perPage = 5;

const SearchListPage = (props: SearchListPageProps) => {
  const [viewType, setViewType] = useState('list');
  const [forceRerender, setForceRerender] = useState(false);

  // useEffect(() => {
  //   if (props.selected.latitude !== 0 && props.selected.longitude !== 0) {
  //     props.loadNearbyHospitals(
  //       `${props.selected.latitude},${props.selected.longitude}`,
  //       null,
  //       0
  //     );
  //   }
  // }, []);

  const getHospitalsId = data => {
    let _data = [];
    if (data && data.length > 0) {
      data.map(hospital => {
        _data.push(hospital.id);
      });
    }
    return _data;
  };
  const hospitalsId = getHospitalsId(props.searchList.hospitalIds);
  const city_id = parseFloat(props.selected.city_id);
  const insurance_id = parseFloat(props.selected.insurance_id);
  const country_id = parseFloat(props.selected.country);

  const getExtraWhere = (country_id, city_id, insurance_id) => {
    let extraWhere = {};
    if (city_id > 0 && insurance_id > 0) {
      extraWhere = {
        city: {
          id: city_id
        },
        insurances_some: {
          id: insurance_id
        }
      };
    } else if (city_id > 0) {
      extraWhere = {
        city: {
          id: city_id
        }
      };
    } else if (insurance_id > 0) {
      extraWhere = {
        insurances_some: {
          id: insurance_id
        }
      };
    } else if (
      country_id > 0
      // &&(props.selected.search == '' || props.selected.search == null)
    ) {
      if (country_id === 1) {
        extraWhere = {
          id_in: hospitalsId
        };
      } else {
        extraWhere = {
          countryId: {
            id: country_id
          }
        };
      }
    }
    return extraWhere;
  };

  const variables = {
    whereHospital: hospitalsId,
    word: props.selected.search,
    whereCity1:
      city_id > 0 || insurance_id > 0
        ? {
            OR: [
              { name_contains: props.selected.search },
              { nameArabic_contains: props.selected.search }
            ],
            hospital_some: getExtraWhere(country_id, city_id, insurance_id)
          }
        : country_id > 0
        ? {
            OR: [
              { name_contains: props.selected.search },
              { nameArabic_contains: props.selected.search }
            ],
            hospital_some: getExtraWhere(country_id, city_id, insurance_id)
          }
        : {
            OR: [
              { name_contains: props.selected.search },
              { nameArabic_contains: props.selected.search }
            ]
          },
    whereCity2:
      city_id > 0
        ? {
            hospital_some: getExtraWhere(country_id, city_id, insurance_id)
          }
        : country_id > 0
        ? {
            hospital_some: getExtraWhere(country_id, city_id, insurance_id)
          }
        : {}
  };

  let { loading, error, data, fetchMore } = useQuery(QuerySearchDoctor, {
    variables: {
      first: perPage,
      skip: 0,
      ...variables
    }
  });

  // useInjectReducer({ key: "searchListPage", reducer });
  useInjectSaga({ key: 'searchListPage', saga });

  const existsRecords = data => {
    let found = false;

    if (_has(data, 'doctors') && data.doctors.length > 0) {
      found = true;
    }
    if (_has(data, 'hospitals') && data.hospitals.length > 0) {
      data.hospitals.map(hospital => {
        if (_has(hospital, 'doctors') && hospital.doctors.length > 0) {
          found = true;
        }
      });
    }

    if (_has(data, 'specialities') && data.specialities.length > 0) {
      data.specialities.map(speciality => {
        if (_has(speciality, 'doctors') && speciality.doctors.length > 0) {
          found = true;
        }
      });
    }

    return found;
  };

  const filterRecords = data => {
    let _data = [];
    if (_has(data, 'doctors') && data.doctors.length > 0) {
      data.doctors.map(doctor => {
        _data.push({
          ...doctor
        });
      });
    }
    if (_has(data, 'hospitals') && data.hospitals.length > 0) {
      data.hospitals.map(hospital => {
        if (_has(hospital, 'doctors') && hospital.doctors.length > 0) {
          hospital.doctors.map(doctor => {
            _data.push({
              ...doctor
            });
          });
        }
      });
    }
    if (_has(data, 'specialities') && data.specialities.length > 0) {
      data.specialities.map(_speciality => {
        if (_has(_speciality, 'doctors') && _speciality.doctors.length > 0) {
          _speciality.doctors.map(doctor => {
            _data.push({
              ...doctor
            });
          });
        }
      });
    }
    return _uniqBy(_data, 'id');
  };

  const mergeRecords = (oldData: any, newData: any) => {
    let data = oldData;

    if (_has(newData, 'doctors') && newData.doctors.length > 0) {
      data.doctors = [...data.doctors, ...newData.doctors];
    }

    if (_has(newData, 'hospitals') && newData.hospitals.length > 0) {
      if (_has(data, 'hospitals') && data.hospitals.length > 0) {
        data.hospitals.map(hospital => {
          let index = newData.hospitals.findIndex(s => s.id === hospital.id);
          if (
            _has(newData.hospitals[index], 'doctors') &&
            newData.hospitals[index].doctors.length > 0
          ) {
            return (hospital.doctors = [
              ...hospital.doctors,
              ...newData.hospitals[index].doctors
            ]);
          }
        });
      }
    }

    if (_has(newData, 'specialities') && newData.specialities.length > 0) {
      // we need to check old id and add new to it in doctors arrays
      if (_has(data, 'specialities') && data.specialities.length > 0) {
        // append the new results to existing speciality
        data.specialities.map(speciality => {
          let index = newData.specialities.findIndex(
            s => s.id === speciality.id
          );
          if (
            _has(newData.specialities[index], 'doctors') &&
            newData.specialities[index].doctors.length > 0
          ) {
            return (speciality.doctors = [
              ...speciality.doctors,
              ...newData.specialities[index].doctors
            ]);
          }
        });
      }
    }

    setForceRerender(!forceRerender);
    return data;
  };

  const handleLoadMore = fetchMore => {
    page = page + 1; // increase page by 1

    const first = perPage;
    const skip = page * first;
    fetchMore({
      variables: {
        first,
        skip,
        ...variables
      },
      updateQuery: (prevResult, test) => {
        const { fetchMoreResult } = test;

        // console.log('handle more');

        return existsRecords(fetchMoreResult)
          ? mergeRecords(prevResult, fetchMoreResult)
          : prevResult;
      }
    });
  };
  return (
    <>
      {/* <View style={styles.container}> */}
      <Helmet
        titleTemplate='SearchListPage'
        defaultTitle='Description of SearchListPage'
      />
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => props.push(getLocalizeRoute(ROUTE_LAUNCHER))}
        />
        <Appbar.Content title={props.intl.formatMessage(messages.searchList)} />
        <Appbar.Action
          icon={viewType === 'mapList' ? 'format-list-bulleted' : 'map-marker'}
          onPress={() => {
            if (viewType === 'list') {
              setViewType('mapList');
            } else {
              setViewType('list');
            }
          }}
        />
      </Appbar.Header>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <LoadingIndicator />
        </View>
      ) : !existsRecords(data) ? (
        <NoRecords>
          <Text style={{ textAlign: 'center' }}>
            {props.intl.formatMessage(messages.noResults)}
          </Text>
        </NoRecords>
      ) : viewType === 'list' ? (
        <ScrollView
          style={{
            // minHeight: window.innerHeight
            minHeight: '100%'
            // borderWidth: 3,
            // borderColor: 'black'
            // flex: 1,
            // display: 'block'
            // flexShrink: 1,
            // flexGrow: 1,
            // flexBasis: '1%',
          }}
        >
          <Grid.Container>
            {/* {console.log('window', window.outerHeight)} */}
            <Grid.Row>
              <Grid.Col>
                <FlatList
                  data={filterRecords(data)}
                  numColumns={1}
                  ListFooterComponent={() => {
                    return loading ? (
                      <LoadingIndicator
                        style={{
                          backgroundColor: '#141414',
                          marginVertical: 50
                        }}
                      />
                    ) : null;
                  }}
                  keyExtractor={(data, index) => data.id.toString()}
                  renderItem={({ item, separators }) => {
                    return (
                      <Doctor
                        data={item}
                        currentLocation={props.selected}
                        push={props.navigation.push}
                        // push={props.navigation.push}
                        intl={props.intl}
                      />
                    );
                  }}
                  onEndReached={() => handleLoadMore(fetchMore)}
                />
              </Grid.Col>
            </Grid.Row>
          </Grid.Container>
        </ScrollView>
      ) : (
        <MapList
          data={filterRecords(data)}
          push={props.push}
          intl={props.intl}
          currentLocation={props.selected}
        />
      )}
      {/* </View> */}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  selected: makeSelectSearchDoctorSelected(),
  searchList: makeSelectSearchListPage()
});

function mapDispatchToProps(dispatch) {
  return {
    push: page => dispatch(push(page))
    // loadNearbyHospitals: (lat_long: string, limit: number, offset: number) =>
    //   dispatch(loadNearbyHospitals(lat_long, limit, offset))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const ComSearchListPage = compose(
  withConnect,
  injectIntl,
  memo
)(SearchListPage);
// export default compose(
//   withConnect,
//   injectIntl,
//   memo
// )(SearchListPage);

const SearchListPageNavigator = createStackNavigator(
  {
    SearchListPage: {
      screen: createStackNavigator(
        {
          SearchListPage: { screen: ComSearchListPage },
          DoctorProfilePage: {
            screen: DoctorProfilePage
          }
        },
        {
          headerMode: 'none'
        }
      )
    }
  },
  {
    initialRouteName: 'SearchListPage',
    headerMode: 'none'
  }
);

export default createAppContainer(SearchListPageNavigator);
