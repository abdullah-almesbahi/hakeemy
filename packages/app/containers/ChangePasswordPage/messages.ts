/*
 * ContactPage Messages
 *
 * This contains all the text for the ContactPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ChangePassword';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'CHANGE PASSWORD'
  },
  save: {
    id: `${scope}.save`,
    defaultMessage: 'SAVE'
  },
  current_password: {
    id: `${scope}.current_password`,
    defaultMessage: 'Current Password'
  },
  new_password: {
    id: `${scope}.new_password`,
    defaultMessage: 'New Password'
  },
  re_new_password: {
    id: `${scope}.re_new_password`,
    defaultMessage: 'Repeat New Password'
  },
  change: {
    id: `${scope}.change`,
    defaultMessage: 'Change'
  },
  //---------
  changePassword: {
    id: `${scope}.changePassword`,
    defaultMessage: 'Change Password'
  },
  yourPasswordUpdated: {
    id: `${scope}.yourPasswordUpdated`,
    defaultMessage: 'Your password has been successfully updated'
  }
});
