/**
 *
 * RateApp
 *
 */

import React, { memo, useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';
// import { useInjectReducer } from 'utils/injectReducer';
import reducer, { makeSelectRateApp, rate } from './ducks';
import { RateAppProps } from './types';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';
// import Button from 'react-native-paper';

import FormRateApp from './formik';
import Rate, { AndroidMarket } from 'react-native-rate';
import styles from './styles';
import { Button, Paragraph, Dialog, Portal, Surface } from 'react-native-paper';
import Modal from '../../components/Modal';

const RateApp = (props: RateAppProps) => {
  // useInjectReducer({ key: 'rateApp', reducer });

  const [state, setState] = useState({ dialog: false, rate: false });

  const _showDialog = () => setState({ ...state, dialog: true });

  const _hideDialog = () => setState({ ...state, dialog: false });

  // const isAlreadyRate = await AsyncStorage.getItem('isAlreadyRate');
  // const countStartApp = await AsyncStorage.getItem('countStartApp');
  // const count = countStartApp ? parseInt(countStartApp) : 1;

  // if (!isAlreadyRate && count % 3 === 0) {
  //   Alert.alert('App Rating', 'Please give us your opinion!', [
  //     {
  //       text: 'Later',
  //       onPress: () => console.log('Cancel Pressed'),
  //       style: 'cancel'
  //     },
  //     {
  //       text: 'OK',
  //       onPress: () => {
  //         setTimeout(() => {
  //           let options = {
  //             AppleAppID: '***************',
  //             GooglePackageName: '******************',
  //             preferredAndroidMarket: AndroidMarket.Google,
  //             preferInApp: false,
  //             openAppStoreIfInAppFails: true
  //           };
  //           Rate.rate(options, success => {
  //             if (success) {
  //               AsyncStorage.setItem('isAlreadyRate', 'true');
  //             }
  //           });
  //         }, 500);
  //       }
  //     }
  //   ]);
  // }
  // await AsyncStorage.setItem('countStartApp', `${count + 1}`);

  useEffect(() => {
    if (
      // !props.rateApp.rated
      !props.rateApp.rated &&
      props.rateApp.points !== 0 &&
      props.rateApp.points % 30 === 0
    ) {
      _showDialog();
    }
  }, [props.rateApp.points]);
  return (
    <Portal>
      <Dialog
        visible={state.dialog}
        onDismiss={_hideDialog}
        style={{
          width: '90%',
          maxWidth: 500,
          minWidth: 300,
          alignSelf: 'center'
        }}
      >
        <Dialog.Title>
          {props.intl.formatMessage(messages.rateApp)}
        </Dialog.Title>
        <Dialog.Content>
          <Paragraph>
            {props.intl.formatMessage(messages.secondsToRate)}
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-start'
            }}
          >
            <Button onPress={_hideDialog}>
              {props.intl.formatMessage(messages.later)}
            </Button>
          </View>
          <Button
            onPress={() => {
              props.rated();
              _hideDialog();
            }}
          >
            {props.intl.formatMessage(messages.noThanks)}
          </Button>
          <Button
            onPress={() => {
              const options = {
                AppleAppID: '1391930785',
                GooglePackageName: 'com.hakeemy',
                preferredAndroidMarket: AndroidMarket.Google,
                preferInApp: false,
                openAppStoreIfInAppFails: true,
                fallbackPlatformURL:
                  'https://play.google.com/store/apps/details?id=com.hakeemy'
              };
              Rate.rate(options, success => {
                if (success) {
                  // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
                  props.rated();
                }
              });
              _hideDialog();
            }}
          >
            {props.intl.formatMessage(messages.rateNow)}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const mapStateToProps = createStructuredSelector({
  rateApp: makeSelectRateApp()
});

function mapDispatchToProps(dispatch) {
  return {
    push: page => dispatch(push(page)),
    rated: () => dispatch(rate())
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
)(RateApp);
