/**
 *
 * SearchPage
 *
 */

import React, { memo, useState } from 'react';
import { View } from 'react-native';

import { LauncherPageProps } from './types';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';
import { BottomNavigation } from 'react-native-paper';
import styles from './styles';
import { ROUTE_LAUNCHER } from '../../utils/constants';

// Components
import Responsive from '../../components/Responsive';
import { MaterialCommunityIcons, Helmet } from '../../components';

// Redux
import { makeSelectLocale } from '../../containers/LanguagePage/ducks';
import { makeSelectUserId } from '../User/ducks';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';

// Pages
import MenuPage from '../MenuPage';
import MyAppointmentsPage from '../PatientAppointmentsPage';
import NearHospitalPage from '../NearHospitalPage';
import AboutHakeemyPage from '../AboutHakeemyPage';
import SearchDoctorPage from '../SearchDoctorPage';
import AccountPage from '../AccountPage';
import RegisterPage from '../PatientRegisterPage';
import { getLocalizeRoute } from '../../utils/helper';

const LauncherPage: React.SFC<LauncherPageProps> = props => {
  const getDefaultIndex = () => {
    if (props.match.params.tab == 'findDoctor') {
      return 0;
    } else if (props.match.params.tab == 'myAppointments') {
      return 1;
    } else if (props.match.params.tab == 'myAccount' && props.userId > 0) {
      return 2;
    } else if (props.match.params.tab == 'myAccount') {
      return 1;
    } else if (props.match.params.tab == 'menuTab') {
      return 2;
    } else {
      return 0;
    }
  };

  const [state, setState] = useState({
    index: getDefaultIndex(),
    routes:
      props.userId > 0
        ? [
            {
              key: 'search',
              title: props.intl.formatMessage(messages.findDoctor),
              icon: 'magnify'
            },
            {
              key: 'myAppointments',
              title: props.intl.formatMessage(messages.myAppointments),
              icon: 'timer'
            },
            {
              key: 'myAccount',
              title: props.intl.formatMessage(messages.menu),
              icon: p => (
                <MaterialCommunityIcons {...p} name='menu' />
                // <MaterialCommunityIcons {...p} name='account-circle-outline' />
              )
            }
          ]
        : [
            {
              key: 'search',
              title: props.intl.formatMessage(messages.findDoctor),
              icon: 'magnify'
            },
            {
              key: 'account',
              title: props.intl.formatMessage(messages.myAccount),
              icon: p => (
                <MaterialCommunityIcons {...p} name='account-circle-outline' />
              )
            },
            {
              key: 'menuTab',
              title: props.intl.formatMessage(messages.menu),
              icon: p => <MaterialCommunityIcons {...p} name='menu' />
            }
          ]
  });

  const _handleIndexChange = index => {
    setState({ ...state, index });

    let tab;
    if (index === 0) {
      tab = 'findDoctor';
    } else if (index === 1 && props.userId === 0) {
      tab = 'myAccount';
    } else if (index === 1 && props.userId > 0) {
      tab = 'myAppointments';
    } else if (index === 2 && props.userId === 0) {
      tab = 'menuTab';
    } else {
      tab = 'myAccount';
    }

    props.push(getLocalizeRoute(ROUTE_LAUNCHER + tab));
  };

  const _renderScene = BottomNavigation.SceneMap({
    search: () => <SearchDoctorPage {...props} />,
    myAppointments: () => <MyAppointmentsPage {...props} />,
    account: () => <AccountPage {...props} />,
    nearHospital: () => <NearHospitalPage {...props} />,
    // myAccount: () => <RegisterPage {...props} />,
    myAccount: () => <MenuPage {...props} />,
    // menuTab: () => <MenuPage {...props} />
    menuTab: () => <MenuPage {...props} />
  });

  const getSiteNameHome = () => {
    const language = props.language;
    if (language === 'ar') {
      return '%s | حكيمي';
    }
    return '%s | Hakeemy';
  };

  return null;

  return (
    <>
      <Helmet
        titleTemplate={getSiteNameHome()}
        title={props.intl.formatMessage(messages.title)}
      />
      <Responsive
        small={
          <View style={styles.container}>
            <BottomNavigation
              labeled
              shifting={false}
              navigationState={state}
              onIndexChange={_handleIndexChange}
              renderScene={_renderScene}
              // activeColor='white'
              // inactiveColor='rgba(255,255,255,0.7)'
            />
          </View>
        }
        large={
          props.match.params.tab === 'findDoctor' ? (
            <SearchDoctorPage {...props} />
          ) : props.match.params.tab === 'myAppointments' ? (
            <MyAppointmentsPage {...props} />
          ) : props.match.params.tab === 'myAccount' && props.userId > 0 ? (
            <RegisterPage {...props} />
          ) : props.match.params.tab === 'myAccount' ? (
            <AccountPage {...props} />
          ) : props.match.params.tab === 'menuTab' ? (
            <MenuPage {...props} />
          ) : (
            <SearchDoctorPage {...props} />
          )
        }
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  // LauncherPage: makeSelectLauncherPage()
  userId: makeSelectUserId(),
  language: makeSelectLocale()
  // tabIndex: makeSelectLauncherPage()
});

function mapDispatchToProps(dispatch) {
  return {
    push: page => dispatch(push(page))
    // tabindex: index => dispatch(tabindex(index))
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
)(LauncherPage);
