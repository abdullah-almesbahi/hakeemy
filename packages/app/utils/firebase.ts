import * as _firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/messaging';
import { Platform } from 'react-native';

// read https://rharshad.com/web-push-notifications-react-firebase/

const requestPermission = firebase => {
  console.log('Requesting permission...');
  // [START request_permission]
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      getMessage(firebase);
    } else {
      console.log('Unable to get permission to notify.');
    }
  });
  // [END request_permission]
};

const isTokenSentToServer = () => {
  console.log(
    'isTokenSentToServer',
    window.localStorage.getItem('sentToServer')
  );
  return window.localStorage.getItem('sentToServer') === '1';
};
const setTokenSentToServer = sent => {
  console.log('setTokenSentToServer', sent);
  window.localStorage.setItem('sentToServer', sent ? '1' : '0');
};

// Send the Instance ID token your application server, so that it can:
// - send messages back to this app
// - subscribe/unsubscribe the token from topics
const sendTokenToServer = currentToken => {
  if (!isTokenSentToServer()) {
    console.log('Sending token to server...');
    // TODO(developer): Send the current token to your server.
    setTokenSentToServer(true);
  } else {
    console.log(
      "Token already sent to server so won't send it again " +
        'unless it changes'
    );
  }
};

const getMessage = async firebase => {
  let messaging;

  // we need to check if messaging is supported by the browser
  if (firebase.messaging.isSupported()) {
    messaging = firebase.messaging();
  }

  // console.log('once');
  // register service worker & handle push events
  // if ('serviceWorker' in navigator) {
  //   const registration = await navigator.serviceWorker.register(
  //     '/firebase-messaging-sw.js',
  //     {
  //       updateViaCache: 'none'
  //     }
  //   );
  //   console.log('registration', registration);
  //   messaging.useServiceWorker(registration);
  //   // window.addEventListener('load', async () => {

  //   //   messaging.onMessage(payload => {
  //   //     const title = payload.notification.title;
  //   //     const options = {
  //   //       body: payload.notification.body,
  //   //       icon: payload.notification.icon,
  //   //       actions: [
  //   //         {
  //   //           action: payload.fcmOptions.link,
  //   //           title: 'Book Appointment'
  //   //         }
  //   //       ]
  //   //     };
  //   //     registration.showNotification(title, options);
  //   //   });
  //   // });
  // }

  // [END get_messaging_object]
  // [START set_public_vapid_key]
  // Add the public key generated from the console here.
  messaging.usePublicVapidKey(
    '-'
  );

  // [START refresh_token]
  // Callback fired if Instance ID token is updated.
  messaging.onTokenRefresh(() => {
    messaging
      .getToken()
      .then(refreshedToken => {
        console.log('Token refreshed.');
        // Indicate that the new Instance ID token has not yet been sent to the
        // app server.
        // setTokenSentToServer(false);
        // Send Instance ID token to app server.
        // sendTokenToServer(refreshedToken);
        // [START_EXCLUDE]
        // Display new Instance ID token and clear UI of all previous messages.
        // resetUI();
        // [END_EXCLUDE]
      })
      .catch(err => {
        console.log('Unable to retrieve refreshed token ', err);
        // showToken('Unable to retrieve refreshed token ', err);
      });
  });

  // Handle incoming messages. Called when:
  // - a message is received while the app has focus
  // - the user clicks on an app notification created by a service worker
  //   `messaging.setBackgroundMessageHandler` handler.
  messaging.onMessage(payload => {
    console.log('Message received. ', payload);
    // [START_EXCLUDE]
    // Update the UI to include the received message.
    // appendMessage(payload);
    // [END_EXCLUDE]
  });

  // [START get_token]
  // Get Instance ID token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
  messaging
    .getToken()
    .then(currentToken => {
      console.log('currentToken', currentToken);
      if (currentToken) {
        sendTokenToServer(currentToken);
        // updateUIForPushEnabled(currentToken);
      } else {
        // Show permission request.
        console.log(
          'No Instance ID token available. Request permission to generate one.'
        );
        // Show permission UI.
        // updateUIForPushPermissionRequired();
        setTokenSentToServer(false);
      }
    })
    .catch(err => {
      console.log('An error occurred while retrieving token. ', err);
      // showToken('Error retrieving Instance ID token. ', err);
      setTokenSentToServer(false);
    });
  // [END get_token]
};

const firebaseInit = () => {
  const firebaseConfig = {

    //   messagingSenderId: 'sender-id',
    //   appID: 'app-id'
  };

  // Initialize Firebase
  _firebase.initializeApp(firebaseConfig);

  return _firebase;
};

export { requestPermission, getMessage };
export default firebaseInit;
