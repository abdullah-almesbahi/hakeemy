/**
 *
 * LoginPage
 *
 */

import React, { memo, useRef, useState, useEffect } from 'react';
import {
  View,
  Linking,
  LinkingIOS,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Alert,
  ScrollView
} from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { loginRequest } from './ducks';
import { makeSelectUserType } from '../User/ducks';
import { makeSelectLocale } from '../../containers/LanguagePage/ducks';
import { createStructuredSelector } from 'reselect';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

import { Formik } from 'formik';
import * as yup from 'yup';

import LauncherBackground from '../../components/LauncherBackground';
import Helmet from '../../components/Helmet';
import { Appbar, Button, TouchableRipple } from 'react-native-paper';
import Text from '../../components/Text';
import Logo from '../../components/Logo';
import InnerLoginForm from './form';
import Sentry from '../../components/Sentry';

import styles from './styles';
// must import even if not used , just to load icon for web
import {
  ROUTE_LAUNCHER,
  ROUTE_REGISTER,
  ROUTE_FORGET_PASSWORD,
  ROUTE_HOSPITAL_REGISTRATION
} from '../../utils/constants';
import { HOSPITAL_TYPE } from '../../utils/constants';
import { themeHospital, themePatient } from '../../containers/App/themes';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from '../../components/GoogleSignin';

import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';
import { setInfo, makeSelectRegisterPage } from '../PatientRegisterPage/ducks';
import LoadingIndicator from '../../components/LoadingIndicator';
import LoginWithFacebook from '../../components/LoginWithFacebook';
import { Platform } from '../../components/Platform';
import HeaderWrapper from '../../components/HeaderWrapper';
import { getSiteName, getLocalizeRoute } from '../../utils/helper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const isPatientsExists = gql`
  query QuerySearchDoctor($_email: PatientWhereInput) {
    patients(where: $_email) {
      password
      email
    }
  }
