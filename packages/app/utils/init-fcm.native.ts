// import * as firebase from 'firebase/app';
import firebase from 'react-native-firebase';
import { Platform } from 'react-native';
// import 'firebase/messaging';
// import 'firebase/database';
// import { Platform } from 'components/Platform/index.web';

// pluck values from your `GoogleService-Info.plist` you created on the firebase console
const iosConfig = {


  // enable persistence by adding the below flag
  persistence: true
};

// pluck values from your `google-services.json` file you created on the firebase console
const androidConfig = {


  // enable persistence by adding the below flag
  persistence: true
};

export const initializedFirebaseApp = firebase.initializeApp(
  Platform.OS === 'ios' ? iosConfig : androidConfig,
  'Hakeemy'
);
// we need to check if messaging is supported by the browser
let messaging;
try {
  messaging = initializedFirebaseApp.messaging();
} catch (e) {
  console.log('e', e);
}

export { messaging };
