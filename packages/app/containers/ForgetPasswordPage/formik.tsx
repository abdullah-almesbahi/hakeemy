import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import messages from './messages';
import { FormattedMessage } from 'react-intl';
import { FormForgetPasswordPageProps } from './types';
import Header from '../../components/Header';
import { TextInput, HelperText, Appbar, Snackbar } from 'react-native-paper';
import styles from './styles';
import { View, ScrollView, Text } from 'react-native';
import { getLocalizeRoute } from '../../utils/helper';

const FormForgetPasswordPage: React.SFC<FormForgetPasswordPageProps> = ({
  intl,
  onSubmit,
  push
}) => {
  const DefaultFields = {
    email: ''
  };
  const Schema = yup.object().shape({
    email: yup
      .string()
      .email()
      .required(intl.formatMessage(messages.emailRequired))
  });

  const [state, setState] = useState({ visible: false });

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
          <Header
            push={push}
            title={intl.formatMessage(messages.forgetPasswordTitle)}
            left={
              <Appbar.Action
                icon='close'
                // color="white"
                onPress={() => push(getLocalizeRoute(LOGIN))}
              />
            }
            right={
              <Appbar.Action
                icon='check'
                // color="white"
                onPress={handleSubmit}
              />
            }
          />

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
            <ScrollView style={styles.bodyContainer}>
              <Text style={styles.text}>
                <FormattedMessage {...messages.enterEmail} />
              </Text>
              <TextInput
                id='email'
                mode='outlined'
                autoFocus={true}
                style={styles.textInput}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={errors.email && touched.email ? true : false}
                value={values.email}
                label={<FormattedMessage {...messages.email} />}
              />
              <HelperText type='error' visible={errors.email && touched.email}>
                {errors.email}
              </HelperText>

              <HelperText type='error' visible={error}>
                {error}
              </HelperText>
            </ScrollView>
          </View>
          {/* <View>
            <Snackbar visible={state.visible}>
              <FormattedMessage {...messages.alreadySent} />
            </Snackbar>
          </View> */}
        </>
      )}
      onSubmit={onSubmit}
    />
  );
};

export default FormForgetPasswordPage;
