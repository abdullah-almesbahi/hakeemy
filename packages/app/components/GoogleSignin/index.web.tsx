import * as React from 'react';

interface GoogleSigninProps {}

export const GoogleSignin: React.SFC<GoogleSigninProps> = props => {
  return null;
};
export const GoogleSigninButton: React.SFC<GoogleSigninProps> = props => {
  return null;
};

export const statusCodes = {
  SIGN_IN_CANCELLED: 'SIGN_IN_CANCELLED',
  IN_PROGRESS: 'SIGN_IN_CANCELLED',
  PLAY_SERVICES_NOT_AVAILABLE: 'SIGN_IN_CANCELLED',
  SIGN_IN_REQUIRED: 'SIGN_IN_CANCELLED'
};
