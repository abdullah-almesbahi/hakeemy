/*
 * DoctorProfilePage Messages
 *
 * This contains all the text for the DoctorProfilePage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DoctorProfilePage';

export default defineMessages({
  doctorProfileTitle: {
    id: `${scope}.doctorProfileTitle`,
    defaultMessage: 'Doctor Profile'
  },
  bookAppointment: {
    id: `${scope}.bookAppointment`,
    defaultMessage: 'Book an appointment'
  },
  viewDirection: {
    id: `${scope}.viewDirection`,
    defaultMessage: 'VIEW DIRECTIONS'
  },
  confirmNumber: {
    id: `${scope}.confirmNumber`,
    defaultMessage: 'Please confirm your phone number'
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'CANCEL'
  },
  confirm: {
    id: `${scope}.confirm`,
    defaultMessage: 'CONFIRM'
  },
  willReciveSMS: {
    id: `${scope}.willReciveSMS`,
    defaultMessage:
      'To submit your request you will recive SMS for verification,'
  },
  enterCode: {
    id: `${scope}.enterCode`,
    defaultMessage: 'Please enter code'
  },
  specialist: {
    id: `${scope}.specialist`,
    defaultMessage: 'Specialist'
  },
  consultant: {
    id: `${scope}.consultant`,
    defaultMessage: 'Consultant'
  },
  Noscheduledexist: {
    id: `${scope}.Noscheduledexist`,
    defaultMessage: 'No scheduled exist for this date'
  },
  tryAnotherDate: {
    id: `${scope}.tryAnotherDate`,
    defaultMessage: 'Try another date'
  },
  shareCode: {
    id: `${scope}.shareCode`,
    defaultMessage: 'Share Code'
  },
  pleaseCheckDoctor: {
    id: `${scope}.pleaseCheckDoctor`,
    defaultMessage: 'Please check this doctor'
  },
  unknown: {
    id: `${scope}.unknown`,
    defaultMessage: 'Unknown'
  },
  fees: {
    id: `${scope}.fees`,
    defaultMessage: 'Fees'
  },
  sr: {
    id: `${scope}.sr`,
    defaultMessage: 'SR'
  },
  rating: {
    id: `${scope}.rating`,
    defaultMessage: 'Rating'
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'name'
  },
  phoneNumber: {
    id: `${scope}.phoneNumber`,
    defaultMessage: 'Phone number'
  },
  nameRequired: {
    id: `${scope}.nameRequired`,
    defaultMessage: 'Please enter your name'
  },
  mobileRequired: {
    id: `${scope}.mobileRequired`,
    defaultMessage: 'Please enter your phone number'
  }
});
