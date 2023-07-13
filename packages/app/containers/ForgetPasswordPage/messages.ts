/*
 * ContactPage Messages
 *
 * This contains all the text for the ContactPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ForgotPasswordPage';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Forgot password'
  },
  emailRequired: {
    id: `${scope}.emailRequired`,
    defaultMessage: 'please enter your email'
  },
  forgetPasswordTitle: {
    id: `${scope}.forgetPasswordTitle`,
    defaultMessage: 'Forget Password'
  },
  enterEmail: {
    id: `${scope}.enterEmail`,
    defaultMessage:
      "Enter the email address associated to your Hakeemy account and we'll send you a new password"
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Email'
  },
  emailSent: {
    id: `${scope}.emailSent`,
    defaultMessage: 'Password is sent to your email'
  },
  alreadySent: {
    id: `${scope}.alreadySent`,
    defaultMessage:
      'We have already sent you a new password email. please check your email'
  }
});
