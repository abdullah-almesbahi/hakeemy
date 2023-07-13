import * as React from 'react';
import { View } from 'react-native';

// containers
import SearchDoctorPage from '../../containers/SearchDoctorPage';
import MyAppointmentsPage from '../../containers/PatientAppointmentsPage';
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
  ROUTE_PATIENT_APPOINTMENTS,
  ROUTE_PATIENT_SEARCH,
  ROUTE_PATIENT_MENU
} from '../../utils/constants';
import SafeAreaView from 'react-native-safe-area-view';

interface Params {
  params: any;
}
interface PatientBottomNavigationProps {
  tab: 'search' | 'appointments' | 'menu';
  push: typeof push;
  intl: any;
  match: Params;
}

const PatientBottomNavigation: React.SFC<
  PatientBottomNavigationProps
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

  //     //appointments
  //     case 'appointments':
  //     case 1:
  //       page = 'appointments';
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
          props.push(getLocalizeRoute(ROUTE_PATIENT_SEARCH));
        }
        // color: themeHospital.colors.primary
      },
      {
        key: 'appointments',
        title: props.intl.formatMessage(messages.myAppointments),
        icon: 'timer',
        onPress: () => {
          props.push(getLocalizeRoute(ROUTE_PATIENT_APPOINTMENTS));
        }
        // color: themeHospital.colors.primary
      },
      {
        key: 'menu',
        title: props.intl.formatMessage(messages.menu),
        // color: themeHospital.colors.primary,
        icon: 'menu',
        onPress: () => {
          props.push(getLocalizeRoute(ROUTE_PATIENT_MENU));
        }
      }
    ]
  });

  // const _handleIndexChange = index => {
  //   const page = getDefaultPage(index, 'page');
  //   switch (page) {
  //     case 'search':
  //       props.push(ROUTE_PATIENT_SEARCH);
  //       break;
  //     case 'appointments':
  //       props.push(ROUTE_PATIENT_APPOINTMENTS);
  //       break;
  //     case 'menu':
  //       props.push(ROUTE_PATIENT_MENU);
  //       break;
  //   }
  // };

  // const getRenderPage = Component => {
  //   switch (props.tab) {
  //     case 'search':
  //     case 'appointments':
  //     case 'menu':
  //       return () => props.children;
  //     default:
  //       return Component;
  //   }
  // };

  // const _renderScene = BottomNavigation.SceneMap({
  //   search: getRenderPage(SearchDoctorPage),
  //   appointments: getRenderPage(MyAppointmentsPage),
  //   menu: getRenderPage(MenuPage)
  // });

  return (
    <Responsive
      small={
        <View style={styles.container}>
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
            }}
            forceInset={{ bottom: 'always' }}
          >
            <BottomNavigation routes={state.routes} tab={props.tab} />
          </SafeAreaView>
        </View>
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
)(PatientBottomNavigation);
