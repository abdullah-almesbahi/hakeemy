/*
 * ContactPage Messages
 *
 * This contains all the text for the ContactPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HospitalRegistrationPage';

export default defineMessages({
  hospitalRegistration: {
    id: `${scope}.hospitalRegistration`,
    defaultMessage: 'Hospital Registration'
  },
  welcome: {
    id: `${scope}.welcome`,
    defaultMessage: 'Welcome {name}'
  },
  dispensary: {
    id: `${scope}.dispensary`,
    defaultMessage: 'Dispensary'
  },
  clinic: {
    id: `${scope}.clinic`,
    defaultMessage: 'Clinic'
  },
  polyClinic: {
    id: `${scope}.polyClinic`,
    defaultMessage: 'Poly Clinic'
  },
  hospital: {
    id: `${scope}.hospital`,
    defaultMessage: 'Hospital'
  },
  successfullySignedOut: {
    id: `${scope}.successfullySignedOut`,
    defaultMessage: 'You have been successfully signed out'
  },
  editprofile: {
    id: `${scope}.editprofile`,
    defaultMessage: 'Edit my profile'
  },

  // All inputs
  type: {
    id: `${scope}.type`,
    defaultMessage: 'Type Of Hospital'
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
  hospital_name: {
    id: `${scope}.hospital_name`,
    defaultMessage: 'Hospital Name (English)'
  },
  arabic_name: {
    id: `${scope}.arabic_name`,
    defaultMessage: 'Hospital Name (Arabic)'
  },
  countrySelect: {
    id: `${scope}.CountrySelect`,
    defaultMessage: 'Country'
  },
  city: {
    id: `${scope}.city`,
    defaultMessage: 'City'
  },
  insurance: {
    id: `${scope}.insurance`,
    defaultMessage: 'Insurance'
  },
  phone: {
    id: `${scope}.phone`,
    defaultMessage: 'Phone/Mobile Number'
  },
  address: {
    id: `${scope}.address`,
    defaultMessage: 'Hospital Address in English'
  },
  address_arabic: {
    id: `${scope}.address_arabic`,
    defaultMessage: 'Hospital Address in Arabic'
  },
  // location: {
  //   id: `${scope}.location`,
  //   defaultMessage: "Hospital's Location"
  // },
  hospital_logo: {
    id: `${scope}.hospital_logo`,
    defaultMessage: 'image of hospital Pictuer/Logo'
  },

  //////// All Required
  typeRequired: {
    id: `${scope}.typeRequired`,
    defaultMessage: 'Please enter type of hospital'
  },
  emailRequired: {
    id: `${scope}.emailRequired`,
    defaultMessage: 'please enter email'
  },
  passwordRequired: {
    id: `${scope}.passwordRequired`,
    defaultMessage: 'please enter password'
  },
  hospital_nameRequired: {
    id: `${scope}.hospital_nameRequired`,
    defaultMessage: 'please enter hospital name'
  },
  arabic_nameRequired: {
    id: `${scope}.arabic_nameRequired`,
    defaultMessage: 'please enter hospital name in arabic'
  },
  countryRequired: {
    id: `${scope}.countryRequired`,
    defaultMessage: 'Please enter the countru where the hospital is located'
  },
  cityRequired: {
    id: `${scope}.cityRequired`,
    defaultMessage: 'please enter the city where the hospital is located'
  },
  insuranceRequired: {
    id: `${scope}.insuranceRequired`,
    defaultMessage: 'Please enter the insurance available for the hospital'
  },
  phoneRequired: {
    id: `${scope}.phoneRequired`,
    defaultMessage: 'please enter mobile number'
  },
  addressRequired: {
    id: `${scope}.addressRequired`,
    defaultMessage: "please enter hospital's address"
  },
  address_arabicRequired: {
    id: `${scope}.address_arabicRequired`,
    defaultMessage: "please enter hospital's address in Arabic"
  },
  location: {
    id: `${scope}.location`,
    defaultMessage: 'Location'
  },
  locationRequired: {
    id: `${scope}.locationRequired`,
    defaultMessage: "please enter hospital's location"
  },
  hospital_logoRequired: {
    id: `${scope}.hospital_logoRequired`,
    defaultMessage: 'Please choose image Of hospital Pictuer/Logo'
  },
  acceptTerms: {
    id: `${scope}.acceptTerms`,
    defaultMessage: "I have read and accept Hakeemy's Terms of Use."
  },
  privacyPolicy: {
    id: `${scope}.privacyPolicy`,
    defaultMessage: "I have read and accept Hakeemy's Privacy policy."
  },
  acceptTermsRequired: {
    id: `${scope}.acceptTermsRequired`,
    defaultMessage:
      "you need to accept Hakeem's terms of use to complete registration"
  },
  acceptPrivacyPolicyRequired: {
    id: `${scope}.acceptPrivacyPolicyRequired`,
    defaultMessage:
      "you need to accept Hakeem's privacy policy to complete registration"
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel'
  },
  confirm: {
    id: `${scope}.confirm`,
    defaultMessage: 'Confirm'
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
});
