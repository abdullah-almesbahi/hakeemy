/*
 * MyAppointmentsPage Messages
 *
 * This contains all the text for the MyAppointmentsPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.MyAppointmentsPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the MyAppointmentsPage container!'
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: 'MY APPOINTMENTS'
  },
  status: {
    id: `${scope}.status`,
    defaultMessage: 'Status'
  },
  approved: {
    id: `${scope}.approved`,
    defaultMessage: 'Approved'
  },
  pending: {
    id: `${scope}.pending`,
    defaultMessage: 'Pending'
  },
  rejected: {
    id: `${scope}.rejected`,
    defaultMessage: 'Rejected'
  },
  dateTime: {
    id: `${scope}.dateTime`,
    defaultMessage: 'Date And Time'
  }
});
