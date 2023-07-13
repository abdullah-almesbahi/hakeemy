/*
 * AccountPage Messages
 *
 * This contains all the text for the AccountPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AccountPage';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'My Account'
  },
  patient: {
    id: `${scope}.patient`,
    defaultMessage: 'Patient'
  },
  hospital: {
    id: `${scope}.hospital`,
    defaultMessage: 'Hospital'
  }
});
