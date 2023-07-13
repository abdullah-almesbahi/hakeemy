import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import { TextInput, HelperText, Appbar } from 'react-native-paper';
import Button from '../../components/Button';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import styles from './styles';

const innerLoginForm = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
  isSubmitting,
  ajaxError,
  push
}) => (
  <Fragment>
    <TextInput
      theme={{
        colors: {
          text: 'white',
          disabled: 'white',
          background: 'rgb(5, 5, 5,0)',
          placeholder: 'white',
          primary: 'white'
        }
      }}
      id='formLoginEmail'
      style={styles.textInput}
      onChangeText={handleChange('email')}
      onBlur={handleBlur('email')}
      error={errors.email && touched.email ? true : false}
      value={values.email.trim()}
      label={<FormattedMessage {...messages.email} />}
    />
    <HelperText
      type='error'
      visible={errors.email && touched.email ? true : false}
    >
      {errors.email}
    </HelperText>
    <TextInput
      theme={{
        colors: {
          text: 'white',
          disabled: 'white',
          background: 'rgb(5, 5, 5,0)',
          placeholder: 'white',
          primary: 'white'
        }
      }}
      secureTextEntry={true}
      id='formLoginPassword'
      style={styles.textInput}
      onChangeText={handleChange('password')}
      onBlur={handleBlur('password')}
      error={errors.password && touched.password ? true : false}
      value={values.password.trim()}
      label={<FormattedMessage {...messages.password} />}
    />
    <HelperText
      type='error'
      visible={errors.password && touched.password ? true : false}
    >
      {errors.password}
    </HelperText>
  </Fragment>
);

innerLoginForm.propTypes = {
  values: PropTypes.shape({
    email: PropTypes.string.isRequired
  }),
  errors: PropTypes.shape({
    email: PropTypes.string
  }),
  touched: PropTypes.shape({
    email: PropTypes.bool
  }),
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired
};

export default innerLoginForm;
