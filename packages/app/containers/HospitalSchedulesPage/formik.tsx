import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import messages from './messages';
import { FormattedMessage } from 'react-intl';
import { FormHospitalDoctorsSchedulePageProps } from './types';
import Header from '../../components/Header';
import { TextInput, HelperText, Button as Buttonx } from 'react-native-paper';
import styles from './styles';
import { View, ScrollView } from 'react-native';

const FormHospitalDoctorsSchedulePage: React.SFC<
  FormHospitalDoctorsSchedulePageProps
> = ({ intl, onSubmit, push }) => {
  const DefaultFields = {
    username: ''
  };
  const Schema = yup.object().shape({
    username: yup
      .string()
      .required(intl.formatMessage(messages.usernameRequired))
  });

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
        isSubmitting
      }) => (
        <>
          <Header push={push} title="HospitalDoctorsSchedulePage">
            <Buttonx
              onPress={handleSubmit}
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              <FormattedMessage {...messages.save} />
            </Buttonx>
          </Header>

          <ScrollView style={styles.bodyContainer}>
            <TextInput
              id="username"
              style={styles.textInput}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              error={errors.username && touched.username}
              value={values.username}
              label={<FormattedMessage {...messages.username} />}
            />
            <HelperText
              type="error"
              visible={errors.username && touched.username}
            >
              {errors.username}
            </HelperText>

            <HelperText type="error" visible={error}>
              {error}
            </HelperText>
          </ScrollView>
        </>
      )}
      onSubmit={onSubmit}
    />
  );
};

export default FormHospitalDoctorsSchedulePage;
