/**
 *
 * ContactPage
 *
 */

import React, { memo } from 'react';
import { View } from 'react-native';

// import { compose } from 'redux';
import { connect } from 'react-redux';
// import { useInjectReducer } from '../../utils/injectReducer';
import reducer, { makeSelectContactPage, sendContactUs } from './ducks';
import { ContactPageProps } from './types';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

import FormContactPage from './formik';

import styles from './styles';
import { compose } from '../../utils/helper';
import { push } from 'connected-react-router';

const ContactPage: React.SFC<ContactPageProps> = props => {
  // useInjectReducer({ key: 'contactPage', reducer });
  useInjectSaga({ key: 'contactPage', saga });

  return (
    <View style={styles.container}>
      <FormContactPage
        push={props.push}
        onSubmit={props.onSubmit}
        navigation={props.navigation}
      />
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  contactPage: makeSelectContactPage()
});

function mapDispatchToProps(dispatch: any) {
  return {
    onSubmit: (data: any, action: any) => dispatch(sendContactUs(data, action)),
    push: (page: string) => dispatch(push(page))
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
)(ContactPage);
