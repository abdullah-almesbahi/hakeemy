/**
 *
 * ForgetPasswordPage
 *
 */

import React, { memo } from 'react';
import { View } from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { makeSelectForgetPasswordPage, forgotPassword } from './ducks';
import { ForgetPasswordPageProps } from './types';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';
import { injectIntl } from 'react-intl';
import FormForgetPasswordPage from './formik';
import styles from './styles';
import { Helmet } from '../../components';
import messages from './messages';
import { getSiteName } from '../../utils/helper';

const ForgetPasswordPage = (props: ForgetPasswordPageProps) => {
  useInjectSaga({ key: 'forgetPasswordPage', saga });

  return (
    <View style={styles.container}>
      <Helmet
        titleTemplate={getSiteName()}
        title={props.intl.formatMessage(messages.title)}
      />
      <FormForgetPasswordPage
        intl={props.intl}
        onSubmit={props.onSubmit}
        push={props.push}
        // forgotPassword={props.forgotPassword}
      />
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  forgetPasswordPage: makeSelectForgetPasswordPage()
});

function mapDispatchToProps(dispatch) {
  return {
    push: page => dispatch(push(page)),
    onSubmit: (values, action) => dispatch(forgotPassword(values, action))
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
)(ForgetPasswordPage);
