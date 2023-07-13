import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import messages from './messages';
import { FormattedMessage } from 'react-intl';
import { FormChangePasswordPageProps } from './types';
import Header from '../../components/Header';
import {
  TextInput,
  HelperText,
  Button as Buttonx,
  Appbar,
  ActivityIndicator
} from 'react-native-paper';
import styles from './styles';
import { View, ScrollView } from 'react-native';
import { getMenuRoute } from '../../utils/helper';

const FormChangePasswordPage: React.SFC<FormChangePasswordPageProps> = ({
  intl,
  onSubmit,
  push
}) => {
  const DefaultFields = {
    current_password: '',
    new_password: '',
    re_new_password: ''
  };
  const Schema = yup.object().shape({
    current_password: yup.string().required(),
    new_password: yup.string().required(),
    re_new_password: yup.string().required()
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
          <Header
            push={push}
            left={
              <Appbar.Action
                icon='close'
                // color="white"
                onPress={() => push(getMenuRoute())}
              />
            }
            title={intl.formatMessage(messages.title)}
          >
            {isSubmitting ? (
              <ActivityIndicator animating={true} color={'black'} />
            ) : (
              <Appbar.Action
                icon='check'
                // color='white'
                onPress={() => handleSubmit()}
              />
            )}
          </Header>

          <ScrollView style={styles.bodyContainer}>
            <View
              style={{
                paddingHorizontal: 10,
                flex: 1
              }}
            >
              <TextInput
                mode='flat' // style={styles.textInput}
                onChangeText={handleChange('current_password')}
                onBlur={handleBlur('current_password')}
                secureTextEntry
                error={
                  errors.current_password && touched.current_password
                    ? true
                    : false
                }
                value={values.current_password}
                label={intl.formatMessage(messages.current_password)}
              />
              <HelperText
                type='error'
                visible={
                  errors.current_password && touched.current_password
                    ? true
                    : false
                }
              >
                {errors.current_password}
              </HelperText>
              <TextInput
                mode='flat'
                // style={styles.textInput}
                onChangeText={handleChange('new_password')}
                onBlur={handleBlur('new_password')}
                secureTextEntry
                error={
                  errors.new_password && touched.new_password ? true : false
                }
                value={values.new_password}
                label={intl.formatMessage(messages.new_password)}
              />
              <HelperText
                type='error'
                visible={
                  errors.new_password && touched.new_password ? true : false
                }
              >
                {errors.new_password}
              </HelperText>
              <TextInput
                mode='flat'
                // style={styles.textInput}
                secureTextEntry
                onChangeText={handleChange('re_new_password')}
                onBlur={handleBlur('re_new_password')}
                error={
                  errors.re_new_password && touched.re_new_password
                    ? true
                    : false
                }
                value={values.re_new_password}
                label={intl.formatMessage(messages.re_new_password)}
              />
              <HelperText
                type='error'
                visible={
                  errors.re_new_password && touched.re_new_password
                    ? true
                    : false
                }
              >
                {errors.re_new_password}
              </HelperText>
            </View>
          </ScrollView>
        </>
      )}
      onSubmit={onSubmit}
    />
  );
};

export default FormChangePasswordPage;
