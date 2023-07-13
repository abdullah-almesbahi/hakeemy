/*
 * SinglePage Messages
 *
 * This contains all the text for the SinglePage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SinglePage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the SinglePage container!'
  },
  singlePage: {
    id: `${scope}.singlePage`,
    defaultMessage: 'Single Page'
  },
  descriptionSinglePage: {
    id: `${scope}.descriptionSinglePage`,
    defaultMessage: 'Description of SinglePage'
  },
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home'
  },
  error: {
    id: `${scope}.error`,
    defaultMessage: 'Error!'
  }
});
