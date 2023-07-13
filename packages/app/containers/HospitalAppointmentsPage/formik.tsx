import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import messages from './messages';
import { FormattedMessage } from 'react-intl';
import { FormHospitalAppointmentsPageProps } from './types';
import Header from '../../components/Header';
import { TextInput, HelperText, Button as Buttonx } from 'react-native-paper';
import styles from './styles';
import { View, ScrollView } from 'react-native';

import makeGrid from '../../components/Grid';

const Grid = makeGrid(16); // gutter size

const FormHospitalAppointmentsPage: React.SFC<
  FormHospitalAppointmentsPageProps
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
          <Header push={push} title='HospitalAppointmentsPage'>
            <Buttonx
              onPress={handleSubmit}
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              <FormattedMessage {...messages.save} />
            </Buttonx>
          </Header>
          <Grid.Container>
            <Grid.Row>
              <Grid.Col>
                <ScrollView style={styles.bodyContainer}>
                  <TextInput
                    id='username'
                    style={styles.textInput}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    error={errors.username && touched.username}
                    value={values.username}
                    label={<FormattedMessage {...messages.username} />}
                  />
                  <HelperText
                    type='error'
                    visible={errors.username && touched.username}
                  >
                    {errors.username}
                  </HelperText>

                  <HelperText type='error' visible={error}>
                    {error}
                  </HelperText>
                </ScrollView>
              </Grid.Col>
            </Grid.Row>
          </Grid.Container>
        </>
      )}
      onSubmit={onSubmit}
    />
  );
};

export default FormHospitalAppointmentsPage;
