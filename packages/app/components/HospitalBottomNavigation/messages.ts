/*
 * ContactPage Messages
 *
 * This contains all the text for the ContactPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.HospitalBottomNavigation';

export default defineMessages({
  schedule: {
    id: `${scope}.schedule`,
    defaultMessage: 'Schedules'
  },
  doctors: {
    id: `${scope}.doctors`,
    defaultMessage: 'Doctors'
  },
  menu: {
    id: `${scope}.menu`,
    defaultMessage: 'Menu'
  },
  appointments: {
    id: `${scope}.appointments`,
    defaultMessage: 'Appointments'
  }
});
