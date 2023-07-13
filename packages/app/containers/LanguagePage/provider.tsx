/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React, { FunctionComponent } from 'react';
import Text from '../../components/Text';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';

import { makeSelectLocale } from './ducks';
import { LanguageProviderProps } from './types';
import { compose } from 'redux';
import { I18nManager } from 'react-native';

const LanguageProvider: FunctionComponent<LanguageProviderProps> = props => {
  // const { locale } = useIntl();
  // console.log('locale', locale);
  console.log('props.locale', props.locale);
  I18nManager.forceRTL(props.locale == 'ar' ? true : false);

  const locale = props.language ? props.language : props.locale;

  return (
    <IntlProvider
      locale={locale}
      key={locale}
      messages={props.messages[locale]}
      textComponent={Text}
    >
      {React.Children.only(props.children)}
    </IntlProvider>
  );
};

const mapStateToProps = createSelector(
  makeSelectLocale(),
  locale => ({
    locale
  })
);

const withConnect = connect(
  mapStateToProps,
  null
);

export default compose(withConnect)(LanguageProvider);
