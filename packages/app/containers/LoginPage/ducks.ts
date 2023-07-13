import { LoginActionTypes } from './types';

/*
 *
 * LoginPage constants
 *
 */

export const LOGIN_REQUEST = 'app/LoginPage/LOGIN_REQUEST';

/**
 * Login request, this action starts the request saga
 *
 * @param  {object} values mobile number , ex : 500000000
 * @param  {object} values mobile number , ex : 500000000
 * @return {object} An action object with a type of LOGIN_REQUEST
 */
export function loginRequest({ values, actions }): LoginActionTypes {
  return {
    type: LOGIN_REQUEST,
    payload: values,
    meta: actions
  };
}
