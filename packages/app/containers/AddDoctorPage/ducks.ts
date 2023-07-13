import { createSelector } from 'reselect';
import produce from 'immer';
import {
  initialStateAddDoctorPageType,
  AddDoctorPageActionTypes
} from './types';

/*
 *
 * AddDoctorPage constants
 *
 */
export const LOAD_SPECIALITIES = 'app/AddDoctorPage/LOAD_SPECIALITIES';
export const LOAD_SPECIALITIES_SUCCESS =
  'app/AddDoctorPage/LOAD_SPECIALITIES_SUCCESS';
export const LOAD_SPECIALITIES_ERROR =
  'app/AddDoctorPage/LOAD_SPECIALITIES_ERROR';

export const CREATE_DOCTOR = 'app/AddDoctorPage/CREATE_DOCTOR';
export const CREATE_DOCTOR_SUCCESS = 'app/AddDoctorPage/CREATE_DOCTOR_SUCCESS';
export const CREATE_DOCTOR_ERROR = 'app/AddDoctorPage/CREATE_DOCTOR_ERROR';
// createDoctor

/*
 *
 * AddDoctorPage reducer
 *
 */
export const initialState: initialStateAddDoctorPageType = {
  specialitiesData: [],
  error: '',
  loaded: false,
  loading: false
};

export default (state = initialState, action: AddDoctorPageActionTypes) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_SPECIALITIES:
        draft.loading = true;
        draft.error = '';
        break;
      case LOAD_SPECIALITIES_SUCCESS:
        draft.loading = false;
        draft.specialitiesData = action.specialitiesList;
        break;
      case LOAD_SPECIALITIES_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;

      case CREATE_DOCTOR:
        draft.loading = true;
        draft.error = '';
        break;
      case CREATE_DOCTOR_SUCCESS:
        draft.loading = false;
        break;
      case CREATE_DOCTOR_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });

/**
 * Direct selector to the addDoctorPage state domain
 */
const selectAddDoctorPageDomain = state => state.AddDoctorPage || initialState;

/**
 * Default selector used by AddDoctorPage
 */
export const makeSelectAddDoctorPage = () =>
  createSelector(
    selectAddDoctorPageDomain,
    substate => substate
  );

/*
 *
 * AddDoctorPage actions
 *
 */
export function loadSpecialities(): AddDoctorPageActionTypes {
  return {
    type: LOAD_SPECIALITIES
  };
}
export function loadSpecialitiesSuccess(
  specialitiesList
): AddDoctorPageActionTypes {
  return {
    type: LOAD_SPECIALITIES_SUCCESS,
    specialitiesList
  };
}
export function loadSpecialitiesError(error): AddDoctorPageActionTypes {
  return {
    type: LOAD_SPECIALITIES_ERROR,
    error
  };
}

export function createDoctor(values, action): AddDoctorPageActionTypes {
  return {
    type: CREATE_DOCTOR,
    values,
    action
  };
}
export function createDoctorSuccess(): AddDoctorPageActionTypes {
  return {
    type: CREATE_DOCTOR_SUCCESS
  };
}
export function createDoctorError(error): AddDoctorPageActionTypes {
  return {
    type: CREATE_DOCTOR_ERROR,
    error
  };
}
