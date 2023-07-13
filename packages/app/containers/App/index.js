/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectUser, makeSelectUserType } from '../User/ducks';
import { makeSelectLocale, changeLocale } from '../LanguagePage/ducks';
import { ConnectedRouter } from 'connected-react-router';

import { Icon } from '../../components';

import history from '../../utils/history';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ThemeContext } from '../../hooks/useThemeContext';
// import Drawer from '../DrawerPage';
import { Provider as PaperProvider } from 'react-native-paper';
import { themePatient, themeHospital } from './themes';
// Import i18n messages
import { translationMessages } from '../../i18nFix';

import { Routes } from '../../Router';
import { client } from './../../Environment';

// Import Language Provider
import LanguageProvider from '../LanguagePage/provider';
import Header from '../Header';
import Footer from '../Footer';
import { PATIENT_TYPE, HOSPITAL_TYPE } from '../../utils/constants';

import RouteCheckAuth from './routeCheckAuth';
import Snackbar from '../Snackbar';
import Responsive from '../../components/Responsive';
import _firebase, { requestPermission } from '../../utils/firebase';
import { ApolloProvider } from '@apollo/react-hooks';
import { AppLayoutProvider } from '../../hooks/LayoutContext';
import RateApp from '../RateApp';
import API from '../../utils/api';
import { LanguageOption } from '../LanguagePage/types';
import { Platform } from '../../components/Platform';

// configure firebase and export it then so we can use this from any file
const firebase = _firebase();

export { firebase };

const App = props => {
  const initialState = {
    theme: props.type === HOSPITAL_TYPE ? themeHospital : themePatient
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    // request permission for notification
    // requestPermission(firebase);
    API.registerVisitor();
  }, []);

  const handleThemeChange = themeName => {
    console.log('theme', themeName);
    if (themeName === PATIENT_TYPE) {
      setState({ theme: themePatient });
    } else {
      setState({ theme: themeHospital });
    }
  };

  const content = (lang, match = null) => {
    return (
      <LanguageProvider messages={translationMessages} language={lang}>
        <Snackbar>
          <Responsive small={null} large={<Header />} />
          {Routes.map((route, i) => (
            <RouteCheckAuth
              requiredSignedIn={route.requiredSignedIn}
              exact
              {...route}
              path={`${match == null ? '' : match.path}${route.path}`}
              user={props.user}
              key={i}
            />
          ))}
          <Responsive small={null} large={<Footer />} />
          {Platform.OS == 'ios' || Platform.OS == 'android' ? (
            <RateApp />
          ) : null}
        </Snackbar>
      </LanguageProvider>
    );
  };

  return (
    <ConnectedRouter history={history}>
      <PaperProvider theme={state.theme}>
        <ApolloProvider client={client(props.user.token)}>
          <AppLayoutProvider>
            <ThemeContext.Provider value={handleThemeChange}>
              <View
                style={{
                  flexGrow: 1,
                  flexShrink: 0,
                  flexBasis: 'auto'
                }}
              >
                <Switch>
                  {Platform.OS == 'web' ? (
                    <Route
                      path='/:lang([a-z]{2})?'
                      children={({ match, location }) => {
                        /**
                         * Get current language
                         * Set default locale to en if base path is used without a language
                         */
                        const params = match ? match.params : {};
                        const { lang = LanguageOption.Arabic } = params;

                        if (lang != props.locale) {
                          props.changeLocale(lang);
                        }

                        /**
                         * If language is not in route path, redirect to language root
                         */
                        const { pathname } = location;
                        if (!pathname.includes(`/${lang}/`)) {
                          return (
                            <Redirect
                              to={`/${lang}${pathname}${location.search}`}
                            />
                          );
                        }

                        return content(lang, match);
                      }}
                    />
                  ) : (
                    content(props.locale)
                  )}
                </Switch>
              </View>
            </ThemeContext.Provider>
          </AppLayoutProvider>
        </ApolloProvider>
      </PaperProvider>
    </ConnectedRouter>
  );
};

const mapStateToProps = createStructuredSelector({
  type: makeSelectUserType(),
  locale: makeSelectLocale(),
  user: makeSelectUser()
});

function mapDispatchToProps(dispatch) {
  return {
    changeLocale: lang => dispatch(changeLocale(lang))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(App);
