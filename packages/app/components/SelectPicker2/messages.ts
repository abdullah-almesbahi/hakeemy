/*
 * NoRecords Messages
 *
 * This contains all the text for the NoRecords component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.SelectPicker2';

export default defineMessages({
  gpsRequired: {
    id: `${scope}.gpsRequired`,
    defaultMessage: 'GPS Required'
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel'
  },
  goToSettings: {
    id: `${scope}.goToSettings`,
    defaultMessage: 'Go to settings'
  },
  allowLocation: {
    id: `${scope}.allowLocation`,
    defaultMessage:
      'Please, allow the location to see the nearest doctors from you'
  },
  ok: {
    id: `${scope}.ok`,
    defaultMessage: 'Ok'
  }
});
