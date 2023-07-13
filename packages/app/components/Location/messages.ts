/*
 * LocationPage Messages
 *
 * This contains all the text for the LocationPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Location';

export default defineMessages({
  location: {
    id: `${scope}.location`,
    defaultMessage: 'LOCATION'
  },
  search: {
    id: `${scope}.search`,
    defaultMessage: 'Search'
  },
  setLocation: {
    id: `${scope}.setLocation`,
    defaultMessage: 'SET LOCATION'
  }
});
