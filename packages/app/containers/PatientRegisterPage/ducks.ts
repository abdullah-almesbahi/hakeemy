import { createSelector } from 'reselect';
import produce from 'immer';
import { initialStateRegisterPageType, RegisterPageActionTypes } from './types';

/*
 *
 * RegisterPage constants
 *
 */
export const CREATE_NEW_PATIENT = 'app/RegisterPage/CREATE_NEW_PATIENT';
export const CREATE_NEW_PATIENT_SUCCESS =
  'app/RegisterPage/CREATE_NEW_PATIENT_SUCCESS';

export const DISABLED = 'app/RegisterPage/DISABLED';
export const ENABLE = 'app/RegisterPage/ENABLE';
export const SET_INFO = 'app/RegisterPage/SET_INFO';

export const PATIENT_UPDATE = 'app/RegisterPage/PATIENT_UPDATE';
export const PATIENT_UPDATE_SUCCESS = 'app/RegisterPage/PATIENT_UPDATE_SUCCESS';
export const PATIENT_UPDATE_ERROR = 'app/RegisterPage/PATIENT_UPDATE_ERROR';

/*
 *
 * RegisterPage reducer
 *
 */
export const initialState: initialStateRegisterPageType = {
  disabledStatus: true,
  name: '',
  email: '',
  error: '',
  loaded: false,
  loading: false
};

export default (state = initialState, action: RegisterPageActionTypes) =>
  produce(state, draft => {
    switch (action.type) {
      case CREATE_NEW_PATIENT:
        draft.loading = true;
        break;
      case CREATE_NEW_PATIENT_SUCCESS:
        draft.loading = false;
        break;
      case DISABLED:
        draft.disabledStatus = false;
        break;
      case ENABLE:
        draft.disabledStatus = true;
        break;
      case SET_INFO:
        draft.name = action.name;
        draft.email = action.email;
        break;

      case PATIENT_UPDATE:
        draft.loading = true;
        break;
      case PATIENT_UPDATE_SUCCESS:
        draft.loading = false;
        break;
      case PATIENT_UPDATE_ERROR:
        draft.loading = false;
        break;
    }
  });

/**
 * Direct selector to the registerPage state domain
 */
const selectRegisterPageDomain = state => state.register || initialState;

/**
 * Default selector used by RegisterPage
 */
export const makeSelectRegisterPage = () =>
  createSelector(
    selectRegisterPageDomain,
    substate => substate
  );

/*
 *
 * RegisterPage actions
 *
 */
export function createNewPatient(values, actions): RegisterPageActionTypes {
  return {
    type: CREATE_NEW_PATIENT,
    values,
    actions
  };
}
export function createNewPatientSuccess(): RegisterPageActionTypes {
  return {
    type: CREATE_NEW_PATIENT_SUCCESS
  };
}

export function makeDisabled(): RegisterPageActionTypes {
  return {
    type: DISABLED
  };
}

export function makeEnable(): RegisterPageActionTypes {
  return {
    type: ENABLE
  };
}
export function setInfo(name, email): RegisterPageActionTypes {
  return {
    type: SET_INFO,
    name,
    email
  };
}

export function patientUpdate(values, actions): RegisterPageActionTypes {
  return {
    type: PATIENT_UPDATE,
    values,
    actions
  };
}
export function patientUpdateSuccess(): RegisterPageActionTypes {
  return {
    type: PATIENT_UPDATE_SUCCESS
  };
}
export function patientUpdateError(): RegisterPageActionTypes {
  return {
    type: PATIENT_UPDATE_ERROR
  };
}
