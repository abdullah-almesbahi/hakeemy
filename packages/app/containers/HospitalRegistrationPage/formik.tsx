import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import messages from './messages';
import { FormattedMessage } from 'react-intl';
import { FormHospitalRegistrationPageProps } from './types';
import Header from '../../components/Header';
import {
  TextInput,
  HelperText,
  Button as Buttonx,
  Appbar,
  FAB,
  IconButton,
  Avatar,
  Button,
  ActivityIndicator,
  Colors,
  Checkbox,
  Portal,
  Dialog,
  Paragraph
} from 'react-native-paper';
import styles from './styles';
import {
  ScrollView,
  View,
  Text,
  Keyboard,
  Linking,
  TouchableOpacity,
  I18nManager
} from 'react-native';
import SelectPicker from '../../components/SelectPicker';
import MultiSelect from '../../components/MultiSelect';
import {
  ROUTE_MENU,
  ROUTE_HOSPITAL_LOGIN,
  ROUTE_PATIENT_LOGIN
} from '../../utils/constants';
import { MaterialCommunityIcons, Small } from '../../components';
import { themeHospital } from '../App/themes';
import { HOSPITAL_TYPE } from '../../utils/constants';
import { Platform } from '../../components/Platform/index.web';
import ImagePicker from '../../components/ImagePicker';
import LocationPicker from '../../components/LocationPicker';
import { MediaTypeOptions } from '../../components/ImagePicker/types';
import { getTranslator } from '../../components/Translator';
import PhoneInput from 'react-native-phone-input';

import makeGrid from '../../components/Grid';
import Responsive from '../../components/Responsive';
import { getMenuRoute, getLocalizeRoute, isHospital } from '../../utils/helper';
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

const FormHospitalRegistrationPage: React.SFC<
  FormHospitalRegistrationPageProps
