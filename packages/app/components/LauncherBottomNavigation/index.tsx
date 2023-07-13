import * as React from 'react';
import { View } from 'react-native';

// containers
import SearchDoctorPage from '../../containers/SearchDoctorPage';
import AccountPage from '../../containers/AccountPage';
import MenuPage from '../../containers/MenuPage';

// Components
import Responsive from '../Responsive';
// import { BottomNavigation } from 'react-native-paper';
import BottomNavigation from '../BottomNavigation';
import _has from 'lodash/has';
import { Text } from '..';
import { MaterialCommunityIcons } from '../Icon';

// Redux
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose, getTheme, getLocalizeRoute } from '../../utils/helper';
import { injectIntl } from 'react-intl';

import styles from './styles';
import messages from './messages';
import {
  ROUTE_LAUNCHER,
  ROUTE_MENU,
  ROUTE_ACCOUNT
} from '../../utils/constants';
import SafeAreaView from 'react-native-safe-area-view';

interface Params {
  params: any;
}
interface LauncherBottomNavigationProps {
  tab: 'search' | 'account' | 'menu';
  push: typeof push;
  intl: any;
  match: Params;
}

const LauncherBottomNavigation: React.SFC<
  LauncherBottomNavigationProps
> = props => {
  // const getDefaultPage = (key: string | number, type = 'page') => {
  //   let index = 0;
  //   let page = '';
  //   switch (key) {
  //     //search
  //     case 0:
  //     case 'search':
  //     default:
  //       page = 'search';
  //       index = 0;
  //       break;

  //     //account
  //     case 'account':
  //     case 1:
  //       page = 'account';
  //       index = 1;
  //       break;

  //     //menu
  //     case 2:
  //     case 'menu':
  //       page = 'menu';
  //       index = 2;
  //       break;
  //   }

  //   return type == 'page' ? page : index;
  // };

  const [state, setState] = React.useState({
    // index: getDefaultPage(props.tab, 'key'),
    routes: [
      {
        key: 'search',
        title: props.intl.formatMessage(messages.findDoctor),
        icon: 'magnify',
        onPress: () => {
          props.push(getLocalizeRoute(ROUTE_LAUNCHER));
        }
        // color: themeHospital.colors.primary
      },
      {
        key: 'account',
        title: props.intl.formatMessage(messages.myAccount),
        icon: 'account-circle-outline',
        onPress: () => {
          props.push(getLocalizeRoute(ROUTE_ACCOUNT));
        }

        // color: themeHospital.colors.primary
      },
      {
        key: 'menu',
        title: props.intl.formatMessage(messages.menu),
        // color: themeHospital.colors.primary,
        icon: 'menu',
        onPress: () => {
          props.push(getLocalizeRoute(ROUTE_MENU));
        }
      }
    ]
  });

  // const _handleIndexChange = index => {
  //   const page = getDefaultPage(index, 'page');
  //   switch (page) {
  //     case 'search':
  //       props.push(ROUTE_LAUNCHER);
  //       break;
  //     case 'account':
  //       props.push(ROUTE_ACCOUNT);
  //       break;
  //     case 'menu':
  //       props.push(ROUTE_MENU);
  //       break;
  //   }
  // };

  // const getRenderPage = Component => {
  //   switch (props.tab) {
  //     case 'search':
  //     case 'account':
  //     case 'menu':
  //       return () => props.children;
  //     default:
  //       return Component;
  //   }
  // };

  // const _renderScene = BottomNavigation.SceneMap({
  //   search: getRenderPage(SearchDoctorPage),
  //   account: getRenderPage(AccountPage),
  //   menu: getRenderPage(MenuPage)
  // });

  return (
    <Responsive
      small={
        // <View style={styles.container}>
        <>
          {/* <BottomNavigation
            shifting={false}
            navigationState={state}
            onIndexChange={_handleIndexChange}
            renderScene={_renderScene}
          /> */}
          {props.children}
          <SafeAreaView
            style={{
              backgroundColor: getTheme().colors.primary
              // height: 0,
              // justifyContent: 'flex-start',
              // alignItems: 'flex-start'
            }}
            forceInset={{ bottom: 'always' }}
          >
            <BottomNavigation routes={state.routes} tab={props.tab} />
          </SafeAreaView>
        </>
      }
      large={props.children}
    />
  );
};

function mapDispatchToProps(dispatch) {
  return {
    push: page => dispatch(push(page))
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps
);

export default compose(
  withConnect,
  injectIntl
)(LauncherBottomNavigation);
