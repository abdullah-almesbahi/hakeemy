/*
 * ContactPage Messages
 *
 * This contains all the text for the ContactPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.RegisterPage';

export default defineMessages({
  signup: {
    id: `${scope}.signup`,
    defaultMessage: 'SIGN UP'
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Name'
  },
  editMyProfile: {
    id: `${scope}.editMyProfile`,
    defaultMessage: 'Edit my profile'
  },
  welcome: {
    id: `${scope}.welcome`,
    defaultMessage: 'Welcome {name}'
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Email'
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Password'
  },
  repeatPassword: {
    id: `${scope}.repeatPassword`,
    defaultMessage: 'Repeat password'
  },
  mobile: {
    id: `${scope}.mobile`,
    defaultMessage: 'Phone number'
  },
  age: {
    id: `${scope}.age`,
    defaultMessage: 'Age'
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: 'Login'
  },
  nameRequired: {
    id: `${scope}.nameRequired`,
    defaultMessage: 'please enter name'
  },
  emailRequired: {
    id: `${scope}.emailRequired`,
    defaultMessage: 'please enter email'
  },
  passwordRequired: {
    id: `${scope}.passwordRequired`,
    defaultMessage: 'please enter password'
  },
  mobileRequired: {
    id: `${scope}.mobileRequired`,
    defaultMessage: 'please enter mobile'
  },
  ageRequired: {
    id: `${scope}.ageRequired`,
    defaultMessage: 'please select age'
  },
  maleButton: {
    id: `${scope}.maleButton`,
    defaultMessage: 'Male'
  },
  femaleButton: {
    id: `${scope}.femaleButton`,
    defaultMessage: 'Female'
  },
  Country: {
    id: `${scope}.Country`,
    defaultMessage: 'Country'
  },
  hospitalNameInput: {
    id: `${scope}.hospitalNameInput`,
    defaultMessage: 'Hospital Name'
  },
  hospitalNameInArabicInput: {
    id: `${scope}.hospitalNameInArabicInput`,
    defaultMessage: 'Hospital Name In Arabic'
  },
  PhoneMobileInput: {
    id: `${scope}.PhoneMobileInput`,
    defaultMessage: 'Phone/Mobile'
  },
  genderRequired: {
    id: `${scope}.genderRequired`,
    defaultMessage: 'please enter the gender'
  },
  acceptTermsRequired: {
    id: `${scope}.acceptTermsRequired`,
    defaultMessage:
      "you need to accept Hakeem's terms of use to complete registration"
  },
  acceptTerms: {
    id: `${scope}.acceptTerms`,
    defaultMessage: 'I have read and accept'
  },
  acceptTerms2: {
    id: `${scope}.acceptTerms2`,
    defaultMessage: "Hakeemy's Terms of Use."
  },
  wellness: {
    id: `${scope}.wellness`,
    defaultMessage:
      'Please send me wellness reminder emails about recommended preventive care'
  },
  terms: {
    id: `${scope}.terms`,
    defaultMessage: 'By Signing up with Hakeemy you agree to our'
  },
  termsLink: {
    id: `${scope}.termsLink`,
    defaultMessage: 'Terms & Conditions'
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel'
  },
  confirm: {
    id: `${scope}.confirm`,
    defaultMessage: 'Confirm'
  },
  successfullySignedOut: {
    id: `${scope}.successfullySignedOut`,
    defaultMessage: 'You have been successfully signed out'
  },
  confirmLogout: {
    id: `${scope}.confirmLogout`,
    defaultMessage: 'Confirm logout'
  },
  logout: {
    id: `${scope}.logout`,
    defaultMessage: 'Logout'
  },
  sureToLogout: {
    id: `${scope}.sureToLogout`,
    defaultMessage: 'Are you sure you want to logout?'
  }
  // submitRegistrationButton: {
  //   id: `${scope}.submitRegistrationButton`,
  //   defaultMessage: "JOIN"
  // }
});
