/**
 *
 * LanguagePage
 *
 */

import React, { memo } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';
// import makeSelectLanguagePage from "./selectors";
import { push } from 'connected-react-router';

import Helmet from '../../components/Helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import styles from './styles';

import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
// import reducer from "./reducer";
import saga from './saga';
import messages from './messages';

import { Appbar, RadioButton, List } from 'react-native-paper';
import { GlobalStyle, MaterialCommunityIcons } from '../../components';
import { DrawerContext } from '../../hooks/useDrawerContext';
import { LanguagePageProps, LanguageOption } from './types';
import { updateLanguage, makeSelectLanguage } from './ducks';
import {
  getSiteName,
  getMenuRoute,
  getLocalizeRoute
} from '../../utils/helper';
import { Platform } from '../../components/Platform';
import RNRestart from 'react-native-restart';
import { ROUTE_LAUNCHER } from '../../utils/constants';

const LanguagePage: React.SFC<LanguagePageProps> = props => {
  // useInjectReducer({ key: "languagePage", reducer });
  useInjectSaga({ key: 'languagePage', saga });
  // const openDrawer = React.useContext(DrawerContext);
  return (
    <View style={styles.container}>
      <Helmet
        titleTemplate={getSiteName()}
        title={props.intl.formatMessage(messages.title)}
      />
      <Appbar.Header>
        <Appbar.BackAction
          color='black'
          onPress={() => {
            // props.navigation.goBack();
            props.push(getMenuRoute());
          }}
        />
        <Appbar.Content
          title={<FormattedMessage {...messages.title} />}
          color='black'
        />
      </Appbar.Header>
      <View style={styles.bodyContainer}>
        <List.Item
          style={[
            GlobalStyle.marginBottom10,
            {
              backgroundColor: 'white'
            }
          ]}
          title='English'
          onPress={() => {
            if (Platform.OS !== 'web') {
              props.dispatch(updateLanguage(LanguageOption.English));
              setTimeout(() => {
                RNRestart.Restart();
              }, 200);
            } else {
              props.push(
                getLocalizeRoute(ROUTE_LAUNCHER, LanguageOption.English)
              );
            }
          }}
          right={() => (
            <RadioButton
              value='first'
              status={
                props.language.locale === LanguageOption.English
                  ? 'checked'
                  : 'unchecked'
              }
              onPress={() => {
                if (Platform.OS !== 'web') {
                  props.dispatch(updateLanguage(LanguageOption.English));
                  setTimeout(() => {
                    RNRestart.Restart();
                  }, 200);
                } else {
                  props.push(
                    getLocalizeRoute(ROUTE_LAUNCHER, LanguageOption.English)
                  );
                }
              }}
            />
          )}
        />
        <List.Item
          style={[GlobalStyle.marginBottom10, { backgroundColor: 'white' }]}
          title='عربي'
          onPress={() => {
            if (Platform.OS !== 'web') {
              props.dispatch(updateLanguage(LanguageOption.Arabic));
              setTimeout(() => {
                RNRestart.Restart();
              }, 200);
            } else {
              props.push(
                getLocalizeRoute(ROUTE_LAUNCHER, LanguageOption.Arabic)
              );
            }
          }}
          right={() => (
            <RadioButton
              value='first'
              status={
                props.language.locale === LanguageOption.Arabic
                  ? 'checked'
                  : 'unchecked'
              }
              onPress={() => {
                if (Platform.OS !== 'web') {
                  props.dispatch(updateLanguage(LanguageOption.Arabic));
                  setTimeout(() => {
                    RNRestart.Restart();
                  }, 200);
                } else {
                  props.push(
                    getLocalizeRoute(ROUTE_LAUNCHER, LanguageOption.Arabic)
                  );
                }
              }}
            />
          )}
        />
      </View>
    </View>
  );
};

LanguagePage.propTypes = {
  push: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  language: makeSelectLanguage()
});

function mapDispatchToProps(dispatch) {
  return {
    push: page => dispatch(push(page)),
    // updateLanguauge2: lang => dispatch(updateLanguage(lang)),
    dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  injectIntl
)(LanguagePage);
