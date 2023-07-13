import * as React from 'react';
import { Platform } from '../../components/Platform';
import { View, StyleSheet, Image, Linking } from 'react-native';
import { Text } from '../../components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { makeSelectUser } from '../User/ducks';
import { HOSPITAL_TYPE } from '../../utils/constants';
import { themeHospital, themePatient } from '../App/themes';
import {
  Appbar,
  Button,
  TouchableRipple,
  IconButton
} from 'react-native-paper';
import { push } from 'connected-react-router';
import {
  ROUTE_LAUNCHER,
  ROUTE_HOSPITAL_APPOINTMENTS,
  ROUTE_HOSPITAL_SCHEDULES,
  ROUTE_HOSPITAL_DOCTORS,
  ROUTE_HOSPITAL_MENU,
  ROUTE_PATIENT_APPOINTMENTS,
  ROUTE_PATIENT_MENU,
  ROUTE_PATIENT_SEARCH,
  ROUTE_ACCOUNT,
  ROUTE_ABOUT_HAKEEMY,
  ROUTE_MENU,
  ROUTE_SEARCH_LIST
} from '../../utils/constants';

import { Link } from '../../components/Router';
import makeGrid from '../../components/Grid';
const Grid = makeGrid(16); // gutter size

// interface HeaderProps {
//   user: number;
// }
import messages from './messages';
import { isHospital, isPatient, getLocalizeRoute } from '../../utils/helper';

const Header: React.SFC<HeaderProps> = props => {
  // const _handleIndexChange = index => {
  //   setState({ ...state, index });
  //   props.hTabindex(`${index}`);
  // };

  const openURL = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don't know how to open URI: ${url}`);
      }
    });
  };

  return (
    <View
      style={{
        backgroundColor: isHospital()
          ? themeHospital.colors.primary
          : themePatient.colors.primary
      }}
    >
      <Grid.Container>
        <Grid.Row>
          <Grid.Col style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Link to={getLocalizeRoute(ROUTE_LAUNCHER)}>
              <Image
                style={{
                  width: 150,
                  height: 60,
                  marginVertical: 10,
                  marginHorizontal: 10
                }}
                source={require('../../images/logo-arabic.png')}
              />
            </Link>
          </Grid.Col>
          <Grid.Col
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}
          >
            {isHospital() && props.user.api_key !== null ? (
              <>
                <Link
                  to={getLocalizeRoute(ROUTE_HOSPITAL_APPOINTMENTS)}
                  className='menuLink'
                  itemType='http://www.schema.org/SiteNavigationElement'
                  itemProp='name'
                >
                  {props.intl.formatMessage(messages.appointments)}
                </Link>
                <Link
                  to={getLocalizeRoute(ROUTE_HOSPITAL_SCHEDULES)}
                  className='menuLink'
                  itemType='http://www.schema.org/SiteNavigationElement'
                  itemProp='name'
                >
                  {props.intl.formatMessage(messages.schedule)}
                </Link>
                <Link
                  to={getLocalizeRoute(ROUTE_HOSPITAL_DOCTORS)}
                  className='menuLink'
                  itemType='http://www.schema.org/SiteNavigationElement'
                  itemProp='name'
                >
                  {props.intl.formatMessage(messages.doctors)}
                </Link>
                <Link
                  to={getLocalizeRoute(ROUTE_HOSPITAL_MENU)}
                  className='menuLink'
                  itemType='http://www.schema.org/SiteNavigationElement'
                  itemProp='name'
                >
                  {props.intl.formatMessage(messages.myAccount)}
                </Link>
              </>
            ) : isPatient() && props.user.api_key !== null ? (
              <>
                <Link
                  to={getLocalizeRoute(ROUTE_PATIENT_SEARCH)}
                  className='menuLink'
                  itemType='http://www.schema.org/SiteNavigationElement'
                  itemProp='name'
                >
                  {props.intl.formatMessage(messages.findDoctor)}
                </Link>
                <Link
                  to={getLocalizeRoute(ROUTE_PATIENT_APPOINTMENTS)}
                  className='menuLink'
                  itemType='http://www.schema.org/SiteNavigationElement'
                  itemProp='name'
                >
                  {props.intl.formatMessage(messages.myAppointments)}
                </Link>
                <Link
                  to={getLocalizeRoute(ROUTE_PATIENT_MENU)}
                  className='menuLink'
                  itemType='http://www.schema.org/SiteNavigationElement'
                  itemProp='name'
                >
                  {props.intl.formatMessage(messages.myAccount)}
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={getLocalizeRoute(ROUTE_LAUNCHER)}
                  className='menuLink'
                  itemType='http://www.schema.org/SiteNavigationElement'
                  itemProp='name'
                >
                  {props.intl.formatMessage(messages.findDoctor)}
                </Link>
                <Link
                  to={getLocalizeRoute(ROUTE_SEARCH_LIST)}
                  className='menuLink'
                  itemType='http://www.schema.org/SiteNavigationElement'
                  itemProp='name'
                >
                  {props.intl.formatMessage(messages.doctorsList)}
                </Link>
                <a
                  href='https://blog.hakeemy.com'
                  className='menuLink'
                  itemType='http://www.schema.org/SiteNavigationElement'
                  itemProp='name'
                >
                  {props.intl.formatMessage(messages.blog)}
                </a>
                <Link
                  to={getLocalizeRoute(ROUTE_ACCOUNT)}
                  className='menuLink'
                  itemType='http://www.schema.org/SiteNavigationElement'
                  itemProp='name'
                >
                  {props.intl.formatMessage(messages.myAccount)}
                </Link>
              </>
            )}
          </Grid.Col>
          <Grid.Col
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
          >
            <IconButton
              icon='linkedin'
              color='#343434'
              size={18}
              onPress={() =>
                openURL('https://www.linkedin.com/company/hakeemy')
              }
            />
            <IconButton
              icon={require('../../images/instagram.svg')}
              color='#343434'
              size={15}
              onPress={() => openURL('https://www.instagram.com/hakeemy_info/')}
            />
            <IconButton
              icon='twitter'
              color='#343434'
              size={18}
              onPress={() => openURL('https://twitter.com/hakeemyinfo')}
            />
            <IconButton
              icon='facebook'
              color='#343434'
              size={18}
              onPress={() => openURL('https://www.facebook.com/hakeemyinfo/')}
            />
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#46A3DA'
  }
});

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser()
});

function mapDispatchToProps(dispatch) {
  return {
    push: page => dispatch(push(page))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  injectIntl
)(Header);
