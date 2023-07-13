import React, { useState, useEffect, useRef, Component } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import messages from './messages';
import { FormattedMessage } from 'react-intl';
import { FormSearchDoctorPageProps } from './types';
import {
  TextInput,
  HelperText,
  Button as Buttonx,
  Switch
} from 'react-native-paper';
import styles from './styles';
import {
  View,
  Text,
  ImageBackground,
  I18nManager,
  TouchableOpacity,
  Alert
} from 'react-native';
import SelectPicker2 from '../../components/SelectPicker2';
import SelectPickerWithoutTextInput from '../../components/SelectPickerWithoutTextInput';
import { ROUTE_SEARCH_LIST, ROUTE_LAUNCHER } from '../../utils/constants';
import { Platform } from '../../components/Platform';
import RNRestart from 'react-native-restart';
import { getTranslator } from '../../components/Translator';
import Autocomplete from '../../components/Autocomplete';
import Geolocation from '@react-native-community/geolocation';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { loadNearbyHospitals } from '../SearchListPage/ducks';
import { setSearchAndCountry } from './ducks';
// import GPSState from 'react-native-gps-state';
import GPSState from '../../components/Gps';
import { getLocalizeRoute } from '../../utils/helper';
import Lottie from '../../components/Lottie';
import animation from './doctor.json';
import queryString from 'query-string';

