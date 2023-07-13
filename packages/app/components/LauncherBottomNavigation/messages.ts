/*
 * ContactPage Messages
 *
 * This contains all the text for the ContactPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.LauncherBottomNavigation';

export default defineMessages({
  findDoctor: {
    id: `${scope}.findDoctor`,
    defaultMessage: 'Find Doctor'
  },
  myAccount: {
    id: `${scope}.myAccount`,
    defaultMessage: 'My Account'
  },
  menu: {
    id: `${scope}.menu`,
    defaultMessage: 'Menu'
  }
});
