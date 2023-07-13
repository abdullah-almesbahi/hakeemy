// /**
// *
// * AccountPage
// *
// */

import React, { useEffect, useState, useContext } from 'react';
import {
  Animated,
  View,
  ImageBackground,
  Platform,
  I18nManager
} from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { setUserType, makeSelectUserId, logoutUser } from '../User/ducks';
import { createStructuredSelector } from 'reselect';
import { changeLocale, makeSelectLocale } from '../LanguagePage/ducks';
import RNRestart from 'react-native-restart';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';
import styles from './styles';
import Text from '../../components/Text';
import Logo from '../../components/Logo';
import { Switch, Button as Buttonx } from 'react-native-paper';
import { ThemeContext } from '../../hooks/useThemeContext';
import { PATIENT_TYPE, HOSPITAL_TYPE } from '../../utils/constants';
import {
  ROUTE_PATIENT_LOGIN,
  ROUTE_HOSPITAL_LOGIN,
  ROUTE_LAUNCHER,
  ROUTE_ACCOUNT
} from '../../utils/constants';
import { Button, Helmet } from '../../components';
import SafeAreaView from 'react-native-safe-area-view';
import { getSiteName, getLocalizeRoute } from '../../utils/helper';
import LauncherBottomNavigation from '../../components/LauncherBottomNavigation';
import { LanguageOption } from '../LanguagePage/types';

interface AccountProps {
  intl: any;
}

const AccountPage: React.SFC<AccountProps> = props => {
  const initialState = {
    anim: new Animated.Value(0)
  };
  const [state, setState] = useState(initialState);
  const theme = useContext(ThemeContext);
  useEffect(() => {
    // StatusBar && StatusBar.setBarStyle('default');
    Animated.timing(state.anim, { toValue: 3000, duration: 3000 }).start();
  }, []);

  const fadeIn = (delay, from = 0) => {
    const { anim } = state;
    return {
      opacity: anim.interpolate({
        inputRange: [delay, Math.min(delay + 500, 3000)],
        outputRange: [0, 1],
        extrapolate: 'clamp'
      }),
      transform: [
        {
          translateY: anim.interpolate({
            inputRange: [delay, Math.min(delay + 500, 3000)],
            outputRange: [from, 0],
            extrapolate: 'clamp'
          })
        }
      ]
    };
  };

  const content = () => (
    <View style={styles.container}>
      <Helmet
        titleTemplate={getSiteName()}
        title={props.intl.formatMessage(messages.title)}
      />
      <ImageBackground
        direction={'rtl'}
        style={styles.imageBackground}
        source={require('./../../images/BG-account2.jpg')}
      >
        <View style={styles.bodyContainer}>
          <View style={styles.logoSection}>
            <Logo type={props.type} />
            {/* <Animated.Image
              resizeMode='contain'
              style={{ width: 130, height: 130 }}
              source={require('../../images/hakeemy-icon-white.png')}
            /> */}
          </View>
          <Animated.View style={[styles.userTypeSection, fadeIn(1000, 10)]}>
            <Button
              style={styles.patientButton}
              // dark={true}
              roundness
              onPress={() => {
                props.setUserType(PATIENT_TYPE);
                theme(PATIENT_TYPE);
                props.push(getLocalizeRoute(ROUTE_PATIENT_LOGIN));
              }}
            >
              <FormattedMessage {...messages.patient} />
            </Button>
            <Button
              style={styles.hospitalButton}
              // dark={true}
              roundness
              onPress={() => {
                props.setUserType(HOSPITAL_TYPE);
                theme(HOSPITAL_TYPE);
                props.push(getLocalizeRoute(ROUTE_HOSPITAL_LOGIN));
              }}
            >
              <FormattedMessage {...messages.hospital} />
            </Button>
          </Animated.View>
          <View style={styles.languageSection}>
            {I18nManager.isRTL ? <Text>عربي</Text> : <Text>ENGLISH</Text>}
            <Switch
              value={
                Platform.OS == 'ios' ? true : I18nManager.isRTL ? false : true
              }
              onValueChange={() => {
                if (Platform.OS !== 'web') {
                  props.changeLocale(props.language == 'en' ? 'ar' : 'en');
                  setTimeout(() => {
                    RNRestart.Restart();
                  }, 200);
                } else {
                  props.push(
                    props.language == 'en'
                      ? getLocalizeRoute(ROUTE_ACCOUNT, LanguageOption.Arabic)
                      : getLocalizeRoute(ROUTE_ACCOUNT, LanguageOption.English)
                  );
                }
              }}
              style={{
                marginHorizontal: 10,
                transform: [{ rotate: '180deg' }]
              }}
            />
            {I18nManager.isRTL ? <Text>ENGLISH</Text> : <Text>عربي</Text>}
          </View>
        </View>
      </ImageBackground>
    </View>
  );

  return (
    <LauncherBottomNavigation tab='account'>
      {content()}
    </LauncherBottomNavigation>
  );
};

const mapStateToProps = createStructuredSelector({
  language: makeSelectLocale(),
  userId: makeSelectUserId()
});

function mapDispatchToProps(dispatch) {
  return {
    setUserType: type => dispatch(setUserType(type)),
    push: page => dispatch(push(page)),
    changeLocale: language => dispatch(changeLocale(language)),
    logoutUser: () => dispatch(logoutUser())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  injectIntl
)(AccountPage);
