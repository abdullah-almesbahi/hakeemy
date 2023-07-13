import * as firebase from 'firebase/app';
import 'firebase/messaging';
import 'firebase/database';
import { Platform } from '../components/Platform/index.web';

export const initializedFirebaseApp = firebase.initializeApp({
  apiKey:
    Platform.OS === 'web'
      ? 'AIzaSyCyU63z03SDle_KdQiqZn5utpMhaR36Nts'
      : 'AIzaSyAdWB8dh12qVq0t-DqzcOUzdKB5H4kYits', // for web
  authDomain: 'telmeeth-app.firebaseapp.com',
  databaseURL: 'https://telmeeth-app.firebaseio.com',
  projectId: 'telmeeth-app',
  storageBucket: 'telmeeth-app.appspot.com',

  // Project Settings => Add Firebase to your web app
  messagingSenderId: '180836230620',
  appId: '1:180836230620:web:5d9ab787b44737d5'
});
// we need to check if messaging is supported by the browser
let messaging;
try {
  messaging = initializedFirebaseApp.messaging();
  messaging.usePublicVapidKey(
    // Project Settings => Cloud Messaging => Web Push certificates
    'BGLVl84kj_YjaI7GpSrZq6-nFgxZLN93fNUCNP6vqct7dhWBCWUAcS9rntKaMQmXjYu22X5IPrZ62g1i9ZByuv0'
  );
} catch (e) {
  console.log('e', e);
}

export { messaging };
