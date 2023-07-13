import * as React from 'react';
import { View } from 'react-native';

// containers
import SearchDoctorPage from '../../containers/SearchDoctorPage';
import AccountPage from '../../containers/AccountPage';
import MenuPage from '../../containers/MenuPage';

// Components
import Responsive from '../Responsive';
import { BottomNavigation } from 'react-native-paper';
import _has from 'lodash/has';
import { Text } from '..';
import { MaterialCommunityIcons } from '../Icon';

// Redux
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose, getLocalizeRoute } from '../../utils/helper';
import { injectIntl } from 'react-intl';

import styles from './styles';
import messages from './messages';
import {
  ROUTE_LAUNCHER,
  ROUTE_MENU,
  ROUTE_ACCOUNT
} from '../../utils/constants';

interface Params {
  params: any;
}
interface LauncherBottomNavigationProps {
  tab: 'search' | 'account' | 'menu';
  push: typeof push;
  intl: any;
  match: Params;
}

function withLauncherBottomNavigation(WrappedComponent, tab) {
  //   console.log('tab', tab);

  //   return null;
  return props => {
    const getDefaultPage = (key: string | number, type = 'page') => {
      let index = 0;
      let page = '';
      switch (key) {
        //search
        case 0:
        case 'search':
        default:
          page = 'search';
          index = 0;
          break;

        //account
        case 'account':
        case 1:
          page = 'account';
          index = 1;
          break;

        //menu
        case 2:
        case 'menu':
          page = 'menu';
          index = 2;
          break;
      }

      return type == 'page' ? page : index;
    };

    const _handleIndexChange = index => {
      const page = getDefaultPage(index, 'page');
      switch (page) {
        case 'search':
          props.push(getLocalizeRoute(ROUTE_LAUNCHER));
          break;
        case 'account':
          props.push(getLocalizeRoute(ROUTE_ACCOUNT));
          break;
        case 'menu':
          props.push(getLocalizeRoute(ROUTE_MENU));
          break;
      }
    };

    const getRenderPage = Component => {
      switch (tab) {
        case 'search':
        case 'account':
        case 'menu':
          return null;
          return () => <WrappedComponent {...props} />;
        //   return () => <WrappedComponent />;
        default:
          return () => null;
          console.log('www');
          return Component;
      }
    };

    const _renderScene = BottomNavigation.SceneMap({
      search: getRenderPage(SearchDoctorPage),
      account: getRenderPage(AccountPage),
      menu: getRenderPage(MenuPage)
    });

    console.log('props', props);
    return (
      <Responsive
        small={
          <View style={styles.container}>
            <BottomNavigation
              shifting={false}
              navigationState={{
                index: getDefaultPage(props.tab, 'key'),
                routes: [
                  {
                    key: 'search',
                    title: props.intl.formatMessage(messages.findDoctor),
                    icon: 'magnify'
                    // color: themeHospital.colors.primary
                  },
                  {
                    key: 'account',
                    title: props.intl.formatMessage(messages.myAccount),
                    icon: p => (
                      <MaterialCommunityIcons
                        {...p}
                        name='account-circle-outline'
                      />
                    )
                    // color: themeHospital.colors.primary
                  },
                  {
                    key: 'menu',
                    title: props.intl.formatMessage(messages.menu),
                    // color: themeHospital.colors.primary,
                    icon: p => <MaterialCommunityIcons {...p} name='menu' />
                  }
                ]
              }}
              onIndexChange={_handleIndexChange}
              renderScene={_renderScene}
            />
          </View>
        }
        large={<WrappedComponent {...props} />}
      />
    );
    // return <WrappedComponent {...props} />;
  };
}

// export default compose(
//   withConnect,
//   injectIntl
// )(withLauncherBottomNavigation);
export default withLauncherBottomNavigation;
// export default withLauncherBottomNavigation;