> = ({ intl, onSubmit, push, ...props }) => {
  const [type, setType] = useState(props.user.id > 0 ? props.user.type : '');
  const hospital_logo = React.useRef(null);
  const ref = React.useRef(null);
  const [state2, setState2] = useState({ checked2: false });
  const [privacyPolicy, setPrivacyPolicyState] = useState({ checked3: false });
  const [dialog, setDialog] = useState(false);
  const _showDialog = () => setDialog(true);
  const _hideDialog = () => setDialog(false);
  const { checked2 } = state2;
  const { checked3 } = privacyPolicy;
  const phone = React.useRef(null);

  // let DefaultFields, Schema;
  // DefaultFields = {
  //   type: props.user.id > 0 ? props.user.type : 'hospital',
  //   email: props.user.id > 0 ? props.user.email : 'tesdfg@hakeemy.com',
  //   password: '123',
  //   repeatPassword: '123',
  //   hospital_name: props.user.id > 0 ? props.user.hospital : 'aaa',
  //   arabic_name: props.user.id > 0 ? props.user.hospital_arabic : 'ds',
  //   country: '2',
  //   city: props.user.id > 0 ? props.user.city_id : '24',
  //   // insuance:
  //   //   props.user.id > 0
  //   //     ? props.user.insurance && props.user.insurance.length
  //   //       ? props.user.insurance.map(a => a)
  //   //       : ''
  //   //     : '',
  //   insuance: props.user.id > 0 ? props.user.insurance.map(a => a) : '1',
  //   phone: props.user.id > 0 ? props.user.phone : '+966',
  //   address: props.user.id > 0 ? props.user.address : 'jhg',
  //   address_arabic: props.user.id > 0 ? props.user.address_arabic : 'jhg',
  //   location: props.user.id > 0 ? props.user.location : 'uu',
  //   latLong:
  //     props.user.id > 0
  //       ? `${props.user.latLong}, ${props.user.latitude}`
  //       : '37.4219997,-122.0840575',
  //   hospital_logo: props.user.id > 0 ? props.user.hospital_logo : '',
  //   acceptTerms: props.user.id > 0 ? true : true,
  //   privacyPolicy: props.user.id > 0 ? true : true
  // };
  let DefaultFields, Schema;
  DefaultFields = {
    type: props.user.id > 0 ? props.user.type : '',
    email: props.user.id > 0 ? props.user.email : '',
    password: '',
    repeatPassword: '',
    hospital_name: props.user.id > 0 ? props.user.hospital : '',
    arabic_name: props.user.id > 0 ? props.user.hospital_arabic : '',
    country: '',
    city: props.user.id > 0 ? props.user.city_id.toString() : '',
    // city: props.user.id > 0 ? props.user.city_id.toString() : '',
    insuance:
      props.user.id > 0
        ? props.user.insurance && props.user.insurance.length > 0
          ? props.user.insurance.map(a => a.id)
          : ''
        : '',
    // insuance: props.user.insurance.map(a => a.insurance).join(),
    phone: props.user.id > 0 ? props.user.phone : '+966',
    address: props.user.id > 0 ? props.user.address : '',
    address_arabic: props.user.id > 0 ? props.user.address_arabic : '',
    location: props.user.id > 0 ? props.user.location : '',
    latLong:
      props.user.id > 0 ? `${props.user.latLong}, ${props.user.latitude}` : '',
    latitude: props.user.id > 0 ? props.user.latitude : '',
    longitude: props.user.id > 0 ? props.user.longitude : '',
    hospital_logo: props.user.id > 0 ? props.user.logo : '',
    acceptTerms: props.user.id > 0 ? true : '',
    privacyPolicy: props.user.id > 0 ? true : ''
  };
  if (props.user.id < 1) {
    Schema = yup.object().shape({
      type: yup.string().required(intl.formatMessage(messages.typeRequired)),
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
      hospital_name: yup
        .string()
        .required(intl.formatMessage(messages.hospital_nameRequired)),
      arabic_name: yup
        .string()
        .required(intl.formatMessage(messages.arabic_nameRequired)),
      country: yup
        .number()
        .required(intl.formatMessage(messages.countryRequired)),
      city: yup.number().required(intl.formatMessage(messages.cityRequired)),
      insuance: yup
        .array()
        // .of(yup.object().shape({}) )
        .required(intl.formatMessage(messages.insuranceRequired)),
      phone: yup.number().required(intl.formatMessage(messages.phoneRequired)),
      address: yup
        .string()
        .required(intl.formatMessage(messages.addressRequired)),
      address_arabic: yup
        .string()
        .required(intl.formatMessage(messages.address_arabicRequired)),
      location: yup
        .string()
        .required(intl.formatMessage(messages.locationRequired)),
      hospital_logo: yup
        .string()
        .required(intl.formatMessage(messages.hospital_logoRequired)),
      acceptTerms: yup
        .boolean()
        .required(intl.formatMessage(messages.acceptTermsRequired)),
      privacyPolicy: yup
        .boolean()
        .required(intl.formatMessage(messages.acceptPrivacyPolicyRequired))
    });
  } else if (props.user.id > 0) {
    Schema = yup.object().shape({
      type: yup.string().required(intl.formatMessage(messages.typeRequired)),
      email: yup
        .string()
        .email()
        .required(intl.formatMessage(messages.emailRequired)),
      hospital_name: yup
        .string()
        .required(intl.formatMessage(messages.hospital_nameRequired)),
      arabic_name: yup
        .string()
        .required(intl.formatMessage(messages.arabic_nameRequired)),
      // country: yup
      //   .number()
      //   .required(intl.formatMessage(messages.countryRequired)),
      city: yup.number().required(intl.formatMessage(messages.cityRequired)),
      insuance: yup
        // .string()
        .number()
        .typeError(intl.formatMessage(messages.insuranceRequired))
        .required(intl.formatMessage(messages.insuranceRequired)),
      phone: yup.number().required(intl.formatMessage(messages.phoneRequired)),
      address: yup
        .string()
        .required(intl.formatMessage(messages.addressRequired)),
      address_arabic: yup
        .string()
        .required(intl.formatMessage(messages.address_arabicRequired)),
      location: yup
        .string()
        .required(intl.formatMessage(messages.locationRequired)),
      hospital_logo: yup
        .string()
        .required(intl.formatMessage(messages.hospital_logoRequired))
    });
  }
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

  const _pickImage = async (e: any) => {
    if (Platform.OS === 'web') {
      let response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3]
      });

      ref.current.setFieldValue('hospital_logo', response);
    } else {
      // More info on all the options is below in the API Reference... just some common use cases shown here
      const options = {
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
        storageOptions: {
          skipBackup: true
        }
      };
      /**
       * The first arg is the options object for customization (it can also be null or omitted for default options),
       * The second arg is the callback which sends object: response (more info in the API Reference)
       */
      // @ts-ignore
      ImagePicker.showImagePicker(options, (response: any) => {
        // console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          let source;
          if (Platform.OS === 'android') {
            source = response.uri;
          } else {
            source = response.uri.replace('file://', '');
          }
          let extension: any = /[.]/.exec(source)
            ? /[^.]+$/.exec(source)
            : ['png'];

          ref.current.setFieldValue('hospital_logo', {
            name: 'hospital_logo',
            filename: 'image' + '.' + extension[0],
            type: response.type,
            data: response.data
          });
        }
      });
    }
  };
  // console.log('props', props);
  return (
    <>
      <Formik
        initialValues={DefaultFields}
        ref={ref}
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
          // console.log('error', error);
          // console.log('values', values);
          const getHeader = () => {
            if (props.user.id > 0) {
              if (props.disabledStatus) {
                return (
                  <Header
                    style={{
                      backgroundColor: themeHospital.colors.primary
                    }}
                    push={push}
                    title={intl.formatMessage(messages.welcome, {
                      name: props.user.hospital
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
                    style={{ backgroundColor: themeHospital.colors.primary }}
                    push={push}
                    title={<FormattedMessage {...messages.editprofile} />}
                    left={
                      <Appbar.Action
                        icon='close'
                        // color='white'
                        onPress={() => {
                          props.makeEnable();
                          setFieldValue('type', props.user.type);
                          setFieldValue('email', props.user.email);
                          setFieldValue('hospital_name', props.user.hospital);
                          setFieldValue(
                            'arabic_name',
                            props.user.hospital_arabic
                          );
                          setFieldValue('city', props.user.city_id);
                          setFieldValue(
                            'insuance',
                            props.user.insurance.map(a => a.id)
                          );
                          props.loadSelectedCheckbox(props.user.insurance);
                          setFieldValue('phone', props.user.phone);
                          setFieldValue('address', props.user.address);
                          setFieldValue(
                            'address_arabic',
                            props.user.address_arabic
                          );
                          // setFieldValue('hospital_logo', props.user.logo);
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
                        // props.makeEnable();
                      }}
                    />
                  </Header>
                );
              }
            } else {
              return (
                <Header
                  push={push}
                  style={{ backgroundColor: themeHospital.colors.primary }}
                  title={
                    <FormattedMessage {...messages.hospitalRegistration} />
                  }
                  left={
                    <Appbar.Action
                      icon='close'
                      // color='white'
                      onPress={() =>
                        push(
                          getLocalizeRoute(
                            isHospital()
                              ? ROUTE_HOSPITAL_LOGIN
                              : ROUTE_PATIENT_LOGIN
                          )
                        )
                      }
                    />
                  }
                  // right={}
                >
                  {isSubmitting ? (
                    <ActivityIndicator animating={true} color={'black'} />
                  ) : (
                    <Appbar.Action
                      icon='check'
                      // color='white'
                      onPress={handleSubmit}
                    />
                  )}
                </Header>
              );
            }
          };
          // console.log('values', values);
          return (
            <>
              {getHeader()}
              {/* <View
              style={{
                alignItems: 'center',
                backgroundColor: themeHospital.colors.primary,
                height: 62
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  width: 134,
                  height: 134
                }}
              >
                <Avatar.Image
                  size={120}
                  source={props.doctorProfile.data.picture}
                />
              </View>
            </View> */}
              <View
                style={{
                  flex: 1,
                  // alignItems: 'center',
                  marginRight: 'auto',
                  marginLeft: 'auto',
                  width: '100%',
                  minWidth: 300,
                  maxWidth: 500
                }}
              >
                <KeyboardAwareScrollView>
                  {/* <ScrollView style={styles.bodyContainer}> */}
                  <View style={{ marginHorizontal: 10, overflow: 'hidden' }}>
                    <Text style={{ color: '#2a2a2a', textAlign: 'left' }}>
                      <FormattedMessage {...messages.type} />
                    </Text>
                    <View style={styles.typeContainer}>
                      <View style={styles.typeBody}>
                        <Buttonx
                          compact
                          onPress={() => {
                            setType('Dispensary');
                            setFieldValue('type', 'Dispensary');
                          }}
                          mode={
                            type === 'Dispensary' ? 'contained' : 'outlined'
                          }
                          dark={true}
                          style={styles.dispensaryButton}
                          contentStyle={{ height: 40 }}
                          disabled={
                            props.user.id > 0 ? props.disabledStatus : false
                          }
                        >
                          <Text
                            style={{
                              color: type === 'Dispensary' ? 'black' : 'gray',
                              fontSize: 11
                            }}
                          >
                            <FormattedMessage {...messages.dispensary} />
                          </Text>
                        </Buttonx>
                      </View>
                      <View style={styles.typeBody}>
                        <Buttonx
                          compact
                          onPress={() => {
                            setType('Clinic');
                            setFieldValue('type', '');
                            setFieldValue('type', 'Clinic');
                          }}
                          mode={type === 'Clinic' ? 'contained' : 'outlined'}
                          dark={true}
                          style={styles.clinicPolyClinicButton}
                          contentStyle={{ height: 40 }}
                          disabled={
                            props.user.id > 0 ? props.disabledStatus : false
                          }
                        >
                          <Text
                            style={{
                              color: type === 'Clinic' ? 'black' : 'gray',
                              fontSize: 11
                            }}
                          >
                            <FormattedMessage {...messages.clinic} />
                          </Text>
                        </Buttonx>
                      </View>
                      <View style={styles.typeBody}>
                        <Buttonx
                          compact
                          onPress={() => {
                            setType('Poly Clinic');
                            setFieldValue('type', '');
                            setFieldValue('type', 'Poly Clinic');
                          }}
                          mode={
                            type === 'Poly Clinic' ? 'contained' : 'outlined'
                          }
                          dark={true}
                          style={styles.clinicPolyClinicButton}
                          contentStyle={{ height: 40 }}
                          disabled={
                            props.user.id > 0 ? props.disabledStatus : false
                          }
                        >
                          <Text
                            style={{
                              color: type === 'Poly Clinic' ? 'black' : 'gray',
                              fontSize: 11
                            }}
                          >
                            <FormattedMessage {...messages.polyClinic} />
                          </Text>
                        </Buttonx>
                      </View>
                      <View style={styles.typeBody}>
                        <Buttonx
                          compact
                          onPress={() => {
                            setType('Hospital');
                            setFieldValue('type', '');
                            setFieldValue('type', 'Hospital');
                          }}
                          mode={type === 'Hospital' ? 'contained' : 'outlined'}
                          dark={true}
                          style={styles.hospitalButton}
                          contentStyle={{ height: 40 }}
                          disabled={
                            props.user.id > 0 ? props.disabledStatus : false
                          }
                        >
                          <Text
                            style={{
                              color: type === 'Hospital' ? 'black' : 'gray',
                              fontSize: 11
                            }}
                          >
                            <FormattedMessage {...messages.hospital} />
                          </Text>
                        </Buttonx>
                      </View>
                    </View>
                    <HelperText
                      type='error'
                      visible={errors.type && touched.type ? true : false}
                    >
                      {errors.type}
                    </HelperText>
                    <TextInput
                      multiline={true}
                      blurOnSubmit={true}
                      maxLength={40}
                      mode='outlined'
                      id='email'
                      theme={{ colors: { background: 'white' } }}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      error={errors.email && touched.email ? true : false}
                      value={values.email.trim()}
                      label={<FormattedMessage {...messages.email} />}
                      disabled={
                        props.user.id > 0 ? props.disabledStatus : false
                      }
                    />
                    <HelperText
                      type='error'
                      visible={errors.email && touched.email ? true : false}
                    >
                      {errors.email}
                    </HelperText>
                    {props.user.id > 0 ? null : (
                      <>
                        <TextInput
                          multiline={true}
                          blurOnSubmit={true}
                          maxLength={40}
                          secureTextEntry={true}
                          mode='outlined'
                          id='password'
                          theme={{ colors: { background: 'white' } }}
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
                          theme={{ colors: { background: 'white' } }}
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
                    <TextInput
                      multiline={true}
                      blurOnSubmit={true}
                      maxLength={40}
                      id='hospital_name'
                      mode='outlined'
                      onChangeText={handleChange('hospital_name')}
                      onBlur={handleBlur('hospital_name')}
                      value={values.hospital_name}
                      label={<FormattedMessage {...messages.hospital_name} />}
                      theme={{
                        colors: {
                          background: 'white'
                        }
                      }}
                      error={
                        errors.hospital_name && touched.hospital_name
                          ? true
                          : false
                      }
                      disabled={
                        props.user.id > 0 ? props.disabledStatus : false
                      }
                    />
                    <HelperText
                      type='error'
                      visible={
                        errors.hospital_name && touched.hospital_name
                          ? true
                          : false
                      }
                    >
                      {errors.hospital_name}
                    </HelperText>
                    <TextInput
                      multiline={true}
                      blurOnSubmit={true}
                      maxLength={40}
                      id='arabic_name'
                      mode='outlined'
                      onChangeText={handleChange('arabic_name')}
                      onBlur={handleBlur('arabic_name')}
                      value={values.arabic_name}
                      label={<FormattedMessage {...messages.arabic_name} />}
                      error={
                        errors.arabic_name && touched.arabic_name ? true : false
                      }
                      theme={{
                        colors: {
                          background: 'white'
                        }
                      }}
                      disabled={
                        props.user.id > 0 ? props.disabledStatus : false
                      }
                    />
                    <HelperText
                      type='error'
                      visible={
                        errors.arabic_name && touched.arabic_name ? true : false
                      }
                    >
                      {errors.arabic_name}
                    </HelperText>
                    {props.user.id > 0 ? null : (
                      <>
                        <SelectPicker
                          label={
                            <FormattedMessage {...messages.countrySelect} />
                          }
                          mode='outlined'
                          selected={values.country}
                          onSelect={key => {
                            setFieldValue('country', key);
                            setFieldValue('city', '');
                            props.loadCitiesList(key);
                            props.loadInsurancesList(key);
                          }}
                          theme={{
                            colors: {
                              background: 'white'
                            }
                          }}
                          options={props.countries.map(countries => ({
                            label: getTranslator(
                              'country',
                              countries,
                              '_arabic'
                            ),
                            value: countries.id
                          }))}
                          disabled={
                            props.user.id > 0 ? props.disabledStatus : false
                          }
                        />

                        <HelperText
                          type='error'
                          visible={
                            errors.country && touched.country ? true : false
                          }
                        >
                          {errors.country}
                        </HelperText>
                      </>
                    )}
                    <SelectPicker
                      disabled={
                        props.user.id > 0
                          ? props.disabledStatus
                          : values.country !== ''
                          ? false
                          : true
                      }
                      label={<FormattedMessage {...messages.city} />}
                      mode='outlined'
                      selected={values.city}
                      onSelect={key => {
                        setFieldValue('city', key);
                      }}
                      options={props.cities.map(cities => ({
                        label: getTranslator('city', cities, '_arabic'),
                        value: cities.id
                      }))}
                    />
                    <HelperText
                      type='error'
                      visible={errors.city && touched.city ? true : false}
                    >
                      {errors.city}
                    </HelperText>
                    {/* {console.log(
                  '||||||||||||||',
                  props.selectedCheckedbox.map(insurances => ({
                    label: getTranslator('insurance', insurances, '_arabic'),
                    value: insurances.id
                  }))
                )} */}
                    {/* {console.log(
                  '||||||||||||||',
                  props.selectedCheckedbox.map(insurances => ({
                    label: getTranslator('insurance', insurances, '_arabic'),
                    value: insurances.id
                  }))
                )} */}
                    <MultiSelect
                      disabled={
                        props.user.id > 0
                          ? props.disabledStatus
                          : values.country !== ''
                          ? false
                          : true
                      }
                      label={intl.formatMessage(messages.insurance)}
                      value='insuance'
                      mode='outlined'
                      options={props.insurances.map(insurances => ({
                        label: getTranslator(
                          'insurance',
                          insurances,
                          '_arabic'
                        ),
                        value: insurances.id
                      }))}
                      onSubmit={setFieldValue}
                      selectCheckbox={props.selectCheckbox}
                      unselectCheckbox={props.unselectCheckbox}
                      // selectedCheckedbox={props.selectedCheckedbox.map(
                      //   insurances => ({
                      //     label: getTranslator('insurance', insurances, '_arabic'),
                      //     value: insurances.id
                      //   })
                      // )}
                      selectedCheckedbox={props.selectedCheckedbox}
                      title='Select insurances'
                      theme={{ colors: { background: 'white' } }}
                    />
                    <HelperText
                      type='error'
                      visible={
                        errors.insuance && touched.insuance ? true : false
                      }
                    >
                      {errors.insuance}
                    </HelperText>

                    {Platform.OS == 'web' ? (
                      <>
                        <TextInput
                          mode='outlined'
                          keyboardType='phone-pad'
                          onChangeText={handleChange('phone')}
                          onBlur={handleBlur('phone')}
                          value={values.phone}
                          label={intl.formatMessage(messages.phone)}
                          theme={{
                            colors: {
                              background: 'white'
                            }
                          }}
                        />
                        <HelperText
                          type='error'
                          visible={errors.phone && touched.phone ? true : false}
                        >
                          {errors.phone}
                        </HelperText>
                      </>
                    ) : (
                      <View
                        style={{
                          flexDirection: 'row'
                          // overflow: 'hidden'
                        }}
                      >
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
                              disabled={
                                props.user.id > 0 ? props.disabledStatus : false
                              }
                              initialCountry='sa'
                              onSelectCountry={a =>
                                setFieldValue(
                                  'phone',
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
                          {/********************************/}
                          <TextInput
                            multiline={true}
                            blurOnSubmit={true}
                            maxLength={40}
                            id='phone'
                            keyboardType={'numeric'}
                            mode='outlined'
                            onChangeText={handleChange('phone')}
                            onBlur={handleBlur('phone')}
                            value={values.phone}
                            error={errors.phone && touched.phone ? true : false}
                            label={intl.formatMessage(messages.phone)}
                            theme={{
                              colors: {
                                background: 'white'
                              }
                            }}
                            disabled={
                              props.user.id > 0 ? props.disabledStatus : false
                            }
                          />
                          <HelperText
                            type='error'
                            visible={
                              errors.phone && touched.phone ? true : false
                            }
                          >
                            {errors.phone}
                          </HelperText>
                        </View>
                      </View>
                    )}

                    {/* <TouchableOpacity
                  onPress={() => textInputDddress.current.focus()}
                >
                  <View pointerEvents="none"> */}
                    <TextInput
                      multiline={true}
                      blurOnSubmit={true}
                      maxLength={40}
                      // ref={textInputDddress}
                      id='address'
                      mode='outlined'
                      onChangeText={handleChange('address')}
                      onBlur={handleBlur('address')}
                      value={values.address}
                      error={errors.address && touched.address ? true : false}
                      label={<FormattedMessage {...messages.address} />}
                      theme={{
                        colors: {
                          background: 'white'
                        }
                      }}
                      disabled={
                        props.user.id > 0 ? props.disabledStatus : false
                      }
                    />
                    {/* </View>
                </TouchableOpacity> */}
                    <HelperText
                      type='error'
                      visible={errors.address && touched.address ? true : false}
                    >
                      {errors.address}
                    </HelperText>
                    {/* <TouchableOpacity
                  onPress={() => textInputArabicAddress.current.focus()}
                >
                  <View pointerEvents="none"> */}
                    <TextInput
                      multiline={true}
                      blurOnSubmit={true}
                      maxLength={40}
                      // ref={textInputArabicAddress}
                      id='address_arabic'
                      mode='outlined'
                      onChangeText={handleChange('address_arabic')}
                      onBlur={handleBlur('address_arabic')}
                      value={values.address_arabic}
                      error={
                        errors.address_arabic && touched.address_arabic
                          ? true
                          : false
                      }
                      label={intl.formatMessage(messages.address_arabic)}
                      theme={{
                        colors: {
                          background: 'white'
                        }
                      }}
                      disabled={
                        props.user.id > 0 ? props.disabledStatus : false
                      }
                    />
                    {/* </View>
                </TouchableOpacity> */}
                    <HelperText
                      type='error'
                      visible={
                        errors.address_arabic && touched.address_arabic
                          ? true
                          : false
                      }
                    >
                      {errors.address_arabic}
                    </HelperText>
                    <LocationPicker
                      // label={<FormattedMessage {...messages.countrySelect} />}
                      mode='outlined'
                      // value={values.country}
                      onSetLocation={(latLong, location) => {
                        setFieldValue('location', location);
                        setFieldValue('latLong', latLong);
                      }}
                    />
                    <HelperText
                      type='error'
                      visible={
                        errors.location && touched.location ? true : false
                      }
                    >
                      {errors.location}
                    </HelperText>

                    {props.user.id > 0 ? null : (
                      <>
                        <Button
                          mode='outlined'
                          style={{ height: 60, borderColor: 'gray' }}
                          color='gray'
                          icon='image'
                          onPress={(e: any) => {
                            _pickImage(e);
                          }}
                          contentStyle={{
                            height: 60,
                            justifyContent: 'flex-start'
                          }}
                        >
                          {values.hospital_logo && values.hospital_logo.name ? (
                            values.hospital_logo.name
                          ) : (
                            <FormattedMessage {...messages.hospital_logo} />
                          )}
                        </Button>
                        <HelperText
                          type='error'
                          visible={
                            errors.hospital_logo && touched.hospital_logo
                              ? true
                              : false
                          }
                        >
                          {errors.hospital_logo}
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

                          <Button
                            style={{
                              padding: 0,
                              margin: 0,
                              width: '90%'
                            }}
                            contentStyle={{
                              padding: 0,
                              margin: 0,
                              width: '100%'
                            }}
                            onPress={openTermsLink}
                            mode='text'
                            color='black'
                            uppercase={false}
                          >
                            <Small dark>
                              {intl.formatMessage(messages.acceptTerms)}
                            </Small>
                          </Button>
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
                        <View style={styles.checkBox}>
                          <Checkbox.Android
                            status={checked3 ? 'checked' : 'unchecked'}
                            onPress={() => {
                              setPrivacyPolicyState({
                                checked3: !checked3
                              });
                              checked3
                                ? setFieldValue('privacyPolicy', '')
                                : setFieldValue('privacyPolicy', !checked3);
                            }}
                            style={{ marginBottom: 50 }}
                          />

                          <Button
                            style={{
                              padding: 0,
                              margin: 0,
                              width: '90%'
                            }}
                            contentStyle={{
                              padding: 0,
                              margin: 0,
                              width: '100%'
                            }}
                            onPress={openTermsLink}
                            mode='text'
                            color='black'
                            uppercase={false}
                          >
                            <Small dark>
                              {intl.formatMessage(messages.privacyPolicy)}
                            </Small>
                          </Button>
                        </View>
                        <HelperText
                          type='error'
                          visible={
                            errors.privacyPolicy && touched.privacyPolicy
                              ? true
                              : false
                          }
                        >
                          {errors.privacyPolicy}
                        </HelperText>
                      </>
                      // <View style={{ position: 'relative' }}>
                      //   <View
                      //     style={{
                      //       position: 'absolute',
                      //       top: 11,
                      //       left: 0,
                      //       right: 3,
                      //       bottom: 0,
                      //       alignItems: 'flex-end'
                      //     }}
                      //   >
                      //     <IconButton icon='image' color='gray' size={23} />
                      //   </View>
                      //   <TextInput
                      //     id='hospital_logo'
                      //     mode='outlined'
                      //     onFocus={e => {
                      //       hospital_logo.current.blur();
                      //       _pickImage(e);
                      //     }}
                      //     ref={hospital_logo}
                      //     onChangeText={handleChange('hospital_logo')}
                      //     onBlur={handleBlur('hospital_logo')}
                      //     value={
                      //       values.hospital_logo && values.hospital_logo.name
                      //         ? values.hospital_logo.name
                      //         : ''
                      //     }
                      //     error={
                      //       errors.hospital_logo && touched.hospital_logo
                      //         ? true
                      //         : false
                      //     }
                      //     label={<FormattedMessage {...messages.hospital_logo} />}
                      //     theme={{
                      //       colors: {
                      //         background: 'white'
                      //       }
                      //     }}
                      //   />
                      //   <HelperText
                      //     type='error'
                      //     visible={
                      //       errors.hospital_logo && touched.hospital_logo
                      //         ? true
                      //         : false
                      //     }
                      //   >
                      //     {errors.hospital_logo}
                      //   </HelperText>
                      // </View>
                    )}

                    <View style={{ height: 70 }} />
                  </View>
                  {/* </ScrollView> */}
                </KeyboardAwareScrollView>
                {props.user.id > 0 && props.disabledStatus ? (
                  <FAB
                    style={[
                      { backgroundColor: themeHospital.colors.primary },
                      styles.fab
                    ]}
                    icon={p => (
                      <MaterialCommunityIcons
                        {...p}
                        name='pencil'
                        //  color='white'
                      />
                    )}
                    onPress={() => {
                      props.makeDisabled();
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
                props.logoutUser();
                props.setUserType(HOSPITAL_TYPE);
                props.theme(HOSPITAL_TYPE);
                props.showSnackbar(
                  intl.formatMessage(messages.successfullySignedOut)
                );
                push(getLocalizeRoute(LOGIN));
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

export default FormHospitalRegistrationPage;
