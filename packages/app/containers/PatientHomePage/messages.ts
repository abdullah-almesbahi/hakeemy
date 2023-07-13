/*
 * ContactPage Messages
 *
 * This contains all the text for the ContactPage container.
 */

import { defineMessages } from 'react-intl';
import { placeholder } from '@babel/types';

export const scope = 'app.containers.LauncherPage';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Finding a Doctor has never been easier'
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ContactPage container!'
  },
  searchInput: {
    id: `${scope}.searchInput`,
    defaultMessage: 'hospitals, Speciality, Doctors'
  },
  location: {
    id: `${scope}.location`,
    defaultMessage: 'Near me'
  },
  findDoctor: {
    id: `${scope}.findDoctor`,
    defaultMessage: 'Find Doctor'
  },
  nearHospital: {
    id: `${scope}.nearHospital`,
    defaultMessage: 'Near Hospotal'
  },
  menu: {
    id: `${scope}.menu`,
    defaultMessage: 'MENU'
  },
  myAccount: {
    id: `${scope}.myAccount`,
    defaultMessage: 'My Account'
  },
  aboutHakeemy: {
    id: `${scope}.aboutHakeemy`,
    defaultMessage: 'About Hakeemy'
  },
  myAppointments: {
    id: `${scope}.myAppointments`,
    defaultMessage: 'My Appointments'
  },
  insurance: {
    id: `${scope}.insurance`,
    defaultMessage: "I'll choose my insurance later"
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: 'Login'
  },
  usernameRequired: {
    id: `${scope}.usernameRequired`,
    defaultMessage: 'please enter username'
  },
  searchButton: {
    id: `${scope}.searchButton`,
    defaultMessage: 'SEARCH'
  },
  patient: {
    id: `${scope}.student`,
    defaultMessage: 'Patient'
  },
  country: {
    id: `${scope}.Country`,
    defaultMessage: 'Country'
  },
  hospital: {
    id: `${scope}.teacher`,
    defaultMessage: 'Hospital'
  },
  username: {
    id: `${scope}.username`,
    defaultMessage: 'Username'
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Password'
  }
});
