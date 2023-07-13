import { createSelector } from 'reselect';
import produce from 'immer';
import {
  initialStateHospitalAppointmentsPageType,
  HospitalAppointmentsPageActionTypes
} from './types';

/*
 *
 * HospitalAppointmentsPage constants
 *
 */
export const LOAD_APPOINTMENTS_LIST =
  'app/HospitalAppointmentsPage/LOAD_APPOINTMENTS_LIST';
export const LOAD_APPOINTMENTS_LIST_SUCCESS =
  'app/HospitalAppointmentsPage/LOAD_APPOINTMENTS_LIST_SUCCESS';
export const NO_APPOINTMENTS_EXIST =
  'app/HospitalAppointmentsPage/NO_APPOINTMENTS_EXIST';
export const LOAD_APPOINTMENTS_LIST_ERROR =
  'app/HospitalAppointmentsPage/LOAD_APPOINTMENTS_LIST_ERROR';

export const APPROVE_APPOINTMENT =
  'app/HospitalAppointmentsPage/APPROVE_APPOINTMENT';
export const APPROVE_APPOINTMENT_SUCCESS =
  'app/HospitalAppointmentsPage/APPROVE_APPOINTMENT_SUCCESS';
export const APPROVE_APPOINTMENT_ERROR =
  'app/HospitalAppointmentsPage/APPROVE_APPOINTMENT_ERROR';

export const DELETE_APPOINTMENT =
  'app/HospitalAppointmentsPage/DELETE_APPOINTMENT';
export const DELETE_APPOINTMENT_SUCCESS =
  'app/HospitalAppointmentsPage/DELETE_APPOINTMENT_SUCCESS';
export const DELETE_APPOINTMENT_ERROR =
  'app/HospitalAppointmentsPage/DELETE_APPOINTMENT_ERROR';

/*
 *
 * HospitalAppointmentsPage reducer
 *
 */
export const initialState: initialStateHospitalAppointmentsPageType = {
  appointmentsList: [],
  noAppointmentExist: '',
  error: '',
  loaded: false,
  loading: false
};

export default (
  state = initialState,
  action: HospitalAppointmentsPageActionTypes
) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_APPOINTMENTS_LIST:
        draft.loading = true;
        break;
      case LOAD_APPOINTMENTS_LIST_SUCCESS:
        draft.loading = false;
        draft.appointmentsList = action.appointmentsList;
        break;
      case LOAD_APPOINTMENTS_LIST_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;

      case APPROVE_APPOINTMENT:
        draft.loading = true;
        break;
      case APPROVE_APPOINTMENT_SUCCESS:
        draft.loading = false;
        break;
      case NO_APPOINTMENTS_EXIST:
        draft.noAppointmentExist = action.message;
        break;
      case APPROVE_APPOINTMENT_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;

      case DELETE_APPOINTMENT:
        draft.loading = true;
        break;
      case DELETE_APPOINTMENT_SUCCESS:
        draft.loading = false;
        break;
      case DELETE_APPOINTMENT_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });

/**
 * Direct selector to the hospitalAppointmentsPage state domain
 */
const selectHospitalAppointmentsPageDomain = state =>
  state.hospitalAppointments || initialState;

/**
 * Default selector used by HospitalAppointmentsPage
 */
export const makeSelectHospitalAppointmentsPage = () =>
  createSelector(
    selectHospitalAppointmentsPageDomain,
    substate => substate
  );

/*
 *
 * HospitalAppointmentsPage actions
 *
 */
export function loadAppointmentsList(
  api_key
): HospitalAppointmentsPageActionTypes {
  return {
    type: LOAD_APPOINTMENTS_LIST,
    api_key
  };
}
export function loadAppointmentsListSuccess(
  appointmentsList
): HospitalAppointmentsPageActionTypes {
  return {
    type: LOAD_APPOINTMENTS_LIST_SUCCESS,
    appointmentsList
  };
}
export function noAppointmentExist(
  message
): HospitalAppointmentsPageActionTypes {
  return {
    type: NO_APPOINTMENTS_EXIST,
    message
  };
}
export function loadAppointmentsListError(
  error
): HospitalAppointmentsPageActionTypes {
  return {
    type: LOAD_APPOINTMENTS_LIST_ERROR,
    error
  };
}

export function approveAppointment(
  appointment_id
): HospitalAppointmentsPageActionTypes {
  return {
    type: APPROVE_APPOINTMENT,
    appointment_id
  };
}
export function approveAppointmentSuccess(): HospitalAppointmentsPageActionTypes {
  return {
    type: APPROVE_APPOINTMENT_SUCCESS
  };
}
export function approveAppointmentError(
  error
): HospitalAppointmentsPageActionTypes {
  return {
    type: APPROVE_APPOINTMENT_ERROR,
    error
  };
}

export function deleteAppointment(
  appointment_id
): HospitalAppointmentsPageActionTypes {
  return {
    type: DELETE_APPOINTMENT,
    appointment_id
  };
}
export function deleteAppointmentSuccess(): HospitalAppointmentsPageActionTypes {
  return {
    type: DELETE_APPOINTMENT_SUCCESS
  };
}
export function deleteAppointmentError(
  error
): HospitalAppointmentsPageActionTypes {
  return {
    type: DELETE_APPOINTMENT_ERROR,
    error
  };
}