const FormSearchDoctorPage: React.SFC<FormSearchDoctorPageProps> = ({
  intl,
  onSubmit,
  push,
  ...props
  // loadCountryList
}) => {
  const getLocation = () => {
    if (Platform.OS != 'web') {
      // GPSState.openLocationSettings();

      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse'
      });
      Geolocation.getCurrentPosition(
        position => {
          if (position.coords.latitude && position.coords.latitude !== 0) {
            props.pushSelectedLocation(
              position.coords.latitude,
              position.coords.longitude
            );

            props.loadNearbyHospitals(
              `${position.coords.latitude},${position.coords.longitude}`,
              null,
              0
            );
          } else {
            null;
          }
        },
        error => {
          console.warn('No GPS', error);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }
  };
  const DefaultFields = {
    search: '',
    country:
      props.searchDoctor.selected.country > 0
        ? props.searchDoctor.selected.country
        : '',
    city: '',
    insurance: ''
  };
  const Schema = yup.object().shape({
    search: yup.string()
  });

  const [list, setList] = useState({
    city: false,
    insurance: false
  });
  const [selected, setSelected] = useState({
    country: '',
    city: 'null',
    insurance: null
  });

  const onCancelCity = () => {
    setList({ ...list, city: false });
  };
  const onCancelInsurance = () => setList({ ...list, insurance: false });

  const selectedOption =
    selected.country == ''
      ? ''
      : selected.city == ''
      ? `${selected.country}`
      : selected.insurance == ''
      ? `${selected.country}, ${selected.city}`
      : `${selected.country}, ${selected.city}, ${selected.insurance}`;

  let countries = props.countries.map(country => ({
    label: getTranslator('country', country, '_arabic'),
    value: country.id
  }));

  const allCities = [
    { label: intl.formatMessage(messages.allCities), value: '1' }
  ];
  const cities = props.cities.map(cities => ({
    label: getTranslator('city', cities, '_arabic'),
    value: cities.id
  }));
  const citiesList = allCities.concat(cities);

  useEffect(() => {
    getLocation();
    if (Platform.OS !== 'web') {
      GPSState.addListener(status => {
        switch (status) {
          case GPSState.NOT_DETERMINED:
            // alert(
            //   'Please, allow the location, for us to do amazing things for you!'
            // );
            break;

          case GPSState.RESTRICTED:
            // GPSState.openLocationSettings()
            break;

          case GPSState.DENIED:
            // alert('It`s a shame that you do not allowed us to use location :(');
            break;

          case GPSState.AUTHORIZED_ALWAYS:
            getLocation();
            //TODO do something amazing with you app
            break;

          case GPSState.AUTHORIZED_WHENINUSE:
            getLocation();
            //TODO do something amazing with you app
            break;
        }
      });
      return () => {
        GPSState.removeListener();
      };
    }
  }, []);

  const getQuery = (data = {}) => {
    data = { ...props.searchDoctor.selected, ...data };
    let query = queryString.stringify(data);
    query = query != '' ? '?' + query : query;
    return query;
  };

  // add current location to country list if user accept permission
  let myCurrentLocation: any = [];
  if (props.searchDoctor.selected.latitude > 0) {
    myCurrentLocation = [
      { label: intl.formatMessage(messages.myCurrentLocation), value: '1' }
    ];
  } else {
    myCurrentLocation = [
      {
        label: intl.formatMessage(messages.myCurrentLocationNotActive),
        disabled: true,
        gpsValue: true,
        value: '1'
      }
    ];
  }
  countries = myCurrentLocation.concat(countries);

  return (
    <Formik
      enableReinitialize={true}
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
        setFieldValue
      }) => {
        // console.log('values', values);
        // console.log('countries', countries);
        return (
          <>
            <View style={styles.mainContainer}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  height: Platform.OS == 'web' ? 200 : 200
                  // borderWidth: 1,
                  // borderColor: 'blue'
                }}
              >
                {Platform.OS == 'web' ? (
                  <Lottie
                    height={400}
                    width={400}
                    // speed={1}
                    options={{
                      animationData: animation
                    }}
                  />
                ) : (
                  <Lottie source={require('./doctor.json')} autoPlay loop />
                )}
              </View>
              <View style={styles.cnteredContainer}>
                <View style={styles.welecomeContainer}>
                  <Text style={styles.welecomeText}>
                    <FormattedMessage {...messages.bookBestDoctors} />
                  </Text>
                  <Text style={styles.searchDescriptionText}>
                    <FormattedMessage {...messages.searchDescription} />
                  </Text>
                </View>
                <View style={styles.searchContainer}>
                  <View
                  // style={{ zIndex: 6 }}
                  >
                    <Autocomplete
                      theme={{
                        colors: {
                          text: 'black',
                          disabled: 'black',
                          background: 'rgb(0, 0, 0,0)',
                          placeholder: 'black',
                          primary: 'black'
                        }
                      }}
                      array={props.searchDoctor.suggestData}
                      // field="name"
                      loading={props.searchDoctor.suggestLoading}
                      label={<FormattedMessage {...messages.searchInput} />}
                      value={val => {
                        // console.log('val', val);
                        setFieldValue('search', val);

                        props.setSearchWord(val);
                        // setTt(false);
                      }}
                      mode='flat'
                      initialArray={props.searchDoctor.specialities}
                      onChangeText={text => {
                        props.suggestSearch(text);
                      }}
                      error={() => {
                        console.log('field invalid');
                      }}
                    />
                  </View>
                  <HelperText
                    type='error'
                    visible={errors.search && touched.search ? true : false}
                  >
                    {errors.search}
                  </HelperText>

                  <SelectPicker2
                    title={
                      <FormattedMessage {...messages.selectPicker2Title} />
                    }
                    showModal={list.country}
                    showFilter={true}
                    label={<FormattedMessage {...messages.location} />}
                    value={
                      // values.country
                      selectedOption !== ''
                        ? selectedOption.length > 40
                          ? selectedOption.substring(0, 40) + `...`
                          : selectedOption
                        : selectedOption
                    }
                    onSelect={(value, label) => {
                      if (value == '1') {
                        props.setSearchAndCountry(values.search, 1);
                        // setFieldValue('country', '');
                        // setFieldValue('city', '');
                        // setFieldValue('insurance', '');
                        // setSelected({
                        //   country: label,
                        //   city: '',
                        //   insurance: ''
                        // });
                        // getLocation();
                        push(getLocalizeRoute(ROUTE_SEARCH_LIST));
                      } else {
                        setFieldValue('country', value);
                        setFieldValue('city', '');
                        setFieldValue('insurance', '');
                        props.loadCitiesList(value);
                        props.loadInsurancesList(value);
                        setList({ ...list, city: true });
                        setSelected({
                          country: label,
                          city: '',
                          insurance: ''
                        });
                      }
                    }}
                    theme={{
                      colors: {
                        text: 'black',
                        disabled: 'black',
                        background: 'rgb(0, 0, 0,0)',
                        placeholder: 'black',
                        primary: 'black'
                      }
                    }}
                    options={countries}
                  />
                  <HelperText
                    type='error'
                    visible={errors.country && touched.country ? true : false}
                  >
                    {errors.country}
                  </HelperText>
                  {/* {console.log('will CALL', list.city)} */}
                  {values.country == '' ? null : (
                    <>
                      {list.city ? (
                        <>
                          {/* {console.log('CALLED?')} */}
                          <SelectPickerWithoutTextInput
                            title={
                              <FormattedMessage {...messages.selectCity} />
                            }
                            onCancel={onCancelCity}
                            showFilter={true}
                            label={<FormattedMessage {...messages.city} />}
                            onSelect={(value, label) => {
                              if (value == '1') {
                                setFieldValue('city', '');
                                setList({ city: false, insurance: true });
                                setSelected({ ...selected, city: label });
                              } else {
                                setFieldValue('city', value);
                                props.pushSelectedCity(value);
                                setList({ city: false, insurance: true });
                                setSelected({ ...selected, city: label });
                              }
                            }}
                            loading={props.loading}
                            theme={{
                              colors: {
                                text: 'black',
                                disabled: 'black',
                                background: 'rgb(0, 0, 0,0)',
                                placeholder: 'black',
                                primary: 'black'
                              }
                            }}
                            options={citiesList}
                            // options={props.cities.map(cities => ({
                            //   label: getTranslator('city', cities, '_arabic'),
                            //   value: cities.id
                            // }))}
                          />
                        </>
                      ) : null}

                      {props.insurances.length > 0 && list.insurance ? (
                        <>
                          <SelectPickerWithoutTextInput
                            title={
                              <FormattedMessage {...messages.selectInsurance} />
                            }
                            onCancel={onCancelInsurance}
                            showFilter={true}
                            onSelect={(value, label) => {
                              setFieldValue('insurance', value);
                              props.pushSelectedInsurance(value);
                              setList({ ...list, insurance: false });
                              setSelected({ ...selected, insurance: label });
                              if (values.search !== '') {
                                props.setSearchWord(values.search);
                              }
                              push(
                                getLocalizeRoute(
                                  ROUTE_SEARCH_LIST +
                                    getQuery({ insurance_id: value })
                                )
                              );
                            }}
                            loading={props.loading}
                            theme={{
                              colors: {
                                text: 'black',
                                disabled: 'black',
                                background: 'rgb(0, 0, 0,0)',
                                placeholder: 'black',
                                primary: 'black'
                              }
                            }}
                            options={props.insurances.map(insurances => ({
                              label: getTranslator(
                                'insurance',
                                insurances,
                                '_arabic'
                              ),
                              value: insurances.id
                            }))}
                          />
                        </>
                      ) : null}
                    </>
                  )}

                  <Buttonx
                    disabled={
                      values.search !== '' || values.country !== ''
                        ? false
                        : true
                    }
                    style={styles.button}
                    contentStyle={styles.contentStyleButton}
                    mode='contained'
                    // dark={true}
                    onPress={() => {
                      if (values.search !== '') {
                        props.setSearchWord(values.search);
                      }
                      // queryString
                      // let query = {};
                      // if( props.searchDoctor.country != ''){
                      //   query = {...query,}
                      // }

                      push(getLocalizeRoute(ROUTE_SEARCH_LIST + getQuery()));
                    }}
                    // onPress={handleSubmit}
                    loading={isSubmitting}
                  >
                    <FormattedMessage {...messages.searchButton} />
                  </Buttonx>
                </View>
                {/* {props.language == 'en'} */}

                {props.userId == 0 ? (
                  <View style={styles.languageContainer}>
                    {I18nManager.isRTL ? (
                      <Text>عربي</Text>
                    ) : (
                      <Text>ENGLISH</Text>
                    )}
                    <Switch
                      value={
                        Platform.OS == 'ios'
                          ? true
                          : I18nManager.isRTL
                          ? false
                          : true
                      }
                      onValueChange={() => {
                        if (Platform.OS !== 'web') {
                          props.changeLocale(
                            props.language == 'en' ? 'ar' : 'en'
                          );
                          setTimeout(() => {
                            RNRestart.Restart();
                          }, 200);
                        } else {
                          push(
                            props.language == 'en'
                              ? getLocalizeRoute(ROUTE_LAUNCHER, 'ar')
                              : getLocalizeRoute(ROUTE_LAUNCHER, 'en')
                          );
                        }
                      }}
                      style={{
                        marginHorizontal: 10,
                        transform: [{ rotate: '180deg' }]
                      }}
                    />
                    {I18nManager.isRTL ? (
                      <Text>ENGLISH</Text>
                    ) : (
                      <Text>عربي</Text>
                    )}
                  </View>
                ) : null}
              </View>
            </View>
          </>
        );
      }}
    />
  );
};

function mapDispatchToProps(dispatch) {
  return {
    loadNearbyHospitals: (lat_long: string, limit: number, offset: number) =>
      dispatch(loadNearbyHospitals(lat_long, limit, offset)),
    setSearchAndCountry: (search: string, country: number) =>
      dispatch(setSearchAndCountry(search, country))
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps
);

export default compose(withConnect)(FormSearchDoctorPage);
