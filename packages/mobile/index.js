import 'react-native-get-random-values';
import React from 'react';
import { AppRegistry, YellowBox, View, StatusBar, Alert } from 'react-native';
import App from '@hakeemy/app/App';
import { name as appName } from './app.json';
import RNRestart from 'react-native-restart';
import 'intl';
import 'intl/locale-data/jsonp/en';
// import codePush from 'react-native-code-push';
import { useEffect } from 'react';
import CodePushDialog from './CodePushDialog';
import codePush from 'react-native-code-push';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: __DEV__
    ? ''
    : 'https://@sentry.io/',
  debug: true
});

// console.disableYellowBox = true;

if (__DEV__) {
  global.XMLHttpRequest =
    global.originalXMLHttpRequest || global.XMLHttpRequest;
  global.FormData = global.originalFormData || global.FormData;
  if (window.FETCH_SUPPORT) {
    window.FETCH_SUPPORT.blob = false;
  } else {
    global.Blob = global.originalBlob || global.Blob;
    global.FileReader = global.originalFileReader || global.FileReader;
  }
}

// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
// global.XMLHttpRequest = global.originalXMLHttpRequest
//   ? global.originalXMLHttpRequest
//   : global.XMLHttpRequest;
// global.FormData = global.originalFormData
//   ? global.originalFormData
//   : global.FormData;

// let codePushOptions = {
//   updateDialog: true,
//   checkFrequency: codePush.CheckFrequency.ON_APP_RESUME
// };
// import Crashes, { UserConfirmation } from 'appcenter-crashes';

const CodePushProgress = () => {
  console.disableYellowBox = true;
  console.warn = e => {
    // console.log('sss', e);
  };
  useEffect(() => {
    codePush.getUpdateMetadata().then(update => {
      if (update) {
        Sentry.setRelease(update.appVersion + '-codepush:' + update.label);
      }
    });
  }, []);

  const isIOS = Platform.OS === 'ios';
  const productionKey_iOS = '-OP';
  const stagingKey_iOS = 'Xf-';

  const productionKey_android = '-';
  const stagingKey_android = '-';

  const stagingKey = isIOS ? stagingKey_iOS : stagingKey_android;
  const productionKey = isIOS ? productionKey_iOS : productionKey_android;

  // const deploymentKey = __DEV__ ? stagingKey : productionKey;
  const deploymentKey = productionKey;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle='dark-content' />
      <CodePushDialog
        isCheckOnResume
        deploymentKey={deploymentKey}
        optionTexts={{
          UpdateConfirmText: 'Do you want to update now ?',
          UpdateMandatoryText: 'Please update to the newest version.',
          UpdatedText:
            'The latest version of Hakeemy is installed. Restart the app for updates to take effect.',
          RestartConfirmText: 'Do you want to restart now ?',
          RestartMandatoryText: '',
          UpdateText: 'The newer version of Hakeemy is available.',
          NeedUpdateStoreText: 'The latest version of Hakeemy is available.'
        }}
      />
      <App />
    </View>
  );
};

AppRegistry.registerComponent(appName, () => CodePushProgress);
