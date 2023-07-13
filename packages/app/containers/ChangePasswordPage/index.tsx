/**
 *
 * ChangePasswordPage
 *
 */

import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

import FormChangePasswordPage from './formik';

// import { graphql } from "react-apollo";
// import ChangePasswordPageMutation from "../../graphql/ChangePasswordPageMutation";

import { Appbar } from 'react-native-paper';
// import { Helmet } from "components/Helmet";

import styles from './styles';
import { ChangePasswordPageProps } from './types';
import { push } from 'connected-react-router';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { isHospital, getSiteName, getLocalizeRoute } from '../../utils/helper';
import { showSnackbar } from '../Snackbar/ducks';
import { handleJsonErrors } from '../../utils/request';
import { ROUTE_MENU } from '../../utils/constants';
import { Helmet } from '../../components';

const ChangeHospitalPassowrd = gql`
  mutation ChangeHospitalPassowrd($data: CustomChangeUserPasswordInput) {
    changeHospitalPassowrd(data: $data) {
      id
    }
  }
`;

const ChangePatientPassowrd = gql`
  mutation ChangePatientPassowrd($data: CustomChangeUserPasswordInput) {
    changePatientPassowrd(data: $data) {
      id
    }
  }
`;

const ChangePasswordPage: React.SFC<ChangePasswordPageProps> = props => {
  const [changeHospitalPassowrd] = useMutation(ChangeHospitalPassowrd);
  const [changePatientPassowrd] = useMutation(ChangePatientPassowrd);

  return (
    <View style={styles.container}>
      <Helmet
        titleTemplate={getSiteName()}
        title={props.intl.formatMessage(messages.title)}
      />
      <FormChangePasswordPage
        intl={props.intl}
        onSubmit={({ current_password, new_password }, action) => {
          let mFunction;
          if (isHospital()) {
            mFunction = changeHospitalPassowrd({
              variables: {
                data: {
                  current_password,
                  new_password
                }
              }
            });
          } else {
            mFunction = changePatientPassowrd({
              variables: {
                data: {
                  current_password,
                  new_password
                }
              }
            });
          }
          mFunction
            .then(res => {
              action.setSubmitting(false);
              props.showSnackbar(
                props.intl.formatMessage(messages.yourPasswordUpdated)
              );
              props.push(getLocalizeRoute(ROUTE_MENU));
            })
            .catch(error => {
              action.setErrors(handleJsonErrors(error));
              action.setSubmitting(false);
            });
        }}
        push={props.push}
      />
    </View>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    push: page => dispatch(push(page)),
    showSnackbar: (message: string) => dispatch(showSnackbar(message))
    // onSubmit: (data, action) => dispatch(updateChangePasswordPage(data, action))
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps
);

export default compose(
  withConnect,
  injectIntl
)(ChangePasswordPage);
