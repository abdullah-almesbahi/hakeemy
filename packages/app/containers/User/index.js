/**
 *
 * User
 *
 */

import React, { memo } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from '../../components/Helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styles from './styles';

import { useInjectReducer } from '../../utils/injectReducer';
import makeSelectUser from 'selectors';
// import reducer from "./reducer";
import messages from './messages';
import { Formik } from 'formik';
import { Button, TextInput } from 'react-native-paper';
import * as yup from 'yup';

import { graphql } from 'react-apollo';
import UserMutation from 'graphql/UserMutation';

const innerUser = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
  isSubmitting
}) => (
  <>
    <TextInput
      id='UserUsername'
      style={styles.textInput}
      onChangeText={handleChange('username')}
      onBlur={handleBlur('username')}
      theme='Dark'
      error={errors.username && touched.username}
      value={values.username}
      label={<FormattedMessage {...messages.username} />}
    />
    {errors.username && touched.username ? (
      <Text style={styles.errorText}>{errors.username}</Text>
    ) : null}

    <Button
      onPress={handleSubmit}
      style={styles.button}
      mode='contained'
      loading={isSubmitting}
      disabled={isSubmitting}
    >
      Login
    </Button>
  </>
);

innerUser.propTypes = {
  values: PropTypes.shape({
    username: PropTypes.string.isRequired
  }),
  errors: PropTypes.shape({
    username: PropTypes.string
  }),
  touched: PropTypes.shape({
    username: PropTypes.bool
  }),
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired
};

const UserSchema = yup.object().shape({
  username: yup.string().required('please enter username')
});

import { Appbar } from 'react-native-paper';
import { DrawerContext } from '../../hooks/useDrawerContext';

export function User() {
  // useInjectReducer({ key: "user", reducer });
  const openDrawer = React.useContext(DrawerContext);
  return (
    <View style={styles.container}>
      <Helmet titleTemplate='User' defaultTitle='Description of User' />
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => openDrawer()} />
        <Appbar.Content title='User' />
      </Appbar.Header>
      <FormattedMessage {...messages.header} />
      <Formik
        initialValues={{ username: '' }}
        validationSchema={UserSchema}
        render={innerUser}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          props
            .mutate({
              variables: {
                username: values.username
              }
            })
            .then(({ data }) => {
              const user = data.login.user;
              props.updateCurrentUser({
                ...user,
                id: user.id
              });
              AsyncStorage.setItem('token', data.login.token);
              setSubmitting(false);
            })
            .catch(error => {
              if (error.graphQLErrors && error.graphQLErrors[0].message)
                setErrors(JSON.parse(error.graphQLErrors[0].message));
              else console.log(error);
              setSubmitting(false);
            });
        }}
      />
    </View>
  );
}

User.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withUser = graphql(UserMutation);

export default compose(
  withUser,
  withConnect,
  memo
)(User);
