import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import messages from './messages';
import { FormattedMessage } from 'react-intl';
import { FormRegisterPageProps } from './types';
import Header from '../../components/Header';
import {
  TextInput,
  HelperText,
  Button as Buttonx,
  Appbar,
  Checkbox,
  FAB,
  Button,
  Colors,
  ActivityIndicator,
  TouchableRipple,
  Portal,
  Dialog,
  Paragraph
} from 'react-native-paper';
import styles from './styles';
import { View, ScrollView } from 'react-native';
import {
  ROUTE_LAUNCHER,
  ROUTE_MENU,
  ROUTE_PATIENT_LOGIN
} from '../../utils/constants';
import { MaterialCommunityIcons, Text, Small } from '../../components';
import { Linking, TouchableOpacity } from 'react-native';
import PhoneInput from 'react-native-phone-input';
// import ModalPickerImage from './ModalPickerImage';
import makeGrid from '../../components/Grid';
import { Platform } from '../../components/Platform';
import Responsive from '../../components/Responsive';
import { getMenuRoute, getLocalizeRoute } from '../../utils/helper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Grid = makeGrid(16); // gutter size

function equalTo(ref: any, msg: any) {
  return yup.mixed().test({
    name: 'equalTo',
    exclusive: false,
    message: msg || '${path} must be the same as ${reference}',
    params: {
      reference: ref.path
    },
    test: function(value: any) {
      return value === this.resolve(ref);
    }
  });
}
yup.addMethod(yup.string, 'equalTo', equalTo);

