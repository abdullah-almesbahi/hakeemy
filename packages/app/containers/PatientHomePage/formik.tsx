import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import messages from './messages';
import { FormattedMessage } from 'react-intl';
import { FormLauncherPageProps } from './types';
import Header from '../../components/Header';
import {
  TextInput,
  HelperText,
  Button as Buttonx,
  Switch
} from 'react-native-paper';
import styles from './styles';
import { View, ScrollView, Text } from 'react-native';
import SelectPicker from '../../components/SelectPicker';
// import { countries } from '../../data/country';
// import { cities } from '../../data/city';
// import { insurances } from '../../data/insurance';
import { ROUTE_SEARCH_LIST } from '../../utils/constants';
import { getLocalizeRoute } from '../../utils/helper';

const FormLauncherPage: React.SFC<FormLauncherPageProps> = ({
  intl,
  onSubmit,
  push,
  language
}) => {
  const DefaultFields = {
    search: '',
    country: '',
    city: '',
    insurance: ''
  };
  const Schema = yup.object().shape({
    search: yup.string()
    // .required(intl.formatMessage(messages.usernameRequired))
  });
  const [state, setState] = useState({ isSwitchOn: false });
  const { isSwitchOn } = state;
  // const disabled = () => {
  //   if (SelectPicker.value="") {
  //     disabled = {true}
  //   }
  // }

  return (
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
        setFieldValue
      }) => (
        <>
          <View style={styles.mainContainer}>
            <View style={styles.welecomeContainer}>
              <Text style={styles.welecomeText}>Find Doctor</Text>
              <Text style={styles.searchDescriptionText}>
                Search by Speciality, Condition, Symptom, Treatment, Doctor
                name, Hospital name, Country, Insurance
              </Text>
            </View>
            <View style={styles.searchContainer}>
              <TextInput
                id='search'
                mode='outlined'
                // style={styles.textInput}
                onChangeText={handleChange('search')}
                onBlur={handleBlur('search')}
                // error={errors.search && touched.search}
                value={values.search}
                label={<FormattedMessage {...messages.searchInput} />}
                theme={{
                  colors: {
                    background: 'white'
                  }
                }}
                // focus
              />
              <HelperText
                type='error'
                visible={errors.search && touched.search}
              >
                {errors.search}
              </HelperText>
              {/* <SelectPicker
                label={<FormattedMessage {...messages.country} />}
                mode='outlined'
                selected={values.country}
                onSelect={key => {
                  setFieldValue('country', key);
                }}
                theme={{
                  colors: {
                    background: 'white'
                  }
                }}
                options={countries}
                // props.loadChildItems(parent_id);
                // options={props.items.data.map(d => {
                //   return {
                //     value: d.id,
                //     label: d.name
                //   };
                // })}
              />
              <HelperText
                type='error'
                visible={errors.country && touched.country}
              /> */}
              {/* <SelectPicker
                disabled={values.country !== '' ? false : true}
                label='City'
                mode='outlined'
                selected={values.city}
                onSelect={key => {
                  setFieldValue('city', key);
                }}
                options={cities}
              />
              <HelperText type='error' visible={errors.city && touched.city} />
              <SelectPicker
                disabled={values.country !== '' ? false : true}
                label='insurance'
                placeholder="I'll choose my insurance later"
                mode='outlined'
                selected={values.insurance}
                onSelect={key => {
                  setFieldValue('insurance', key);
                }}
                options={insurances}
              />
              <HelperText
                type='error'
                visible={errors.insurance && touched.insurance}
              />
              {errors.insurance}
              <HelperText type='error' visible={error}>
                {error}
              </HelperText> */}
              <Buttonx
                disabled={
                  values.search !== '' || values.country !== '' ? false : true
                }
                // disabled={true}
                style={styles.button}
                contentStyle={styles.contentStyleButton}
                mode='contained'
                // onPress={handleSubmit}
                onPress={() => {
                  push(getLocalizeRoute(ROUTE_SEARCH_LIST));
                }}
                loading={isSubmitting}
                // disabled={isSubmitting}
              >
                <FormattedMessage {...messages.searchButton} />
              </Buttonx>
            </View>
            <View style={styles.languageContainer}>
              {/* <Text light>عربي</Text> */}

              {/* <Switch
                  value={props.language == "en" ? false : true}
                  onValueChange={() => {
                    props.changeLocale(props.language == "en" ? "ar" : "en");
                    if (Platform.OS !== "web") {
                      setTimeout(() => {
                        RNRestart.Restart();
                      }, 200);
                    }
                  }}
                /> 
                ); }*/}
              <Switch
                value={isSwitchOn}
                onValueChange={() => {
                  setState({ isSwitchOn: !isSwitchOn });
                }}
              />
              {/* <Text light>ENGLISH</Text> */}
            </View>
          </View>
        </>
      )}
      onSubmit={onSubmit}
    />
  );
};

export default FormLauncherPage;
