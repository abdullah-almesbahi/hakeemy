/**
 *
 * RegisterPage
 *
 */

import React, { memo, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';
// import { useInjectReducer } from '../../utils/injectReducer';
import reducer, {
  makeSelectRegisterPage,
  createNewPatient,
  makeDisabled,
  // patientUpdate,
  makeEnable
} from './ducks';
import { RegisterPageProps } from './types';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

import FormRegisterPage from './formik';

import styles from './styles';
import { makeSelectUser, logoutUser } from '../User/ducks';
import { showSnackbar } from '../Snackbar/ducks';
import { Helmet } from '../../components';
import { getSiteName } from '../../utils/helper';

const RegisterPage = (props: RegisterPageProps) => {
  //   useInjectReducer({ key: "registerPage", reducer });
  useInjectSaga({ key: 'registerPage', saga });
  // const openDrawer = React.useContext(DrawerContext);

  return (
    <View style={styles.container}>
      <Helmet
        titleTemplate={getSiteName()}
        title={props.intl.formatMessage(messages.signup)}
      />
      <FormRegisterPage
        socialInfo={props.registerPage}
        intl={props.intl}
        onSubmit={props.onSubmit}
        // onSubmit={xx => console.log('submited', xx)}
        push={props.push}
        user={props.user}
        makeDisabled={props.makeDisabled}
        makeEnable={props.makeEnable}
        disabledStatus={props.registerPage.disabledStatus}
        logoutUser={props.logoutUser}
        showSnackbar={props.showSnackbar}
      />
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  registerPage: makeSelectRegisterPage(),
  // userId: makeSelectUserId(),
  user: makeSelectUser()
});

function mapDispatchToProps(dispatch) {
  return {
    push: page => dispatch(push(page)),
    onSubmit: (values, actions) => dispatch(createNewPatient(values, actions)),
    makeDisabled: () => dispatch(makeDisabled()),
    makeEnable: () => dispatch(makeEnable()),
    logoutUser: () => dispatch(logoutUser()),
    showSnackbar: a => dispatch(showSnackbar(a))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  injectIntl,
  memo
)(RegisterPage);
