/*
 * ContactPage Messages
 *
 * This contains all the text for the ContactPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HospitalAppointmentsPage';

export default defineMessages({
  appointments: {
    id: `${scope}.appointments`,
    defaultMessage: 'APPOINTMENTS'
  },
  noAppointments: {
    id: `${scope}.noAppointments`,
    defaultMessage: 'No appointment exist'
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
  approved: {
    id: `${scope}.approved`,
    defaultMessage: 'Approved'
  },
  pending: {
    id: `${scope}.pending`,
    defaultMessage: 'Pending'
  },
  reject: {
    id: `${scope}.reject`,
    defaultMessage: 'Reject'
  },
  accept: {
    id: `${scope}.accept`,
    defaultMessage: 'Accept'
  }
  // currentAppoitments: {
  //   id: `${scope}.currentAppoitments`,
  //   defaultMessage: 'Current Appoitments'
  // },
  // previousAppointments: {
  //   id: `${scope}.previousAppointments`,
  //   defaultMessage: 'Previous Appointments'
  // }
});
