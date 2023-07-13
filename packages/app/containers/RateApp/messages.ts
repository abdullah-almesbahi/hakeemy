/*
 * ContactPage Messages
 *
 * This contains all the text for the ContactPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ContactPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ContactPage container!'
  },
  username: {
    id: `${scope}.username`,
    defaultMessage: 'Username'
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: 'Login'
  },
  usernameRequired: {
    id: `${scope}.usernameRequired`,
    defaultMessage: 'please enter username'
  },
  save: {
    id: `${scope}.save`,
    defaultMessage: 'SAVE'
  },
  later: {
    id: `${scope}.later`,
    defaultMessage: 'Maybe Later'
  },
  rateNow: {
    id: `${scope}.rateNow`,
    defaultMessage: 'Rate Now'
  },
  noThanks: {
    id: `${scope}.noThanks`,
    defaultMessage: 'No Thanks'
  },
  rateApp: {
    id: `${scope}.rateApp`,
    defaultMessage: 'RATE OUR APP'
  },
  secondsToRate: {
    id: `${scope}.secondsToRate`,
    defaultMessage:
      'If you enjoy using Hakeemy app, Please take a few seconds to rate us 5 stars. It really helps!'
  }
});
