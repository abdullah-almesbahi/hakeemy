/**
 *
 * HospitalRegistrationPage
 *
 */

import React, { memo, useEffect, useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';
// import { useInjectReducer } from '../../utils/injectReducer';
import reducer, {
  makeSelectHospitalRegistrationPage,
  loadCountryList,
  loadCitiesList,
  loadInsurancesList,
  selectCheckbox,
  makeSelectedCheckedbox,
  unselectCheckbox,
  createNewHospital,
  makeDisabled,
  makeEnable,
  hospitalUpdate,
  loadSelectedCheckbox
} from './ducks';
import { HospitalRegistrationPageProps } from './types';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

import FormHospitalRegistrationPage from './formik';

import { Appbar } from 'react-native-paper';
import { DrawerContext } from '../../hooks/useDrawerContext';
import Helmet from '../../components/Helmet';

import styles from './styles';
import LoadingIndicator from '../../components/LoadingIndicator';
import { makeSelectUser, logoutUser, setUserType } from '../User/ducks';
import { showSnackbar } from '../Snackbar/ducks';
import SafeAreaView from 'react-native-safe-area-view';
import { ThemeContext } from '../../hooks/useThemeContext';
import { Platform } from '../../components/Platform';
import { getTranslator } from '../../components/Translator';
import { getSiteName } from '../../utils/helper';

const HospitalRegistrationPage = (props: HospitalRegistrationPageProps) => {
  // useInjectReducer({ key: 'hospitalRegistrationPage', reducer });
  useInjectSaga({ key: 'hospitalRegistrationPage', saga });
  // const openDrawer = React.useContext(DrawerContext);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    props.loadCountryList();
    if (
      props.user.id > 0 &&
      props.user.insurance &&
      props.user.insurance.length > 0
    ) {
      props.loadSelectedCheckbox(props.user.insurance);
    }
    // if (props.user.id > 0) {
    //   props.loadCitiesList(2);
    //   props.loadInsurancesList(2);
    // }
    // props.user.id > 0 ? (props.loadCitiesList()
    // props.loadInsurancesList()) : null
  }, []);

  // const asas = a => {
  //   const qq = a.map(b => ({
  //     label: getTranslator('insurance', b, '_arabic'),
  //     value: b.id
  //   }));
  //   return qq;
  // };
  // console.log('<<<<<<<<<<', asas(props.user.insurance));

  return (
    <View style={styles.container}>
      <Helmet
        titleTemplate={getSiteName()}
        title={props.intl.formatMessage(messages.hospitalRegistration)}
      />
      {props.hospitalRegistration.countryData &&
      props.hospitalRegistration.countryData.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <LoadingIndicator />
        </View>
      ) : (
        <FormHospitalRegistrationPage
          user={props.user}
          countries={props.hospitalRegistration.countryData}
          cities={props.hospitalRegistration.citiesData}
          insurances={props.hospitalRegistration.insurancesData}
          selectedCheckedbox={props.hospitalRegistration.selectedCheckedbox}
          loadCitiesList={props.loadCitiesList}
          loadInsurancesList={props.loadInsurancesList}
          selectCheckbox={props.selectCheckbox}
          unselectCheckbox={props.unselectCheckbox}
          intl={props.intl}
          push={props.push}
          disabledStatus={props.hospitalRegistration.disabledStatus}
          logoutUser={props.logoutUser}
          showSnackbar={props.showSnackbar}
          makeDisabled={props.makeDisabled}
          makeEnable={props.makeEnable}
          setUserType={props.setUserType}
          theme={theme}
          loadSelectedCheckbox={props.loadSelectedCheckbox}
          onSubmit={(values: any, action: any) => {
            // console.log('---------------Index_before', values);
            if (Platform.OS == 'web') {
              let formdata = new FormData();
              for (var k in values) {
                if (values.hasOwnProperty(k)) {
                  if (k == 'insuance') {
                    newData.push({
                      name: 'hospital_insurance',
                      data: `${values[k]}`
                    });
                  } else {
                    formdata.append(k, values[k]);
                  }
                }
              }

              props.onSubmit(formdata, action);
            } else if (Platform.OS == 'android') {
              let newData = [];
              for (var k in values) {
                if (values.hasOwnProperty(k)) {
                  if (k == 'acceptTerms' || k == 'privacyPolicy') {
                    null;
                  } else if (k == 'insuance') {
                    newData.push({
                      name: 'hospital_insurance',
                      data: `${values[k]}`
                    });
                  } else if (k == 'email') {
                    newData.push({
                      name: k,
                      data: values[k].toLowerCase()
                    });
                  } else if (k == 'hospital_logo') {
                    newData.push({
                      ...values[k]
                    });
                  } else {
                    newData.push({
                      name: k,
                      data: values[k]
                    });
                  }
                }
              }
              props.onSubmit(newData, action);
            } else {
              let newData = [];
              for (var k in values) {
                if (values.hasOwnProperty(k)) {
                  if (k == 'hospital_logo') {
                    // if (values[k].name == undefined) {
                    //   null;
                    // } else {
                    newData.push({
                      ...values[k]
                    });
                    // }
                  } else if (k == 'email') {
                    newData.push({
                      name: k,
                      data: values[k].toLowerCase()
                    });
                  } else if (k == 'insuance') {
                    newData.push({
                      name: 'hospital_insurance',
                      data: `${values[k]}`
                    });
                  } else {
                    newData.push({
                      name: k,
                      data: values[k]
                    });
                  }
                }
              }
              // console.log('---------------Index', newData);
              props.onSubmit(newData, action);
            }
          }}
        />
      )}
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  hospitalRegistration: makeSelectHospitalRegistrationPage(),
  user: makeSelectUser()
});

function mapDispatchToProps(dispatch) {
  return {
    push: page => dispatch(push(page)),
    onSubmit: (data: any, action: any) =>
      dispatch(createNewHospital(data, action)),
    loadCountryList: () => dispatch(loadCountryList()),
    loadCitiesList: country => dispatch(loadCitiesList(country)),
    loadInsurancesList: country => dispatch(loadInsurancesList(country)),
    selectCheckbox: values => dispatch(selectCheckbox(values)),
    unselectCheckbox: values => dispatch(unselectCheckbox(values)),
    makeDisabled: () => dispatch(makeDisabled()),
    makeEnable: () => dispatch(makeEnable()),
    logoutUser: () => dispatch(logoutUser()),
    showSnackbar: a => dispatch(showSnackbar(a)),
    setUserType: type => dispatch(setUserType(type)),
    loadSelectedCheckbox: data => {
      // console.log('bbbbb', data);
      const _data = data.map(b => ({
        label: getTranslator('insurance', b, '_arabic'),
        value: b.id && b.id !== '' ? b.id.toString() : null
      }));
      // console.log('wwwwwwwwww', _data);
      return dispatch(loadSelectedCheckbox(_data));
    }
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
)(HospitalRegistrationPage);
