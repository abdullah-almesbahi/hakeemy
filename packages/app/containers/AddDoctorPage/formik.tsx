import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import messages from './messages';
import { FormattedMessage } from 'react-intl';
import { FormAddDoctorPageProps } from './types';
// import Header from '../../components/Header';
import {
  TextInput,
  HelperText,
  Button as Buttonx,
  Appbar,
  Header,
  IconButton,
  Button
} from 'react-native-paper';
import styles from './styles';
import { View, ScrollView, Text } from 'react-native';
import { ROUTE_HOSPITAL_DOCTORS } from '../../utils/constants';
import SelectPicker from '../../components/SelectPicker';
// import { speciality } from '../../data/speciality';
import ImagePicker from '../../components/ImagePicker';
import { MediaTypeOptions } from '../../components/ImagePicker/types';
import { Platform } from '../../components/Platform';
import { store } from '../../App';
import LoadingIndicator from '../../components/LoadingIndicator';
import { ActivityIndicator } from 'react-native-paper';
import PhoneInput from 'react-native-phone-input';
import HeaderWrapper from '../../components/HeaderWrapper';
import { getLocalizeRoute } from '../../utils/helper';

const FormAddDoctorPage: React.SFC<FormAddDoctorPageProps> = ({
  intl,
  onSubmit,
  push,
  ...props
}) => {
  const [image, setImage] = React.useState();
  const [typeOfDesignation, setDesignation] = useState('');
  const [typeOfSex, setSex] = useState('');
  const moh_card = React.useRef(null);
  const doctor_image = React.useRef(null);
  const formikRef = React.useRef(null);
  const phone = React.useRef(null);

  const DefaultFields = {
    designation: '',
    gender: '',
    doctor_name: '',
    arabic_name: '',
    email: '',
    phone: '+966',
    speciality: '',
    moh_id: '',
    fees: '',
    moh_card: '',
    doctor_image: '',
    api_key: props.api_key
  };
  const Schema = yup.object().shape({
    doctor_name: yup
      .string()
      .required(intl.formatMessage(messages.doctorNameRequired)),
    arabic_name: yup
      .string()
      .required(intl.formatMessage(messages.doctorNameInArabicRequired)),
    email: yup
      .string()
      .email()
      .required(intl.formatMessage(messages.emailRequired)),
    phone: yup
      .number()
      .required(intl.formatMessage(messages.phoneMobileRequired)),
    moh_id: yup.number().required(intl.formatMessage(messages.mohIdRequired)),
    fees: yup.number().required(intl.formatMessage(messages.feesRequired))
  });

  const lang = store.getState().language.locale;
  const _pickImageMoh_card = async (e: any) => {
    // doctor_image.current.blur();
    if (Platform.OS === 'web') {
      let response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3]
      });

      formikRef.current.setFieldValue('moh_card', response);
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

      // console.log('goiung');
      // @ts-ignore
      ImagePicker.showImagePicker(options, (response: any) => {
        // console.log('Response = ', response);

        if (response.didCancel) {
          // console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          let extension: any = /[.]/.exec(response.uri)
            ? /[^.]+$/.exec(response.uri)
            : ['png'];

          formikRef.current.setFieldValue('moh_card', {
            name: 'moh_card',
            filename: 'image' + '.' + extension[0],
            type: response.type,
            data: response.data
          });
        }
      });
    }
  };
  const _pickImageDoctor_image = async (e: any) => {
    // doctor_image.current.blur();
    if (Platform.OS === 'web') {
      let response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3]
      });

      formikRef.current.setFieldValue('doctor_image', response);
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

      // console.log('goiung');
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
          let extension: any = /[.]/.exec(response.uri)
            ? /[^.]+$/.exec(response.uri)
            : ['png'];

          formikRef.current.setFieldValue('doctor_image', {
            name: 'doctor_image',
            filename: 'image' + '.' + extension[0],
            type: response.type,
            data: response.data
          });
        }
      });
    }
  };

  return (
    <Formik
      initialValues={DefaultFields}
      validationSchema={Schema}
      ref={formikRef}
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
        return (
          <>
            <HeaderWrapper>
              <Appbar.BackAction
                onPress={() => push(getLocalizeRoute(ROUTE_HOSPITAL_DOCTORS))}
              />
              <Appbar.Content
                color='black'
                title={intl.formatMessage(messages.addDoctor)}
              />
              {props.isLoading ? (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: 15
                  }}
                >
                  <ActivityIndicator
                    animating={true}
                    size='small'
                    color='black'
                  />
                </View>
              ) : (
                <Appbar.Action icon='check' onPress={() => handleSubmit()} />
              )}
            </HeaderWrapper>

            <ScrollView style={styles.bodyContainer}>
              <View
                style={{
                  flex: 1,
                  // alignItems: 'center',
                  // borderWidth: 1,
                  // borderColor: 'red',
                  marginRight: 'auto',
                  marginLeft: 'auto',
                  minWidth: 300,
                  maxWidth: 500
                }}
              >
                {/* <View style={styles.bodyContainer}> */}
                <Text style={styles.inputTitle}>
                  <FormattedMessage {...messages.designation} />
                </Text>
                <View style={styles.buttonSection}>
                  <View style={styles.buttonBody}>
                    <Buttonx
                      compact
                      onPress={() => {
                        setDesignation('Specialist');
                        setFieldValue('designation', 'specialist');
                      }}
                      mode={
                        typeOfDesignation === 'Specialist'
                          ? 'contained'
                          : 'outlined'
                      }
                      dark={true}
                      style={
                        typeOfDesignation === 'Specialist'
                          ? styles.leftButtonSelected
                          : styles.leftButtonUnselected
                      }
                      contentStyle={{ height: 40 }}
                    >
                      <Text
                        style={{
                          color:
                            typeOfDesignation === 'Specialist'
                              ? 'black'
                              : 'gray'
                        }}
                      >
                        <FormattedMessage {...messages.specialist} />
                      </Text>
                    </Buttonx>
                  </View>
                  <View style={styles.buttonBody}>
                    <Buttonx
                      compact
                      onPress={() => {
                        setDesignation('Consultant');
                        setFieldValue('designation', 'consultant');
                      }}
                      mode={
                        typeOfDesignation === 'Consultant'
                          ? 'contained'
                          : 'outlined'
                      }
                      dark={true}
                      style={
                        typeOfDesignation === 'Consultant'
                          ? styles.rightButtonSelected
                          : styles.rightButtonUnselected
                      }
                      contentStyle={{ height: 40 }}
                    >
                      <Text
                        style={{
                          color:
                            typeOfDesignation === 'Consultant'
                              ? 'black'
                              : 'gray'
                        }}
                      >
                        <FormattedMessage {...messages.consultant} />
                      </Text>
                    </Buttonx>
                  </View>
                </View>

                <Text style={styles.inputTitle}>
                  <FormattedMessage {...messages.gender} />
                </Text>
                <View style={styles.buttonSection}>
                  <View style={styles.buttonBody}>
                    <Buttonx
                      compact
                      onPress={() => {
                        setSex('Male');
                        setFieldValue('gender', 'male');
                      }}
                      mode={typeOfSex === 'Male' ? 'contained' : 'outlined'}
                      dark={true}
                      style={
                        typeOfSex === 'Male'
                          ? styles.leftButtonSelected
                          : styles.leftButtonUnselected
                      }
                      contentStyle={{ height: 40 }}
                    >
                      <Text
                        style={{
                          color: typeOfSex === 'Male' ? 'black' : 'gray'
                        }}
                      >
                        <FormattedMessage {...messages.male} />
                      </Text>
                    </Buttonx>
                  </View>
                  <View style={styles.buttonBody}>
                    <Buttonx
                      compact
                      onPress={() => {
                        setSex('Female');
                        setFieldValue('gender', 'female');
                      }}
                      mode={typeOfSex === 'Female' ? 'contained' : 'outlined'}
                      dark={true}
                      // style={styles.consultantButton}
                      style={[
                        // styles.consultantButton,
                        typeOfSex === 'Female'
                          ? styles.rightButtonSelected
                          : styles.rightButtonUnselected
                      ]}
                      contentStyle={{ height: 40 }}
                    >
                      <Text
                        style={{
                          color: typeOfSex === 'Female' ? 'black' : 'gray'
                        }}
                      >
                        <FormattedMessage {...messages.female} />
                      </Text>
                    </Buttonx>
                  </View>
                </View>
                <View>
                  <View>
                    <TextInput
                      mode='outlined'
                      onChangeText={handleChange('doctor_name')}
                      onBlur={handleBlur('doctor_name')}
                      value={values.doctor_name}
                      label={intl.formatMessage(messages.doctorName)}
                      theme={{
                        colors: {
                          background: 'white'
                        }
                      }}
                    />
                    <HelperText
                      type='error'
                      visible={
                        errors.doctor_name && touched.doctor_name ? true : false
                      }
                    >
                      {errors.doctor_name}
                    </HelperText>
                  </View>
                  <View>
                    <TextInput
                      mode='outlined'
                      onChangeText={handleChange('arabic_name')}
                      onBlur={handleBlur('arabic_name')}
                      value={values.arabic_name}
                      label={intl.formatMessage(messages.doctorNameInArabic)}
                      theme={{
                        colors: {
                          background: 'white'
                        }
                      }}
                    />
                    <HelperText
                      type='error'
                      visible={
                        errors.arabic_name && touched.arabic_name ? true : false
                      }
                    >
                      {errors.arabic_name}
                    </HelperText>
                  </View>
                </View>
                <TextInput
                  mode='outlined'
                  theme={{ colors: { background: 'white' } }}
                  onChangeText={handleChange('email')}
                  keyboardType='email-address'
                  onBlur={handleBlur('email')}
                  error={errors.email && touched.email ? true : false}
                  value={values.email.trim()}
                  label={intl.formatMessage(messages.email)}
                />
                <HelperText
                  type='error'
                  visible={errors.email && touched.email ? true : false}
                >
                  {errors.email}
                </HelperText>

                {Platform.OS == 'web' ? (
                  <>
                    <TextInput
                      id='phone'
                      mode='outlined'
                      keyboardType='phone-pad'
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      value={values.phone}
                      label={<FormattedMessage {...messages.phoneMobile} />}
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
                      <TextInput
                        id='phone'
                        mode='outlined'
                        keyboardType='phone-pad'
                        onChangeText={handleChange('phone')}
                        onBlur={handleBlur('phone')}
                        value={values.phone}
                        label={<FormattedMessage {...messages.phoneMobile} />}
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
                    </View>
                  </View>
                )}

                <SelectPicker
                  label={<FormattedMessage {...messages.specialitySelect} />}
                  mode='outlined'
                  selected={values.speciality}
                  // onSelect={key => {
                  //   props.specialities.find(key)
                  //   console.log('gggggg', key => {
                  //     props.specialities.find(key))
                  //   setFieldValue('speciality', key);
                  //   console.log('object', key)
                  // }}
                  onSelect={key => {
                    setFieldValue('speciality', key);
                  }}
                  theme={{
                    colors: {
                      background: 'white'
                    }
                  }}
                  options={props.specialities.map(d => {
                    return lang == 'en'
                      ? {
                          label: d.speciality,
                          value: d.id
                        }
                      : {
                          label: d.speciality_arabic,
                          value: d.id
                        };
                  })}
                />
                <HelperText
                  type='error'
                  visible={
                    errors.speciality && touched.speciality ? true : false
                  }
                />
                {/* {console.log('props.specialities', props.specialities)} */}

                <TextInput
                  id='fees'
                  mode='outlined'
                  keyboardType='decimal-pad'
                  onChangeText={handleChange('fees')}
                  onBlur={handleBlur('fees')}
                  value={values.fees}
                  label={<FormattedMessage {...messages.fees} />}
                  theme={{
                    colors: {
                      background: 'white'
                    }
                  }}
                />
                <HelperText
                  type='error'
                  visible={errors.fees && touched.fees ? true : false}
                >
                  {errors.fees}
                </HelperText>

                <TextInput
                  keyboardType='decimal-pad'
                  id='moh_id'
                  mode='outlined'
                  onChangeText={handleChange('moh_id')}
                  onBlur={handleBlur('moh_id')}
                  value={values.moh_id}
                  label={<FormattedMessage {...messages.mohId} />}
                  theme={{
                    colors: {
                      background: 'white'
                    }
                  }}
                />
                <HelperText
                  type='error'
                  visible={errors.moh_id && touched.moh_id ? true : false}
                >
                  {errors.moh_id}
                </HelperText>

                <View style={styles.iconContainer}>
                  {/* <View style={styles.icon}>
                    <IconButton icon='attach-file' color='gray' size={23} />
                  </View> */}
                  {/* <TextInput
                    id='moh_card'
                    mode='outlined'
                    onFocus={e => {
                      _pickImageMoh_card(e);
                      moh_card.current.blur();
                      // _pickImage(e);
                    }}
                    ref={moh_card}
                    onChangeText={handleChange('moh_card')}
                    onBlur={handleBlur('moh_card')}
                    value={
                      values.moh_card && values.moh_card.name
                        ? values.moh_card.name
                        : ''
                    }
                    label={<FormattedMessage {...messages.mohCard} />}
                    theme={{
                      colors: {
                        background: 'white'
                      }
                    }}
                  /> */}
                  <Button
                    mode='outlined'
                    style={{ height: 60, borderColor: 'gray' }}
                    color='gray'
                    icon='account-card-details-outline'
                    onPress={() => {
                      _pickImageMoh_card();
                    }}
                    contentStyle={{
                      height: 60,
                      justifyContent: 'flex-start'
                    }}
                  >
                    {values.moh_card && values.moh_card.name ? (
                      values.moh_card.name
                    ) : (
                      <FormattedMessage {...messages.mohCard} />
                    )}
                  </Button>
                  <HelperText
                    type='error'
                    visible={errors.moh_card && touched.moh_card ? true : false}
                  >
                    {errors.moh_card}
                  </HelperText>
                </View>

                <Button
                  mode='outlined'
                  style={{ height: 60, borderColor: 'gray' }}
                  color='gray'
                  icon='doctor'
                  onPress={() => {
                    _pickImageDoctor_image();
                  }}
                  contentStyle={{
                    height: 60,
                    justifyContent: 'flex-start'
                  }}
                >
                  {values.doctor_image && values.doctor_image.name ? (
                    values.doctor_image.name
                  ) : (
                    <FormattedMessage {...messages.imageOfDoctor} />
                  )}
                </Button>
                <HelperText
                  type='error'
                  visible={
                    errors.doctor_image && touched.doctor_image ? true : false
                  }
                >
                  {errors.doctor_image}
                </HelperText>
                <View style={styles.iconContainer}>
                  {/* <View style={styles.icon}>
                    <IconButton icon='add-a-photo' color='gray' size={23} />
                  </View>
                  <TextInput
                    id='doctor_image'
                    mode='outlined'
                    onFocus={e => {
                      _pickImageDoctor_image();
                      // doctor_image.current.blur();
                    }}
                    ref={doctor_image}
                    onChangeText={handleChange('doctor_image')}
                    onBlur={handleBlur('doctor_image')}
                    value={
                      values.doctor_image && values.doctor_image.name
                        ? values.doctor_image.name
                        : ''
                    }
                    error={
                      errors.doctor_image && touched.doctor_image ? true : false
                    }
                    label={<FormattedMessage {...messages.imageOfDoctor} />}
                    theme={{
                      colors: {
                        background: 'white'
                      }
                    }}
                  />
                  <HelperText
                    type='error'
                    visible={
                      errors.doctor_image && touched.doctor_image ? true : false
                    }
                  >
                    {errors.doctor_image}
                  </HelperText> */}

                  <HelperText type='error' visible={error}>
                    {error}
                  </HelperText>
                </View>
                {/* </View> */}
              </View>
            </ScrollView>
          </>
        );
      }}
      onSubmit={onSubmit}
    />
  );
};

export default FormAddDoctorPage;
