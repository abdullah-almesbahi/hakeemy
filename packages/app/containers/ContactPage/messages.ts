/*
 * ContactPage Messages
 *
 * This contains all the text for the ContactPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ContactPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ContactPage container!'
  },
  subject: {
    id: `${scope}.subject`,
    defaultMessage: 'Subject'
  },
  subjectRequired: {
    id: `${scope}.subjectRequired`,
    defaultMessage: 'please select your subject'
  },
  username: {
    id: `${scope}.username`,
    defaultMessage: 'Username'
  },
  writeHere: {
    id: `${scope}.writeHere`,
    defaultMessage: 'Write here your message'
  },
  submit: {
    id: `${scope}.submit`,
    defaultMessage: 'SUBMIT'
  },
  nameRequired: {
    id: `${scope}.nameRequired`,
    defaultMessage: 'please type your name'
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Your Name'
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'your Email'
  },
  emailRequired: {
    id: `${scope}.emailRequired`,
    defaultMessage: 'please type your email'
  },
  phone: {
    id: `${scope}.phone`,
    defaultMessage: 'your phone'
  },
  phoneRequired: {
    id: `${scope}.phoneRequired`,
    defaultMessage: 'please type your phone'
  },
  messageRequired: {
    id: `${scope}.messageRequired`,
    defaultMessage: 'please type your message'
  },
  usernameRequired: {
    id: `${scope}.usernameRequired`,
    defaultMessage: 'please enter username'
  },
  contactUs: {
    id: `${scope}.contactUs`,
    defaultMessage: 'CONTACT US'
  },
  suggestion: {
    id: `${scope}.suggestion`,
    defaultMessage: 'Suggestion'
  },
  complaints: {
    id: `${scope}.complaints`,
    defaultMessage: 'Complaints'
  }
});
