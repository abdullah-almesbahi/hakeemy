/*
 * MePage Messages
 *
 * This contains all the text for the MePage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Menu';

export default defineMessages({
  menu: {
    id: `${scope}.menu`,
    defaultMessage: 'MENU'
  },
  setting: {
    id: `${scope}.setting`,
    defaultMessage: 'SETTINGS'
  },
  myInformation: {
    id: `${scope}.myInformation`,
    defaultMessage: 'MY INFORMATION'
  },
  preference: {
    id: `${scope}.preference`,
    defaultMessage: 'PREFERENCE'
  },
  language: {
    id: `${scope}.language`,
    defaultMessage: 'LANGUAGE'
  },

  changeMobile: {
    id: `${scope}.changeMobile`,
    defaultMessage: 'CHANGE MOBILE NUMBER'
  },
  signOut: {
    id: `${scope}.signOut`,
    defaultMessage: 'SIGN OUT'
  },
  changePassword: {
    id: `${scope}.changePassword`,
    defaultMessage: 'CHANGE PASSWORD'
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel'
  },
  confirm: {
    id: `${scope}.confirm`,
    defaultMessage: 'Confirm'
  },
  confirmLogout: {
    id: `${scope}.confirmLogout`,
    defaultMessage: 'Confirm logout'
  },
  logout: {
    id: `${scope}.logout`,
    defaultMessage: 'Logout'
  },
  sureToLogout: {
    id: `${scope}.sureToLogout`,
    defaultMessage: 'Are you sure you want to logout?'
  },
  aboutHakeemy: {
    id: `${scope}.aboutHakeemy`,
    defaultMessage: 'ABOUT HAKEEMY'
  },
  contactUs: {
    id: `${scope}.contactUs`,
    defaultMessage: 'CONTACT US'
  },
  termOfUse: {
    id: `${scope}.termOfUse`,
    defaultMessage: 'TERMS AND CONDITIONS'
  },
  privacyPolicy: {
    id: `${scope}.privacyPolicy`,
    defaultMessage: 'PRIVACY POLICY'
  },
  blog: {
    id: `${scope}.blog`,
    defaultMessage: 'BLOG'
  },
  successfullySignedOut: {
    id: `${scope}.successfullySignedOut`,
    defaultMessage: 'You have been successfully signed out'
  }
});
