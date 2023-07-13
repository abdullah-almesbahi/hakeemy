/*
 * ContactPage Messages
 *
 * This contains all the text for the ContactPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.PatientBottomNavigation';

export default defineMessages({
  findDoctor: {
    id: `${scope}.findDoctor`,
    defaultMessage: 'Find Doctor'
  },
  myAppointments: {
    id: `${scope}.myAppointments`,
    defaultMessage: 'My Appointments'
  },
  menu: {
    id: `${scope}.menu`,
    defaultMessage: 'Menu'
  }
});
