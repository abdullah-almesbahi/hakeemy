importScripts('https://www.gstatic.com/firebasejs/5.7.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.7.2/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: '180836230620'
});

const messaging = firebase.messaging();

self.addEventListener('notificationclick', event => {
  console.log('worked');
  alert('thank you');
  if (event.action) {
    clients.openWindow(event.action);
  }
  event.notification.close();
});
