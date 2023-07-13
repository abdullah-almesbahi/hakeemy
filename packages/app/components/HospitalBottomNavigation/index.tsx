import * as React from 'react';
import { View } from 'react-native';

// containers
import HospitalAppointmentsPage from '../../containers/HospitalAppointmentsPage';
import HospitalDoctorsPage from '../../containers/HospitalDoctorsPage';
import HospitalDoctorsSchedulePage from '../../containers/HospitalSchedulesPage';
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
import { themeHospital } from '../../containers/App/themes';
import messages from './messages';
import {
  ROUTE_HOSPITAL_SCHEDULES,
  ROUTE_HOSPITAL_APPOINTMENTS,
  ROUTE_HOSPITAL_DOCTORS,
  ROUTE_HOSPITAL_MENU
} from '../../utils/constants';

interface Params {
  params: any;
}
interface HospitalBottomNavigationProps {
  tab: 'appointments' | 'schedules' | 'doctors' | 'menu';
  push: typeof push;
  intl: any;
  match: Params;
}

const HospitalBottomNavigation: React.SFC<
  HospitalBottomNavigationProps
> = props => {
  const getDefaultPage = (key: string | number, type = 'page') => {
    let index = 0;
    let page = '';
    switch (key) {
      //appointments
      case 0:
      case 'appointments':
      default:
        page = 'appointments';
        index = 0;
        break;

      //schedules
      case 'schedules':
      case 1:
        page = 'schedules';
        index = 1;
        break;

      //doctors
      case 2:
      case 'doctors':
        page = 'doctors';
        index = 2;
        break;

      //menu
      case 3:
      case 'menu':
        page = 'menu';
        index = 3;
        break;
    }

    return type == 'page' ? page : index;
  };

  const [state, setState] = React.useState({
    index: getDefaultPage(props.tab, 'key'),
    routes: [
      {
        key: 'appointments',
        title: props.intl.formatMessage(messages.appointments),
        icon: 'timer',
        color: themeHospital.colors.primary
      },
      {
        key: 'schedules',
        title: props.intl.formatMessage(messages.schedule),
        icon: 'calendar-range',
        color: themeHospital.colors.primary
      },
      {
        key: 'doctors',
        title: props.intl.formatMessage(messages.doctors),
        color: themeHospital.colors.primary,
        icon: p => <MaterialCommunityIcons {...p} name='doctor' />
      },
      {
        key: 'menu',
        title: props.intl.formatMessage(messages.menu),
        color: themeHospital.colors.primary,
        icon: p => <MaterialCommunityIcons {...p} name='menu' />
      }
    ]
  });

  const _handleIndexChange = index => {
    const page = getDefaultPage(index, 'page');
    switch (page) {
      case 'appointments':
        props.push(getLocalizeRoute(ROUTE_HOSPITAL_APPOINTMENTS));
        break;
      case 'schedules':
        props.push(getLocalizeRoute(ROUTE_HOSPITAL_SCHEDULES));
        break;
      case 'doctors':
        props.push(getLocalizeRoute(ROUTE_HOSPITAL_DOCTORS));
        break;
      case 'menu':
        props.push(getLocalizeRoute(ROUTE_HOSPITAL_MENU));
        break;
    }
  };

  const getRenderPage = Component => {
    switch (props.tab) {
      case 'appointments':
      case 'schedules':
      case 'doctors':
      case 'menu':
        return () => props.children;
      default:
        return Component;
    }
  };

  const _renderScene = BottomNavigation.SceneMap({
    appointments: getRenderPage(HospitalDoctorsSchedulePage),
    schedules: getRenderPage(HospitalDoctorsSchedulePage),
    doctors: getRenderPage(HospitalDoctorsPage),
    menu: getRenderPage(MenuPage)
  });

  return (
    <Responsive
      small={
        <View style={styles.container}>
          <BottomNavigation
            shifting={false}
            navigationState={state}
            onIndexChange={_handleIndexChange}
            renderScene={_renderScene}
          />
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
)(HospitalBottomNavigation);