`;

export const LoginPage = props => {
  const [_Email, setEmail] = useState(null);
  const _form = useRef(null);
  const [checkingExistince, { loading, error, data }] = useLazyQuery(
    isPatientsExists
  );
  useEffect(() => {
    if (Platform.OS != 'web') {
      GoogleSignin.configure({
        webClientId:
          '340236516235-issh1hqpkf9il4k9bc2di9d7amhrrg29.apps.googleusercontent.com'
      });
    }
  }, []);

  useEffect(() => {
    applyChanges(data);
  }, [data]);
  // useEffect(() => {
  //   if (_Email != null) {
  //     applyChanges({
  //       patients: [
  //         {
  //           __typename: 'Patient',
  //           email: 'masteryo.sa@gmail.com',
  //           password: '123123'
  //         }
  //       ]
  //     });
  //   }
  // }, [_Email]);

  const applyChanges = _data => {
    //

    if (!loading && _data != undefined) {
      // console.log(_Email, _data);

      // Sentry.captureException(`[oo]:  ${_data} `);
      // console.log('entered');
      if (
        _data &&
        _data.patients[0] &&
        _data.patients[0].email.toLowerCase() == _Email.toLowerCase()
      ) {
        // Sentry.captureException(`[Network error]: 2222222`);
        login(_data);
      } else {
        // console.log('going to push');
        // Sentry.captureException(`[Network error]: 4444444`);
        props.push(getLocalizeRoute(ROUTE_REGISTER));
      }
    }
  };

  const login = _data => {
    // Sentry.captureException(`[Network error]: 3333333`);
    props.onSubmit(
      {
        email:
          _data && _data.patients[0] && _data.patients[0].email.toLowerCase(),
        password: _data && _data.patients[0] && _data.patients[0].password
      },
      null
    );
  };

  // Google sign

  const _signIn = async () => {
    //Prompts a modal to let the user sign in into your application.
    try {
      await GoogleSignin.hasPlayServices({
        //Check if device has Google Play Services installed.
        //Always resolves to true on iOS.
        showPlayServicesUpdateDialog: true
      });
      const userInfo = await GoogleSignin.signIn();
      // console.log('xxx', userInfo);
      // setGoogle({ ...google, userInfo: userInfo });
      setEmail(userInfo.user.email);
      checkingExistince({
        variables: {
          _email: { email: userInfo.user.email }
        }
      });
      // socialEmail = userInfo.user.email;
      // console.log('User Info --> ', userInfo.user.email, userInfo.user.name);
      props.setInfo(userInfo.user.name, userInfo.user.email);

      // props.onSubmit({}, actions);
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };

  const loginFormSchema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required()
  });

  // if (props.userInfo.email !== '' && !loading && _Email !== null) {
  // Sentry.captureException(`[Network error]: 1111111`);
  // if (
  //   data &&
  //   data.patients[0] &&
  //   data.patients[0].email.toLowerCase() == _Email.toLowerCase()
  // ) {
  //   // Sentry.captureException(`[Network error]: 2222222`);
  //   login();
  // } else {
  //   // Sentry.captureException(`[Network error]: 4444444`);
  //   props.push(ROUTE_REGISTER);
  // }
  // }

  // return null;

  return (
    <LauncherBackground type={props.type}>
      <Helmet
        titleTemplate={getSiteName()}
        title={props.intl.formatMessage(messages.title)}
      />
      <HeaderWrapper>
        <Appbar.BackAction
          onPress={() => props.push(getLocalizeRoute(ROUTE_LAUNCHER))}
        />
        <Appbar.Content
          color='black'
          title={props.intl.formatMessage(messages.signin)}
        />
        <Appbar.Action
          icon='check'
          onPress={() => {
            _form.current.handleSubmit();
          }}
        />
      </HeaderWrapper>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <KeyboardAwareScrollView>
          <View style={styles.mainContainer}>
            <View style={styles.logoContainer}>
              <Logo type={props.type} />
            </View>
            <View style={styles.formContainer}>
              <Formik
                initialValues={{
                  email: '',
                  password: ''
                }}
                ref={_form}
                validationSchema={loginFormSchema}
                render={p => <InnerLoginForm {...p} />}
                onSubmit={props.onSubmit}
                // onSubmit={props.onSubmit}
              />
            </View>
            <View style={styles.creatAndSignUpContainer}>
              {/*<Text style={{ color: "white", fontSize: 16 }}>
              Forget your password?
            </Text>*/}
              <TouchableOpacity
                onPress={() =>
                  props.push(getLocalizeRoute(ROUTE_FORGET_PASSWORD))
                }
              >
                <Text style={{ fontSize: 16, color: 'white' }}>
                  {props.intl.formatMessage(messages.forgot)}
                </Text>
              </TouchableOpacity>

              <View style={{ flexDirection: 'row' }}>
                <Text
                  light
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    fontSize: 16
                  }}
                >
                  {props.intl.formatMessage(messages.noAccount)}&nbsp;
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    props.type === HOSPITAL_TYPE
                      ? props.push(
                          getLocalizeRoute(ROUTE_HOSPITAL_REGISTRATION)
                        )
                      : props.push(getLocalizeRoute(ROUTE_REGISTER))
                  }
                >
                  <Text
                    light
                    style={{
                      color:
                        props.type === HOSPITAL_TYPE
                          ? themeHospital.colors.primary
                          : themePatient.colors.primary,
                      fontWeight: 'bold',
                      marginTop: 10,
                      fontSize: 16
                    }}
                  >
                    <FormattedMessage {...messages.signUp} />
                  </Text>
                </TouchableOpacity>
              </View>
              {/* {props.type === HOSPITAL_TYPE ||
                    Platform.OS == 'web' ? null : (
                      <View>
                        <View style={{ marginTop: 15, marginBottom: 0 }}>
                          <View style={{ alignItems: 'center' }}>
                            <View
                              style={{
                                backgroundColor: 'white',
                                borderRadius: 2
                              }}
                            >
                              <TouchableRipple
                                mode={'contained'}
                                onPress={_signIn}
                                style={{ width: 304, height: 40 }}
                                theme={{ colors: { background: 'white' } }}
                              >
                                <View
                                  style={{
                                    flex: 1,
                                    flexDirection: 'row'
                                  }}
                                >
                                  <View
                                    style={{
                                      flex: 1,
                                      justifyContent: 'center',
                                      alignItems: 'center'
                                    }}
                                  >
                                    <Image
                                      source={require('../../images/search.png')}
                                      style={{ width: 18, height: 18 }}
                                      // source={{ url: '../../images/search.png' }}
                                    />
                                  </View>
                                  <View
                                    style={{
                                      flex: 6,
                                      justifyContent: 'center',
                                      paddingHorizontal: 8,
                                      alignItems: 'flex-start'
                                    }}
                                  >
                                    <Text
                                      style={{
                                        color: '#747474',
                                        fontWeight: 'bold'
                                      }}
                                    >
                                      {props.intl.formatMessage(
                                        messages.SignInGoogle
                                      )}
                                    </Text>
                                  </View>
                                </View>
                              </TouchableRipple>
                            </View>
                          </View>
                        </View>

                        <LoginWithFacebook
                          onLogin={result => {
                            setEmail(result.email);
                            props.setInfo(result.name, result.email);
                            checkingExistince({
                              variables: {
                                _email: { email: result.email }
                              }
                            });
                          }}
                        />
                      </View>
                    )} */}
            </View>
          </View>
        </KeyboardAwareScrollView>
      )}
    </LauncherBackground>
  );
};

const mapStateToProps = createStructuredSelector({
  type: makeSelectUserType(),
  language: makeSelectLocale(),
  userInfo: makeSelectRegisterPage()
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (values, actions) =>
      dispatch(
        loginRequest({
          values,
          actions
        })
      ),
    push: page => dispatch(push(page)),
    setInfo: (name, email) => dispatch(setInfo(name, email))
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
)(LoginPage);
