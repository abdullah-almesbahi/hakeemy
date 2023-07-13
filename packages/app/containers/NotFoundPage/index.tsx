/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Platform, StyleSheet, Text, View } from 'react-native';

// import H1 from "components/H1";
import messages from './messages';
import { Helmet } from '../../components';
import { getSiteName } from '../../utils/helper';

interface NotFoundProps {
  intl: any;
}

const NotFound: React.SFC<NotFoundProps> = props => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Helmet
        titleTemplate={getSiteName()}
        title={props.intl.formatMessage(messages.header)}
      />
      <Text>
        <FormattedMessage {...messages.header} />
      </Text>
    </View>
  );
};

export default injectIntl(NotFound);
