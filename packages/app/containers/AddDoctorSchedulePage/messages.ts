/*
 * ContactPage Messages
 *
 * This contains all the text for the ContactPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AddDoctorSchedulePage';

export default defineMessages({
  addScheduleTitle: {
    id: `${scope}.addScheduleTitle`,
    defaultMessage: 'Add Schedule'
  },
  addScheduleMultiSelectTitle: {
    id: `${scope}.multiSelectTitle`,
    defaultMessage: 'Select Doctor'
  },
  selectDoctor: {
    id: `${scope}.selectDoctor`,
    defaultMessage: 'Select Doctor'
  },
  date: {
    id: `${scope}.date`,
    defaultMessage: 'Date'
  },
  addMoreTimesButton: {
    id: `${scope}.addMoreTimesButton`,
    defaultMessage: 'ADD MORE TIMES'
  },
  selectDoctorRequired: {
    id: `${scope}.selectDoctorRequired`,
    defaultMessage: 'Please Select Doctor'
  },
  dateRequired: {
    id: `${scope}.dateRequired`,
    defaultMessage: 'Please Select Date'
  },
  timeRequired: {
    id: `${scope}.timeRequired`,
    defaultMessage: 'Please Select Time'
  }
});
