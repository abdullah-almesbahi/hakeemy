/*
 * SearchListPage Messages
 *
 * This contains all the text for the SearchListPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SearchListPage';

export default defineMessages({
  noResults: {
    id: `${scope}.noResults`,
    defaultMessage:
      'Your query returned no results. Please change your search criteria and try again'
  },
  specialist: {
    id: `${scope}.specialist`,
    defaultMessage: 'Specialist'
  },
  consultant: {
    id: `${scope}.consultant`,
    defaultMessage: 'Consultant'
  },
  km: {
    id: `${scope}.km`,
    defaultMessage: 'KM'
  },
  searchList: {
    id: `${scope}.searchList`,
    defaultMessage: 'Search List'
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Doctors Search List'
  }
});
