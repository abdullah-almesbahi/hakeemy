import { createSelector } from 'reselect';
import produce from 'immer';
import {
  initialStateDoctorProfilePageType,
  DoctorProfilePageActionTypes
} from './types';

/*
 *
 * DoctorProfilePage constants
 *
 */
export const LOAD_DOCTOR_PROFILE = 'app/DoctorProfilePage/LOAD_DOCTOR_PROFILE';
export const LOAD_DOCTOR_PROFILE_SUCCESS =
  'app/DoctorProfilePage/LOAD_DOCTOR_PROFILE_SUCCESS';
export const LOAD_DOCTOR_PROFILE_ERROR =
  'app/DoctorProfilePage/LOAD_DOCTOR_PROFILE_ERROR';

export const BOOK_APPOINTMENT = 'app/DoctorProfilePage/BOOK_APPOINTMENT';
export const BOOK_APPOINTMENT_SUCCESS =
  'app/DoctorProfilePage/BOOK_APPOINTMENT_SUCCESS';
export const BOOK_APPOINTMENT_ERROR =
  'app/DoctorProfilePage/BOOK_APPOINTMENT_ERROR';

export const CONFIRM_SMS = 'app/DoctorProfilePage/CONFIRM_SMS';
export const CONFIRM_SMS_SUCCESS = 'app/DoctorProfilePage/CONFIRM_SMS_SUCCESS';
export const CONFIRM_SMS_ERROR = 'app/DoctorProfilePage/CONFIRM_SMS_ERROR';

/*
 *
 * DoctorProfilePage reducer
 *
 */
export const initialState: initialStateDoctorProfilePageType = {
  data: [],
  userInfo: null,
  appointment_id: 300,
  error: '',
  loaded: false,
  loading: false
};

export default (state = initialState, action: DoctorProfilePageActionTypes) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_DOCTOR_PROFILE:
        return { ...initialState, loading: true };
        break;
      case LOAD_DOCTOR_PROFILE_SUCCESS:
        draft.data = action.data;
        draft.loading = false;
        break;
      case LOAD_DOCTOR_PROFILE_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case BOOK_APPOINTMENT:
        draft.loading = true;
        break;
      case BOOK_APPOINTMENT_SUCCESS:
        draft.appointment_id = action.appointment_id;
        draft.userInfo = action.userInfo;
        draft.loading = false;
        break;
      case BOOK_APPOINTMENT_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case CONFIRM_SMS:
        draft.loading = true;
        break;
      case CONFIRM_SMS_SUCCESS:
        draft.loading = false;
        break;
      case CONFIRM_SMS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

/**
 * Direct selector to the doctorProfilePage state domain
 */
const selectDoctorProfilePageDomain = state =>
  state.doctorProfile || initialState;

/**
 * Default selector used by DoctorProfilePage
 */
export const makeSelectDoctorProfilePage = () =>
  createSelector(
    selectDoctorProfilePageDomain,
    substate => substate
  );

/*
 *
 * DoctorProfilePage actions
 *
 */
export function loadDoctorProfile(id: number): DoctorProfilePageActionTypes {
  return {
    type: LOAD_DOCTOR_PROFILE,
    id
  };
}
export function loadDoctorProfileSuccess(data): DoctorProfilePageActionTypes {
  return {
    type: LOAD_DOCTOR_PROFILE_SUCCESS,
    data
  };
}
export function loadDoctorProfileError(
  error: string
): DoctorProfilePageActionTypes {
  return {
    type: LOAD_DOCTOR_PROFILE_ERROR,
    error
  };
}

export function bookAppointment(values, actions): DoctorProfilePageActionTypes {
  return {
    type: BOOK_APPOINTMENT,
    values,
    actions
  };
}
export function bookAppointmentSuccess(
  appointment_id,
  userInfo
): DoctorProfilePageActionTypes {
  return {
    type: BOOK_APPOINTMENT_SUCCESS,
    appointment_id,
    userInfo
  };
}
export function bookAppointmentError(
  error: string
): DoctorProfilePageActionTypes {
  return {
    BOOK_APPOINTMENT_ERROR,
    error
  };
}

export function confirmSms(values, actions): DoctorProfilePageActionTypes {
  return {
    type: CONFIRM_SMS,
    values,
    actions
  };
}
export function confirmSmsSuccess(): DoctorProfilePageActionTypes {
  return {
    type: CONFIRM_SMS_SUCCESS
  };
}
export function confirmSmsError(error: string): DoctorProfilePageActionTypes {
  return {
    type: CONFIRM_SMS_ERROR,
    error
  };
}
