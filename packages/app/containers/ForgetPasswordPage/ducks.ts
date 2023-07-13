import { createSelector } from 'reselect';
import produce from 'immer';
import {
  initialStateForgetPasswordPageType,
  ForgetPasswordPageActionTypes
} from './types';

/*
 *
 * ForgetPasswordPage constants
 *
 */
export const FORGOT_PASSWORD = 'app/ForgetPasswordPage/FORGOT_PASSWORD';
export const FORGOT_PASSWORD_SUCCESS =
  'app/ForgetPasswordPage/FORGOT_PASSWORD_SUCCESS';

/*
 *
 * ForgetPasswordPage reducer
 *
 */
export const initialState: initialStateForgetPasswordPageType = {
  email: '',
  error: '',
  loaded: false,
  loading: false
};

export default (state = initialState, action: ForgetPasswordPageActionTypes) =>
  produce(state, draft => {
    switch (action.type) {
      case FORGOT_PASSWORD:
        draft.loading = true;
        break;
      case FORGOT_PASSWORD_SUCCESS:
        draft.loading = false;
        break;
    }
  });

/**
 * Direct selector to the forgetPasswordPage state domain
 */
const selectForgetPasswordPageDomain = state =>
  state.forgetPasswordPage || initialState;

/**
 * Default selector used by ForgetPasswordPage
 */
export const makeSelectForgetPasswordPage = () =>
  createSelector(
    selectForgetPasswordPageDomain,
    substate => substate
  );

/*
 *
 * ForgetPasswordPage actions
 *
 */
export function forgotPassword(
  values: string,
  action: any
): ForgetPasswordPageActionTypes {
  return {
    type: FORGOT_PASSWORD,
    values,
    action
  };
}
export function forgotPasswordSuccess(
  message: string
): ForgetPasswordPageActionTypes {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    message
  };
}

// export function updateForgetPasswordPage(
//   data,
//   action
// ): ForgetPasswordPageActionTypes {
//   return {
//     type: UPDATE_ACTION,
//     data,
//     action
//   };
// }
