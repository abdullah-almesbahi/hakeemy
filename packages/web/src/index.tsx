// Security precaution
(window as any).eval = global.eval = (payload: string) => {
  const error = new Error(`This app does not allow window.eval().`);
  Object.assign(error, { payload });

  throw error;
};

import '@babel/polyfill';
import 'react-app-polyfill/ie9';
import 'resize-observer-polyfill/dist/ResizeObserver.global';
import * as Sentry from '@sentry/browser';

import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

import { ComponentType } from 'react';
import { AppRegistry } from 'react-native';

import App from '@hakeemy/app/App';
Sentry.init({
  dsn: __DEV__
    ? ''
    : 'https://8d892acec4b5459d812241c51cf5b871@sentry.io/1813669'
});

const render = (AppComponent: ComponentType) => {
  AppRegistry.registerComponent('hakeemy', () => AppComponent);
  AppRegistry.runApplication('hakeemy', {
    rootTag: document.getElementById('root')
  });
};

render(App);
