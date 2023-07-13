import { createSelector } from 'reselect';
import produce from 'immer';
import {
  initialStateMyAppointmentsPageType,
  MyAppointmentsPageActionTypes
} from './types';

/*
 *
 * MyAppointmentsPage constants
 *
 */
export const LOAD_MY_APPOINTMENTS =
  'app/MyAppointmentsPage/LOAD_MY_APPOINTMENTS';
export const LOAD_MY_APPOINTMENTS_SUCCESS =
  'app/MyAppointmentsPage/LOAD_MY_APPOINTMENTS_SUCCESS';
export const LOAD_MY_APPOINTMENTS_ERROR =
  'app/MyAppointmentsPage/LOAD_MY_APPOINTMENTS_ERROR';

/*
 *
 * MyAppointmentsPage reducer
 *
 */
export const initialState: initialStateMyAppointmentsPageType = {
  myAppointments: [],
  error: '',
  loaded: false,
  loading: false
};

export default (state = initialState, action: MyAppointmentsPageActionTypes) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_MY_APPOINTMENTS:
        draft.loading = true;
        break;
      case LOAD_MY_APPOINTMENTS_SUCCESS:
        draft.loading = false;
        draft.myAppointments = action.myAppointments;
        break;
      case LOAD_MY_APPOINTMENTS_ERROR:
        draft.loading = false;
        draft.error = action.error;

        break;
    }
  });

/**
 * Direct selector to the myAppointmentsPage state domain
 */
const selectMyAppointmentsPageDomain = state =>
  state.myAppointmentsPage || initialState;

/**
 * Default selector used by MyAppointmentsPage
 */
export const makeSelectMyAppointmentsPage = () =>
  createSelector(
    selectMyAppointmentsPageDomain,
    substate => substate
  );

/*
 *
 * MyAppointmentsPage actions
 *
 */
export function loadMyAppointments(api_key): MyAppointmentsPageActionTypes {
  return {
    type: LOAD_MY_APPOINTMENTS,
    api_key
  };
}
export function loadMyAppointmentsSuccess(
  myAppointments
): MyAppointmentsPageActionTypes {
  return {
    type: LOAD_MY_APPOINTMENTS_SUCCESS,
    myAppointments
  };
}
export function loadMyAppointmentsError(error): MyAppointmentsPageActionTypes {
  return {
    type: LOAD_MY_APPOINTMENTS_ERROR,
    error
  };
}
