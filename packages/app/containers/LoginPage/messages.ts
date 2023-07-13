/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LoginPage';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Login'
  },
  forgot: {
    id: `${scope}.forgot`,
    defaultMessage: 'Forgot Password?'
  },
  signin: {
    id: `${scope}.signin`,
    defaultMessage: 'SIGN IN'
  },
  create: {
    id: `${scope}.create`,
    defaultMessage: 'Create Account'
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Your Email'
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Your password'
  },
  noAccount: {
    id: `${scope}.noAccount`,
    defaultMessage: "Don't have an account ?"
  },
  signUp: {
    id: `${scope}.signUp`,
    defaultMessage: 'Sign Up'
  },
  SignInGoogle: {
    id: `${scope}.SignInGoogle`,
    defaultMessage: 'Sign in with Google'
  },
  SignInFacebook: {
    id: `${scope}.SignInFacebook`,
    defaultMessage: 'Sign in with Facebook'
  }
});
