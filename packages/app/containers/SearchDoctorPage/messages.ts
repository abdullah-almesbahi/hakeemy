/*
 * ContactPage Messages
 *
 * This contains all the text for the ContactPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SearchDoctor';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Finding a Doctor has never been easier'
  },
  metaDescription: {
    id: `${scope}.metaDescription`,
    defaultMessage:
      'Hakeemy | Find a doctor | Choose specialization | Choose your country | Choose a city - you will find a list of the best doctors around you. Also read the latest medical and health articles.'
  },
  searchInput: {
    id: `${scope}.searchInput`,
    defaultMessage: 'Type name of hospital or Speciality or Doctor name'
  },
  insurancePlaceholder: {
    id: `${scope}.insurancePlaceholder`,
    defaultMessage: "I'll choose my insurance later"
  },
  searchButton: {
    id: `${scope}.searchButton`,
    defaultMessage: 'SEARCH'
  },
  location: {
    id: `${scope}.location`,
    defaultMessage: 'My current location OR Country, City, Insurance'
  },
  city: {
    id: `${scope}.city`,
    defaultMessage: 'City'
  },
  insurance: {
    id: `${scope}.insurance`,
    defaultMessage: 'Insurance'
  },
  searchDescription: {
    id: `${scope}.searchDescription`,
    defaultMessage:
      'Search by Speciality, Condition, Symptom, Treatment, Doctor name, Hospital name, Country, Insurance'
  },
  bookBestDoctors: {
    id: `${scope}.bookBestDoctors`,
    defaultMessage: 'Book your appointment with best doctors'
  },
  or: {
    id: `${scope}.or`,
    defaultMessage: 'OR'
  },
  selectPicker2Title: {
    id: `${scope}.selectPicker2Title`,
    defaultMessage: 'Select country'
  },
  selectCity: {
    id: `${scope}.selectCity`,
    defaultMessage: 'Select City'
  },
  selectInsurance: {
    id: `${scope}.selectInsurance`,
    defaultMessage: 'Select Insurance'
  },
  myCurrentLocation: {
    id: `${scope}.myCurrentLocation`,
    defaultMessage: 'My current location'
  },
  myCurrentLocationNotActive: {
    id: `${scope}.myCurrentLocationNotActive`,
    defaultMessage: 'My current location (GPS Required)'
  },
  allCities: {
    id: `${scope}.allCities`,
    defaultMessage: 'All cities'
  }
});