const FormRegisterPage: React.SFC<FormRegisterPageProps> = ({
  intl,
  onSubmit,
  push,
  user,
  disabledStatus,
  makeDisabled,
  logoutUser,
  showSnackbar,
  makeEnable,
  ...props
}) => {
  let DefaultFields, Schema;
  // console.log('props.socialInfo', props.socialInfo);
  DefaultFields = {
    name:
      user.id > 0
        ? user.name
        : props.socialInfo.name
        ? props.socialInfo.name
        : '',
    email:
      user.id > 0
        ? user.email
        : props.socialInfo.email
        ? props.socialInfo.email
        : '',
    password: '',
    repeatPassword: '',
    mobile: user.id > 0 ? user.mobile : '+966',
    // age: user.id > 0 ? user.age : '',
    age: user.id && user.age > 0 ? user.age.toString() : '',
    gender: user.id > 0 ? user.gender : 'male',
    mail_subs: user.id > 0 ? user.mail_subs : 'true',
    acceptTerms: user.id > 0 ? true : '',
    api_key: user.id > 0 ? user.api_key : ''
  };
  if (user.id < 1) {
    Schema = yup.object().shape({
      name: yup.string().required(intl.formatMessage(messages.nameRequired)),
      email: yup
        .string()
        .email()
        .required(intl.formatMessage(messages.emailRequired)),
      password: yup
        .string()
        .required(intl.formatMessage(messages.passwordRequired)),
      repeatPassword: yup
        .string()
        .equalTo(yup.ref('password'), 'Passwords must match')
        .required(intl.formatMessage(messages.passwordRequired)),
      mobile: yup
        .number()
        .required(intl.formatMessage(messages.mobileRequired)),
      age: yup
        .number()
        .positive()
        .integer()
        .required(intl.formatMessage(messages.ageRequired)),
      gender: yup
        .string()
        .required(intl.formatMessage(messages.genderRequired)),
      acceptTerms: yup
        .boolean()
        .required(intl.formatMessage(messages.acceptTermsRequired)),
      mail_subs: yup.boolean()
    });
  } else if (user.id > 0) {
    Schema = yup.object().shape({
      name: yup.string().required(intl.formatMessage(messages.nameRequired)),
      email: yup
        .string()
        .email()
        .required(intl.formatMessage(messages.emailRequired)),
      mobile: yup
        .number()
        .required(intl.formatMessage(messages.mobileRequired)),
      age: yup
        .number()
        .positive()
        .integer()
        .required(intl.formatMessage(messages.ageRequired)),
      gender: yup.string().required(intl.formatMessage(messages.genderRequired))
    });
  }
  // const [gender, setGender] = useState('male');
  const [gender, setGender] = useState(user.id > 0 ? user.gender : 'male');
  const [state, setState] = useState({ checked: true });
  // const [state, setState] = useState({
  //   checked: user.id > 0 ? usmail_subser. : true
  // });
  const { checked } = state;
  const [state2, setState2] = useState({ checked2: false });
  const { checked2 } = state2;
  const phone = React.useRef(null);
  const [dialog, setDialog] = useState(false);
  const _showDialog = () => setDialog(true);
  const _hideDialog = () => setDialog(false);

  // phone.current && phone.current.inputPhone ? phone.current.inputPhone._onFocus(() =>
  //   console.log('phone.current.inputPhone.blur()')
  // ) ; console.log('null')

  const openTermsLink = () => {
    const registerUrl = 'https://old.hakeemy.com/home/page/1';
    Linking.canOpenURL(registerUrl).then(supported => {
      if (supported) {
        Linking.openURL(registerUrl);
      } else {
        console.log(`Don't know how to open URI: ${registerUrl}`);
      }
    });
  };

  // console.log('xxxxxxxxxxxxxxx', phone.current.getAllCountries());

  return (
    <>
      <Formik
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
          setFieldValue,
          ...props
        }) => {
          const getHeader = () => {
            if (user.id > 0) {
              if (disabledStatus) {
                return (
                  <Header
                    push={push}
                    title={intl.formatMessage(messages.welcome, {
                      name: user.name
                    })}
                    left={
                      <Responsive
                        small={
                          <Appbar.BackAction
                            onPress={() => {
                              push(getMenuRoute());
                            }}
                            color='black'
                          />
                        }
                        large={
                          <Appbar.BackAction
                            onPress={() => {
                              push(getMenuRoute());
                            }}
                            color='black'
                          />
                        }
                      />
                    }
                    right={
                      <Appbar.Action
                        icon={p => (
                          <MaterialCommunityIcons {...p} name='power' />
                        )}
                        // color='white'
                        onPress={() => {
                          _showDialog();
                        }}
                      />
                    }
                  />
                );
              } else {
                return (
                  <Header
                    push={push}
                    title={intl.formatMessage(messages.editMyProfile)}
                    left={
                      <Appbar.Action
                        icon='close'
                        // color='white'
                        onPress={() => {
                          makeEnable();
                          setFieldValue('name', user.name);
                          setFieldValue('email', user.email);
                          setFieldValue('mobile', user.mobile);
                          setFieldValue('age', user.age);
                          // setFieldValue('gender', user.gender);
                          // setGender(user.gender);
                          // setFieldValue('mail_subs', user.mail_subs);
                        }}
                      />
                    }
                  >
                    <Text />
                    <Appbar.Action
                      icon='check'
                      // color='white'
                      onPress={() => {
                        handleSubmit();
                        makeEnable();
                      }}
                    />
                  </Header>
                );
              }
            } else {
              return (
                <Header
                  push={push}
                  title={intl.formatMessage(messages.signup)}
                  left={
                    <Appbar.Action
                      icon='close'
                      // color='white'
                      onPress={() =>
                        push(getLocalizeRoute(ROUTE_PATIENT_LOGIN))
                      }
                    />
                  }
                >
                  {isSubmitting ? (
                    <ActivityIndicator
                      animating={true}
                      color={Colors.amber100}
                    />
                  ) : (
                    <Appbar.Action
                      icon='check'
                      // color='white'
                      onPress={() => handleSubmit()}
                    />
                  )}
                </Header>
              );
            }
          };
          console.log('errors', errors);
          return (
            <>
              {getHeader()}

              <View
                style={{
                  flex: 1,
                  // alignItems: 'center',
                  // borderWidth: 1,
                  // borderColor: 'red',
                  marginRight: 'auto',
                  marginLeft: 'auto',
                  width: '95%',
                  minWidth: 300,
                  maxWidth: 500
                }}
              >
                <KeyboardAwareScrollView>
                  <View style={styles.bodyContainer}>
                    <TextInput
                      multiline={true}
                      blurOnSubmit={true}
                      maxLength={40}
                      mode='outlined'
                      id='name'
                      style={styles.textInput}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      error={errors.name && touched.name ? true : false}
                      value={values.name}
                      // value={user.id > 0 ? user.name : values.name}
                      disabled={user.id > 0 ? disabledStatus : false}
                      theme={{
                        colors: {
                          disabled: 'gray'
                        }
                      }}
                      label={<FormattedMessage {...messages.name} />}
                    />
                    <HelperText
                      type='error'
                      visible={errors.name && touched.name ? true : false}
                    >
                      {errors.name}
                    </HelperText>
                    {user.id > 0 && user.email == null ? null : (
                      <>
                        <TextInput
                          multiline={true}
                          blurOnSubmit={true}
                          maxLength={40}
                          mode='outlined'
                          id='email'
                          style={styles.textInput}
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          error={errors.email && touched.email ? true : false}
                          value={values.email.trim()}
                          disabled={user.id > 0 ? disabledStatus : false}
                          theme={{
                            colors: {
                              disabled: 'gray'
                            }
                          }}
                          label={<FormattedMessage {...messages.email} />}
                        />
                        <HelperText
                          type='error'
                          visible={errors.email && touched.email ? true : false}
                        >
                          {errors.email}
                        </HelperText>
                      </>
                    )}
                    {user.id > 0 ? null : (
                      <>
                        <TextInput
                          multiline={true}
                          blurOnSubmit={true}
                          maxLength={40}
                          secureTextEntry={true}
                          mode='outlined'
                          id='password'
                          style={styles.textInput}
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                          error={
                            errors.password && touched.password ? true : false
                          }
                          value={values.password.trim()}
                          blurOnSubmit={false}
                          onSubmitEditing={() => Keyboard.dismiss()}
                          label={<FormattedMessage {...messages.password} />}
                        />
                        <HelperText
                          type='error'
                          visible={
                            errors.password && touched.password ? true : false
                          }
                        >
                          {errors.password}
                        </HelperText>
                        <TextInput
                          multiline={true}
                          blurOnSubmit={true}
                          maxLength={40}
                          secureTextEntry={true}
                          mode='outlined'
                          style={styles.textInput}
                          onChangeText={handleChange('repeatPassword')}
                          onBlur={handleBlur('repeatPassword')}
                          error={
                            errors.repeatPassword && touched.repeatPassword
                              ? true
                              : false
                          }
                          value={values.repeatPassword.trim()}
                          blurOnSubmit={false}
                          onSubmitEditing={() => Keyboard.dismiss()}
                          label={
                            <FormattedMessage {...messages.repeatPassword} />
                          }
                        />
                        <HelperText
                          type='error'
                          visible={
                            errors.repeatPassword && touched.repeatPassword
                              ? true
                              : false
                          }
                        >
                          {errors.repeatPassword}
                        </HelperText>
                      </>
                    )}

                    {Platform.OS == 'web' ? (
                      <>
                        <TextInput
                          mode='outlined'
                          keyboardType='phone-pad'
                          onChangeText={handleChange('mobile')}
                          onBlur={handleBlur('mobile')}
                          value={values.mobile}
                          label={<FormattedMessage {...messages.mobile} />}
                          theme={{
                            colors: {
                              background: 'white'
                            }
                          }}
                        />
                        <HelperText
                          type='error'
                          visible={
                            errors.mobile && touched.mobile ? true : false
                          }
                        >
                          {errors.mobile}
                        </HelperText>
                      </>
                    ) : (
                      <View style={{ flexDirection: 'row' }}>
                        <View
                          style={{
                            flex: 1,
                            borderColor: 'gray',
                            marginTop: 6,
                            marginBottom: 22,
                            borderRadius: 5,
                            paddingHorizontal: 10,
                            marginRight: 10,
                            borderWidth: 1,
                            justifyContent: 'center',
                            flexDirection: 'row'
                          }}
                        >
                          <View
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              alignItems: 'flex-start',
                              paddingLeft: 10
                            }}
                          >
                            <PhoneInput
                              ref={phone}
                              disabled={user.id > 0 ? disabledStatus : false}
                              initialCountry='sa'
                              onSelectCountry={a =>
                                setFieldValue(
                                  'mobile',
                                  `+${phone.current.getCountryCode(a)}`
                                )
                              }
                              confirmText={intl.formatMessage(messages.confirm)}
                              cancelText={intl.formatMessage(messages.cancel)}
                              // countriesList={[
                              //   'sa',
                              //   'pk',
                              //   'in',
                              //   'ae',
                              //   'gb',
                              //   'ye',
                              //   'qa',
                              //   'jo',
                              //   'de',
                              //   'us',
                              //   'fr',
                              //   'cz',
                              //   'tr',
                              //   'ua',
                              //   'th',
                              //   'cn',
                              //   'ca',
                              //   'es',
                              //   'kw',
                              //   'bh',
                              //   'eg',
                              //   'om'
                              // ]}
                            />
                          </View>
                        </View>
                        <View style={{ flex: 7 }}>
                          <TextInput
                            multiline={true}
                            blurOnSubmit={true}
                            maxLength={40}
                            mode='outlined'
                            id='mobile'
                            style={styles.textInput}
                            onChangeText={handleChange('mobile')}
                            onBlur={handleBlur('mobile')}
                            // onBlur={handleBlur('mobile')}
                            error={
                              errors.mobile && touched.mobile ? true : false
                            }
                            value={values.mobile}
                            disabled={user.id > 0 ? disabledStatus : false}
                            theme={{
                              colors: {
                                disabled: 'gray'
                              }
                            }}
                            label={<FormattedMessage {...messages.mobile} />}
                          />
                          <HelperText
                            type='error'
                            visible={
                              errors.mobile && touched.mobile ? true : false
                            }
                          >
                            {errors.mobile}
                          </HelperText>
                        </View>
                      </View>
                    )}

                    {user.id > 0 && user.email == null ? null : (
                      <>
                        <TextInput
                          multiline={true}
                          blurOnSubmit={true}
                          maxLength={40}
                          mode='outlined'
                          id='age'
                          style={styles.textInput}
                          onChangeText={handleChange('age')}
                          onBlur={handleBlur('age')}
                          error={errors.age && touched.age ? true : false}
                          value={values.age}
                          disabled={user.id > 0 ? disabledStatus : false}
                          // theme={{
                          //   colors: {
                          //     disabled: 'gray'
                          //   }
                          // }}
                          label={<FormattedMessage {...messages.age} />}
                        />
                        <HelperText
                          type='error'
                          visible={errors.age && touched.age ? true : false}
                        >
                          {errors.age}
                        </HelperText>

                        <View style={{ flexDirection: 'row' }}>
                          <View style={{ flex: 1 }}>
                            <Buttonx
                              disabled={user.id > 0 ? disabledStatus : false}
                              onPress={() => {
                                setGender('male');
                                setFieldValue('gender', '');
                                setFieldValue('gender', 'male');
                              }}
                              mode={
                                gender === 'male' ? 'contained' : 'outlined'
                              }
                              dark={true}
                              style={{
                                marginTop: 7,
                                borderTopEndRadius: 0,
                                borderBottomEndRadius: 0
                              }}
                              contentStyle={{ height: 50 }}
                              // theme={{ colors: { primary: "red" } }}
                            >
                              <FormattedMessage {...messages.maleButton} />
                            </Buttonx>
                          </View>
                          <View style={{ flex: 1 }}>
                            <Buttonx
                              disabled={user.id > 0 ? disabledStatus : false}
                              onPress={() => {
                                setGender('female');
                                setFieldValue('gender', '');
                                setFieldValue('gender', 'female');
                              }}
                              mode={
                                gender === 'female' ? 'contained' : 'outlined'
                              }
                              dark={true}
                              style={{
                                flex: 1,
                                marginTop: 7,
                                borderTopStartRadius: 0,
                                borderBottomStartRadius: 0
                              }}
                              contentStyle={{ height: 50 }}
                            >
                              <FormattedMessage {...messages.femaleButton} />
                            </Buttonx>
                          </View>
                        </View>
                        <HelperText
                          type='error'
                          visible={
                            errors.gender && touched.gender ? true : false
                          }
                        >
                          {errors.gender}
                        </HelperText>
                      </>
                    )}

                    {user.id > 0 ? null : (
                      <>
                        <View style={styles.checkBox}>
                          <Checkbox.Android
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => {
                              setState({ checked: !checked });
                              setFieldValue('mail_subs', !checked);
                            }}
                            disabled={user.id > 0 ? disabledStatus : false}
                          />
                          <Text
                            style={{
                              flex: 1,
                              flexWrap: 'wrap',
                              textAlign: 'left'
                            }}
                          >
                            {intl.formatMessage(messages.wellness)}
                          </Text>
                        </View>

                        <HelperText
                          type='error'
                          visible={
                            errors.mail_subs && touched.mail_subs ? true : false
                          }
                        >
                          {errors.mail_subs}
                        </HelperText>

                        <View style={styles.checkBox}>
                          <Checkbox.Android
                            status={checked2 ? 'checked' : 'unchecked'}
                            onPress={() => {
                              setState2({ checked2: !checked2 });
                              checked2
                                ? setFieldValue('acceptTerms', '')
                                : setFieldValue('acceptTerms', !checked2);
                            }}
                            style={{ marginBottom: 50 }}
                          />
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-end'
                            }}
                          >
                            <Text>
                              {intl.formatMessage(messages.acceptTerms)}
                            </Text>
                            <TouchableRipple
                              onPress={openTermsLink}
                              rippleColor='rgba(0, 0, 0, .32)'
                            >
                              <Text style={{ color: 'blue' }}>
                                {intl.formatMessage(messages.acceptTerms2)}
                              </Text>
                            </TouchableRipple>
                          </View>
                        </View>
                        <HelperText
                          type='error'
                          visible={
                            errors.acceptTerms && touched.acceptTerms
                              ? true
                              : false
                          }
                        >
                          {errors.acceptTerms}
                        </HelperText>
                      </>
                    )}
                  </View>
                </KeyboardAwareScrollView>
                {user.id > 0 && disabledStatus ? (
                  <FAB
                    style={styles.fab}
                    icon={p => (
                      <MaterialCommunityIcons
                        {...p}
                        name='pencil'
                        // color='white'
                      />
                    )}
                    onPress={() => {
                      makeDisabled();
                    }}
                  />
                ) : null}
              </View>
            </>
          );
        }}
        onSubmit={onSubmit}
      />
      <Portal>
        <Dialog
          visible={dialog}
          onDismiss={_hideDialog}
          style={{ maxWidth: 500, marginHorizontal: 'auto' }}
        >
          <Dialog.Title>
            {intl.formatMessage(messages.confirmLogout)}
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph>{intl.formatMessage(messages.sureToLogout)}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={_hideDialog}>
              {intl.formatMessage(messages.cancel)}
            </Button>
            <Button
              onPress={() => {
                logoutUser();
                showSnackbar(
                  intl.formatMessage(messages.successfullySignedOut)
                );
                push(getLocalizeRoute(ROUTE_PATIENT_LOGIN));
                _hideDialog();
              }}
              mode='contained'
            >
              {intl.formatMessage(messages.logout)}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

export default FormRegisterPage;
